import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { guides } from "@/content/guides";
import { getGuide, relatedHref, fullUrl } from "@/lib/catalog";
import { EARNINGS_DISCLOSURE } from "@/content/merchants";
import { JsonLd } from "@/components/JsonLd";
import { BlockRenderer } from "@/components/BlockRenderer";

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return {};
  return {
    title: g.title,
    description: g.metaDescription,
    alternates: { canonical: fullUrl("guide", slug) },
    openGraph: { title: g.title, description: g.metaDescription, url: fullUrl("guide", slug), type: "article" },
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
    articleSection: g.category,
    dateModified: g.updated,
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd data={schema} />
      <p className="text-xs font-bold uppercase tracking-widest text-accent-ink">Buying guide</p>
      <h1 className="mt-1 prose-h">{g.title}</h1>
      <p className="mt-3 text-lg leading-relaxed text-muted">{g.description}</p>
      <div className="mt-6 prose-body">
        <BlockRenderer blocks={g.intro} />
      </div>

      <div className="mt-8 prose-body">
        <BlockRenderer blocks={g.body} />
      </div>

      {g.faqs.length > 0 && (
        <section className="mt-12">
          <h2 className="prose-h h2">Frequently asked questions</h2>
          <div className="mt-4 space-y-4">
            {g.faqs.map((f, i) => (
              <details key={i} className="group rounded-xl border border-line p-5">
                <summary className="flex cursor-pointer items-center justify-between font-semibold">{f.q}</summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {g.related.length > 0 && (
        <section className="mt-12">
          <h2 className="prose-h h2">Keep reading</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {g.related.map((s) => {
              const href = relatedHref(s);
              if (!href) return null;
              return (
                <Link key={s} href={href} className="rounded-md border border-line bg-paper-soft px-3 py-2 text-sm font-medium text-accent-ink hover:border-accent">
                  {s.split("-").map(capt).join(" ")}
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <p className="mt-10 border-t border-line pt-6 text-xs leading-relaxed text-muted">{EARNINGS_DISCLOSURE}</p>
    </article>
  );
}

function capt(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
