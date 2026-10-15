/* Crawls the built .next/server/app html, validates internal hrefs.
 * - page routes (/categories/x, /reviews/x ...) must be a built route
 * - /images/** and /_next/** must exist as files on disk
 * - external/affiliate links (https://...) are skipped
 */
import fs from "fs";
import path from "path";

const appDir = ".next/server/app";

function walk(dir) {
  let out = [];
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) out = out.concat(walk(p));
    else if (f.name.endsWith(".html")) out.push(p);
  }
  return out;
}
const files = walk(appDir);

function routeOf(file) {
  let rel = file.slice(appDir.length).replace(/\\/g, "/");
  if (rel.endsWith(".html")) rel = rel.slice(0, -5);
  if (rel.endsWith("/index")) rel = rel.slice(0, -6);
  rel = rel.replace(/^\/+/, "");
  return "/" + rel;
}

const valid = new Set(files.map((f) => routeOf(f)));
valid.add("/");

let errPages = 0, errAssets = 0, total = 0;
const seen = new Set();
const pageMisses = [];
for (const file of files) {
  const src = fs.readFileSync(file, "utf8");
  const re = /href="(\/[^"#]*)"/g;
  const route = routeOf(file);
  let m;
  while ((m = re.exec(src))) {
    const href = m[1];
    const key = route + " -> " + href;
    if (seen.has(key)) continue;
    seen.add(key);
    total++;

    if (href.startsWith("/_next/") || href.startsWith("/images/")) {
      // asset — _next static files live under .next/static, everything else under public
      const filePath = href.startsWith("/_next/static/")
        ? path.join(".next", "static", href.slice("/_next/static/".length))
        : path.join("public", href);
      if (!fs.existsSync(filePath)) {
        errAssets++;
        console.log("MISSING ASSET:", route, "->", href);
      }
      continue;
    }
    if (href === "/") continue;
    // Static files: /public files, app-dir metadata files (icon.svg, apple-icon.png)
    // and static route handlers (llms.txt, emitted as .body), ignoring cache-busting queries.
    const bare = href.split("?")[0];
    if (
      fs.existsSync(path.join("public", bare)) ||
      fs.existsSync(path.join("src", "app", bare)) ||
      fs.existsSync(path.join(appDir, bare + ".body"))
    ) continue;
    if (!valid.has(href) && !valid.has(href.replace(/\/$/, "")) && !valid.has(href + "/")) {
      errPages++;
      console.log("MISSING PAGE:", route, "->", href);
    }
  }
}
console.log("checked", total, "internal hrefs;", errPages, "missing pages,", errAssets, "missing assets");
