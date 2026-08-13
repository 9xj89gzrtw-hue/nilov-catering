"use client";

import { motion } from "framer-motion";
import Link from "next/link";

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
    src: "/placeholders/hero-banket.svg",
    eventType: "Свадьба",
    venue: "Загородный клуб",
    guests: 120,
    caption: "Свадьба · Загородный клуб · 120 гостей",
    href: "/gallery",
  },
  {
    src: "/placeholders/hero-furshet.svg",
    eventType: "Корпоратив",
    venue: "Лофт на Большой Морской",
    guests: 200,
    caption: "Корпоративный завтрак · Лофт · 200 гостей",
    href: "/gallery",
  },
  {
    src: "/placeholders/hero-coffee-break.svg",
    eventType: "Девичник",
    venue: "Лофт",
    guests: 18,
    caption: "Девичник · Лофт · 18 гостей",
    href: "/gallery",
  },
  {
    src: "/placeholders/hero-detskoe.svg",
    eventType: "День рождения",
    venue: "Загородный дом",
    guests: 25,
    caption: "День рождения · Загородный дом · 25 гостей",
    href: "/gallery",
  },
];

interface Props {
  shots?: InspireShot[];
  ctaHref?: string;
}

export default function InspireStrip({ shots = DEMO_SHOTS, ctaHref = "/gallery" }: Props) {
  return (
    <section
      aria-label="Вдохновение — живые кадры наших событий"
      className="bg-background py-12 md:py-16"
    >
      <div className="container-site">
        <div className="mb-6 flex items-end justify-between md:mb-8">
          <div>
            <p className="text-gold-text mb-2 font-mono text-xs tracking-[0.2em] uppercase">
              Вдохновись
            </p>
            <h2 className="font-heading text-foreground text-xl font-medium md:text-2xl">
              Так выглядят <span className="text-gold-text">реальные</span> события
            </h2>
          </div>
          <Link
            href={ctaHref}
            className="text-gold-text hidden items-center gap-1.5 text-sm hover:underline md:inline-flex"
          >
            Вся галерея →
          </Link>
        </div>

        {/* Desktop: 4 в ряд, tablet: 2, mobile: горизонтальный свайп */}
        <div className="-mx-4 flex snap-x snap-mandatory scrollbar-none gap-3 overflow-x-auto px-4 md:mx-0 md:grid md:grid-cols-2 md:px-0 lg:grid-cols-4">
          {shots.map((shot, i) => (
            <motion.a
              key={i}
              href={shot.href}
              className="group border-line bg-card block w-[70vw] max-w-[280px] shrink-0 snap-start overflow-hidden rounded-xl border md:w-auto md:max-w-none"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={shot.src}
                  alt={shot.caption}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Event type badge */}
                <div className="absolute top-3 left-3">
                  <span className="bg-card/90 text-foreground rounded-full px-2 py-0.5 text-[10px] font-medium md:text-xs">
                    {shot.eventType}
                  </span>
                </div>
              </div>
              <div className="p-3 md:p-4">
                <p className="text-foreground text-xs leading-snug font-medium md:text-sm">
                  {shot.caption}
                </p>
                <p className="text-muted-foreground mt-1 text-[10px] md:text-xs">
                  пример демо-данных, не клиент
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-6 text-center md:hidden">
          <Link href={ctaHref} className="text-gold-text text-sm underline underline-offset-4">
            Вся галерея →
          </Link>
        </div>
      </div>
    </section>
  );
}
