import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { brands } from "@/content/brands";
import { getBrand, getProduct, urlFor, fullUrl } from "@/lib/catalog";
import { EARNINGS_DISCLOSURE } from "@/content/merchants";
import { JsonLd } from "@/components/JsonLd";
import { BlockRenderer } from "@/components/BlockRenderer";
import { BrandWordmark } from "@/components/Site";
import { ProductMini } from "@/components/ProductMini";

export const dynamicParams = false;

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const b = getBrand(slug);
  if (!b) return {};
  return {
    title: `${b.name} Reviews`,
    description: b.short,
    alternates: { canonical: fullUrl("brand", slug) },
    openGraph: { title: `${b.name} Reviews`, description: b.short, url: fullUrl("brand", slug), type: "profile" },
  };
}

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const b = getBrand(slug);
  if (!b) notFound();
  const brandProducts = (b.products ?? [])
    .map((s) => getProduct(s))
    .filter((x): x is NonNullable<typeof x> => x !== undefined);

  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateModified: b.updated,
    mainEntity: {
      "@type": "Organization",
      name: b.name,
      description: b.short,
      url: fullUrl("brand", slug),
    },
  };

  return (
    <article className="mx-auto max-w-4xl px-4 py-10">
      <JsonLd data={schema} />
      <BrandWordmark />
      <h1 className="mt-4 prose-h">{b.name} — Reviews & Guide</h1>
      <p className="mt-3 text-lg leading-relaxed text-muted">{b.short}</p>
      <div className="prose-body mt-6">
        <BlockRenderer blocks={b.intro} />
        <BlockRenderer blocks={b.body} />
      </div>

      {brandProducts.length > 0 && (
        <section className="mt-12">
          <h2 className="prose-h h2">Products we cover from {b.name}</h2>
          <div className="mt-4 grid gap-4">
            {brandProducts.map((p) => (
              <ProductMini key={p.slug} slug={p.slug} />
            ))}
          </div>
        </section>
      )}

      <p className="mt-10 border-t border-line pt-6 text-xs leading-relaxed text-muted">{EARNINGS_DISCLOSURE}</p>
    </article>
  );
}
