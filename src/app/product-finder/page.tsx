import type { Metadata } from "next";
import { ProductFinderClient } from "./client";

export const metadata: Metadata = {
  title: "Product Finder",
  description: "Answer three quick questions about your floors, pets and cleaning routine — we'll point you to the right reviews.",
};

export default function ProductFinderPage() {
  return <ProductFinderClient />;
}
