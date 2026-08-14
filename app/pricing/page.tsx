import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import FoodPhoto from "@/components/common/FoodPhoto";
import { Check, ArrowRight, Calculator, Users } from "lucide-react";
import { SITE } from "@/lib/data";
import RelatedPages from "@/components/common/RelatedPages";
import SmartCTA from "@/components/common/SmartCTA";

export const metadata: Metadata = {
  title: "Цены на кейтеринг в СПб — от 390 ₽/гость",
  description:
    "Прозрачные цены: фуршет от 2 450 ₽, банкет от 3 950 ₽, кофе-брейк от 390 ₽ за гостя. Всё включено. Без скрытых платежей.",
  alternates: { canonical: "/pricing", languages: { ru: "/pricing", "x-default": "/pricing" } },
};

export const dynamic = "force-static";

// === 6 ОСНОВНЫХ ФОРМАТОВ — простая таблица ===
const FORMATS = [
  {
    name: "Кофе-брейк",
    href: "/menu/coffee-break",
    img: "/images/menu/deserty/d1.jpg",
    price: 390,
    min: 10,
    hours: "1–2 ч",
    desc: "Выпечка, сэндвичи, кофе. Для конференций и тренингов.",
    includes: ["Сэндвичи и выпечка", "Кофе и чай", "Фрукты", "Бумажная посуда", "Доставка по КАД"],
  },
  {
    name: "Фуршет",
    href: "/menu/furshet",
    img: "/images/menu/kanape/k1.jpg",
    price: 2450,
    min: 20,
    hours: "2–3 ч",
    desc: "Канапе, тарталетки, мини-бургеры. Гости едят стоя.",
    includes: [
      "12+ закусок",
      "Напитки",
      "Официант 1/15",
      "Фуршетная сервировка",
      "Доставка по КАД",
    ],
  },
  {
    name: "Банкет",
    href: "/menu/banquet",
    img: "/images/real/beef-medallions.jpg",
    price: 3950,
    min: 15,
    hours: "4–6 ч",
    desc: "Полный ужин с посадкой. Для свадеб и торжеств.",
    includes: [
      "4 перемены блюд",
      "Торт включён",
      "Официант 1/10",
      "Банкетная сервировка",
      "Координатор",
    ],
    popular: true,
  },
  {
    name: "Шеф на дом",
    href: "/events/chef-at-home",
    img: "/images/dishes-new/beef-steak.jpg",
    price: 4500,
    priceUnit: "₽/гость",
    min: 6,
    hours: "3–6 ч",
    desc: "Шеф-повар приезжает к вам. Авторское меню.",
    includes: [
      "4–6 перемен блюд",
      "Премиум-фарфор",
      "Сервировка и уборка",
      "Все продукты",
      "Сомелье (опц.)",
    ],
  },
  {
    name: "Детский праздник",
    href: "/events/detskoe",
    img: "/images/catering/dessert-01.jpg",
    price: 1550,
    min: 10,
    hours: "2–3 ч",
    desc: "Специальное меню + аниматор. Для дней рождения.",
    includes: [
      "Мини-бургеры и пицца",
      "Капкейки и фрукты",
      "Соки и морсы",
      "Аниматор 2 часа",
      "Праздничная посуда",
    ],
  },
  {
    name: "BBQ «Пикник»",
    href: "/seasonal/bbq",
    img: "/images/catering/bbq-01.jpg",
    price: 2450,
    min: 15,
    hours: "3–4 ч",
    desc: "Гриль на природе. Мангал, шашлык, овощи гриль.",
    includes: [
      "3 вида мяса на мангале",
      "Овощи гриль",
      "Соусы и маринады",
      "Бармен",
      "Пикниковая сервировка",
    ],
  },
  {
    name: "Поминки",
    href: "/events/pominki",
    img: "/images/real/beef-medallions.jpg",
    price: 1800,
    min: 10,
    hours: "2–3 ч",
    desc: "Деликатное меню с традиционными блюдами. Тихая подача.",
    includes: [
      "Традиционные блюда",
      "Кутья и блины",
      "Чай и выпечка",
      "Официант 1/15",
      "Доставка по КАД",
    ],
  },
  {
    name: "Веган",
    href: "/menu/vegan",
    img: "/images/menu/salady/s1.jpg",
    price: 2950,
    min: 10,
    hours: "3–4 ч",
    desc: "Растительное меню без животных продуктов. Сертифицировано.",
    includes: [
      "12+ веган-блюд",
      "Растительные десерты",
      "Соки и смузи",
      "Официант 1/15",
      "Эко-посуда (опц.)",
    ],
  },
  {
    name: "Шоу-кукинг",
    href: "/menu/show-cooking",
    img: "/images/dishes-new/beef-steak.jpg",
    price: 3950,
    min: 20,
    hours: "3–4 ч",
    desc: "Шеф готовит на ваших глазах. Эффектная подача и фламбе.",
    includes: [
      "Живая готовка на глазах",
      "Фламбе и шоу-элементы",
      "Премиум-ингредиенты",
      "Сомелье (опц.)",
      "Координатор",
    ],
  },
  {
    name: "Халяль",
    href: "/menu/halal",
    img: "/images/catering/wedding-02.jpg",
    price: 3950,
    min: 15,
    hours: "4–6 ч",
    desc: "Меню по канонам ислама. Сертификат халяль.",
    includes: [
      "Сертифицированное мясо",
      "Традиционные блюда",
      "Без алкоголя",
      "Официант 1/12",
      "Координатор",
    ],
  },
];

// === Примеры реальных счетов ===
const EXAMPLES = [
  { event: "Свадьба 50 чел", format: "Банкет", perGuest: 3950, guests: 50, total: 197500 },
  { event: "Корпоратив 30 чел", format: "Фуршет", perGuest: 2450, guests: 30, total: 73500 },
  { event: "Конференция 20 чел", format: "Кофе-брейк", perGuest: 390, guests: 20, total: 7800 },
  { event: "День рождения 6 чел", format: "Шеф на дом", perGuest: 4500, guests: 6, total: 27000 },
];

export default function PricingPage() {
  return (
    <main className="pt-24 pb-20" id="main">
      <div className="container-site max-w-5xl">
        <Breadcrumbs />

        {/* HERO — простая, с одной цифрой */}
        <div className="mb-12 text-center">
          <h1
            className="font-heading mb-4 text-4xl font-medium md:text-6xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            Цены на кейтеринг
          </h1>
          <p className="text-muted-foreground mx-auto mb-4 max-w-2xl text-lg md:text-xl">
            10 форматов. От <strong className="text-foreground">390 ₽/гость</strong>. Всё включено —
            еда, персонал, посуда, доставка.
          </p>
          {/* Urgency + trust */}
          <p className="text-muted-foreground mb-6 text-sm">
            ⏱ Бронь за 3 дня · 📞 Перезвоним за 15 минут · ✅ Без скрытых платежей
          </p>
          <p className="text-muted-foreground mx-auto mb-6 max-w-xl text-xs">
            Все цены включают: еду, официантов, посуду, сервировку, доставку по КАД и уборку.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/plan/helper"
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-colors"
            >
              <Calculator className="h-4 w-4" />
              Рассчитать — ответим за 15 минут
            </Link>
            <a
              href={`tel:${SITE.phoneTel}`}
              className="border-line bg-card hover:border-gold-text inline-flex items-center gap-2 rounded-lg border px-6 py-3 text-sm font-semibold transition-colors"
            >
              {SITE.phone}
            </a>
          </div>

          {/* Документы для скачивания */}
          <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs">
            <a
              href="/api/templates/dogovor"
              download
              className="text-muted-foreground hover:text-gold-text underline"
            >
              Договор PDF
            </a>
            <a
              href="/api/templates/nda"
              download
              className="text-muted-foreground hover:text-gold-text underline"
            >
              NDA PDF
            </a>
            <a
              href="/api/templates/sla"
              download
              className="text-muted-foreground hover:text-gold-text underline"
            >
              SLA PDF
            </a>
          </div>
        </div>

        {/* 4 ФОРМАТА — простые карточки с ценой */}
        <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {FORMATS.map((fmt) => (
            <div
              key={fmt.name}
              className={`relative overflow-hidden rounded-2xl border-2 ${fmt.popular ? "border-gold-text shadow-gold/10 shadow-lg" : "border-line"} bg-card flex`}
            >
              {fmt.popular && (
                <div className="absolute top-3 right-3 z-10">
                  <span className="bg-gold-text rounded-full px-2 py-1 text-xs font-semibold text-white">
                    Популярно
                  </span>
                </div>
              )}

              {/* Фото — фиксированная ширина, квадрат */}
              <div className="bg-secondary relative w-36 shrink-0 overflow-hidden md:w-40">
                <FoodPhoto
                  src={fmt.img}
                  alt={fmt.name}
                  aspectRatio="square"
                  className="h-full w-full"
                />
              </div>

              {/* Контент — занимает остаток */}
              <div className="flex flex-1 flex-col p-5">
                <h2 className="font-heading mb-1 text-xl font-medium">{fmt.name}</h2>
                <p className="text-muted-foreground mb-3 text-xs">{fmt.desc}</p>

                {/* Цена — КРУПНО */}
                <div className="mb-1 flex items-baseline gap-1">
                  <span className="text-gold-text text-3xl font-bold">
                    {fmt.price.toLocaleString("ru-RU")}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    {fmt.priceUnit || "₽/гость"}
                  </span>
                </div>
                <p className="text-muted-foreground mb-3 text-xs">
                  мин. {fmt.min} гостей · {fmt.hours}
                </p>

                {/* Что входит — чек-лист */}
                <ul className="space-y-1">
                  {fmt.includes.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs">
                      <Check className="text-gold-text h-3.5 w-3.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={fmt.href}
                  className="text-gold-text mt-auto inline-flex items-center gap-1 pt-3 text-sm font-semibold hover:underline"
                >
                  Выбрать {fmt.name} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* ПРИМЕРЫ РЕАЛЬНЫХ СЧЕТОВ — конкретика */}
        <div className="mb-16">
          <h2 className="font-heading mb-2 text-center text-2xl font-medium">
            Примеры реальных заказов
          </h2>
          <p className="text-muted-foreground mb-6 text-center">
            Сколько это стоит на практике (всё включено, доставка по КАД бесплатно)
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {EXAMPLES.map((ex) => (
              <div key={ex.event} className="border-line bg-card rounded-xl border p-5">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <h3 className="font-heading text-base font-medium">{ex.event}</h3>
                    <p className="text-muted-foreground text-xs">{ex.format}</p>
                  </div>
                  <Users className="text-muted-foreground h-5 w-5" />
                </div>
                <div className="border-line flex items-baseline justify-between border-t pt-3">
                  <div className="text-muted-foreground text-sm">
                    {ex.perGuest.toLocaleString("ru-RU")} ₽ × {ex.guests}
                  </div>
                  <div className="text-gold-text text-xl font-bold">
                    {ex.total.toLocaleString("ru-RU")} ₽
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ЧТО ВХОДИТ В ЛЮБУЮ ЦЕНУ */}
        <div className="bg-secondary/50 mb-16 rounded-2xl p-6">
          <h2 className="font-heading mb-4 text-center text-2xl font-medium">
            Что входит в любую цену
          </h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {[
              { icon: "🍽", t: "Меню", d: "Выбор из 124 блюд" },
              { icon: "👨‍🍳", t: "Официанты", d: "Профессионалы" },
              { icon: "🚚", t: "Доставка", d: "По КАД бесплатно" },
              { icon: "🍽", t: "Посуда", d: "Сервировка" },
              { icon: "📋", t: "Координатор", d: "Личный менеджер" },
              { icon: "🧹", t: "Уборка", d: "После мероприятия" },
            ].map((s) => (
              <div
                key={s.t}
                className="bg-card border-line flex items-center gap-3 rounded-lg border p-3"
              >
                <span className="text-2xl">{s.icon}</span>
                <div>
                  <p className="text-sm font-medium">{s.t}</p>
                  <p className="text-muted-foreground text-xs">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="from-gold-tint/30 border-gold-tint rounded-2xl border bg-gradient-to-br to-transparent p-8 text-center">
          <h2 className="font-heading mb-3 text-2xl font-medium">Не нашли подходящий формат?</h2>
          <p className="text-muted-foreground mb-6">
            Соберите меню под себя — выберите блюда поштучно
          </p>
          <Link
            href="/plan/constructor"
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-8 py-4 text-base font-semibold transition-colors"
          >
            Собрать своё меню <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        {/* Связанные страницы — логичные переходы */}
        <RelatedPages context="info" slug="pricing" />
        <SmartCTA
          context="pricing"
          title="Нужен точный расчёт?"
          description="Индивидуальное предложение за 15 минут — без обязательств"
        />
      </div>
    </main>
  );
}
