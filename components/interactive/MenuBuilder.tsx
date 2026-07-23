'use client';

import { useState, useMemo } from 'react';
import { ALL_DISHES, DISH_CATEGORIES, DIET_FILTERS } from '@/lib/menu-data';
import type { Dish, Diet } from '@/lib/types';
import { ALLERGEN_LABEL } from '@/lib/types';

const STATIONS = [
  { key: 'all', label: 'Все' },
  { key: 'cold', label: 'Холодные' },
  { key: 'hot', label: 'Горячее' },
  { key: 'desserts', label: 'Десерты' },
  { key: 'drinks', label: 'Напитки' },
] as const;

const DIETS: Diet[] = ['vegan', 'gluten-free', 'halal'];

const STATION_EMOJI: Record<string, string> = {
  cold: '🥗',
  hot: '🍖',
  desserts: '🍰',
  drinks: '🥂',
  show: '🔥',
};

export interface MenuBuilderProps {
  // Список выбранных блюд: dishId → qty
  selectedItems: { dishId: string; qty: number }[];
  onAdd: (dishId: string) => void;
  onRemove: (dishId: string) => void;
  onSetQty: (dishId: string, qty: number) => void;
  onReorder?: (fromIdx: number, toIdx: number) => void;
  // Фильтр по формату (только блюда этого формата показываются в каталоге)
  formatFilter?: string;
  // Заголовок каталога и корзины
  catalogTitle?: string;
  cartTitle?: string;
  // Мин. кол-во порций для корзины доставки (опционально)
  emptyCartText?: string;
  // Метка единицы измерения (по умолчанию "порц.")
  unit?: string;
  // Показать кнопку drag-reorder в корзине
  enableReorder?: boolean;
}

export default function MenuBuilder({
  selectedItems,
  onAdd,
  onRemove,
  onSetQty,
  onReorder,
  formatFilter,
  catalogTitle = 'Каталог блюд',
  cartTitle = 'Ваше меню',
  emptyCartText = 'Перетащите блюда сюда или нажмите «+»',
  unit = 'порц.',
  enableReorder = true,
}: MenuBuilderProps) {
  const [search, setSearch] = useState('');
  const [station, setStation] = useState<string>('all');
  const [activeDiets, setActiveDiets] = useState<Set<string>>(new Set());
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);
  const [draggedFromIdx, setDraggedFromIdx] = useState<number | null>(null);
  const [dragOverCart, setDragOverCart] = useState(false);

  const toggleDiet = (d: string) => {
    const next = new Set(activeDiets);
    if (next.has(d)) next.delete(d); else next.add(d);
    setActiveDiets(next);
  };

  const selectedIds = useMemo(() => new Set(selectedItems.map(i => i.dishId)), [selectedItems]);

  const filtered = useMemo(() => {
    let dishes: Dish[] = ALL_DISHES;
    if (formatFilter) {
      dishes = dishes.filter(d => d.format.includes(formatFilter as Dish['format'][number]));
    }
    if (station !== 'all') dishes = dishes.filter(d => d.station === station);
    if (activeDiets.size > 0) {
      dishes = dishes.filter(d => [...activeDiets].every(diet => d.dietBadges.includes(diet as Diet)));
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      dishes = dishes.filter(d => d.name.toLowerCase().includes(q) || d.description.toLowerCase().includes(q));
    }
    return dishes;
  }, [station, activeDiets, search, formatFilter]);

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
        // Drop on specific item → insert before it; drop on container → append to end
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

  return (
    <div className="grid lg:grid-cols-[1fr_400px] gap-6">
      {/* === КАТАЛОГ === */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-heading text-lg font-medium">{catalogTitle}</h3>
          <span className="text-xs text-muted-foreground">{filtered.length} доступно</span>
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

        {/* Diet filters */}
        <div className="flex flex-wrap gap-1.5 mb-4">
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

        {/* Catalog grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[640px] overflow-y-auto pr-1 -mr-1">
          {filtered.map(dish => {
            const isSelected = selectedIds.has(dish.id);
            return (
              <div
                key={dish.id}
                draggable
                onDragStart={e => handleCatalogDragStart(e, dish.id)}
                className={`rounded-xl border bg-card overflow-hidden transition-all cursor-grab active:cursor-grabbing ${
                  isSelected
                    ? 'border-gold-text ring-1 ring-gold-text opacity-60'
                    : 'border-line hover:border-gold-text hover:shadow-sm'
                }`}
              >
                <div className="aspect-square bg-secondary flex items-center justify-center text-3xl relative">
                  <span>{STATION_EMOJI[dish.station] || '🍽️'}</span>
                  {isSelected && (
                    <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-gold-text text-white text-xs flex items-center justify-center font-bold">✓</div>
                  )}
                  {dish.dietBadges.includes('vegan') && (
                    <span className="absolute top-1 left-1 text-[9px] bg-emerald-600 text-white px-1 py-0.5 rounded font-bold">VG</span>
                  )}
                  {dish.dietBadges.includes('gluten-free') && !dish.dietBadges.includes('vegan') && (
                    <span className="absolute top-1 left-1 text-[9px] bg-amber-500 text-white px-1 py-0.5 rounded font-bold">GF</span>
                  )}
                </div>
                <div className="p-2">
                  <h4 className="text-xs font-medium leading-tight mb-0.5 line-clamp-2">{dish.name}</h4>
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
                      {isSelected ? '✓' : '+'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-10 text-sm text-muted-foreground">
            Ничего не найдено — попробуйте изменить фильтры
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
          </div>
        ) : (
          <ul className="space-y-2">
            {selectedItems.map((item, idx) => {
              const dish = ALL_DISHES.find(d => d.id === item.dishId);
              if (!dish) return null;
              const isDragging = draggedFromIdx === idx;
              const isDropTarget = dragOverIdx === idx;
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
                  } ${enableReorder ? 'cursor-grab active:cursor-grabbing' : ''}`}
                >
                  <div className="flex gap-2.5">
                    {/* Drag handle */}
                    {enableReorder && (
                      <div className="text-muted-foreground/40 select-none flex items-center cursor-grab" aria-hidden="true">
                        ⠿
                      </div>
                    )}
                    {/* Image placeholder */}
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-lg shrink-0">
                      {STATION_EMOJI[dish.station] || '🍽️'}
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-medium leading-tight mb-0.5 line-clamp-1">{dish.name}</h4>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-muted-foreground">{DISH_CATEGORIES[dish.station] || dish.station}</span>
                        {dish.allergens.length > 0 && (
                          <span className="text-[10px] text-muted-foreground/70" title={dish.allergens.map(a => ALLERGEN_LABEL[a]).join(', ')}>
                            ⚠ {dish.allergens.length}
                          </span>
                        )}
                      </div>
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
            ⟲ Перетащите карточку, чтобы изменить порядок
          </p>
        )}
      </div>
    </div>
  );
}
