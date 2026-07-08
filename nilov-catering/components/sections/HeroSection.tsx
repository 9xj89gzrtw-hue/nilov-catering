"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ChevronDown, Play, Pause } from "lucide-react";
import AnimatedSection from "@/components/common/AnimatedSection";

const HERO_VIDEO_URL = "https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4";
const HERO_FALLBACK_IMG = "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1920&h=1080&fit=crop";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 0.75]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <motion.div className="absolute inset-0" style={{ scale: videoScale }}>
        <video
          ref={videoRef}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setVideoLoaded(true)}
          onCanPlay={() => setVideoLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover"
          poster={HERO_FALLBACK_IMG}
        >
          <source src={HERO_VIDEO_URL} type="video/mp4" />
        </video>

        {/* Fallback image while video loads */}
        {!videoLoaded && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${HERO_FALLBACK_IMG})` }}
          />
        )}
      </motion.div>

      {/* Overlay */}
      <motion.div
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
      />

      {/* Mute toggle */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="absolute bottom-24 right-6 z-20 p-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all"
        aria-label={isMuted ? "Включить звук" : "Выключить звук"}
      >
        {isMuted ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      </button>

      {/* Content */}
      <motion.div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20" style={{ y: textY }}>
        <AnimatedSection>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-accent text-sm md:text-base font-medium tracking-widest uppercase mb-4"
          >
            Кейтеринг в Москве с 2013 года
          </motion.p>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Искусство кейтеринга
            <br />
            <span className="text-accent">для ваших мероприятий</span>
          </motion.h1>
        </AnimatedSection>

        <AnimatedSection delay={0.5}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-8"
          >
            Создаём уникальные гастрономические впечатления для мероприятий
            любого масштаба — от камерных ужинов до торжеств на 500 гостей
          </motion.p>
        </AnimatedSection>

        <AnimatedSection delay={0.7}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/quote"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg px-8 py-3 text-sm font-semibold bg-accent text-white hover:bg-accent/90 transition-colors shadow-lg shadow-accent/25"
              >
                Рассчитать стоимость
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/menu"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg px-8 py-3 text-sm font-semibold border border-white/30 text-white hover:bg-white/10 transition-colors backdrop-blur-sm"
              >
                Смотреть меню
              </Link>
            </motion.div>
          </motion.div>
        </AnimatedSection>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 text-white/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}