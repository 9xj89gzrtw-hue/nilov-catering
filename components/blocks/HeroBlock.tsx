"use client";

import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Pause, Play, Volume2, VolumeX } from "lucide-react";

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
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      delay: i * 0.08,
      ease: "easeOut" as const,
    },
  }),
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, delay: 0.5, ease: "easeOut" as const },
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
  const isInView = useInView(ref, { once: true, margin: "-100px" });
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
  const titleWords = ["Кейтеринг", "от", "шефа", "Дмитрия", "Нилова"];

  return (
    <section
      ref={ref}
      className="bg-foreground relative flex min-h-[100dvh] min-h-[100vh] items-end overflow-hidden"
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
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
        style={{ y: videoY }}
        aria-label="Видеофон кейтеринга — банкетный зал"
        onError={() => {
          // Video fallback: hide video if it fails to load
          if (videoRef.current) {
            videoRef.current.style.display = "none";
          }
        }}
      >
        <source src="/videos/hero/banquet.webm" type="video/webm" />
        <source src="/videos/hero-catering.mp4" type="video/mp4" />
      </motion.video>

      {/* Fallback background image for mobile/data-saving mode */}
      <div
        className="absolute inset-0 h-full w-full object-cover md:hidden"
        style={{
          backgroundImage: "url(/images/catering/wedding-02.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      />

      {/* Video Controls — WCAG 2.1.1: User must be able to control video */}
      <div className="absolute right-4 bottom-4 z-30 flex items-center gap-2">
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
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-sm transition-all duration-200 hover:bg-black/70"
          aria-label={isPlaying ? "Пауза видео" : "Воспроизвести видео"}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>
        <button
          type="button"
          onClick={() => {
            if (videoRef.current) {
              videoRef.current.muted = !isMuted;
            }
            setIsMuted(!isMuted);
          }}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-sm transition-all duration-200 hover:bg-black/70"
          aria-label={isMuted ? "Включить звук" : "Выключить звук"}
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>
      </div>

      {/* Dark gradient overlay — тёмный снизу для читаемости текста */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 via-black/50 to-black/20" />

      {/* Cinematic grain overlay for premium feel */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          mixBlendMode: "multiply",
        }}
        aria-hidden="true"
      />

      {/* Floating Gold Particles — декоративные частицы */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
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
        className="absolute top-0 right-0 left-0 z-20 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #C9A961 20%, #D4AF37 50%, #C9A961 80%, transparent 100%)",
        }}
        variants={lineVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        aria-hidden="true"
      />

      {/* Дополнительная тонкая золотая линия чуть ниже */}
      <motion.div
        className="absolute top-[3px] right-[10%] left-[10%] z-20 h-px opacity-40"
        style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }}
        initial={{ opacity: 0, scaleX: 0 }}
        animate={isInView ? { opacity: 0.4, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
        transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
        aria-hidden="true"
      />

      {/* Контент — внизу с parallax */}
      <motion.div
        className="container-site relative z-10 pt-28 pb-20 sm:pt-32 md:pt-40 md:pb-24"
        style={{ y: textY, opacity, scale }}
      >
        <div className="max-w-3xl">
          {/* Eyebrow — premium styling */}
          <motion.p
            className="mb-5 flex items-center gap-3 text-xs font-semibold tracking-[0.25em] text-white/70 uppercase"
            variants={fadeUpVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
          >
            <span
              className="h-px w-8 bg-gradient-to-r from-[#D4AF37] to-transparent"
              aria-hidden="true"
            />
            Кейтеринг в Санкт-Петербурге · с 2007 года
          </motion.p>

          {/* Главный заголовок — word-by-word анимация */}
          <h1
            id="hero-heading"
            className="font-heading mb-5 text-3xl leading-[1.1] text-white sm:text-4xl md:mb-6 md:text-5xl md:leading-[1.05] lg:text-6xl xl:text-7xl"
            style={{ fontWeight: 500, letterSpacing: "-0.01em" }}
          >
            <span className="sr-only">Кейтеринг от шефа Дмитрия Нилова</span>
            <span aria-hidden="true" className="inline">
              {titleWords.map((word, i) => (
                <motion.span
                  key={i}
                  className="mr-[0.22em] inline-block"
                  custom={i}
                  variants={wordVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                >
                  {word}
                  {i === 2 && <span className="text-gold-premium ml-1 inline-block">✦</span>}
                </motion.span>
              ))}
            </span>
          </h1>

          {/* Подзаголовок — enhanced typography */}
          <motion.p
            className="mb-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg md:mb-8 md:text-xl"
            variants={fadeUpVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.8 }}
          >
            Готовим на вашей площадке. Свадьбы, корпоративы, дни рождения.
            <span className="mt-2 block text-base text-white/60">
              От 390 ₽ за гостя — меню, официанты, посуда включены.
            </span>
          </motion.p>

          {/* Цены — reorganized with banquet first (UX Critic fix) */}
          <motion.div
            className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/90"
            variants={fadeUpVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 1.0 }}
          >
            <span className="flex items-baseline gap-1.5">
              Банкет
              <strong className="text-lg font-semibold tracking-wide text-white">от 3 950 ₽</strong>
              <span className="text-xs text-white/50">/гость</span>
            </span>
            <span className="h-4 w-px bg-white/30" aria-hidden="true" />
            <span className="flex items-baseline gap-1.5">
              Фуршет
              <strong className="text-lg font-semibold tracking-wide text-white">от 2 450 ₽</strong>
              <span className="text-xs text-white/50">/гость</span>
            </span>
            <span className="hidden h-4 w-px bg-white/30 sm:block" aria-hidden="true" />
            <span className="flex hidden items-baseline gap-1.5 sm:flex">
              Кофе-брейк
              <strong className="font-medium text-white">от 390 ₽</strong>
            </span>
          </motion.div>

          {/* CTA кнопки — premium styling */}
          <motion.div
            className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4"
            variants={fadeUpVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 1.2 }}
          >
            <Link
              href="/plan/helper"
              className="group relative inline-flex min-h-[52px] items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-4 text-sm font-semibold no-underline transition-all duration-300 hover:-translate-y-0.5 sm:min-h-0 sm:gap-2.5 sm:px-8 sm:py-4.5 sm:text-base"
              style={{
                background: "linear-gradient(135deg, #B8860B 0%, #D4AF37 50%, #AA771C 100%)",
                boxShadow: "0 4px 16px rgba(184,134,11,0.35), 0 0 0 1px rgba(212,175,55,0.2) inset",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 8px 28px rgba(184,134,11,0.45), 0 0 0 1px rgba(212,175,55,0.3) inset, 0 0 40px rgba(201,169,97,0.18)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 4px 16px rgba(184,134,11,0.35), 0 0 0 1px rgba(212,175,55,0.2) inset";
              }}
            >
              {/* Shine effect on hover */}
              <span
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                  transform: "skewX(-25deg) translateX(-100%)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "skewX(-25deg) translateX(200%)";
                  e.currentTarget.style.transition =
                    "transform 0.7s cubic-bezier(0.23, 1, 0.32, 1)";
                }}
              />
              <span className="relative z-10 flex items-center gap-2.5 text-white">
                Узнать цену — ответим за 15 минут
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </Link>

            <Link
              href="/menu"
              className="group inline-flex items-center gap-2.5 px-2 py-1 text-base font-medium text-white/90 underline-offset-4 transition-all hover:text-white hover:underline"
            >
              <span
                className="h-px w-8 bg-white/30 transition-all duration-300 group-hover:w-12 group-hover:bg-[#D4AF37]"
                aria-hidden="true"
              />
              Смотреть меню
            </Link>
          </motion.div>

          {/* Trust строка — enhanced with gold accent */}
          <motion.p
            className="mt-10 flex flex-wrap items-center gap-4 text-sm text-white/55"
            variants={fadeUpVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 1.4 }}
          >
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" aria-hidden="true" />
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
        className="pointer-events-none absolute right-0 bottom-0 left-0 h-32 md:h-40"
        style={{
          background:
            "linear-gradient(to top, #FAF7F2 0%, rgba(250,247,242,0.8) 40%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Bottom gold accent line */}
      <div
        className="absolute right-0 bottom-0 left-0 z-20 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #C9A961 30%, #D4AF37 50%, #C9A961 70%, transparent)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}

// W95: Hero premium upgrade with parallax + floating particles + gold shimmer
