import type { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  Heart,
  GraduationCap,
  Home,
  Award,
  PartyPopper,
  Flower,
  Moon,
  ChefHat,
  ArrowRight,
  CheckCircle2,
  Star,
  Clock,
  Users,
} from "lucide-react";

const EVENTS = [
  {
    title: "Корпоративы",
    href: "/events/korporativ",
    desc: "Бизнес-ланчи, фуршеты, банкеты для компаний. От 10 до 800+ человек с расширением производственных мощностей.",
    price: "от 2 450 ₽",
    priceUnit: "/гость",
    icon: Building2,
    primary: true,
    features: ["Документы для Роспотребнадзора", "Выезд на площадку", "Без НДС (УСН)"],
  },
  {
    title: "Свадьбы",
    href: "/events/svadba",
    desc: "Меню, сервировка, торт, флористика. Полный цикл подготовки свадьбы под ключ.",
    price: "от 3 950 ₽",
    priceUnit: "/гость",
    icon: Heart,
    features: ["Шеф-кондитер", "Винная карта", "Координатор"],
  },
  {
    title: "Выпускные",
    href: "/events/vypusknoy",
    desc: "Фуршеты и банкеты для школ и вузов. B2B: документы для Роспотребнадзор.",
    price: "от 2 450 ₽",
    priceUnit: "/гость",
    icon: GraduationCap,
    features: ["Для школ и вузов", "Юридические лица", "Группы до 300+"],
  },
  {
    title: "Частные события",
    href: "/events/chastnoe",
    desc: "Дни рождения, юбилеи, семейные ужины. Дома, на веранде, на крыше.",
    price: "от 2 450 ₽",
    priceUnit: "/гость",
    icon: Home,
    features: ["Выезд к вам домой", "Камерный формат", "Индивидуальное меню"],
  },
  {
    title: "Юбилеи и годовщины",
    href: "/events/yubiley",
    desc: "Золотая свадьба, юбилей для пожилых гостей. Банкет с посадкой от 15 чел.",
    price: "от 59 250 ₽",
    priceUnit: "за 15 чел",
    icon: Award,
    features: ["Диетическое меню", "Терпеливые официанты", "Большой шрифт"],
  },
  {
    title: "Детские праздники",
    href: "/events/detskoe",
    desc: "Специальное меню, аниматоры, шоу-программа. Безопасно и весело.",
    price: "от 1 550 ₽",
    priceUnit: "/гость",
    icon: PartyPopper,
    features: ["Протокол аллергии", "Без орехов по умолчанию", "Аниматоры"],
  },
  {
    title: "Поминки",
    href: "/events/pominki",
    desc: "Поминальный обед: кутья, блины, кисель, постные блюда. Срочно — даже на день обращения.",
    price: "от 1 800 ₽",
    priceUnit: "/гость",
    icon: Flower,
    features: ["Постное меню", "Без алкоголя", "Срочно за 1 день"],
  },
  {
    title: "Никах и ифтар",
    href: "/events/nikah",
    desc: "Халяль-кейтеринг для мусульманской свадьбы и ифтара. Сертификат Совета муфтиев России.",
    price: "от 3 950 ₽",
    priceUnit: "/гость",
    icon: Moon,
    features: ["Халяль сертификат", "Отдельное оборудование", "По канонам"],
  },
  {
    title: "Выезд шефа",
    href: "/events/chef-at-home",
    desc: "Шеф-повар и сомелье у вас дома. Ужин на 6–12 гостей.",
    price: "от 4 500 ₽",
    priceUnit: "/гость",
    icon: ChefHat,
    features: ["Шеф лично", "Сомелье", "6–12 гостей"],
  },
];

const STATS = [
  { value: "19", label: "лет на кухне СПб", icon: Clock },
  { value: "3000+", label: "событий проведено", icon: Users },
  { value: "4.8/5", label: "рейтинг по отзывам", icon: Star },
  { value: "15 мин", label: "ответим на звонок", icon: CheckCircle2 },
];

export const metadata: Metadata = {
  title: "События — кейтеринг в Санкт-Петербурге",
  description:
    "Кейтеринг для любого события: корпоративы, свадьбы, выпускные, детские праздники, частные ужины. Под ключ в СПб.",
  alternates: { canonical: "/events", languages: { ru: "/events", "x-default": "/events" } },
};

export default function EventsPage() {
  return (
    <main id="main" className="pb-20">
      {/* ───────────────── PREMIUM HERO SECTION ───────────────── */}
      <section className="relative overflow-hidden bg-[#2D2624]">
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            mixBlendMode: "multiply",
          }}
          aria-hidden="true"
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(201,166,107,0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(201,166,107,0.05) 0%, transparent 50%)",
          }}
          aria-hidden="true"
        />

        {/* Gold accent line */}
        <div
          className="absolute top-0 right-0 left-0 z-20 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, #C9A66B 20%, #D4AF37 50%, #C9A66B 80%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        <div className="container-site relative z-10 pt-28 pb-16 md:pt-36 md:pb-24">
          <div className="mx-auto max-w-3xl text-center">
            {/* Eyebrow */}
            <p className="mb-4 flex items-center justify-center gap-3 text-xs font-semibold tracking-[0.25em] text-white/60 uppercase">
              <span
                className="h-px w-8"
                style={{ background: "linear-gradient(to right, transparent, #C9A66B)" }}
                aria-hidden="true"
              />
              Кейтеринг под ключ
              <span
                className="h-px w-8"
                style={{ background: "linear-gradient(to left, transparent, #C9A66B)" }}
                aria-hidden="true"
              />
            </p>

            {/* Main heading */}
            <h1 className="font-heading mb-6 text-4xl leading-tight font-medium text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Какое у вас <span style={{ color: "#C9A66B" }}>событие</span>?
            </h1>

            {/* Subheading */}
            <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
              Выберите формат — и мы подберём меню, персонал и площадку. От камерного ужина до
              банкета на 800 гостей.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/plan/helper"
                className="group inline-flex min-h-[52px] items-center gap-2.5 rounded-full px-8 py-4 text-sm font-semibold text-white no-underline transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg, #B8860B 0%, #D4AF37 50%, #AA771C 100%)",
                  boxShadow:
                    "0 4px 16px rgba(184,134,11,0.35), 0 0 0 1px rgba(212,175,55,0.2) inset",
                }}
              >
                Не знаете что выбрать?
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/menu"
                className="inline-flex items-center gap-2.5 px-2 py-1 text-base font-medium text-white/80 underline-offset-4 transition-all hover:text-white hover:underline"
              >
                <span
                  className="h-px w-8 transition-all duration-300"
                  style={{ background: "rgba(255,255,255,0.3)" }}
                  aria-hidden="true"
                />
                Смотреть меню
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div
          className="pointer-events-none absolute right-0 bottom-0 left-0 h-24 md:h-32"
          style={{
            background:
              "linear-gradient(to top, #FAF8F5 0%, rgba(250,248,245,0.8) 40%, transparent 100%)",
          }}
          aria-hidden="true"
        />
      </section>

      {/* ───────────────── STATS / TRUST INDICATORS ───────────────── */}
      <section className="border-b border-[#E8E4DE] bg-white/50 py-8 backdrop-blur-sm">
        <div className="container-site">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center text-center">
                <stat.icon
                  className="mb-2 h-5 w-5"
                  style={{ color: "#C9A66B" }}
                  aria-hidden="true"
                />
                <div className="font-heading text-2xl font-medium text-[#2D2624] md:text-3xl">
                  {stat.value}
                </div>
                <div className="text-xs text-[#6B6560] md:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── EVENT CARDS GRID ───────────────── */}
      <section className="py-14 md:py-20">
        <div className="container-site">
          <div className="mb-10 text-center md:mb-14">
            <h2 className="font-heading mb-3 text-2xl font-medium text-[#2D2624] md:text-3xl">
              Форматы мероприятий
            </h2>
            <p className="mx-auto max-w-lg text-sm text-[#6B6560] md:text-base">
              Каждый формат адаптирован под особенности события. Выберите подходящий или позвоните —
              поможем определиться.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {EVENTS.map((event) => {
              const IconComponent = event.icon;
              return (
                <Link
                  key={event.href}
                  href={event.href}
                  className={`group relative overflow-hidden rounded-2xl border border-[#E8E4DE] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:p-8 ${
                    event.primary ? "ring-1 ring-[#C9A66B]/20 lg:col-span-2 xl:col-span-1" : ""
                  }`}
                  style={
                    event.primary
                      ? {
                          boxShadow:
                            "0 4px 24px rgba(201,166,107,0.08), 0 1px 3px rgba(45,38,36,0.04)",
                        }
                      : undefined
                  }
                >
                  {/* Gold border on hover effect */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      boxShadow: "inset 0 0 0 1px #C9A66B, 0 4px 20px rgba(201,166,107,0.15)",
                    }}
                    aria-hidden="true"
                  />

                  <div className="relative z-10">
                    {/* Icon and Title row */}
                    <div className="mb-4 flex items-start gap-4">
                      <div
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 group-hover:bg-[#C9A66B]/10"
                        style={{ backgroundColor: "rgba(201,166,107,0.1)" }}
                      >
                        <IconComponent
                          className="h-6 w-6 transition-colors duration-300"
                          style={{ color: "#C9A66B" }}
                          aria-hidden="true"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-heading text-lg font-medium text-[#2D2624] transition-colors duration-300 group-hover:text-[#C9A66B] md:text-xl">
                          {event.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="mb-5 text-sm leading-relaxed text-[#6B6560] md:text-base">
                      {event.desc}
                    </p>

                    {/* Features list */}
                    {event.features && (
                      <ul className="mb-5 space-y-2">
                        {event.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-center gap-2 text-sm text-[#6B6560]"
                          >
                            <CheckCircle2
                              className="h-4 w-4 shrink-0"
                              style={{ color: "#C9A66B" }}
                              aria-hidden="true"
                            />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Price and arrow */}
                    <div className="flex items-center justify-between border-t border-[#E8E4DE] pt-4">
                      <div>
                        <span className="text-lg font-semibold" style={{ color: "#C9A66B" }}>
                          {event.price}
                        </span>
                        <span className="ml-1 text-xs text-[#6B6560]">{event.priceUnit}</span>
                      </div>
                      <ArrowRight
                        className="h-5 w-5 text-[#C9A66B] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────────── BOTTOM CTA SECTION ───────────────── */}
      <section className="border-t border-[#E8E4DE] bg-[#FAF8F5] py-14 md:py-20">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading mb-4 text-2xl font-medium text-[#2D2624] md:text-3xl">
              Нужна помощь с выбором?
            </h2>
            <p className="mb-8 text-[#6B6560] md:text-lg">
              Расскажите о вашем событии — мы предложим оптимальный формат и рассчитаем стоимость за
              15 минут.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="tel:+78129195911"
                className="group inline-flex min-h-[52px] items-center gap-2.5 rounded-full px-8 py-4 text-sm font-semibold text-white no-underline transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg, #B8860B 0%, #D4AF37 50%, #AA771C 100%)",
                  boxShadow:
                    "0 4px 16px rgba(184,134,11,0.35), 0 0 0 1px rgba(212,175,55,0.2) inset",
                }}
              >
                +7 (812) 919-59-11
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <Link
                href="/contact"
                className="inline-flex min-h-[52px] items-center rounded-full border-2 border-[#C9A66B] px-8 py-4 text-sm font-semibold text-[#2D2624] no-underline transition-all duration-300 hover:bg-[#C9A66B]/5"
              >
                Оставить заявку
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Video recap link */}
      <div className="border-t border-[#E8E4DE] py-8 text-center">
        <Link
          href="/events/recap"
          className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-[#C9A66B]"
          style={{ color: "#C9A66B" }}
        >
          Видео-рекапы с прошедших событий
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </main>
  );
}
