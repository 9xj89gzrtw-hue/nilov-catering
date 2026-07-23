'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import type { TariffOffer } from '@/lib/tariff-offers';
import { ALL_DISHES } from '@/lib/menu-data';
import { DISH_CATEGORIES } from '@/lib/menu-data';

const TIER_COLORS: Record<string, string> = {
  economy: 'bg-slate-100 border-slate-300',
  standard: 'bg-blue-50 border-blue-300',
  premium: 'bg-amber-50 border-amber-300',
  luxury: 'bg-purple-50 border-purple-300',
};

const TIER_BADGES: Record<string, { bg: string; text: string }> = {
  economy: { bg: 'bg-slate-200 text-slate-700', text: 'Эконом' },
  standard: { bg: 'bg-blue-200 text-blue-800', text: 'Стандарт' },
  premium: { bg: 'bg-amber-200 text-amber-800', text: 'Расширенный' },
  luxury: { bg: 'bg-purple-200 text-purple-800', text: 'Максимальный' },
};

const STATION_EMOJI: Record<string, string> = {
  cold: '🥗', hot: '🍖', desserts: '🍰', drinks: '🥂', show: '🔥',
};

function groupBy<T>(arr: T[], key: (item: T) => string): Map<string, T[]> {
  const map = new Map<string, T[]>();
  for (const item of arr) {
    const k = key(item);
    if (!map.has(k)) map.set(k, []);
    map.get(k)!.push(item);
  }
  return map;
}

// Хелпер: смапить dishId из composition → Dish из каталога (если он там есть)
function findDishById(dishId: string) {
  return ALL_DISHES.find(d => d.id === dishId);
}

export default function TariffOfferCard({ offer }: { offer: TariffOffer }) {
  const [expanded, setExpanded] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // Локальный редактируемый состав: dishId → qty (числовое значение, 1 по умолчанию)
  const [customItems, setCustomItems] = useState<{ dishId: string; qty: number; name: string; desc: string; category: string }[]>([]);
  const [showCatalog, setShowCatalog] = useState(false);
  const [catalogSearch, setCatalogSearch] = useState('');
  const [catalogStation, setCatalogStation] = useState<string>('all');

  // При открытии редактора: загрузить исходный состав тарифа
  useEffect(() => {
    if (editMode && customItems.length === 0) {
      setCustomItems(offer.composition.map(c => ({
        dishId: c.dishId,
        qty: 1,
        name: c.name,
        desc: c.desc,
        category: c.category,
      })));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editMode]);

  const colors = TIER_COLORS[offer.tier] || TIER_COLORS.standard;
  const badge = TIER_BADGES[offer.tier] || TIER_BADGES.standard;

  // Group original composition by category
  const categories = groupBy(offer.composition, d => d.category);

  // === Edit mode logic ===

  const removeDish = (dishId: string) => {
    setCustomItems(items => items.filter(i => i.dishId !== dishId));
  };

  const setQty = (dishId: string, qty: number) => {
    const next = Math.max(1, Math.min(20, qty));
    setCustomItems(items => items.map(i => i.dishId === dishId ? { ...i, qty: next } : i));
  };

  const addDish = (dishId: string) => {
    if (customItems.some(i => i.dishId === dishId)) return;
    const dish = findDishById(dishId);
    if (!dish) return;
    setCustomItems(items => [...items, {
      dishId,
      qty: 1,
      name: dish.name,
      desc: dish.description,
      category: DISH_CATEGORIES[dish.station] || dish.station,
    }]);
  };

  const resetToOriginal = () => {
    setCustomItems(offer.composition.map(c => ({
      dishId: c.dishId, qty: 1, name: c.name, desc: c.desc, category: c.category,
    })));
  };

  // Расчёт цены за гостя на основе редактируемого состава
  const editedPricePerGuest = useMemo(() => {
    return customItems.reduce((sum, item) => {
      const dish = findDishById(item.dishId);
      const price = dish?.pricePerGuest ?? 0;
      return sum + price * item.qty;
    }, 0);
  }, [customItems]);

  // Live diff vs original price
  const priceDiff = editedPricePerGuest - offer.pricePerGuest;

  // Filtered catalog for picker
  const filteredCatalog = useMemo(() => {
    let dishes = ALL_DISHES;
    if (catalogStation !== 'all') dishes = dishes.filter(d => d.station === catalogStation);
    if (catalogSearch.trim()) {
      const q = catalogSearch.toLowerCase();
      dishes = dishes.filter(d => d.name.toLowerCase().includes(q) || d.description.toLowerCase().includes(q));
    }
    return dishes;
  }, [catalogStation, catalogSearch]);

  const customItemIds = new Set(customItems.map(i => i.dishId));
  const customCategories = groupBy(customItems, d => d.category);

  return (
    <div className={`rounded-2xl border-2 ${colors} bg-white overflow-hidden transition-shadow hover:shadow-lg`}>
      {/* Header */}
      <div className="p-6 pb-0">
        <div className="flex items-start justify-between mb-3">
          <div>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${badge.bg}`}>
              {offer.tierLabel}
            </span>
            <h3 className="text-2xl font-heading font-semibold mt-2 text-foreground">
              {offer.eventName} · {offer.tierLabel}
            </h3>
          </div>
          <div className="text-right shrink-0">
            <div className="text-3xl font-heading font-bold text-gold-text tabular-nums">
              {(editMode ? editedPricePerGuest : offer.pricePerGuest).toLocaleString('ru-RU')} ₽
            </div>
            <div className="text-xs text-muted-foreground">за гостя</div>
            {editMode && priceDiff !== 0 && (
              <div className={`text-xs font-medium mt-1 ${priceDiff > 0 ? 'text-warning' : 'text-success'}`}>
                {priceDiff > 0 ? '+' : ''}{priceDiff.toLocaleString('ru-RU')} ₽ к базовому
              </div>
            )}
          </div>
        </div>

        <p className="text-muted-foreground mb-3">{offer.description}</p>

        {/* Highlights */}
        <div className="flex flex-wrap gap-2 mb-4">
          {offer.highlights.map((h, i) => (
            <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary text-xs font-medium text-foreground">
              <span className="text-gold-text">✦</span> {h}
            </span>
          ))}
        </div>

        <div className="text-sm text-muted-foreground">
          Мин. гостей: <strong className="text-foreground">{offer.minGuests}</strong>
        </div>
      </div>

      {/* === Edit mode === */}
      {editMode && (
        <div className="px-6 pt-4">
          {/* Custom composition */}
          <div className="rounded-xl border border-line bg-secondary/30 p-4 mb-3">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold">Ваш отредактированный состав ({customItems.length})</h4>
              <button
                onClick={resetToOriginal}
                className="text-xs text-muted-foreground hover:text-gold-text transition-colors"
              >
                ↺ Сбросить к оригиналу
              </button>
            </div>
            {customItems.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-4">Все блюда убраны. Добавьте что-нибудь из каталога ниже.</p>
            ) : (
              <ul className="space-y-2 max-h-72 overflow-y-auto">
                {Array.from(customCategories.entries()).map(([cat, dishes]) => (
                  <li key={cat}>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">{cat}</div>
                    <ul className="space-y-1.5">
                      {dishes.map((d) => {
                        const dish = findDishById(d.dishId);
                        const price = dish?.pricePerGuest ?? 0;
                        return (
                          <li key={d.dishId} className="flex items-start gap-2 py-1.5 px-2 rounded bg-white border border-line/50">
                            <span className="text-base mt-0.5">{dish ? STATION_EMOJI[dish.station] : '🍽️'}</span>
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-medium text-foreground">{d.name}</div>
                              {d.desc && <p className="text-[10px] text-muted-foreground line-clamp-1">{d.desc}</p>}
                              <div className="text-[10px] text-gold-text font-semibold mt-0.5">{price} ₽ × {d.qty} = {price * d.qty} ₽</div>
                            </div>
                            <div className="flex items-center gap-1">
                              <button onClick={() => setQty(d.dishId, d.qty - 1)} className="w-5 h-5 rounded border border-line text-xs hover:border-gold-text">−</button>
                              <span className="text-xs font-semibold w-4 text-center">{d.qty}</span>
                              <button onClick={() => setQty(d.dishId, d.qty + 1)} className="w-5 h-5 rounded border border-line text-xs hover:border-gold-text">+</button>
                              <button onClick={() => removeDish(d.dishId)} className="text-[10px] text-muted-foreground hover:text-destructive ml-1">✕</button>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Add dish picker */}
          <button
            onClick={() => setShowCatalog(!showCatalog)}
            className="w-full flex items-center justify-between py-2.5 px-4 rounded-lg bg-gold-tint/50 hover:bg-gold-tint text-sm font-medium transition-colors mb-3"
          >
            <span>{showCatalog ? 'Скрыть каталог' : '+ Добавить блюдо из каталога'}</span>
            <svg className={`w-4 h-4 transition-transform ${showCatalog ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" /></svg>
          </button>

          {showCatalog && (
            <div className="rounded-xl border border-line bg-white p-3 mb-3">
              <input
                type="search"
                placeholder="Поиск блюда…"
                value={catalogSearch}
                onChange={e => setCatalogSearch(e.target.value)}
                className="w-full rounded-lg border border-line bg-card px-3 py-2 text-xs mb-2 focus:outline-none focus:border-gold-text"
              />
              <div className="flex flex-wrap gap-1 mb-2">
                {[
                  { k: 'all', l: 'Все' },
                  { k: 'cold', l: '🥗 Холодные' },
                  { k: 'hot', l: '🍖 Горячее' },
                  { k: 'desserts', l: '🍰 Десерты' },
                  { k: 'drinks', l: '🥂 Напитки' },
                ].map(s => (
                  <button key={s.k} onClick={() => setCatalogStation(s.k)}
                    className={`rounded-full px-2 py-0.5 text-[10px] border transition-colors ${
                      catalogStation === s.k ? 'border-gold-text bg-gold-tint text-gold-text' : 'border-line text-muted-foreground hover:border-gold-text'
                    }`}>{s.l}</button>
                ))}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-72 overflow-y-auto">
                {filteredCatalog.map(dish => {
                  const isSelected = customItemIds.has(dish.id);
                  return (
                    <div key={dish.id} className={`rounded-lg border p-2 ${isSelected ? 'border-gold-text bg-gold-tint/30 opacity-60' : 'border-line bg-card hover:border-gold-text'}`}>
                      <div className="text-2xl mb-1">{STATION_EMOJI[dish.station]}</div>
                      <h5 className="text-[11px] font-medium leading-tight mb-0.5 line-clamp-2">{dish.name}</h5>
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] text-gold-text font-semibold">{dish.pricePerGuest} ₽</span>
                        <button
                          onClick={() => isSelected ? null : addDish(dish.id)}
                          disabled={isSelected}
                          className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                            isSelected ? 'bg-muted text-muted-foreground cursor-not-allowed' : 'bg-gold-text text-white hover:bg-gold-text/90'
                          }`}
                        >
                          {isSelected ? '✓' : '+ Добавить'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <button
              onClick={() => setEditMode(false)}
              className="inline-flex items-center gap-1 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              ✓ Готово
            </button>
            <button
              onClick={() => { setEditMode(false); setExpanded(true); }}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              Отмена
            </button>
          </div>
        </div>
      )}

      {/* Composition (read-only) — collapsed/expanded — shown only in non-edit mode */}
      {!editMode && (
        <div className="px-6 pb-6 mt-4">
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-center justify-between py-2.5 px-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors text-sm font-medium"
          >
            <span>
              {expanded ? 'Скрыть состав' : 'Показать полный состав меню'} ({offer.composition.length} позиций)
            </span>
            <svg className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" /></svg>
          </button>

          {expanded && (
            <div className="mt-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
              {Array.from(categories.entries()).map(([cat, dishes]) => (
                <div key={cat}>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">{cat}</h4>
                  <ul className="space-y-2">
                    {dishes.map((d, i) => (
                      <li key={i} className="py-1.5 border-b border-line/30 last:border-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <span className="text-sm text-foreground font-medium">{d.name}</span>
                            {d.desc && <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{d.desc}</p>}
                          </div>
                          <span className="text-xs text-muted-foreground shrink-0 mt-0.5">{d.qty}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="px-6 pb-6 flex flex-wrap gap-3">
        <button
          className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2.5 text-sm font-medium hover:bg-secondary transition-colors"
          onClick={() => { setEditMode(true); setExpanded(false); }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 5v14M5 12h14" />
          </svg>
          {editMode ? 'Редактирую…' : 'Настроить меню'}
        </button>

        <button
          className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2.5 text-sm font-medium hover:bg-secondary transition-colors"
          onClick={() => window.print()}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
            <path d="M6 14h12v8H6z" />
          </svg>
          Скачать PDF
        </button>

        <Link
          href={`/plan/constructor?format=${offer.eventId}&tier=${offer.tier}`}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Собрать с нуля
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
