import type { Metadata } from 'next';
import HeroBlock from '@/components/blocks/HeroBlock';
import EventTypeSelector from '@/components/blocks/EventTypeSelector';
import MenuPreview from '@/components/blocks/MenuPreview';
import TrustBar from '@/components/blocks/TrustBar';
import ProcessSteps from '@/components/blocks/ProcessSteps';
import TestimonialsCarousel from '@/components/blocks/TestimonialsCarousel';
import CTASection from '@/components/blocks/CTASection';
import WowCase from '@/components/blocks/WowCase';
import Link from 'next/link';
import { SITE } from '@/lib/data';
import { getTrustProofs, getAllPageTexts, getReviews } from '@/lib/cms';

export const metadata: Metadata = {
  alternates: { canonical: '/', languages: { 'ru': '/', 'en': '/en', 'x-default': '/' } },
  openGraph: {
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

export const revalidate = 3600;

export default async function HomePage() {
  const [cmsFacts, pageTexts, cmsReviews] = await Promise.all([
    getTrustProofs(),
    getAllPageTexts(),
    getReviews(),
  ]);

  const textMap = Object.fromEntries(pageTexts.map(t => [t.key, t.value]));

  return (
    <main id="main">
      {/* 1. Hero — один чёткий оффер, одно главное CTA */}
      <HeroBlock
        subtitle={textMap['hero-sub']}
        disclaimer={textMap['hero-disclaimer']}
      />

      {/* 2. EVENT TYPES — выбор повода (7 карточек, 2 группы) */}
      <EventTypeSelector />

      {/* 3. MENU PREVIEW — фото блюд + быстрый переход в каталог */}
      <MenuPreview />

      {/* 4. TRUST — кейсы и отзывы (социальное доказательство) */}
      <TrustBar />

      {/* 5. HOW WE WORK — простой процесс в 4 шага */}
      <ProcessSteps />

      {/* 6. RESPONSES — отзывы клиентов */}
      <TestimonialsCarousel cmsReviews={cmsReviews.length > 0 ? cmsReviews : undefined} />

      {/* 7. WOW CASE — кейс месяца */}
      <WowCase />

      {/* 8. CTA — одно главное действие */}
      <CTASection />
    </main>
  );
}
