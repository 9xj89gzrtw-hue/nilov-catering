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
      {/* 1. HERO — full-screen atmospheric photo with centered serif headline.
          Replaces previous split layout (text on white + blurry video). */}
      <HeroBlock
        subtitle={textMap['hero-sub']}
        disclaimer={textMap['hero-disclaimer']}
      />

      {/* 2. ATMOSPHERIC PHOTO BAND — full-width banquet table image.
          World-class catering sites (Great Performances, Paula LeDuc) use
          this pause between hero and content to set emotional tone. */}
      <section className="relative w-full h-[40vh] md:h-[55vh] overflow-hidden" aria-label="Атмосфера событий NiloV">
        <picture>
          <source srcSet="/images/real/corporate-buffet.avif" type="image/avif" />
          <source srcSet="/images/real/corporate-buffet.webp" type="image/webp" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/real/corporate-buffet.jpg"
            alt="Сервировка фуршетного стола — кейтеринг NiloV"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </picture>
        <div
          className="absolute inset-0 flex items-end justify-center pb-12 md:pb-16"
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.10) 60%, rgba(0,0,0,0.25) 100%)',
          }}
          aria-hidden="true"
        />
        <p className="absolute bottom-10 md:bottom-14 left-0 right-0 text-center text-white/90 font-heading text-xl md:text-3xl italic px-6" style={{ fontWeight: 400 }}>
          Каждая деталь продумана — от фермерских продуктов до финального штриха
        </p>
      </section>

      {/* 3. EVENT TYPES — 4 основных формата с реальными фото. */}
      <EventTypeSelector />

      {/* 4. MENU PREVIEW — фото блюд + быстрый переход в каталог. */}
      <MenuPreview />

      {/* 5. TESTIMONIALS — отзывы клиентов. */}
      <TestimonialsCarousel cmsReviews={cmsReviews.length > 0 ? cmsReviews : undefined} />

      {/* 6. CTA — одно главное действие + телефон. */}
      <CTASection />
    </main>
  );
}
