'use client';

import { useState, useMemo } from 'react';
import { ALL_DISHES, DISH_CATEGORIES, DIET_FILTERS } from '@/lib/menu-data';
import type { Dish, Diet, Allergen } from '@/lib/types';
import { ALLERGEN_LABEL } from '@/lib/types';

const STATIONS = [
  { key: 'all', label: 'Все' },
  { key: 'cold', label: 'Холодные' },
  { key: 'hot', label: 'Горячее' },
  { key: 'desserts', label: 'Десерты' },
  { key: 'drinks', label: 'Напитки' },
] as const;

const DIETS: Diet[] = ['vegan', 'gluten-free', 'halal'];

// 14 обязательных аллергенов ТР ТС 022/2011 / EU 1169/2011
// Сокращённый набор для UI (топ-6 частых) + expandable для остальных
const TOP_ALLERGENS: Allergen[] = ['nuts', 'peanuts', 'fish', 'milk', 'eggs', 'soy'];
const EXTRA_ALLERGENS: Allergen[] = ['gluten', 'crustaceans', 'celery', 'mustard', 'sesame', 'sulphites', 'lupin', 'molluscs'];

const STATION_EMOJI: Record<string, string> = {
  cold: '🥗', hot: '🍖', desserts: '🍰', drinks: '🥂', show: '🔥',
};

const ALLERGEN_EMOJI: Record<string, string> = {
  nuts: '🥜', peanuts: '🥜', fish: '🐟', milk: '🥛', eggs: '🥚', soy: '🌱',
  gluten: '🌾', crustaceans: '🦐', celery: '🌿', mustard: '🟡', sesame: '▪️',
  sulphites: '🍷', lupin: '🌼', molluscs: '🦪',
};

export interface MenuBuilderProps {
  selectedItems: { dishId: string; qty: number }[];
  onAdd: (dishId: string) => void;
  onRemove: (dishId: string) => void;
  onSetQty: (dishId: string, qty: number) => void;
  onReorder?: (fromIdx: number, toIdx: number) => void;
  // Опционально: контролируемые excludedAllergens (если передан — синхронизируются со store)
  excludedAllergens?: Set<Allergen>;
  onExcludedAllergensChange?: (allergens: Set<Allergen>) => void;
  formatFilter?: string;
  // Фильтр по диете активной группы (например 'vegan' / 'halal' / 'gluten-free')
  dietFilter?: string;
  catalogTitle?: string;
  cartTitle?: string;
  emptyCartText?: string;
  unit?: string;
  enableReorder?: boolean;
  enableHybridMode?: boolean;
}

export default function MenuBuilder({
  selectedItems,
  onAdd,
  onRemove,
  onSetQty,
  onReorder,
  excludedAllergens: controlledExcluded,
  onExcludedAllergensChange,
  formatFilter,
  dietFilter,
  catalogTitle = 'Каталог блюд',
  cartTitle = 'Ваше меню',
  emptyCartText = 'Нажмите «+» на блюде или перетащите его сюда',
  unit = 'порц.',
  enableReorder = true,
  enableHybridMode = false,
}: MenuBuilderProps) {
  const [search, setSearch] = useState('');
  const [station, setStation] = useState<string>('all');
  const [activeDiets, setActiveDiets] = useState<Set<string>>(new Set());
  // Локальный state — используется если не передан controlledExcluded
  const [localExcludedAllergens, setLocalExcludedAllergens] = useState<Set<Allergen>>(new Set());
  // Actual excludedAllergens (controlled or local)
  const excludedAllergens = controlledExcluded !== undefined ? controlledExcluded : localExcludedAllergens;
  const setExcludedAllergens = (next: Set<Allergen>) => {
    if (onExcludedAllergensChange) onExcludedAllergensChange(next);
    else setLocalExcludedAllergens(next);
  };
  const [allergenMode, setAllergenMode] = useState<'highlight' | 'hide'>('highlight');
  const [showExtraAllergens, setShowExtraAllergens] = useState(false);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);
  const [draggedFromIdx, setDraggedFromIdx] = useState<number | null>(null);
  const [dragOverCart, setDragOverCart] = useState(false);
  const [showAllFormats, setShowAllFormats] = useState(false);

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

  const selectedIds = useMemo(() => new Set(selectedItems.map(i => i.dishId)), [selectedItems]);

  const filtered = useMemo(() => {
    let dishes: Dish[] = ALL_DISHES;
    if (formatFilter && !showAllFormats) {
      dishes = dishes.filter(d => d.format.includes(formatFilter as Dish['format'][number]));
    }
    if (station !== 'all') dishes = dishes.filter(d => d.station === station);
    // Diet filter — либо из активной группы (dietFilter prop), либо из ручных чипов (activeDiets)
    if (dietFilter) {
      dishes = dishes.filter(d => d.dietBadges.includes(dietFilter as Diet));
    } else if (activeDiets.size > 0) {
      dishes = dishes.filter(d => [...activeDiets].every(diet => d.dietBadges.includes(diet as Diet)));
    }
    // Allergen filter
    if (excludedAllergens.size > 0 && allergenMode === 'hide') {
      dishes = dishes.filter(d => !d.allergens.some(a => excludedAllergens.has(a)));
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      dishes = dishes.filter(d => d.name.toLowerCase().includes(q) || d.description.toLowerCase().includes(q));
    }
    return dishes;
  }, [station, activeDiets, search, formatFilter, excludedAllergens, allergenMode, showAllFormats, dietFilter]);

  // Количество блюд, скрытых фильтром аллергенов (для подсказки)
  const hiddenByAllergens = useMemo(() => {
    if (excludedAllergens.size === 0 || allergenMode !== 'hide') return 0;
    let count = 0;
    for (const d of ALL_DISHES) {
      if (formatFilter && !d.format.includes(formatFilter as Dish['format'][number])) continue;
      if (station !== 'all' && d.station !== station) continue;
      if (activeDiets.size > 0 && ![...activeDiets].every(diet => d.dietBadges.includes(diet as Diet))) continue;
      if (search.trim()) {
        const q = search.toLowerCase();
        if (!d.name.toLowerCase().includes(q) && !d.description.toLowerCase().includes(q)) continue;
      }
      if (d.allergens.some(a => excludedAllergens.has(a))) count++;
    }
    return count;
  }, [excludedAllergens, allergenMode, formatFilter, station, activeDiets, search]);

  const handleCatalogDragStart = (e: React.DragEvent, dishId: string) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ type: 'catalog', dishId }));
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleCartDragStart = (e: React.DragEvent, idx: number) => {
    if (!enableReorder) return;
    setDraggedFromIdx(idx);
    e.dataTransfer.setData('text/plain', JSON.stringify({ type: 'cart', idx }));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleCartDragEnd = () => {
    setDraggedFromIdx(null);
    setDragOverIdx(null);
    setDragOverCart(false);
  };

  const handleCartDragOver = (e: React.DragEvent, idx?: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = draggedFromIdx !== null ? 'move' : 'copy';
    if (idx !== undefined) setDragOverIdx(idx);
    else setDragOverCart(true);
  };

  const handleCartDrop = (e: React.DragEvent, dropIdx?: number) => {
    e.preventDefault();
    setDragOverIdx(null);
    setDragOverCart(false);
    try {
      const data = JSON.parse(e.dataTransfer.getData('text/plain'));
      if (data.type === 'catalog' && data.dishId) {
        if (!selectedIds.has(data.dishId)) {
          onAdd(data.dishId);
        }
      } else if (data.type === 'cart' && onReorder && draggedFromIdx !== null) {
        const fromIdx = draggedFromIdx;
        const toIdx = dropIdx !== undefined ? dropIdx : selectedItems.length - 1;
        if (fromIdx !== toIdx) {
          onReorder(fromIdx, toIdx);
        }
      }
    } catch {
      // ignore parse errors
    }
    setDraggedFromIdx(null);
  };

  // Touch-friendly: move item up/down via buttons (works without drag)
  const moveItem = (idx: number, direction: -1 | 1) => {
    if (!onReorder) return;
    const toIdx = idx + direction;
    if (toIdx < 0 || toIdx >= selectedItems.length) return;
    onReorder(idx, toIdx);
  };

  return (
    <div className="grid lg:grid-cols-[1fr_400px] gap-6">
      {/* === КАТАЛОГ === */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-heading text-lg font-medium">{catalogTitle}</h3>
          <span className="text-xs text-muted-foreground">
            {filtered.length} доступно{hiddenByAllergens > 0 && ` · ${hiddenByAllergens} скрыто аллергенами`}
          </span>
        </div>

        {/* Search */}
        <input
          type="search"
          placeholder="Поиск блюда…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full rounded-xl border border-line bg-card px-4 py-2.5 text-sm mb-3 focus:outline-none focus:border-gold-text transition-colors"
        />

        {/* Station filters */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          {STATIONS.map(s => (
            <button
              key={s.key}
              onClick={() => setStation(s.key)}
              className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                station === s.key
                  ? 'border-gold-text bg-gold-tint text-gold-text'
                  : 'border-line text-muted-foreground hover:border-gold-text hover:text-foreground'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Hybrid mode toggle — для смешанных событий (дети + взрослые) */}
        {enableHybridMode && formatFilter && (
          <div className="mb-3">
            <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
              <input
                type="checkbox"
                checked={showAllFormats}
                onChange={e => setShowAllFormats(e.target.checked)}
                className="accent-gold-text"
              />
              <span>🔀 Показать блюда других форматов (для гибрида «дети + взрослые» или смешанных диет)</span>
            </label>
          </div>
        )}

        {/* Diet filters */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {DIETS.map(d => (
            <button
              key={d}
              onClick={() => toggleDiet(d)}
              className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                activeDiets.has(d)
                  ? 'border-gold-text bg-gold-tint text-gold-text'
                  : 'border-line text-muted-foreground hover:border-gold-text hover:text-foreground'
              }`}
            >
              {DIET_FILTERS[d]}
            </button>
          ))}
        </div>

        {/* === AllergenFilterBar === */}
        <div className="rounded-xl border border-line bg-card p-3 mb-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-foreground">🛡 Исключить аллергены</span>
              <div className="flex bg-muted rounded-md p-0.5">
                <button
                  onClick={() => setAllergenMode('highlight')}
                  className={`text-[10px] px-2 py-0.5 rounded ${allergenMode === 'highlight' ? 'bg-card shadow-sm' : 'text-muted-foreground'}`}
                >
                  Подсветить
                </button>
                <button
                  onClick={() => setAllergenMode('hide')}
                  className={`text-[10px] px-2 py-0.5 rounded ${allergenMode === 'hide' ? 'bg-card shadow-sm' : 'text-muted-foreground'}`}
                >
                  Скрыть
                </button>
              </div>
            </div>
            <button
              onClick={() => setShowExtraAllergens(!showExtraAllergens)}
              className="text-[10px] text-muted-foreground hover:text-foreground transition-colors"
            >
              {showExtraAllergens ? '← основные' : 'ещё аллергены →'}
            </button>
          </div>

          <div className="flex flex-wrap gap-1">
            {(showExtraAllergens ? [...TOP_ALLERGENS, ...EXTRA_ALLERGENS] : TOP_ALLERGENS).map(a => {
              const isOn = excludedAllergens.has(a);
              return (
                <button
                  key={a}
                  onClick={() => toggleAllergen(a)}
                  className={`text-[10px] px-2 py-1 rounded-full border transition-all ${
                    isOn
                      ? 'bg-destructive text-white border-destructive font-semibold'
                      : 'bg-card text-muted-foreground border-line hover:border-destructive/50'
                  }`}
                  title={ALLERGEN_LABEL[a]}
                  aria-pressed={isOn}
                >
                  {ALLERGEN_EMOJI[a]} {ALLERGEN_LABEL[a]}
                </button>
              );
            })}
          </div>

          {excludedAllergens.size > 0 && (
            <p className="text-[10px] text-muted-foreground mt-2">
              ⚠ Фильтр носит информационный характер. Финальную проверку по аллергенам делает менеджер по телефону перед заказом.
            </p>
          )}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 mb-3 text-[10px] text-muted-foreground">
          <span><span className="inline-block w-3 h-3 bg-emerald-600 rounded-sm align-middle mr-0.5" /><b className="font-semibold">VG</b> — веган</span>
          <span><span className="inline-block w-3 h-3 bg-amber-500 rounded-sm align-middle mr-0.5" /><b className="font-semibold">GF</b> — без глютена</span>
          <span><span className="inline-block w-3 h-3 bg-blue-500 rounded-sm align-middle mr-0.5" /><b className="font-semibold">H</b> — халяль (по запросу)</span>
          <span><span className="inline-block w-3 h-3 bg-purple-500 rounded-sm align-middle mr-0.5" /><b className="font-semibold">Дети</b> — безопасно для детей</span>
        </div>

        {/* Catalog grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[640px] overflow-y-auto pr-1 -mr-1">
          {filtered.map(dish => {
            const isSelected = selectedIds.has(dish.id);
            const hasExcludedAllergen = excludedAllergens.size > 0 && dish.allergens.some(a => excludedAllergens.has(a));
            const dimmed = allergenMode === 'highlight' && hasExcludedAllergen;
            // Опасные аллергены (орехи, арахис) — аларм по умолчанию, без активации фильтра
            const hasNuts = dish.allergens.some(a => a === 'nuts' || a === 'peanuts');
            const isKidsFormat = formatFilter === 'detskoe';
            const alarmNutsInKids = hasNuts && isKidsFormat;
            return (
              <div
                key={dish.id}
                draggable
                onDragStart={e => handleCatalogDragStart(e, dish.id)}
                className={`rounded-xl border bg-card overflow-hidden transition-all cursor-grab active:cursor-grabbing ${
                  isSelected
                    ? 'border-gold-text ring-1 ring-gold-text opacity-60'
                    : dimmed
                    ? 'border-destructive/40 opacity-50'
                    : alarmNutsInKids
                    ? 'border-destructive/60 ring-1 ring-destructive/40'
                    : 'border-line hover:border-gold-text hover:shadow-sm'
                }`}
              >
                <div className="aspect-square bg-secondary flex items-center justify-center text-3xl relative">
                  <span>{STATION_EMOJI[dish.station] || '🍽️'}</span>
                  {isSelected && (
                    <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-gold-text text-white text-xs flex items-center justify-center font-bold">✓</div>
                  )}
                  {/* Diet badges */}
                  <div className="absolute top-1 left-1 flex gap-0.5">
                    {dish.dietBadges.includes('vegan') && <span className="text-[10px] bg-emerald-600 text-white px-1 py-0.5 rounded font-bold">VG</span>}
                    {dish.dietBadges.includes('gluten-free') && <span className="text-[10px] bg-amber-500 text-white px-1 py-0.5 rounded font-bold">GF</span>}
                    {dish.dietBadges.includes('halal') && <span className="text-[10px] bg-blue-500 text-white px-1 py-0.5 rounded font-bold">H</span>}
                    {dish.childFriendly && <span className="text-[10px] bg-purple-500 text-white px-1 py-0.5 rounded font-bold">Дети</span>}
                  </div>
                  {/* Allergen warning badge */}
                  {hasExcludedAllergen && (
                    <div className="absolute bottom-1 left-1 right-1 text-[10px] bg-destructive text-white px-1 py-0.5 rounded text-center font-semibold">
                      ⚠ {dish.allergens.filter(a => excludedAllergens.has(a)).map(a => ALLERGEN_EMOJI[a] || '·').join(' ')}
                    </div>
                  )}
                  {/* Nuts alarm — по умолчанию в детском меню */}
                  {alarmNutsInKids && !hasExcludedAllergen && (
                    <div className="absolute bottom-1 left-1 right-1 text-[10px] bg-destructive text-white px-1 py-0.5 rounded text-center font-semibold">
                      ⚠ 🥜 Орехи
                    </div>
                  )}
                </div>
                <div className="p-2">
                  <h4 className="text-xs font-medium leading-tight mb-0.5 line-clamp-2">{dish.name}</h4>
                  {/* Compact allergen tags */}
                  {dish.allergens.length > 0 && (
                    <div className="flex flex-wrap gap-0.5 mb-1">
                      {dish.allergens.slice(0, 4).map(a => (
                        <span key={a} className={`text-[10px] px-1 py-0.5 rounded leading-none ${
                          a === 'nuts' || a === 'peanuts' ? 'bg-destructive/20 text-destructive font-semibold' : 'bg-muted text-muted-foreground'
                        }`} title={ALLERGEN_LABEL[a]}>
                          {ALLERGEN_LABEL[a]}
                        </span>
                      ))}
                      {dish.allergens.length > 4 && (
                        <span className="text-[10px] bg-muted text-muted-foreground px-1 py-0.5 rounded leading-none">+{dish.allergens.length - 4}</span>
                      )}
                    </div>
                  )}
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[11px] text-gold-text font-semibold whitespace-nowrap">{dish.pricePerGuest} ₽</span>
                    <button
                      onClick={() => isSelected ? onRemove(dish.id) : onAdd(dish.id)}
                      disabled={isSelected}
                      className={`text-xs px-2 py-0.5 rounded font-medium transition-colors ${
                        isSelected
                          ? 'bg-muted text-muted-foreground cursor-not-allowed'
                          : 'bg-gold-text text-white hover:bg-gold-text/90'
                      }`}
                      aria-label={isSelected ? 'Уже добавлено' : 'Добавить в меню'}
                    >
                      {isSelected ? '✓' : '+ Добавить'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-10 text-sm text-muted-foreground">
            <p className="mb-2">Ничего не найдено — попробуйте изменить фильтры</p>

            {/* Спец-баннер для халяль-фильтра */}
            {activeDiets.has('halal') && (
              <div className="mt-4 p-4 rounded-xl border border-gold-tint bg-gold-tint/30 max-w-md mx-auto text-left">
                <p className="text-sm font-medium text-foreground mb-1">☪️ Халяль-меню готовим под заказ</p>
                <p className="text-xs text-muted-foreground mb-2">
                  В базовом каталоге нет сертифицированных халяль-блюд, но мы готовим их на отдельной линии
                  по запросу — от 3 рабочих дней. Курица, говядина, баранина без свинины и алкоголя.
                </p>
                <a href="/menu/halal" className="text-xs text-gold-text font-semibold hover:underline">
                  Подробнее про халяль-меню →
                </a>
              </div>
            )}

            {(excludedAllergens.size > 0 || activeDiets.size > 0) && (
              <button
                onClick={() => { setExcludedAllergens(new Set()); setActiveDiets(new Set()); }}
                className="text-xs text-gold-text hover:underline mt-3"
              >
                Сбросить все фильтры
              </button>
            )}
          </div>
        )}
      </div>

      {/* === КОРЗИНА (Droppable) === */}
      <div
        onDragOver={e => handleCartDragOver(e)}
        onDragLeave={() => { setDragOverCart(false); setDragOverIdx(null); }}
        onDrop={e => handleCartDrop(e)}
        className={`rounded-2xl border-2 border-dashed p-4 transition-colors sticky top-20 self-start max-h-[calc(100vh-6rem)] overflow-y-auto ${
          dragOverCart ? 'border-gold-text bg-gold-tint/40' : 'border-line bg-card/50'
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-heading text-lg font-medium">{cartTitle}</h3>
          {selectedItems.length > 0 && (
            <span className="text-xs bg-gold-tint text-gold-text px-2 py-0.5 rounded-full font-semibold">
              {selectedItems.length}
            </span>
          )}
        </div>

        {selectedItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-3 opacity-50">🍽️</div>
            <p className="text-sm text-muted-foreground px-4">{emptyCartText}</p>
            <p className="text-[10px] text-muted-foreground/70 mt-2">💡 На мобильном — просто нажмите «+ Добавить»</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {selectedItems.map((item, idx) => {
              const dish = ALL_DISHES.find(d => d.id === item.dishId);
              if (!dish) return null;
              const isDragging = draggedFromIdx === idx;
              const isDropTarget = dragOverIdx === idx;
              // Check if dish has excluded allergen (warning in cart)
              const excludedInDish = dish.allergens.filter(a => excludedAllergens.has(a));
              return (
                <li
                  key={item.dishId}
                  draggable={enableReorder}
                  onDragStart={e => handleCartDragStart(e, idx)}
                  onDragEnd={handleCartDragEnd}
                  onDragOver={e => handleCartDragOver(e, idx)}
                  onDrop={e => { e.stopPropagation(); handleCartDrop(e, idx); }}
                  className={`rounded-xl border bg-card p-2.5 transition-all ${
                    isDragging ? 'opacity-40' : ''
                  } ${
                    isDropTarget ? 'border-gold-text ring-2 ring-gold-text/30' : 'border-line'
                  } ${excludedInDish.length > 0 ? 'border-destructive/40 bg-destructive/5' : ''}`}
                >
                  <div className="flex gap-2.5">
                    {/* Drag handle (desktop) + ↑↓ buttons (mobile/always) */}
                    {enableReorder && (
                      <div className="flex flex-col items-center gap-0.5">
                        <button
                          onClick={() => moveItem(idx, -1)}
                          disabled={idx === 0}
                          className="text-[10px] text-muted-foreground hover:text-gold-text disabled:opacity-30 disabled:cursor-not-allowed px-1"
                          aria-label="Поднять вверх"
                        >▲</button>
                        <div className="text-muted-foreground/40 select-none hidden lg:block cursor-grab" aria-hidden="true">⠿</div>
                        <button
                          onClick={() => moveItem(idx, 1)}
                          disabled={idx === selectedItems.length - 1}
                          className="text-[10px] text-muted-foreground hover:text-gold-text disabled:opacity-30 disabled:cursor-not-allowed px-1"
                          aria-label="Опустить вниз"
                        >▼</button>
                      </div>
                    )}
                    {/* Image placeholder */}
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-lg shrink-0">
                      {STATION_EMOJI[dish.station] || '🍽️'}
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-medium leading-tight mb-0.5 line-clamp-1">{dish.name}</h4>
                      <div className="flex items-center gap-1 flex-wrap">
                        <span className="text-[10px] text-muted-foreground">{DISH_CATEGORIES[dish.station] || dish.station}</span>
                        {/* Diet badges in cart */}
                        {dish.dietBadges.includes('vegan') && <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1 rounded">VG</span>}
                        {dish.dietBadges.includes('gluten-free') && <span className="text-[10px] bg-amber-100 text-amber-700 px-1 rounded">GF</span>}
                        {dish.childFriendly && <span className="text-[10px] bg-purple-100 text-purple-700 px-1 rounded">Дети</span>}
                        {/* Allergen tags in cart */}
                        {dish.allergens.slice(0, 3).map(a => (
                          <span key={a} className={`text-[10px] px-1 rounded ${excludedAllergens.has(a) ? 'bg-destructive text-white font-semibold' : 'bg-muted text-muted-foreground'}`}>
                            {ALLERGEN_EMOJI[a]} {ALLERGEN_LABEL[a]}
                          </span>
                        ))}
                        {dish.allergens.length > 3 && (
                          <span className="text-[10px] bg-muted text-muted-foreground px-1 rounded">+{dish.allergens.length - 3}</span>
                        )}
                      </div>
                      {excludedInDish.length > 0 && (
                        <p className="text-[10px] text-destructive font-medium mt-0.5">
                          ⚠ Содержит исключённый аллерген!
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-1.5">
                        <span className="text-[11px] text-gold-text font-semibold">
                          {dish.pricePerGuest} ₽ × {item.qty} {unit} = {(dish.pricePerGuest * item.qty).toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                    </div>
                    {/* Qty controls */}
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => onSetQty(item.dishId, item.qty - 1)}
                          className="w-6 h-6 rounded-full border border-line flex items-center justify-center text-xs hover:border-gold-text hover:text-gold-text transition-colors"
                          aria-label="Уменьшить"
                        >
                          −
                        </button>
                        <span className="text-xs font-semibold w-5 text-center tabular-nums">{item.qty}</span>
                        <button
                          onClick={() => onSetQty(item.dishId, item.qty + 1)}
                          className="w-6 h-6 rounded-full border border-line flex items-center justify-center text-xs hover:border-gold-text hover:text-gold-text transition-colors"
                          aria-label="Увеличить"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => onRemove(item.dishId)}
                        className="text-[10px] text-muted-foreground hover:text-destructive transition-colors"
                        aria-label="Удалить"
                      >
                        ✕ удалить
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {/* Helper hint */}
        {selectedItems.length > 0 && enableReorder && (
          <p className="text-[10px] text-muted-foreground/70 mt-3 text-center">
            ⟲ Перетащите карточку или используйте ▲▼ для порядка
          </p>
        )}
      </div>
    </div>
  );
}
