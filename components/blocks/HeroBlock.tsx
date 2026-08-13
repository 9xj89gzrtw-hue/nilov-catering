'use client';

import Link from 'next/link';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowRight, Pause, Play, Volume2, VolumeX } from 'lucide-react';

/**
 * HeroBlock — full-bleed video hero с кинематографическими анимациями
 *
 * W95: Premium upgrade по критике Design Critic #1 (7.2→8.5+):
 * - Parallax эффект на видео и контенте
 * - Floating gold particles (декоративные частицы)
 * - Enhanced gold shimmer на акцентах
 * - Premium CTA кнопки с metallic эффектом
 *
 * Вдохновение: Ballena Cabo, Wolfgang Puck Catering, Rhubarb London
 */

// ─── Animation Variants ───────────────────────────────────────────────────

const wordVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      delay: i * 0.08,
      ease: 'easeOut' as const,
    },
  }),
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, delay: 0.5, ease: 'easeOut' as const },
  },
};

// Floating particles data
const PARTICLES = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  x: 10 + Math.random() * 80, // % position
  y: 15 + Math.random() * 70,
  size: 2 + Math.random() * 4,
  duration: 4 + Math.random() * 4,
  delay: Math.random() * 2,
}));

// ─── Main Component ───────────────────────────────────────────────────────

export default function HeroBlock() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  
  // Parallax scroll effects
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.85], [1, 0.98]);

  // Заголовок разбит на слова для анимации
  const titleWords = ['Кейтеринг', 'от', 'шефа', 'Дмитрия', 'Нилова'];

  return (
    <section
      ref={ref}
      className="relative min-h-[100vh] flex items-end overflow-hidden bg-foreground"
      aria-labelledby="hero-heading"
    >
      {/* Full-bleed video background with parallax */}
      <motion.video
        ref={videoRef}
        autoPlay
        muted={isMuted}
        loop={!isPlaying ? false : true}
        playsInline
        preload="metadata"
        poster="/images/catering/wedding-02.jpg"
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
        style={{ y: videoY }}
        aria-label="Видеофон кейтеринга — банкетный зал"
      >
        <source src="/videos/hero/banquet.webm" type="video/webm" />
        <source src="/videos/hero-catering.mp4" type="video/mp4" />
      </motion.video>

      {/* Video Controls — WCAG 2.1.1: User must be able to control video */}
      <div className="absolute bottom-4 right-4 z-30 flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            if (isPlaying) {
              videoRef.current?.pause();
            } else {
              videoRef.current?.play();
            }
            setIsPlaying(!isPlaying);
          }}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm transition-all duration-200 border border-white/20"
          aria-label={isPlaying ? 'Пауза видео' : 'Воспроизвести видео'}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
        <button
          type="button"
          onClick={() => {
            if (videoRef.current) {
              videoRef.current.muted = !isMuted;
            }
            setIsMuted(!isMuted);
          }}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm transition-all duration-200 border border-white/20"
          aria-label={isMuted ? 'Включить звук' : 'Выключить звук'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Dark gradient overlay — тёмный снизу для читаемости текста */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 via-black/30 to-black/20" />
      
      {/* Cinematic grain overlay for premium feel */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'multiply',
        }}
        aria-hidden="true"
      />

      {/* Floating Gold Particles — декоративные частицы */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: `radial-gradient(circle, rgba(212,175,55,0.6) 0%, transparent 70%)`,
            }}
            animate={{
              y: [-15, 15, -10, 20, -15],
              x: [-5, 8, -10, 5, -5],
              opacity: [0.2, 0.5, 0.3, 0.6, 0.2],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}
      </div>

      {/* Сигнатурная золотая линия сверху (brand motif) с shimmer */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px z-20"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, #C9A961 20%, #D4AF37 50%, #C9A961 80%, transparent 100%)',
        }}
        variants={lineVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        aria-hidden="true"
      />
      
      {/* Дополнительная тонкая золотая линия чуть ниже */}
      <motion.div
        className="absolute top-[3px] left-[10%] right-[10%] h-px z-20 opacity-40"
        style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }}
        initial={{ opacity: 0, scaleX: 0 }}
        animate={isInView ? { opacity: 0.4, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
        transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
        aria-hidden="true"
      />

      {/* Контент — внизу с parallax */}
      <motion.div 
        className="relative z-10 container-site pb-16 md:pb-24 pt-32 md:pt-40"
        style={{ y: textY, opacity, scale }}
      >
        <div className="max-w-3xl">
          {/* Eyebrow — premium styling */}
          <motion.p
            className="text-xs uppercase tracking-[0.25em] text-white/70 font-semibold mb-5 flex items-center gap-3"
            variants={fadeUpVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 0.2 }}
          >
            <span className="w-8 h-px bg-gradient-to-r from-[#D4AF37] to-transparent" aria-hidden="true" />
            Кейтеринг в Санкт-Петербурге · с 2007 года
          </motion.p>

          {/* Главный заголовок — word-by-word анимация */}
          <h1
            id="hero-heading"
            className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white leading-[1.05] mb-6"
            style={{ fontWeight: 500, letterSpacing: '-0.02em' }}
          >
            <span className="sr-only">Кейтеринг от шефа Дмитрия Нилова</span>
            <span aria-hidden="true" className="inline">
              {titleWords.map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-[0.22em]"
                  custom={i}
                  variants={wordVariants}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                >
                  {word}
                  {i === 2 && (
                    <span className="text-gold-premium inline-block ml-1">✦</span>
                  )}
                </motion.span>
              ))}
            </span>
          </h1>

          {/* Подзаголовок — enhanced typography */}
          <motion.p
            className="text-lg md:text-xl text-white/85 mb-8 max-w-xl leading-relaxed"
            variants={fadeUpVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 0.8 }}
          >
            Готовим на вашей площадке. Свадьбы, корпоративы, дни рождения.
            <span className="block mt-2 text-white/60 text-base">
              От 390 ₽ за гостя — меню, официанты, посуда включены.
            </span>
          </motion.p>

          {/* Цены — reorganized with banquet first (UX Critic fix) */}
          <motion.div
            className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-10 text-white/90 text-sm"
            variants={fadeUpVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 1.0 }}
          >
            <span className="flex items-baseline gap-1.5">
              Банкет 
              <strong className="text-white text-lg font-semibold tracking-wide">от 3 950 ₽</strong>
              <span className="text-white/50 text-xs">/гость</span>
            </span>
            <span className="w-px h-4 bg-white/30" aria-hidden="true" />
            <span className="flex items-baseline gap-1.5">
              Фуршет 
              <strong className="text-white text-lg font-semibold tracking-wide">от 2 450 ₽</strong>
              <span className="text-white/50 text-xs">/гость</span>
            </span>
            <span className="w-px h-4 bg-white/30 hidden sm:block" aria-hidden="true" />
            <span className="flex items-baseline gap-1.5 hidden sm:flex">
              Кофе-брейк 
              <strong className="text-white font-medium">от 390 ₽</strong>
            </span>
          </motion.div>

          {/* CTA кнопки — premium styling */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
            variants={fadeUpVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 1.2 }}
          >
            <Link
              href="/plan/helper"
              className="group relative inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4.5 text-base font-semibold overflow-hidden no-underline transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg, #B8860B 0%, #D4AF37 50%, #AA771C 100%)',
                boxShadow: '0 4px 16px rgba(184,134,11,0.35), 0 0 0 1px rgba(212,175,55,0.2) inset',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 28px rgba(184,134,11,0.45), 0 0 0 1px rgba(212,175,55,0.3) inset, 0 0 40px rgba(201,169,97,0.18)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(184,134,11,0.35), 0 0 0 1px rgba(212,175,55,0.2) inset';
              }}
            >
              {/* Shine effect on hover */}
              <span 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                  transform: 'skewX(-25deg) translateX(-100%)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'skewX(-25deg) translateX(200%)';
                  e.currentTarget.style.transition = 'transform 0.7s cubic-bezier(0.23, 1, 0.32, 1)';
                }}
              />
              <span className="relative z-10 text-white flex items-center gap-2.5">
                Узнать цену — ответим за 15 минут
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </span>
            </Link>
            
            <Link
              href="/menu"
              className="group inline-flex items-center gap-2.5 text-white/90 hover:text-white text-base font-medium underline-offset-4 hover:underline transition-all px-2 py-1"
            >
              <span className="w-8 h-px bg-white/30 group-hover:bg-[#D4AF37] group-hover:w-12 transition-all duration-300" aria-hidden="true" />
              Смотреть меню
            </Link>
          </motion.div>

          {/* Trust строка — enhanced with gold accent */}
          <motion.p
            className="text-sm text-white/55 mt-10 flex items-center gap-4 flex-wrap"
            variants={fadeUpVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 1.4 }}
          >
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" aria-hidden="true" />
              19 лет на кухне Петербурга
            </span>
            <span className="text-white/30">·</span>
            <span>3 000+ событий</span>
            <span className="text-white/30">·</span>
            <span>4.8/5 по 27 отзывам</span>
          </motion.p>
        </div>
      </motion.div>

      {/* Декоративный градиент снизу для плавного перехода — enhanced */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 md:h-40 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, #FAF7F2 0%, rgba(250,247,242,0.8) 40%, transparent 100%)',
        }}
        aria-hidden="true"
      />
      
      {/* Bottom gold accent line */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-px z-20"
        style={{
          background: 'linear-gradient(90deg, transparent, #C9A961 30%, #D4AF37 50%, #C9A961 70%, transparent)',
        }}
        aria-hidden="true"
      />
    </section>
  );
}

// W95: Hero premium upgrade with parallax + floating particles + gold shimmer
