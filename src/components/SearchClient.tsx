"use client";
import { useMemo, useState } from "react";
import Link from "next/link";

interface SearchEntry {
  url: string;
  title: string;
  category?: string;
  keywords: string;
  type: string;
  slug: string;
}

const TYPE_LABEL: Record<string, string> = {
  review: "Review",
  best: "Best list",
  compare: "Comparison",
  guide: "Guide",
  brand: "Brand",
  category: "Category",
  page: "Page",
};

export function SearchClient({ entries }: { entries: SearchEntry[] }) {
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return [];
    const tokens = needle.split(/\s+/).filter(Boolean);
    return entries
      .map((e) => {
        const hay = (e.title + " " + (e.category ?? "") + " " + e.keywords).toLowerCase();
        let score = 0;
        for (const t of tokens) {
          if (hay.includes(t)) score += 1;
          if (e.title.toLowerCase().includes(t)) score += 2;
          if ((e.category ?? "").toLowerCase() === t) score += 3;
        }
        return { e, score };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 30)
      .map((x) => x.e);
  }, [q, entries]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <header className="text-center">
        <h1 className="prose-h">Search the site</h1>
        <p className="mt-2 text-muted">Search reviews, best lists, guides, comparisons, brands and categories.</p>
      </header>
      <form className="mt-6" onSubmit={(e) => e.preventDefault()} role="search">
        <label className="sr-only" htmlFor="q">Search</label>
        <input
          id="q"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="e.g. cordless vacuum, carpet cleaner, pet hair…"
          autoComplete="off"
          autoCapitalize="off"
          className="w-full rounded-xl border border-line bg-paper px-5 py-4 text-base text-ink outline-none placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/30"
        />
      </form>

      {q.trim() === "" ? (
        <p className="mt-8 text-sm text-muted">
          Type something to search {entries.length.toLocaleString()} pages.
        </p>
      ) : results.length === 0 ? (
        <p className="mt-8 text-sm text-muted">No results for “{q}” — try a broader term.</p>
      ) : (
        <ul className="mt-8 divide-y divide-line border-y border-line">
          {results.map((r) => (
            <li key={r.url}>
              <Link href={r.url} className="group flex items-baseline justify-between gap-4 py-4">
                <span className="min-w-0">
                  <span className="block font-semibold text-ink group-hover:text-accent-ink">{r.title}</span>
                  {r.category ? <span className="mt-0.5 block text-sm text-muted">{r.category}</span> : null}
                </span>
                <span className="flex-none rounded-full bg-paper-soft px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-muted">
                  {TYPE_LABEL[r.type] ?? r.type}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
