/**
 * Generates clean, honest placeholder SVGs for every product in the catalog
 * (plus the author avatar). Product photos are not yet produced — these
 * branded, labelled placeholders go straight into /public/images so the whole
 * site can build today. Swap for real photography/CDN media at launch.
 *
 * Run: `npm run images` (tsx scripts/generate-images.mts)
 */
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { products } from "../src/content/products";

const ROOT = join(process.cwd(), "public");

/** Deterministic hue from a slug — keeps each placeholder on-brand-ish. */
function hueFrom(slug: string) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) % 360;
  return h;
}

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function ellipse(s: string, max: number) {
  return s.length > max ? s.slice(0, max - 1) + "…" : s;
}

function productSvg(slug: string, name: string, brand: string) {
  const h = hueFrom(slug);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900" role="img" aria-label="${esc(name)} — placeholder image">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="hsl(${h}, 48%, 92%)"/>
      <stop offset="1" stop-color="hsl(${(h + 40) % 360}, 42%, 86%)"/>
    </linearGradient>
    <linearGradient id="card" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="hsl(${h}, 34%, 99%)"/>
      <stop offset="1" stop-color="hsl(${h}, 30%, 96%)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#bg)"/>
  <circle cx="1040" cy="140" r="220" fill="hsl(${h}, 40%, 78%)" opacity="0.5"/>
  <circle cx="140" cy="780" r="260" fill="hsl(${(h + 70) % 360}, 40%, 80%)" opacity="0.45"/>
  <rect x="200" y="180" rx="28" width="800" height="540" fill="url(#card)" stroke="hsl(${h}, 30%, 72%)" stroke-width="2"/>
  <text x="600" y="360" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="120" font-weight="700" fill="hsl(${h}, 45%, 28%)">${esc(brand)}</text>
  <text x="600" y="440" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="44" fill="hsl(${h}, 35%, 40%)">${ellipse(esc(name), 46)}</text>
  <rect x="200" y="640" rx="14" width="300" height="60" fill="hsl(${h}, 45%, 92%)" stroke="hsl(${h}, 40%, 80%)"/>
  <text x="350" y="678" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="26" fill="hsl(${h}, 45%, 34%)">Review · Compare</text>
  <text x="600" y="865" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="22" fill="hsl(${h}, 30%, 46%)">Placeholder illustration</text>
</svg>
`;
}

mkdirSync(join(ROOT, "images/products"), { recursive: true });
for (const p of products) {
  const file = join(ROOT, "images/products", `${p.slug}.svg`);
  writeFileSync(file, productSvg(p.slug, p.name, p.brand), "utf8");
}

/** Author avatar */
mkdirSync(join(ROOT, "images/authors"), { recursive: true });
writeFileSync(
  join(ROOT, "images/authors/team.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400" role="img" aria-label="Editorial team avatar">
  <defs><linearGradient id="a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0e7490"/><stop offset="1" stop-color="#155e75"/></linearGradient></defs>
  <rect width="400" height="400" rx="80" fill="url(#a)"/>
  <circle cx="200" cy="150" r="52" fill="#fff" opacity="0.92"/>
  <path d="M92 340c10-72 54-108 108-108s98 36 108 108z" fill="#fff" opacity="0.92"/>
  <path d="M150 92l18 40 44 4-33 28 9 42-38-22-38 22 9-42-33-28 44-4z" fill="#fbbf24"/>
</svg>
`,
  "utf8",
);

console.log(`Generated ${products.length} product SVGs + author avatar in public/images/`);
