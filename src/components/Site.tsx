import Link from "next/link";
import { site, nav, footer } from "@/content/site";

const primary = nav.primary ?? [];
const utility = nav.utility ?? [];

export function BrandWordmark() {
  return (
    <Link href="/" className="shrink-0">
      <span className="font-serif text-lg font-extrabold tracking-tight text-ink">
        Cleaning<span className="text-accent">Products</span>
      </span>
      <span className="ml-1 hidden text-[10px] font-semibold uppercase tracking-widest text-muted sm:inline">
        Reviews
      </span>
    </Link>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <BrandWordmark />
        <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary">
          {primary.map((item) => (
            <Link key={item.href} href={item.href} className="whitespace-nowrap text-sm font-medium text-muted hover:text-accent-ink">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/search" className="hidden min-h-10 items-center rounded-md border border-line px-3 text-sm font-medium text-muted transition-colors hover:border-accent hover:text-accent-ink sm:inline-flex">
            Search
          </Link>
          <Link href="/reviews" className="inline-flex min-h-10 items-center rounded-md bg-accent px-3 text-sm font-semibold text-white transition-colors hover:bg-accent-ink">
            All Reviews
          </Link>
        </div>
      </div>
      {/* Below lg the primary category nav is hidden, so the scroll strip carries both sets. */}
      <nav className="flex gap-1 overflow-x-auto border-t border-line px-2 lg:hidden" aria-label="Secondary">
        {[...utility, ...primary].map((item) => (
          <Link key={item.href} href={item.href} className="inline-flex min-h-11 flex-none items-center px-2 text-sm font-medium text-muted hover:text-accent-ink">
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
    <footer className="mt-16 border-t border-line bg-paper-soft">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <p className="max-w-2xl text-sm leading-relaxed text-muted">{footer.about}</p>
        <div className="mt-8 grid gap-10 sm:grid-cols-3">
          <nav aria-label="Legal">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-muted">Legal</p>
            <ul className="space-y-1 text-sm">
              {legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-block py-1.5 text-muted hover:text-accent-ink">{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Explore">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-muted">Explore</p>
            <ul className="space-y-1 text-sm">
              {explore.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-block py-1.5 text-muted hover:text-accent-ink">{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-muted">Contact</p>
            <p className="text-sm leading-relaxed text-muted">
              Questions, corrections or feedback? <Link href="/contact" className="underline">Get in touch</Link>.
            </p>
            <p className="mt-4 text-sm text-muted">© {year} {site.name}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
