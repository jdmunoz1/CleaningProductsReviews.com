/**
 * Core content model for CleaningProductsReviews.com.
 *
 * Everything indexable is derived from structured data so that the site can
 * scale to hundreds of pages without editing application code. Every content
 * type below maps to exactly one generated route.
 */

/** A cleaning topic cluster (top-level category). */
export interface Category {
  slug: string;
  name: string;
  /** One-line description used on cards and in the hub header. */
  short: string;
  /** Longer hub introduction written for the actual audience of the cluster. */
  description: string;
  /** SEO meta description for the hub page. */
  metaDescription: string;
  /** Child category slugs (sub-hubs). */
  children: string[];
  /** Best-list slugs recommended from this hub. */
  best: string[];
  /** Guide slugs recommended from this hub. */
  guides: string[];
  /** Comparison slugs recommended from this hub. */
  comparisons?: string[];
  /** Product slugs featured on the hub page (subset). */
  featuredProducts: string[];
  /** Count-sensitive editorial lines the hub can reference. */
  hubIntro: string[];
}

/** A product in the catalog. Affiliate URLs are never hard-coded here. */
export interface Product {
  slug: string;
  name: string;
  brand: string;
  /** Top-level cluster this product belongs to. */
  category: string;
  tagline: string;
  /** Local image path under /public/images. */
  image: string;
  /** Merchant id from merchants.ts. */
  merchantId: string;
  /** Merchant-specific token (e.g. Amazon ASIN). */
  productKey: string;
  /** Key features — research-based, factual, no invented specs. */
  features: string[];
  /** Surfaces / situations the product is intended for. */
  idealFor: string[];
  /** How pricing is described (never fake numbers). */
  priceNote: string;
  /** Word used to describe the product's position, e.g. "flagship cordless". */
  kind: string;
}

/** A research-based individual product review page. */
export interface Review {
  slug: string;
  standfirst: string;
  overview: Block[];
  whoFor: Block[];
  keyFeatures?: Block[];
  strengths: Block[];
  weaknesses: Block[];
  easeOfUse?: Block[];
  performance?: Block[];
  surfaces?: Block[];
  maintenance?: Block[];
  value?: Block[];
  pros: string[];
  cons: string[];
  alternatives: string[];
  faqs: Faq[];
  verdict: Block[];
  researchNote?: string;
  /** Present only after a real hands-on test was performed by the team. */
  tested?: boolean;
}

/** A best-of list page. */
export interface BestList {
  slug: string;
  title: string;
  description: string;
  metaDescription: string;
  category: string;
  intro: Block[];
  picks: BestPick[];
  buyingGuide: Block[];
  methodology: Block[];
  faqs: Faq[];
}

export interface BestPick {
  productSlug: string;
  tag: string;
  blurb: Block[];        // individual analysis, must be unique per product
  pros: string[];
  cons: string[];
}

/** A comparison page. */
export interface Comparison {
  slug: string;
  title: string;
  description: string;
  metaDescription: string;
  category: string;
  a: ComparisonSide;
  b: ComparisonSide;
  intro: Block[];
  table: ComparisonRow[];
  differences: Block[];
  performance: Block[];
  maintenance: Block[];
  useCases: Block[];
  winnerByCategory: WinnerRow[];
  verdict: Block[];
  faqs: Faq[];
}

export interface ComparisonSide {
  label: string;
  productSlug?: string;
  kind: string; // short noun e.g. "carpet cleaner"
}

export interface ComparisonRow {
  feature: string;
  a: string;
  b: string;
}

export interface WinnerRow {
  category: string;
  winner: string; // "a" | "b" | "tie"
  note: string;
}

/** An informational guide/article page. */
export interface Guide {
  slug: string;
  title: string;
  description: string;
  metaDescription: string;
  category: string;
  intro: Block[];
  body: Block[];
  faqs: Faq[];
  /** Slugs of related content (products, best lists, guides or comparisons). */
  related: string[];
  updated: string;
}

/** A brand hub page. */
export interface Brand {
  slug: string;
  name: string;
  short: string;
  intro: Block[];
  body: Block[];
  /** Product slugs from this brand in the catalog. */
  products: string[];
  updated: string;
}

/** A reusable content block rendered by ContentRenderer. */
export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; tone: "tip" | "warn" | "info" | "research"; title?: string; text: string }
  | { type: "product"; slug: string }
  | { type: "bestlist"; slug: string }
  | { type: "guide"; slug: string }
  | { type: "quote"; text: string };

export interface Faq {
  q: string;
  a: string;
}

export type ContentType =
  | "category"
  | "review"
  | "best"
  | "compare"
  | "guide"
  | "brand"
  | "page";

export interface PageRef {
  type: ContentType;
  slug: string;
  title: string;
  description: string;
  category?: string;
}

export interface InventoryEntry {
  type: ContentType;
  slug: string;
  url: string;
  title: string;
  description: string;
  category?: string;
  /** words in visible prose, used for thin-content QA */
  words?: number;
  updated?: string;
}
