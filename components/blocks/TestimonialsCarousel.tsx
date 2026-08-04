'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';

interface ReviewCard {
  author: string;
  event: string;
  date: string;
  rating: number;
  text: string;
  source: 'Я.Карты' | '2ГИС' | 'Google';
}

const REVIEWS: ReviewCard[] = [
  {
    author: 'Анна К.',
    event: 'Свадьба 80 гостей · Лофт «Голос»',
    date: '12 июля 2025',
    rating: 5,
    text: 'Заказывали банкет на свадьбу. Меню подобрали под наш бюджет, заменяли блюда без проблем. Официанты работали незаметно — тарелки не пустовали. Гости до сих пор вспоминают десертный стол с макарунами.',
    source: 'Я.Карты',
  },
  {
    author: 'Михаил Д.',
    event: 'Корпоратив 150 человек · офис IT-компании',
    date: '4 июня 2025',
    rating: 5,
    text: 'Срочный заказ за 4 дня до мероприятия. Привезли всё вовремя, сервировали, убрали. Договор и УПД получили на следующий день — бухгалтерия довольна. Будем работать дальше.',
    source: '2ГИС',
  },
  {
    author: 'Екатерина В.',
    event: 'День рождения 30 гостей · дом клиента',
    date: '28 мая 2025',
    rating: 5,
    text: 'Шеф Дмитрий готовил у нас дома. Это был настоящий ресторан в нашей кухне — 6 подач, сомелье подобрал вино под каждое блюдо. Дорого, но того стоило.',
    source: 'Google',
  },
  {
    author: 'Игорь С.',
    event: 'Конференция 200 человек · «Ташир»',
    date: '15 мая 2025',
    rating: 5,
    text: 'Три дня кофе-брейков для 200 человек. Кофе-станция работала без перебоев, выпечка свежая, фрукты меняли каждые полтора часа. Координатор держал всё под контролем.',
    source: 'Я.Карты',
  },
  {
    author: 'Ольга М.',
    event: 'Юбилей 60 гостей · ресторан «Палочка»',
    date: '3 мая 2025',
    rating: 4,
    text: 'Хороший банкет, всё вкусно. Единственное — хотелось бы больше вегетарианских опций в стандартном тарифе. В остальном претензий нет, рекомендуем.',
    source: '2ГИС',
  },
];

const TRUST_METRICS = [
  { value: '3 000+', label: 'событий с 2007 г.' },
  { value: '27',     label: 'отзывов на картах' },
  { value: '4.8',    label: 'средняя оценка' },
  { value: '19',     label: 'лет в Санкт-Петербурге' },
];

export default function TestimonialsCarousel({ cmsReviews: _cmsReviews }: { cmsReviews?: unknown[] }) {
  const [i, setI] = useState(0);
  const r = REVIEWS[i];

  return (
    <section className="py-20 md:py-28 bg-foreground text-background" aria-labelledby="reviews-heading">
      <div className="container-site max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-[0.2em] text-[#E8C97E] mb-3"
          >
            Что говорят клиенты
          </motion.p>
          <motion.h2
            id="reviews-heading"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-heading text-3xl md:text-5xl mb-4"
            style={{ fontWeight: 500 }}
          >
            4.8 из 5 на Яндекс.Картах и 2ГИС
          </motion.h2>
        </div>

        {/* Trust strip */}
        <motion.dl
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto"
        >
          {TRUST_METRICS.map((m) => (
            <div key={m.label} className="text-center">
              <dd className="font-heading text-3xl md:text-4xl text-[#E8C97E] font-semibold">{m.value}</dd>
              <dd className="text-[11px] uppercase tracking-wider text-background/55 mt-1">{m.label}</dd>
            </div>
          ))}
        </motion.dl>

        {/* Review card */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.figure
              key={r.author}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.4 }}
              className="bg-background/5 backdrop-blur-sm border border-background/15 rounded-2xl p-6 md:p-10"
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4" aria-label={`Оценка ${r.rating} из 5`}>
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    className={`w-5 h-5 ${idx < r.rating ? 'text-[#E8C97E] fill-[#E8C97E]' : 'text-background/25'}`}
                    aria-hidden="true"
                  />
                ))}
                <span className="ml-3 text-xs text-background/55">{r.source} · {r.date}</span>
              </div>

              <blockquote className="font-heading text-lg md:text-2xl leading-relaxed text-background/95 mb-6" style={{ fontWeight: 400 }}>
                «{r.text}»
              </blockquote>

              <figcaption className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-base font-semibold text-background">{r.author}</div>
                  <div className="text-xs text-background/55 mt-0.5">{r.event}</div>
                </div>
                <span className="text-xs text-background/45 uppercase tracking-wider">{r.source}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setI((c) => (c - 1 + REVIEWS.length) % REVIEWS.length)}
              className="w-11 h-11 flex items-center justify-center rounded-full border border-background/20 text-background/80 hover:border-[#E8C97E] hover:text-[#E8C97E] transition-colors"
              aria-label="Предыдущий отзыв"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-sm text-background/60 tabular-nums" aria-live="polite">
              {i + 1} / {REVIEWS.length}
            </span>
            <button
              onClick={() => setI((c) => (c + 1) % REVIEWS.length)}
              className="w-11 h-11 flex items-center justify-center rounded-full border border-background/20 text-background/80 hover:border-[#E8C97E] hover:text-[#E8C97E] transition-colors"
              aria-label="Следующий отзыв"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#E8C97E] hover:underline no-underline"
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
