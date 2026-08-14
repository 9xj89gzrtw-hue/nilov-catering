import type { Metadata } from "next";
import Link from "next/link";
import EventHero from "@/components/events/EventHero";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Никах и ифтар — халяль-кейтеринг под ключ",
  description:
    "Халяль-кейтеринг для никаха и ифтара. Сертификат Совета муфтиев России. Отдельное оборудование, без свинины, без алкоголя. Ифтар от 1 800 ₽/гость, никах от 3 950 ₽/гость.",
  alternates: {
    canonical: "/events/nikah",
    languages: { ru: "/events/nikah", "x-default": "/events/nikah" },
  },
};

const QUICK_FACTS = [
  { value: "от 3 950 ₽", label: "никах / гость" },
  { value: "от 1 800 ₽", label: "ифтар / гость" },
  { value: "100%", label: "халяль" },
  { value: "0", label: "свинины, алкоголя" },
];

export default function NikahPage() {
  return (
    <main id="main" className="pb-20">
      {/* Premium Hero Section */}
      <EventHero
        label="Халяль-кейтеринг"
        title="Никах и ифтар"
        description="Полностью халяль-меню для никаха (мусульманской свадьбы) и ифтара (разговения в Рамадан). Сертификат Совета муфтиев России, отдельная линия производства, без свинины и алкоголя."
        breadcrumbName="Никах и ифтар"
        priceInfo={
          <>
            <span className="font-semibold">
              <span style={{ color: "#C9A66B" }}>Никах от 3 950 ₽</span>/гость
            </span>
            <span className="text-white/40">·</span>
            <span>мин. 15 гостей</span>
            <span className="text-white/40">·</span>
            <span className="font-semibold">
              <span style={{ color: "#C9A66B" }}>Ифтар от 1 800 ₽</span>/гость
            </span>
            <span className="text-white/40">·</span>
            <span>мин. 20 гостей</span>
          </>
        }
        quickFacts={QUICK_FACTS}
      />

      <div className="container-site max-w-4xl">
        {/* CTA Banner */}
        <div className="-mx-4 mt-12 mb-10 rounded-xl border-2 border-[#C9A66B]/30 bg-[#C9A66B]/5 p-5 sm:-mx-6 md:-mx-8 md:p-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm font-medium text-[#2D2624]">
              Рассчитаем меню под ваш бюджет и количество гостей
            </p>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/plan/constructor?format=banket&diet=halal"
                className="inline-flex min-h-[44px] items-center rounded-lg px-4 py-2 text-sm font-semibold text-white no-underline transition-colors"
                style={{
                  background: "linear-gradient(135deg, #B8860B 0%, #D4AF37 50%, #AA771C 100%)",
                }}
              >
                Собрать меню
              </Link>
              <Link
                href="/menu/halal"
                className="inline-flex min-h-[44px] items-center rounded-lg border border-[#E8E4DE] bg-white px-4 py-2 text-sm font-medium text-[#2D2624] no-underline transition-colors hover:border-[#C9A66B]"
              >
                Каталог халяль-блюд
              </Link>
              <a
                href={`tel:${SITE.phoneTel}`}
                className="inline-flex min-h-[44px] items-center rounded-lg border border-[#E8E4DE] bg-white px-4 py-2 text-sm font-medium text-[#2D2624] no-underline transition-colors hover:border-[#C9A66B]"
              >
                {" "}
                {SITE.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Что входит */}
        <section className="mb-10">
          <h2 className="font-heading mb-4 text-2xl font-medium text-[#2D2624]">Что входит</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                t: "Сертификат халяль",
                d: "Совет муфтиев России, рег. № СМР-Халяль (скан по запросу). Действует до 31.12.2026.",
              },
              {
                t: "Отдельное оборудование",
                d: "Полностью раздельные линии: ножи, доски, посуда, плиты. Без кросс-контаминации.",
              },
              {
                t: "Забой по обряду зибха",
                d: "С произнесением такбира (tasmiya). Поставщик — сертифицированные халяль-бойни Ленинградской области.",
              },
              {
                t: "Без свинины и алкоголя",
                d: "Полное отсутствие в меню. Без вина в соусах, без рома в десертах.",
              },
              {
                t: "Меню по канонам",
                d: "Кутья, халва, чак-чак, плов, манты, самса, долма, хумус, фаттуш, баклажаны.",
              },
              {
                t: "Время ифтара",
                d: "Доставка с учётом точного времени заката. Менеджер уточняет за день до мероприятия.",
              },
            ].map((item) => (
              <div
                key={item.t}
                className="rounded-xl border border-[#E8E4DE] bg-white p-4 transition-colors hover:border-[#C9A66B]/30"
              >
                <h3 className="font-heading mb-1 text-base font-medium text-[#2D2624]">{item.t}</h3>
                <p className="text-sm text-[#6B6560]">{item.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Никах или ифтар */}
        <section className="mb-10">
          <h2 className="font-heading mb-4 text-2xl font-medium text-[#2D2624]">
            Никах или ифтар?
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div
              className="rounded-xl border-2 border-emerald-200 bg-emerald-50/30 p-5"
              role="article"
            >
              <h3 className="font-heading mb-2 text-xl font-medium text-emerald-900">Никах</h3>
              <p className="mb-3 text-sm text-[#6B6560]">
                Мусульманская свадебная церемония. Банкет с посадкой, отдельно мужская и женская
                зоны по запросу. Меню от 3 950 ₽/гость, мин. 15 гостей.
              </p>
              <ul className="space-y-1 text-sm text-[#2D2624]/90">
                <li>• Банкет с посадкой, 4–6 перемен блюд</li>
                <li>• Безалкогольные напитки: морсы, лимонады, чай</li>
                <li>• Халяль-десерты: чак-чак, халва, щербет</li>
                <li>• Официанты и сервировка</li>
                <li>• Возможна раздельная сервировка зон</li>
              </ul>
            </div>
            <div className="rounded-xl border-2 border-amber-200 bg-amber-50/30 p-5" role="article">
              <h3 className="font-heading mb-2 text-xl font-medium text-amber-900">Ифтар</h3>
              <p className="mb-3 text-sm text-[#6B6560]">
                Разговение после заката в месяц Рамадан. Фуршетный формат с датами, водой и лёгкими
                закусками. Меню от 1 800 ₽/гость, мин. 20 гостей.
              </p>
              <ul className="space-y-1 text-sm text-[#2D2624]/90">
                <li>• Финики и вода — традиционное начало</li>
                <li>• Лёгкие закуски: хумус, фаттуш, долма</li>
                <li>• Горячее: плов, манты, самса</li>
                <li>• Скидка 10% для коллективов 30+</li>
                <li>• Доставка точно к времени заката</li>
              </ul>
            </div>
          </div>
        </section>

        {/* B2B section */}
        <section
          className="mb-10 rounded-xl border-2 border-[#C9A66B]/30 bg-[#C9A66B]/5 p-6"
          role="complementary"
        >
          <h2 className="font-heading mb-3 text-xl font-medium text-[#2D2624]">
            B2B и тендеры · НДС
          </h2>
          <p className="mb-2 text-sm text-[#2D2624]">
            Без НДС (УСН). НДС через партнёрское ООО. ЭДО: Контур.Диадок, СБИС. Договор: ИП Нилов
            Д.И., ИНН 781433059704, ОГРНИП 314784710400401.
          </p>
          <Link
            href="/contact?subject=B2B-тендер"
            className="text-sm font-semibold transition-colors hover:underline"
            style={{ color: "#C9A66B" }}
          >
            Запросить КП и пакет документов →
          </Link>
        </section>

        {/* Final CTA */}
        <section
          className="rounded-xl border-2 border-[#C9A66B]/30 bg-[#C9A66B]/5 p-6"
          role="region"
          aria-labelledby="final-cta-heading"
        >
          <h2
            id="final-cta-heading"
            className="font-heading mb-3 text-xl font-medium text-[#2D2624]"
          >
            Готовы обсудить детали?
          </h2>
          <p className="mb-4 text-sm text-[#6B6560]">
            Шеф-повар Дмитрий Нилов лично подберёт меню под ваш праздник. Перезвоним в течение 15
            минут.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact?subject=Никах-или-ифтар"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white no-underline transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #B8860B 0%, #D4AF37 50%, #AA771C 100%)",
                boxShadow: "0 4px 16px rgba(184,134,11,0.35), 0 0 0 1px rgba(212,175,55,0.2) inset",
              }}
            >
              Оставить заявку
            </Link>
            <Link
              href="/plan/constructor?format=banket&diet=halal"
              className="inline-flex min-h-[44px] items-center rounded-lg border border-[#E8E4DE] bg-white px-5 py-2.5 text-sm font-medium text-[#2D2624] no-underline transition-colors hover:border-[#C9A66B]"
            >
              Собрать меню
            </Link>
            <a
              href={`https://wa.me/${SITE.phoneTel.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center rounded-lg border border-[#E8E4DE] bg-white px-5 py-2.5 text-sm font-medium text-[#2D2624] no-underline transition-colors hover:border-[#C9A66B]"
            >
              WhatsApp
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
