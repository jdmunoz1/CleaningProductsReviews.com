import type { Metadata } from "next";
import { Archivo, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "@/components/Site";
import { site } from "@/content/site";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";

/* Archivo carries the label caps (its width axis gives the narrow print); Source Sans 3 is the reading face. */
const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });
const source = Source_Sans_3({ subsets: ["latin"], variable: "--font-source", display: "swap" });

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
  themeColor: "#fbfaf7",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${source.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
