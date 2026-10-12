import type { Metadata } from "next";
import { bestLists } from "@/content/best";
import { urlFor, getCategory } from "@/lib/catalog";
import { PageTitle, CardLink } from "@/components/Page";

export const metadata: Metadata = {
  title: "Best-Of Lists",
  description: "Research-based best lists for cleaning products — the best cordless vacuums, carpet cleaners, steam mops, eco cleaning and more.",
};

export default function BestIndexPage() {
  const rows = [...bestLists].sort((a, b) => a.title.localeCompare(b.title));
  return (
    <div className="mx-auto max-w-6xl px-4 py-4">
      <PageTitle
        eyebrow="Rankings"
        title="Best-Of Lists"
        lede="The essentials per category, compared honestly: what each model is genuinely best at, and who it's wrong for."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map((b) => (
          <CardLink
            key={b.slug}
            href={urlFor("best", b.slug)}
            title={b.title}
            description={b.metaDescription}
            meta={getCategory(b.category)?.name ?? b.category}
          />
        ))}
      </div>
    </div>
  );
}
