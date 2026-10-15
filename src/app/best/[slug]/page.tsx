import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { bestLists } from "@/content/best";
import { getBest, getProduct, urlFor, categoryName, fullUrl } from "@/lib/catalog";
import { affiliateUrl, merchants, EARNINGS_DISCLOSURE } from "@/content/merchants";
import { JsonLd } from "@/components/JsonLd";
import { BlockRenderer } from "@/components/BlockRenderer";
import { site } from "@/content/site";
import { DEFAULT_OG_IMAGE, breadcrumbSchema, faqSchema, productOgImage } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return bestLists.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const b = getBest(slug);
  if (!b) return {};
  const top = getProduct(b.picks[0]?.productSlug ?? "");
  return {
    title: b.title,
    description: b.metaDescription,
    alternates: { canonical: fullUrl("best", slug) },
    openGraph: {
      title: b.title,
      description: b.metaDescription,
      url: fullUrl("best", slug),
      type: "article",
      images: [top ? productOgImage(top.image, `Illustration of the ${top.name}`) : DEFAULT_OG_IMAGE],
    },
  };
}

export default async function BestPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const b = getBest(slug);
  if (!b) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: b.title,
    description: b.metaDescription,
    url: fullUrl("best", slug),
    numberOfItems: b.picks.length,
    itemListElement: b.picks.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: getProduct(p.productSlug)?.name ?? p.productSlug,
      item: fullUrl("review", p.productSlug),
    })),
  };
  const crumbs = breadcrumbSchema([
    { name: "Home", url: site.domain },
    { name: categoryName(b.category), url: fullUrl("category", b.category) },
    { name: b.title, url: fullUrl("best", slug) },
  ]);
  const faq = faqSchema(b.faqs);

  return (
    <article className="mx-auto max-w-4xl px-4 py-10">
      <JsonLd data={schema} />
      <JsonLd data={crumbs} />
      {faq && <JsonLd data={faq} />}
      <nav className="mb-5 text-sm text-muted" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-accent-ink">Home</Link>
        <span className="mx-2">/</span>
        <Link href={urlFor("category", b.category)} className="hover:text-accent-ink">{categoryName(b.category)}</Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{b.title}</span>
      </nav>

      <header className="max-w-3xl">
        <h1 className="prose-h">{b.title}</h1>
        <p className="mt-3 text-lg leading-relaxed text-muted">{b.description}</p>
        <div className="mt-6 prose-body">
          <BlockRenderer blocks={b.intro} />
        </div>
      </header>

      <section className="mt-12">
        <h2 className="prose-h h2">The {b.picks.length} picks</h2>
        <ol className="relative mt-4 space-y-8 before:absolute before:left-[7px] before:top-0 before:h-full before:border-l before:border-line">
          {b.picks.map((pick, i) => {
            const p = getProduct(pick.productSlug)!;
            const merchant = merchants[p.merchantId];
            return (
              <li key={pick.productSlug} className="relative rounded-xl border border-line bg-paper-soft p-6">
                <div className="flex flex-wrap items-start gap-4">
                  <div className="grid flex-none place-items-center rounded-full bg-accent-soft text-xs font-bold text-accent-ink h-8 w-8">{i + 1}</div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="prose-h font-semibold">{p.name}</h3>
                      <span className="rounded-full bg-accent-ink px-2.5 py-0.5 text-xs font-bold text-white">{pick.tag}</span>
                    </div>
                    <div className="prose-body mt-3">
                      <BlockRenderer blocks={pick.blurb} />
                    </div>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Pros</p>
                        <ul className="mt-2 space-y-1 text-sm text-muted">
                          {pick.pros.map((x, j) => <li key={j} className="flex gap-2"><span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-emerald-500" />{x}</li>)}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-rose-700">Cons</p>
                        <ul className="mt-2 space-y-1 text-sm text-muted">
                          {pick.cons.map((x, j) => <li key={j} className="flex gap-2"><span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-rose-400" />{x}</li>)}
                        </ul>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <Link href={urlFor("review", p.slug)} className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-ink">
                        Read the full review
                      </Link>
                      <a
                        href={affiliateUrl(p.merchantId, p.productKey)}
                        rel={merchant.rel}
                        target="_blank"
                        referrerPolicy="no-referrer"
                        className="rounded-lg border border-line bg-paper px-4 py-2 text-sm font-semibold text-accent-ink hover:border-accent"
                      >
                        {merchant.cta} →
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {b.buyingGuide.length > 0 && (
        <section className="mt-12">
          <h2 className="prose-h h2">Buying guide</h2>
          <div className="prose-body mt-2">
            <BlockRenderer blocks={b.buyingGuide} />
          </div>
        </section>
      )}

      {b.methodology.length > 0 && (
        <section className="mt-12 rounded-xl border border-line bg-paper-soft p-6">
          <h2 className="prose-h h2">How we picked</h2>
          <div className="prose-body">
            <BlockRenderer blocks={b.methodology} />
          </div>
        </section>
      )}

      {b.faqs.length > 0 && (
        <section className="mt-12">
          <h2 className="prose-h h2">Frequently asked questions</h2>
          <div className="mt-4 space-y-4">
            {b.faqs.map((f, i) => (
              <details key={i} className="group rounded-xl border border-line p-5">
                <summary className="flex cursor-pointer items-center justify-between font-semibold">{f.q}</summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      <p className="mt-10 border-t border-line pt-6 text-xs leading-relaxed text-muted">{EARNINGS_DISCLOSURE}</p>
    </article>
  );
}
