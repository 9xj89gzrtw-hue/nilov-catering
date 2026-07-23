import type { Metadata } from 'next';
import Link from 'next/link';
import HeroBlock from '@/components/blocks/HeroBlock';
import HeroExtras from '@/components/blocks/HeroExtras';
import DeliveryBanner from '@/components/blocks/DeliveryBanner';
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
import { SITE } from '@/lib/data';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
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
    <main>
      {/* 1. Hero — what we do, why it matters */}
      <HeroBlock
        subtitle={textMap['hero-sub']}
        disclaimer={textMap['hero-disclaimer']}
      />

      {/* 2. Quick pricing + action strip */}
      <HeroExtras />

      {/* 2b. Delivery banner — для тех, кому нужна просто еда без мероприятия */}
      <DeliveryBanner />

      {/* 3. EVENT TYPES — what do you need? (8 cards including yubiley) */}
      <EventTypeSelector />

      {/* 3b. B2B BLOCK — для корпоративных клиентов, школ, учреждений */}
      <section className="py-12 md:py-16 bg-secondary/40" aria-labelledby="b2b-heading">
        <div className="container-site max-w-5xl">
          <div className="rounded-2xl border-2 border-gold-tint bg-card p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <div>
                <p className="font-mono text-xs tracking-[0.2em] text-gold-text uppercase mb-2">Для бизнеса</p>
                <h2 id="b2b-heading" className="font-heading text-2xl md:text-3xl font-medium mb-2">
                  💼 B2B-кейтеринг: договор, ЭДО, НДС
                </h2>
                <p className="text-base text-muted-foreground max-w-2xl">
                  Работаем с корпоративными клиентами, школами, учреждениями, гос. заказчиками (44-ФЗ, 223-ФЗ).
                  Полный пакет документов для Роспотребнадзора. SLA, страхование 5 млн ₽, contingency plan.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
              <div className="p-3 rounded-lg border border-line bg-background">
                <p className="text-sm font-semibold mb-1">📋 Документы</p>
                <p className="text-xs text-muted-foreground">Договор, счёт, акт, счёт-фактура, ЭДО (Диадок, СБИС)</p>
              </div>
              <div className="p-3 rounded-lg border border-line bg-background">
                <p className="text-sm font-semibold mb-1">💰 НДС</p>
                <p className="text-xs text-muted-foreground">ИП Нилов Д.И. — УСН (без НДС). Для плательщиков НДС — партнёрское ООО.</p>
              </div>
              <div className="p-3 rounded-lg border border-line bg-background">
                <p className="text-sm font-semibold mb-1">🛡 Роспотребнадзор</p>
                <p className="text-xs text-muted-foreground">Медкнижки, бракераж, ППК, HACCP, декларация ЕАЭС</p>
              </div>
              <div className="p-3 rounded-lg border border-line bg-background">
                <p className="text-sm font-semibold mb-1">🎓 Школы</p>
                <p className="text-xs text-muted-foreground">Спец. тариф от 1 800 ₽/гость. Пакет документов для тендера.</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/events/korporativ"
                className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors no-underline"
              >
                B2B-кейтеринг →
              </Link>
              <Link
                href="/events/vypusknoy"
                className="rounded-lg border border-line bg-background px-5 py-2.5 text-sm font-semibold hover:border-gold-text transition-colors no-underline"
              >
                🎓 Школьный выпускной
              </Link>
              <Link
                href="/certificates"
                className="rounded-lg border border-line bg-background px-5 py-2.5 text-sm font-semibold hover:border-gold-text transition-colors no-underline"
              >
                📋 Сертификаты
              </Link>
              <a
                href={`mailto:${SITE.email}?subject=B2B-запрос`}
                className="rounded-lg border border-line bg-background px-5 py-2.5 text-sm font-semibold hover:border-gold-text transition-colors no-underline"
              >
                ✉️ {SITE.email}
              </a>
            </div>
          </div>
        </div>
      </section>

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