'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

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
        <div className="max-w-[680px]">
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
            {subtitle || 'Ресторанное качество кейтеринга. От камерного ужина до фестиваля на 1500 гостей.'}
          </p>

          {/* Quick price anchor — видно за 10 секунд */}
          <div className="flex flex-wrap gap-3 mb-8 animate-fade-up" style={{ animationDelay: '0.25s' }}>
            <span className="rounded-full bg-card/80 backdrop-blur-sm border border-gold-tint px-4 py-1.5 text-sm font-medium text-gold-text">
              Фуршет от 2 450 ₽/гость
            </span>
            <span className="rounded-full bg-card/80 backdrop-blur-sm border border-gold-tint px-4 py-1.5 text-sm font-medium text-gold-text">
              Банкет от 3 950 ₽/гость
            </span>
            <span className="rounded-full bg-card/80 backdrop-blur-sm border border-gold-tint px-4 py-1.5 text-sm font-medium text-gold-text">
              Кофе-брейк от 390 ₽/гость
            </span>
            <span className="rounded-full bg-card/80 backdrop-blur-sm border border-gold-tint px-4 py-1.5 text-sm font-medium text-gold-text">
              Доставка от 5 000 ₽
            </span>
          </div>

          {/* ONE strong CTA + ONE secondary (instead of 3 CTAs) */}
          <div className="flex flex-wrap items-center gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <Link
              href="/plan"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-gold/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Спланировать событие
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
            <Link
              href="/menu"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
            >
              Смотреть меню
            </Link>
          </div>

          {/* One-line trust signal (not a paragraph) */}
          <p className="mt-8 text-xs text-muted-foreground animate-fade-up" style={{ animationDelay: '0.45s' }}>
            {disclaimer || 'Доставка в КАД включена · Технология су-вид · 14 аллергенов на каждом блюде'}
          </p>
        </div>
      </motion.div>
    </section>
  );
}