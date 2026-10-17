import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { comparisons } from "@/content/comparisons";
import { getComparison, getProduct, urlFor, categoryName, fullUrl } from "@/lib/catalog";
import { JsonLd } from "@/components/JsonLd";
import { BlockRenderer } from "@/components/BlockRenderer";
import { AffiliateButton, ArticleHeader, Breadcrumb, Disclosure, Faq, SectionRule, WorksOn } from "@/components/Label";
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

  const sections: { title: string; blocks: typeof c.differences }[] = [
    { title: "The differences", blocks: c.differences },
    { title: "Performance", blocks: c.performance },
    { title: "Maintenance", blocks: c.maintenance },
    { title: "Use cases", blocks: c.useCases },
  ];

  return (
    <article className="mx-auto max-w-4xl px-4 py-10">
      <JsonLd data={schema} />
      <JsonLd data={crumbs} />
      {faq && <JsonLd data={faq} />}
      <Breadcrumb
        trail={[
          { name: "Home", href: "/" },
          { name: categoryName(c.category), href: urlFor("category", c.category), category: c.category },
          { name: c.title },
        ]}
      />

      <ArticleHeader kicker={`Comparison · ${categoryName(c.category)}`} category={c.category} title={c.title} />
      <div className="prose-body mt-4 max-w-3xl">
        <BlockRenderer blocks={c.intro} />
      </div>

      {/* The spec table, set like a label's nutrition panel. */}
      <section aria-labelledby="table-title" className="mt-10 rounded-[6px] border border-rule-strong bg-label">
        <h2 id="table-title" className="label-caps border-b-[3px] border-rule-ink px-5 py-3 text-ink">Side by side</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[34rem] border-collapse text-left text-[0.9375rem]">
            <thead>
              <tr className="border-b border-rule-strong">
                <th scope="col" className="label-caps w-[28%] px-5 py-3 text-ink-3">Feature</th>
                <th scope="col" className="label-caps px-5 py-3 text-ink">{c.a.label}</th>
                <th scope="col" className="label-caps px-5 py-3 text-ink">{c.b.label}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule">
              {c.table.map((r, i) => (
                <tr key={i}>
                  <th scope="row" className="px-5 py-3 align-top font-semibold text-ink">{r.feature}</th>
                  <td className="px-5 py-3 align-top leading-relaxed text-ink-2">{r.a}</td>
                  <td className="px-5 py-3 align-top leading-relaxed text-ink-2">{r.b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {sections
        .filter((s) => s.blocks.length > 0)
        .map((s) => (
          <section key={s.title} className="mt-12">
            <h2 className="prose-h h2">{s.title}</h2>
            <div className="prose-body mt-2">
              <BlockRenderer blocks={s.blocks} />
            </div>
          </section>
        ))}

      {c.winnerByCategory.length > 0 && (
        <section aria-labelledby="winner-title" className="mt-14">
          <SectionRule id="winner-title" kicker="Scorecard" title="Winner by category" />
          <ol className="mt-2 divide-y divide-rule border-b border-rule">
            {c.winnerByCategory.map((w, i) => {
              const tie = w.winner === "tie";
              const label = tie ? "Tie" : w.winner === "a" ? c.a.label : c.b.label;
              return (
                <li key={i} className="grid gap-x-4 gap-y-1 py-4 sm:grid-cols-[2.25rem_11rem_1fr] sm:items-baseline">
                  <span className="num hidden font-display text-lg font-bold text-ink-4 sm:block">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-lg font-bold leading-snug [font-stretch:92%]">{w.category}</span>
                  <span>
                    <span
                      className={`label-caps inline-block rounded-[3px] border px-2 py-1 ${
                        tie ? "border-rule-strong text-ink-2" : "border-ink bg-glove-soft text-ink"
                      }`}
                    >
                      {tie ? "Tie" : `Winner: ${label}`}
                    </span>
                    <span className="mt-2 block text-[0.9375rem] leading-relaxed text-ink-2">{w.note}</span>
                  </span>
                </li>
              );
            })}
          </ol>
        </section>
      )}

      <section className="mt-12">
        <h2 className="prose-h h2">Verdict</h2>
        <div className="prose-body mt-2">
          <BlockRenderer blocks={c.verdict} />
        </div>
      </section>

      {(a || b) && (
        <section aria-labelledby="both-title" className="mt-12">
          <h2 id="both-title" className="sr-only">Both products</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {a && <CompareCard product={a} side={c.a.label} />}
            {b && <CompareCard product={b} side={c.b.label} />}
          </div>
        </section>
      )}

      <Faq faqs={c.faqs} />
      <Disclosure />
    </article>
  );
}

function CompareCard({ product, side }: { product: NonNullable<ReturnType<typeof getProduct>>; side: string }) {
  return (
    <div className="flex flex-col rounded-[6px] border border-rule-strong bg-label">
      <p className="label-caps border-b-[3px] border-rule-ink px-5 py-3 text-ink-3">{side}</p>
      <div className="flex flex-1 flex-col px-5 py-4">
        <p className="label-caps text-ink-3">{product.brand}</p>
        <h3 className="mt-1 font-display text-xl font-bold leading-snug [font-stretch:92%]">{product.name}</h3>
        <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-2">{product.tagline}</p>
        <div className="mt-3">
          <WorksOn items={product.idealFor} max={3} />
        </div>
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-5">
          <AffiliateButton product={product} compact />
          <Link href={urlFor("review", product.slug)} className="ink-link inline-flex min-h-11 items-center text-sm font-semibold">
            Read the review
          </Link>
        </div>
      </div>
    </div>
  );
}
