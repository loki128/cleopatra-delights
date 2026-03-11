import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cleopatra Delights — A World of Extraordinary Desserts | Jacksonville, FL",
  description: "Globally-inspired handcrafted desserts from Jacksonville, FL. Dubai Chocolate Cookies, Biscoff Cheesecakes, Ferrero Rocher Cake Bars and more. Find our food trailer at local events.",
  keywords: "bakery Jacksonville FL, desserts Jacksonville, Dubai chocolate cookie, global bakery, food trailer Jacksonville",
  openGraph: {
    title: "Cleopatra Delights",
    description: "A world of extraordinary desserts — Jacksonville, FL",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
