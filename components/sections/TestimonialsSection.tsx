'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { testimonials } from '@/lib/data';

export default function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const featured = testimonials.slice(0, 3);

  return (
    <section ref={ref} className="py-20 md:py-28 bg-muted" aria-label="Отзывы клиентов">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 md:mb-18">
          <p className="text-xs uppercase tracking-[0.3em] text-gold font-medium mb-3">Отзывы</p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold text-cream">
            Что говорят клиенты
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((t, i) => (
            <motion.blockquote
              key={t.id}
              className="relative bg-card border border-border rounded-md p-6 md:p-8 flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* Quote mark */}
              <span className="quote-mark" aria-hidden="true">&ldquo;</span>

              <p className="text-sm text-cream/80 leading-relaxed mt-6 flex-1">
                {t.text}
              </p>

              <footer className="mt-6 pt-4 border-t border-border">
                <cite className="not-italic">
                  <span className="block text-sm font-medium text-cream">{t.name}</span>
                  <span className="block text-xs text-cream-muted mt-0.5">
                    {t.event} · {t.date}
                  </span>
                </cite>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}