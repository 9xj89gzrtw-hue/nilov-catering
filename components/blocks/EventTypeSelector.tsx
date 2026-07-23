'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Format } from '@/lib/types';
import { FORMAT_DESCRIPTIONS, FORMAT_HERO_IMAGES } from '@/lib/data';
import { KenBurnsCard } from '@/components/effects/PhotoAliveCard';

const EVENTS: { format: Format; href: string; price: string; label: string; desc?: string }[] = [
  // Для корпоративов минимальная цена = фуршет-эконом (2450), не банкет-эконом (3950)
  { format: 'banket', href: '/events/korporativ', price: 'от 2 450 ₽ (фуршет)', label: 'Корпоративы', desc: 'Фуршет в офисе или банкет с посадкой' },
  { format: 'banket', href: '/events/svadba', price: 'от 3 950 ₽', label: 'Свадьбы', desc: 'От камерной до банкета на 200 гостей' },
  { format: 'furshet', href: '/events/vypusknoy', price: 'от 2 450 ₽', label: 'Выпускные', desc: 'Школьные и студенческие мероприятия' },
  { format: 'furshet', href: '/events/chastnoe', price: 'от 2 450 ₽', label: 'Частное', desc: 'Дни рождения, юбилеи, семейные ужины' },
  { format: 'detskoe', href: '/events/detskoe', price: 'от 1 550 ₽', label: 'Детское', desc: 'Меню для детей, аниматоры, шоу' },
  { format: 'coffee-break', href: '/pricing?event=coffee-break', price: 'от 390 ₽', label: '☕ Кофе-брейк', desc: 'Конференции, семинары — или доставкой без официантов' },
  { format: 'chef-at-home', href: '/events/chef-at-home', price: 'от 2 500 ₽/ч', label: 'Шеф дома', desc: 'Шеф-повар готовит у вас дома' },
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

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="flex md:grid md:grid-cols-3 gap-3 overflow-x-auto snap-x snap-mandatory md:snap-none -mx-4 px-4 md:mx-0 md:px-0 scrollbar-none pb-2">
          {EVENTS.map((e, i) => (
            <motion.div key={e.href} className="snap-start shrink-0 w-[70vw] max-w-[260px] md:w-auto md:max-w-none" variants={{ visible: { y: 0, opacity: 1, transition: { delay: i * 0.06, duration: 0.4 } } }}>
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
                    frameShape="diamond"
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
      </div>
    </motion.section>
  );
}
