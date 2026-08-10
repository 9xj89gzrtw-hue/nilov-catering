'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ALL_DISHES } from '@/lib/menu-data';
import { getDishImage, getObjectPositionForDish } from '@/lib/dish-images';
import FoodPhoto from '@/components/common/FoodPhoto';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { useConstructor } from '@/hooks/useConstructor';
import { Search, Plus, Check, ArrowRight } from 'lucide-react';

const STATIONS = [
  { key: 'all', label: 'Все', emoji: '🍽' },
  { key: 'cold', label: 'Закуски', emoji: '🥗' },
  { key: 'hot', label: 'Горячее', emoji: '🍖' },
  { key: 'desserts', label: 'Десерты', emoji: '🍰' },
  { key: 'drinks', label: 'Напитки', emoji: '🥂' },
] as const;

const DIETS = [
  { key: 'vegan', label: 'Веган' },
  { key: 'gluten-free', label: 'Без глютена' },
  { key: 'halal', label: 'Халяль' },
] as const;

export default function CatalogPage() {
  const [search, setSearch] = useState('');
  const [station, setStation] = useState<string>('all');
  const [activeDiets, setActiveDiets] = useState<Set<string>>(new Set());
  const [visibleCount, setVisibleCount] = useState(12);

  const addDish = useConstructor(s => s.addDish);
  const removeDish = useConstructor(s => s.removeDish);
  const selectedItems = useConstructor(s => s.selectedItems);

  const toggleDiet = (d: string) => {
    const next = new Set(activeDiets);
    if (next.has(d)) next.delete(d); else next.add(d);
    setActiveDiets(next);
  };

  const filtered = useMemo(() => {
    let dishes = ALL_DISHES;
    if (station !== 'all') dishes = dishes.filter(d => d.station === station);
    if (activeDiets.size > 0) {
      dishes = dishes.filter(d => [...activeDiets].every(diet => d.dietBadges.includes(diet as any)));
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      dishes = dishes.filter(d => d.name.toLowerCase().includes(q) || d.description.toLowerCase().includes(q));
    }
    return dishes;
  }, [station, activeDiets, search]);

  const hasActiveFilters = search.trim() !== '' || station !== 'all' || activeDiets.size > 0;
  const resetFilters = () => {
    setSearch('');
    setStation('all');
    setActiveDiets(new Set());
    setVisibleCount(12);
  };

  const visible = filtered.slice(0, visibleCount);
  const hasMore = filtered.length > visibleCount;
  const totalCountLabel =
    filtered.length === ALL_DISHES.length
      ? `Всего ${ALL_DISHES.length} блюд`
      : `Найдено ${filtered.length} из ${ALL_DISHES.length}`;

  return (
    <main className="pt-24 pb-32" id="main">
      <div className="container-site max-w-6xl">
        <Breadcrumbs />

        {/* ════════ 1. ЗАГОЛОВОК — главный фокус ════════ */}
        <section className="mb-10 md:mb-12">
          <h1 className="font-heading text-4xl md:text-5xl font-medium tracking-tight mb-3">
            Каталог блюд
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl mb-4">
            {ALL_DISHES.length} блюд. Нажмите «В меню» на карточке, чтобы собрать свой заказ.
          </p>
          {/* Trust bar — compact, one line */}
          <p className="text-sm text-muted-foreground">
            19 лет на кухне СПб · 3 000+ событий · 4.8/5 по 27 отзывам · ⏱ Перезвоним за 15 минут
          </p>
        </section>

        {/* ════════ 2. ФИЛЬТРЫ — второстепенная панель ════════ */}
        <section className="mb-10 md:mb-12 space-y-3">
          {/* Поиск */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="search"
              aria-label="Поиск блюда по названию"
              placeholder="Поиск блюда…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full rounded-xl border border-line bg-card pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-gold-text"
            />
          </div>

          {/* Тип блюда */}
          <div className="flex gap-2 flex-wrap">
            {STATIONS.map(s => (
              <button
                key={s.key}
                onClick={() => setStation(s.key)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  station === s.key
                    ? 'border-gold-text bg-gold-tint text-gold-text'
                    : 'border-line text-muted-foreground hover:border-gold-text hover:text-foreground'
                }`}
              >
                <span className="mr-1">{s.emoji}</span>
                {s.label}
              </button>
            ))}
          </div>

          {/* Диета + счётчик на одной строке (убираем «висящую» строку) */}
          <div className="flex gap-2 flex-wrap items-center justify-between">
            <div className="flex gap-2 flex-wrap items-center">
              <span className="text-xs text-muted-foreground">Диета:</span>
              {DIETS.map(d => (
                <button
                  key={d.key}
                  onClick={() => toggleDiet(d.key)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                    activeDiets.has(d.key)
                      ? 'border-gold-text bg-gold-tint text-gold-text'
                      : 'border-line text-muted-foreground hover:border-gold-text'
                  }`}
                >
                  {d.label}
                </button>
              ))}
              {hasActiveFilters && (
                <button onClick={resetFilters} className="text-xs text-gold-text hover:underline ml-2">
                  ✕ Сбросить
                </button>
              )}
            </div>
            <p className="text-xs text-muted-foreground whitespace-nowrap">{totalCountLabel}</p>
          </div>
        </section>

        {/* ════════ 3. СЕТКА БЛЮД — главный фокус ════════ */}
        {visible.length > 0 ? (
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {visible.map((dish) => {
                const isInCart = selectedItems.some(i => i.dishId === dish.id);
                const constructorHref = `/plan/constructor?format=${dish.format[0] || 'furshet'}&guests=20&dish=${dish.id}`;
                return (
                  <article
                    key={dish.id}
                    className="group rounded-2xl border border-line bg-card overflow-hidden hover:shadow-lg hover:border-gold-text transition-all flex flex-col h-full"
                  >
                    {/* Фото — фиксированная высота для консистентности */}
                    <Link
                      href={constructorHref}
                      className="relative block aspect-[4/3] overflow-hidden bg-secondary shrink-0"
                      aria-label={dish.name}
                    >
                      <FoodPhoto
                        src={getDishImage(dish.id, dish.station)}
                        alt={dish.name}
                        aspectRatio="wide"
                        objectPosition={getObjectPositionForDish(dish.id, dish.station)}
                        className="w-full h-full"
                      />
                      {/* Цена на фото */}
                      <div className="absolute top-2 right-2">
                        <span className="inline-block bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-bold text-foreground shadow-md">
                          {dish.pricePerGuest} ₽
                        </span>
                      </div>
                      {/* Бейджи диет */}
                      <div className="absolute top-2 left-2 flex gap-1">
                        {dish.dietBadges.includes('vegan') && <span className="text-xs bg-emerald-600 text-white px-2 py-0.5 rounded-full font-bold">VG</span>}
                        {dish.dietBadges.includes('gluten-free') && <span className="text-xs bg-amber-500 text-white px-2 py-0.5 rounded-full font-bold">GF</span>}
                        {dish.dietBadges.includes('halal') && <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full font-bold">H</span>}
                      </div>
                    </Link>

                    {/* Инфо — flex-col с mt-auto прижимает кнопку к низу для одинаковой высоты */}
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="font-heading font-medium text-lg leading-snug mb-1">{dish.name}</div>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2 min-h-[2.5rem]">{dish.description}</p>

                      {/* Цена + кнопка — прижата к низу карточки */}
                      <div className="mt-auto flex items-center justify-between gap-2 pt-3 border-t border-line">
                        <span className="text-sm text-muted-foreground">
                          <span className="font-bold text-foreground text-lg">{dish.pricePerGuest}</span> ₽/гость
                        </span>
                        <button
                          onClick={() => isInCart ? removeDish(dish.id) : addDish(dish.id)}
                          aria-pressed={isInCart}
                          className={`inline-flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-bold transition-all ${
                            isInCart
                              ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                              : 'bg-gold-text text-white hover:bg-gold-text/90 shadow-sm'
                          }`}
                        >
                          {isInCart ? (
                            <><Check className="w-4 h-4" /> Добавлено</>
                          ) : (
                            <><Plus className="w-4 h-4" /> В меню</>
                          )}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ) : (
          <div className="text-center py-16">
            <p className="text-4xl mb-4">🍽</p>
            <p className="text-lg mb-2">Ничего не найдено</p>
            <button onClick={resetFilters} className="text-sm text-gold-text font-semibold hover:underline">
              Сбросить фильтры
            </button>
          </div>
        )}

        {/* ════════ 4. ПАГИНАЦИЯ ════════ */}
        {hasMore && (
          <div className="text-center py-10">
            <button
              onClick={() => setVisibleCount(c => c + 12)}
              className="inline-flex items-center gap-2 rounded-lg border-2 border-gold-text bg-card px-8 py-3 text-sm font-semibold text-gold-text hover:bg-gold-tint transition-colors"
            >
              Показать ещё {Math.min(12, filtered.length - visibleCount)} блюд
            </button>
            <p className="text-xs text-muted-foreground mt-2">
              Показано {visible.length} из {filtered.length}
            </p>
          </div>
        )}

        {/* Min order info */}
        <div className="mt-8 p-5 rounded-xl border border-line bg-card text-center">
          <p className="text-sm text-muted-foreground">
            Минимальный заказ: от 10 гостей (кофе-брейк) / 20 (фуршет) / 15 (банкет)
          </p>
        </div>

        {/* ════════ 5. КОРЗИНА — плавающая внизу ════════ */}
        {selectedItems.length > 0 && (
          <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 rounded-2xl bg-background/95 backdrop-blur-xl border border-line shadow-2xl p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">
                  {selectedItems.reduce((s, i) => s + i.qty, 0)} блюд в меню
                </p>
                <p className="text-xs text-muted-foreground">
                  ≈ {selectedItems.reduce((sum, i) => {
                    const d = ALL_DISHES.find(x => x.id === i.dishId);
                    return sum + (d?.pricePerGuest || 0) * i.qty * 20;
                  }, 0).toLocaleString('ru-RU')} ₽ на 20 гостей
                </p>
              </div>
              <Link
                href="/plan/constructor"
                className="inline-flex items-center gap-1 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Оформить <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
// W89 deploy Sun Aug  9 18:38:38 UTC 2026
