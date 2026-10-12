import type { Metadata } from "next";
import { guides } from "@/content/guides";
import { urlFor, getCategory, relatedHref } from "@/lib/catalog";
import { PageTitle, CardLink } from "@/components/Page";

export const metadata: Metadata = {
  title: "Buying Guides",
  description: "Practical, research-based buying guides for cleaning — how to choose a vacuum, deep-clean carpet safely, care for stainless steel, and more.",
};

export default function GuidesIndexPage() {
  const rows = [...guides].sort((a, b) => a.title.localeCompare(b.title));
  return (
    <div className="mx-auto max-w-6xl px-4 py-4">
      <PageTitle
        eyebrow="Guides"
        title="Buying Guides"
        lede="How-to and how-to-choose guidance distilled from product documentation and owner experience."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map((g) => (
          <CardLink
            key={g.slug}
            href={urlFor("guide", g.slug)}
            title={g.title}
            description={g.metaDescription}
            meta={getCategory(g.category)?.name ?? g.category}
          />
        ))}
      </div>
    </div>
  );
}
