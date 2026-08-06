'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { SITE } from '@/lib/data';

interface HeroSlide {
  photo: string;
  alt: string;
}

// ONE static headline — rotating carousel was A/B-test-hostile (strongest headline shown only 25%)
const STATIC_HEADLINE = 'Ресторан, который приезжает к вам';
const STATIC_SUBTITLE = 'Кейтеринг под ключ в Санкт-Петербурге. Меню, официанты, посуда, доставка — от 390 ₽ за гостя. Без скрытых платежей.';
const STATIC_EYEBROW = 'Выездной ресторан с 2007 года';

// Background photos still rotate (visual variety), but headline stays
const PHOTOS: HeroSlide[] = [
  { photo: 'wedding-banquet',  alt: 'Свадебный банкет — кейтеринг NiloV' },
  { photo: 'canape-platter',   alt: 'Фуршетные канапе — кейтеринг NiloV' },
  { photo: 'beef-medallions',  alt: 'Банкет — горячее блюдо от шефа NiloV' },
  { photo: 'dessert-table',    alt: 'Десертный стол — кейтеринг NiloV' },
];

const STATS = [
  { value: '19', label: 'лет в СПб' },
  { value: '27', label: 'отзывов · 4.8★' },
  { value: '124', label: 'блюда в каталоге' },
  { value: '40+', label: 'человек в штате' },
];

export default function HeroBlock() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI(c => (c + 1) % PHOTOS.length), 7000);
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
        {PHOTOS.map((s, idx) => (
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
        {/* Removed Ken-Burns zoom — was 2015-era, distracting. Photos crossfade only. */}
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

      {/* Photo indicators — bottom-center (photos rotate, headline stays) */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-md" role="tablist" aria-label="Фотографии">
        {PHOTOS.map((s, idx) => (
          <button
            key={s.photo}
            onClick={() => setI(idx)}
            className="block rounded-full transition-all duration-300"
            style={{
              width: idx === i ? 28 : 8,
              height: 8,
              backgroundColor: idx === i ? '#E8C97E' : 'rgba(255,255,255,0.5)',
            }}
            aria-label={`Фото ${idx + 1}`}
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
            {STATIC_EYEBROW}
          </motion.p>

          {/* Static headline — ONE message, always visible (was rotating 4 headlines) */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] mb-4 max-w-2xl drop-shadow-xl"
            style={{ fontWeight: 500 }}
          >
            {STATIC_HEADLINE}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-white/95 text-base md:text-xl mb-8 max-w-xl leading-relaxed drop-shadow-lg"
          >
            {STATIC_SUBTITLE}
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
                <dd className="font-heading text-3xl md:text-4xl text-white font-semibold drop-shadow-lg">{s.value}</dd>
                <dd className="text-xs uppercase tracking-wider text-white/85 mt-1 drop-shadow">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>

      {/* Removed scroll indicator — was clutter, photos already signal vertical content */}
    </section>
  );
}
