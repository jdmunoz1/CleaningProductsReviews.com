import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories } from "@/content/categories";
import { getCategory, getProduct, urlFor, getBest, getGuide, getComparison, fullUrl } from "@/lib/catalog";
import { JsonLd } from "@/components/JsonLd";
import { AreaRows, ArticleHeader, BestRows, Breadcrumb, GuideRows, ReviewCard, SectionRule, TitleRows, categoryProductCount } from "@/components/Label";
import { site } from "@/content/site";
import { DEFAULT_OG_IMAGE, breadcrumbSchema, seoDescription, seoTitle } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(categories).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) return {};
  const title = `${cat.name} Reviews & Buying Guides`;
  return {
    title: seoTitle(title),
    description: seoDescription(cat.metaDescription),
    alternates: { canonical: fullUrl("category", slug) },
    openGraph: {
      title,
      description: seoDescription(cat.metaDescription),
      url: fullUrl("category", slug),
      type: "website",
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) notFound();

  const children = (cat.children ?? []).map((s) => getCategory(s)).filter((x): x is NonNullable<typeof x> => x !== undefined);
  const bests = (cat.best ?? []).map((s) => getBest(s)).filter((x): x is NonNullable<typeof x> => x !== undefined);
  const guides = (cat.guides ?? []).map((s) => getGuide(s)).filter((x): x is NonNullable<typeof x> => x !== undefined);
  const comparisons = (cat.comparisons ?? []).map((s) => getComparison(s)).filter((x): x is NonNullable<typeof x> => x !== undefined);
  const featured = (cat.featuredProducts ?? []).slice(0, 6);

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: cat.name,
    description: cat.description,
    url: fullUrl("category", slug),
    isPartOf: { "@id": `${site.domain}/#website` },
  };
  const crumbs = breadcrumbSchema([
    { name: "Home", url: site.domain },
    { name: cat.name, url: fullUrl("category", slug) },
  ]);

  const count = categoryProductCount(slug);
  const featuredProducts = featured.map((s) => getProduct(s)).filter((x): x is NonNullable<typeof x> => x !== undefined);

  return (
    <article className="mx-auto max-w-6xl px-4 py-10">
      <JsonLd data={schema} />
      <JsonLd data={crumbs} />
      <Breadcrumb trail={[{ name: "Home", href: "/" }, { name: cat.name, category: slug }]} />

      <div className="max-w-3xl">
        <ArticleHeader
          kicker="Cleaning area"
          category={slug}
          title={cat.name}
          lede={cat.description}
          aside={
            <span className="label-caps num rounded-[3px] border border-rule-strong px-2 py-1 text-ink-2">
              {count} {count === 1 ? "review" : "reviews"}
            </span>
          }
        />
      </div>

      {children.length > 0 && (
        <nav aria-labelledby="children-title" className="mt-10 max-w-3xl rounded-[6px] border border-rule-strong bg-label">
          <div className="flex items-baseline justify-between gap-3 border-b-[3px] border-rule-ink px-5 py-3">
            <h2 id="children-title" className="label-caps text-ink">In this area</h2>
            <span aria-hidden className="label-caps text-ink-4">Reviews</span>
          </div>
          <AreaRows items={children} />
        </nav>
      )}

      {bests.length > 0 && (
        <section aria-labelledby="best-title" className="mt-14">
          <SectionRule id="best-title" kicker="Shortlists" title="Best of the category" />
          <BestRows lists={bests} />
        </section>
      )}

      {featuredProducts.length > 0 && (
        <section aria-labelledby="featured-title" className="mt-14">
          <SectionRule id="featured-title" kicker="Featured" title="Reviews" />
          <div className="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((p) => (
              <ReviewCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}

      {comparisons.length > 0 && (
        <section aria-labelledby="compare-title" className="mt-14">
          <SectionRule id="compare-title" kicker="Head to head" title="Comparisons" />
          <TitleRows
            items={comparisons.map((c) => ({ href: urlFor("compare", c.slug), title: c.title, description: c.metaDescription, kicker: "Comparison" }))}
          />
        </section>
      )}

      {guides.length > 0 && (
        <section aria-labelledby="guides-title" className="mt-14">
          <SectionRule id="guides-title" kicker="Before you buy" title="Buying guides" />
          <GuideRows guides={guides} />
        </section>
      )}

      {cat.hubIntro.length > 0 && (
        <section aria-labelledby="why-title" className="mt-14 rounded-[6px] bg-sink px-5 py-6 sm:px-6">
          <h2 id="why-title" className="label-caps text-ink">Why this area has its own section</h2>
          <ul className="mt-3 grid gap-x-8 gap-y-3 md:grid-cols-2">
            {cat.hubIntro.map((line, i) => (
              <li key={i} className="border-t border-rule-strong pt-2 text-[0.9375rem] leading-relaxed text-ink-2">
                {line}
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
