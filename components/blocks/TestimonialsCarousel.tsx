'use client';

import Link from 'next/link';
import { Star, ArrowRight, Quote } from 'lucide-react';
import type { Review } from '@/lib/cms-store';

const TRUST_METRICS = [
  { value: '27',     label: 'отзывов · 4.8/5' },
  { value: '19',     label: 'лет в СПб' },
  { value: '124',    label: 'блюда в каталоге' },
  { value: '40+',    label: 'человек в штате' },
];

/** Сколько отзывов показывать сразу (без карусели) */
const VISIBLE_COUNT = 3;

/**
 * Получает инициалы из имени клиента
 * "Анна Петрова" → "АП"
 */
function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .join('')
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
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
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
      <section className="py-20 md:py-28 bg-secondary/40" aria-labelledby="reviews-heading">
        <div className="container-site max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-gold-text mb-3">Что говорят клиенты</p>
          <h2 id="reviews-heading" className="font-heading text-3xl md:text-5xl mb-8" style={{ fontWeight: 500 }}>
            Отзывы скоро появятся
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-2xl mx-auto">
            {TRUST_METRICS.map((m) => (
              <div key={m.label} className="text-center">
                <p className="font-heading text-2xl md:text-3xl text-gold-text font-semibold">{m.value}</p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{m.label}</p>
              </div>
            ))}
          </div>
          <Link href="/reviews" className="text-sm font-medium text-gold-text hover:underline no-underline">
            Все отзывы на /reviews →
          </Link>
        </div>
      </section>
    );
  }

  // Берём только лучшие отзывы (VISIBLE_COUNT штук)
  const topReviews = sortReviewsByQuality(reviews).slice(0, VISIBLE_COUNT);

  return (
    <section className="py-20 md:py-28 bg-secondary/40" aria-labelledby="reviews-heading">
      <div className="container-site max-w-6xl mx-auto">
        {/* Заголовок секции */}
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-gold-text mb-3">Что говорят клиенты</p>
          <h2 id="reviews-heading" className="font-heading text-3xl md:text-5xl mb-4" style={{ fontWeight: 500 }}>
            {reviews.length} верифицированных отзывов
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Средняя оценка <span className="text-gold-text font-semibold">4.8 из 5</span> — 
            выбирают нас для самых важных событий
          </p>
        </div>

        {/* Trust strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14 max-w-2xl mx-auto">
          {TRUST_METRICS.map((m) => (
            <div key={m.label} className="text-center">
              <p className="font-heading text-2xl md:text-3xl text-gold-text font-semibold">{m.value}</p>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Сетка отзывов — 3 карточки сразу */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {topReviews.map((review, idx) => (
            <article
              key={review.id || idx}
              className="group relative bg-card border border-line rounded-2xl p-6 md:p-8 
                         transition-all duration-300 ease-out
                         hover:shadow-hover hover:border-gold-text/30 hover:-translate-y-1"
            >
              {/* Декоративная кавычка */}
              <Quote 
                className="absolute top-4 right-4 w-10 h-10 text-gold-text/10 group-hover:text-gold-text/20 transition-colors"
                aria-hidden="true"
              />

              {/* Рейтинг и дата */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-0.5" aria-label={`Оценка ${review.rating || 5} из 5`}>
                  {Array.from({ length: 5 }).map((_, starIdx) => (
                    <Star
                      key={starIdx}
                      className={`w-4 h-4 ${
                        starIdx < (review.rating || 5) 
                          ? 'text-gold-text fill-gold-text' 
                          : 'text-muted-foreground/25'
                      }`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <time className="text-xs text-muted-foreground" dateTime={review.date}>
                  {formatDate(review.date)}
                </time>
              </div>

              {/* Текст отзыва */}
              <blockquote className="font-heading text-base md:text-lg leading-relaxed text-foreground mb-6 min-h-[5.5rem]"
                          style={{ fontWeight: 400 }}>
                «{review.quote}»
              </blockquote>

              {/* Информация о клиенте */}
              <figcaption className="flex items-center gap-3 pt-4 border-t border-line/50">
                {/* Аватар: фото или инициалы */}
                {review.clientPhoto ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={review.clientPhoto}
                    alt={review.clientName}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-gold-text/20"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-gold-tint flex items-center justify-center
                              ring-2 ring-gold-text/20">
                    <span className="text-sm font-semibold text-gold-text">
                      {getInitials(review.clientName)}
                    </span>
                  </div>
                )}
                
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-foreground truncate">
                    {review.clientName}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {[review.eventType, review.guests ? `${review.guests} гостей` : null, review.venue]
                      .filter(Boolean)
                      .join(' · ') || 'Клиент'}
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
            className="inline-flex items-center gap-2.5 px-6 py-3 bg-gold-text text-white 
                       rounded-full font-medium text-sm
                       transition-all duration-300 ease-out
                       hover:bg-primary hover:shadow-gold-glow hover:-translate-y-0.5
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Все {reviews.length} отзывов
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
