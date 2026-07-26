'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import type { Review } from '@/lib/cms-store';

interface ReviewCard {
  author: string;
  text: string;
  date: string;
}

export default function TestimonialsCarousel({ cmsReviews }: { cmsReviews?: Review[] }) {
  // Если реальных отзывов нет — показываем заглушку со ссылкой на /reviews.
  // Никаких захардкоженных фейковых отзывов (как было ранее).
  const reviews: ReviewCard[] = (cmsReviews || []).map(r => ({
    author: r.clientName,
    text: r.quote,
    date: r.date,
  }));

  const [i, setI] = useState(0);

  if (reviews.length === 0) {
    return (
      <section className="py-16 md:py-20 bg-secondary" aria-labelledby="reviews-heading">
        <div className="container-site max-w-lg mx-auto text-center">
          <h2 id="reviews-heading" className="mb-6">Отзывы</h2>
          <p className="text-muted-foreground mb-6">
            Скоро здесь появятся отзывы наших клиентов. А пока —{' '}
            <Link href="/reviews" className="underline text-gold-text">посмотрите все 27 отзывов →</Link>
          </p>
        </div>
      </section>
    );
  }

  const r = reviews[i];

  return (
    <section className="py-16 md:py-20 bg-secondary" aria-labelledby="reviews-heading">
      <div className="container-site max-w-lg mx-auto text-center">
        <h2 id="reviews-heading" className="mb-6">Отзывы</h2>

        <AnimatePresence mode="wait">
          <motion.blockquote key={r.author} className="mb-6"
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <p className="text-foreground mb-3 leading-relaxed">&ldquo;{r.text}&rdquo;</p>
            <cite className="not-italic text-sm font-semibold block">{r.author}</cite>
            <span className="text-xs text-muted-foreground">{r.date}</span>
          </motion.blockquote>
        </AnimatePresence>

        <div className="flex items-center justify-center gap-4 mb-6">
          <button onClick={() => setI((c) => (c - 1 + reviews.length) % reviews.length)} className="w-10 h-10 flex items-center justify-center rounded-full border border-line text-muted-foreground active:bg-secondary transition-colors" aria-label="Назад">←</button>
          <span className="text-xs text-muted-foreground">{i + 1}/{reviews.length}</span>
          <button onClick={() => setI((c) => (c + 1) % reviews.length)} className="w-10 h-10 flex items-center justify-center rounded-full border border-line text-muted-foreground active:bg-secondary transition-colors" aria-label="Вперёд">→</button>
        </div>

        <Link href="/reviews" className="text-sm font-medium text-gold-text hover:underline">Все отзывы →</Link>
      </div>
    </section>
  );
}
