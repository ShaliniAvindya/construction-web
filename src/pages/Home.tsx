import HeroSection from "@/sections/HeroSection";
import ServicesPreview from "@/sections/ServicesPreview";
import FeaturedProjects from "@/sections/FeaturedProjects";
import StatsSection from "@/sections/StatsSection";
import TestimonialsSection from "@/sections/TestimonialsSection";
import CTABanner from "@/sections/CTABanner";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ServicesPreview />
      <FeaturedProjects />
      <StatsSection />
      <TestimonialsSection />
      <CTABanner />
    </main>
  );
}
