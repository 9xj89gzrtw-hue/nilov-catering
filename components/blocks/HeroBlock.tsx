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

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.5, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
      aria-label="Главный экран"
    >
      {/* Background: food close-up image + optional video */}
      <motion.div
        className="absolute inset-0 z-0"
        style={reducedMotion ? {} : { scale, opacity }}
      >
        <picture>
          <source srcSet="/images/gallery/furshet-hero-1920.avif" type="image/avif" media="(min-width: 768px)" />
          <source srcSet="/images/gallery/furshet-hero-768.avif" type="image/avif" media="(max-width: 767px)" />
          <source srcSet="/images/gallery/furshet-hero-1920.webp" type="image/webp" media="(min-width: 768px)" />
          <source srcSet="/images/gallery/furshet-hero-768.webp" type="image/webp" media="(max-width: 767px)" />
          <img
            src="/images/gallery/furshet-hero-768.webp"
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
          poster="/images/gallery/furshet-hero-768.webp"
          aria-hidden="true"
          onCanPlayThrough={() => setVideoReady(true)} onPlay={() => setVideoPaused(false)} onPause={() => setVideoPaused(true)}
        >
          <source src="/videos/hero/banquet.mp4" type="video/mp4" />
          <source src="/videos/hero/banquet.webm" type="video/webm" />
        </video>
        {/* Darker overlay for text legibility — centered text needs uniform dark bg */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/60 to-black/70" />
      </motion.div>

      {/* Video pause button — always rendered in SSR for WCAG 2.2.2 */}
      <button
        onClick={toggleVideo}
        className="absolute top-24 right-4 z-20 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 p-2.5 text-white hover:bg-black/70 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-white"
        aria-label={videoPaused ? 'Включить фоновое видео' : 'Остановить фоновое видео'}
      >
        {videoPaused ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M4 3l9 5-9 5V3z"/></svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><rect x="4" y="3" width="3" height="10" rx="1"/><rect x="9" y="3" width="3" height="10" rx="1"/></svg>
        )}
      </button>

      {/* Centered content — minimal, clean */}
      <div className="relative z-10 container-site text-center px-6">
        {/* Social proof — minimal */}
        <div className="flex items-center justify-center gap-2 mb-6 animate-fade-up">
          <a
            href="https://yandex.ru/maps/?text=%D0%BA%D0%B5%D0%B9%D1%82%D0%B5%D1%80%D0%B8%D0%BD%D0%B3%20NiloV%20Catering%20%D0%A1%D0%B0%D0%BD%D0%BA%D1%82-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-white hover:text-white transition-colors"
          >
            <span className="text-amber-400 text-base">★★★★★</span>
            <span className="font-semibold">4.9</span>
            <span className="text-white/90">· 217 отзывов</span>
          </a>
        </div>

        {/* Single powerful headline — centered, large, white on dark */}
        <h1
          className="mb-4 animate-fade-up text-white"
          style={{ lineHeight: 1.1, letterSpacing: '-0.02em' }}
        >
          <span className="block text-4xl md:text-6xl lg:text-7xl font-bold">Кейтеринг</span>
          <span className="block text-2xl md:text-4xl lg:text-5xl font-light text-amber-400 mt-2">под ключ в Петербурге</span>
        </h1>

        {/* One-line subtitle — minimal */}
        <p className="text-lg md:text-xl text-white mb-8 max-w-xl mx-auto animate-fade-up" style={{ animationDelay: '0.15s' }}>
          От 6 до 500 гостей. Ресторанное качество по честной цене.
        </p>

        {/* Single primary CTA — centered, large */}
        <div className="flex flex-col items-center gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <Link
            href="/plan/calculator"
            className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-10 py-4 text-base font-semibold text-black shadow-2xl shadow-amber-500/30 hover:bg-amber-400 transition-all hover:scale-[1.03] active:scale-[0.98] min-h-[52px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Рассчитать стоимость
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
          <a
            href={`tel:${SITE.phoneTel}`}
            className="text-sm text-white/90 hover:text-white transition-colors min-h-[44px] flex items-center"
          >
            или позвоните: {SITE.phone}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" aria-hidden="true" className="opacity-50">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}
