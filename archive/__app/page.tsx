import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { TrustedBy } from "@/components/landing/trusted-by";
import { HowItWorks } from "@/components/landing/how-it-works";
import { StandardShowcase } from "@/components/landing/standard-showcase";
import { AIShowcase } from "@/components/landing/ai-showcase";
import { NetworkingBenefits } from "@/components/landing/networking-benefits";
import { AIFeaturesGrid } from "@/components/landing/ai-features-grid";
import { OrganizerSection } from "@/components/landing/organizer-section";
import { Testimonials } from "@/components/landing/testimonials";
import { Pricing } from "@/components/landing/pricing";
import { FAQ } from "@/components/landing/faq";
import { FinalCTA } from "@/components/landing/final-cta";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <TrustedBy />
      <HowItWorks />
      <StandardShowcase />
      <AIShowcase />
      <NetworkingBenefits />
      <AIFeaturesGrid />
      <OrganizerSection />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
