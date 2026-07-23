'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SITE } from '@/lib/data';

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
  const [videoPaused, setVideoPaused] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const conn = (navigator as any).connection;
    const isSlow = conn?.effectiveType && !['4g', '5g'].includes(conn.effectiveType);
    const isDataSaver = conn?.saveData === true;
    const isLowMem = (navigator as any).deviceMemory < 4;
    if (!isSlow && !isDataSaver && !isLowMem && !reducedMotion) setShouldAutoplay(true);

    // Restore video pause preference
    try {
      if (localStorage.getItem('hero-video-paused') === 'true') {
        setVideoPaused(true);
      }
    } catch {}

    const id = rIC(() => {
      if (videoRef.current) videoRef.current.load();
    });
    return () => cIC(id);
  }, []);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setVideoPaused(false);
      try { localStorage.setItem('hero-video-paused', 'false'); } catch {}
    } else {
      videoRef.current.pause();
      setVideoPaused(true);
      try { localStorage.setItem('hero-video-paused', 'true'); } catch {}
    }
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.6, 0]);
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
            src="/images/gallery/wedding-banquet-768.webp"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            fetchPriority="high"
            aria-hidden="true"
          />
        </picture>
        <video
          ref={videoRef}
          suppressHydrationWarning
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoReady && !videoPaused ? 'opacity-100' : 'opacity-0'}`}
          muted
          playsInline
          loop
          autoPlay={shouldAutoplay && !videoPaused}
          preload="metadata"
          poster="/images/gallery/wedding-banquet-768.webp"
          aria-hidden="true"
          onCanPlayThrough={() => setVideoReady(true)}
        >
          {/* MP4 first for Safari/iOS, then WebM for Chrome/Firefox */}
          <source src="/videos/hero/banquet.mp4" type="video/mp4" />
          <source src="/videos/hero/banquet.webm" type="video/webm" />
        </video>
        {/* Asymmetric overlay: strong top/bottom for text, transparent middle for video */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/35 to-background/90" />
      </motion.div>

      {/* Video pause button — WCAG 2.2.2 compliance */}
      {shouldAutoplay && !reducedMotion && (
        <button
          onClick={toggleVideo}
          className="absolute top-20 right-4 z-20 rounded-full bg-background/80 backdrop-blur-sm border border-line p-2 text-muted-foreground hover:text-foreground transition-colors focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={videoPaused ? 'Включить фоновое видео' : 'Остановить фоновое видео'}
        >
          {videoPaused ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M4 3l9 5-9 5V3z"/></svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><rect x="4" y="3" width="3" height="10" rx="1"/><rect x="9" y="3" width="3" height="10" rx="1"/></svg>
          )}
        </button>
      )}

      <motion.div
        className="relative z-10 container-site pt-24 pb-16 md:pt-28 md:pb-20"
        style={reducedMotion ? {} : { y: textY }}
      >
        <div className="max-w-[680px]">
          {/* Social proof — stars + review count (top priority for conversion) */}
          <div className="flex items-center gap-3 mb-4 animate-fade-up">
            <a
              href="https://yandex.ru/maps/?text=%D0%BA%D0%B5%D0%B9%D1%82%D0%B5%D1%80%D0%B8%D0%BD%D0%B3%20NiloV%20Catering%20%D0%A1%D0%B0%D0%BD%D0%BA%D1%82-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-gold-text transition-colors"
            >
              <span className="text-gold-text text-base">★★★★★</span>
              <span className="font-semibold">4.9</span>
              <span className="text-muted-foreground">· 217 отзывов на Яндекс.Картах</span>
            </a>
          </div>

          {/* Brand tag — readable size (was text-xs) */}
          <p className="font-mono text-sm tracking-[0.1em] text-gold-text mb-4 animate-fade-up">
            NiloV · Петербург · с 2007
          </p>

          {/* Clear, concrete headline */}
          <h1 className="mb-4 tracking-tight animate-fade-up" style={{ lineHeight: 1.05, letterSpacing: '-0.02em' }}>
            <span className="text-foreground">Кейтеринг под ключ </span>
            <span
              className="relative"
              style={{
                fontWeight: 650,
                color: '#6E5631',
              }}
            >
              в Петербурге
            </span>
          </h1>

          {/* Short subtitle (was 27 words, now 14) */}
          <p className="text-base md:text-lg text-foreground mb-6 animate-fade-up" style={{ animationDelay: '0.15s' }}>
            {subtitle || 'От 6 до 500 гостей. Ресторанное качество, честные цены — без переплат за вывеску. 3 247 событий с 2007 года.'}
          </p>

          {/* Price chips — solid bg for AA contrast (was bg-card/80) */}
          <ul role="list" className="flex flex-wrap gap-2.5 mb-6 animate-fade-up" style={{ animationDelay: '0.25s' }}>
            <li>
              <span className="rounded-full bg-card border border-gold-tint px-4 py-1.5 text-sm font-medium text-foreground">
                Фуршет от <strong className="text-gold-text">2 450 ₽</strong>/гость
              </span>
            </li>
            <li>
              <span className="rounded-full bg-card border border-gold-tint px-4 py-1.5 text-sm font-medium text-foreground">
                Банкет от <strong className="text-gold-text">3 950 ₽</strong>/гость
              </span>
            </li>
            <li>
              <span className="rounded-full bg-card border border-gold-tint px-4 py-1.5 text-sm font-medium text-foreground">
                Кофе-брейк от <strong className="text-gold-text">390 ₽</strong>/гость
              </span>
            </li>
          </ul>

          {/* Primary CTA — concrete action + phone */}
          <div className="flex flex-wrap items-center gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <Link
              href="/plan/calculator"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-gold/30 transition-all hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              Рассчитать стоимость
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
            <a
              href={`tel:${SITE.phoneTel}`}
              className="inline-flex items-center gap-2 rounded-lg border border-line bg-card px-4 py-2.5 text-sm font-semibold text-foreground hover:border-gold-text transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring min-h-[44px]"
            >
              📞 {SITE.phone}
            </a>
          </div>

          {/* Trust signals — appetite-positive + B2B compliance */}
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground animate-fade-up" style={{ animationDelay: '0.45s' }}>
            <span>✓ Доставка в КАД включена</span>
            <span>✓ Шеф-повар с опытом 19 лет</span>
            <span>✓ ЭДО · 44-ФЗ · 223-ФЗ</span>
          </div>

          {/* Urgency element */}
          <p className="mt-3 text-sm text-gold-text font-medium animate-fade-up" style={{ animationDelay: '0.5s' }}>
            🎁 Бесплатная дегустация при заказе от 50 000 ₽ →
          </p>
        </div>
      </motion.div>
    </section>
  );
}
