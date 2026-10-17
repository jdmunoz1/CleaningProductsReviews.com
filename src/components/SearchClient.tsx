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
      <header className="border-t-[3px] border-rule-ink pt-4">
        <p className="label-caps text-ink-3">Search</p>
        <h1 className="mt-3 prose-h">Search the site</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-2">Search reviews, best lists, guides, comparisons, brands and categories.</p>
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
          className="w-full rounded-[4px] border border-rule-strong bg-sink px-4 py-3.5 text-base text-ink transition-colors duration-150 placeholder:text-ink-3 focus:border-ink focus:bg-label"
        />
      </form>

      {q.trim() === "" ? (
        <p className="mt-8 text-[0.9375rem] text-ink-3">
          Type something to search <span className="num">{entries.length.toLocaleString()}</span> pages.
        </p>
      ) : results.length === 0 ? (
        <p className="mt-8 text-[0.9375rem] text-ink-2">No results for “{q}”. Try a broader term.</p>
      ) : (
        <ul className="mt-8 divide-y divide-rule border-y border-rule">
          {results.map((r) => (
            <li key={r.url}>
              <Link href={r.url} className="group flex items-baseline justify-between gap-4 py-4">
                <span className="min-w-0">
                  <span className="block font-display text-lg font-bold leading-snug text-ink [font-stretch:92%] group-hover:underline group-hover:underline-offset-4">
                    {r.title}
                  </span>
                  {r.category ? <span className="mt-0.5 block text-sm text-ink-3">{r.category}</span> : null}
                </span>
                <span className="label-caps flex-none rounded-[3px] border border-rule-strong px-2 py-1 text-ink-2">
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
