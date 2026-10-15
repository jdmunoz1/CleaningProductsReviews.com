import type { Metadata } from "next";
import "./globals.css";
import { Header, Footer } from "@/components/Site";
import { site } from "@/content/site";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: `Cleaning Product Reviews & Buying Guides | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  authors: site.authors.map((a) => ({ name: a.name })),
  robots: { index: true, follow: true },
  openGraph: {
    siteName: site.name,
    type: "website",
    locale: "en_US",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0e7490",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
