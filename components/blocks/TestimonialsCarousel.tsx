'use client';

import { useState } from 'react';
import Link from 'next/link';

import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import type { Review } from '@/lib/cms-store';

const TRUST_METRICS = [
  { value: '27',     label: 'отзывов · 4.8/5' },
  { value: '19',     label: 'лет в СПб' },
  { value: '124',    label: 'блюда в каталоге' },
  { value: '40+',    label: 'человек в штате' },
];

export default function TestimonialsCarousel({ cmsReviews }: { cmsReviews?: Review[] }) {
  const reviews = cmsReviews && cmsReviews.length >0 ? cmsReviews : [];
  const [i, setI] = useState(0);

  if (reviews.length === 0) {
    return (
      <section className="py-20 md:py-28 bg-secondary/40" aria-labelledby="reviews-heading">
        <div className="container-site max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-gold-text mb-3">Что говорят клиенты</p>
          <h2 id="reviews-heading" className="font-heading text-3xl md:text-5xl mb-8" style={{ fontWeight: 500 }}>
            Отзывы скоро появятся
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-2xl mx-auto">
            {TRUST_METRICS.map((m) =>(
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

  const r = reviews[i];
  const eventLabel = `${r.eventType || 'Событие'}${r.guests ? ` · ${r.guests} гостей` : ''}${r.venue ? ` · ${r.venue}` : ''}`;

  return (
    <section className="py-20 md:py-28 bg-secondary/40" aria-labelledby="reviews-heading">
      <div className="container-site max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-gold-text mb-3">Что говорят клиенты</p>
          <h2 id="reviews-heading" className="font-heading text-3xl md:text-5xl mb-4" style={{ fontWeight: 500 }}>
            4.8 из 5 — 27 верифицированных отзывов
          </h2>
        </div>

        {/* Trust strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-2xl mx-auto">
          {TRUST_METRICS.map((m) =>(
            <div key={m.label} className="text-center">
              <p className="font-heading text-2xl md:text-3xl text-gold-text font-semibold">{m.value}</p>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Review card */}
        <div className="max-w-2xl mx-auto">

            <figure
              key={r.id || i}

              className="bg-card border border-line rounded-2xl overflow-hidden"
            >
              {/* Event photo based on event type */}
              <div className="relative h-40 md:h-48 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={(r.eventType || '').includes('Свадьб') ? '/images/catering/wedding-04.jpg'
                    : (r.eventType || '').includes('Корпорат') ? '/images/catering/corporate-03.jpg'
                    : (r.eventType || '').includes('День рожд') ? '/images/catering/canape-03.jpg'
                    : (r.eventType || '').includes('Детск') ? '/images/catering/dessert-02.jpg'
                    : '/images/catering/finedining-04.jpg'}
                  alt={`${r.eventType || 'Событие'} — NiloV Catering`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)' }} aria-hidden="true" />
              </div>

              <div className="p-6 md:p-10">
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4" aria-label={`Оценка ${r.rating} из 5`}>
                {Array.from({ length: 5 }).map((_, idx) =>(
                  <Star
                    key={idx}
                    className={`w-5 h-5 ${idx < (r.rating || 5) ? 'text-gold-text fill-gold-text' : 'text-muted-foreground/30'}`}
                    aria-hidden="true"
                  />
                ))}
                <span className="ml-3 text-xs text-muted-foreground">{r.date}</span>
              </div>

              <blockquote className="font-heading text-lg md:text-2xl leading-relaxed text-foreground mb-6" style={{ fontWeight: 400 }}>
                «{r.quote}»
              </blockquote>

              <figcaption>
                <div className="text-base font-semibold text-foreground">{r.clientName}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{eventLabel}</div>
              </figcaption>
              </div>
            </figure>
          

          {/* Controls */}
          {reviews.length >1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() =>setI((c) =>(c - 1 + reviews.length) % reviews.length)}
                className="w-11 h-11 flex items-center justify-center rounded-full border border-line text-muted-foreground hover:border-gold-text hover:text-gold-text transition-colors"
                aria-label="Предыдущий отзыв"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <span className="text-sm text-muted-foreground tabular-nums" aria-live="polite">
                {i + 1} / {reviews.length}
              </span>
              <button
                onClick={() =>setI((c) =>(c + 1) % reviews.length)}
                className="w-11 h-11 flex items-center justify-center rounded-full border border-line text-muted-foreground hover:border-gold-text hover:text-gold-text transition-colors"
                aria-label="Следующий отзыв"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="mt-10 text-center">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 text-sm font-medium text-gold-text hover:underline no-underline"
            >
              Все отзывы и кейсы
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
