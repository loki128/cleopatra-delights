import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://cleopatradelights.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Cleopatra Delights — Global Desserts | Jacksonville, FL",
    template: "%s | Cleopatra Delights",
  },
  description:
    "Handcrafted globally-inspired desserts in Jacksonville, FL. Dubai Chocolate Cookies, Biscoff Cheesecakes, Ferrero Rocher Cake Bars and more. Food trailer serving local markets and events.",
  keywords: [
    "bakery Jacksonville FL",
    "desserts Jacksonville",
    "Dubai chocolate cookie Jacksonville",
    "custom cake Jacksonville",
    "food trailer Jacksonville",
    "global bakery Jacksonville",
    "Biscoff cheesecake",
    "custom desserts Jacksonville",
    "cookie cake Jacksonville",
  ],
  authors: [{ name: "Cleopatra Delights" }],
  creator: "Cleopatra Delights",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Cleopatra Delights",
    title: "Cleopatra Delights — A World of Extraordinary Desserts",
    description:
      "Globally-inspired handcrafted desserts in Jacksonville, FL. Dubai Chocolate Cookies, Biscoff Cheesecakes, Ferrero Rocher Cake Bars and more.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cleopatra Delights — A World of Extraordinary Desserts, Jacksonville FL",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cleopatra Delights — Global Desserts | Jacksonville, FL",
    description: "Handcrafted globally-inspired desserts. Food trailer serving Jacksonville markets and events.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: SITE_URL },
};

// JSON-LD Schema — FoodEstablishment
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FoodEstablishment",
  name: "Cleopatra Delights",
  description:
    "Globally-inspired handcrafted desserts — cookies, cheesecakes, brownies, cake bars and more. Food trailer and canopy stand serving Jacksonville, FL.",
  url: SITE_URL,
  servesCuisine: ["American", "Middle Eastern", "African", "Asian", "European"],
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Jacksonville",
    addressRegion: "FL",
    addressCountry: "US",
  },
  areaServed: {
    "@type": "City",
    name: "Jacksonville",
    sameAs: "https://en.wikipedia.org/wiki/Jacksonville,_Florida",
  },
  sameAs: ["https://www.instagram.com/cleopatradelights"],
  hasMap: "https://maps.google.com/?q=Jacksonville,FL",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Saturday", "Sunday"],
    description: "Available at local markets and pop-up events. Follow Instagram for schedule.",
  },
  menu: `${SITE_URL}/menu`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        {children}
      </body>
    </html>
  );
}
