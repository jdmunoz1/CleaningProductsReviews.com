import type { Metadata } from "next";
import { comparisons } from "@/content/comparisons";
import { urlFor, getCategory } from "@/lib/catalog";
import { PageTitle, CardLink } from "@/components/Page";

export const metadata: Metadata = {
  title: "Head-to-Head Comparisons",
  description: "Direct vs comparisons of the popular cleaning machines and chemistry — what actually differs, and who should buy which.",
};

export default function CompareIndexPage() {
  const rows = [...comparisons].sort((a, b) => a.title.localeCompare(b.title));
  return (
    <div className="mx-auto max-w-6xl px-4 py-4">
      <PageTitle
        eyebrow="vs"
        title="Head-to-Head Comparisons"
        lede="The classic either/or decisions, resolved with honest trade-offs rather than marketing."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map((c) => (
          <CardLink
            key={c.slug}
            href={urlFor("compare", c.slug)}
            title={c.title}
            description={c.metaDescription}
            meta={getCategory(c.category)?.name ?? c.category}
          />
        ))}
      </div>
    </div>
  );
}
