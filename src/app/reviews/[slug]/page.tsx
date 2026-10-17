import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/content/products";
import { reviews } from "@/content/reviews";
import { getReview, getProduct, urlFor, categoryName, getCategory, fullUrl } from "@/lib/catalog";
import { merchants } from "@/content/merchants";
import { site } from "@/content/site";
import { JsonLd } from "@/components/JsonLd";
import { BlockRenderer } from "@/components/BlockRenderer";
import { ProductMini } from "@/components/ProductMini";
import { ArticleHeader, BackLabel, AffiliateButton, Breadcrumb, Disclosure, Faq, MethodStamp, Swatch, WorksOn } from "@/components/Label";
import { estimateWords, dateFormatter } from "@/lib/utils";
import { ORGANIZATION, ORGANIZATION_REF, breadcrumbSchema, faqSchema, productImageUrl, productOgImage } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return reviews.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const review = getReview(slug);
  const product = getProduct(slug);
  if (!review || !product) return {};
  const description = `${product.tagline} Research-based review: strengths, weaknesses, value and alternatives.`;
  return {
    title: `${product.name} Review`,
    description,
    alternates: { canonical: fullUrl("review", slug) },
    openGraph: {
      title: `${product.name} Review | CleaningProductsReviews.com`,
      description,
      url: fullUrl("review", slug),
      images: [productOgImage(product.image, `Illustration of the ${product.name}`)],
      type: "article",
    },
  };
}

export default async function ReviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const review = getReview(slug);
  const product = getProduct(slug);
  if (!review || !product) notFound();

  const merchant = merchants[product.merchantId];
  const cat = getCategory(product.category);
  const altProducts = (review.alternatives ?? [])
    .map((s) => getProduct(s))
    .filter((x): x is NonNullable<typeof x> => x !== undefined);
  const words = estimateWords([
    ...(review.overview ?? []),
    ...(review.whoFor ?? []),
    ...(review.keyFeatures ?? []),
    ...(review.strengths ?? []),
    ...(review.weaknesses ?? []),
    ...(review.verdict ?? []),
  ]);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${product.name} Review`,
    description: product.tagline,
    image: productImageUrl(product.image),
    author: ORGANIZATION_REF,
    publisher: ORGANIZATION,
    mainEntityOfPage: fullUrl("review", slug),
    datePublished: "2026-01-01",
    dateModified: site.contentUpdated,
    // The product is described via `about` rather than a standalone Product
    // item: we publish no price or star rating, and a top-level Product without
    // offers/review/aggregateRating is flagged invalid in Search Console.
    about: {
      "@type": "Product",
      name: product.name,
      brand: { "@type": "Brand", name: product.brand },
      description: product.tagline,
      image: productImageUrl(product.image),
    },
  };

  const crumbs = breadcrumbSchema([
    { name: "Home", url: site.domain },
    { name: categoryName(product.category), url: fullUrl("category", product.category) },
    { name: product.name, url: fullUrl("review", slug) },
  ]);
  const faq = faqSchema(review.faqs);

  return (
    <article className="mx-auto max-w-6xl px-4 py-10">
      <JsonLd data={articleSchema} />
      <JsonLd data={crumbs} />
      {faq && <JsonLd data={faq} />}

      <Breadcrumb
        trail={[
          { name: "Home", href: "/" },
          { name: categoryName(product.category), href: urlFor("category", product.category), category: product.category },
          { name: product.name },
        ]}
      />

      <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:gap-12">
        <div className="min-w-0">
          <ArticleHeader
            kicker={`${product.brand} · ${product.kind}`}
            title={`${product.name} Review`}
            lede={product.tagline}
            aside={<MethodStamp tested={review.tested} />}
          />

          <figure className="mt-6">
            <div className="overflow-hidden rounded-[6px] border border-rule bg-sink">
              <Image
                src={product.image}
                alt={`Illustration of the ${product.name}`}
                width={1440}
                height={1080}
                sizes="(min-width: 1024px) 760px, 100vw"
                className="aspect-[4/3] w-full object-cover"
                priority
              />
            </div>
          </figure>

          <div className="mt-8">
            <BackLabel product={product} review={review} />
          </div>

          <div className="prose-body mt-6">
            <BlockRenderer blocks={review.overview ?? []} />
            <BlockRenderer blocks={review.whoFor ?? []} />

            {review.keyFeatures && (
              <>
                <h2 className="prose-h h2">Key features we assessed</h2>
                <BlockRenderer blocks={review.keyFeatures} />
              </>
            )}

            <h2 className="prose-h h2">Strengths</h2>
            <BlockRenderer blocks={review.strengths ?? []} />
            <h2 className="prose-h h2">Weaknesses</h2>
            <BlockRenderer blocks={review.weaknesses ?? []} />

            {review.easeOfUse && (
              <>
                <h2 className="prose-h h2">Ease of use</h2>
                <BlockRenderer blocks={review.easeOfUse} />
              </>
            )}
            {review.performance && (
              <>
                <h2 className="prose-h h2">Performance</h2>
                <BlockRenderer blocks={review.performance} />
              </>
            )}
            {review.surfaces && (
              <>
                <h2 className="prose-h h2">Surfaces it handles</h2>
                <BlockRenderer blocks={review.surfaces} />
              </>
            )}
            {review.maintenance && (
              <>
                <h2 className="prose-h h2">Maintenance</h2>
                <BlockRenderer blocks={review.maintenance} />
              </>
            )}
            {review.value && (
              <>
                <h2 className="prose-h h2">Value</h2>
                <BlockRenderer blocks={review.value} />
              </>
            )}

            {altProducts.length > 0 && (
              <>
                <h2 className="prose-h h2">Alternatives worth comparing</h2>
                <div className="grid gap-4">
                  {altProducts.map((p) => (
                    <ProductMini key={p.slug} slug={p.slug} />
                  ))}
                </div>
              </>
            )}

            <h2 className="prose-h h2">The bottom line</h2>
            <BlockRenderer blocks={review.verdict ?? []} />
          </div>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-36 lg:self-start xl:top-24">
          <div className="rounded-[6px] border border-rule-strong bg-label">
            <div className="border-b-[3px] border-rule-ink px-5 py-3">
              <p className="label-caps text-ink-3">Where to buy</p>
              <p className="mt-1 font-display text-lg font-bold leading-snug [font-stretch:92%]">{product.name}</p>
            </div>
            <div className="px-5 py-4">
              <p className="label-caps mb-2 text-ink-3">Works on</p>
              <WorksOn items={product.idealFor} max={4} />
              <div className="mt-4">
                <AffiliateButton product={product} full compact />
              </div>
              {merchant.name !== "Direct" && (
                <p className="mt-2 text-center text-xs text-ink-3">We may earn a commission.</p>
              )}
            </div>
            <dl className="divide-y divide-rule border-t border-rule text-sm">
              <div className="flex justify-between gap-3 px-5 py-2.5"><dt className="text-ink-3">Type</dt><dd className="text-right capitalize">{product.kind}</dd></div>
              <div className="flex justify-between gap-3 px-5 py-2.5"><dt className="text-ink-3">Read time</dt><dd className="num">~{Math.max(1, Math.round(words / 200))} min</dd></div>
            </dl>
          </div>

          {cat && (cat.best ?? []).length > 0 && (
            <div className="border-t-2 border-rule-ink pt-3">
              <p className="label-caps flex items-center gap-2 text-ink-3">
                <Swatch category={cat.slug} />
                More in {cat.name}
              </p>
              <ul className="mt-2 divide-y divide-rule text-[0.9375rem]">
                {(cat.best ?? []).slice(0, 4).map((s) => (
                  <li key={s}>
                    <Link href={urlFor("best", s)} className="ink-link block py-2.5">{s.split("-").map(capitalize).join(" ")}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      <Faq faqs={review.faqs} kicker="Questions owners ask" />
      <Disclosure />
    </article>
  );
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
