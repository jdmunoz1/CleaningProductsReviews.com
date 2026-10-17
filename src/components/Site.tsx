import Link from "next/link";
import { site, nav, footer } from "@/content/site";

const primary = nav.primary ?? [];
const utility = nav.utility ?? [];

export function BrandWordmark() {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-2" aria-label={`${site.name} home`}>
      {/* A tiny back label: heavy rule over printed lines. */}
      <svg aria-hidden viewBox="0 0 28 28" className="size-7 flex-none">
        <rect x="1" y="1" width="26" height="26" rx="3" className="fill-glove stroke-ink" strokeWidth="1.5" />
        <path d="M6 9h16" className="stroke-ink" strokeWidth="3" />
        <path d="M6 14.5h16M6 18.5h11M6 22.5h13" className="stroke-ink" strokeWidth="1.25" />
      </svg>
      <span className="leading-none">
        <span className="block font-display text-[0.95rem] font-extrabold uppercase tracking-[0.02em] text-ink [font-stretch:82%]">
          Cleaning Products
        </span>
        <span className="label-caps block text-[0.625rem] text-ink-3">Reviews · Research-based</span>
      </span>
    </Link>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-rule-strong bg-enamel/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <BrandWordmark />
        <nav className="hidden items-center gap-4 xl:flex" aria-label="Primary">
          {primary.map((item) => (
            <Link key={item.href} href={item.href} className="whitespace-nowrap py-2 text-sm font-medium text-ink-2 transition-colors duration-150 hover:text-ink hover:underline hover:decoration-glove hover:decoration-2 hover:underline-offset-[6px]">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/search" className="hidden min-h-11 items-center whitespace-nowrap rounded-[4px] border border-rule-strong px-3 text-sm font-medium text-ink-2 transition-colors duration-150 hover:border-ink hover:text-ink sm:inline-flex">
            Search
          </Link>
          <Link href="/reviews" className="inline-flex min-h-11 items-center whitespace-nowrap rounded-[4px] bg-ink px-3 text-sm font-semibold text-enamel transition-colors duration-150 hover:bg-ink-2">
            All Reviews
          </Link>
        </div>
      </div>
      {/* Below xl the primary category nav is hidden, so the scroll strip carries both sets. */}
      <nav className="flex gap-1 overflow-x-auto border-t border-rule px-2 xl:hidden" aria-label="Secondary">
        {[...utility, ...primary].map((item) => (
          <Link key={item.href} href={item.href} className="inline-flex min-h-11 flex-none items-center px-2 text-sm font-medium text-ink-2 hover:text-ink">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const legal = footer.legal ?? [];
  const explore = footer.explore ?? [];
  return (
    <footer className="mt-20 border-t-[3px] border-rule-ink bg-sink">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <BrandWordmark />
        <p className="mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-2">{footer.about}</p>
        <div className="mt-8 grid gap-10 sm:grid-cols-3">
          <nav aria-label="Legal">
            <p className="label-caps mb-3 border-b border-rule pb-2 text-ink-3">Legal</p>
            <ul className="space-y-1 text-sm">
              {legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-block py-1.5 text-ink-2 hover:text-ink hover:underline hover:underline-offset-4">{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Explore">
            <p className="label-caps mb-3 border-b border-rule pb-2 text-ink-3">Explore</p>
            <ul className="space-y-1 text-sm">
              {explore.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-block py-1.5 text-ink-2 hover:text-ink hover:underline hover:underline-offset-4">{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="label-caps mb-3 border-b border-rule pb-2 text-ink-3">Contact</p>
            <p className="text-sm leading-relaxed text-ink-2">
              Questions, corrections or feedback? <Link href="/contact" className="ink-link">Get in touch</Link>.
            </p>
            <p className="num mt-4 text-sm text-ink-3">© {year} {site.name}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
