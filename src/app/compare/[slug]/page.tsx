import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { comparisons } from "@/content/comparisons";
import { getComparison, getProduct, urlFor, categoryName, fullUrl } from "@/lib/catalog";
import { affiliateUrl, merchants, EARNINGS_DISCLOSURE } from "@/content/merchants";
import { JsonLd } from "@/components/JsonLd";
import { BlockRenderer } from "@/components/BlockRenderer";
import { site } from "@/content/site";
import { DEFAULT_OG_IMAGE, ORGANIZATION, ORGANIZATION_REF, breadcrumbSchema, faqSchema, productOgImage } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getComparison(slug);
  if (!c) return {};
  const lead = getProduct(c.a.productSlug ?? "") ?? getProduct(c.b.productSlug ?? "");
  return {
    title: c.title,
    description: c.metaDescription,
    alternates: { canonical: fullUrl("compare", slug) },
    openGraph: {
      title: c.title,
      description: c.metaDescription,
      url: fullUrl("compare", slug),
      type: "article",
      images: [lead ? productOgImage(lead.image, `Illustration of the ${lead.name}`) : DEFAULT_OG_IMAGE],
    },
  };
}

export default async function ComparisonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getComparison(slug);
  if (!c) notFound();

  const a = c.a.productSlug ? getProduct(c.a.productSlug) : undefined;
  const b = c.b.productSlug ? getProduct(c.b.productSlug) : undefined;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: c.title,
    description: c.metaDescription,
    url: fullUrl("compare", slug),
    about: [
      a ? { "@type": "Product", name: a.name, brand: { "@type": "Brand", name: a.brand } } : null,
      b ? { "@type": "Product", name: b.name, brand: { "@type": "Brand", name: b.brand } } : null,
    ].filter(Boolean),
    mainEntityOfPage: fullUrl("compare", slug),
    articleSection: categoryName(c.category),
    author: ORGANIZATION_REF,
    publisher: ORGANIZATION,
    datePublished: "2026-01-01",
    dateModified: site.contentUpdated,
  };
  const crumbs = breadcrumbSchema([
    { name: "Home", url: site.domain },
    { name: categoryName(c.category), url: fullUrl("category", c.category) },
    { name: c.title, url: fullUrl("compare", slug) },
  ]);
  const faq = faqSchema(c.faqs);

  return (
    <article className="mx-auto max-w-4xl px-4 py-10">
      <JsonLd data={schema} />
      <JsonLd data={crumbs} />
      {faq && <JsonLd data={faq} />}
      <nav className="mb-5 text-sm text-muted" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-accent-ink">Home</Link>
        <span className="mx-2">/</span>
        <Link href={urlFor("category", c.category)} className="hover:text-accent-ink">{categoryName(c.category)}</Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{c.title}</span>
      </nav>

      <header>
        <h1 className="prose-h">{c.title}</h1>
        <div className="mt-4 prose-body">
          <BlockRenderer blocks={c.intro} />
        </div>
      </header>

      <section className="mt-10 overflow-x-auto rounded-xl border border-line">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-line bg-paper-soft text-xs font-bold uppercase tracking-wider text-muted">
              <th className="p-3 font-semibold text-ink">Feature</th>
              <th className="p-3">{c.a.label}</th>
              <th className="p-3">{c.b.label}</th>
            </tr>
          </thead>
          <tbody>
            {c.table.map((r, i) => (
              <tr key={i} className="border-b border-line last:border-0">
                <th className="p-3 align-top font-semibold text-ink">{r.feature}</th>
                <td className="p-3 align-top text-muted">{r.a}</td>
                <td className="p-3 align-top text-muted">{r.b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {(c.differences.length > 0) && (
        <section className="mt-12">
          <h2 className="prose-h h2">The differences</h2>
          <div className="prose-body mt-2"><BlockRenderer blocks={c.differences} /></div>
        </section>
      )}
      {(c.performance.length > 0) && (
        <section className="mt-12">
          <h2 className="prose-h h2">Performance</h2>
          <div className="prose-body mt-2"><BlockRenderer blocks={c.performance} /></div>
        </section>
      )}
      {(c.maintenance.length > 0) && (
        <section className="mt-12">
          <h2 className="prose-h h2">Maintenance</h2>
          <div className="prose-body mt-2"><BlockRenderer blocks={c.maintenance} /></div>
        </section>
      )}
      {(c.useCases.length > 0) && (
        <section className="mt-12">
          <h2 className="prose-h h2">Use cases</h2>
          <div className="prose-body mt-2"><BlockRenderer blocks={c.useCases} /></div>
        </section>
      )}

      {c.winnerByCategory.length > 0 && (
        <section className="mt-12">
          <h2 className="prose-h h2">Winner by category</h2>
          <div className="relative mt-4 space-y-4 before:absolute before:left-[7px] before:top-0 before:h-full before:border-l before:border-line">
            {c.winnerByCategory.map((w, i) => (
              <div key={i} className="relative rounded-xl border border-line bg-paper-soft p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-accent-soft text-xs font-bold text-accent-ink">{i + 1}</span>
                  <span className="font-semibold text-ink">{w.category}:</span>
                  <span className={`font-semibold ${w.winner === "tie" ? "text-muted" : "text-accent-ink"}`}>{w.winner === "tie" ? "Tie" : w.winner === "a" ? c.a.label : c.b.label}</span>
                </div>
                <p className="mt-2 pl-10 text-sm leading-relaxed text-muted">{w.note}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-12">
        <h2 className="prose-h h2">Verdict</h2>
        <div className="prose-body mt-2">
          <BlockRenderer blocks={c.verdict} />
        </div>
      </section>

      {c.faqs.length > 0 && (
        <section className="mt-12">
          <h2 className="prose-h h2">Frequently asked questions</h2>
          <div className="mt-4 space-y-4">
            {c.faqs.map((f, i) => (
              <details key={i} className="group rounded-xl border border-line p-5">
                <summary className="flex cursor-pointer items-center justify-between font-semibold">{f.q}</summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {(a || b) && (
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {a && <CompareCard productSlug={a.slug} label="Full review" side={c.a.label} />}
          {b && <CompareCard productSlug={b.slug} label="Full review" side={c.b.label} />}
        </div>
      )}

      <p className="mt-10 border-t border-line pt-6 text-xs leading-relaxed text-muted">{EARNINGS_DISCLOSURE}</p>
    </article>
  );
}

function CompareCard({ productSlug, label, side }: { productSlug: string; label: string; side: string }) {
  const product = getProduct(productSlug)!;
  const merchant = merchants[product.merchantId];
  return (
    <div className="rounded-xl border border-line bg-paper-soft p-5">
      <p className="text-xs font-bold uppercase tracking-wider text-muted">{side} — {label}</p>
      <h3 className="mt-1 font-semibold text-ink">{product.name}</h3>
      <p className="mt-1 text-sm leading-relaxed text-muted">{product.tagline}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Link href={urlFor("review", product.slug)} className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-ink">
          Read review
        </Link>
        <a
          href={affiliateUrl(product.merchantId, product.productKey)}
          rel={merchant.rel}
          target="_blank"
          referrerPolicy="no-referrer"
          className="rounded-lg border border-line bg-paper px-4 py-2 text-sm font-semibold text-accent-ink hover:border-accent"
        >
          {merchant.cta} →
        </a>
      </div>
    </div>
  );
}
