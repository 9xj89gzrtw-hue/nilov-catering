import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  PartyPopper,
  Phone,
  Quote,
  Star,
  type LucideIcon,
} from "lucide-react";
import { SITE } from "@/lib/data";
import reviewsData from "@/data/reviews.json";
import type { Review } from "@/lib/cms-store";
import ReviewsMasonry from "./ReviewsMasonry";

export const metadata: Metadata = {
  alternates: {
    canonical: "/reviews",
    languages: { ru: "/reviews", "x-default": "/reviews" },
  },
  openGraph: {
    url: "https://nilov-catering.vercel.app/reviews",
    title: "Отзывы клиентов — NiloV Catering",
    description:
      "Реальные отзывы клиентов NiloV Catering. Средний рейтинг 4.8 из 5 по 27 отзывам.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Отзывы NiloV Catering" }],
  },
  title: "Отзывы клиентов",
  description:
    "Реальные отзывы клиентов NiloV Catering с 2007 года. Свадьбы, корпоративы, юбилеи, " +
    "детские праздники, халяль, БГ-меню. Средний рейтинг 4.8 из 5 по 27 опубликованным отзывам.",
};

const REVIEWS: Review[] = reviewsData as Review[];

// === Сортировка: новые сверху (по дате в формате "Месяц Год") ===
// ВАЖНО: \w в JavaScript regex без флага /u не поддерживает кириллицу —
// используем явный Unicode-класс.
const MONTHS: Record<string, number> = {
  Январь: 0,
  Февраль: 1,
  Март: 2,
  Апрель: 3,
  Май: 4,
  Июнь: 5,
  Июль: 6,
  Август: 7,
  Сентябрь: 8,
  Октябрь: 9,
  Ноябрь: 10,
  Декабрь: 11,
};

function parseDate(s: string): number {
  const m = s.match(/^([\u0400-\u04FF\w]+)\s+(\d{4})$/u);
  if (!m) return 0;
  return Number(m[2]) * 100 + (MONTHS[m[1]] ?? 0);
}

const SORTED_REVIEWS = [...REVIEWS].sort((a, b) => parseDate(b.date) - parseDate(a.date));

// === Статистика (считается из реальных отзывов) ===
const avgRating = (REVIEWS.reduce((acc, r) => acc + (r.rating || 0), 0) / REVIEWS.length).toFixed(
  1
);
const roundedAvg = Math.round(Number(avgRating));
const rating5 = REVIEWS.filter((r) => r.rating === 5).length;
const rating4 = REVIEWS.filter((r) => r.rating === 4).length;
const rating3 = REVIEWS.filter((r) => r.rating === 3).length;
const rating2 = REVIEWS.filter((r) => r.rating === 2).length;
const rating1 = REVIEWS.filter((r) => r.rating === 1).length;
const below5 = rating4 + rating3 + rating2 + rating1;
const verifiedCount = REVIEWS.filter((r) => r.status === "verified").length;

// === Hero background (банкетный зал, свадебная сервировка) ===
const HERO_IMAGE = "/images/catering/wedding-01.jpg";

// === Stat card ===
function StatCard({
  icon: Icon,
  value,
  label,
  sub,
}: {
  icon: LucideIcon;
  value: string;
  label: string;
  sub: string;
}) {
  return (
    <div className="border-line bg-card rounded-2xl border p-5 text-center md:p-6">
      <div className="bg-gold-tint text-gold-text mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <div
        className="font-heading text-foreground mb-1 text-2xl md:text-3xl"
        style={{ fontWeight: 600 }}
      >
        {value}
      </div>
      <div className="text-muted-foreground text-xs tracking-wider uppercase">{label}</div>
      <div className="text-muted-foreground/80 mt-1 text-xs">{sub}</div>
    </div>
  );
}

// === Rating distribution bar ===
function RatingBar({ stars, count, total }: { stars: string; count: number; total: number }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="text-muted-foreground w-4 text-sm tabular-nums">{stars}</span>
      <Star className="text-gold-text fill-gold-text h-3.5 w-3.5" aria-hidden="true" />
      <div className="bg-secondary h-2 flex-1 overflow-hidden rounded-full">
        <div
          className="bg-gold-text h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-muted-foreground w-10 text-right text-xs tabular-nums">{count}</span>
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <main id="main" className="pb-20">
      {/* === Breadcrumbs === */}
      <div className="container-site max-w-7xl pt-6">
        <nav aria-label="Хлебные крошки" className="text-muted-foreground text-sm">
          <Link href="/" className="hover:text-foreground no-underline">
            Главная
          </Link>
          <span className="mx-2" aria-hidden="true">
            /
          </span>
          <span className="text-foreground">Отзывы</span>
        </nav>
      </div>

      {/* === HERO с фоновым фото === */}
      <section className="container-site mt-6 mb-12 max-w-7xl" aria-labelledby="reviews-hero-title">
        <div className="relative min-h-[440px] overflow-hidden rounded-3xl md:min-h-[520px]">
          <Image
            src={HERO_IMAGE}
            alt="Банкет от NiloV Catering — накрытые столы, сервировка зала для мероприятия"
            width={1200}
            height={800}
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
            fetchPriority="high"
            decoding="sync"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.25) 100%)",
            }}
            aria-hidden="true"
          />
          <div className="relative z-10 flex h-full min-h-[440px] flex-col justify-end p-6 md:min-h-[520px] md:p-12 lg:p-16">
            <p className="mb-3 text-xs tracking-[0.2em] text-white/80 uppercase md:text-sm">
              Отзывы клиентов · с 2007 года
            </p>
            <h1
              id="reviews-hero-title"
              className="font-heading mb-4 max-w-3xl text-4xl text-white md:text-5xl lg:text-6xl"
              style={{ fontWeight: 500 }}
            >
              Отзывы клиентов
            </h1>
            <p className="mb-6 max-w-2xl text-sm text-white/90 md:text-base lg:text-lg">
              {REVIEWS.length} опубликованных отзывов о свадьбах, корпоративах, юбилеях, детских
              праздниках, халяль- и БГ-меню. Каждый отзыв верифицирован по факту мероприятия.
            </p>
            <div className="flex flex-wrap items-center gap-3 md:gap-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 ring-1 ring-white/20 backdrop-blur">
                <div className="flex gap-0.5" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 md:h-5 md:w-5 ${
                        i < roundedAvg ? "text-gold-text fill-gold-text" : "text-white/40"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-white tabular-nums md:text-base">
                  {avgRating} / 5.0
                </span>
              </div>
              <span className="text-xs text-white/80 md:text-sm">
                {REVIEWS.length} отзывов · {verifiedCount} проверено · 3 000+ событий
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* === STATS === */}
      <section className="container-site mb-10 max-w-7xl" aria-label="Статистика отзывов">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          <StatCard
            icon={PartyPopper}
            value="3 000+"
            label="Мероприятий"
            sub="с 2007 года в Петербурге"
          />
          <StatCard
            icon={Quote}
            value={`${REVIEWS.length}`}
            label="Опубликовано"
            sub="отзывов с 2007 года"
          />
          <StatCard
            icon={Star}
            value="100%"
            label="Верифицировано"
            sub={`${verifiedCount} из ${REVIEWS.length} отзывов`}
          />
          <StatCard icon={BadgeCheck} value="19 лет" label="На рынке СПб" sub="с 2007 года" />
        </div>
      </section>

      {/* === RATING DISTRIBUTION === */}
      <section className="container-site mb-12 max-w-7xl" aria-labelledby="distribution-title">
        <div className="border-line bg-card rounded-2xl border p-6 md:p-8">
          <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
            <h2
              id="distribution-title"
              className="font-heading text-xl md:text-2xl"
              style={{ fontWeight: 500 }}
            >
              Распределение оценок
            </h2>
            <p className="text-muted-foreground text-xs">
              Все оценки — из опубликованных отзывов на этой странице
            </p>
          </div>
          <div className="max-w-2xl space-y-2.5">
            <RatingBar stars="5" count={rating5} total={REVIEWS.length} />
            <RatingBar stars="4" count={rating4} total={REVIEWS.length} />
            <RatingBar stars="3" count={rating3} total={REVIEWS.length} />
            <RatingBar stars="2" count={rating2} total={REVIEWS.length} />
            <RatingBar stars="1" count={rating1} total={REVIEWS.length} />
          </div>
        </div>
      </section>

      {/* === MASONRY GRID (client component) === */}
      <section className="container-site mb-16 max-w-7xl" aria-labelledby="all-reviews-title">
        <div className="mb-2 text-center">
          <h2
            id="all-reviews-title"
            className="font-heading text-2xl md:text-3xl lg:text-4xl"
            style={{ fontWeight: 500 }}
          >
            Все отзывы
          </h2>
          <p className="text-muted-foreground mx-auto mt-2 max-w-xl text-sm md:text-base">
            Фильтр по типу события — кликните на чип, чтобы отфильтровать отзывы. Карточки разной
            высоты зависят от длины отзыва.
          </p>
        </div>
        <ReviewsMasonry reviews={SORTED_REVIEWS} />
      </section>

      {/* === HONESTY BLOCK === */}
      <section className="container-site mb-10 max-w-7xl">
        <div className="border-line bg-secondary/30 rounded-2xl border p-6 md:p-8">
          <h2 className="font-heading mb-3 text-lg md:text-xl" style={{ fontWeight: 500 }}>
            Честность отзывов
          </h2>
          <p className="text-muted-foreground mb-3 text-sm leading-relaxed">
            Все {REVIEWS.length} отзывов выше — реальные и опубликованы с согласия клиентов. Каждый
            отзыв имеет статус «проверен» — мы связались с клиентом и подтвердили факт мероприятия.
            Если вы наш клиент и хотите оставить отзыв — напишите на{" "}
            <a href={`mailto:${SITE.email}`} className="text-gold-text hover:underline">
              {SITE.email}
            </a>{" "}
            или на{" "}
            <a
              href="https://yandex.ru/maps/?text=%D0%BA%D0%B5%D0%B9%D1%82%D0%B5%D1%80%D0%B8%D0%BD%D0%B3%20NiloV%20Catering%20%D0%A1%D0%B0%D0%BD%D0%BA%D1%82-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-text hover:underline"
            >
              Яндекс.Картах
            </a>
            .
          </p>
          <p className="text-muted-foreground text-xs">
            Мы не удаляем отзывы с оценкой ниже 5. Из {REVIEWS.length} опубликованных — {below5} с
            оценкой ниже 5. По каждому мы связались с клиентом и решили проблему.
          </p>
        </div>
      </section>

      {/* === CTA === */}
      <section className="container-site max-w-7xl" aria-labelledby="reviews-cta-title">
        <div className="bg-primary text-primary-foreground relative overflow-hidden rounded-3xl p-8 text-center md:p-12">
          <h2
            id="reviews-cta-title"
            className="font-heading mb-3 text-2xl md:text-3xl"
            style={{ fontWeight: 500 }}
          >
            Хотите так же? Оставьте свой отзыв
          </h2>
          <p className="mx-auto mb-6 max-w-xl text-sm opacity-90 md:text-base">
            Позвоните или оставьте заявку — подберём решение под ваш повод и бюджет. После
            мероприятия — поделитесь впечатлениями на этой странице.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="bg-background text-foreground hover:bg-background/90 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold no-underline transition-colors"
            >
              Оставить отзыв
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={`tel:${SITE.phoneTel}`}
              className="border-background hover:bg-background/10 inline-flex items-center gap-2 rounded-lg border-2 px-6 py-3 text-sm font-semibold no-underline transition-colors"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {SITE.phone}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
