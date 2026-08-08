'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  Calendar,
  Cake,
  CheckCircle2,
  Coffee,
  Heart,
  MapPin,
  Quote,
  Sparkles,
  Star,
  Users,
  type LucideIcon,
} from 'lucide-react';
import FoodPhoto from '@/components/common/FoodPhoto';
import type { Review } from '@/lib/cms-store';

// === Фильтры по типу события ===
type FilterKey = 'all' | 'weddings' | 'corporate' | 'birthdays' | 'coffee';

interface FilterDef {
  key: FilterKey;
  label: string;
  icon: LucideIcon;
  match: (r: Review) => boolean;
}

const FILTERS: FilterDef[] = [
  { key: 'all',       label: 'Все',           icon: Sparkles,  match: () => true },
  { key: 'weddings',  label: 'Свадьбы',       icon: Heart,     match: (r) => /Свадьб|Никях|Ифтар/.test(r.eventType) },
  { key: 'corporate', label: 'Корпоративы',   icon: Building2, match: (r) => /Корпорат|Доставк/.test(r.eventType) },
  { key: 'birthdays', label: 'Дни рождения',  icon: Cake,      match: (r) => /День рожд|Детск|Юбилей|Выпускн/.test(r.eventType) },
  { key: 'coffee',    label: 'Кофе-брейки',   icon: Coffee,    match: (r) => /Конференц/.test(r.eventType) },
];

// === Подбор фото под тип события ===
// Фото с мероприятий уже лежат в /public/images/catering/ — используем их по типу события.
// Выбор детерминирован (по id ревью), чтобы при ре-рендерах фото «не прыгало».
const POOLS: Record<string, string[]> = {
  'Свадьба':          ['wedding-01.jpg', 'wedding-02.jpg', 'wedding-03.jpg', 'wedding-04.jpg', 'wedding-05.jpg'],
  'Никях':            ['bbq-01.jpg',     'bbq-02.jpg',     'bbq-03.jpg',     'bbq-04.jpg',     'bbq-05.jpg'],
  'Ифтар':            ['russian-01.jpg', 'russian-02.jpg', 'russian-03.jpg', 'russian-04.jpg', 'russian-05.jpg'],
  'Корпоратив':       ['corporate-01.jpg', 'corporate-02.jpg', 'corporate-03.jpg', 'corporate-04.jpg', 'corporate-05.jpg'],
  'Доставка':         ['canape-01.jpg',  'canape-02.jpg',  'canape-03.jpg',  'canape-04.jpg',  'canape-05.jpg'],
  'День рождения':    ['cake-01.jpg',    'cake-02.jpg',    'cake-03.jpg',    'cake-04.jpg',    'cake-05.jpg'],
  'Детский праздник': ['dessert-01.jpg', 'dessert-02.jpg', 'dessert-03.jpg', 'dessert-04.jpg', 'dessert-05.jpg'],
  'Юбилей':           ['finedining-01.jpg', 'finedining-02.jpg', 'finedining-03.jpg', 'finedining-04.jpg', 'finedining-05.jpg'],
  'Выпускной':        ['canape-03.jpg',  'canape-05.jpg',  'finedining-02.jpg', 'finedining-04.jpg', 'finedining-05.jpg'],
  'Конференция':      ['coffee-01.jpg',  'coffee-02.jpg',  'coffee-03.jpg',  'coffee-04.jpg',  'coffee-05.jpg'],
};
const FALLBACK_POOL = POOLS['Свадьба'];

function pickImage(r: Review): string {
  const pool = POOLS[r.eventType] ?? FALLBACK_POOL;
  const n = parseInt((r.id || '0').replace(/\D/g, ''), 10) || 0;
  return `/images/catering/${pool[n % pool.length]}`;
}

// === Инициалы автора для аватара ===
// "Екатерина и Дмитрий" → "ЕД", "Мария А." → "МА", "Игорь М." → "ИМ".
function getInitials(name: string): string {
  const cleaned = (name || '').replace(/[().,]/g, '').trim();
  if (!cleaned) return '?';
  const tokens = cleaned.split(/\s+/).filter((t) => t && t.toLowerCase() !== 'и');
  if (tokens.length === 0) return cleaned[0].toUpperCase();
  if (tokens.length === 1) return tokens[0][0].toUpperCase();
  return (tokens[0][0] + tokens[1][0]).toUpperCase();
}

// === Цвет аватара (детерминирован по имени) ===
const AVATAR_COLORS = [
  'bg-amber-100 text-amber-900',
  'bg-rose-100 text-rose-900',
  'bg-emerald-100 text-emerald-900',
  'bg-sky-100 text-sky-900',
  'bg-violet-100 text-violet-900',
  'bg-orange-100 text-orange-900',
  'bg-teal-100 text-teal-900',
  'bg-pink-100 text-pink-900',
];

function pickColor(s: string): string {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}

interface ReviewsMasonryProps {
  reviews: Review[];
}

export default function ReviewsMasonry({ reviews }: ReviewsMasonryProps) {
  const [filter, setFilter] = useState<FilterKey>('all');

  const counts = useMemo(() => {
    const map: Record<FilterKey, number> = {
      all: reviews.length,
      weddings: 0,
      corporate: 0,
      birthdays: 0,
      coffee: 0,
    };
    for (const r of reviews) {
      for (const f of FILTERS) {
        if (f.key !== 'all' && f.match(r)) map[f.key]++;
      }
    }
    return map;
  }, [reviews]);

  const filtered = useMemo(() => {
    const f = FILTERS.find((x) => x.key === filter);
    if (!f) return reviews;
    return reviews.filter(f.match);
  }, [filter, reviews]);

  return (
    <div>
      {/* === Filter bar === */}
      <div
        className="flex flex-wrap justify-center gap-2 mb-10"
        role="tablist"
        aria-label="Фильтр по типу события"
      >
        {FILTERS.map((f) => {
          const Icon = f.icon;
          const active = filter === f.key;
          const count = counts[f.key];
          return (
            <button
              key={f.key}
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(f.key)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors no-underline ${
                active
                  ? 'border-gold-text bg-gold-text text-background shadow-sm'
                  : 'border-line bg-card text-foreground hover:border-gold-text hover:text-gold-text'
              }`}
            >
              <Icon className="w-4 h-4" aria-hidden="true" />
              <span>{f.label}</span>
              <span className={`tabular-nums text-xs ${active ? 'opacity-80' : 'text-muted-foreground'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* === Masonry grid === */}
      {filtered.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">
          Нет отзывов в этой категории.
        </p>
      ) : (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
          {filtered.map((r, idx) => {
            const photo = pickImage(r);
            const rating = r.rating ?? 0;
            return (
              <motion.article
                key={r.id}
                id={r.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.45,
                  delay: Math.min(idx * 0.04, 0.4),
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mb-6 break-inside-avoid scroll-mt-24 rounded-2xl border border-line bg-card overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                {/* === Photo === */}
                <div className="relative">
                  <FoodPhoto
                    src={photo}
                    alt={`${r.eventType} — NiloV Catering`}
                    aspectRatio="wide"
                    objectPosition="center 45%"
                  />
                  {/* Gradient для читаемости чипов */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)' }}
                    aria-hidden="true"
                  />
                  {/* Тип события — чип */}
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-background/95 px-3 py-1 text-xs font-medium text-foreground shadow-sm">
                    {r.eventType}
                  </span>
                  {/* Звёзды рейтинга */}
                  {rating > 0 && (
                    <div
                      className="absolute bottom-3 right-3 inline-flex items-center gap-0.5 rounded-full bg-black/65 backdrop-blur px-2.5 py-1"
                      aria-label={`Оценка ${rating} из 5`}
                    >
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rating ? 'text-gold-text fill-gold-text' : 'text-white/30'
                          }`}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* === Body === */}
                <div className="p-5">
                  {/* Header: аватар + имя + статус */}
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center font-heading font-semibold text-sm ${pickColor(r.clientName)}`}
                      aria-hidden="true"
                    >
                      {getInitials(r.clientName)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-foreground truncate">{r.clientName}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-success" aria-hidden="true" />
                        <span>отзыв проверен</span>
                      </p>
                    </div>
                    <Quote className="w-5 h-5 text-gold-tint flex-shrink-0" aria-hidden="true" />
                  </div>

                  {/* Meta: дата · место · кол-во гостей */}
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground mb-3">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3 h-3" aria-hidden="true" />
                      <span>{r.date}</span>
                    </span>
                    {r.venue && (
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3 h-3" aria-hidden="true" />
                        <span>{r.venue}</span>
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1">
                      <Users className="w-3 h-3" aria-hidden="true" />
                      <span>{r.guests} гостей</span>
                    </span>
                  </div>

                  {/* Текст отзыва */}
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    «{r.quote}»
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      )}
    </div>
  );
}
