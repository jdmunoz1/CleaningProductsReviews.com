import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { guides } from "@/content/guides";
import { getGuide, relatedHref, fullUrl, getCategory, categoryName, urlFor } from "@/lib/catalog";
import { JsonLd } from "@/components/JsonLd";
import { BlockRenderer } from "@/components/BlockRenderer";
import { ArticleHeader, Breadcrumb, Disclosure, Faq, SectionRule } from "@/components/Label";
import { site } from "@/content/site";
import { DEFAULT_OG_IMAGE, ORGANIZATION, ORGANIZATION_REF, breadcrumbSchema, faqSchema, seoDescription, seoTitle } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return {};
  return {
    title: seoTitle(g.title),
    description: seoDescription(g.metaDescription),
    alternates: { canonical: fullUrl("guide", slug) },
    openGraph: { title: g.title, description: seoDescription(g.metaDescription), url: fullUrl("guide", slug), type: "article", images: [DEFAULT_OG_IMAGE] },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.title,
    description: g.metaDescription,
    url: fullUrl("guide", slug),
    mainEntityOfPage: fullUrl("guide", slug),
    articleSection: categoryName(g.category),
    image: DEFAULT_OG_IMAGE.url,
    author: ORGANIZATION_REF,
    publisher: ORGANIZATION,
    datePublished: g.updated,
    dateModified: g.updated,
  };
  const cat = getCategory(g.category);
  const trail = [
    { name: "Home", url: site.domain },
    ...(cat ? [{ name: cat.name, url: fullUrl("category", cat.slug) }] : []),
    { name: g.title, url: fullUrl("guide", slug) },
  ];
  const faq = faqSchema(g.faqs);

  const related = g.related
    .map((s) => ({ slug: s, href: relatedHref(s) }))
    .filter((r): r is { slug: string; href: string } => Boolean(r.href));

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd data={schema} />
      <JsonLd data={breadcrumbSchema(trail)} />
      {faq && <JsonLd data={faq} />}
      <Breadcrumb
        trail={[
          { name: "Home", href: "/" },
          ...(cat ? [{ name: cat.name, href: urlFor("category", cat.slug), category: cat.slug }] : []),
          { name: g.title },
        ]}
      />
      <ArticleHeader kicker={cat ? `Buying guide · ${cat.name}` : "Buying guide"} category={cat?.slug} title={g.title} lede={g.description} />
      <div className="mt-6 prose-body">
        <BlockRenderer blocks={g.intro} />
      </div>

      <div className="mt-8 prose-body">
        <BlockRenderer blocks={g.body} />
      </div>

      <Faq faqs={g.faqs} />

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="mt-14">
          <SectionRule id="related-title" kicker="Next" title="Keep reading" />
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={r.href}
                  className="group flex min-h-12 items-center gap-3 rounded-[4px] border border-rule-strong bg-label px-4 py-2.5 text-[0.9375rem] font-semibold text-ink transition-colors duration-150 hover:border-ink"
                >
                  <span className="min-w-0 group-hover:underline group-hover:underline-offset-4">{r.slug.split("-").map(capt).join(" ")}</span>
                  <span aria-hidden className="ml-auto text-ink-3 group-hover:text-ink">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <Disclosure />
    </article>
  );
}

function capt(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
