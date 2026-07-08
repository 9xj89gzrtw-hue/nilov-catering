import HeroSection from "@/components/sections/HeroSection";
import TrustMarquee from "@/components/sections/TrustMarquee";
import SocialProofBar from "@/components/sections/SocialProofBar";
import ServicesSection from "@/components/sections/ServicesSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import StatsSection from "@/components/sections/StatsSection";
import MenuPreviewSection from "@/components/sections/MenuPreviewSection";
import QuickCalcWidget from "@/components/sections/QuickCalcWidget";
import AvailabilityCalendar from "@/components/sections/AvailabilityCalendar";
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
      <SocialProofBar />
      <ServicesSection />
      <WhyUsSection />
      <ProcessTimeline />
      <StatsSection />
      <MenuPreviewSection />
      <QuickCalcWidget />
      <AvailabilityCalendar />
      <TestimonialsSection />
      <GallerySection />
      <BlogSection />
      <FAQSection />
      <CTASection />
    </>
  );
}