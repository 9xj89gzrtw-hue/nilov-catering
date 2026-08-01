'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

// C1 fix (Senior UX, 7.5): BudgetCalculator removed from hero entirely.
// Hero now has ONE primary CTA (Рассчитать стоимость) — the calculator was a
// duplicate entrance to the same conversion flow as /plan/helper + /pricing.
// The calculator still lives on /pricing and /events/korporativ where users
// have already expressed explicit pricing intent.

const rIC = typeof requestIdleCallback !== 'undefined' ? requestIdleCallback : (cb: () => void) => window.setTimeout(cb, 1) as unknown as number;
const cIC = typeof cancelIdleCallback !== 'undefined' ? cancelIdleCallback : (id: number) => window.clearTimeout(id);

interface Props {
  subtitle?: string;
  disclaimer?: string;
}

export default function HeroBlock({ subtitle, disclaimer }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [shouldAutoplay, setShouldAutoplay] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const conn = (navigator as any).connection;
    const isSlow = conn?.effectiveType && !['4g', '5g'].includes(conn.effectiveType);
    const isDataSaver = conn?.saveData === true;
    if (!isSlow && !isDataSaver) setShouldAutoplay(true);

    const id = rIC(() => {
      if (videoRef.current) videoRef.current.load();
    });
    return () => cIC(id);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0.3]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, 60]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[85vh] flex items-center overflow-hidden"
      aria-label="Главный экран"
    >
      <motion.div
        className="absolute inset-0 z-0"
        style={reducedMotion ? {} : { scale, opacity }}
      >
        <picture>
          <source srcSet="/images/gallery/wedding-banquet-1920.avif" type="image/avif" media="(min-width: 768px)" />
          <source srcSet="/images/gallery/wedding-banquet-768.avif" type="image/avif" media="(max-width: 767px)" />
          <source srcSet="/images/gallery/wedding-banquet-1920.webp" type="image/webp" media="(min-width: 768px)" />
          <source srcSet="/images/gallery/wedding-banquet-768.webp" type="image/webp" media="(max-width: 767px)" />
          <img
            src="/images/gallery/wedding-banquet.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            fetchPriority="high"
            aria-hidden="true"
          />
        </picture>
        <video
          ref={videoRef}
          suppressHydrationWarning
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoReady ? 'opacity-100' : 'opacity-0'}`}
          muted
          playsInline
          loop
          autoPlay={shouldAutoplay}
          preload="none"
          aria-hidden="true"
          onCanPlayThrough={() => setVideoReady(true)}
        >
          <source src="/videos/hero/banquet.mp4" type="video/mp4" />
          <source src="/videos/hero/banquet.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background/90" />
      </motion.div>

      {/* Video pause button — WCAG 2.2.2 */}
      <button
        type="button"
        onClick={() => {
          if (videoRef.current) {
            if (videoRef.current.paused) {
              videoRef.current.play();
            } else {
              videoRef.current.pause();
            }
          }
        }}
        className="absolute top-20 right-4 z-20 rounded-full bg-background/80 backdrop-blur-sm border border-line p-2.5 text-muted-foreground hover:text-foreground transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
        aria-label="Остановить или включить фоновое видео"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <rect x="4" y="3" width="3" height="10" rx="1" />
          <rect x="9" y="3" width="3" height="10" rx="1" />
        </svg>
      </button>

      <motion.div
        className="relative z-10 container-site py-20 md:py-28"
        style={reducedMotion ? {} : { y: textY }}
      >
        {/* C1 fix: single-column hero — BudgetCalculator removed (was duplicating
            /plan/helper + /pricing flows), price pills removed (EventTypeSelector
            below already covers all formats with full pricing context). */}
        <div className="max-w-[760px]">
          {/* Minimal brand tag */}
          <p className="font-mono text-xs tracking-[0.2em] text-gold-text uppercase mb-6 animate-fade-up">
            NiloV · Петербург · с 2007
          </p>

          {/* Single powerful headline */}
          <h1 className="mb-6 tracking-tight animate-fade-up" style={{ lineHeight: 1.05, letterSpacing: '-0.02em' }}>
            <span className="text-foreground">Кейтеринг, </span>
            <span
              className="relative"
              style={{
                fontWeight: 650,
                background: 'linear-gradient(135deg, #B08D57 0%, #8A6D3B 60%, #6E5631 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              который чувствуешь заранее
            </span>
          </h1>

          {/* Simple, clear subtitle — one sentence with prices */}
          <p className="text-base md:text-lg text-muted-foreground mb-4 animate-fade-up" style={{ animationDelay: '0.15s' }}>
            {subtitle || 'Ресторанный кейтеринг и доставка фуршетов в СПб. От 2 450 ₽/гость — еда, персонал, посуда, доставка включены.'}
          </p>

          {/* Trust badges — халяль (PRIMARY) / ЭДО / страхование */}
          <div className="flex flex-wrap items-center gap-2 mt-4 mb-8 animate-fade-up" style={{ animationDelay: '0.28s' }}>
            {/* Halal — PRIMARY differentiator, larger (<5% of SPb caterers have it) */}
            {/* A11y: bg uses explicit #065F46 (emerald-800) so white text + opacity-90 subtext
                both pass WCAG AA 4.5:1 (7.68:1 and 6.56:1). Tailwind v4 oklch emerald-600
                renders as #009966 → only 3.65:1 with white. */}
            <a href="/events/nikah" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#065F46] text-white text-sm font-semibold hover:bg-[#064E3B] transition-colors no-underline shadow-md" aria-label="Халяль сертификат СМР — единственный в СПб, регистрация №142. Перейти к странице никах для проверки сертификата.">
              <span className="text-lg">🕌</span>
              <div className="text-left">
                <div className="font-bold leading-tight">Халяль сертификат СМР</div>
                <div className="text-[10px] opacity-90 leading-tight">Единственный в СПб · рег. №142 · <span className="underline">проверить сертификат →</span></div>
              </div>
            </a>
            {/* Secondary badges */}
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-medium">
              💼 ЭДО: Диадок + СБИС
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium">
              🛡 Страхование ГО до 30М₽
            </span>
          </div>

          {/* ONE primary CTA — единая точка конверсии */}
          <div className="flex flex-wrap items-center gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <Link
              href="/plan/helper"
              className="inline-flex items-center gap-2 rounded-lg bg-gold-text text-white px-8 py-4 text-lg font-semibold hover:bg-gold-text/90 hover:shadow-lg hover:-translate-y-0.5 transition-all no-underline shadow-md"
            >
              Рассчитать стоимость
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          </div>

          {/* One-line trust signal */}
          <p className="mt-6 text-xs text-muted-foreground animate-fade-up" style={{ animationDelay: '0.4s' }}>
            С 2007 года · 3000+ событий · Рейтинг 4.8 · Доставка по КАД включена
          </p>
        </div>
      </motion.div>
    </section>
  );
}