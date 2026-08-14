import type { Metadata } from "next";
import HeroBlock from "@/components/blocks/HeroBlock";
import EventTypeSelector from "@/components/blocks/EventTypeSelector";
import NamedPackageGrid from "@/components/blocks/NamedPackageGrid";
import InlinePriceCalculator from "@/components/blocks/InlinePriceCalculator";
import LeadCaptureForm from "@/components/blocks/LeadCaptureForm";
import B2BSection from "@/components/blocks/B2BSection";
import MenuPreview from "@/components/blocks/MenuPreview";
import PortfolioGallery from "@/components/blocks/PortfolioGallery";
import WhyUs from "@/components/blocks/WhyUs";
import ChefStory from "@/components/blocks/ChefStory";
import TrustBlock from "@/components/blocks/TrustBlock";
import TrustBar from "@/components/blocks/TrustBar";
import TestimonialsCarousel from "@/components/blocks/TestimonialsCarousel";
import WowCase from "@/components/blocks/WowCase";
import FAQSection from "@/components/blocks/FAQSection";
import CTASection from "@/components/blocks/CTASection";
import RelatedPages from "@/components/common/RelatedPages";
import { getReviews } from "@/lib/cms";

export const metadata: Metadata = {
  alternates: { canonical: "/", languages: { ru: "/", "x-default": "/" } },
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

      {/* 4.5. LEAD CAPTURE FORM — форма захвата лидов */}
      <section className="bg-background py-20 md:py-28" aria-labelledby="lead-form-heading">
        <div className="container-site mx-auto max-w-xl">
          <div className="mb-10 text-center">
            <p className="text-gold-text mb-3 text-xs font-medium tracking-[0.22em] uppercase">
              Быстрая заявка
            </p>
            <h2
              id="lead-form-heading"
              className="font-heading mb-3 text-3xl md:text-5xl"
              style={{ fontWeight: 500 }}
            >
              Получите персональное <span className="text-gold-text">предложение</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              Оставьте заявку — перезвоним через 15 минут с готовым расчётом
            </p>
          </div>
          <LeadCaptureForm />
        </div>
      </section>

      {/* 5. B2B — для корпоративных клиентов (moved up from position 10) */}
      <B2BSection />

      {/* 6. MENU PREVIEW — фото блюд */}
      <MenuPreview />

      {/* 6.5. PORTFOLIO GALLERY — галерея с фильтрами по типам мероприятий */}
      <PortfolioGallery />

      {/* 7. WHY US — 4 принципа + статы */}
      <WhyUs />

      {/* 7.5. CHEF STORY — история шефа Дмитрия Нилова */}
      <ChefStory />

      {/* 7.6. TRUST BLOCK — страхование, гарантии, лицензии */}
      <TrustBlock />

      {/* 8. TRUST — площадки СПб */}
      <TrustBar />

      {/* 9. TESTIMONIALS — из reviews.json */}
      <TestimonialsCarousel cmsReviews={cmsReviews.length > 0 ? cmsReviews : undefined} />

      {/* 10. WOW CASE — избранный кейс */}
      <WowCase />

      {/* 11. FAQ — частые вопросы на главной */}
      <FAQSection />

      {/* 12. CTA — главное действие */}
      <CTASection />

      {/* Связанные страницы — ключевые разделы для новых посетителей */}
      <div className="container-site pb-20">
        <RelatedPages context="info" slug="pricing" title="Популярные разделы" maxLinks={6} />
      </div>
    </main>
  );
}
