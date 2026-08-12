import type { Metadata } from 'next';
import HeroBlock from '@/components/blocks/HeroBlock';
import EventTypeSelector from '@/components/blocks/EventTypeSelector';
import NamedPackageGrid from '@/components/blocks/NamedPackageGrid';
import InlinePriceCalculator from '@/components/blocks/InlinePriceCalculator';
import B2BSection from '@/components/blocks/B2BSection';
import MenuPreview from '@/components/blocks/MenuPreview';
import WhyUs from '@/components/blocks/WhyUs';
import ChefStory from '@/components/blocks/ChefStory';
import TrustBlock from '@/components/blocks/TrustBlock';
import TrustBar from '@/components/blocks/TrustBar';
import TestimonialsCarousel from '@/components/blocks/TestimonialsCarousel';
import CTASection from '@/components/blocks/CTASection';
import WowCase from '@/components/blocks/WowCase';
import { getReviews } from '@/lib/cms';

export const metadata: Metadata = {
  alternates: { canonical: '/', languages: { 'ru': '/', 'x-default': '/' } },
  // og:image provided by app/opengraph-image.tsx (dynamic 1200×630 PNG)
};

export const revalidate = 3600;

// Nilov Catering - Кейтеринг под ключ в Санкт-Петербурге (с 2007 года)
// Deploy fix Cycle 6 - ensuring correct build on Vercel

export default async function HomePage() {
  const cmsReviews = await getReviews();

  return (
    <main id="main">
      {/* 1. Hero — headline + price ladder + quick-route chips */}
      <HeroBlock />

      {/* 2. EVENT TYPES — выбор повода */}
      <EventTypeSelector />

      {/* 3. NAMED PACKAGES — 6 пакетов с фиксированной ценой */}
      <NamedPackageGrid />

      {/* 4. INLINE CALCULATOR — отвечает 'how much?' за 15 секунд */}
      <InlinePriceCalculator />

      {/* 5. B2B — для корпоративных клиентов (moved up from position 10) */}
      <B2BSection />

      {/* 6. MENU PREVIEW — фото блюд */}
      <MenuPreview />

      {/* 7. WHY US — 4 принципа + статы */}
      <WhyUs />

      {/* 7.5. CHEF STORY — история шефа Дмитрия Нилова */}
      <ChefStory />

      {/* 7.6. TRUST BLOCK — страхование, гарантии, лицензии */}
      <TrustBlock />

      {/* 8. TRUST — площадки СПб */}
      <TrustBar />

      {/* 9. TESTIMONIALS — из reviews.json */}
      <TestimonialsCarousel cmsReviews={cmsReviews.length >0 ? cmsReviews : undefined} />

      {/* 10. WOW CASE — избранный кейс */}
      <WowCase />

      {/* 11. CTA — главное действие */}
      <CTASection />
    </main>
  );
}
