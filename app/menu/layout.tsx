import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Full Menu",
  description:
    "Browse all 58 handcrafted desserts at Cleopatra Delights — NYC Cookies, Cheesecakes, Brownies, Cake Bars, Blondies, Shortcakes and Signature Cakes. Available in Jacksonville, FL.",
  alternates: { canonical: "https://cleopatra-delights.vercel.app/menu" },
  openGraph: {
    title: "Full Menu — Cleopatra Delights",
    description: "58 globally-inspired handcrafted desserts. Filter by category and search by name.",
    url: "https://cleopatra-delights.vercel.app/menu",
  },
};

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
