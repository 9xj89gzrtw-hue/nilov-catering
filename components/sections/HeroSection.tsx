'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import MagneticButton from '@/components/effects/MagneticButton';
import MaskReveal from '@/components/effects/TextReveal';

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <section
      ref={ref}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      aria-label="Главный экран"
    >
      {/* Background with parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ y: bgY, scale: bgScale, willChange: 'transform' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <video
          src="/videos/hero/banquet.webm"
          poster="/images/hero/catering-hero.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="w-full h-[120%] object-cover"
        />
        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-[#0A0A0A]/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/40 via-transparent to-[#0A0A0A]/40" />
        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10,10,10,0.7) 100%)',
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center"
        style={{ y: textY, opacity, willChange: 'transform, opacity' }}
      >
        {/* Overline */}
        <MaskReveal delay={0.8}>
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-gold/90 font-medium mb-6 md:mb-8">
            Премиальный кейтеринг в Санкт-Петербурге
          </p>
        </MaskReveal>

        {/* Main heading */}
        <div className="overflow-hidden">
          <motion.h1
            className="font-heading text-[clamp(2.8rem,8vw,7rem)] font-semibold text-cream leading-[0.95] tracking-tight"
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Гастрономия,
            <br />
            <span className="text-gold italic">которая создаёт</span>
            <br />
            впечатления
          </motion.h1>
        </div>

        {/* Subtitle */}
        <MaskReveal delay={1.3}>
          <p className="text-sm sm:text-base md:text-lg text-cream/50 max-w-lg mx-auto mt-6 md:mt-8 leading-relaxed font-light">
            Авторское меню, безупречный сервис и внимание к каждой детали —
            для мероприятий, которые запоминаются
          </p>
        </MaskReveal>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 md:mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <MagneticButton
            href="tel:+78129195911"
            className="btn-primary text-xs uppercase tracking-wider w-full sm:w-auto cursor-hover"
          >
            Обсудить мероприятие
          </MagneticButton>
          <MagneticButton
            href="/constructor"
            className="btn-outline text-xs uppercase tracking-wider w-full sm:w-auto cursor-hover"
          >
            Смотреть меню
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
      >
        <a
          href="#social-proof"
          className="flex flex-col items-center gap-2 text-cream/30 hover:text-cream/60 transition-colors duration-500 cursor-hover"
          aria-label="Прокрутить вниз"
        >
          <span className="text-[9px] uppercase tracking-[0.3em] font-medium">Листайте</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </a>
      </motion.div>

      {/* Side decorations */}
      <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3 z-10">
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-cream/20" />
        <span className="text-[9px] uppercase tracking-[0.25em] text-cream/20 font-medium [writing-mode:vertical-lr] rotate-180">
          Est. 2014
        </span>
        <div className="w-px h-16 bg-gradient-to-b from-cream/20 to-transparent" />
      </div>

      {/* Marquee strip — signature brand element */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-border/50 overflow-hidden py-3">
        <motion.div
          className="flex whitespace-nowrap gap-12"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          {[
            'СВАДЬБЫ', 'КОРПОРАТИВЫ', 'ФУРШЕТЫ', 'БАНКЕТЫ', 'ВЫЕЗДНАЯ СЕРВИРОВКА', 'ДЕСЕРТНЫЕ СТОЛЫ', 'ШОУ-СТАНЦИИ', 'ДЕТСКИЕ ПРАЗДНИКИ',
            'СВАДЬБЫ', 'КОРПОРАТИВЫ', 'ФУРШЕТЫ', 'БАНКЕТЫ', 'ВЫЕЗДНАЯ СЕРВИРОВКА', 'ДЕСЕРТНЫЕ СТОЛЫ', 'ШОУ-СТАНЦИИ', 'ДЕТСКИЕ ПРАЗДНИКИ',
          ].map((word, i) => (
            <span key={i} className="text-[10px] uppercase tracking-[0.5em] text-cream/15 font-medium flex items-center gap-12">
              {word}
              <span className="text-gold/20 text-[6px]">◆</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}