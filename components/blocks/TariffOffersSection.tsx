"use client";

import { useState, useEffect } from "react";
import { ALL_TARIFF_OFFERS, type TariffOffer } from "@/lib/tariff-offers";
import { type Tier } from "@/lib/types";
import { ALL_DISHES, DISH_CATEGORIES } from "@/lib/menu-data";
import { FORMAT_HERO_IMAGES } from "@/lib/dish-images";
import FoodPhoto from "@/components/common/FoodPhoto";
import { ALLERGEN_LABEL } from "@/lib/types";
import Link from "next/link";

interface Props {
  eventId?: string;
  eventName?: string;
  description?: string;
}

const EVENT_META: Record<
  string,
  { label: string; emoji?: string; desc: string; gradient: string }
> = {
  svadba: {
    label: "Свадьба",
    desc: "От камерной росписи до банкета на 200 гостей",
    gradient: "from-rose-50 to-rose-100",
  },
  korporativ: {
    label: "Корпоратив",
    desc: "Бизнес-ланчи, гала-ужины, тимбилдинги",
    gradient: "from-sky-50 to-sky-100",
  },
  vypusknoy: {
    label: "Выпускной",
    desc: "Школьные и студенческие выпускные",
    gradient: "from-amber-50 to-amber-100",
  },
  shkola: {
    label: "Школы",
    desc: "Спец. тариф для школ и учреждений от 1 800 ₽/гость",
    gradient: "from-emerald-50 to-emerald-100",
  },
  chastnoe: {
    label: "Частное",
    desc: "Дни рождения, юбилеи, семейные ужины",
    gradient: "from-emerald-50 to-emerald-100",
  },
  detskoe: {
    label: "Детское",
    desc: "Праздники с аниматорами и шоу",
    gradient: "from-purple-50 to-purple-100",
  },
  "chef-at-home": {
    label: "Шеф на дом",
    desc: "Шеф-повар и сомелье у вас дома",
    gradient: "from-orange-50 to-orange-100",
  },
  "coffee-break": {
    label: "Кофе-брейк",
    desc: "Конференции, семинары, тренинги — от 390 ₽/гость",
    gradient: "from-amber-50 to-yellow-100",
  },
  pominki: {
    label: "Поминки",
    desc: "Поминальный обед. Кутья, блины, кисель, рыба. Без алкоголя. От 1 800 ₽/гость",
    gradient: "from-stone-50 to-stone-100",
  },
};

// Маппинг событие → формат (для ссылки в конструктор)
const EVENT_TO_FORMAT: Record<string, string> = {
  svadba: "banket",
  korporativ: "banket",
  vypusknoy: "banket",
  shkola: "furshet",
  chastnoe: "furshet",
  detskoe: "detskoe",
  "chef-at-home": "chef-at-home",
  "coffee-break": "coffee-break",
  pominki: "pominki",
};

const TIER_ORDER: Tier[] = ["economy", "standard", "premium", "luxury"];

const STATION_EMOJI: Record<string, string> = {
  cold: "",
  hot: "",
  desserts: "",
  drinks: "",
  show: "",
};

const ALLERGEN_EMOJI: Record<string, string> = {
  nuts: "",
  peanuts: "",
  fish: "",
  milk: "",
  eggs: "",
  soy: "",
  gluten: "",
  crustaceans: "",
  celery: "",
  mustard: "",
  sesame: "",
  sulphites: "",
  lupin: "",
  molluscs: "",
};

// Поиск блюда в каталоге по dishId (для аллергенов и цены)
function findDishById(dishId: string) {
  return ALL_DISHES.find((d) => d.id === dishId);
}

// Полноценная карточка тарифа с edit-режимом
function TariffCard({ offer }: { offer: TariffOffer }) {
  const [expanded, setExpanded] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showCatalog, setShowCatalog] = useState(false);
  const [catalogSearch, setCatalogSearch] = useState("");
  const [catalogStation, setCatalogStation] = useState<string>("all");

  // Локальный редактируемый состав
  const [customItems, setCustomItems] = useState<
    { dishId: string; qty: number; name: string; desc: string; category: string }[]
  >([]);

  useEffect(() => {
    if (editMode && customItems.length === 0) {
      setCustomItems(
        offer.composition.map((c) => ({
          dishId: c.dishId,
          qty: 1,
          name: c.name,
          desc: c.desc,
          category: c.category,
        }))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editMode]);

  const isRec = offer.tier === "standard";

  const CAT_ORDER = [
    "Канапе",
    "Тарталетки",
    "Закуски",
    "Закуска",
    "Премиум",
    "Амюз-буш",
    "Выпечка",
    "Горячее",
    "Завтрак",
    "Шоу",
    "Основное",
    "Десерты",
    "Десерт",
    "Фрукты",
    "Бар",
    "Кофе",
    "Напитки",
    "Сыр",
    "Брускетты",
  ];

  // === Edit mode logic ===
  const removeDish = (dishId: string) =>
    setCustomItems((items) => items.filter((i) => i.dishId !== dishId));
  const setQty = (dishId: string, qty: number) => {
    const next = Math.max(1, Math.min(20, qty));
    setCustomItems((items) => items.map((i) => (i.dishId === dishId ? { ...i, qty: next } : i)));
  };
  const addDish = (dishId: string) => {
    if (customItems.some((i) => i.dishId === dishId)) return;
    const dish = findDishById(dishId);
    if (!dish) return;
    setCustomItems((items) => [
      ...items,
      {
        dishId,
        qty: 1,
        name: dish.name,
        desc: dish.description,
        category: DISH_CATEGORIES[dish.station] || dish.station,
      },
    ]);
  };
  const resetToOriginal = () => {
    setCustomItems(
      offer.composition.map((c) => ({
        dishId: c.dishId,
        qty: 1,
        name: c.name,
        desc: c.desc,
        category: c.category,
      }))
    );
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
    if (catalogStation !== "all") dishes = dishes.filter((d) => d.station === catalogStation);
    if (catalogSearch.trim()) {
      const q = catalogSearch.toLowerCase();
      dishes = dishes.filter(
        (d) => d.name.toLowerCase().includes(q) || d.description.toLowerCase().includes(q)
      );
    }
    return dishes;
  })();
  const customItemIds = new Set(customItems.map((i) => i.dishId));
  const customCategories = new Map<string, typeof customItems>();
  for (const item of customItems) {
    if (!customCategories.has(item.category)) customCategories.set(item.category, []);
    customCategories.get(item.category)!.push(item);
  }

  const displayPrice = editMode ? editedPricePerGuest : offer.pricePerGuest;

  return (
    <div
      className={`rounded-2xl border ${isRec ? "border-gold-text ring-gold-text ring-1" : "border-line"} bg-card flex flex-col overflow-hidden transition-shadow hover:shadow-lg`}
    >
      <div className="border-line border-b p-5">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-heading text-lg font-semibold">{offer.tierLabel}</h3>
            {isRec && (
              <span className="bg-gold-text rounded-full px-2 py-0.5 text-[10px] font-semibold text-white">
                Рекомендуем
              </span>
            )}
          </div>
          <div className="text-right">
            <div className="text-gold-text text-2xl font-bold tabular-nums">
              {displayPrice.toLocaleString("ru-RU")} ₽
            </div>
            {editMode && priceDiff !== 0 && (
              <div
                className={`text-[10px] font-medium ${priceDiff > 0 ? "text-warning" : "text-success"}`}
              >
                {priceDiff > 0 ? "+" : ""}
                {priceDiff.toLocaleString("ru-RU")} ₽
              </div>
            )}
          </div>
        </div>
        <p className="text-muted-foreground text-sm">/ гость · мин. {offer.minGuests} гостей</p>
      </div>

      <div className="relative">
        <FoodPhoto
          src={
            offer.tier === "economy"
              ? "/images/real/wedding-banquet.jpg"
              : offer.tier === "standard"
                ? "/images/gallery/wedding-banquet.jpg"
                : offer.tier === "premium"
                  ? "/images/gallery/dessert-table.jpg"
                  : offer.tier === "luxury"
                    ? "/images/gallery/cocktail.jpg"
                    : FORMAT_HERO_IMAGES[EVENT_TO_FORMAT[offer.eventId] || "furshet"] ||
                      "/images/gallery/wedding-banquet.jpg"
          }
          alt={`${offer.eventName} · ${offer.tierLabel}`}
          aspectRatio="wide"
          className="w-full"
        />
        <div className="absolute top-2 right-2 z-10">
          <span className="text-2xl">{offer.imagePlaceholder}</span>
        </div>
      </div>

      <div className="flex-1 space-y-2 px-5 py-4">
        <p className="text-sm leading-snug font-medium">{offer.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {offer.highlights.map((h) => (
            <span
              key={h}
              className="bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-[11px]"
            >
              {h}
            </span>
          ))}
        </div>
      </div>

      {/* === Edit mode === */}
      {editMode && (
        <div className="px-5 pb-3">
          <div className="border-line bg-secondary/30 mb-3 rounded-xl border p-3">
            <div className="mb-2 flex items-center justify-between">
              <h4 className="text-xs font-semibold">Ваш состав ({customItems.length})</h4>
              <button
                onClick={resetToOriginal}
                className="text-muted-foreground hover:text-gold-text text-[10px] transition-colors"
              >
                ↺ Сбросить
              </button>
            </div>
            {customItems.length === 0 ? (
              <p className="text-muted-foreground py-2 text-center text-[10px]">
                Пусто. Добавьте блюда из каталога ниже.
              </p>
            ) : (
              <ul className="max-h-56 space-y-1 overflow-y-auto">
                {Array.from(customCategories.entries()).map(([cat, dishes]) => (
                  <li key={cat}>
                    <div className="text-muted-foreground mb-0.5 text-[10px] font-semibold tracking-wider uppercase">
                      {cat}
                    </div>
                    <ul className="space-y-1">
                      {dishes.map((d) => {
                        const dish = findDishById(d.dishId);
                        const price = dish?.pricePerGuest ?? 0;
                        return (
                          <li
                            key={d.dishId}
                            className="border-line/40 flex items-start gap-1.5 rounded border bg-white px-1.5 py-1"
                          >
                            <span className="mt-0.5 text-sm">
                              {dish ? STATION_EMOJI[dish.station] : ""}
                            </span>
                            <div className="min-w-0 flex-1">
                              <div className="text-foreground text-[11px] font-medium">
                                {d.name}
                              </div>
                              {/* Аллергены в edit-режиме */}
                              {dish && dish.allergens.length > 0 && (
                                <div className="mt-0.5 flex flex-wrap gap-0.5">
                                  {dish.allergens.slice(0, 4).map((a) => (
                                    <span
                                      key={a}
                                      className="bg-destructive/10 text-destructive rounded px-1 text-[10px] leading-none"
                                    >
                                      {ALLERGEN_EMOJI[a]} {ALLERGEN_LABEL[a]}
                                    </span>
                                  ))}
                                </div>
                              )}
                              <div className="text-gold-text mt-0.5 text-[10px] font-semibold">
                                {price} ₽ × {d.qty} = {price * d.qty} ₽
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => setQty(d.dishId, d.qty - 1)}
                                aria-label="Уменьшить количество"
                                className="border-line hover:border-gold-text inline-flex h-11 w-11 items-center justify-center rounded border text-sm"
                              >
                                −
                              </button>
                              <span className="w-6 text-center text-sm font-semibold">{d.qty}</span>
                              <button
                                onClick={() => setQty(d.dishId, d.qty + 1)}
                                aria-label="Увеличить количество"
                                className="border-line hover:border-gold-text inline-flex h-11 w-11 items-center justify-center rounded border text-sm"
                              >
                                +
                              </button>
                              <button
                                onClick={() => removeDish(d.dishId)}
                                aria-label="Удалить блюдо"
                                className="text-muted-foreground hover:text-destructive border-line inline-flex h-11 w-11 items-center justify-center rounded border"
                                title="Удалить блюдо"
                              >
                                ✕
                              </button>
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
            className="bg-gold-tint/50 hover:bg-gold-tint mb-2 flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-colors"
          >
            <span>{showCatalog ? "Скрыть каталог" : "+ Добавить блюдо"}</span>
            <span className="text-[10px]">{showCatalog ? "" : ""}</span>
          </button>

          {showCatalog && (
            <div className="border-line mb-2 rounded-xl border bg-white p-2">
              <input
                type="search"
                placeholder="Поиск…"
                value={catalogSearch}
                onChange={(e) => setCatalogSearch(e.target.value)}
                className="border-line bg-card focus:border-gold-text mb-1.5 w-full rounded border px-2 py-1.5 text-xs focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6E5530]"
              />
              <div className="mb-1.5 flex flex-wrap gap-0.5">
                {[
                  { k: "all", l: "Все" },
                  { k: "cold", l: "" },
                  { k: "hot", l: "" },
                  { k: "desserts", l: "" },
                  { k: "drinks", l: "" },
                ].map((s) => (
                  <button
                    key={s.k}
                    onClick={() => setCatalogStation(s.k)}
                    className={`rounded-full border px-1.5 py-0.5 text-[10px] transition-colors ${
                      catalogStation === s.k
                        ? "border-gold-text bg-gold-tint text-gold-text"
                        : "border-line text-muted-foreground hover:border-gold-text"
                    }`}
                  >
                    {s.l}
                  </button>
                ))}
              </div>
              <div className="grid max-h-48 grid-cols-2 gap-1.5 overflow-y-auto sm:grid-cols-3">
                {filteredCatalog.slice(0, 60).map((dish) => {
                  const isSelected = customItemIds.has(dish.id);
                  return (
                    <div
                      key={dish.id}
                      className={`rounded border p-1.5 ${isSelected ? "border-gold-text bg-gold-tint/30 opacity-60" : "border-line bg-card hover:border-gold-text"}`}
                    >
                      <div className="mb-0.5 text-base">{STATION_EMOJI[dish.station]}</div>
                      <h5 className="mb-0.5 line-clamp-2 text-[10px] leading-tight font-medium">
                        {dish.name}
                      </h5>
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-gold-text text-[10px] font-semibold">
                          {dish.pricePerGuest} ₽
                        </span>
                        <button
                          onClick={() => (isSelected ? null : addDish(dish.id))}
                          disabled={isSelected}
                          className={`rounded px-1 py-0.5 text-[10px] font-medium ${
                            isSelected
                              ? "bg-muted text-muted-foreground cursor-not-allowed"
                              : "bg-gold-text hover:bg-gold-text/90 text-white"
                          }`}
                        >
                          {isSelected ? "" : "+ доб"}
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
              className="bg-primary text-primary-foreground hover:bg-primary/90 flex-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors"
            >
              Готово
            </button>
            <button
              onClick={() => {
                setEditMode(false);
                setCustomItems([]);
              }}
              className="text-muted-foreground hover:text-foreground px-2 py-1.5 text-[10px] transition-colors"
            >
              Отмена
            </button>
          </div>
        </div>
      )}

      {/* Composition (read-only) — collapsed/expanded — only in non-edit mode */}
      {!editMode && (
        <div className="px-5 pb-3">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-gold-text text-xs font-medium hover:underline"
          >
            {expanded ? "Скрыть состав" : `Показать состав (${offer.composition.length} позиций)`}
          </button>
          {expanded && (
            <div className="border-line mt-2 space-y-2 border-t pt-2">
              {CAT_ORDER.map((cat) => {
                const items = offer.composition.filter((i) => i.category === cat);
                if (!items.length) return null;
                return (
                  <div key={cat}>
                    <p className="text-muted-foreground mb-1 text-[10px] tracking-wider uppercase">
                      {cat}
                    </p>
                    {items.map((item) => {
                      const dish = findDishById(item.dishId);
                      const allergens = dish?.allergens ?? [];
                      return (
                        <div
                          key={item.dishId}
                          className="flex items-start justify-between gap-2 py-1"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-medium">{item.name}</p>
                            <p className="text-muted-foreground line-clamp-1 text-[10px]">
                              {item.desc}
                            </p>
                            {/* Аллергены в составе тарифа */}
                            {allergens.length > 0 && (
                              <div className="mt-0.5 flex flex-wrap gap-0.5">
                                {allergens.slice(0, 4).map((a) => (
                                  <span
                                    key={a}
                                    className="bg-destructive/10 text-destructive rounded px-1 text-[10px] leading-none"
                                    title={ALLERGEN_LABEL[a]}
                                  >
                                    {ALLERGEN_EMOJI[a]} {ALLERGEN_LABEL[a]}
                                  </span>
                                ))}
                                {allergens.length > 4 && (
                                  <span className="bg-muted text-muted-foreground rounded px-1 text-[10px] leading-none">
                                    +{allergens.length - 4}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                          <span className="text-muted-foreground shrink-0 text-[10px]">
                            {item.qty}
                          </span>
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

      <div className="flex flex-col gap-2 px-5 pb-5">
        <Link
          href={`/plan/constructor?format=${offer.formatOverride || EVENT_TO_FORMAT[offer.eventId] || "furshet"}&tier=${offer.tier}`}
          onClick={() => {
            // Если пользователь редактировал состав — сохраняем в sessionStorage
            if (editMode && customItems.length > 0) {
              try {
                sessionStorage.setItem("tariffCustomItems", JSON.stringify(customItems));
              } catch {
                // ignore
              }
            }
          }}
          className="bg-primary text-primary-foreground hover:bg-primary/90 touch-target block w-full rounded-lg py-3 text-center text-sm font-semibold transition-colors"
        >
          Выбрать этот тариф →
        </Link>
        <a
          href="/menu/catalog"
          className="border-line text-muted-foreground hover:bg-muted touch-target block w-full rounded-lg border py-2.5 text-center text-xs font-medium transition-colors"
        >
          Смотреть каталог блюд
        </a>
      </div>
    </div>
  );
}

export default function TariffOffersSection({
  eventId: propEventId,
  eventName,
  description,
}: Props) {
  const [selectedEvent, setSelectedEvent] = useState<string>(propEventId || "svadba");

  useEffect(() => {
    if (propEventId) {
      setSelectedEvent(propEventId);
    } else if (typeof window !== "undefined") {
      // Чтение ?event= из URL для диплинков (например /pricing?event=korporativ)
      const params = new URLSearchParams(window.location.search);
      const eventParam = params.get("event");
      if (eventParam && EVENT_META[eventParam]) {
        setSelectedEvent(eventParam);
      }
    }
  }, [propEventId]);

  const isStandalone = !propEventId;
  const events = Object.entries(EVENT_META);
  const offers = ALL_TARIFF_OFFERS[selectedEvent] || [];
  const meta = EVENT_META[selectedEvent];
  const sorted = [...offers].sort(
    (a, b) => TIER_ORDER.indexOf(a.tier) - TIER_ORDER.indexOf(b.tier)
  );

  return (
    <section>
      <div className="container-site">
        {/* Event type tabs — only if standalone */}
        {isStandalone && (
          <>
            <div className="mb-10 flex flex-wrap justify-center gap-2">
              {events.map(([id, m]) => {
                const isActive = selectedEvent === id;
                const href = `/pricing?event=${id}`;
                return (
                  <Link
                    key={id}
                    href={href}
                    prefetch={false}
                    className={`inline-flex min-h-[44px] items-center rounded-full px-4 py-2 text-sm font-medium no-underline transition-colors ${
                      isActive
                        ? "bg-gold-text text-white"
                        : "border-line text-muted-foreground hover:border-gold-text border"
                    }`}
                    aria-pressed={isActive}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {m.label}
                  </Link>
                );
              })}
            </div>
          </>
        )}

        {/* Event hero */}
        {meta && (
          <div className={`rounded-2xl bg-gradient-to-br ${meta.gradient} mb-10 p-6 text-center`}>
            <h2 className="font-heading mb-1 text-2xl font-medium">{eventName || meta.label}</h2>
            <p className="text-muted-foreground">{description || meta.desc}</p>
          </div>
        )}

        {/* Мост coffee-break → доставка — ПЕРЕД тарифами (для coffee-break это релевантнее) */}
        {selectedEvent === "coffee-break" && (
          <div className="border-gold-tint bg-gold-tint/30 mb-8 rounded-2xl border p-6 text-center">
            <p className="mb-1 text-base font-medium">
              Нужен кофе-брейк без официантов — просто доставка?
            </p>
            <p className="text-muted-foreground mb-4 text-sm">
              Можно заказать доставкой от <strong className="text-foreground">5 000 ₽</strong> —
              привезём выпечку, сэндвичи, фрукты, напитки.
              <br />
              Готовые пресеты на 40 чел.:{" "}
              <strong className="text-foreground">базовый ≈ 16 800 ₽</strong> или{" "}
              <strong className="text-foreground">премиум ≈ 32 800 ₽</strong> (с сырным плато и
              кедровым рафом).
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/delivery/order"
                className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex min-h-[44px] items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors"
              >
                Собрать заказ доставки →
              </Link>
              <Link
                href="/delivery"
                className="border-line hover:bg-muted inline-flex min-h-[44px] items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors"
              >
                Зоны доставки
              </Link>
            </div>
          </div>
        )}

        {/* Tariff grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sorted.map((offer) => (
            <TariffCard key={`${offer.eventId}-${offer.tier}`} offer={offer} />
          ))}
        </div>

        {/* Format switcher для korporativ — показываем что есть ещё фуршет-вариант */}
        {selectedEvent === "korporativ" && (
          <div className="border-gold-tint bg-gold-tint/30 mt-8 rounded-2xl border p-6 text-center">
            <p className="mb-1 text-base font-medium">
              Нужен корпоративный фуршет в офисе — без посадки?
            </p>
            <p className="text-muted-foreground mb-4 text-sm">
              У нас есть фуршет-тарифы от <strong className="text-foreground">2 450 ₽/гость</strong>{" "}
              — дешевле банкета. Гости едят стоя, лёгкие закуски, идеален для офисных мероприятий.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/menu/furshet"
                className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex min-h-[44px] items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors"
              >
                Смотреть фуршет-меню →
              </Link>
              <Link
                href="/plan/constructor?format=furshet"
                className="border-line text-foreground hover:bg-muted inline-flex min-h-[44px] items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors"
              >
                Собрать фуршет в конструкторе
              </Link>
            </div>
          </div>
        )}

        {/* Allergen safety banner */}
        <div className="border-success/30 bg-success/5 mt-10 rounded-xl border p-4 text-center">
          <p className="mb-1 text-sm font-medium">Безопасность по аллергенам</p>
          <p className="text-muted-foreground text-xs">
            Все блюда маркируются по 14 аллергенам ТР ТС 022/2011. В составе тарифа аллергены видны.
            В конструкторе можно исключить конкретные аллергены фильтром. Финальную проверку делает
            менеджер по телефону.
          </p>
        </div>

        {/* Custom CTA */}
        <div className="border-line bg-muted/30 mt-16 rounded-2xl border py-10 text-center">
          <p className="font-heading mb-2 text-xl font-medium">Не подходит ни один тариф?</p>
          <p className="text-muted-foreground mb-5">
            Соберите меню под себя — выберите блюда поштучно. Для особых диет или если ни один тариф
            не подходит.
          </p>
          <p className="text-muted-foreground mb-5 text-xs">
            В конструкторе можно включить «Несколько групп гостей» — каждая группа получит своё
            под-меню с фильтром по диете (веганы + халяль + без глютена + без орехов + всеядные в
            одном заказе).
          </p>
          <Link
            href="/plan/constructor"
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-colors"
          >
            Собрать своё меню
          </Link>
        </div>
      </div>
    </section>
  );
}
