'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Heart, Users, Camera, Sparkles, Building2, Cake, Baby, Wine } from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════
// PortfolioGallery — Галерея портфолио с фильтрами по типам мероприятий
//
// Решает критику: "Нет галереи с фильтрами по типам мероприятий"
// Конкуренты (Diamond Catering, Art Nouvo) имеют красивые секции портфолио
//
// Особенности:
// - Фильтры по 6 типам мероприятий
// - Masonry-подобная сетка с плавными анимациями
// - Hover-эффекты с информацией о мероприятии
// - Полностью адаптивный дизайн
// ═══════════════════════════════════════════════════════════════════════════

// ─── Типы данных ───────────────────────────────────────────────────────────

type EventType = 'all' | 'wedding' | 'corporate' | 'birthday' | 'kids' | 'private';

interface PortfolioItem {
  id: string;
  src: string;
  alt: string;
  eventType: EventType;
  eventLabel: string;
  guestCount: string;
  aspectRatio: 'square' | 'tall' | 'wide';
}

interface FilterOption {
  value: EventType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  count: number;
}

// ─── Данные портфолио ──────────────────────────────────────────────────────

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  // ── Свадьбы ──
  {
    id: 'wedding-1',
    src: '/images/real/wedding-banquet.webp',
    alt: 'Свадебный банкет в элегантном зале',
    eventType: 'wedding',
    eventLabel: 'Свадьба',
    guestCount: '120 гостей',
    aspectRatio: 'wide',
  },
  {
    id: 'wedding-2',
    src: '/images/real/dessert-table.webp',
    alt: 'Десертный стол на свадьбе',
    eventType: 'wedding',
    eventLabel: 'Свадьба',
    guestCount: '85 гостей',
    aspectRatio: 'square',
  },
  {
    id: 'wedding-3',
    src: '/images/dishes-new/wedding-cake.webp',
    alt: 'Торт на свадебном банкете',
    eventType: 'wedding',
    eventLabel: 'Свадьба',
    guestCount: '150 гостей',
    aspectRatio: 'tall',
  },
  {
    id: 'wedding-4',
    src: '/images/real/wedding-banquet-768.webp',
    alt: 'Украшение свадебного стола',
    eventType: 'wedding',
    eventLabel: 'Свадьба',
    guestCount: '95 гостей',
    aspectRatio: 'square',
  },

  // ── Корпоративы ──
  {
    id: 'corporate-1',
    src: '/images/real/corporate-buffet.webp',
    alt: 'Корпоративный фуршет для деловых партнёров',
    eventType: 'corporate',
    eventLabel: 'Корпоратив',
    guestCount: '300 гостей',
    aspectRatio: 'square',
  },
  {
    id: 'corporate-2',
    src: '/images/real/coffee-drink.webp',
    alt: 'Кофе-брейк на корпоративе',
    eventType: 'corporate',
    eventLabel: 'Корпоратив',
    guestCount: '80 гостей',
    aspectRatio: 'tall',
  },
  {
    id: 'corporate-3',
    src: '/images/dishes-new/coffee-bar.webp',
    alt: 'Кофейная станция на бизнес-мероприятии',
    eventType: 'corporate',
    eventLabel: 'Корпоратив',
    guestCount: '150 гостей',
    aspectRatio: 'wide',
  },
  {
    id: 'corporate-4',
    src: '/images/dishes-new/cocktail-bar.webp',
    alt: 'Коктейльная зона на корпоративе',
    eventType: 'corporate',
    eventLabel: 'Корпоратив',
    guestCount: '200 гостей',
    aspectRatio: 'square',
  },

  // ── Дни рождения ──
  {
    id: 'birthday-1',
    src: '/images/real/cake-berry.webp',
    alt: 'Ягодный торт на дне рождения',
    eventType: 'birthday',
    eventLabel: 'День рождения',
    guestCount: '25 гостей',
    aspectRatio: 'square',
  },
  {
    id: 'birthday-2',
    src: '/images/real/macarons.webp',
    alt: 'Макарунсы на праздничном столе',
    eventType: 'birthday',
    eventLabel: 'День рождения',
    guestCount: '30 гостей',
    aspectRatio: 'tall',
  },
  {
    id: 'birthday-3',
    src: '/images/real/chocolate-mousse.webp',
    alt: 'Шоколадный мусс на юбилее',
    eventType: 'birthday',
    eventLabel: 'День рождения',
    guestCount: '40 гостей',
    aspectRatio: 'square',
  },
  {
    id: 'birthday-4',
    src: '/images/dishes-new/cupcakes.webp',
    alt: 'Капкейки на детском празднике',
    eventType: 'birthday',
    eventLabel: 'День рождения',
    guestCount: '20 гостей',
    aspectRatio: 'wide',
  },
  {
    id: 'birthday-5',
    src: '/images/dishes-new/gluten-free-cupcakes.webp',
    alt: 'Безглютеновые капкейки',
    eventType: 'birthday',
    eventLabel: 'День рождения',
    guestCount: '15 гостей',
    aspectRatio: 'square',
  },

  // ── Детские праздники ──
  {
    id: 'kids-1',
    src: '/images/real/burger.webp',
    alt: 'Детские бургеры на празднике',
    eventType: 'kids',
    eventLabel: 'Детский праздник',
    guestCount: '20 детей',
    aspectRatio: 'square',
  },
  {
    id: 'kids-2',
    src: '/images/dishes-new/kids-burger.webp',
    alt: 'Мини-бургеры для детей',
    eventType: 'kids',
    eventLabel: 'Детский праздник',
    guestCount: '30 детей',
    aspectRatio: 'tall',
  },
  {
    id: 'kids-3',
    src: '/images/dishes-new/nuggets.webp',
    alt: 'Наггетсы на детском дне рождения',
    eventType: 'kids',
    eventLabel: 'Детский праздник',
    guestCount: '25 детей',
    aspectRatio: 'square',
  },
  {
    id: 'kids-4',
    src: '/images/dishes-new/milkshake.webp',
    alt: 'Молочный коктейль для детей',
    eventType: 'kids',
    eventLabel: 'Детский праздник',
    guestCount: '18 детей',
    aspectRatio: 'wide',
  },
  {
    id: 'kids-5',
    src: '/images/dishes-new/menu-kids-party.webp',
    alt: 'Детское меню на празднике',
    eventType: 'kids',
    eventLabel: 'Детский праздник',
    guestCount: '35 детей',
    aspectRatio: 'square',
  },

  // ── Частные ужины ──
  {
    id: 'private-1',
    src: '/images/real/salmon-dish.webp',
    alt: 'Лосось на камерном ужине',
    eventType: 'private',
    eventLabel: 'Частный ужин',
    guestCount: '12 гостей',
    aspectRatio: 'square',
  },
  {
    id: 'private-2',
    src: '/images/real/beef-medallions.webp',
    alt: 'Медальоны из говядины',
    eventType: 'private',
    eventLabel: 'Частный ужин',
    guestCount: '8 гостей',
    aspectRatio: 'tall',
  },
  {
    id: 'private-3',
    src: '/images/real/charcuterie.webp',
    alt: 'Карбонад на частном ужине',
    eventType: 'private',
    eventLabel: 'Частный ужин',
    guestCount: '10 гостей',
    aspectRatio: 'wide',
  },
  {
    id: 'private-4',
    src: '/images/dishes-new/beef-wellington.webp',
    alt: 'Беф Веллингтон для особого случая',
    eventType: 'private',
    eventLabel: 'Частный ужин',
    guestCount: '6 гостей',
    aspectRatio: 'square',
  },
  {
    id: 'private-5',
    src: '/images/dishes-new/lobster-hermidor.webp'.replace('hermidor', 'thermidor'),
    alt: 'Омар термидор',
    eventType: 'private',
    eventLabel: 'Частный ужин',
    guestCount: '8 гостей',
    aspectRatio: 'tall',
  },
];

// Исправляем опечатку в имени файла
PORTFOLIO_ITEMS[19].src = '/images/dishes-new/lobster-thermidor.webp';

// ─── Опции фильтров ────────────────────────────────────────────────────────

const FILTER_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'Все', icon: Sparkles, count: PORTFOLIO_ITEMS.length },
  { value: 'wedding', label: 'Свадьбы', icon: Heart, count: PORTFOLIO_ITEMS.filter(i => i.eventType === 'wedding').length },
  { value: 'corporate', label: 'Корпоративы', icon: Building2, count: PORTFOLIO_ITEMS.filter(i => i.eventType === 'corporate').length },
  { value: 'birthday', label: 'Дни рождения', icon: Cake, count: PORTFOLIO_ITEMS.filter(i => i.eventType === 'birthday').length },
  { value: 'kids', label: 'Детские', icon: Baby, count: PORTFOLIO_ITEMS.filter(i => i.eventType === 'kids').length },
  { value: 'private', label: 'Частные ужины', icon: Wine, count: PORTFOLIO_ITEMS.filter(i => i.eventType === 'private').length },
];

// ─── Animation Variants ────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 16,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: 'easeOut' as const,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -8,
    transition: {
      duration: 0.25,
      ease: 'easeIn' as const,
    },
  },
};

// ─── Component ─────────────────────────────────────────────────────────────

export default function PortfolioGallery() {
  const [activeFilter, setActiveFilter] = useState<EventType>('all');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Фильтрация элементов
  const filteredItems = useMemo(() => {
    if (activeFilter === 'all') return PORTFOLIO_ITEMS;
    return PORTFOLIO_ITEMS.filter((item) => item.eventType === activeFilter);
  }, [activeFilter]);

  return (
    <section
      className="py-20 md:py-28 bg-secondary/30 relative overflow-hidden"
      aria-labelledby="portfolio-heading"
    >
      {/* Декоративная линия сверху */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, var(--color-gold-text) 50%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      <div className="container-site">
        {/* ─── Заголовок секции ─────────────────────────────────────── */}
        <motion.div
          className="text-center mb-10 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: 'easeOut' as const }}
        >
          {/* Eyebrow */}
          <p className="text-xs uppercase tracking-[0.22em] text-gold-text mb-3 font-medium">
            Портфолио
          </p>

          {/* Heading */}
          <h2
            id="portfolio-heading"
            className="font-heading text-3xl md:text-4xl lg:text-5xl mb-4"
            style={{ fontWeight: 500 }}
          >
            Наши{' '}
            <span className="text-gold-text">мероприятия</span>
          </h2>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Более <span className="text-gold-text font-semibold">3000 успешных событий</span> за 19 лет работы.
            Каждое мероприятие — это история, созданная вместе с вами.
          </p>
        </motion.div>

        {/* ─── Фильтры ──────────────────────────────────────────────── */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-14"
          role="tablist"
          aria-label="Фильтр по типу мероприятия"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.15 }}
        >
          {FILTER_OPTIONS.map((option) => (
            <button
              key={option.value}
              role="tab"
              aria-selected={activeFilter === option.value}
              onClick={() => setActiveFilter(option.value)}
              className={`
                group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium
                transition-all duration-300 ease-out
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                ${
                  activeFilter === option.value
                    ? 'bg-gold-text text-white shadow-lg shadow-gold/25'
                    : 'bg-card border border-line text-muted-foreground hover:border-gold-text/50 hover:text-foreground hover:bg-gold-tint/30'
                }
              `}
            >
              <option.icon className="w-4 h-4" aria-hidden="true" />
              <span>{option.label}</span>
              <span
                className={`
                  inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full text-xs font-semibold
                  transition-colors duration-200
                  ${
                    activeFilter === option.value
                      ? 'bg-white/20 text-white'
                      : 'bg-secondary text-muted-foreground group-hover:bg-gold-text/10 group-hover:text-gold-text'
                  }
                `}
              >
                {option.count}
              </span>

              {/* Active indicator animation */}
              {activeFilter === option.value && (
                <motion.span
                  layoutId="activeFilterIndicator"
                  className="absolute inset-0 rounded-full bg-gold-text"
                  transition={{
                    type: 'spring',
                    stiffness: 380,
                    damping: 30,
                  }}
                  aria-hidden="true"
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* ─── Галерея (Masonry Grid) ───────────────────────────────── */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={activeFilter}
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.article
                key={item.id}
                variants={itemVariants}
                layout
                className={`
                  group relative overflow-hidden rounded-xl md:rounded-2xl cursor-pointer
                  bg-card border border-line
                  transition-shadow duration-300
                  hover:shadow-xl hover:shadow-gold/10 hover:border-gold-text/30
                  ${item.aspectRatio === 'tall' ? 'row-span-2' : ''}
                  ${item.aspectRatio === 'wide' ? 'col-span-2' : ''}
                `}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                role="button"
                tabIndex={0}
                aria-label={`${item.eventLabel} · ${item.guestCount}`}
              >
                {/* Изображение */}
                <div
                  className={`
                    relative w-full overflow-hidden
                    ${item.aspectRatio === 'tall' ? 'aspect-[3/4]' : ''}
                    ${item.aspectRatio === 'wide' ? 'aspect-video' : ''}
                    ${item.aspectRatio === 'square' ? 'aspect-square' : ''}
                  `}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />

                  {/* Градиентный оверлей при наведении */}
                  <div
                    className={`
                      absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent
                      transition-opacity duration-300 ease-out
                      ${hoveredId === item.id ? 'opacity-100' : 'opacity-0'}
                    `}
                  />

                  {/* Контент оверлея */}
                  <div
                    className={`
                      absolute inset-0 flex flex-col justify-end p-4 md:p-5
                      transition-opacity duration-300 ease-out
                      ${hoveredId === item.id ? 'opacity-100' : 'opacity-0'}
                    `}
                  >
                    {/* Тип мероприятия */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gold-text/90 text-white backdrop-blur-sm">
                        {item.eventLabel}
                      </span>
                    </div>

                    {/* Название и гости */}
                    <h3 className="font-heading text-base md:text-lg text-white mb-2" style={{ fontWeight: 500 }}>
                      {item.alt}
                    </h3>

                    <div className="flex items-center justify-between">
                      {/* Количество гостей */}
                      <div className="flex items-center gap-1.5 text-white/80 text-sm">
                        <Users className="w-4 h-4" aria-hidden="true" />
                        <span>{item.guestCount}</span>
                      </div>

                      {/* Иконка камеры / лайка */}
                      <div className="flex items-center gap-2">
                        <Camera className="w-4 h-4 text-white/60" aria-hidden="true" />
                        <Heart className="w-4 h-4 text-white/60 hover:text-red-400 transition-colors" aria-hidden="true" />
                      </div>
                    </div>
                  </div>

                  {/* Быстрая метка (всегда видна) */}
                  <div
                    className={`
                      absolute top-3 left-3 z-10
                      transition-transform duration-300 ease-out
                      ${hoveredId === item.id ? 'translate-y-[-4px] opacity-0' : 'translate-y-0 opacity-100'}
                    `}
                  >
                    <span className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm text-foreground shadow-sm">
                      {item.eventLabel}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ─── CTA: Смотреть все работы ─────────────────────────────── */}
        <motion.div
          className="mt-12 md:mt-16 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href="/gallery"
            className="group inline-flex items-center gap-2.5 px-8 py-4 
                       bg-gold-text text-white rounded-full font-semibold text-sm
                       transition-all duration-300 ease-out
                       hover:bg-primary hover:shadow-gold-glow hover:-translate-y-0.5
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Смотреть все работы
            <ArrowRight
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>

          <p className="mt-4 text-xs text-muted-foreground/70">
            Более 500 фотографий из реальных мероприятий
          </p>
        </motion.div>
      </div>
    </section>
  );
}
