import type { Metadata } from "next";
import Link from "next/link";
import { inventory } from "@/lib/catalog";
import { PageTitle } from "@/components/Page";
import { AreaRows, SectionRule } from "@/components/Label";
import { categories } from "@/content/categories";

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
      <section aria-labelledby="clusters" className="rounded-[6px] border border-rule-strong bg-label">
        <h2 id="clusters" className="label-caps border-b-[3px] border-rule-ink px-5 py-3 text-ink">Cleaning areas</h2>
        <AreaRows items={hubs} />
      </section>

      {groups.map((g) => (
        <section key={g.type} id={g.type}>
          <div className="mt-12">
            <SectionRule kicker={`${g.items.length} pages`} title={g.label} />
          </div>
          <ul className="mt-4 grid gap-x-8 gap-y-1 sm:grid-cols-2">
            {g.items.map((e) => (
              <li key={e.url} className="truncate">
                <Link href={e.url} className="inline-block py-1 text-[0.9375rem] text-ink-2 hover:text-ink hover:underline hover:underline-offset-4">{e.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
