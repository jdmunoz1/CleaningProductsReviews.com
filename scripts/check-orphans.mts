/* Orphan detector: every slug referenced by any content module must resolve
 * to a real page. Missing refs get printed with their likely type + count. */
import { categories } from "../src/content/categories";
import { products } from "../src/content/products";
import { reviews } from "../src/content/reviews";
import { bestLists } from "../src/content/best";
import { comparisons } from "../src/content/comparisons";
import { guides } from "../src/content/guides";
import { brands } from "../src/content/brands";
import { urlFor, categoryName } from "../src/lib/catalog";

const productSlugs = new Set(products.map((x) => x.slug));
const reviewSlugs = new Set(reviews.map((x) => x.slug));
const bestSlugs = new Set(bestLists.map((x) => x.slug));
const compareSlugs = new Set(comparisons.map((x) => x.slug));
const guideSlugs = new Set(guides.map((x) => x.slug));
const brandSlugs = new Set(brands.map((x) => x.slug));
const categorySlugs = new Set(Object.keys(categories));

let errors = 0;

function check(kind: string, list: string[], ctx: string) {
  for (const s of list) {
    let ok = false;
    switch (kind) {
      case "product": ok = productSlugs.has(s); break;
      case "review": ok = reviewSlugs.has(s); break;
      case "best": ok = bestSlugs.has(s); break;
      case "compare": ok = compareSlugs.has(s); break;
      case "guide": ok = guideSlugs.has(s); break;
      case "brand": ok = brandSlugs.has(s); break;
      case "category": ok = categorySlugs.has(s); break;
      case "any": ok = productSlugs.has(s) || bestSlugs.has(s) || compareSlugs.has(s) || guideSlugs.has(s) || categorySlugs.has(s) || brandSlugs.has(s); break;
    }
    if (!ok) {
      errors++;
      console.log(`  ORPHAN [${kind}] ${s}  <- ${ctx} (${categoryName((ctx as any)?.category ?? "")})`);
    }
  }
}

function blockRefs(blocks: any[], ctx: string) {
  for (const b of blocks ?? []) {
    if (!b || typeof b !== "object") continue;
    if (b.type === "product") check("product", [b.slug], ctx + " block");
    else if (b.type === "bestlist") check("best", [b.slug], ctx + " block");
    else if (b.type === "guide") check("guide", [b.slug], ctx + " block");
  }
}

console.log("== categories refs ==");
for (const c of Object.values(categories)) {
  check("category", c.children ?? [], c.slug);
  check("best", c.best ?? [], c.slug);
  check("guide", c.guides ?? [], c.slug);
  check("compare", c.comparisons ?? [], c.slug);
  check("product", c.featuredProducts ?? [], c.slug);
}

console.log("== best picks ==");
for (const b of bestLists) {
  check("product", b.picks.map((p: any) => p.productSlug), b.slug);
}

console.log("== reviews refs ==");
for (const r of reviews) {
  check("product", [r.slug], r.slug + " self");
  check("any", r.alternatives ?? [], r.slug + " alternatives");
  blockRefs(r.overview, r.slug);
  blockRefs(r.verdict, r.slug);
  blockRefs(r.keyFeatures, r.slug);
  blockRefs(r.strengths, r.slug);
}

console.log("== comparisons refs ==");
for (const c of comparisons) {
  check("product", [c.a?.productSlug, c.b?.productSlug].filter(Boolean), c.slug);
  check("category", [c.category].filter(Boolean), c.slug + " category");
}

console.log("== guides refs ==");
for (const g of guides) {
  check("category", [g.category].filter(Boolean), g.slug + " category");
  check("any", g.related ?? [], g.slug + " related");
  blockRefs(g.body, g.slug);
  blockRefs(g.intro, g.slug);
}

console.log("== brands refs ==");
for (const b of brands) {
  check("product", b.products ?? [], b.slug);
}

console.log("== review uniqueness (one review per product) ==");
const reviewSet = new Map<string, string>();
for (const r of reviews) {
  if (reviewSet.has(r.slug)) { errors++; console.log(`  DUP review: ${r.slug}`); }
  reviewSet.set(r.slug, r.slug);
}
for (const slug of productSlugs) {
  if (!reviewSlugs.has(slug)) { errors++; console.log(`  NO REVIEW for product: ${slug}`); }
}
for (const slug of reviewSlugs) {
  if (!productSlugs.has(slug)) { errors++; console.log(`  REVIEW with no product: ${slug}`); }
}

console.log(errors === 0 ? "\nALL REFERENCES OK" : `\n${errors} ISSUE(S) FOUND`);
