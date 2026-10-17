import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { brands } from "@/content/brands";
import { getBrand, getProduct, urlFor, fullUrl } from "@/lib/catalog";
import { JsonLd } from "@/components/JsonLd";
import { BlockRenderer } from "@/components/BlockRenderer";
import { ArticleHeader, Breadcrumb, Disclosure } from "@/components/Label";
import { ProductMini } from "@/components/ProductMini";
import { site } from "@/content/site";
import { DEFAULT_OG_IMAGE, breadcrumbSchema, productOgImage } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const b = getBrand(slug);
  if (!b) return {};
  const description = `${b.short} Research-based ${b.name} reviews, comparisons and buying advice.`;
  const lead = getProduct(b.products[0] ?? "");
  return {
    title: `${b.name} Reviews`,
    description,
    alternates: { canonical: fullUrl("brand", slug) },
    openGraph: {
      title: `${b.name} Reviews`,
      description,
      url: fullUrl("brand", slug),
      type: "profile",
      images: [lead ? productOgImage(lead.image, `Illustration of the ${lead.name}`) : DEFAULT_OG_IMAGE],
    },
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
  const crumbs = breadcrumbSchema([
    { name: "Home", url: site.domain },
    { name: "Brands", url: `${site.domain}/brands` },
    { name: b.name, url: fullUrl("brand", slug) },
  ]);

  return (
    <article className="mx-auto max-w-4xl px-4 py-10">
      <JsonLd data={schema} />
      <JsonLd data={crumbs} />
      <Breadcrumb trail={[{ name: "Home", href: "/" }, { name: "Brands", href: "/brands" }, { name: b.name }]} />
      <ArticleHeader kicker="Brand" title={`${b.name} — Reviews & Guide`} lede={b.short} />
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

      <Disclosure />
    </article>
  );
}
