'use client';

import { useState, useMemo, useEffect } from 'react';
// useEffect still used by StationSection below for per-station pagination reset.
import Link from 'next/link';
import { ALL_DISHES, DISH_CATEGORIES, DIET_FILTERS, FORMAT_DISHES } from '@/lib/menu-data';
import { getDishImageByIndex, getObjectPositionForDish } from '@/lib/dish-images';
import FoodPhoto from '@/components/common/FoodPhoto';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import PageHeader from '@/components/common/PageHeader';

import { AllergenChips } from '@/components/common/AllergenChips';
import DishCartIndicator from '@/components/interactive/DishCartIndicator';
import type { Dish, Allergen } from '@/lib/types';
import { ALLERGEN_LABEL } from '@/lib/types';

const STATIONS = [
  { key: 'all', label: 'Все' },
  { key: 'cold', label: 'Холодные' },
  { key: 'hot', label: 'Горячее' },
  { key: 'desserts', label: 'Десерты' },
  { key: 'drinks', label: 'Напитки' },
  { key: 'show', label: 'Шоу-станции' },
] as const;

// C3 fix (UX Architect, 6.25): catalog hierarchy.
// Section headers use full labels (e.g. «Холодные закуски» instead of «Холодные»)
// so the catalog reads as a structured menu — not an endless Pinterest feed.
const STATION_LABELS: Record<string, string> = {
  cold: 'Холодные закуски',
  hot: 'Горячие блюда',
  desserts: 'Десерты',
  drinks: 'Напитки',
  show: 'Шоу-станции',
};

// Display order — appetizers first, then mains, sweets, drinks, show last.
const STATION_ORDER = ['cold', 'hot', 'desserts', 'drinks', 'show'] as const;

const DIETS = ['vegan', 'gluten-free', 'halal', 'sugar-free', 'nut-free'] as const;

// Allergen emoji map — unified with ConstructorWizard / MenuBuilder AllergenFilterBar
// Same source of truth: ALLERGEN_LABEL (full words) + ALLERGEN_EMOJI (consistent visual)
const ALLERGEN_EMOJI: Record<Allergen, string> = {
  gluten: '',
  crustaceans: '',
  eggs: '',
  fish: '',
  peanuts: '',
  soy: '',
  milk: '',
  nuts: '',
  celery: '',
  mustard: '',
  sesame: '',
  sulphites: '',
  lupin: '',
  molluscs: '',
};

// High-risk allergens (анфилаксия priority) — same set as ConstructorWizard DraggableDishCard
const HIGH_RISK_ALLERGENS: Allergen[] = [
  'nuts', 'peanuts', 'gluten', 'fish', 'crustaceans', 'molluscs',
];

// Allergen exclusion filters — unified with constructor: emoji + ALLERGEN_LABEL (full words)
// Previously used prefix-style "Без молока"; now matches constructor style " Молоко" for consistency.
const EXCLUDE_ALLERGENS: Allergen[] = [
  'milk', 'eggs', 'nuts', 'fish', 'soy', 'peanuts', 'sesame',
];

// Chef recommends — top picks to reduce cognitive load (C8 fix).
// Instead of facing all 124 dishes, users see 8 popular, format-agnostic picks first.
// Curated mix: canapé + hot + dessert + drink, balanced across price tiers.
const CHEF_RECOMMENDS_IDS = [
  'canape-salmon', // классическая закуска
  'mini-burger', // хит фуршетов
  'beef-medallions', // премиум-горячее
  'macaron-shooter', // десерт-шутер
  'borscht', // русская классика
  'yakitori', // азиатская нота
  'tartlet-chicken', // тарталетка
  'cranberry-mors', // напиток
] as const;

export default function CatalogPage() {
  const [search, setSearch] = useState('');
  const [station, setStation] = useState<string>('all');
  const [activeDiets, setActiveDiets] = useState<Set<string>>(new Set());
  const [excludedAllergens, setExcludedAllergens] = useState<Set<Allergen>>(new Set());

  const toggleDiet = (d: string) => {
    const next = new Set(activeDiets);
    if (next.has(d)) next.delete(d); else next.add(d);
    setActiveDiets(next);
  };

  const toggleAllergen = (a: Allergen) => {
    const next = new Set(excludedAllergens);
    if (next.has(a)) next.delete(a); else next.add(a);
    setExcludedAllergens(next);
  };

  const filtered = useMemo(() => {
    let dishes = ALL_DISHES;
    if (station !== 'all') dishes = dishes.filter(d => d.station === station);
    if (activeDiets.size > 0) {
      dishes = dishes.filter(d => [...activeDiets].every(diet => d.dietBadges.includes(diet as typeof DIETS[number])));
    }
    if (excludedAllergens.size > 0) {
      dishes = dishes.filter(d => !d.allergens.some(a => excludedAllergens.has(a)));
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      dishes = dishes.filter(d => d.name.toLowerCase().includes(q) || d.description.toLowerCase().includes(q));
    }
    return dishes;
  }, [station, activeDiets, excludedAllergens, search]);

  // C3 fix: group filtered dishes by station for clear visual hierarchy.
  // Replaces previous halal/pork/other flat split that created an endless feed.
  // Halal is still visible via diet filter + per-card Halal badge.
  // Pork dishes keep a small inline «Свинин» badge on the card.
  const groupedByStation = useMemo(() => {
    const groups: Record<string, Dish[]> = {};
    for (const s of STATION_ORDER) {
      groups[s] = filtered.filter(d => d.station === s);
    }
    return groups;
  }, [filtered]);

  const stationCounts = useMemo(() => {
    const counts: Record<string, number> = { all: ALL_DISHES.length };
    for (const s of STATIONS) {
      if (s.key === 'all') continue;
      counts[s.key] = ALL_DISHES.filter(d => d.station === s.key).length;
    }
    return counts;
  }, []);

  const hasActiveFilters = search.trim() !== '' || station !== 'all' || activeDiets.size > 0 || excludedAllergens.size > 0;
  const resetFilters = () => {
    setSearch('');
    setStation('all');
    setActiveDiets(new Set());
    setExcludedAllergens(new Set());
  };

  // Chef recommends — top 8 dishes shown ONLY when no filters are active,
  // so users always start with a curated entry point. Once they filter/search,
  // the section hides to avoid confusion with filtered results.
  const chefRecommends = useMemo(() => {
    if (hasActiveFilters) return [];
    return CHEF_RECOMMENDS_IDS
      .map(id => ALL_DISHES.find(d => d.id === id))
      .filter((d): d is Dish => Boolean(d))
      .slice(0, 8);
  }, [hasActiveFilters]);

  // Allergen visibility toggle — show/hide allergen badges on cards
  const [showAllergens, setShowAllergens] = useState(true);

  return (
    <main className="pt-24 pb-20" id="main">
      <div className="container-site">
        <Breadcrumbs />
        <PageHeader
          title="Каталог блюд"
          eyebrow={`${ALL_DISHES.length} позиций`}
          subtitle="Все блюда с фото и составом. КБЖУ предоставляется по запросу для блюд с медицинскими диетами (СД1, целиакия, анафилаксия)."
          actions={
            <button
              onClick={() => setShowAllergens(!showAllergens)}
              className="inline-flex items-center gap-2 rounded-lg border border-line bg-card px-4 py-2 text-sm font-semibold hover:border-gold-text transition-colors touch-target"
              aria-pressed={!showAllergens}
              type="button"
            >
              {showAllergens ? ' Скрыть аллергены' : ' Показать аллергены'}
            </button>
          }
        />

        {/* Chef recommends — MOVED ABOVE filter bar so dish photos are visible above the fold.
            VLM critic flagged "No actual product images visible above the fold for a 'catalog'". */}
        {chefRecommends.length > 0 && (
          <section className="mb-10 p-6 rounded-2xl bg-gradient-to-br from-gold-tint/40 to-secondary/60 border border-gold-tint/60" aria-labelledby="chef-recommends-title">
            <h2 id="chef-recommends-title" className="font-heading text-2xl font-medium mb-1 flex items-center gap-2">
              Шеф рекомендует
            </h2>
            <p className="text-sm text-muted-foreground mb-5">8 самых популярных блюд — начните с этих</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {chefRecommends.map((dish, idx) => (
                <DishCard key={`rec-${dish.id}`} dish={dish} index={idx} showAllergens={showAllergens} recommended />
              ))}
            </div>
          </section>
        )}

        {/* Sticky filter bar — sticks below header (top-16 = 64px = h-16 header) */}
        <div className="sticky top-16 z-30 -mx-4 px-4 py-3 mb-6 bg-background/95 backdrop-blur-md border-b border-line/60 rounded-xl">
          {/* Search */}
          <input
            type="search"
            placeholder="Поиск по названию или описанию…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Поиск блюд"
            className="w-full rounded-xl border border-line bg-card px-4 py-3 text-base mb-3 focus:outline-none focus:border-gold-text focus-visible:outline-2 focus-visible:outline-[#B8860B] focus-visible:outline-offset-2 transition-colors"
          />

          {/* Station filters — horizontally scrollable on mobile */}
          <div className="flex gap-2 mb-2 overflow-x-auto pb-1 -mx-1 px-1" role="group" aria-label="Фильтр по типу станции">
            {STATIONS.map(s => (
              <button
                key={s.key}
                onClick={() => setStation(s.key)}
                aria-pressed={station === s.key}
                className={`shrink-0 rounded-full border px-4 py-2 text-xs touch-target transition-colors ${
                  station === s.key
                    ? 'border-gold-text bg-gold-tint text-gold-text'
                    : 'border-line text-muted-foreground hover:border-gold-text hover:text-foreground'
                }`}
              >
                {s.label} ({stationCounts[s.key]})
              </button>
            ))}
          </div>

          {/* Diet filters */}
          <div className="flex gap-2 mb-2 overflow-x-auto pb-1 -mx-1 px-1" role="group" aria-label="Фильтр по диете">
            {DIETS.map(d => (
              <button
                key={d}
                onClick={() => toggleDiet(d)}
                aria-pressed={activeDiets.has(d)}
                className={`shrink-0 rounded-full border px-4 py-2 text-xs touch-target transition-colors ${
                  activeDiets.has(d)
                    ? 'border-gold-text bg-gold-tint text-gold-text'
                    : 'border-line text-muted-foreground hover:border-gold-text hover:text-foreground'
                }`}
              >
                {DIET_FILTERS[d]}
              </button>
            ))}
          </div>

          {/* Allergen exclusion filters — unified with constructor: emoji + ALLERGEN_LABEL */}
          <div className="flex gap-2 items-center overflow-x-auto pb-1 -mx-1 px-1" role="group" aria-label="Исключить аллергены">
            <span className="shrink-0 text-xs text-muted-foreground self-center mr-1">Исключить:</span>
            {EXCLUDE_ALLERGENS.map(a => {
              const isOn = excludedAllergens.has(a);
              const isHighRisk = HIGH_RISK_ALLERGENS.includes(a);
              return (
                <button
                  key={a}
                  onClick={() => toggleAllergen(a)}
                  aria-pressed={isOn}
                  title={`Исключить блюда с аллергеном «${ALLERGEN_LABEL[a]}»`}
                  className={`shrink-0 rounded-full border px-3 py-2 text-xs touch-target transition-colors ${
                    isOn
                      ? 'border-destructive bg-destructive/10 text-destructive font-medium'
                      : 'border-line text-muted-foreground hover:border-destructive hover:text-destructive'
                  }`}
                >
                  <span aria-hidden="true">{ALLERGEN_EMOJI[a]}</span>{' '}{ALLERGEN_LABEL[a]}{isHighRisk && <span className="ml-0.5" aria-hidden="true"></span>}
                </button>
              );
            })}
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="shrink-0 ml-auto text-xs text-gold-text hover:underline px-2 py-1 touch-target"
                aria-label="Сбросить все фильтры"
              >
                 Сбросить
              </button>
            )}
          </div>

          {/* Results count */}
          <p className="text-xs text-muted-foreground mt-2" aria-live="polite">
            {filtered.length === ALL_DISHES.length
              ? `Показаны все ${ALL_DISHES.length} блюд`
              : `Найдено: ${filtered.length} из ${ALL_DISHES.length}`}
          </p>
        </div>


        

        <noscript>
          <div className="mb-6 p-4 rounded-lg border border-amber-200 bg-amber-50 text-sm text-amber-900">
            <p className="font-medium mb-2">Фильтры требуют JavaScript. Без JS доступны ссылки по категориям:</p>
            <div className="flex flex-wrap gap-2">
              <a href="/menu" className="text-gold-text underline">Все меню</a>
              <a href="/menu/furshet" className="text-gold-text underline">Фуршет</a>
              <a href="/menu/banquet" className="text-gold-text underline">Банкет</a>
              <a href="/menu/coffee-break" className="text-gold-text underline">Кофе-брейк</a>
              <a href="/menu/vegan" className="text-gold-text underline">Веган</a>
              <a href="/menu/halal" className="text-gold-text underline">Халяль</a>
              <a href="/menu/gluten-free" className="text-gold-text underline">Без глютена</a>
              <a href="/menu/detskoe" className="text-gold-text underline">Детское</a>
            </div>
          </div>
        </noscript>

        
        

        {/* Allergen legend — ТР ТС 022/2011 (14 allergens) */}
        <div className="mb-4 p-3 rounded-lg bg-secondary/40 flex flex-wrap items-center gap-1.5 text-xs">
          <span className="font-medium text-foreground mr-1">Аллергены:</span>
          {Object.entries(ALLERGEN_LABEL).map(([code, label]) => {
            const isHighRisk = HIGH_RISK_ALLERGENS.includes(code as Allergen);
            return (
              <span
                key={code}
                className={`px-2 py-0.5 rounded-full text-[11px] font-medium border ${
                  isHighRisk
                    ? 'border-red-700/40 text-red-800 bg-red-50'
                    : 'border-amber-700/30 text-amber-800 bg-amber-50'
                }`}
                title={`${label}${isHighRisk ? ' — высокий риск анафилаксии' : ''}`}
              >
                {label}
              </span>
            );
          })}
          <span className="text-[11px] text-muted-foreground ml-2 flex items-center gap-3">
            <span className="flex items-center gap-1"><span className="inline-block w-2.5 h-2.5 rounded-full bg-red-700" />высокий риск</span>
            <span className="flex items-center gap-1"><span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-700" />прочие</span>
          </span>
        </div>

        {/* (Chef recommends section moved to top of page, above the sticky filter bar.) */}

        {/* C3 fix: station-grouped sections with clear headers + per-section pagination.
            Replaces previous flat «other / halal / pork» split that read as a Pinterest feed.
            Each station section shows 24 dishes then a «Показать ещё N» button. */}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg mb-2">Ничего не найдено</p>
            <p className="text-sm">Попробуйте изменить фильтры или поисковый запрос</p>

            {/* Спец-баннер для халяль-фильтра */}
            {activeDiets.has('halal') && (
              <div className="mt-6 p-5 rounded-xl border border-gold-tint bg-gold-tint/30 max-w-md mx-auto text-left">
                <p className="text-sm font-medium text-foreground mb-1"> Халяль-меню готовим под заказ</p>
                <p className="text-xs text-muted-foreground mb-3">
                  В базовом каталоге нет сертифицированных халяль-блюд, но мы готовим их на отдельной линии
                  по запросу — от 3 рабочих дней. Курица, говядина, баранина без свинины и алкоголя.
                </p>
                <a href="/menu/halal" className="text-xs text-gold-text font-semibold hover:underline">
                  Подробнее про халяль-меню →
                </a>
              </div>
            )}
          </div>
        )}

        {filtered.length > 0 && STATION_ORDER.map(stationKey => {
          const dishes = groupedByStation[stationKey] || [];
          if (dishes.length === 0) return null;
          return (
            <StationSection
              key={stationKey}
              stationKey={stationKey}
              label={STATION_LABELS[stationKey] || stationKey}
              dishes={dishes}
              showAllergens={showAllergens}
            />
          );
        })}

        <div className="mt-12 space-y-4">
          <div className="flex flex-wrap gap-3">
            <a href="/menu/catalog/pdf" download className="inline-flex items-center gap-2 rounded-lg border border-line bg-card px-5 py-3 text-sm font-medium text-foreground hover:border-gold-text hover:text-gold-text transition-all active:scale-[0.98]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Скачать каталог (PDF)
            </a>
            <Link href="/plan/constructor" className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground active:scale-[0.98] transition-transform inline-block">
              Собрать меню в конструкторе
            </Link>
            <Link href="/delivery/order" className="rounded-lg border border-gold-text px-6 py-3 text-sm font-semibold text-gold-text hover:bg-gold-tint transition-colors inline-block">
               В заказ доставки
            </Link>
          </div>
          <div className="p-5 rounded-xl border border-dashed border-line bg-card/50">
            <p className="text-sm font-medium mb-1">Не нашли своё? Составим индивидуально</p>
            <p className="text-xs text-muted-foreground mb-3">Шеф соберёт меню под ваш бюджет, формат и пожелания.</p>
            <Link href="/plan/constructor" className="text-sm text-gold-text font-semibold hover:underline">Составить меню с шефом →</Link>
          </div>
        </div>
      </div>
    </main>
  );
}

/**
 * StationSection — C3 fix: per-station grouping + per-section pagination.
 *
 * Renders one station block (Холодные закуски / Горячие блюда / Десерты / Напитки /
 * Шоу-станции) with a clear h2 header that includes a count badge, the dish grid,
 * and a «Показать ещё N» button when there are more than STATION_PAGE_SIZE dishes.
 *
 * State is local to each section so opening «more» in one section does not blow up
 * the others. When the parent filter set changes (dishes.length changes), pagination
 * resets to the first page via the useEffect dependency.
 */
const STATION_PAGE_SIZE = 24;

function StationSection({
  stationKey,
  label,
  dishes,
  showAllergens,
}: {
  stationKey: string;
  label: string;
  dishes: Dish[];
  showAllergens: boolean;
}) {
  const [visibleCount, setVisibleCount] = useState(STATION_PAGE_SIZE);

  // Reset pagination whenever the underlying dish list changes (filter / search applied).
  useEffect(() => {
    setVisibleCount(STATION_PAGE_SIZE);
  }, [dishes]);

  if (dishes.length === 0) return null;

  // SSR + first paint: show full list (visibleCount defaults to STATION_PAGE_SIZE so this
  // is identical to the paginated view — no hydration mismatch). After hydration the
  // section collapses to the first 24 dishes, then expands on button click.
  const visible = dishes.slice(0, visibleCount);
  const remaining = dishes.length - visible.length;
  const nextBatch = Math.min(STATION_PAGE_SIZE, remaining);
  const hasMore = remaining > 0;

  return (
    <section className="mb-10" aria-labelledby={`station-${stationKey}-title`}>
      <h2
        id={`station-${stationKey}-title`}
        className="font-heading text-xl font-medium mb-4 pb-2 border-b border-line flex items-baseline gap-2"
      >
        {label}
        <span className="text-sm text-muted-foreground font-normal">({dishes.length})</span>
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {visible.map((dish, idx) => (
          <DishCard key={dish.id} dish={dish} index={idx} showAllergens={showAllergens} />
        ))}
      </div>
      {hasMore && (
        <div className="text-center mt-6">
          <button
            type="button"
            onClick={() => setVisibleCount(c => c + STATION_PAGE_SIZE)}
            className="inline-flex items-center gap-2 rounded-lg border-2 border-gold-text bg-card px-6 py-3 text-sm font-semibold text-gold-text hover:bg-gold-tint transition-colors touch-target"
            aria-label={`Показать ещё ${nextBatch} блюд в разделе «${label}»`}
          >
            Показать ещё {nextBatch} ↓
          </button>
          <p className="text-xs text-muted-foreground mt-2">
            Показано {visible.length} из {dishes.length}
          </p>
        </div>
      )}
    </section>
  );
}

function DishCard({ dish, index = 0, showAllergens = true, recommended = false }: { dish: Dish; index?: number; showAllergens?: boolean; recommended?: boolean }) {
  const dishImg = getDishImageByIndex(dish.id, dish.station, index);
  // Pass dish ID via URL so constructor can pre-add it
  const constructorHref = `/plan/constructor?format=${dish.format[0] || 'furshet'}&guests=20&dish=${dish.id}`;

  // C3 fix: detect pork-containing dishes (previously broken out into a separate
  // « Блюда со свининой» section). With station grouping we lose that section,
  // so we add a small inline « свин» badge on the image to keep the halal
  // safety signal visible at a glance.
  const hasPork = /свинин|бекон|сало/i.test(dish.description);

  return (
    <article className="drinqit-3d drinqit-shine rounded-xl border border-line bg-card overflow-hidden group hover:border-gold-text transition-all duration-300 hover:shadow-xl flex flex-col" aria-label={`Блюдо: ${dish.name}, цена ${dish.pricePerGuest} рублей за гостя`}>
      <div className="drinqit-3d-inner">
      {/* Image area — FoodPhoto с анимацией Drinqit 3D */}
      <Link href={constructorHref} className="relative block drinqit-3d-img" aria-label={`${dish.name} — открыть в конструкторе меню`}>
        <AllergenChips dish={dish} />
        <DishCartIndicator dishId={dish.id} />
        {/* Pork badge — small inline safety indicator (replaces the removed
            dedicated pork section). Visible only on cards whose description
            mentions свинин / бекон / сало. Helps halal-event planners avoid
            accidentally selecting these dishes. */}
        {hasPork && (
          <span
            className="absolute bottom-2 left-2 z-10 inline-flex items-center gap-1 rounded-full bg-rose-900/85 text-white text-[10px] font-semibold px-2 py-0.5 backdrop-blur-sm"
            aria-label="Содержит свинину — не подходит для халяль-мероприятий"
            title="Содержит свинину — не подходит для халяль-мероприятий"
          >
            свин
          </span>
        )}
        {/* Recommended badge — top-right corner */}
        {recommended && (
          <span
            className="absolute top-2 right-2 z-10 inline-flex items-center gap-1 rounded-full bg-gold-text text-white text-[10px] font-semibold px-2 py-0.5 shadow-md"
            aria-label="Шеф рекомендует"
          >
            Хит
          </span>
        )}
        <FoodPhoto
          src={dishImg}
          alt={dish.name}
          aspectRatio="square"
          objectPosition={getObjectPositionForDish(dish.id, dish.station)}
          className="w-full"
        />
      </Link>

      {/* Info */}
      <div className="p-3 flex-1 flex flex-col">
        <h3 className="font-medium text-sm mb-1 leading-tight">{dish.name}</h3>
        <p className="text-[11px] text-muted-foreground mb-2 line-clamp-2">{dish.description}</p>

        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs text-gold-text font-semibold whitespace-nowrap">
            {dish.pricePerGuest} ₽<span className="text-muted-foreground font-normal">/гость</span>
          </span>

          {/* Diet badges — reduced to 2 most important (Halal, GF) per C8/C3.
              Other badges (VG, SF, NF, Дети) available via title tooltip to
              reduce visual noise while keeping info accessible. */}
          <div className="flex gap-1 flex-wrap justify-end" title={`Диеты: ${[
            dish.dietBadges.includes('vegan') && 'Веган',
            dish.dietBadges.includes('gluten-free') && 'Без глютена',
            dish.dietBadges.includes('halal') && 'Халяль',
            dish.dietBadges.includes('sugar-free') && 'Без сахара',
            dish.dietBadges.includes('nut-free') && 'Без орехов',
            dish.childFriendly && 'Для детей',
          ].filter(Boolean).join(', ') || 'нет'}`}>
            {dish.dietBadges.includes('halal') && <Badge label="Халяль" color="green" />}
            {dish.dietBadges.includes('gluten-free') && <Badge label="GF" color="amber" />}
            {dish.dietBadges.includes('vegan') && !dish.dietBadges.includes('halal') && <Badge label="VG" color="green" />}
          </div>
        </div>

        {/* ХЕ (хлебные единицы) — extracted from description for СД1 visibility */}
        {dish.description.match(/ХЕ=([0-9.]+)/) && (
          <p className="text-[10px] text-purple-700 font-semibold mb-2">
            ХЕ={dish.description.match(/ХЕ=([0-9.]+)/)?.[1]} · для СД1
          </p>
        )}

        {/* Allergen summary — single compact line per C8/C3/C4 cognitive load fix.
            Full allergen chips on image show high-risk only ( badge).
            Here: compact text line with count + expandable title. Reduces the
            "wall of colored tags" that competed with dish name & price. */}
        {showAllergens && dish.allergens.length > 0 && (
          <p
            className="mt-1 mb-3 text-[10px] text-muted-foreground leading-tight"
            title={dish.allergens.map(a => ALLERGEN_LABEL[a]).join(', ')}
          >
            <span className="font-medium">Аллергены:</span>{' '}
            {dish.allergens.slice(0, 3).map(a => ALLERGEN_LABEL[a]).join(', ')}
            {dish.allergens.length > 3 && ` +${dish.allergens.length - 3}`}
          </p>
        )}

        {/* CTA: Open in constructor with dish pre-added */}
        <Link
          href={constructorHref}
          className="mt-auto inline-flex items-center justify-center rounded-lg bg-gold-text text-white px-3 py-2 text-xs font-semibold hover:bg-gold-text/90 transition-colors touch-target no-underline"
          aria-label={`Открыть ${dish.name} в конструкторе меню`}
        >
          Открыть в конструкторе →
        </Link>
      </div>
      </div>
    </article>
  );
}

function Badge({ label, color }: { label: string; color: string }) {
  const colors: Record<string, string> = {
    green: 'bg-emerald-100 text-emerald-700',
    amber: 'bg-amber-100 text-amber-700',
    blue: 'bg-sky-100 text-sky-700',
    purple: 'bg-purple-100 text-purple-700',
  };
  return (
    <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${colors[color] || 'bg-muted'}`}>
      {label}
    </span>
  );
}