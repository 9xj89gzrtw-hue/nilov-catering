'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface InspireShot {
  src: string;
  eventType: string;
  venue: string;
  guests: number;
  caption: string;
  href: string;
}

const DEMO_SHOTS: InspireShot[] = [
  {
    src: '/placeholders/hero-banket.svg',
    eventType: 'Свадьба',
    venue: 'Загородный клуб',
    guests: 120,
    caption: 'Свадьба · Загородный клуб · 120 гостей',
    href: '/gallery',
  },
  {
    src: '/placeholders/hero-furshet.svg',
    eventType: 'Корпоратив',
    venue: 'Лофт на Большой Морской',
    guests: 200,
    caption: 'Корпоративный завтрак · Лофт · 200 гостей',
    href: '/gallery',
  },
  {
    src: '/placeholders/hero-coffee-break.svg',
    eventType: 'Девичник',
    venue: 'Лофт',
    guests: 18,
    caption: 'Девичник · Лофт · 18 гостей',
    href: '/gallery',
  },
  {
    src: '/placeholders/hero-detskoe.svg',
    eventType: 'День рождения',
    venue: 'Загородный дом',
    guests: 25,
    caption: 'День рождения · Загородный дом · 25 гостей',
    href: '/gallery',
  },
];

interface Props {
  shots?: InspireShot[];
  ctaHref?: string;
}

export default function InspireStrip({ shots = DEMO_SHOTS, ctaHref = '/gallery' }: Props) {
  return (
    <section
      aria-label="Вдохновение — живые кадры наших событий"
      className="py-12 md:py-16 bg-background"
    >
      <div className="container-site">
        <div className="flex items-end justify-between mb-6 md:mb-8">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-gold-text uppercase mb-2">Вдохновись</p>
            <h2 className="font-heading text-xl md:text-2xl font-medium text-foreground">
              Так выглядят <span className="text-gold-text">реальные</span> события
            </h2>
          </div>
          <Link
            href={ctaHref}
            className="hidden md:inline-flex items-center gap-1.5 text-sm text-gold-text hover:underline"
          >
            Вся галерея →
          </Link>
        </div>

        {/* Desktop: 4 в ряд, tablet: 2, mobile: горизонтальный свайп */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-3 overflow-x-auto snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 scrollbar-none">
          {shots.map((shot, i) => (
            <motion.a
              key={i}
              href={shot.href}
              className="snap-start shrink-0 w-[70vw] max-w-[280px] md:w-auto md:max-w-none group rounded-xl overflow-hidden border border-line bg-card block"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={shot.src}
                  alt={shot.caption}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Event type badge */}
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] md:text-xs bg-card/90 text-foreground px-2 py-0.5 rounded-full font-medium">
                    {shot.eventType}
                  </span>
                </div>
              </div>
              <div className="p-3 md:p-4">
                <p className="text-xs md:text-sm text-foreground font-medium leading-snug">
                  {shot.caption}
                </p>
                <p className="text-[10px] md:text-xs text-muted-foreground mt-1">
                  пример демо-данных, не клиент
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-6 text-center md:hidden">
          <Link href={ctaHref} className="text-sm text-gold-text underline underline-offset-4">
            Вся галерея →
          </Link>
        </div>
      </div>
    </section>
  );
}
