import type { Metadata } from "next";
import Link from "next/link";
import TariffOffersSection from "@/components/blocks/TariffOffersSection";
import EventHero from "@/components/events/EventHero";

export const metadata: Metadata = {
  title: "Частные события — кейтеринг в СПб",
  description:
    "Кейтеринг для частных событий в СПб: дни рождения, юбилеи, семейные ужины. Дома, на веранде, на крыше.",
  alternates: {
    canonical: "/events/chastnoe",
    languages: { ru: "/events/chastnoe", "x-default": "/events/chastnoe" },
  },
};

const QUICK_FACTS = [
  { value: "от 2 450 ₽", label: "за гостя" },
  { value: "6–12", label: "гостей (камерный)" },
  { value: "у вас дома", label: "выезд кейтера" },
  { value: "0", label: "скрытых доплат" },
];

export default function ChastnoePage() {
  return (
    <main id="main" className="pb-20">
      {/* Premium Hero Section */}
      <EventHero
        label="Частные события · камерный формат"
        title="Частные события"
        description="Дни рождения, юбилеи, семейные ужины. Дома, на веранде, на крыше — мы приедем куда скажете. Праздник для ТСЖ / соседей? Кофе-брейк от 390 ₽/гость — на 100 человек = 39 000 ₽."
        breadcrumbName="Частные события"
        priceInfo={
          <>
            <span className="font-semibold">
              <span style={{ color: "#C9A66B" }}>от 2 450 ₽</span>/гость
            </span>
            <span className="text-white/40">·</span>
            <span>выезд на дом</span>
            <span className="text-white/40">·</span>
            <span>без скрытых доплат</span>
          </>
        }
        quickFacts={QUICK_FACTS}
      />

      <div className="container-site max-w-3xl">
        {/* Additional info section */}
        <div className="mt-12 mb-10 md:mt-16">
          <p className="mb-6 text-base leading-relaxed text-[#6B6560] md:text-lg">
            Праздник для ТСЖ / соседей? Кофе-брейк от 390 ₽/гость — на 100 человек = 39 000 ₽. Без
            официантов, доставка по ЖК.
          </p>

          {/* Coffee break highlight */}
          <div
            className="rounded-xl border border-[#C9A66B]/30 bg-[#C9A66B]/5 p-5"
            role="complementary"
            aria-labelledby="coffee-break-heading"
          >
            <h2
              id="coffee-break-heading"
              className="font-heading mb-2 text-lg font-medium text-[#2D2624]"
            >
              Кофе-брейк для соседей и ТСЖ
            </h2>
            <p className="mb-3 text-sm text-[#6B6560]">
              Лёгкий формат для неформальных собраний: канапе, мини-десерты, напитки. Доставка по
              жилому комплексу без официантов.
            </p>
            <Link
              href="/menu/coffee-break"
              className="text-sm font-semibold transition-colors hover:underline"
              style={{ color: "#C9A66B" }}
            >
              Кофе-брейк меню →
            </Link>
          </div>
        </div>

        <TariffOffersSection
          eventId="chastnoe"
          eventName="Частное событие"
          description="Тарифы для частных событий: от камерного ужина до гастрономического опыта с сомелье."
        />

        {/* CTA Section */}
        <div
          className="mt-12 rounded-xl p-6 text-center md:p-8"
          style={{
            background: "linear-gradient(135deg, #2D2624 0%, #3D3530 100%)",
          }}
        >
          <h2 className="font-heading mb-3 text-xl font-medium text-white md:text-2xl">
            Праздник у вас дома?
          </h2>
          <p className="mx-auto mb-6 max-w-md text-sm text-white/80 md:text-base">
            Расскажите о вашем событии — мы подберём меню под формат, количество гостей и бюджет.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/contact?subject=Частное+событие"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white no-underline transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #B8860B 0%, #D4AF37 50%, #AA771C 100%)",
                boxShadow: "0 4px 16px rgba(184,134,11,0.35), 0 0 0 1px rgba(212,175,55,0.2) inset",
              }}
            >
              Оставить заявку
            </Link>
            <a
              href="tel:+78129195911"
              className="inline-flex min-h-[44px] items-center rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white no-underline transition-colors hover:border-white/50 hover:bg-white/5"
            >
              +7 (812) 919-59-11
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
