'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { testimonials } from '@/lib/data';
import MaskReveal from '@/components/effects/TextReveal';

export default function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const featured = testimonials.slice(0, 6);

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % featured.length);
  }, [featured.length]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + featured.length) % featured.length);
  }, [featured.length]);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(goNext, 6000);
    return () => clearInterval(timer);
  }, [goNext]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
  };

  const t = featured[current];

  return (
    <section ref={ref} className="py-24 md:py-36 bg-muted relative overflow-hidden" aria-label="Отзывы клиентов">
      {/* Background decorative quote */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading text-[20rem] md:text-[30rem] text-cream/[0.02] leading-none select-none pointer-events-none">
        &ldquo;
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-20">
          <MaskReveal>
            <p className="text-[11px] uppercase tracking-[0.35em] text-gold font-medium mb-4">Отзывы</p>
          </MaskReveal>
          <MaskReveal delay={0.1}>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-semibold text-cream leading-[0.95]">
              Что говорят
              <br />
              <span className="text-cream/40">клиенты</span>
            </h2>
          </MaskReveal>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="min-h-[280px] md:min-h-[240px] flex items-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={t.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="w-full text-center"
              >
                {/* Stars */}
                <div className="flex items-center justify-center gap-1 mb-8">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote>
                  <p className="font-heading text-xl sm:text-2xl md:text-3xl text-cream/90 leading-relaxed font-normal italic max-w-3xl mx-auto">
                    &ldquo;{t.text}&rdquo;
                  </p>
                </blockquote>

                {/* Author */}
                <footer className="mt-8">
                  <cite className="not-italic">
                    <span className="block text-sm font-medium text-cream">{t.name}</span>
                    <span className="block text-xs text-cream-muted mt-1">
                      {t.event} &middot; {t.date}
                    </span>
                  </cite>
                </footer>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={goPrev}
              className="w-12 h-12 flex items-center justify-center border border-border hover:border-gold/50 text-cream/50 hover:text-gold transition-all duration-300 rounded-full cursor-hover"
              aria-label="Предыдущий отзыв"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {featured.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`transition-all duration-300 rounded-full cursor-hover ${
                    i === current
                      ? 'w-8 h-2 bg-gold'
                      : 'w-2 h-2 bg-cream/20 hover:bg-cream/40'
                  }`}
                  aria-label={`Отзыв ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goNext}
              className="w-12 h-12 flex items-center justify-center border border-border hover:border-gold/50 text-cream/50 hover:text-gold transition-all duration-300 rounded-full cursor-hover"
              aria-label="Следующий отзыв"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}