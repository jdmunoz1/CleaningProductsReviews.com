/**
 * Catalog: a complete page inventory + link resolver for the whole site.
 * Every content module is registered here, which gives us:
 *  - URL resolution for internal links (no hard-coded paths in content)
 *  - the full page inventory for sitemaps, search, and QA
 *  - orphan detection (any referenced slug must resolve)
 */
import type { InventoryEntry } from "@/content/types";
import { site } from "@/content/site";
import { categories } from "@/content/categories";
import { products } from "@/content/products";
import { reviews } from "@/content/reviews";
import { bestLists } from "@/content/best";
import { comparisons } from "@/content/comparisons";
import { guides } from "@/content/guides";
import { brands } from "@/content/brands";

export const urlFor = (type: string, slug: string): string => {
  switch (type) {
    case "category":
      return `/categories/${slug}`;
    case "review":
      return `/reviews/${slug}`;
    case "best":
      return `/best/${slug}`;
    case "compare":
      return `/compare/${slug}`;
    case "guide":
      return `/guides/${slug}`;
    case "brand":
      return `/brands/${slug}`;
    case "page":
      return slug === "home" ? `/` : `/${slug}`;
    default:
      return `/${slug}`;
  }
};

export const fullUrl = (type: string, slug: string) => site.domain + urlFor(type, slug);

/* ---- lookups ---- */
export const getCategory = (slug: string) => categories[slug];
export const getProduct = (slug: string) => products.find((x) => x.slug === slug);
export const getReview = (slug: string) => reviews.find((x) => x.slug === slug);
export const getBest = (slug: string) => bestLists.find((x) => x.slug === slug);
export const getComparison = (slug: string) => comparisons.find((x) => x.slug === slug);
export const getGuide = (slug: string) => guides.find((x) => x.slug === slug);
export const getBrand = (slug: string) => brands.find((x) => x.slug === slug);

export function categoryName(slug: string): string {
  return categories[slug]?.name ?? slug;
}

export function productName(slug: string): string {
  return products.find((x) => x.slug === slug)?.name ?? slug;
}

/**
 * A brand page earns a place in search only when it adds something its product reviews don't:
 * more than one product, or a product that appears in a best-of list or comparison. A
 * single-product brand with neither is a near-copy of that review, so it is noindexed and left
 * out of sitemap.xml and llms.txt (it stays reachable for visitors).
 */
export function brandIsIndexable(slug: string): boolean {
  const brand = getBrand(slug);
  if (!brand) return false;
  if (brand.products.length > 1) return true;
  const owned = new Set(brand.products);
  return (
    bestLists.some((l) => l.picks.some((p) => owned.has(p.productSlug))) ||
    comparisons.some((c) => owned.has(c.a.productSlug ?? "") || owned.has(c.b.productSlug ?? ""))
  );
}

/* ---- inventory: every page in the site ---- */
export function inventory(): InventoryEntry[] {
  const entries: InventoryEntry[] = [];
  for (const c of Object.values(categories)) {
    entries.push({
      type: "category",
      slug: c.slug,
      url: urlFor("category", c.slug),
      title: c.name,
      description: c.metaDescription,
      category: undefined,
    });
  }
  for (const p of products) {
    entries.push({
      type: "review",
      slug: p.slug,
      url: urlFor("review", p.slug),
      title: `${p.name} Review`,
      description: p.tagline,
      category: p.category,
    });
  }
  for (const b of bestLists) {
    entries.push({
      type: "best",
      slug: b.slug,
      url: urlFor("best", b.slug),
      title: b.title,
      description: b.metaDescription,
      category: b.category,
    });
  }
  for (const c of comparisons) {
    entries.push({
      type: "compare",
      slug: c.slug,
      url: urlFor("compare", c.slug),
      title: c.title,
      description: c.metaDescription,
      category: c.category,
    });
  }
  for (const g of guides) {
    entries.push({
      type: "guide",
      slug: g.slug,
      url: urlFor("guide", g.slug),
      title: g.title,
      description: g.metaDescription,
      category: g.category,
      updated: g.updated,
    });
  }
  for (const b of brands) {
    entries.push({
      type: "brand",
      slug: b.slug,
      url: urlFor("brand", b.slug),
      title: `${b.name} Reviews`,
      description: b.short,
      category: undefined,
      updated: b.updated,
    });
  }
  return entries;
}

/** Resolve any internal slug reference to {type, url} or throw. */
export function resolve(type: string, slug: string): { type: string; url: string } {
  return { type, url: urlFor(type, slug) };
}

/** Resolve an ambiguous slug to a canonical page — used by Related/topics links. */
export function relatedHref(slug: string): string | null {
  if (products.some((x) => x.slug === slug)) return urlFor("review", slug);
  if (bestLists.some((x) => x.slug === slug)) return urlFor("best", slug);
  if (comparisons.some((x) => x.slug === slug)) return urlFor("compare", slug);
  if (guides.some((x) => x.slug === slug)) return urlFor("guide", slug);
  if (brands.some((x) => x.slug === slug)) return urlFor("brand", slug);
  if (categories[slug]) return urlFor("category", slug);
  return null;
}

/** Quick string search used at build to build the static search index. */
export function searchIndexEntries(): { url: string; title: string; category?: string; keywords: string; type: string; slug: string }[] {
  const out: { url: string; title: string; category?: string; keywords: string; type: string; slug: string }[] = [];
  for (const e of inventory()) {
    out.push({ url: e.url, title: e.title, category: e.category, keywords: e.description + " " + e.title, type: e.type, slug: e.slug });
  }
  return out;
}
