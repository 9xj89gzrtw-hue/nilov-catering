import HeroSection from "@/components/sections/HeroSection";
import SocialProofBar from "@/components/sections/SocialProofBar";
import PhilosophySection from "@/components/sections/PhilosophySection";
import ServicesSection from "@/components/sections/ServicesSection";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import GallerySection from "@/components/sections/GallerySection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import MenuPreviewSection from "@/components/sections/MenuPreviewSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SocialProofBar />
      <PhilosophySection />
      <ServicesSection />
      <ProcessTimeline />
      <GallerySection />
      <TestimonialsSection />
      <MenuPreviewSection />
      <FAQSection />
      <CTASection />
    </>
  );
}