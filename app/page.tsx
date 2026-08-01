import type { Metadata } from 'next';
import HeroBlock from '@/components/blocks/HeroBlock';
import EventTypeSelector from '@/components/blocks/EventTypeSelector';
import MenuPreview from '@/components/blocks/MenuPreview';
import TestimonialsCarousel from '@/components/blocks/TestimonialsCarousel';
import CTASection from '@/components/blocks/CTASection';
import { getAllPageTexts, getReviews } from '@/lib/cms';

export const metadata: Metadata = {
  alternates: { canonical: '/', languages: { 'ru': '/', 'en': '/en', 'x-default': '/' } },
  openGraph: {
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

export const revalidate = 3600;

export default async function HomePage() {
  const [pageTexts, cmsReviews] = await Promise.all([
    getAllPageTexts(),
    getReviews(),
  ]);

  const textMap = Object.fromEntries(pageTexts.map(t => [t.key, t.value]));

  return (
    <main id="main">
      {/* 1. HERO — один чёткий оффер, одно главное CTA.
          Trust-метрики (халяль/17 лет/3000+/4.8★) уже встроены в подвал hero,
          отдельный trust-strip удалён за избыточностью (см. C8 — number noise). */}
      <HeroBlock
        subtitle={textMap['hero-sub']}
        disclaimer={textMap['hero-disclaimer']}
      />

      {/* 2. EVENT TYPES — 4 основных формата + ссылка "Ещё".
          Раньше было 7 карточек в 2 группах → cognitive overload. */}
      <EventTypeSelector />

      {/* 3. MENU PREVIEW — фото блюд + быстрый переход в каталог */}
      <MenuPreview />

      {/* 4. TESTIMONIALS + unified trust strip — отзывы клиентов.
          TrustBar (кейсы/маркиз) объединён сюда как компактная полоса доверия
          над отзывами. Больше не отдельная секция. */}
      <TestimonialsCarousel cmsReviews={cmsReviews.length > 0 ? cmsReviews : undefined} />

      {/* 5. CTA — одно главное действие + телефон.
          Удалены: Brand Story (→ /why-us), ProcessSteps (→ /plan),
          WowCase (→ /gallery) — вынесены на тематические страницы. */}
      <CTASection />
    </main>
  );
}
