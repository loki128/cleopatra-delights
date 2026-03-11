import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import SignatureSpotlight from "@/components/SignatureSpotlight";
import FeaturedMenu from "@/components/FeaturedMenu";
import Testimonials from "@/components/Testimonials";
import FindUs from "@/components/FindUs";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <SignatureSpotlight />
        <FeaturedMenu />
        <Testimonials />
        <FindUs />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
