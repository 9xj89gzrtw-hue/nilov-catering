import HeroBlock from '@/components/blocks/HeroBlock';
import HeroExtras from '@/components/blocks/HeroExtras';
import EventTypeSelector from '@/components/blocks/EventTypeSelector';
import FormatShowcase from '@/components/blocks/FormatShowcase';
import MenuPreview from '@/components/blocks/MenuPreview';
import TrustBar from '@/components/blocks/TrustBar';
import WhyUs from '@/components/blocks/WhyUs';
import ProcessSteps from '@/components/blocks/ProcessSteps';
import TestimonialsCarousel from '@/components/blocks/TestimonialsCarousel';
import CTASection from '@/components/blocks/CTASection';
import FAQTeaser from '@/components/blocks/FAQTeaser';
import { getTrustProofs, getAllPageTexts, getReviews } from '@/lib/cms';

export const revalidate = 3600;

export default async function HomePage() {
  const [cmsFacts, pageTexts, cmsReviews] = await Promise.all([
    getTrustProofs(),
    getAllPageTexts(),
    getReviews(),
  ]);

  const textMap = Object.fromEntries(pageTexts.map(t => [t.key, t.value]));

  return (
    <main>
      {/* 1. Hero — what we do, why it matters */}
      <HeroBlock
        subtitle={textMap['hero-sub']}
        disclaimer={textMap['hero-disclaimer']}
      />

      {/* 2. Quick pricing + action strip */}
      <HeroExtras />

      {/* 3. EVENT TYPES — what do you need? (6 cards) */}
      <EventTypeSelector />

      {/* 4. FORMATS — how we serve (3 format cards) */}
      <FormatShowcase />

      {/* 5. MENU PREVIEW — what you get */}
      <MenuPreview />

      {/* 6. TRUST — who trusts us */}
      <TrustBar />

      {/* 7. HOW WE WORK — simple process */}
      <ProcessSteps />

      {/* 8. RESPONSES — what customers say */}
      <TestimonialsCarousel cmsReviews={cmsReviews.length > 0 ? cmsReviews : undefined} />

      {/* 9. CTA — act now */}
      <CTASection />

      {/* 10. FAQ — answers to common questions */}
      <FAQTeaser />
    </main>
  );
}