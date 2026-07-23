'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

const rIC = typeof requestIdleCallback !== 'undefined' ? requestIdleCallback : (cb: () => void) => window.setTimeout(cb, 1) as unknown as number;
const cIC = typeof cancelIdleCallback !== 'undefined' ? cancelIdleCallback : (id: number) => window.clearTimeout(id);

interface NetworkInformation { effectiveType?: string; saveData?: boolean; }
interface NavigatorWithDevice extends Navigator { deviceMemory?: number; connection?: NetworkInformation; }

export default function HeroBlock() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [shouldAutoplay, setShouldAutoplay] = useState(false);
  const [videoPaused, setVideoPaused] = useState(true);

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const nav = navigator as NavigatorWithDevice;
    const conn = nav.connection;
    const isSlow = !!conn?.effectiveType && !['4g', '5g'].includes(conn.effectiveType);
    const isDataSaver = conn?.saveData === true;
    const isLowMem = (nav.deviceMemory ?? 8) < 4;
    if (!isSlow && !isDataSaver && !isLowMem && !reducedMotion) {
      setShouldAutoplay(true);
      try { if (localStorage.getItem('hero-video-paused') !== 'true') setVideoPaused(false); } catch {}
    }
    const id = rIC(() => { if (videoRef.current) videoRef.current.load(); });
    return () => cIC(id);
  }, [reducedMotion]);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      void videoRef.current.play(); setVideoPaused(false);
      try { localStorage.setItem('hero-video-paused', 'false'); } catch {}
    } else {
      videoRef.current.pause(); setVideoPaused(true);
      try { localStorage.setItem('hero-video-paused', 'true'); } catch {}
    }
  };

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.5, 0]);

  const fadeUp = {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] md:min-h-[90vh] flex items-center justify-center overflow-hidden"
      aria-label="Главный экран"
    >
      <motion.div className="absolute inset-0 z-0" style={reducedMotion ? {} : { scale, opacity }}>
        <picture>
          <source srcSet="/images/gallery/furshet-hero-1920.avif" type="image/avif" media="(min-width: 768px)" />
          <source srcSet="/images/gallery/furshet-hero-768.avif" type="image/avif" media="(max-width: 767px)" />
          <source srcSet="/images/gallery/furshet-hero-1920.webp" type="image/webp" media="(min-width: 768px)" />
          <source srcSet="/images/gallery/furshet-hero-768.webp" type="image/webp" media="(max-width: 767px)" />
          <img src="/images/gallery/furshet-hero-768.webp" alt="Фуршетные канапе и закуски — кейтеринг NiloV в Санкт-Петербурге" className="absolute inset-0 w-full h-full object-cover" fetchPriority="high" />
        </picture>
        <video
          ref={videoRef}
          suppressHydrationWarning
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoReady && !videoPaused ? 'opacity-100' : 'opacity-0'}`}
          muted playsInline loop
          autoPlay={shouldAutoplay && !videoPaused}
          preload="metadata"
          poster="/images/gallery/furshet-hero-768.webp"
          aria-hidden="true"
          onCanPlayThrough={() => setVideoReady(true)}
          onPlay={() => setVideoPaused(false)}
          onPause={() => setVideoPaused(true)}
        >
          <source src="/videos/hero/banquet.mp4" type="video/mp4" />
          <source src="/videos/hero/banquet.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-black/55" />
      </motion.div>

      <button
        type="button"
        onClick={toggleVideo}
        className="absolute top-5 right-4 z-20 rounded-full bg-white/90 backdrop-blur-sm border border-white/40 p-2.5 text-black hover:bg-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        aria-label={videoPaused ? 'Включить фоновое видео' : 'Остановить фоновое видео'}
        aria-pressed={!videoPaused}
      >
        {videoPaused ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M4 3l9 5-9 5V3z" /></svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><rect x="4" y="3" width="3" height="10" rx="1" /><rect x="9" y="3" width="3" height="10" rx="1" /></svg>
        )}
      </button>

      <div className="relative z-10 container-site text-center px-6">
        <motion.a
          href="https://yandex.ru/maps/?text=%D0%BA%D0%B5%D0%B9%D1%82%D0%B5%D1%80%D0%B8%D0%BD%D0%B3%20NiloV%20Catering%20%D0%A1%D0%B0%D0%BD%D0%BA%D1%82-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3"
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mb-7 text-sm text-white/90 hover:text-white transition-colors motion-reduce:opacity-100"
          {...fadeUp} transition={{ ...fadeUp.transition, delay: 0 }}
        >
          <span className="text-amber-400 text-base tracking-tight" aria-hidden="true">★★★★★</span>
          <span className="font-semibold">4.9</span>
          <span className="text-white/80">· 217 отзывов</span>
        </motion.a>

        <motion.h1
          className="mb-5 text-white motion-reduce:opacity-100"
          style={{ lineHeight: 1.08, letterSpacing: '-0.02em' }}
          {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }}
        >
          <span className="block text-4xl md:text-6xl lg:text-7xl font-semibold">
            Кейтеринг под ключ в Петербурге
          </span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-2xl text-white/85 mb-10 max-w-2xl mx-auto font-light motion-reduce:opacity-100"
          {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.16 }}
        >
          Шеф Дмитрий Нилов · 19 лет опыта
        </motion.p>

        <motion.div
          className="flex justify-center motion-reduce:opacity-100"
          {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.24 }}
        >
          <Link
            href="/plan/calculator"
            className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-10 py-4 text-base font-semibold text-black shadow-2xl shadow-amber-500/30 hover:bg-amber-400 transition-all hover:scale-[1.03] active:scale-[0.98] min-h-[56px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Рассчитать за 30 секунд
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 motion-reduce:hidden"
        animate={reducedMotion ? {} : { y: [0, 6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="opacity-50">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </motion.div>
    </section>
  );
}
