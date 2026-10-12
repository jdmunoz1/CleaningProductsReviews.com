import fs from "node:fs";
const s = fs.readFileSync("src/content/products.ts", "utf8");
const lines = s.split("\n");
// Track running bracket depth; print whenever appering to be off.
let depth = 0;
let inStr = false;
let strCh = "";
let inLine = 0;
for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  // strip line comments and block comments for bracket counting
  let code = l;
  code = code.replace(/\/\*[\s\S]*?\*\//g, "");
  const ci = code.indexOf("//");
  if (ci !== -1) code = code.slice(0, ci);
  for (let j = 0; j < code.length; j++) {
    const ch = code[j];
    if (inStr) {
      if (ch === "\\") { j++; continue; }
      if (ch === strCh) inStr = false;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") { inStr = true; strCh = ch; continue; }
    if (ch === "[") depth++;
    else if (ch === "]") depth--;
  }
  console.log(i + 1, "depth:", depth, l.trim().slice(0, 20));
}
