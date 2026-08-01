'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Format } from '@/lib/types';
import { FORMAT_DESCRIPTIONS, FORMAT_HERO_IMAGES } from '@/lib/data';
import { KenBurnsCard } from '@/components/effects/PhotoAliveCard';

// Упрощено с 7 до 4 основных форматов + ссылка «Ещё» на /events.
// UX-исследование: 7 карточек давали cognitive overload на главной.
// 4 типа покрывают ~85% обращений; остальные — через /events.
const EVENTS: { format: Format; href: string; price: string; label: string; desc?: string }[] = [
  { format: 'banket', href: '/events/svadba', price: 'от 3 950 ₽', label: 'Свадьба', desc: 'От камерной до банкета на 200 гостей' },
  { format: 'banket', href: '/events/korporativ', price: 'от 2 450 ₽', label: 'Корпоратив', desc: 'Фуршет в офисе или банкет с посадкой' },
  { format: 'furshet', href: '/events/chastnoe', price: 'от 2 450 ₽', label: 'Фуршет', desc: 'Дни рождения, юбилеи, частные события' },
  { format: 'coffee-break', href: '/pricing?event=coffee-break', price: 'от 390 ₽', label: 'Кофе-брейк', desc: 'Конференции, семинары, тренинги' },
];

export default function EventTypeSelector() {
  return (
    <motion.section className="py-16 md:py-20 bg-background" aria-labelledby="events-heading"
      initial="visible" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
      variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
    >
      <div className="container-site">
        <motion.div className="mb-8 md:text-center" variants={{ visible: { y: 0, opacity: 1 } }}>
          <h2 id="events-heading" className="mb-3">Какое у вас событие?</h2>
          <p className="text-muted-foreground max-w-xl md:mx-auto text-balance">Подбираем меню под ваш повод и бюджет.</p>
        </motion.div>

        {/* 4-card grid on all viewports; "Ещё" link below for long-tail events */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-5xl mx-auto">
          {EVENTS.map((e, i) => (
            <motion.div key={e.href} variants={{ visible: { y: 0, opacity: 1, transition: { delay: i * 0.06, duration: 0.4 } } }}>
              <Link href={e.href}
                className="group relative flex flex-col rounded-xl border border-line bg-card overflow-hidden transition-all duration-200
                  hover:border-gold-text active:scale-[0.98] h-full
                  focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="aspect-[3/2] bg-secondary overflow-hidden">
                  {/* KenBurnsCard with diamond frame for event types */}
                  <KenBurnsCard
                    src={FORMAT_HERO_IMAGES[e.format]}
                    alt={e.label}
                    aspectRatio="video"
                    frameShape="rounded-xl"
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-heading text-base font-medium text-foreground mb-1">{e.label}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{e.desc || FORMAT_DESCRIPTIONS[e.format]}</p>
                  <p className="mt-auto text-sm font-semibold text-gold-text">{e.price}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* «Ещё» — остальные события (выпускные, детские, юбилеи, никах, шеф на дом, поминки) */}
        <div className="mt-8 text-center">
          <Link href="/events" className="inline-flex items-center gap-2 text-sm font-medium text-gold-text hover:underline">
            Ещё 7 поводов — выпускные, детские, никах, шеф на дом →
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
