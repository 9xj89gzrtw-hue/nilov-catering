import HeroSection from "@/components/sections/HeroSection";
import TrustMarquee from "@/components/sections/TrustMarquee";
import ServicesSection from "@/components/sections/ServicesSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import StatsSection from "@/components/sections/StatsSection";
import MenuPreviewSection from "@/components/sections/MenuPreviewSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import GallerySection from "@/components/sections/GallerySection";
import BlogSection from "@/components/sections/BlogSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustMarquee />
      <ServicesSection />
      <WhyUsSection />
      <StatsSection />
      <MenuPreviewSection />
      <TestimonialsSection />
      <GallerySection />
      <BlogSection />
      <FAQSection />
      <CTASection />
    </>
  );
}