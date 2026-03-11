import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import SignatureSpotlight from "@/components/SignatureSpotlight";
import Gallery from "@/components/Gallery";
import FindUs from "@/components/FindUs";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";
import EgyptianDivider from "@/components/EgyptianDivider";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <EgyptianDivider opacity={0.22} />
        <SignatureSpotlight />
        <Gallery />
        <FindUs />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
