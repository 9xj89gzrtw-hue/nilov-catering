"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ChevronDown, Phone, Play, Star, Quote } from "lucide-react";

const HERO_VIDEO_URL = "https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4";
const HERO_FALLBACK_IMG = "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1920&h=1080&fit=crop";

const wordVariants = {
  hidden: { y: "110%", opacity: 0 },
  visible: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.6,
      delay: 0.3 + i * 0.08,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

function KineticText({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={wordVariants}
          initial="hidden"
          animate="visible"
          className="inline-block overflow-hidden mr-[0.3em]"
        >
          <span className="inline-block">{word}</span>
        </motion.span>
      ))}
    </span>
  );
}

function LineReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [playVideo, setPlayVideo] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.35, 0.8]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const springVideoScale = useSpring(videoScale, { stiffness: 100, damping: 30 });

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background with parallax */}
      <motion.div className="absolute inset-0" style={{ scale: springVideoScale }}>
        <video
          ref={videoRef}
          autoPlay={playVideo}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Фоновое видео кейтеринг-презентации"
          onLoadedData={() => setVideoLoaded(true)}
          onCanPlay={() => setVideoLoaded(true)}
          id="hero-video"
          className="absolute inset-0 w-full h-full object-cover"
          poster={HERO_FALLBACK_IMG}
        >
          <source src={HERO_VIDEO_URL} type="video/mp4" />
        </video>

        {/* Play button overlay */}
        <motion.div
          className="absolute inset-0 z-10 flex items-center justify-center"
          style={{ opacity: playVideo ? 0 : 1, pointerEvents: playVideo ? "none" : "auto" }}
          onClick={() => { if (videoRef.current) { videoRef.current.play(); setPlayVideo(true); } }}
        >
          <motion.button
            className="w-20 h-20 md:w-24 md:h-24 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-colors duration-300 cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Воспроизвести видео"
            aria-controls="hero-video"
          >
            <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="white" />
          </motion.button>
        </motion.div>

        {!videoLoaded && (
          <div
            className="absolute inset-0 bg-cover bg-center scale-105"
            style={{ backgroundImage: `url(${HERO_FALLBACK_IMG})` }}
          />
        )}
      </motion.div>

      {/* Multi-layer overlay with gradient */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity: overlayOpacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20" />
      </motion.div>

      {/* Grain texture */}
      <div className="absolute inset-0 grain-overlay pointer-events-none" />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 w-full"
        style={{ y: textY, opacity: contentOpacity }}
      >
        {/* Animated badge */}
        <LineReveal delay={0.1}>
          <motion.div
            className="inline-flex items-center gap-2 mb-6 md:mb-8"
            whileHover={{ scale: 1.05 }}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
            </span>
            <span className="glass text-white/90 text-xs md:text-sm font-medium tracking-[0.2em] uppercase px-4 py-2 rounded-full">
              Премиальный кейтеринг в Москве
            </span>
          </motion.div>
        </LineReveal>

        {/* Kinetic heading */}
        <div className="overflow-hidden mb-6 md:mb-8">
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.1]">
            <KineticText text="Искусство кейтеринга" />
            <br />
            <KineticText
              text="для ваших мероприятий"
              className="gradient-text"
            />
          </h1>
        </div>

        {/* Animated line accent */}
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent mx-auto mb-6 md:mb-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ maxWidth: "200px" }}
        />

        {/* Subtitle */}
        <LineReveal delay={0.9}>
          <p className="text-white/75 text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed">
            Создаём уникальные гастрономические впечатления для мероприятий
            любого масштаба — от камерных ужинов до торжеств на 500 гостей
          </p>
        </LineReveal>

        {/* CTA Buttons */}
        <LineReveal delay={1.1}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link
                href="/quote"
                className="btn-glow group relative inline-flex h-13 items-center justify-center gap-2.5 rounded-xl px-8 py-3.5 text-sm font-semibold bg-accent text-white hover:bg-accent-dark transition-all duration-300 shadow-xl shadow-accent/30 hover:shadow-accent/50"
              >
                <span className="relative z-10">Рассчитать стоимость</span>
                <svg className="relative z-10 w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link
                href="/menu"
                className="glass group inline-flex h-13 items-center justify-center gap-2.5 rounded-xl px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/15 transition-all duration-300"
              >
                <span>Смотреть меню</span>
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </LineReveal>

        {/* Trust line */}
        <LineReveal delay={1.5}>
          <div className="mt-10 md:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-white/50 text-xs md:text-sm">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5" />
              <a href="tel:+74959213456" className="hover:text-white/80 transition-colors">+7 (495) 921-34-56</a>
            </div>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-white/30" />
            <span>850+ мероприятий безупречно проведено</span>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-white/30" />
            <span>Ответ в течение 2 часов</span>
          </div>
        </LineReveal>
      </motion.div>

      {/* Floating testimonial card */}
      <motion.div
        initial={{ opacity: 0, x: 80, y: 100 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.8, delay: 2.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="hidden lg:block absolute bottom-32 right-8 xl:right-16 z-20 w-72 glass-dark rounded-2xl p-5"
      >
        <div className="flex items-center gap-1 mb-2">
          {[1,2,3,4,5].map(n => (
            <Star key={n} className="w-3.5 h-3.5 text-gold fill-gold" />
          ))}
        </div>
        <Quote className="w-5 h-5 text-accent/30 absolute top-4 right-4" />
        <p className="text-white/80 text-sm leading-relaxed mb-3">
          &laquo;Невероятно вкусно и красиво. Гости были в восторге от сервировки и качества блюд!&raquo;
        </p>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-accent/30 flex items-center justify-center text-white text-xs font-bold">АК</div>
          <div>
            <p className="text-white text-xs font-medium">Анна Козлова</p>
            <p className="text-white/50 text-[11px]">Свадьба, 250 гостей</p>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator with line animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase">Листайте</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center p-1.5"
        >
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3], y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-1 h-1.5 rounded-full bg-white/70"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}