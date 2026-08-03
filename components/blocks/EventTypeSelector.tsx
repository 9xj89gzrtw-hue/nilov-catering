'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Format } from '@/lib/types';

/**
 * EventTypeSelector — 4 основных формата кейтеринга.
 *
 * World-class pattern (Paula LeDuc, Catering by Michaels): each card is a
 * full-bleed real photo (aspect 4/3) with a dark gradient at the bottom and
 * text overlay (event name + price). NO SVG placeholders, NO emoji.
 *
 * Previously used KenBurnsCard (CSS-only bg-image, no AVIF/WebP fallback,
 * no <picture> for modern formats). Now uses <picture> with AVIF/WebP/JPG
 * sources matching the /images/real/ assets.
 */
type EventCard = {
  format: Format;
  href: string;
  price: string;
  label: string;
  desc: string;
  photo: string; // base name in /images/real/ (without extension)
};

const EVENTS: EventCard[] = [
  {
    format: 'banket',
    href: '/events/svadba',
    price: 'от 3 950 ₽',
    label: 'Свадьба',
    desc: 'От камерной до банкета на 200 гостей',
    photo: 'wedding-banquet',
  },
  {
    format: 'banket',
    href: '/events/korporativ',
    price: 'от 2 450 ₽',
    label: 'Корпоратив',
    desc: 'Фуршет в офисе или банкет с посадкой',
    photo: 'corporate-buffet',
  },
  {
    format: 'furshet',
    href: '/events/chastnoe',
    price: 'от 2 450 ₽',
    label: 'Фуршет',
    desc: 'Дни рождения, юбилеи, частные события',
    photo: 'canape-platter',
  },
  {
    format: 'coffee-break',
    href: '/pricing?event=coffee-break',
    price: 'от 390 ₽',
    label: 'Кофе-брейк',
    desc: 'Конференции, семинары, тренинги',
    photo: 'coffee-drink',
  },
];

export default function EventTypeSelector() {
  return (
    <motion.section
      className="py-16 md:py-24 bg-background"
      aria-labelledby="events-heading"
      initial="visible"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
    >
      <div className="container-site">
        <motion.div className="mb-10 md:mb-12 md:text-center" variants={{ visible: { y: 0, opacity: 1 } }}>
          <h2 id="events-heading" className="font-heading text-3xl md:text-5xl mb-3" style={{ fontWeight: 500 }}>
            Какое у вас событие?
          </h2>
          <p className="text-muted-foreground max-w-xl md:mx-auto text-balance">
            Подбираем меню под ваш повод и бюджет.
          </p>
        </motion.div>

        {/* 4-card grid — full-bleed real photos with dark gradient + text overlay */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 max-w-6xl mx-auto">
          {EVENTS.map((e, i) => (
            <motion.div
              key={e.href}
              variants={{ visible: { y: 0, opacity: 1, transition: { delay: i * 0.06, duration: 0.4 } } }}
            >
              <Link
                href={e.href}
                className="group relative block overflow-hidden rounded-xl aspect-[4/3] focus-visible:ring-2 focus-visible:ring-ring no-underline"
              >
                {/* Full-bleed photo */}
                <picture>
                  <source srcSet={`/images/real/${e.photo}-480.avif 480w, /images/real/${e.photo}-768.avif 768w, /images/real/${e.photo}.avif 1920w`} sizes="(max-width: 768px) 50vw, 25vw" type="image/avif" />
                  <source srcSet={`/images/real/${e.photo}-480.webp 480w, /images/real/${e.photo}-768.webp 768w, /images/real/${e.photo}.webp 1920w`} sizes="(max-width: 768px) 50vw, 25vw" type="image/webp" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/images/real/${e.photo}.jpg`}
                    alt={e.label}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </picture>

                {/* Dark gradient at bottom for text readability */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.40) 45%, rgba(0,0,0,0.05) 75%)',
                  }}
                  aria-hidden="true"
                />

                {/* Text overlay (event name + price) */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 text-white">
                  <h3 className="font-heading text-lg md:text-xl mb-1" style={{ fontWeight: 500 }}>
                    {e.label}
                  </h3>
                  <p className="text-[11px] md:text-xs text-white/75 leading-snug mb-2 line-clamp-2">
                    {e.desc}
                  </p>
                  <p className="text-sm font-semibold" style={{ color: '#C5A059' }}>
                    {e.price}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* «Ещё» — остальные события */}
        <div className="mt-10 text-center">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:underline"
          >
            Ещё 7 поводов — выпускные, детские, никах, шеф на дом →
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
