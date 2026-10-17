import type { Metadata } from "next";
import { categories } from "@/content/categories";
import { urlFor } from "@/lib/catalog";
import { PageTitle, CardLink } from "@/components/Page";

export const metadata: Metadata = {
  title: "All Categories",
  description: "Browse every cleaning product category we review — vacuums, carpet, kitchen, bathroom, pet, eco, laundry and specialist.",
};

export default function CategoriesIndexPage() {
  const rows = Object.values(categories).sort((a, b) => a.name.localeCompare(b.name));
  return (
    <div className="mx-auto max-w-6xl px-4 py-4">
      <PageTitle
        eyebrow="Browse"
        title="All Categories"
        lede="Every hub and sub-hub on the site, from robot vacuums to washing machine cleaners."
      />
      <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map((c) => (
          <CardLink
            key={c.slug}
            href={urlFor("category", c.slug)}
            title={c.name}
            description={c.metaDescription}
            meta={`${(c.children ?? []).length} sub-hubs`}
            category={c.slug}
          />
        ))}
      </div>
    </div>
  );
}
