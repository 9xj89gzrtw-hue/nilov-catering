'use client';

import { useState, useEffect } from 'react';
import { ALL_TARIFF_OFFERS, type TariffOffer } from '@/lib/tariff-offers';
import { type Tier } from '@/lib/types';
import { ALL_DISHES, DISH_CATEGORIES } from '@/lib/menu-data';
import { getDishImage, FORMAT_HERO_IMAGES } from '@/lib/dish-images';
import FoodPhoto from '@/components/common/FoodPhoto';
import { ALLERGEN_LABEL } from '@/lib/types';
import Link from 'next/link';

interface Props {
  eventId?: string;
  eventName?: string;
  description?: string;
}

const EVENT_META: Record<string, { label: string; emoji: string; desc: string; gradient: string }> = {
  svadba:     { label: 'Свадьба',     emoji: '💍', desc: 'От камерной росписи до банкета на 200 гостей', gradient: 'from-rose-50 to-rose-100' },
  korporativ: { label: 'Корпоратив',  emoji: '💼', desc: 'Бизнес-ланчи, гала-ужины, тимбилдинги', gradient: 'from-sky-50 to-sky-100' },
  vypusknoy:  { label: 'Выпускной',   emoji: '🎓', desc: 'Школьные и студенческие выпускные', gradient: 'from-amber-50 to-amber-100' },
  chastnoe:   { label: 'Частное',     emoji: '🥂', desc: 'Дни рождения, юбилеи, семейные ужины', gradient: 'from-emerald-50 to-emerald-100' },
  detskoe:    { label: 'Детское',     emoji: '🎈', desc: 'Праздники с аниматорами и шоу', gradient: 'from-purple-50 to-purple-100' },
  'chef-at-home': { label: 'Шеф на дом', emoji: '👨‍🍳', desc: 'Шеф-повар и сомелье у вас дома', gradient: 'from-orange-50 to-orange-100' },
  'coffee-break': { label: 'Кофе-брейк', emoji: '☕', desc: 'Конференции, семинары, тренинги — от 390 ₽/гость', gradient: 'from-amber-50 to-yellow-100' },
};

// Маппинг событие → формат (для ссылки в конструктор)
const EVENT_TO_FORMAT: Record<string, string> = {
  svadba: 'banket',
  korporativ: 'banket',
  vypusknoy: 'banket',
  chastnoe: 'furshet',
  detskoe: 'detskoe',
  'chef-at-home': 'chef-at-home',
  'coffee-break': 'coffee-break',
};

const TIER_ORDER: Tier[] = ['economy', 'standard', 'premium', 'luxury'];

const STATION_EMOJI: Record<string, string> = {
  cold: '🥗', hot: '🍖', desserts: '🍰', drinks: '🥂', show: '🔥',
};

const ALLERGEN_EMOJI: Record<string, string> = {
  nuts: '🥜', peanuts: '🥜', fish: '🐟', milk: '🥛', eggs: '🥚', soy: '🌱',
  gluten: '🌾', crustaceans: '🦐', celery: '🌿', mustard: '🟡', sesame: '▪️',
  sulphites: '🍷', lupin: '🌼', molluscs: '🦪',
};

// Поиск блюда в каталоге по dishId (для аллергенов и цены)
function findDishById(dishId: string) {
  return ALL_DISHES.find(d => d.id === dishId);
}

// Полноценная карточка тарифа с edit-режимом
function TariffCard({ offer }: { offer: TariffOffer }) {
  const [expanded, setExpanded] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showCatalog, setShowCatalog] = useState(false);
  const [catalogSearch, setCatalogSearch] = useState('');
  const [catalogStation, setCatalogStation] = useState<string>('all');

  // Локальный редактируемый состав
  const [customItems, setCustomItems] = useState<{ dishId: string; qty: number; name: string; desc: string; category: string }[]>([]);

  useEffect(() => {
    if (editMode && customItems.length === 0) {
      setCustomItems(offer.composition.map(c => ({
        dishId: c.dishId, qty: 1, name: c.name, desc: c.desc, category: c.category,
      })));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editMode]);

  const isRec = offer.tier === 'standard';
  const colors = ['bg-slate-100', 'bg-blue-50', 'bg-amber-100', 'bg-purple-100'];
  const colorIdx = TIER_ORDER.indexOf(offer.tier);
  const color = colors[colorIdx >= 0 ? colorIdx : 1] || 'bg-amber-100';

  const CAT_ORDER = ['Канапе', 'Тарталетки', 'Закуски', 'Закуска', 'Премиум', 'Амюз-буш', 'Выпечка', 'Горячее', 'Завтрак', 'Шоу', 'Основное', 'Десерты', 'Десерт', 'Фрукты', 'Бар', 'Кофе', 'Напитки', 'Сыр', 'Брускетты'];

  // === Edit mode logic ===
  const removeDish = (dishId: string) => setCustomItems(items => items.filter(i => i.dishId !== dishId));
  const setQty = (dishId: string, qty: number) => {
    const next = Math.max(1, Math.min(20, qty));
    setCustomItems(items => items.map(i => i.dishId === dishId ? { ...i, qty: next } : i));
  };
  const addDish = (dishId: string) => {
    if (customItems.some(i => i.dishId === dishId)) return;
    const dish = findDishById(dishId);
    if (!dish) return;
    setCustomItems(items => [...items, {
      dishId, qty: 1, name: dish.name, desc: dish.description,
      category: DISH_CATEGORIES[dish.station] || dish.station,
    }]);
  };
  const resetToOriginal = () => {
    setCustomItems(offer.composition.map(c => ({
      dishId: c.dishId, qty: 1, name: c.name, desc: c.desc, category: c.category,
    })));
  };

  // Расчёт цены за гостя из редактируемого состава
  const editedPricePerGuest = customItems.reduce((sum, item) => {
    const dish = findDishById(item.dishId);
    const price = dish?.pricePerGuest ?? 0;
    return sum + price * item.qty;
  }, 0);
  const priceDiff = editedPricePerGuest - offer.pricePerGuest;

  // Каталог для picker'а
  const filteredCatalog = (() => {
    let dishes = ALL_DISHES;
    if (catalogStation !== 'all') dishes = dishes.filter(d => d.station === catalogStation);
    if (catalogSearch.trim()) {
      const q = catalogSearch.toLowerCase();
      dishes = dishes.filter(d => d.name.toLowerCase().includes(q) || d.description.toLowerCase().includes(q));
    }
    return dishes;
  })();
  const customItemIds = new Set(customItems.map(i => i.dishId));
  const customCategories = new Map<string, typeof customItems>();
  for (const item of customItems) {
    if (!customCategories.has(item.category)) customCategories.set(item.category, []);
    customCategories.get(item.category)!.push(item);
  }

  const displayPrice = editMode ? editedPricePerGuest : offer.pricePerGuest;

  return (
    <div className={`rounded-2xl border ${isRec ? 'border-gold-text ring-1 ring-gold-text' : 'border-line'} bg-card overflow-hidden hover:shadow-lg transition-shadow flex flex-col`}>
      <div className="p-5 border-b border-line">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <h3 className="font-heading text-lg font-semibold">{offer.tierLabel}</h3>
            {isRec && <span className="text-[10px] bg-gold-text text-white px-2 py-0.5 rounded-full font-semibold">Рекомендуем</span>}
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gold-text tabular-nums">{displayPrice.toLocaleString('ru-RU')} ₽</div>
            {editMode && priceDiff !== 0 && (
              <div className={`text-[10px] font-medium ${priceDiff > 0 ? 'text-warning' : 'text-success'}`}>
                {priceDiff > 0 ? '+' : ''}{priceDiff.toLocaleString('ru-RU')} ₽
              </div>
            )}
          </div>
        </div>
        <p className="text-sm text-muted-foreground">/ гость · мин. {offer.minGuests} гостей</p>
      </div>

      <div className="relative">
        <FoodPhoto
          src={FORMAT_HERO_IMAGES[EVENT_TO_FORMAT[offer.eventId] || 'furshet'] || '/images/gallery/wedding-banquet.jpg'}
          alt={`${offer.eventName} · ${offer.tierLabel}`}
          aspectRatio="wide"
          className="w-full"
        />
        <div className="absolute top-2 right-2 z-10">
          <span className="text-2xl">{offer.imagePlaceholder}</span>
        </div>
      </div>

      <div className="px-5 py-4 space-y-2 flex-1">
        <p className="text-sm font-medium leading-snug">{offer.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {offer.highlights.map(h => (
            <span key={h} className="text-[11px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{h}</span>
          ))}
        </div>
      </div>

      {/* === Edit mode === */}
      {editMode && (
        <div className="px-5 pb-3">
          <div className="rounded-xl border border-line bg-secondary/30 p-3 mb-3">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-semibold">Ваш состав ({customItems.length})</h4>
              <button onClick={resetToOriginal} className="text-[10px] text-muted-foreground hover:text-gold-text transition-colors">
                ↺ Сбросить
              </button>
            </div>
            {customItems.length === 0 ? (
              <p className="text-[10px] text-muted-foreground text-center py-2">Пусто. Добавьте блюда из каталога ниже.</p>
            ) : (
              <ul className="space-y-1 max-h-56 overflow-y-auto">
                {Array.from(customCategories.entries()).map(([cat, dishes]) => (
                  <li key={cat}>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-0.5">{cat}</div>
                    <ul className="space-y-1">
                      {dishes.map(d => {
                        const dish = findDishById(d.dishId);
                        const price = dish?.pricePerGuest ?? 0;
                        return (
                          <li key={d.dishId} className="flex items-start gap-1.5 py-1 px-1.5 rounded bg-white border border-line/40">
                            <span className="text-sm mt-0.5">{dish ? STATION_EMOJI[dish.station] : '🍽️'}</span>
                            <div className="flex-1 min-w-0">
                              <div className="text-[11px] font-medium text-foreground">{d.name}</div>
                              {/* Аллергены в edit-режиме */}
                              {dish && dish.allergens.length > 0 && (
                                <div className="flex flex-wrap gap-0.5 mt-0.5">
                                  {dish.allergens.slice(0, 4).map(a => (
                                    <span key={a} className="text-[10px] bg-destructive/10 text-destructive px-1 rounded leading-none">
                                      {ALLERGEN_EMOJI[a]} {ALLERGEN_LABEL[a]}
                                    </span>
                                  ))}
                                </div>
                              )}
                              <div className="text-[10px] text-gold-text font-semibold mt-0.5">{price} ₽ × {d.qty} = {price * d.qty} ₽</div>
                            </div>
                            <div className="flex items-center gap-0.5">
                              <button onClick={() => setQty(d.dishId, d.qty - 1)} className="w-4 h-4 rounded border border-line text-[10px] hover:border-gold-text">−</button>
                              <span className="text-[10px] font-semibold w-3 text-center">{d.qty}</span>
                              <button onClick={() => setQty(d.dishId, d.qty + 1)} className="w-4 h-4 rounded border border-line text-[10px] hover:border-gold-text">+</button>
                              <button onClick={() => removeDish(d.dishId)} className="text-[10px] text-muted-foreground hover:text-destructive ml-0.5">✕</button>
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
            className="w-full flex items-center justify-between py-2 px-3 rounded-lg bg-gold-tint/50 hover:bg-gold-tint text-xs font-medium transition-colors mb-2"
          >
            <span>{showCatalog ? 'Скрыть каталог' : '+ Добавить блюдо'}</span>
            <span className="text-[10px]">{showCatalog ? '▲' : '▼'}</span>
          </button>

          {showCatalog && (
            <div className="rounded-xl border border-line bg-white p-2 mb-2">
              <input
                type="search"
                placeholder="Поиск…"
                value={catalogSearch}
                onChange={e => setCatalogSearch(e.target.value)}
                className="w-full rounded border border-line bg-card px-2 py-1.5 text-xs mb-1.5 focus:outline-none focus:border-gold-text"
              />
              <div className="flex flex-wrap gap-0.5 mb-1.5">
                {[{k:'all',l:'Все'},{k:'cold',l:'🥗'},{k:'hot',l:'🍖'},{k:'desserts',l:'🍰'},{k:'drinks',l:'🥂'}].map(s => (
                  <button key={s.k} onClick={() => setCatalogStation(s.k)}
                    className={`rounded-full px-1.5 py-0.5 text-[10px] border transition-colors ${
                      catalogStation === s.k ? 'border-gold-text bg-gold-tint text-gold-text' : 'border-line text-muted-foreground hover:border-gold-text'
                    }`}>{s.l}</button>
                ))}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-48 overflow-y-auto">
                {filteredCatalog.slice(0, 60).map(dish => {
                  const isSelected = customItemIds.has(dish.id);
                  return (
                    <div key={dish.id} className={`rounded border p-1.5 ${isSelected ? 'border-gold-text bg-gold-tint/30 opacity-60' : 'border-line bg-card hover:border-gold-text'}`}>
                      <div className="text-base mb-0.5">{STATION_EMOJI[dish.station]}</div>
                      <h5 className="text-[10px] font-medium leading-tight mb-0.5 line-clamp-2">{dish.name}</h5>
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] text-gold-text font-semibold">{dish.pricePerGuest} ₽</span>
                        <button
                          onClick={() => isSelected ? null : addDish(dish.id)}
                          disabled={isSelected}
                          className={`text-[10px] px-1 py-0.5 rounded font-medium ${
                            isSelected ? 'bg-muted text-muted-foreground cursor-not-allowed' : 'bg-gold-text text-white hover:bg-gold-text/90'
                          }`}
                        >
                          {isSelected ? '✓' : '+ доб'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex gap-1.5">
            <button
              onClick={() => setEditMode(false)}
              className="flex-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              ✓ Готово
            </button>
            <button
              onClick={() => { setEditMode(false); setCustomItems([]); }}
              className="text-[10px] text-muted-foreground hover:text-foreground transition-colors py-1.5 px-2"
            >
              Отмена
            </button>
          </div>
        </div>
      )}

      {/* Composition (read-only) — collapsed/expanded — only in non-edit mode */}
      {!editMode && (
        <div className="px-5 pb-3">
          <button onClick={() => setExpanded(!expanded)} className="text-xs text-gold-text hover:underline font-medium">
            {expanded ? 'Скрыть состав' : `Показать состав (${offer.composition.length} позиций)`}
          </button>
          {expanded && (
            <div className="mt-2 space-y-2 border-t border-line pt-2">
              {CAT_ORDER.map(cat => {
                const items = offer.composition.filter(i => i.category === cat);
                if (!items.length) return null;
                return (
                  <div key={cat}>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">{cat}</p>
                    {items.map(item => {
                      const dish = findDishById(item.dishId);
                      const allergens = dish?.allergens ?? [];
                      return (
                        <div key={item.dishId} className="flex items-start justify-between py-1 gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium">{item.name}</p>
                            <p className="text-[10px] text-muted-foreground line-clamp-1">{item.desc}</p>
                            {/* Аллергены в составе тарифа */}
                            {allergens.length > 0 && (
                              <div className="flex flex-wrap gap-0.5 mt-0.5">
                                {allergens.slice(0, 4).map(a => (
                                  <span key={a} className="text-[10px] bg-destructive/10 text-destructive px-1 rounded leading-none"
                                        title={ALLERGEN_LABEL[a]}>
                                    {ALLERGEN_EMOJI[a]} {ALLERGEN_LABEL[a]}
                                  </span>
                                ))}
                                {allergens.length > 4 && (
                                  <span className="text-[10px] bg-muted text-muted-foreground px-1 rounded leading-none">+{allergens.length - 4}</span>
                                )}
                              </div>
                            )}
                          </div>
                          <span className="text-[10px] text-muted-foreground shrink-0">{item.qty}</span>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      <div className="px-5 pb-5 flex flex-col gap-2">
        <button
          onClick={() => { setEditMode(true); setExpanded(false); }}
          className="block w-full rounded-lg border border-line py-2.5 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
        >
          {editMode ? 'Редактирую…' : '✎ Настроить меню'}
        </button>
        <Link
          href={`/plan/constructor?format=${EVENT_TO_FORMAT[offer.eventId] || 'furshet'}&tier=${offer.tier}`}
          onClick={() => {
            // Если пользователь редактировал состав — сохраняем в sessionStorage
            if (editMode && customItems.length > 0) {
              try {
                sessionStorage.setItem('tariffCustomItems', JSON.stringify(customItems));
              } catch {
                // ignore
              }
            }
          }}
          className="block w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground text-center hover:bg-primary/90 transition-colors">
          Выбрать этот тариф →
        </Link>
        <Link
          href="/contact"
          className="block w-full rounded-lg border border-gold-text py-2.5 text-xs font-semibold text-gold-text text-center hover:bg-gold-tint transition-colors"
        >
          ⚡ Быстрая заявка
        </Link>
        <a
          href="/pricing/pdf"
          download
          className="block w-full rounded-lg border border-line py-2.5 text-xs font-medium text-muted-foreground text-center hover:bg-muted transition-colors"
        >
          Скачать PDF-меню
        </a>
      </div>
    </div>
  );
}

export default function TariffOffersSection({ eventId: propEventId, eventName, description }: Props) {
  const [selectedEvent, setSelectedEvent] = useState<string>(propEventId || 'svadba');

  useEffect(() => {
    if (propEventId) {
      setSelectedEvent(propEventId);
    } else if (typeof window !== 'undefined') {
      // Чтение ?event= из URL для диплинков (например /pricing?event=korporativ)
      const params = new URLSearchParams(window.location.search);
      const eventParam = params.get('event');
      if (eventParam && EVENT_META[eventParam]) {
        setSelectedEvent(eventParam);
      }
    }
  }, [propEventId]);

  const isStandalone = !propEventId;
  const events = Object.entries(EVENT_META);
  const offers = ALL_TARIFF_OFFERS[selectedEvent] || [];
  const meta = EVENT_META[selectedEvent];
  const sorted = [...offers].sort((a, b) => TIER_ORDER.indexOf(a.tier) - TIER_ORDER.indexOf(b.tier));

  return (
    <main className="pt-24 pb-20">
      <div className="container-site">
        {/* Event type tabs — only if standalone */}
        {isStandalone && (
          <>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-heading mb-4">Тарифы и цены</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Прозрачные цены за человека. Всё включено: еда, персонал, посуда, доставка по КАД. Доплат за персонал и посуду не будет. Доставка за КАД — от 3 000 ₽.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {events.map(([id, m]) => (
                <button key={id} onClick={() => setSelectedEvent(id)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    selectedEvent === id
                      ? 'bg-gold-text text-white'
                      : 'border border-line text-muted-foreground hover:border-gold-text'
                  }`}>
                  {m.emoji} {m.label}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Event hero */}
        {meta && (
          <div className={`rounded-2xl bg-gradient-to-br ${meta.gradient} p-6 mb-10 text-center`}>
            <span className="text-4xl block mb-2">{meta.emoji}</span>
            <h2 className="text-2xl font-heading font-medium mb-1">{eventName || meta.label}</h2>
            <p className="text-muted-foreground">{description || meta.desc}</p>
          </div>
        )}

        {/* Мост coffee-break → доставка — ПЕРЕД тарифами (для coffee-break это релевантнее) */}
        {selectedEvent === 'coffee-break' && (
          <div className="mb-8 p-6 rounded-2xl border border-gold-tint bg-gold-tint/30 text-center">
            <p className="text-base font-medium mb-1">🚚 Нужен кофе-брейк без официантов — просто доставка?</p>
            <p className="text-sm text-muted-foreground mb-4">
              Можно заказать доставкой от <strong className="text-foreground">5 000 ₽</strong> — привезём выпечку, сэндвичи, фрукты, напитки.
              <br />
              Готовые пресеты на 40 чел.: <strong className="text-foreground">базовый ≈ 16 800 ₽</strong> или <strong className="text-foreground">премиум ≈ 32 800 ₽</strong> (с сырным плато и кедровым рафом).
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/delivery/order"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
                🛒 Собрать заказ доставки →
              </Link>
              <Link href="/delivery"
                className="inline-flex items-center gap-2 rounded-lg border border-line px-5 py-2.5 text-sm font-medium hover:bg-muted transition-colors">
                Зоны доставки
              </Link>
            </div>
          </div>
        )}

        {/* Tariff grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {sorted.map(offer => (
            <TariffCard key={`${offer.eventId}-${offer.tier}`} offer={offer} />
          ))}
        </div>

        {/* Format switcher для korporativ — показываем что есть ещё фуршет-вариант */}
        {selectedEvent === 'korporativ' && (
          <div className="mt-8 p-6 rounded-2xl border border-gold-tint bg-gold-tint/30 text-center">
            <p className="text-base font-medium mb-1">🥪 Нужен корпоративный фуршет в офисе — без посадки?</p>
            <p className="text-sm text-muted-foreground mb-4">
              У нас есть фуршет-тарифы от <strong className="text-foreground">2 450 ₽/гость</strong> — дешевле банкета.
              Гости едят стоя, лёгкие закуски, идеален для офисных мероприятий.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/menu/furshet"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
                Смотреть фуршет-меню →
              </Link>
              <Link href="/plan/constructor?format=furshet"
                className="inline-flex items-center gap-2 rounded-lg border border-line px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors">
                Собрать фуршет в конструкторе
              </Link>
            </div>
          </div>
        )}

        {/* Allergen safety banner */}
        <div className="mt-10 p-4 rounded-xl border border-success/30 bg-success/5 text-center">
          <p className="text-sm font-medium mb-1">🛡 Безопасность по аллергенам</p>
          <p className="text-xs text-muted-foreground">
            Все блюда маркируются по 14 аллергенам ТР ТС 022/2011. В составе тарифа аллергены видны. В конструкторе можно исключить конкретные аллергены фильтром. Финальную проверку делает менеджер по телефону.
          </p>
        </div>

        {/* Custom CTA */}
        <div className="mt-16 text-center py-10 rounded-2xl border border-line bg-muted/30">
          <p className="text-xl font-heading font-medium mb-2">Не подходит ни один тариф?</p>
          <p className="text-muted-foreground mb-5">Соберите меню под себя — выберите блюда поштучно. Для особых диет или если ни один тариф не подходит.</p>
          <p className="text-xs text-muted-foreground mb-5">✓ В конструкторе можно включить «Несколько групп гостей» — каждая группа получит своё под-меню с фильтром по диете (веганы + халяль + без глютена + всеядные в одном заказе).</p>
          <Link href="/plan/constructor"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
            Собрать своё меню
          </Link>
        </div>
      </div>
    </main>
  );
}
