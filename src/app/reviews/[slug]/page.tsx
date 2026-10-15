import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/content/products";
import { reviews } from "@/content/reviews";
import { getReview, getProduct, urlFor, categoryName, getCategory, fullUrl } from "@/lib/catalog";
import { affiliateUrl, merchants, EARNINGS_DISCLOSURE } from "@/content/merchants";
import { site } from "@/content/site";
import { JsonLd } from "@/components/JsonLd";
import { BlockRenderer } from "@/components/BlockRenderer";
import { ProductMini } from "@/components/ProductMini";
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

      <nav className="mb-5 text-sm text-muted" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-accent-ink">Home</Link>
        <span className="mx-2">/</span>
        <Link href={urlFor("category", product.category)} className="hover:text-accent-ink">{categoryName(product.category)}</Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
        <div className="min-w-0">
          <header>
            <p className="text-xs font-bold uppercase tracking-widest text-accent-ink">{product.brand} · {product.kind}</p>
            <h1 className="mt-2 prose-h">{product.name} Review</h1>
            <p className="mt-3 text-lg leading-relaxed text-muted">{product.tagline}</p>
          </header>

          <Image
            src={product.image}
            alt={`Illustration of the ${product.name}`}
            width={1440}
            height={1080}
            className="mt-6 aspect-[4/3] w-full rounded-xl object-cover"
            priority
          />

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

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-line bg-paper-soft p-5">
            <h2 className="font-bold">At a glance</h2>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between gap-3"><dt className="text-muted">Category</dt><dd>{categoryName(product.category)}</dd></div>
              <div className="flex justify-between gap-3"><dt className="text-muted">Type</dt><dd className="capitalize">{product.kind}</dd></div>
              <div className="flex justify-between gap-3"><dt className="text-muted">Read time</dt><dd>~{Math.max(1, Math.round(words / 200))} min</dd></div>
            </dl>
            <a
              href={affiliateUrl(product.merchantId, product.productKey)}
              rel={merchant.rel}
              target="_blank"
              referrerPolicy="no-referrer"
              className="mt-4 block rounded-lg bg-accent px-4 py-3 text-center text-sm font-semibold text-white hover:bg-accent-ink"
            >
              {merchant.cta}
            </a>
            {merchant.name !== "Direct" && (
              <p className="mt-2 text-center text-xs text-muted">We may earn a commission.</p>
            )}
            <p className="mt-4 text-xs leading-relaxed text-muted">{product.priceNote}</p>
          </div>

          {cat && (
            <div className="mt-4 rounded-xl border border-line p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-muted">More in {cat.name}</p>
              <div className="mt-3 space-y-2 text-sm">
                {(cat.best ?? []).slice(0, 4).map((s) => (
                  <Link key={s} href={urlFor("best", s)} className="block text-accent-ink hover:underline">{s.split("-").map(capitalize).join(" ")}</Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      {review.faqs.length > 0 && (
        <section className="mx-auto mt-12 max-w-3xl">
          <h2 className="text-2xl font-bold">Frequently asked questions</h2>
          <div className="mt-6 space-y-4">
            {review.faqs.map((f, i) => (
              <details key={i} className="group rounded-xl border border-line p-5">
                <summary className="flex cursor-pointer items-center justify-between font-semibold">{f.q}</summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      <p className="mx-auto mt-10 max-w-3xl border-t border-line pt-6 text-xs leading-relaxed text-muted">{EARNINGS_DISCLOSURE}</p>
    </article>
  );
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
