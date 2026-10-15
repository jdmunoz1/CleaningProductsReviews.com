import type { MetadataRoute } from "next";
import { inventory, fullUrl } from "@/lib/catalog";
import { site } from "@/content/site";

/**
 * lastmod is the later of a page's own `updated` date and the site-wide
 * content revision, never the build time: a lastmod that changes on every
 * deploy teaches search engines to ignore it.
 */
const lastmod = (updated?: string) =>
  new Date(updated && updated > site.contentUpdated ? updated : site.contentUpdated);

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = inventory();
  const seen = new Set<string>();
  const entries: MetadataRoute.Sitemap = [
    {
      url: site.domain,
      lastModified: lastmod(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...pages
      // Only stable, indexable content types.
      .filter((p) => ["category", "review", "best", "compare", "guide", "brand"].includes(p.type))
      .map((p) => ({
        url: fullUrl(p.type, p.slug),
        lastModified: lastmod(p.updated),
        changeFrequency: (p.type === "category" ? "weekly" : "monthly") as "weekly" | "monthly",
        priority: p.type === "review" ? 0.8 : p.type === "category" ? 0.9 : 0.6,
      }))
      .filter((e) => !seen.has(e.url) && seen.add(e.url)),
  ];
  return entries;
}
