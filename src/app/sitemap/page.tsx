import type { Metadata } from "next";
import Link from "next/link";
import { inventory } from "@/lib/catalog";
import { PageTitle } from "@/components/Page";
import { categories } from "@/content/categories";
import { urlFor } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Sitemap",
  description: "The complete page index for CleaningProductsReviews.com.",
};

const GROUP_LABEL: Record<string, string> = {
  category: "Categories",
  review: "Reviews",
  best: "Best lists",
  compare: "Comparisons",
  guide: "Guides",
  brand: "Brands",
};

export default function SitemapPage() {
  const entries = inventory();
  const groups = ["category", "review", "best", "guide", "compare", "brand"].map((type) => ({
    type,
    label: GROUP_LABEL[type] ?? type,
    items: entries.filter((e) => e.type === type),
  }));
  const hubs = Object.values(categories).filter(
    (c) => !Object.values(categories).some((p) => p.children.includes(c.slug)),
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <PageTitle
        title="Sitemap"
        lede="Everything on the site, grouped. Handy for jumping straight to a page and for search robots."
      />
      <h2 id="clusters" className="mt-8 text-lg font-bold">Clusters</h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        {hubs.map((c) => (
          <Link key={c.slug} href={urlFor("category", c.slug)} className="rounded-lg border border-line p-4 hover:border-accent">
            <span className="font-semibold text-ink">{c.name}</span>
            <span className="mt-1 block text-sm text-muted">hub →</span>
          </Link>
        ))}
      </div>

      {groups.map((g) => (
        <section key={g.type} id={g.type}>
          <h2 className="mt-10 text-lg font-bold">{g.label} ({g.items.length})</h2>
          <ul className="mt-3 grid gap-x-8 gap-y-1.5 sm:grid-cols-2">
            {g.items.map((e) => (
              <li key={e.url} className="truncate">
                <Link href={e.url} className="text-sm text-muted hover:text-accent-ink">{e.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
