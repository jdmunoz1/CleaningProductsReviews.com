/**
 * Assemblies src/content/parts/<type>/ into src/content/<type>.ts.
 * Fragments are concatenated in sorted order into a typed module, making it
 * trivial to add pages by dropping a small fragment file in a folder.
 */
import fs from "node:fs";
import path from "node:path";

const HEADERS = {
  reviews: `import type { Review, Block } from "./types";\nconst P = (text: string): Block => ({ type: "p", text });\nconst UL = (items: string[]): Block => ({ type: "ul", items });\nconst H2 = (text: string): Block => ({ type: "h2", text });\nexport const reviews: Review[] = [\n`,
  best: `import type { BestList, Block } from "./types";\nconst P = (text: string): Block => ({ type: "p", text });\nexport const bestLists: BestList[] = [\n`,
  comparisons: `import type { Comparison, Block } from "./types";\nconst P = (text: string): Block => ({ type: "p", text });\nexport const comparisons: Comparison[] = [\n`,
  guides: `import type { Guide, Block } from "./types";\nconst P = (text: string): Block => ({ type: "p", text });\nconst UL = (items: string[]): Block => ({ type: "ul", items });\nconst H2 = (text: string): Block => ({ type: "h2", text });\nexport const guides: Guide[] = [\n`,
  brands: `import type { Brand, Block } from "./types";\nconst P = (text: string): Block => ({ type: "p", text });\nexport const brands: Brand[] = [\n`,
};

const RECORD_HEADERS = {
  categories: `import type { Category } from "./types";\nexport const categories: Record<string, Category> = {\n`,
};

const partsRoot = path.join(process.cwd(), "src", "content", "parts");
const srcRoot = path.join(process.cwd(), "src", "content");

for (const type of Object.keys(HEADERS)) {
  const dir = path.join(partsRoot, type);
  const out = path.join(srcRoot, `${type}.ts`);
  if (!fs.existsSync(dir)) {
    fs.writeFileSync(out, HEADERS[type] + "];\n");
    continue;
  }
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".ts")).sort();
  const chunks = files
    .map((f) => fs.readFileSync(path.join(dir, f), "utf8").trim())
    .filter(Boolean)
    .map((c) => c.replace(/,\s*$/, ""));
  const body = chunks.join(",\n");
  fs.writeFileSync(out, `${HEADERS[type]}${body}\n];\n`);
  console.log(`assembled ${files.length} parts -> ${out}`);
}

for (const type of Object.keys(RECORD_HEADERS)) {
  const dir = path.join(partsRoot, type);
  const out = path.join(srcRoot, `${type}.ts`);
  if (!fs.existsSync(dir)) {
    fs.writeFileSync(out, RECORD_HEADERS[type] + "};\n");
    continue;
  }
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".ts")).sort();
  const body = files
    .map((f) => fs.readFileSync(path.join(dir, f), "utf8").trim())
    .filter(Boolean)
    .join("\n");
  fs.writeFileSync(out, `${RECORD_HEADERS[type]}${body}\n};\n`);
  console.log(`assembled ${files.length} parts -> ${out}`);
}
