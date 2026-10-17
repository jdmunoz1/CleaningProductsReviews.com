import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { bestLists } from "@/content/best";
import { getBest, getProduct, urlFor, categoryName, fullUrl } from "@/lib/catalog";
import { JsonLd } from "@/components/JsonLd";
import { BlockRenderer } from "@/components/BlockRenderer";
import { AffiliateButton, ArticleHeader, Breadcrumb, Disclosure, Faq, MarkList, WorksOn } from "@/components/Label";
import { site } from "@/content/site";
import { DEFAULT_OG_IMAGE, breadcrumbSchema, faqSchema, productOgImage, seoDescription, seoTitle } from "@/lib/seo";

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
    title: seoTitle(b.title),
    description: seoDescription(b.metaDescription),
    alternates: { canonical: fullUrl("best", slug) },
    openGraph: {
      title: b.title,
      description: seoDescription(b.metaDescription),
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

  const picks = b.picks
    .map((pick) => ({ pick, product: getProduct(pick.productSlug) }))
    .filter((x): x is { pick: (typeof b.picks)[number]; product: NonNullable<ReturnType<typeof getProduct>> } => x.product !== undefined);

  return (
    <article className="mx-auto max-w-4xl px-4 py-10">
      <JsonLd data={schema} />
      <JsonLd data={crumbs} />
      {faq && <JsonLd data={faq} />}
      <Breadcrumb
        trail={[
          { name: "Home", href: "/" },
          { name: categoryName(b.category), href: urlFor("category", b.category), category: b.category },
          { name: b.title },
        ]}
      />

      <ArticleHeader kicker={`Best-of list · ${categoryName(b.category)}`} category={b.category} title={b.title} lede={b.description} />
      <div className="prose-body mt-6 max-w-3xl">
        <BlockRenderer blocks={b.intro} />
      </div>

      {/* The shortlist: every pick on one label, so scanners can jump or buy without the long read. */}
      <section aria-labelledby="shortlist-title" className="mt-10 rounded-[6px] border border-rule-strong bg-label">
        <div className="flex items-baseline justify-between gap-3 border-b-[3px] border-rule-ink px-5 py-3">
          <h2 id="shortlist-title" className="label-caps text-ink">The shortlist</h2>
          <span className="label-caps num text-ink-3">{picks.length} picks</span>
        </div>
        <ol className="divide-y divide-rule">
          {picks.map(({ pick, product }, i) => (
            <li key={pick.productSlug} className="grid gap-3 px-5 py-3 sm:grid-cols-[2.25rem_1fr_auto] sm:items-center">
              <span className="num hidden font-display text-lg font-bold text-ink-4 sm:block">{String(i + 1).padStart(2, "0")}</span>
              <span className="min-w-0">
                <span className="label-caps block text-ink-3">
                  <span className="num sm:hidden">{String(i + 1).padStart(2, "0")} · </span>
                  {pick.tag}
                </span>
                <a href={`#pick-${i + 1}`} className="mt-0.5 block font-display text-lg font-bold leading-snug [font-stretch:92%] hover:underline hover:underline-offset-4">
                  {product.name}
                </a>
              </span>
              <AffiliateButton product={product} compact />
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="picks-title" className="mt-14">
        <h2 id="picks-title" className="sr-only">The {picks.length} picks in detail</h2>
        <ol className="space-y-14">
          {picks.map(({ pick, product }, i) => (
            <li key={pick.productSlug} id={`pick-${i + 1}`} className="scroll-mt-36 border-t-[3px] border-rule-ink pt-4 xl:scroll-mt-24">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="num font-display text-3xl font-extrabold leading-none text-ink-4">{String(i + 1).padStart(2, "0")}</span>
                <span className="label-caps rounded-[3px] border border-ink bg-glove-soft px-2 py-1 text-ink">{pick.tag}</span>
              </div>
              <div className="mt-4 grid gap-6 sm:grid-cols-[220px_1fr]">
                <div className="overflow-hidden rounded-[4px] border border-rule bg-sink self-start">
                  <Image
                    src={product.image}
                    alt={`Illustration of the ${product.name}`}
                    width={440}
                    height={330}
                    sizes="(min-width: 640px) 220px, 100vw"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="label-caps text-ink-3">{product.brand} · {product.kind}</p>
                  <h3 className="mt-1 font-display text-2xl font-extrabold leading-tight tracking-tight [font-stretch:90%]">{product.name}</h3>
                  <div className="mt-3">
                    <WorksOn items={product.idealFor} max={4} />
                  </div>
                </div>
              </div>
              <div className="prose-body mt-4">
                <BlockRenderer blocks={pick.blurb} />
              </div>
              <div className="mt-5 grid gap-5 rounded-[6px] border border-rule bg-label p-5 sm:grid-cols-2 sm:gap-8">
                <MarkList bare title="Strengths" items={pick.pros} mark="+" />
                <MarkList bare title="Watch-outs" items={pick.cons} mark="−" />
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
                <AffiliateButton product={product} />
                <Link href={urlFor("review", product.slug)} className="ink-link inline-flex min-h-11 items-center text-[0.9375rem] font-semibold">
                  Read the full review
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {b.buyingGuide.length > 0 && (
        <section className="mt-16">
          <h2 className="prose-h h2">Buying guide</h2>
          <div className="prose-body mt-2">
            <BlockRenderer blocks={b.buyingGuide} />
          </div>
        </section>
      )}

      {b.methodology.length > 0 && (
        <section aria-labelledby="method-title" className="mt-12 rounded-[6px] bg-sink px-5 py-5 sm:px-6">
          <h2 id="method-title" className="label-caps text-ink">How we picked</h2>
          <div className="prose-body">
            <BlockRenderer blocks={b.methodology} />
          </div>
        </section>
      )}

      <Faq faqs={b.faqs} />
      <Disclosure />
    </article>
  );
}
