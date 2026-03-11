import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Order",
  description:
    "Place a custom dessert order with Cleopatra Delights. Cookie cakes, cheesecakes, brownie trays, catering packages and more for birthdays, weddings and corporate events in Jacksonville, FL.",
  alternates: { canonical: "https://cleopatradelights.com/order" },
  openGraph: {
    title: "Custom Order — Cleopatra Delights",
    description: "Order custom desserts for your event. Birthdays, weddings, corporate catering — we deliver in Jacksonville, FL.",
    url: "https://cleopatradelights.com/order",
  },
};

export default function OrderLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
