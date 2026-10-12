import type { Metadata } from "next";
import { brands } from "@/content/brands";
import { urlFor, getProduct } from "@/lib/catalog";
import { PageTitle, CardLink } from "@/components/Page";

export const metadata: Metadata = {
  title: "Brand Hubs",
  description: "Every brand we cover, with everything we've published about their cleaning products in one place.",
};

export default function BrandsIndexPage() {
  const rows = [...brands].sort((a, b) => a.name.localeCompare(b.name));
  return (
    <div className="mx-auto max-w-6xl px-4 py-4">
      <PageTitle
        eyebrow="Brands"
        title="Brand Hubs"
        lede="Everything we cover from each maker — their machines and our reviews, in one place."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map((b) => (
          <CardLink
            key={b.slug}
            href={urlFor("brand", b.slug)}
            title={`${b.name} Reviews`}
            description={`${b.short} Covers ${(b.products ?? []).length} products.`}
            meta={`${b.products?.length ?? 0} products`}
          />
        ))}
      </div>
    </div>
  );
}
