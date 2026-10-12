import type { Metadata } from "next";
import { products } from "@/content/products";
import { reviews } from "@/content/reviews";
import { getProduct, urlFor, getCategory } from "@/lib/catalog";
import { PageTitle, CardLink } from "@/components/Page";

export const metadata: Metadata = {
  title: "All Product Reviews",
  description: "Every cleaning product review on CleaningProductsReviews.com — vacuums, carpet cleaners, kitchen spray, pet enzyme and eco-friendly cleaning.",
};

export default function ReviewsIndexPage() {
  const rows = products
    .map((p) => {
      const r = reviews.find((x) => x.slug === p.slug);
      return {
        product: p,
        cat: getCategory(p.category),
        words: r ? (r.overview ?? []).length : 0,
      };
    })
    .sort((a, b) => a.product.name.localeCompare(b.product.name));

  return (
    <div className="mx-auto max-w-6xl px-4 py-4">
      <PageTitle
        eyebrow="Library"
        title="All Product Reviews"
        lede="Research-based reviews of the popular cleaning products in our catalog — from cordless vacuums to stainless steel wipes. No lab we don't have, no invented numbers."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map(({ product, cat }) => (
          <CardLink
            key={product.slug}
            href={urlFor("review", product.slug)}
            title={product.name}
            description={product.tagline}
            meta={cat?.name ?? product.category}
          />
        ))}
      </div>
    </div>
  );
}
