import type { MetadataRoute } from "next";
import { inventory, fullUrl } from "@/lib/catalog";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = inventory();
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [
    {
      url: site.domain,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    ...pages
      // Only stable, indexable content types.
      .filter((p) => ["category", "review", "best", "compare", "guide", "brand"].includes(p.type))
      .map((p) => ({
        url: fullUrl(p.type, p.slug),
        lastModified: now,
        changeFrequency: ("category" as string) === p.type ? "weekly" : "monthly" as "weekly" | "monthly",
        priority: p.type === "review" ? 0.8 : p.type === "category" ? 0.9 : 0.6,
        ...(p.type === "guide" ? {} : {}),
      })),
  ];
  return entries;
}
