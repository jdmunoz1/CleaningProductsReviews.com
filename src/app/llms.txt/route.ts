import { inventory, fullUrl, brandIsIndexable } from "@/lib/catalog";
import { site } from "@/content/site";
import type { ContentType } from "@/content/types";

/** /llms.txt: a plain-text map of the site for AI assistants (llmstxt.org format). */
export const dynamic = "force-static";

const SECTIONS: { type: ContentType; heading: string }[] = [
  { type: "best", heading: "Best-of lists" },
  { type: "compare", heading: "Head-to-head comparisons" },
  { type: "guide", heading: "How-to and buying guides" },
  { type: "review", heading: "Product reviews" },
  { type: "category", heading: "Categories" },
  { type: "brand", heading: "Brands" },
];

export function GET() {
  const pages = inventory();
  const lines: string[] = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    "All reviews are research-based (manufacturer documentation, specifications and owner feedback); products are not lab-tested unless a page says so. Links to retailers are affiliate links.",
    "",
    "## About and methodology",
    `- [About](${site.domain}/about): Who we are and how the site is funded`,
    `- [Review methodology](${site.domain}/review-methodology): How products are researched and compared`,
    `- [Editorial policy](${site.domain}/editorial-policy): Independence and corrections`,
    `- [Affiliate disclosure](${site.domain}/affiliate-disclosure): How we earn commissions`,
  ];
  for (const s of SECTIONS) {
    const items = pages.filter((p) => p.type === s.type && (p.type !== "brand" || brandIsIndexable(p.slug)));
    if (!items.length) continue;
    lines.push("", `## ${s.heading}`);
    const seen = new Set<string>();
    for (const p of items) {
      const url = fullUrl(p.type, p.slug);
      if (seen.has(url)) continue;
      seen.add(url);
      lines.push(`- [${p.title}](${url}): ${p.description}`);
    }
  }
  return new Response(lines.join("\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
