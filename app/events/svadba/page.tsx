import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ChefHat,
  CheckCircle2,
  Cake,
  UtensilsCrossed,
  ShieldCheck,
  MapPin,
  Calendar,
  Crown,
  Sparkles,
} from "lucide-react";
import EventHero from "@/components/events/EventHero";
import TariffOffersSection from "@/components/blocks/TariffOffersSection";
import ShareButton from "@/components/common/ShareButton";
import RelatedPages from "@/components/common/RelatedPages";
import SmartCTA from "@/components/common/SmartCTA";
import { RevealBlock } from "@/components/effects/MotionPrimitives";

export const metadata: Metadata = {
  alternates: {
    canonical: "/events/svadba",
    languages: { ru: "/events/svadba", "x-default": "/events/svadba" },
  },
  title: "Свадебный кейтеринг",
  description:
    "Свадебный кейтеринг NiloV в СПб: банкет, фуршет, торт, флористика. Полный цикл подготовки свадьбы под ключ.",
};

// ───────────────── QUICK FACTS ─────────────────
const QUICK_FACTS = [
  { value: "от 3 950 ₽", label: "за гостя" },
  { value: "20+", label: "минимум гостей" },
  { value: "19 лет", label: "свадебного опыта" },
];

// ───────────────── WHAT'S INCLUDED ─────────────────
const INCLUDES = [
  {
    title: "Эконом",
    price: "3 950 ₽",
    items: ["Доставка в КАД", "Сервировка и персонал", "Чай/кофе, морс", "Свадебный торт"],
  },
  {
    title: "Стандарт",
    price: "5 470 ₽",
    items: [
      "Доставка в КАД",
      "Сервировка и персонал",
      "Барная станция (вино 2 бокала)",
      "Десертный стол + торт",
      "Координатор события",
    ],
    highlight: true,
  },
  {
    title: "Премиум",
    price: "7 350 ₽",
    items: [
      "Всё из Стандарта",
      "Приветственный напиток",
      "Винная карта безлимит",
      "Шампанское (2 бокала)",
      "Морепродукты",
    ],
  },
  {
    title: "Люкс",
    price: "9 950 ₽",
    items: [
      "Всё из Премиума",
      "Торт на заказ",
      "Сомелье + дегустация вин",
      "Чёрная икра",
      "Упаковка остатков",
    ],
  },
];

// ───────────────── VENUES (top 6) ─────────────────
const VENUES = [
  {
    name: "Особняк Бруноз",
    area: "Петроградский",
    guests: "до 120",
    feature: "Исторический особняк, камерный зал",
  },
  {
    name: "Лофт «Севкабель»",
    area: "Васильевский",
    guests: "до 300",
    feature: "Панорама Невы, индустриальный стиль",
  },
  {
    name: "Константиновский дворец",
    area: "Стрельна",
    guests: "до 200",
    feature: "Дворцовый комплекс, набережная",
  },
  {
    name: "Лахта Центр",
    area: "Приморский",
    guests: "до 500",
    feature: "Небоскрёб, панорамные залы",
  },
  {
    name: "Особняк Половцова",
    area: "Адмиралтейский",
    guests: "до 80",
    feature: "Дворец XIX века, мраморный зал",
  },
  {
    name: "Царское Село",
    area: "Пушкин",
    guests: "до 150",
    feature: "Исторический парк, павильоны",
  },
];

export default function SvadbaPage() {
  return (
    <main id="main" className="pb-20">
      {/* ═══════════════ HERO ═══════════════ */}
      <EventHero
        label="Свадьбы под ключ"
        title="Свадебный кейтеринг"
        description="Меню, сервировка, торт, флористика — всё для вашей свадьбы"
        backgroundImage="/images/real/wedding-banquet.jpg"
        imageAlt="Свадебный банкет — кейтеринг NiloV"
        breadcrumbName="Свадьба"
        priceInfo={
          <>
            <span className="font-semibold">
              <span style={{ color: "#C9A66B" }}>от 3 950 ₽</span>/гость
            </span>
            <span className="text-white/40">·</span>
            <span>мин. 20 гостей</span>
          </>
        }
        quickFacts={QUICK_FACTS}
      />

      <div className="container-site max-w-5xl">
        {/* ═══════════════ BRIEF INTRO ═══════════════ */}
        <RevealBlock className="mt-12 mb-12 md:mt-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-muted-foreground mb-6 text-base leading-relaxed md:text-lg">
              Фиксированные цены по тарифам. Доплата только за индивидуальные пожелания. Скидка при
              бронировании заранее:{" "}
              <strong className="text-foreground">5% за 30 дней, 10% за 60, 15% за 90</strong>.
            </p>
            <ShareButton
              title="Свадебный кейтеринг — NiloV"
              text="Посмотри свадебные тарифы — нужно согласовать"
              label="Отправить ссылку"
            />
          </div>
        </RevealBlock>

        {/* ═══════════════ KEY BENEFITS (3 columns) ═══════════════ */}
        <RevealBlock className="mb-14">
          <div className="grid gap-5 sm:grid-cols-3">
            <div className="border-border bg-card rounded-xl border p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#C9A66B]/15">
                <Heart className="h-6 w-6 text-[#C9A66B]" />
              </div>
              <h3 className="font-heading text-foreground mb-2 text-base font-semibold">
                Под ключ
              </h3>
              <p className="text-muted-foreground text-sm">
                От меню до торта и флористики. Один договор, один координатор.
              </p>
            </div>

            <div className="border-border bg-card rounded-xl border p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#C9A66B]/15">
                <UtensilsCrossed className="h-6 w-6 text-[#C9A66B]" />
              </div>
              <h3 className="font-heading text-foreground mb-2 text-base font-semibold">
                Любые диеты
              </h3>
              <p className="text-muted-foreground text-sm">
                Веган, халяль, без глютена, аллергены — отдельные меню для гостей.
              </p>
            </div>

            <div className="border-border bg-card rounded-xl border p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#C9A66B]/15">
                <Calendar className="h-6 w-6 text-[#C9A66B]" />
              </div>
              <h3 className="font-heading text-foreground mb-2 text-base font-semibold">
                Работаем удалённо
              </h3>
              <p className="text-muted-foreground text-sm">
                Из Москвы или другого города? Видеодегустация, согласование онлайн.
              </p>
            </div>
          </div>
        </RevealBlock>

        {/* ═══════════════ MAIN CTA ═══════════════ */}
        <RevealBlock className="mb-14">
          <div className="rounded-2xl bg-gradient-to-r from-[#2D2624] to-[#3D3530] p-8 text-center md:p-10">
            <h2 className="font-heading mb-3 text-xl font-semibold text-white md:text-2xl">
              Готовы обсудить вашу свадьбу?
            </h2>
            <p className="mb-6 text-sm text-white/70 md:text-base">
              Перезвоним за 15 минут с расчётом меню и сервиса
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/plan/constructor?event=svadba"
                className="inline-flex items-center gap-2 rounded-lg px-8 py-3.5 text-sm font-semibold text-white transition-all hover:scale-[1.02]"
                style={{
                  background: "linear-gradient(135deg, #B8860B 0%, #D4AF37 50%, #AA771C 100%)",
                  boxShadow: "0 4px 20px rgba(184,134,11,0.4)",
                }}
              >
                <Heart className="h-4 w-4" />
                Рассчитать стоимость
              </Link>
              <a
                href="tel:+78129195911"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-8 py-3.5 text-sm font-semibold text-white/90 transition-all hover:bg-white/10"
              >
                +7 (812) 919-59-11
              </a>
            </div>
          </div>
        </RevealBlock>

        {/* ═══════════════ TARIFFS ═══════════════ */}
        <TariffOffersSection
          eventId="svadba"
          eventName="Свадьба"
          description="Выберите тариф или настройте меню под себя"
        />

        {/* ═══════════════ WHAT'S INCLUDED ═══════════════ */}
        <RevealBlock className="mt-14 mb-14">
          <div className="mb-8 text-center">
            <h2 className="font-heading text-foreground mb-2 text-2xl font-medium md:text-3xl">
              Что входит в тариф
            </h2>
            <p className="text-muted-foreground mx-auto max-w-xl text-sm">
              Каждый тариф включает полный цикл обслуживания
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {INCLUDES.map((tariff) => (
              <div
                key={tariff.title}
                className={`group relative overflow-hidden rounded-xl border p-5 transition-all ${
                  tariff.highlight
                    ? "border-[#C9A66B] bg-gradient-to-br from-[#C9A66B]/10 to-transparent shadow-lg"
                    : "border-border bg-card hover:border-[#C9A66B]/30"
                }`}
              >
                {tariff.highlight && (
                  <div className="absolute top-0 right-0 rounded-bl-lg bg-[#C9A66B] px-3 py-1">
                    <span className="flex items-center gap-1 text-xs font-semibold text-white">
                      <Crown className="h-3 w-3" /> Популярный
                    </span>
                  </div>
                )}
                <div className="mb-3 flex items-baseline justify-between">
                  <h3
                    className={`font-heading text-lg font-semibold ${
                      tariff.highlight ? "text-[#C9A66B]" : "text-foreground"
                    }`}
                  >
                    {tariff.title}
                  </h3>
                  <span
                    className={`text-sm font-semibold ${
                      tariff.highlight ? "text-[#C9A66B]" : "text-muted-foreground"
                    }`}
                  >
                    {tariff.price}
                    <span className="text-xs font-normal">/гость</span>
                  </span>
                </div>
                <ul className="space-y-2">
                  {tariff.items.map((item) => (
                    <li
                      key={item}
                      className="text-muted-foreground flex items-center gap-2.5 text-sm"
                    >
                      <CheckCircle2
                        className={`h-4 w-4 shrink-0 ${
                          tariff.highlight ? "text-[#C9A66B]" : "text-foreground/30"
                        }`}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Additional info */}
          <div className="text-muted-foreground mt-6 space-y-3 text-sm">
            <p className="flex items-start gap-2">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#C9A66B]/60" />
              <span>
                <strong className="text-foreground">Аллергены:</strong> исключаем 14 allergенов ТР
                ТС по запросу. Отдельное меню для каждой диеты.
              </span>
            </p>
            <p className="flex items-start gap-2">
              <Cake className="mt-0.5 h-4 w-4 shrink-0 text-[#C9A66B]/60" />
              <span>
                <strong className="text-foreground">Торт:</strong> включён во все тарифы. Веганский,
                БГ, без сахара — от 1 200 ₽/кг.
              </span>
            </p>
          </div>
        </RevealBlock>

        {/* ═══════════════ VENUES ═══════════════ */}
        <RevealBlock className="mb-14">
          <div className="mb-8 text-center">
            <h2 className="font-heading text-foreground mb-2 text-2xl font-medium md:text-3xl">
              Площадки Санкт-Петербурга
            </h2>
            <p className="text-muted-foreground mx-auto max-w-xl text-sm">
              Работаем на лучших площадках города. Знаем особенности каждой.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VENUES.map((venue) => (
              <article
                key={venue.name}
                className="group border-border bg-card overflow-hidden rounded-xl border p-5 transition-all hover:border-[#C9A66B]/40 hover:shadow-md"
              >
                <div className="mb-2 flex items-start justify-between">
                  <h3 className="font-heading text-foreground text-base font-semibold transition-colors group-hover:text-[#C9A66B]">
                    {venue.name}
                  </h3>
                  <MapPin className="h-4 w-4 shrink-0 text-[#C9A66B]/50" />
                </div>
                <p className="text-muted-foreground mb-1.5 flex items-center gap-1.5 text-xs">
                  {venue.area} · {venue.guests} гостей
                </p>
                <p className="text-foreground/70 text-xs leading-relaxed">{venue.feature}</p>
              </article>
            ))}
          </div>

          <p className="text-muted-foreground mt-6 text-center text-sm">
            Работаем на любой площадке —{" "}
            <Link
              href="/contact"
              className="font-semibold text-[#C9A66B] transition-colors hover:text-[#D4AF37]"
            >
              уточните вашу
              <Sparkles className="ml-1 inline-block h-3 w-3" />
            </Link>
          </p>
        </RevealBlock>

        {/* ═══════════════ CHEF QUOTE ═══════════════ */}
        <RevealBlock className="mb-14">
          <div className="relative overflow-hidden rounded-2xl border-l-4 border-[#C9A66B] bg-gradient-to-br from-[#2D2624]/90 to-[#3D3530]/90 p-6 md:p-8">
            <Gem className="absolute right-4 bottom-4 h-24 w-24 rotate-12 text-[#C9A66B]/10" />

            <blockquote className="relative">
              <Sparkles className="absolute -top-2 -left-2 h-8 w-8 text-[#C9A66B]/40" />
              <p className="font-heading mb-6 text-lg leading-relaxed text-white/95 italic md:text-xl">
                «Свадьба — это не банкет. Это день, когда каждая деталь говорит невесте: &lsquo;Ты
                важна&rsquo;. Мы готовим не еду — мы готовим спокойствие».
              </p>
            </blockquote>

            <div className="flex items-center gap-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-[#C9A66B]/40">
                <Image
                  src="/images/team/chef-nilov.jpg"
                  alt="Дмитрий Нилов"
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-white">Дмитрий Нилов</p>
                <p className="flex items-center gap-1.5 text-sm text-white/60">
                  <ChefHat className="h-3.5 w-3.5" />
                  Шеф-повар, основатель NiloV
                </p>
              </div>
            </div>
          </div>
        </RevealBlock>

        {/* ═══════════════ RELATED & FINAL CTA ═══════════════ */}
        <RelatedPages context="event" slug="svadba" />

        <SmartCTA
          context="event"
          slug="svadba"
          title="Начнём подготовку?"
          description="Оставьте заявку — перезвоним за 15 минут с готовым расчётом"
        />
      </div>
    </main>
  );
}

// Gem icon for chef quote decoration
function Gem({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 3h12l4 6-10 13L2 9z" />
      <path d="M11 3 8 9l4 13 4-13-3-6" />
      <path d="M2 9h20" />
    </svg>
  );
}
