"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight, Quote } from "lucide-react";
import type { Review } from "@/lib/cms-store";

const TRUST_METRICS = [
  { value: "27", label: "отзывов · 4.8/5" },
  { value: "19", label: "лет в СПб" },
  { value: "124", label: "блюда в каталоге" },
  { value: "40+", label: "человек в штате" },
];

/** Сколько отзывов показывать сразу (без карусели) */
const VISIBLE_COUNT = 3;

/**
 * Получает инициалы из имени клиента
 * "Анна Петрова" → "АП"
 */
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Форматирует дату ISO в читаемый вид
 * "2024-06-15" → "15 июня 2024"
 */
function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

/**
 * Сортирует отзывы: сначала по рейтингу (высший первый), потом по дате (новее первые)
 */
function sortReviewsByQuality(reviews: Review[]): Review[] {
  return [...reviews].sort((a, b) => {
    // Сначала по рейтингу (убывание)
    const ratingDiff = (b.rating || 0) - (a.rating || 0);
    if (ratingDiff !== 0) return ratingDiff;
    // Потом по дате (убывание - новые первыми)
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export default function TestimonialsCarousel({ cmsReviews }: { cmsReviews?: Review[] }) {
  const reviews = cmsReviews && cmsReviews.length > 0 ? cmsReviews : [];

  if (reviews.length === 0) {
    return (
      <section className="bg-secondary/40 py-20 md:py-28" aria-labelledby="reviews-heading">
        <div className="container-site mx-auto max-w-3xl text-center">
          <p className="text-gold-text mb-3 text-xs tracking-[0.2em] uppercase">
            Что говорят клиенты
          </p>
          <h2
            id="reviews-heading"
            className="font-heading mb-8 text-3xl md:text-5xl"
            style={{ fontWeight: 500 }}
          >
            Отзывы скоро появятся
          </h2>
          <div className="mx-auto mb-8 grid max-w-2xl grid-cols-2 gap-4 md:grid-cols-4">
            {TRUST_METRICS.map((m) => (
              <div key={m.label} className="text-center">
                <p className="font-heading text-gold-text text-2xl font-semibold md:text-3xl">
                  {m.value}
                </p>
                <p className="text-muted-foreground mt-1 text-xs tracking-wider uppercase">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
          <Link
            href="/reviews"
            className="text-gold-text text-sm font-medium no-underline hover:underline"
          >
            Все отзывы на /reviews →
          </Link>
        </div>
      </section>
    );
  }

  // Берём только лучшие отзывы (VISIBLE_COUNT штук)
  const topReviews = sortReviewsByQuality(reviews).slice(0, VISIBLE_COUNT);

  return (
    <section className="bg-secondary/40 py-20 md:py-28" aria-labelledby="reviews-heading">
      <div className="container-site mx-auto max-w-6xl">
        {/* Заголовок секции */}
        <div className="mb-12 text-center">
          <p className="text-gold-text mb-3 text-xs tracking-[0.2em] uppercase">
            Что говорят клиенты
          </p>
          <h2
            id="reviews-heading"
            className="font-heading mb-4 text-3xl md:text-5xl"
            style={{ fontWeight: 500 }}
          >
            {reviews.length} верифицированных отзывов
          </h2>
          <p className="text-muted-foreground mx-auto max-w-xl">
            Средняя оценка <span className="text-gold-text font-semibold">4.8 из 5</span> — выбирают
            нас для самых важных событий
          </p>
        </div>

        {/* Trust strip */}
        <div className="mx-auto mb-14 grid max-w-2xl grid-cols-2 gap-4 md:grid-cols-4">
          {TRUST_METRICS.map((m) => (
            <div key={m.label} className="text-center">
              <p className="font-heading text-gold-text text-2xl font-semibold md:text-3xl">
                {m.value}
              </p>
              <p className="text-muted-foreground mt-1 text-xs tracking-wider uppercase">
                {m.label}
              </p>
            </div>
          ))}
        </div>

        {/* Сетка отзывов — 3 карточки сразу */}
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {topReviews.map((review, idx) => (
            <article
              key={review.id || idx}
              className="group bg-card border-line hover:shadow-hover hover:border-gold-text/30 relative rounded-2xl border p-6 transition-all duration-300 ease-out hover:-translate-y-1 md:p-8"
            >
              {/* Декоративная кавычка */}
              <Quote
                className="text-gold-text/10 group-hover:text-gold-text/20 absolute top-4 right-4 h-10 w-10 transition-colors"
                aria-hidden="true"
              />

              {/* Рейтинг и дата */}
              <div className="mb-5 flex items-center justify-between">
                <div
                  className="flex items-center gap-0.5"
                  aria-label={`Оценка ${review.rating || 5} из 5`}
                >
                  {Array.from({ length: 5 }).map((_, starIdx) => (
                    <Star
                      key={starIdx}
                      className={`h-4 w-4 ${
                        starIdx < (review.rating || 5)
                          ? "text-gold-text fill-gold-text"
                          : "text-muted-foreground/25"
                      }`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <time className="text-muted-foreground text-xs" dateTime={review.date}>
                  {formatDate(review.date)}
                </time>
              </div>

              {/* Текст отзыва */}
              <blockquote
                className="font-heading text-foreground mb-6 min-h-[5.5rem] text-base leading-relaxed md:text-lg"
                style={{ fontWeight: 400 }}
              >
                «{review.quote}»
              </blockquote>

              {/* Информация о клиенте */}
              <figcaption className="border-line/50 flex items-center gap-3 border-t pt-4">
                {/* Аватар: фото или инициалы */}
                {review.clientPhoto ? (
                  <Image
                    src={review.clientPhoto}
                    alt={review.clientName}
                    width={44}
                    height={44}
                    className="ring-gold-text/20 h-11 w-11 rounded-full object-cover ring-2"
                    loading="lazy"
                  />
                ) : (
                  <div className="bg-gold-tint ring-gold-text/20 flex h-11 w-11 items-center justify-center rounded-full ring-2">
                    <span className="text-gold-text text-sm font-semibold">
                      {getInitials(review.clientName)}
                    </span>
                  </div>
                )}

                <div className="min-w-0">
                  <div className="text-foreground truncate text-sm font-semibold">
                    {review.clientName}
                  </div>
                  <div className="text-muted-foreground truncate text-xs">
                    {[
                      review.eventType,
                      review.guests ? `${review.guests} гостей` : null,
                      review.venue,
                    ]
                      .filter(Boolean)
                      .join(" · ") || "Клиент"}
                  </div>
                </div>
              </figcaption>
            </article>
          ))}
        </div>

        {/* CTA: Все отзывы */}
        <div className="text-center">
          <Link
            href="/reviews"
            className="bg-gold-text hover:bg-primary hover:shadow-gold-glow focus-visible:ring-ring inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-medium text-white transition-all duration-300 ease-out hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            Все {reviews.length} отзывов
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
