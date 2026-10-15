/**
 * Centralised affiliate merchant registry.
 *
 * Affiliate/merchant URLs are NEVER hard-coded in page components or content.
 * A product references a `merchantId` + a `productKey`; this module turns that
 * pair into an affiliate URL. Change a merchant's link structure or add a new
 * merchant in ONE place and every page updates.
 */

export interface Merchant {
  id: string;
  name: string;
  /** Default CTA copy shown on buy buttons. */
  cta: string;
  /** Base pattern; `{key}` is replaced by the product key. */
  urlTemplate: string;
  /**
   * Used instead of `urlTemplate` when the key does not match `keyPattern`
   * (e.g. no real Amazon ASIN yet), so the key is treated as a search query.
   */
  searchTemplate?: string;
  keyPattern?: RegExp;
  /** Convention: affiliate/paid links get rel="sponsored" (nofollow implied). */
  rel: string;
  /** Disclose the merchant inside earnings disclosure copy. */
  disclosureName: string;
}

const template = (t: string, key: string) => t.replace("{key}", encodeURIComponent(key));

/** Amazon Associates tracking ID. Every Amazon link carries it. */
export const AMAZON_TAG = "jdmunoz-20";

export const merchants: Record<string, Merchant> = {
  amazon: {
    id: "amazon",
    name: "Amazon",
    cta: "Check Current Price on Amazon",
    urlTemplate: `https://www.amazon.com/dp/{key}?tag=${AMAZON_TAG}&linkCode=as2&camp=1789&creative=9325`,
    searchTemplate: `https://www.amazon.com/s?k={key}&tag=${AMAZON_TAG}`,
    keyPattern: /^(B0[A-Z0-9]{8}|\d{9}[\dX])$/,
    rel: "sponsored",
    disclosureName: "Amazon Associates",
  },
  walmart: {
    id: "walmart",
    name: "Walmart",
    cta: "See Latest Price at Walmart",
    urlTemplate: "https://goto.walmart.com/c/{key}",
    rel: "sponsored",
    disclosureName: "Walmart affiliate program",
  },
  homeDepot: {
    id: "homeDepot",
    name: "The Home Depot",
    cta: "View at The Home Depot",
    urlTemplate: "https://www.homedepot.com/s/{key}?cm_mmc=aff-13178",
    rel: "sponsored",
    disclosureName: "The Home Depot affiliate program",
  },
  direct: {
    id: "direct",
    name: "Brand / other retailer",
    cta: "Visit Product Page",
    urlTemplate: "https://{key}",
    rel: "sponsored",
    disclosureName: "brand and retailer affiliate programs",
  },
};

export function merchantById(id: string): Merchant {
  const m = merchants[id];
  if (!m) throw new Error(`Unknown merchant id: ${id}`);
  return m;
}

export function affiliateUrl(merchantId: string, productKey: string): string {
  const m = merchantById(merchantId);
  if (m.searchTemplate && m.keyPattern && !m.keyPattern.test(productKey)) {
    return template(m.searchTemplate, productKey);
  }
  return template(m.urlTemplate, productKey);
}

export function affiliateRel(merchantId: string): string {
  return merchantById(merchantId).rel;
}

/** CTA variants suggested in the brief, switched by product or merchant. */
export const CTA_LABELS = [
  "Check Current Price",
  "View Product",
  "See Latest Price",
  "Compare Options",
] as const;

/** Generic earning disclosure used on every monetised page (Amazon compliant). */
export const EARNINGS_DISCLOSURE =
  "As an Amazon Associate and member of other affiliate programs, CleaningProductsReviews.com earns from qualifying purchases. We never let commission affect our recommendations, and we never quote prices — display ads and sponsored slots are clearly labelled.";
