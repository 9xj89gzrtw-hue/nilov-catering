'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ALL_DISHES, DISH_CATEGORIES, DIET_FILTERS, FORMAT_DISHES } from '@/lib/menu-data';
import { getDishImage } from '@/lib/dish-images';
import FoodPhoto from '@/components/common/FoodPhoto';
import type { Dish } from '@/lib/types';
import { ALLERGEN_LABEL } from '@/lib/types';

const STATIONS = [
  { key: 'all', label: 'Все' },
  { key: 'cold', label: 'Холодные' },
  { key: 'hot', label: 'Горячее' },
  { key: 'desserts', label: 'Десерты' },
  { key: 'drinks', label: 'Напитки' },
] as const;

const DIETS = ['vegan', 'gluten-free', 'halal'] as const;

export default function CatalogPage() {
  const [search, setSearch] = useState('');
  const [station, setStation] = useState<string>('all');
  const [activeDiets, setActiveDiets] = useState<Set<string>>(new Set());

  const toggleDiet = (d: string) => {
    const next = new Set(activeDiets);
    if (next.has(d)) next.delete(d); else next.add(d);
    setActiveDiets(next);
  };

  const filtered = useMemo(() => {
    let dishes = ALL_DISHES;
    if (station !== 'all') dishes = dishes.filter(d => d.station === station);
    if (activeDiets.size > 0) {
      dishes = dishes.filter(d => [...activeDiets].every(diet => d.dietBadges.includes(diet as typeof DIETS[number])));
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      dishes = dishes.filter(d => d.name.toLowerCase().includes(q) || d.description.toLowerCase().includes(q));
    }
    return dishes;
  }, [station, activeDiets, search]);

  const stationCounts = useMemo(() => {
    const counts: Record<string, number> = { all: ALL_DISHES.length };
    for (const s of STATIONS) {
      if (s.key === 'all') continue;
      counts[s.key] = ALL_DISHES.filter(d => d.station === s.key).length;
    }
    return counts;
  }, []);

  return (
    <main className="pt-24 pb-20" id="main">
      <div className="container-site">
        <h1 className="mb-2">Каталог блюд</h1>
        <p className="text-muted-foreground mb-8">
          {ALL_DISHES.length} блюд с фото, аллергенами и КБЖУ. Выберите — и мы приготовим под ваше событие.
        </p>

        {/* Search */}
        <input
          type="search"
          placeholder="Поиск по названию или описанию…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full rounded-xl border border-line bg-card px-4 py-3 text-sm mb-4 focus:outline-none focus:border-gold-text transition-colors"
        />

        {/* Station filters */}
        <div className="flex flex-wrap gap-2 mb-3">
          {STATIONS.map(s => (
            <button
              key={s.key}
              onClick={() => setStation(s.key)}
              className={`rounded-full border px-4 py-1.5 text-xs transition-colors ${
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
        <div className="flex flex-wrap gap-2 mb-8">
          {DIETS.map(d => (
            <button
              key={d}
              onClick={() => toggleDiet(d)}
              className={`rounded-full border px-4 py-1.5 text-xs transition-colors ${
                activeDiets.has(d)
                  ? 'border-gold-text bg-gold-tint text-gold-text'
                  : 'border-line text-muted-foreground hover:border-gold-text hover:text-foreground'
              }`}
            >
              {DIET_FILTERS[d]}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-xs text-muted-foreground mb-4">
          {filtered.length === ALL_DISHES.length
            ? `Показаны все ${ALL_DISHES.length} блюд`
            : `Найдено: ${filtered.length} из ${ALL_DISHES.length}`}
        </p>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(dish => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg mb-2">Ничего не найдено</p>
            <p className="text-sm">Попробуйте изменить фильтры или поисковый запрос</p>

            {/* Спец-баннер для халяль-фильтра */}
            {activeDiets.has('halal') && (
              <div className="mt-6 p-5 rounded-xl border border-gold-tint bg-gold-tint/30 max-w-md mx-auto text-left">
                <p className="text-sm font-medium text-foreground mb-1">☪️ Халяль-меню готовим под заказ</p>
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
              🛒 В заказ доставки
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

function DishCard({ dish }: { dish: Dish }) {
  const dishImg = getDishImage(dish.id, dish.station);

  return (
    <div className="rounded-xl border border-line bg-card overflow-hidden group hover:border-gold-text transition-all duration-300 hover:shadow-lg">
      {/* Image area — FoodPhoto с анимацией Drinqit */}
      <div className="relative">
        <FoodPhoto
          src={dishImg}
          alt={dish.name}
          aspectRatio="square"
          objectPosition="center 40%"
          className="w-full"
        />
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="font-medium text-sm mb-1 leading-tight">{dish.name}</h3>
        <p className="text-[11px] text-muted-foreground mb-2 line-clamp-2">{dish.description}</p>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gold-text font-semibold">
            {dish.pricePerGuest} ₽{dish.servingsPerGuest > 1 && `/гость`}
          </span>

          <div className="flex gap-1 flex-wrap">
            {/* Diet badges */}
            {dish.dietBadges.includes('vegan') && <Badge label="VG" color="green" />}
            {dish.dietBadges.includes('gluten-free') && <Badge label="GF" color="amber" />}
            {dish.dietBadges.includes('halal') && <Badge label="H" color="blue" />}
            {dish.childFriendly && <Badge label="Дети" color="purple" />}
          </div>
        </div>

        {/* Allergens — high-risk подсветка для nuts/peanuts/gluten/fish/crustaceans/molluscs */}
        {dish.allergens.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {dish.allergens.slice(0, 4).map(a => {
              const isHighRisk = a === 'nuts' || a === 'peanuts' || a === 'gluten' || a === 'fish' || a === 'crustaceans' || a === 'molluscs';
              return (
                <span key={a} className={`text-[10px] px-1.5 py-0.5 rounded ${
                  isHighRisk ? 'bg-destructive/20 text-destructive font-semibold' : 'bg-muted text-muted-foreground'
                }`}>
                  {ALLERGEN_LABEL[a]}
                </span>
              );
            })}
            {dish.allergens.length > 4 && (
              <span className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded">
                +{dish.allergens.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Badge({ label, color }: { label: string; color: string }) {
  const colors: Record<string, string> = {
    green: 'bg-emerald-100 text-emerald-700',
    amber: 'bg-amber-100 text-amber-700',
    blue: 'bg-blue-100 text-blue-700',
    purple: 'bg-purple-100 text-purple-700',
  };
  return (
    <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${colors[color] || 'bg-muted'}`}>
      {label}
    </span>
  );
}