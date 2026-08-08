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

  return (
    <main className="pt-24 pb-32" id="main">
      <div className="container-site max-w-6xl">
        <Breadcrumbs />

        {/* Заголовок */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl md:text-4xl font-medium mb-2">
            Каталог блюд
          </h1>
          <p className="text-muted-foreground">
            {ALL_DISHES.length} блюд. Нажмите «+ В меню» чтобы собрать свой заказ.
          </p>
        </div>

        {/* Поиск + фильтры — ОДНА простая панель */}
        <div className="mb-8 space-y-3">
          {/* Поиск */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="search"
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
                    : 'border-line text-muted-foreground hover:border-gold-text'
                }`}
              >
                <span className="mr-1">{s.emoji}</span>
                {s.label}
              </button>
            ))}
          </div>

          {/* Диета */}
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

          <p className="text-xs text-muted-foreground">
            {filtered.length === ALL_DISHES.length
              ? `Показаны все ${ALL_DISHES.length} блюд`
              : `Найдено ${filtered.length} из ${ALL_DISHES.length}`}
          </p>
        </div>

        {/* СЕТКА БЛЮД — простая, 3 колонки, крупные карточки */}
        {visible.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {visible.map((dish) => {
              const isInCart = selectedItems.some(i => i.dishId === dish.id);
              const constructorHref = `/plan/constructor?format=${dish.format[0] || 'furshet'}&guests=20&dish=${dish.id}`;
              return (
                <div
                  key={dish.id}
                  className="rounded-2xl border border-line bg-card overflow-hidden hover:shadow-lg hover:border-gold-text transition-all flex flex-col"
                >
                  {/* Фото — крупное, квадратное */}
                  <Link href={constructorHref} className="relative block aspect-[4/3] overflow-hidden bg-secondary">
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
                      {dish.dietBadges.includes('vegan') && <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-bold">VG</span>}
                      {dish.dietBadges.includes('gluten-free') && <span className="text-[10px] bg-amber-500 text-white px-2 py-0.5 rounded-full font-bold">GF</span>}
                      {dish.dietBadges.includes('halal') && <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-bold">H</span>}
                    </div>
                  </Link>

                  {/* Инфо */}
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-medium text-base mb-1">{dish.name}</h3>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2 flex-1">{dish.description}</p>

                    {/* Цена + кнопка */}
                    <div className="flex items-center justify-between gap-2 pt-3 border-t border-line">
                      <span className="text-sm text-muted-foreground">
                        <span className="font-bold text-foreground text-lg">{dish.pricePerGuest}</span> ₽/гость
                      </span>
                      <button
                        onClick={() => isInCart ? removeDish(dish.id) : addDish(dish.id)}
                        className={`inline-flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-bold transition-all ${
                          isInCart
                            ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                            : 'bg-gold-text text-white hover:bg-gold-text/90'
                        }`}
                      >
                        {isInCart ? (
                          <><Check className="w-4 h-4" /> В меню</>
                        ) : (
                          <><Plus className="w-4 h-4" /> В меню</>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-4xl mb-4">🍽</p>
            <p className="text-lg mb-2">Ничего не найдено</p>
            <button onClick={resetFilters} className="text-sm text-gold-text font-semibold hover:underline">
              Сбросить фильтры
            </button>
          </div>
        )}

        {/* Показать ещё */}
        {hasMore && (
          <div className="text-center py-8">
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

        {/* Корзина — плавающая внизу */}
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
