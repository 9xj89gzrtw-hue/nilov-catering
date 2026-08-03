'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Format } from '@/lib/types';

type EventCard = {
  format: Format;
  href: string;
  price: string;
  label: string;
  desc: string;
  photo: string;
};

const EVENTS: EventCard[] = [
  { format: 'banket', href: '/events/svadba', price: 'от 3 950 ₽', label: 'Свадьба', desc: 'От камерной до банкета на 200 гостей', photo: 'wedding-banquet' },
  { format: 'banket', href: '/events/korporativ', price: 'от 2 450 ₽', label: 'Корпоратив', desc: 'Фуршет в офисе или банкет с посадкой', photo: 'corporate-buffet' },
  { format: 'furshet', href: '/events/chastnoe', price: 'от 2 450 ₽', label: 'Фуршет', desc: 'Дни рождения, юбилеи, частные события', photo: 'canape-platter' },
  { format: 'coffee-break', href: '/pricing?event=coffee-break', price: 'от 390 ₽', label: 'Кофе-брейк', desc: 'Конференции, семинары, тренинги', photo: 'coffee-drink' },
];

export default function EventTypeSelector() {
  return (
    <section className="py-16 md:py-24 bg-background" aria-labelledby="events-heading">
      <div className="container-site">
        <div className="mb-10 md:mb-12 md:text-center">
          <h2 id="events-heading" className="font-heading text-3xl md:text-5xl mb-3" style={{ fontWeight: 500 }}>
            Какое у вас событие?
          </h2>
          <p className="text-muted-foreground max-w-xl md:mx-auto">
            Подбираем меню под ваш повод и бюджет.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 max-w-6xl mx-auto">
          {EVENTS.map((e, i) => (
            <Link
              key={e.href}
              href={e.href}
              className="group relative block overflow-hidden rounded-xl aspect-[4/3] no-underline"
            >
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
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.40) 45%, rgba(0,0,0,0.05) 75%)' }}
                aria-hidden="true"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 text-white">
                <h3 className="font-heading text-lg md:text-xl mb-1" style={{ fontWeight: 500 }}>{e.label}</h3>
                <p className="text-[11px] md:text-xs text-white/75 leading-snug mb-2">{e.desc}</p>
                <p className="text-sm font-semibold" style={{ color: '#C5A059' }}>{e.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
