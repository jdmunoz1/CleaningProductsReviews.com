import type { Metadata } from "next";
import { PageTitle } from "@/components/Page";

/**
 * Wraps static content pages (legal, etc.) in a consistent layout.
 * Also generates metadata from a description string.
 */
export function LegalPage({ title, lede, children }: { title: string; lede?: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <PageTitle title={title} lede={lede} />
      <div className="prose-body text-[15px]">{children}</div>
    </div>
  );
}

export function legalMetadata(title: string, description: string): Metadata {
  return { title, description };
}
