import type { Metadata } from "next";
import { SearchClient } from "@/components/SearchClient";
import { searchIndexEntries } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Search",
  description: "Search CleaningProductsReviews.com reviews, best lists, guides, comparisons, brands and categories.",
};

export default function SearchPage() {
  const entries = searchIndexEntries();
  return <SearchClient entries={entries} />;
}
