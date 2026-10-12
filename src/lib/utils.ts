export function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function readingTime(words: number) {
  return Math.max(1, Math.round(words / 200));
}

export function estimateWords(blocks: { type: string; text?: string; items?: string[] }[]): number {
  let n = 0;
  const count = (s?: string) => (s ? s.split(/\s+/).length : 0);
  for (const b of blocks) {
    n += count(b.text ?? "");
    if (b.items) n += b.items.reduce((a, i) => a + count(i), 0);
  }
  return n;
}

export const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});
