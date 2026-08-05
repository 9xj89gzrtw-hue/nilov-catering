'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { SITE } from '@/lib/data';

interface HeroSlide {
  photo: string;
  alt: string;
  eyebrow: string;
  headline: string;
}

const SLIDES: HeroSlide[] = [
  {
    photo: 'wedding-banquet',
    alt: 'Свадебный банкет — кейтеринг NiloV в Санкт-Петербурге',
    eyebrow: 'Свадьбы под ключ',
    headline: 'Ресторан, который приезжает к вам',
  },
  {
    photo: 'canape-platter',
    alt: 'Фуршетные канапе — кейтеринг NiloV',
    eyebrow: 'Фуршет от 2 450 ₽/гость',
    headline: '120 блюд. 14 аллергенов под контролем.',
  },
  {
    photo: 'dessert-table',
    alt: 'Десертный стол — кейтеринг NiloV',
    eyebrow: 'Сезонные станции',
    headline: 'Шоколадные фонтаны, сыроварня, блинная',
  },
  {
    photo: 'beef-medallions',
    alt: 'Банкет — горячее блюдо от шефа NiloV',
    eyebrow: 'Банкет от 3 950 ₽/гость',
    headline: 'Шеф Дмитрий Нилов. 19 лет на вашей кухне.',
  },
];

const STATS = [
  { value: '19', label: 'лет в СПб' },
  { value: '3 000+', label: 'событий' },
  { value: '4.8', label: 'средняя оценка' },
  { value: '124', label: 'блюда в каталоге' },
];

export default function HeroBlock() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI(c => (c + 1) % SLIDES.length), 5500);
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <section
      className="relative min-h-[92vh] flex items-end overflow-hidden bg-foreground"
      aria-roledescription="carousel"
      aria-label="Возможности кейтеринга NiloV"
    >
      {/* Background photo carousel — crossfade */}
      <div className="absolute inset-0">
        {SLIDES.map((s, idx) => (
          <motion.picture
            key={s.photo}
            initial={false}
            animate={{ opacity: idx === i ? 1 : 0 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
            className="absolute inset-0"
            aria-hidden={idx !== i}
          >
            <source srcSet={`/images/real/${s.photo}-480.avif 480w, /images/real/${s.photo}-768.avif 768w, /images/real/${s.photo}.avif 1920w`} sizes="100vw" type="image/avif" />
            <source srcSet={`/images/real/${s.photo}-480.webp 480w, /images/real/${s.photo}-768.webp 768w, /images/real/${s.photo}.webp 1920w`} sizes="100vw" type="image/webp" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/images/real/${s.photo}.jpg`}
              alt={idx === i ? s.alt : ''}
              className="w-full h-full object-cover"
              loading={idx === 0 ? 'eager' : 'lazy'}
              fetchPriority={idx === 0 ? 'high' : 'auto'}
            />
          </motion.picture>
        ))}
        {/* Ken-Burns on the active slide — disabled if reduce-motion */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ scale: 1.0 }}
          animate={{ scale: reduce ? 1.0 : 1.08 }}
          transition={{ duration: 6, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
          aria-hidden="true"
          style={{ boxShadow: 'inset 0 0 200px rgba(0,0,0,0.4)' }}
        />
        {/* Gradient overlay — heavier for text contrast (VLM: "Low contrast on secondary text") */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.55) 30%, rgba(0,0,0,0.65) 65%, rgba(0,0,0,0.95) 100%)',
          }}
          aria-hidden="true"
        />
        {/* Mobile: extra bottom gradient for text legibility on small screens */}
        <div
          className="absolute inset-0 md:hidden"
          style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 30%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.98) 100%)',
          }}
          aria-hidden="true"
        />
        {/* Left-side gradient for text legibility on wider screens */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background: 'linear-gradient(90deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.3) 40%, transparent 70%)',
          }}
          aria-hidden="true"
        />
      </div>

      {/* Slide indicators — bottom-center, minimal pill style (VLM: "floating dots look like glitch") */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-md" role="tablist" aria-label="Слайды">
        {SLIDES.map((s, idx) => (
          <button
            key={s.photo}
            onClick={() => setI(idx)}
            className="block rounded-full transition-all duration-300"
            style={{
              width: idx === i ? 28 : 8,
              height: 8,
              backgroundColor: idx === i ? '#E8C97E' : 'rgba(255,255,255,0.5)',
            }}
            aria-label={`Слайд ${idx + 1}: ${s.eyebrow}`}
            aria-selected={idx === i}
            role="tab"
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full container-site pb-20 md:pb-28 pt-32">
        <div className="max-w-3xl">
          {/* Prestige anchor — Magnifique/Searcys pattern */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-xs md:text-sm uppercase tracking-[0.22em] text-[#E8C97E] mb-4"
          >
            Выездной ресторан в Санкт-Петербурге · с 2007 года
          </motion.p>

          {/* Slide-aware headline */}
          <motion.h1
            key={`headline-${i}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] mb-4 max-w-2xl"
            style={{ fontWeight: 500 }}
          >
            {SLIDES[i].headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-white/85 text-base md:text-xl mb-8 max-w-xl leading-relaxed"
          >
            Полный кейтеринг под ключ: меню, официанты, посуда, доставка, сервировка и уборка.
            Без скрытых платежей. От 390 ₽ за гостя.
          </motion.p>

          {/* CTAs — unified pill style, consistent sizing */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center mb-12"
          >
            <Link
              href="/plan/helper"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C9A66B] hover:bg-[#B8924F] text-[#1A1410] px-7 py-4 text-base font-semibold transition-all no-underline shadow-lg shadow-black/30 min-w-[240px]"
            >
              Рассчитать меню — 3 вопроса
              <ChevronDown className="w-4 h-4 -rotate-90" aria-hidden="true" />
            </Link>
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/50 backdrop-blur-sm text-white px-7 py-4 text-base font-semibold transition-all no-underline min-w-[240px]"
            >
              <MessageCircle className="w-5 h-5" aria-hidden="true" />
              WhatsApp
            </a>
            <a
              href={`tel:${SITE.phoneTel}`}
              className="inline-flex items-center justify-center text-white/90 hover:text-white text-base font-medium transition-colors no-underline px-2 py-4"
            >
              или {SITE.phone}
            </a>
          </motion.div>

          {/* Trust stats — strip below CTAs (Catery pattern) */}
          <motion.dl
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5 max-w-2xl pt-8 border-t border-white/20"
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-heading text-3xl md:text-4xl text-white font-semibold">{s.value}</dd>
                <dd className="text-xs uppercase tracking-wider text-white/75 mt-1">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-white/60"
        aria-hidden="true"
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Листайте</span>
        <motion.div
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
