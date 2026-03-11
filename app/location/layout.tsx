import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Us — Locations & Events",
  description:
    "Find Cleopatra Delights at Jacksonville farmers markets, pop-up events and festivals. Check our upcoming schedule, view the gallery and read customer reviews.",
  alternates: { canonical: "https://cleopatra-delights.vercel.app/location" },
  openGraph: {
    title: "Find Us — Cleopatra Delights Jacksonville",
    description: "Upcoming locations, events schedule, gallery and customer reviews for Cleopatra Delights.",
    url: "https://cleopatra-delights.vercel.app/location",
  },
};

export default function LocationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
