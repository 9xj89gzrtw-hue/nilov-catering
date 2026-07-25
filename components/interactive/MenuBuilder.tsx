'use client';

import { useState, useMemo } from 'react';
import { ALL_DISHES, DISH_CATEGORIES, DIET_FILTERS } from '@/lib/menu-data';
import { getDishImage, getObjectPositionForDish } from '@/lib/dish-images';
import {
  DndContext,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  useDraggable,
  useDroppable,
  closestCenter,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import FoodPhoto from '@/components/common/FoodPhoto';
import type { Dish, Diet, Allergen } from '@/lib/types';
import { ALLERGEN_LABEL } from '@/lib/types';

const STATIONS = [
  { key: 'all', label: 'Все' },
  { key: 'cold', label: 'Холодные' },
  { key: 'hot', label: 'Горячее' },
  { key: 'desserts', label: 'Десерты' },
  { key: 'drinks', label: 'Напитки' },
] as const;

const DIETS: Diet[] = ['vegan', 'gluten-free', 'halal', 'sugar-free', 'nut-free'];

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
  emptyCartText = 'Нажмите «+ Добавить» на блюде или перетащите его сюда',
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
  const [showAllFormats, setShowAllFormats] = useState(false);
  const [isDraggingOverCart, setIsDraggingOverCart] = useState(false);
  const [activeDragId, setActiveDragId] = useState<string | null>(null);

  // dnd-kit sensors: PointerSensor (desktop), TouchSensor (mobile), KeyboardSensor (a11y)
  // TouchSensor with delay prevents accidental drags when scrolling
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveDragId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveDragId(null);
    setIsDraggingOverCart(false);
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Case 1: dragging catalog dish → cart zone (add to cart)
    if (activeId.startsWith('dish-') && (overId === 'cart-dropzone' || overId === 'cart-empty')) {
      const dishId = activeId.replace('dish-', '');
      if (!selectedIds.has(dishId)) onAdd(dishId);
      return;
    }

    // Case 2: dragging cart item → reorder
    if (activeId.startsWith('cart-item-') && overId.startsWith('cart-item-') && onReorder) {
      const fromIdx = parseInt(activeId.replace('cart-item-', ''));
      const toIdx = parseInt(overId.replace('cart-item-', ''));
      if (fromIdx !== toIdx) onReorder(fromIdx, toIdx);
      return;
    }

    // Case 3: dragging catalog dish over a cart item — add to cart at that position
    if (activeId.startsWith('dish-') && overId.startsWith('cart-item-')) {
      const dishId = activeId.replace('dish-', '');
      if (!selectedIds.has(dishId)) onAdd(dishId);
      return;
    }
  };

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

  // Touch-friendly: move item up/down via buttons (works without drag)
  const moveItem = (idx: number, direction: -1 | 1) => {
    if (!onReorder) return;
    const toIdx = idx + direction;
    if (toIdx < 0 || toIdx >= selectedItems.length) return;
    onReorder(idx, toIdx);
  };

  // Cart sortable ids
  const cartItemIds = selectedItems.map((_, idx) => `cart-item-${idx}`);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => { setActiveDragId(null); setIsDraggingOverCart(false); }}
    >
    <div className="grid md:grid-cols-[1fr_360px] lg:grid-cols-[1fr_400px] gap-4 md:gap-6">
      {/* === КАТАЛОГ === */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-heading text-lg font-medium">{catalogTitle}</h3>
          <span className="text-xs text-muted--foreground">
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
              className={`rounded-full border px-3 py-1.5 text-xs touch-target transition-colors ${
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
              className={`rounded-full border px-3 py-1.5 text-xs touch-target transition-colors ${
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
                  className={`text-xs px-3 py-1.5 rounded touch-target ${allergenMode === 'highlight' ? 'bg-card shadow-sm' : 'text-muted-foreground'}`}
                >
                  Подсветить
                </button>
                <button
                  onClick={() => setAllergenMode('hide')}
                  className={`text-xs px-3 py-1.5 rounded touch-target ${allergenMode === 'hide' ? 'bg-card shadow-sm' : 'text-muted-foreground'}`}
                >
                  Скрыть
                </button>
              </div>
            </div>
            <button
              onClick={() => setShowExtraAllergens(!showExtraAllergens)}
              className="text-xs text-muted-foreground hover:text-foreground touch-target px-2 py-1 transition-colors"
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
                  className={`text-xs px-2.5 py-1.5 rounded-full touch-target border transition-all ${
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

        {/* Drag hint */}
        <p className="text-[11px] text-muted-foreground mb-2 px-1">
          💡 Нажмите «+ Добавить» или перетащите карточку блюда в корзину. На телефоне — долгое нажатие.
        </p>

        {/* Catalog grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:max-h-[calc(100vh-8rem)] md:overflow-y-auto pr-1 -mr-1">
          {filtered.map(dish => {
            const isSelected = selectedIds.has(dish.id);
            const hasExcludedAllergen = excludedAllergens.size > 0 && dish.allergens.some(a => excludedAllergens.has(a));
            const dimmed = allergenMode === 'highlight' && hasExcludedAllergen;
            // Опасные аллергены (орехи, арахис) — аларм по умолчанию, без активации фильтра
            const hasNuts = dish.allergens.some(a => a === 'nuts' || a === 'peanuts');
            const isKidsFormat = formatFilter === 'detskoe';
            const alarmNutsInKids = hasNuts && isKidsFormat;
            return (
              <DraggableDishCard
                key={dish.id}
                dish={dish}
                isSelected={isSelected}
                dimmed={dimmed}
                alarmNutsInKids={alarmNutsInKids}
                hasExcludedAllergen={hasExcludedAllergen}
                excludedAllergens={excludedAllergens}
                isKidsFormat={isKidsFormat}
                onAdd={onAdd}
                onRemove={onRemove}
              />
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
                className="text-xs text-gold-text hover:underline mt-3 touch-target px-3 py-1.5 rounded"
              >
                Сбросить все фильтры
              </button>
            )}
          </div>
        )}
      </div>

      {/* === КОРЗИНА (Droppable) === */}
      <DroppableCart
        cartTitle={cartTitle}
        emptyCartText={emptyCartText}
        unit={unit}
        selectedItems={selectedItems}
        enableReorder={!!onReorder && enableReorder}
        excludedAllergens={excludedAllergens}
        isDraggingOver={isDraggingOverCart}
        onDragOverChange={setIsDraggingOverCart}
        activeDragId={activeDragId}
        onRemove={onRemove}
        onSetQty={onSetQty}
        onMoveItem={moveItem}
      />
    </div>
    </DndContext>
  );
}

// === DraggableDishCard ===
function DraggableDishCard({
  dish, isSelected, dimmed, alarmNutsInKids, hasExcludedAllergen, excludedAllergens, isKidsFormat,
  onAdd, onRemove,
}: {
  dish: Dish;
  isSelected: boolean;
  dimmed: boolean;
  alarmNutsInKids: boolean;
  hasExcludedAllergen: boolean;
  excludedAllergens: Set<Allergen>;
  isKidsFormat: boolean;
  onAdd: (dishId: string) => void;
  onRemove: (dishId: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `dish-${dish.id}`,
    disabled: isSelected, // disable drag for already-added dishes
  });

  const style: React.CSSProperties = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    opacity: isDragging ? 0.5 : undefined,
    zIndex: isDragging ? 50 : undefined,
    touchAction: 'none', // important for touch dragging
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      role="button"
      tabIndex={0}
      aria-label={`${dish.name}, ${dish.pricePerGuest} ₽. Нажмите Enter чтобы добавить в меню. Или перетащите в корзину.`}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (!isSelected) onAdd(dish.id); } }}
      className={`rounded-xl border bg-card overflow-hidden transition-all cursor-pointer ${
        isSelected
          ? 'border-gold-text ring-1 ring-gold-text opacity-60'
          : dimmed
          ? 'border-destructive/40 opacity-50'
          : alarmNutsInKids
          ? 'border-destructive/60 ring-1 ring-destructive/40'
          : 'border-line hover:border-gold-text hover:shadow-sm'
      } ${isDragging ? 'shadow-2xl ring-2 ring-gold-text' : ''}`}
    >
      <div className="aspect-square relative overflow-hidden bg-secondary group">
        <FoodPhoto
          src={getDishImage(dish.id, dish.station)}
          alt={dish.name}
          aspectRatio="square"
          objectPosition={getObjectPositionForDish(dish.id, dish.station)}
          className="w-full h-full"
        />
        {isSelected && (
          <div className="absolute top-1 right-1 z-10 w-5 h-5 rounded-full bg-gold-text text-white text-xs flex items-center justify-center font-bold">✓</div>
        )}
        {/* Diet badges */}
        <div className="absolute top-1 left-1 z-10 flex gap-0.5">
          {dish.dietBadges.includes('vegan') && <span className="text-[10px] bg-emerald-600 text-white px-1 py-0.5 rounded font-bold">VG</span>}
          {dish.dietBadges.includes('gluten-free') && <span className="text-[10px] bg-amber-500 text-white px-1 py-0.5 rounded font-bold">GF</span>}
          {dish.dietBadges.includes('halal') && <span className="text-[10px] bg-blue-500 text-white px-1 py-0.5 rounded font-bold">H</span>}
          {dish.dietBadges.includes('sugar-free') && <span className="text-[10px] bg-purple-600 text-white px-1 py-0.5 rounded font-bold" title="Без добавленного сахара — для СД1/СД2">SF</span>}
          {dish.dietBadges.includes('nut-free') && <span className="text-[10px] bg-red-500 text-white px-1 py-0.5 rounded font-bold" title="Без орехов — для анафилаксии">NF</span>}
          {dish.childFriendly && <span className="text-[10px] bg-purple-500 text-white px-1 py-0.5 rounded font-bold">Дети</span>}
        </div>
        {/* Allergen warning badge */}
        {hasExcludedAllergen && (
          <div className="absolute bottom-1 left-1 right-1 z-10 text-[10px] bg-destructive text-white px-1 py-0.5 rounded text-center font-semibold">
            ⚠ {dish.allergens.filter(a => excludedAllergens.has(a)).map(a => ALLERGEN_EMOJI[a] || '·').join(' ')}
          </div>
        )}
        {/* Nuts alarm — по умолчанию в детском меню */}
        {alarmNutsInKids && !hasExcludedAllergen && (
          <div className="absolute bottom-1 left-1 right-1 z-10 text-[10px] bg-destructive text-white px-1 py-0.5 rounded text-center font-semibold">
            ⚠ 🥜 Орехи
          </div>
        )}
      </div>
      <div className="p-2">
        <h4 className="text-xs font-medium leading-tight mb-0.5 line-clamp-2">{dish.name}</h4>
        {/* ХЕ (хлебные единицы) — extracted from description for СД1 visibility */}
        {dish.description.match(/ХЕ=([0-9.]+)/) && (
          <p className="text-[10px] text-purple-700 font-semibold mb-0.5">
            ХЕ={dish.description.match(/ХЕ=([0-9.]+)/)?.[1]} · для СД1
          </p>
        )}
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
          <span className="text-[11px] text-gold-text font-semibold whitespace-nowrap">{dish.pricePerGuest} ₽<span className="text-muted-foreground font-normal">/гость</span></span>
          <button
            onClick={(e) => { e.stopPropagation(); isSelected ? onRemove(dish.id) : onAdd(dish.id); }}
            disabled={isSelected}
            className={`text-xs px-3 py-1.5 rounded font-medium transition-colors touch-target ${
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
}

// === DroppableCart ===
function DroppableCart({
  cartTitle, emptyCartText, unit, selectedItems, enableReorder, excludedAllergens,
  isDraggingOver, onDragOverChange, activeDragId, onRemove, onSetQty, onMoveItem,
}: {
  cartTitle: string;
  emptyCartText: string;
  unit: string;
  selectedItems: { dishId: string; qty: number }[];
  enableReorder: boolean;
  excludedAllergens: Set<Allergen>;
  isDraggingOver: boolean;
  onDragOverChange: (v: boolean) => void;
  activeDragId: string | null;
  onRemove: (dishId: string) => void;
  onSetQty: (dishId: string, qty: number) => void;
  onMoveItem: (idx: number, direction: -1 | 1) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: 'cart-dropzone' });

  // Update parent state for visual feedback when isOver changes
  useMemo(() => {
    onDragOverChange(isOver && !!activeDragId?.startsWith('dish-'));
  }, [isOver, activeDragId, onDragOverChange]);

  const cartItemIds = selectedItems.map((_, idx) => `cart-item-${idx}`);

  return (
    <div
      ref={setNodeRef}
      className={`rounded-2xl border-2 border-dashed p-4 transition-colors sticky top-20 self-start max-h-[calc(100vh-6rem)] overflow-y-auto ${
        isOver && activeDragId?.startsWith('dish-')
          ? 'border-gold-text bg-gold-tint/40 scale-[1.02]'
          : 'border-line bg-card/50'
      }`}
      aria-live="polite"
      aria-label={`Корзина меню: ${selectedItems.length} ${selectedItems.length === 1 ? 'блюдо' : 'блюд'}`}
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
          <p className="text-[10px] text-muted-foreground/70 mt-2">💡 Нажмите «+ Добавить» на блюде или перетащите его сюда.</p>
        </div>
      ) : (
        <SortableContext items={cartItemIds} strategy={verticalListSortingStrategy}>
          <ul className="space-y-2">
            {selectedItems.map((item, idx) => {
              const dish = ALL_DISHES.find(d => d.id === item.dishId);
              if (!dish) return null;
              return (
                <SortableCartItem
                  key={item.dishId}
                  id={`cart-item-${idx}`}
                  dish={dish}
                  qty={item.qty}
                  unit={unit}
                  idx={idx}
                  total={selectedItems.length}
                  excludedAllergens={excludedAllergens}
                  enableReorder={enableReorder}
                  onRemove={onRemove}
                  onSetQty={onSetQty}
                  onMoveItem={onMoveItem}
                />
              );
            })}
          </ul>
        </SortableContext>
      )}

      {/* Helper hint */}
      {selectedItems.length > 0 && enableReorder && (
        <p className="text-[10px] text-muted-foreground/70 mt-3 text-center">
          ⟲ Перетащите карточку за ручку ⠿ или используйте ▲▼ для порядка блюд
        </p>
      )}
    </div>
  );
}

// === SortableCartItem ===
function SortableCartItem({
  id, dish, qty, unit, idx, total, excludedAllergens, enableReorder,
  onRemove, onSetQty, onMoveItem,
}: {
  id: string;
  dish: Dish;
  qty: number;
  unit: string;
  idx: number;
  total: number;
  excludedAllergens: Set<Allergen>;
  enableReorder: boolean;
  onRemove: (dishId: string) => void;
  onSetQty: (dishId: string, qty: number) => void;
  onMoveItem: (idx: number, direction: -1 | 1) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    zIndex: isDragging ? 50 : undefined,
    touchAction: 'none',
  };

  // Check if dish has excluded allergen (warning in cart)
  const excludedInDish = dish.allergens.filter(a => excludedAllergens.has(a));

  return (
    <li
      ref={setNodeRef}
      style={style}
      role="listitem"
      aria-label={`Блюдо ${idx + 1}: ${dish.name}. Перетащите за ручку ⠿ для перестановки или используйте кнопки ▲▼.`}
      className={`rounded-xl border bg-card p-2.5 transition-all ${
        isDragging ? 'border-gold-text ring-2 ring-gold-text shadow-lg' : 'border-line'
      } ${excludedInDish.length > 0 ? 'border-destructive/40 bg-destructive/5' : ''}`}
    >
      <div className="flex gap-2.5">
        {/* Drag handle (desktop + mobile via dnd-kit) + ↑↓ buttons */}
        {enableReorder && (
          <div className="flex flex-col items-center gap-0.5">
            <button
              onClick={() => onMoveItem(idx, -1)}
              disabled={idx === 0}
              className="text-xs text-muted-foreground hover:text-gold-text disabled:opacity-30 disabled:cursor-not-allowed px-2 py-1.5 touch-target rounded"
              aria-label="Поднять вверх"
            >▲</button>
            <button
              {...attributes}
              {...listeners}
              className="text-muted-foreground hover:text-gold-text cursor-grab active:cursor-grabbing px-2 py-1.5 touch-target rounded"
              aria-label="Перетащить для перестановки"
              title="Перетащите для перестановки"
            >⠿</button>
            <button
              onClick={() => onMoveItem(idx, 1)}
              disabled={idx === total - 1}
              className="text-xs text-muted-foreground hover:text-gold-text disabled:opacity-30 disabled:cursor-not-allowed px-2 py-1.5 touch-target rounded"
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
              {dish.pricePerGuest} ₽ × {qty} {unit} = {(dish.pricePerGuest * qty).toLocaleString('ru-RU')} ₽
            </span>
          </div>
        </div>
        {/* Qty controls */}
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1">
            <button
              onClick={() => onSetQty(dish.id, qty - 1)}
              className="w-9 h-9 rounded-full border border-line flex items-center justify-center text-sm hover:border-gold-text hover:text-gold-text transition-colors touch-target"
              aria-label="Уменьшить"
            >
              −
            </button>
            <span className="text-xs font-semibold w-5 text-center tabular-nums">{qty}</span>
            <button
              onClick={() => onSetQty(dish.id, qty + 1)}
              className="w-9 h-9 rounded-full border border-line flex items-center justify-center text-sm hover:border-gold-text hover:text-gold-text transition-colors touch-target"
              aria-label="Увеличить"
            >
              +
            </button>
          </div>
          <button
            onClick={() => onRemove(dish.id)}
            className="text-xs text-muted-foreground hover:text-destructive transition-colors px-2 py-1 touch-target rounded"
            aria-label="Удалить"
          >
            ✕ удалить
          </button>
        </div>
      </div>
    </li>
  );
}
