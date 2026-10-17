import Image from "next/image";
import Link from "next/link";
import { categories } from "@/content/categories";
import { products } from "@/content/products";
import { affiliateUrl, merchants, EARNINGS_DISCLOSURE } from "@/content/merchants";
import { urlFor, categoryName } from "@/lib/catalog";
import { cx } from "@/lib/utils";
import type { BestList, Guide, Product, Review } from "@/content/types";

/* ------------------------------------------------------------------ *
 * Cleaning areas. A hub is a category no other category lists as a
 * child; every product rolls up to one hub, which picks its cloth colour.
 * ------------------------------------------------------------------ */

const all = Object.values(categories);
export const hubs = all.filter((c) => !all.some((p) => p.children.includes(c.slug)));

function descendants(slug: string, seen = new Set<string>()): Set<string> {
  if (seen.has(slug)) return seen;
  seen.add(slug);
  for (const child of categories[slug]?.children ?? []) descendants(child, seen);
  return seen;
}

const hubMembers = new Map(hubs.map((h) => [h.slug, descendants(h.slug)]));

/** The first hub that contains a category (shared leaves go to the earlier hub). */
export function hubFor(categorySlug: string): string | undefined {
  for (const [hub, members] of hubMembers) if (members.has(categorySlug)) return hub;
  return undefined;
}

/** Products filed under a category or any of its descendants (roots, intermediates and leaves alike). */
export function categoryProductCount(slug: string): number {
  const members = descendants(slug);
  return new Set(products.filter((p) => members.has(p.category)).map((p) => p.slug)).size;
}

/** Microfiber colour code: one cloth colour per cleaning area. */
const cloth: Record<string, string> = {
  machines: "bg-cloth-blue",
  vacuums: "bg-cloth-blue",
  "floor-carpet": "bg-cloth-violet",
  "floor-scrubbers": "bg-cloth-violet",
  kitchen: "bg-cloth-green",
  bathroom: "bg-cloth-red",
  "pet-cleaning": "bg-cloth-orange",
  "eco-friendly": "bg-cloth-olive",
  "tools-accessories": "bg-cloth-yellow",
  laundry: "bg-cloth-blue",
  specialist: "bg-cloth-grey",
};

export function Swatch({ category, className }: { category: string; className?: string }) {
  const hub = categories[category] && hubMembers.has(category) ? category : hubFor(category);
  return (
    <span
      aria-hidden
      className={cx("inline-block size-2.5 flex-none rounded-[1px]", cloth[hub ?? ""] ?? "bg-cloth-grey", className)}
    />
  );
}

/* ------------------------------------------------------------------ *
 * Section rule: the heavy ink line that opens every block of a label.
 * ------------------------------------------------------------------ */

export function SectionRule({
  kicker,
  title,
  href,
  linkText,
  id,
}: {
  kicker: string;
  title: string;
  href?: string;
  linkText?: string;
  id?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4 border-t-[3px] border-rule-ink pt-3">
      <div>
        <p className="label-caps text-ink-3">{kicker}</p>
        <h2 id={id} className="mt-1 text-2xl font-extrabold tracking-tight [font-stretch:90%] md:text-[1.75rem]">
          {title}
        </h2>
      </div>
      {href && linkText ? (
        <Link href={href} className="ink-link inline-flex min-h-11 flex-none items-center text-sm font-semibold">
          {linkText}
        </Link>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Small parts.
 * ------------------------------------------------------------------ */

export function WorksOn({ items, max }: { items: string[]; max?: number }) {
  const shown = max ? items.slice(0, max) : items;
  const rest = items.length - shown.length;
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Works on">
      {shown.map((it) => (
        <li key={it} className="rounded-[3px] border border-rule-strong bg-label px-2 py-0.5 text-[0.8125rem] leading-snug text-ink-2">
          {it}
        </li>
      ))}
      {rest > 0 ? <li className="px-1 py-0.5 text-[0.8125rem] text-ink-3 num">+{rest}</li> : null}
    </ul>
  );
}

/** The one place a buy link is styled. Glove yellow means "this leaves the site to buy". */
export function AffiliateButton({ product, full, compact }: { product: Product; full?: boolean; compact?: boolean }) {
  const merchant = merchants[product.merchantId];
  return (
    <a
      href={affiliateUrl(product.merchantId, product.productKey)}
      rel={`${merchant.rel} noopener noreferrer`}
      target="_blank"
      referrerPolicy="no-referrer"
      className={cx(
        "group/buy inline-flex min-h-11 items-center justify-center gap-2 rounded-[4px] border border-ink bg-glove font-semibold text-ink transition-colors duration-150 hover:bg-glove-deep",
        compact ? "px-3 text-sm" : "px-4 text-[0.9375rem]",
        full && "w-full",
      )}
    >
      {merchant.cta}
      <span aria-hidden className="transition-transform duration-150 group-hover/buy:translate-x-0.5">→</span>
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

export function MethodStamp({ tested }: { tested?: boolean }) {
  return (
    <span
      className={cx(
        "label-caps inline-flex items-center gap-1.5 rounded-[3px] border px-2 py-1",
        tested ? "border-ink bg-glove-soft text-ink" : "border-rule-strong text-ink-2",
      )}
    >
      <span aria-hidden className={cx("size-1.5 rounded-full", tested ? "bg-ink" : "bg-ink-3")} />
      {tested ? "Hands-on tested" : "Research-based"}
    </span>
  );
}

/* ------------------------------------------------------------------ *
 * Review card: a label column, not a floating box.
 * ------------------------------------------------------------------ */

export function ReviewCard({ product, priority }: { product: Product; priority?: boolean }) {
  return (
    <Link href={urlFor("review", product.slug)} className="group flex flex-col border-t-2 border-rule-ink pt-3">
      <p className="label-caps flex items-center gap-2 text-ink-3">
        <Swatch category={product.category} />
        {categoryName(product.category)}
      </p>
      <div className="mt-3 overflow-hidden rounded-[4px] border border-rule bg-sink">
        <Image
          src={product.image}
          alt={`Illustration of the ${product.name}`}
          width={1440}
          height={1080}
          priority={priority}
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
          className="aspect-[4/3] w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>
      <p className="mt-3 text-sm text-ink-3">{product.brand}</p>
      <h3 className="text-lg font-bold leading-snug [font-stretch:94%] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
        {product.name}
      </h3>
      <p className="mt-1 line-clamp-2 text-[0.9375rem] leading-relaxed text-ink-2">{product.tagline}</p>
      <div className="mt-3">
        <WorksOn items={product.idealFor} max={3} />
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ *
 * The Back Label: everything we know about a product, set out the way
 * the manufacturer's own label would, with nothing we didn't research.
 * ------------------------------------------------------------------ */

export function BackLabel({ product, review }: { product: Product; review: Review }) {
  const merchant = merchants[product.merchantId];
  return (
    <section aria-labelledby="back-label" className="rounded-[6px] border border-rule-strong bg-label">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-[3px] border-rule-ink px-5 py-3">
        <h2 id="back-label" className="label-caps text-ink">The back label</h2>
        <span className="text-xs text-ink-3">{review.tested ? "From our hands-on test" : "From specs, manuals & owner reports"}</span>
      </div>

      <dl className="divide-y divide-rule">
        <Row term="Type">
          <span className="capitalize">{product.kind}</span>
        </Row>
        <Row term="Area">
          <span className="inline-flex items-center gap-2">
            <Swatch category={product.category} />
            <Link href={urlFor("category", product.category)} className="ink-link">
              {categoryName(product.category)}
            </Link>
          </span>
        </Row>
        <Row term="Works on">
          <WorksOn items={product.idealFor} />
        </Row>
      </dl>

      <div className="grid border-t border-rule sm:grid-cols-2 sm:divide-x sm:divide-rule">
        <MarkList title="Strengths" items={review.pros} mark="+" />
        <MarkList title="Watch-outs" items={review.cons} mark="−" className="border-t border-rule sm:border-t-0" />
      </div>

      {product.features.length > 0 && (
        <div className="border-t border-rule px-5 py-4">
          <h3 className="label-caps text-ink-3">Spec notes</h3>
          <ol className="mt-2 space-y-1.5">
            {product.features.map((f, i) => (
              <li key={f} className="grid grid-cols-[2rem_1fr] text-[0.9375rem] leading-snug text-ink-2">
                <span className="num font-display text-sm font-semibold text-ink-4">{String(i + 1).padStart(2, "0")}</span>
                {f}
              </li>
            ))}
          </ol>
        </div>
      )}

      <div className="border-t border-rule bg-sink/60 px-5 py-4">
        <AffiliateButton product={product} full />
        <p className="mt-2 text-center text-xs text-ink-3">
          {merchant.name !== "Direct" ? "We may earn a commission. " : ""}
          {product.priceNote}
        </p>
      </div>
    </section>
  );
}

function Row({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1 px-5 py-3 sm:grid-cols-[7rem_1fr] sm:items-baseline sm:gap-4">
      <dt className="label-caps text-ink-3">{term}</dt>
      <dd className="text-[0.9375rem] text-ink">{children}</dd>
    </div>
  );
}

/** Strengths (+) / Watch-outs (−). `bare` drops the panel padding for use outside a label. */
export function MarkList({
  title,
  items,
  mark,
  className,
  bare,
}: {
  title: string;
  items: string[];
  mark: string;
  className?: string;
  bare?: boolean;
}) {
  if (!items.length) return null;
  return (
    <div className={cx(!bare && "px-5 py-4", className)}>
      <h3 className="label-caps text-ink-3">{title}</h3>
      <ul className="mt-2 space-y-1.5">
        {items.map((it) => (
          <li key={it} className="grid grid-cols-[1.25rem_1fr] text-[0.9375rem] leading-snug text-ink-2">
            <span aria-hidden className="font-display font-bold text-ink">{mark}</span>
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Page furniture shared by every article template.
 * ------------------------------------------------------------------ */

export function Breadcrumb({ trail }: { trail: { name: string; href?: string; category?: string }[] }) {
  return (
    <nav className="mb-6 text-sm text-ink-3" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {trail.map((c, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={`${c.name}-${i}`} className="flex items-center gap-2">
              {i > 0 ? <span aria-hidden className="text-ink-4">/</span> : null}
              <span className="flex items-center gap-1.5">
                {c.category ? <Swatch category={c.category} /> : null}
                {last || !c.href ? (
                  <span aria-current={last ? "page" : undefined} className={last ? "text-ink" : undefined}>{c.name}</span>
                ) : (
                  <Link href={c.href} className="hover:text-ink hover:underline hover:underline-offset-4">{c.name}</Link>
                )}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function Faq({ faqs, kicker = "Questions buyers ask" }: { faqs: { q: string; a: string }[]; kicker?: string }) {
  if (!faqs.length) return null;
  return (
    <section aria-labelledby="faq-title" className="mt-16 max-w-3xl">
      <div className="border-t-[3px] border-rule-ink pt-3">
        <p className="label-caps text-ink-3">{kicker}</p>
        <h2 id="faq-title" className="mt-1 text-2xl font-extrabold tracking-tight [font-stretch:90%]">Frequently asked questions</h2>
      </div>
      <div className="mt-4 divide-y divide-rule border-b border-rule">
        {faqs.map((f, i) => (
          <details key={i} className="group">
            <summary className="flex min-h-14 items-center justify-between gap-4 py-3 font-display text-lg font-bold leading-snug [font-stretch:94%]">
              {f.q}
              <span aria-hidden className="faq-mark grid size-7 flex-none place-items-center rounded-[3px] border border-rule-strong font-display text-base text-ink-2 group-open:border-ink group-open:bg-glove-soft" />
            </summary>
            <p className="pb-4 pr-10 text-[0.9375rem] leading-relaxed text-ink-2">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function Disclosure() {
  return <p className="mt-10 max-w-3xl border-t border-rule pt-6 text-xs leading-relaxed text-ink-3">{EARNINGS_DISCLOSURE}</p>;
}

/** Heavy-rule article header: kicker (with optional area swatch), title, lede. */
export function ArticleHeader({
  kicker,
  category,
  title,
  lede,
  aside,
}: {
  kicker: string;
  category?: string;
  title: string;
  lede?: string;
  aside?: React.ReactNode;
}) {
  return (
    <header className="border-t-[3px] border-rule-ink pt-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="label-caps flex items-center gap-2 text-ink-3">
          {category ? <Swatch category={category} /> : null}
          {kicker}
        </p>
        {aside}
      </div>
      <h1 className="mt-3 prose-h">{title}</h1>
      {lede ? <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-2">{lede}</p> : null}
    </header>
  );
}

/* ------------------------------------------------------------------ *
 * Ruled lists: the "directions" rows of a label, reused by home and hubs.
 * ------------------------------------------------------------------ */

/** Category picker rows: swatch, name + one-liner, product count, arrow. */
export function AreaRows({ items }: { items: { slug: string; name: string; short: string }[] }) {
  return (
    <ol className="divide-y divide-rule">
      {items.map((c) => (
        <li key={c.slug}>
          <Link
            href={urlFor("category", c.slug)}
            className="group grid min-h-14 grid-cols-[auto_1fr_auto_auto] items-center gap-x-3 px-5 py-2.5 transition-colors duration-150 hover:bg-sink"
          >
            <Swatch category={c.slug} />
            <span className="min-w-0">
              <span className="block font-display font-bold leading-tight [font-stretch:92%] group-hover:underline group-hover:underline-offset-4">
                {c.name}
              </span>
              <span className="block truncate text-sm text-ink-3">{c.short}</span>
            </span>
            <span className="num font-display text-sm font-semibold text-ink-3">
              {categoryProductCount(c.slug)}
              <span className="sr-only"> reviews</span>
            </span>
            <span aria-hidden className="text-ink-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-ink">
              →
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}

export function BestRows({ lists }: { lists: BestList[] }) {
  return (
    <ol className="mt-2 grid md:grid-cols-2 md:gap-x-10">
      {lists.map((b, i) => (
        <li key={b.slug} className="border-b border-rule">
          <Link href={urlFor("best", b.slug)} className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-3 py-4">
            <span className="num font-display text-xl font-bold text-ink-4">{String(i + 1).padStart(2, "0")}</span>
            <span className="min-w-0">
              <span className="block font-display text-lg font-bold leading-snug [font-stretch:92%] group-hover:underline group-hover:underline-offset-4">
                {b.title}
              </span>
              <span className="mt-1 line-clamp-2 block text-[0.9375rem] leading-relaxed text-ink-3">{b.metaDescription}</span>
            </span>
            <span className="label-caps num whitespace-nowrap rounded-[3px] bg-glove-soft px-2 py-1 text-ink">
              {b.picks.length} picks
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}

/** Ruled two-column rows for guides, comparisons or any titled page with a category. */
export function TitleRows({
  items,
}: {
  items: { href: string; title: string; description: string; category?: string; kicker?: string }[];
}) {
  return (
    <ul className="mt-2 grid md:grid-cols-2 md:gap-x-10">
      {items.map((g) => (
        <li key={g.href} className="border-b border-rule">
          <Link href={g.href} className="group block py-4">
            {g.category || g.kicker ? (
              <span className="label-caps flex items-center gap-2 text-ink-3">
                {g.category ? <Swatch category={g.category} /> : null}
                {g.kicker ?? (g.category ? categoryName(g.category) : "")}
              </span>
            ) : null}
            <span className="mt-1.5 block font-display text-lg font-bold leading-snug [font-stretch:92%] group-hover:underline group-hover:underline-offset-4">
              {g.title}
            </span>
            <span className="mt-1 line-clamp-2 block text-[0.9375rem] leading-relaxed text-ink-3">{g.description}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function GuideRows({ guides }: { guides: Guide[] }) {
  return (
    <TitleRows
      items={guides.map((g) => ({ href: urlFor("guide", g.slug), title: g.title, description: g.metaDescription, category: g.category }))}
    />
  );
}
