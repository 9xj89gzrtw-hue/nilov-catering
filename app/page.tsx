import type { Metadata } from 'next';
import HeroBlock from '@/components/blocks/HeroBlock';
import EventTypeSelector from '@/components/blocks/EventTypeSelector';
import NamedPackageGrid from '@/components/blocks/NamedPackageGrid';
import MenuPreview from '@/components/blocks/MenuPreview';
import WhyUs from '@/components/blocks/WhyUs';
import TrustBar from '@/components/blocks/TrustBar';
import ProcessSteps from '@/components/blocks/ProcessSteps';
import TestimonialsCarousel from '@/components/blocks/TestimonialsCarousel';
import CTASection from '@/components/blocks/CTASection';
import WowCase from '@/components/blocks/WowCase';
import { getReviews } from '@/lib/cms';

export const metadata: Metadata = {
  alternates: { canonical: '/', languages: { 'ru': '/', 'en': '/en', 'x-default': '/' } },
  openGraph: { images: [{ url: '/og-image.png', width: 1200, height: 630 }] },
};

export const revalidate = 3600;

export default async function HomePage() {
  const cmsReviews = await getReviews();

  return (
    <main id="main">
      {/* 1. Hero — ONE static headline, photo carousel */}
      <HeroBlock />

      {/* 2. EVENT TYPES — выбор повода */}
      <EventTypeSelector />

      {/* 3. NAMED PACKAGES — 6 пакетов с фиксированной ценой (A-Catering pattern) */}
      <NamedPackageGrid />

      {/* 4. MENU PREVIEW — фото блюд */}
      <MenuPreview />

      {/* 5. WHY US — 4 принципа + статы */}
      <WhyUs />

      {/* 6. TRUST — площадки СПб */}
      <TrustBar />

      {/* 7. PROCESS — как мы работаем */}
      <ProcessSteps />

      {/* 8. TESTIMONIALS — из reviews.json */}
      <TestimonialsCarousel cmsReviews={cmsReviews.length > 0 ? cmsReviews : undefined} />

      {/* 9. WOW CASE — избранный кейс */}
      <WowCase />

      {/* 10. CTA — главное действие */}
      <CTASection />
    </main>
  );
}
