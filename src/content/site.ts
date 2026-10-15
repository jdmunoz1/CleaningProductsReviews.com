/**
 * Brand / site-wide configuration for CleaningProductsReviews.com.
 * Change brand identity, nav, contact and metadata here without touching pages.
 */
export const site = {
  name: "CleaningProductsReviews.com",
  shortName: "Cleaning Products Reviews",
  tagline:
    "Independent reviews, comparisons and practical buying guides for cleaning products, tools and machines.",
  domain: "https://www.cleaningproductsreviews.com",
  description:
    "Independent reviews, comparisons and buying guides for cleaning products, tools and machines that actually work. Research-based recommendations for vacuums, carpet cleaners, kitchen, bathroom, pet, eco-friendly cleaning and more.",
  heroTitle: "Find the Cleaning Products That Actually Work",
  email: "hello@cleaningproductsreviews.com",
  founded: 2026,
  /** Last site-wide content revision; sitemap lastmod for pages without their own `updated` date. */
  contentUpdated: "2026-10-15",
  genre: ["ProductReviews", "BuyingGuides", "ComparisonShopping"],
  organization: {
    name: "CleaningProductsReviews.com Editorial Team",
    legalName: "Cleaning Products Reviews",
    sameAs: [],
  },
  // Current editorial lead for E-E-A-T.
  authors: [
    {
      name: "CleaningProductsReviews.com Editorial Team",
      role: "Research and editorial team",
      bio: "The editorial team researches and compares cleaning products across vacuums, floor care, kitchen, bathroom, pet, eco-friendly, laundry and specialist cleaning. Findings are based on product documentation, manufacturer specs, category research and buyer guidance — never on unverified hands-on testing.",
      image: "/images/authors/team.svg",
      sameAs: [],
    },
  ],
};

export const nav = {
  primary: [
    { label: "Vacuums & Machines", href: "/categories/vacuums" },
    { label: "Floor & Carpet", href: "/categories/floor-carpet" },
    { label: "Kitchen", href: "/categories/kitchen" },
    { label: "Bathroom", href: "/categories/bathroom" },
    { label: "Pet Cleaning", href: "/categories/pet-cleaning" },
    { label: "Eco-Friendly", href: "/categories/eco-friendly" },
    { label: "Tools & Accessories", href: "/categories/tools-accessories" },
    { label: "Laundry", href: "/categories/laundry" },
    { label: "Specialist", href: "/categories/specialist" },
  ],
  utility: [
    { label: "Product Finder", href: "/product-finder" },
    { label: "Search", href: "/search" },
    { label: "Reviews", href: "/reviews" },
    { label: "Buying Guides", href: "/guides" },
    { label: "Compare", href: "/compare" },
  ],
};

export const footer = {
  about:
    "CleaningProductsReviews.com is an independent editorial site publishing research-based reviews, comparisons and buying guides for the cleaning industry. We may earn a commission when you buy through links on our site — see our affiliate disclosure.",
  legal: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Use", href: "/terms" },
    { label: "Editorial Policy", href: "/editorial-policy" },
    { label: "Review Methodology", href: "/review-methodology" },
  ],
  explore: [
    { label: "Site Map", href: "/sitemap" },
    { label: "Product Finder", href: "/product-finder" },
    { label: "All Reviews", href: "/reviews" },
    { label: "Buying Guides", href: "/guides" },
    { label: "Comparisons", href: "/compare" },
    { label: "Brand Hubs", href: "/sitemap#brands" },
  ],
};
