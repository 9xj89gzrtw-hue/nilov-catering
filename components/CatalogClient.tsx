"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { DISH_CATEGORIES, DIET_FILTERS, FORMAT_DISHES } from "@/lib/menu-data";
import type { Dish } from "@/lib/types";
import { getDishImageByIndex, getObjectPositionForDish } from "@/lib/dish-images";
import FoodPhoto from "@/components/common/FoodPhoto";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import PageHeader from "@/components/common/PageHeader";
import { ALLERGEN_LABEL } from "@/lib/types";
import { useConstructor } from "@/hooks/useConstructor";
import PersistentCartRail from "@/components/interactive/PersistentCartRail";

const STATIONS = [
  { key: "all", label: "Все" },
  { key: "cold", label: "Холодные" },
  { key: "hot", label: "Горячее" },
  { key: "desserts", label: "Десерты" },
  { key: "drinks", label: "Напитки" },
  { key: "show", label: "Шоу-станции" },
] as const;

const DIETS = ["vegan", "gluten-free", "halal", "sugar-free", "nut-free"] as const;

// Allergen exclusion filters — filter OUT dishes containing specific allergens
const EXCLUDE_ALLERGENS: { key: string; label: string }[] = [
  { key: "milk", label: "Без молока" },
  { key: "eggs", label: "Без яиц" },
  { key: "nuts", label: "Без орехов" },
  { key: "fish", label: "Без рыбы" },
  { key: "soy", label: "Без сои" },
  { key: "peanuts", label: "Без арахиса" },
  { key: "sesame", label: "Без кунжута" },
];

interface CatalogClientProps {
  initialDishes: Dish[];
}

export default function CatalogClient({ initialDishes }: CatalogClientProps) {
  // W83: использем initialDishes из админки (merged с ALL_DISHES)
  const ALL_DISHES = initialDishes;
  const [search, setSearch] = useState("");
  const [station, setStation] = useState<string>("all");
  const [activeDiets, setActiveDiets] = useState<Set<string>>(new Set());
  const [excludedAllergens, setExcludedAllergens] = useState<Set<string>>(new Set());

  const toggleDiet = (d: string) => {
    const next = new Set(activeDiets);
    if (next.has(d)) next.delete(d);
    else next.add(d);
    setActiveDiets(next);
  };

  const toggleAllergen = (a: string) => {
    const next = new Set(excludedAllergens);
    if (next.has(a)) next.delete(a);
    else next.add(a);
    setExcludedAllergens(next);
  };

  const filtered = useMemo(() => {
    let dishes = ALL_DISHES;
    if (station !== "all") dishes = dishes.filter((d) => d.station === station);
    if (activeDiets.size > 0) {
      dishes = dishes.filter((d) =>
        [...activeDiets].every((diet) => d.dietBadges.includes(diet as (typeof DIETS)[number]))
      );
    }
    if (excludedAllergens.size > 0) {
      dishes = dishes.filter(
        (d) =>
          ![...excludedAllergens].some((a) =>
            d.allergens.includes(a as (typeof d.allergens)[number])
          )
      );
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      dishes = dishes.filter(
        (d) => d.name.toLowerCase().includes(q) || d.description.toLowerCase().includes(q)
      );
    }
    return dishes;
  }, [station, activeDiets, excludedAllergens, search, ALL_DISHES]);

  // Split into halal / non-halal for visual separation
  const halalDishes = useMemo(
    () => filtered.filter((d) => d.dietBadges.includes("halal")),
    [filtered]
  );
  const porkDishes = useMemo(
    () =>
      filtered.filter(
        (d) =>
          d.description.toLowerCase().includes("свинин") ||
          d.description.toLowerCase().includes("бекон") ||
          d.description.toLowerCase().includes("сало")
      ),
    [filtered]
  );
  const otherDishes = useMemo(
    () =>
      filtered.filter(
        (d) =>
          !d.dietBadges.includes("halal") &&
          !(
            d.description.toLowerCase().includes("свинин") ||
            d.description.toLowerCase().includes("бекон") ||
            d.description.toLowerCase().includes("сало")
          )
      ),
    [filtered]
  );

  const stationCounts = useMemo(() => {
    const counts: Record<string, number> = { all: ALL_DISHES.length };
    for (const s of STATIONS) {
      if (s.key === "all") continue;
      counts[s.key] = ALL_DISHES.filter((d) => d.station === s.key).length;
    }
    return counts;
  }, [ALL_DISHES]);

  // Pagination — client-side progressive enhancement. SSR shows ALL dishes.
  // JS pagination kicks in only after hydration to reduce initial DOM for slow devices.
  const [visibleCount, setVisibleCount] = useState<number | null>(null); // null = show all (SSR default)
  // Allergen visibility toggle — show/hide allergen badges on cards
  const [showAllergens, setShowAllergens] = useState(true);

  const hasActiveFilters =
    search.trim() !== "" || station !== "all" || activeDiets.size > 0 || excludedAllergens.size > 0;
  const resetFilters = () => {
    setSearch("");
    setStation("all");
    setActiveDiets(new Set());
    setExcludedAllergens(new Set());
    setVisibleCount(24); // Reset pagination when filters reset
  };

  // Reset pagination when filters change
  useEffect(() => {
    setVisibleCount(24);
  }, [search, station, activeDiets, excludedAllergens]);

  // After mount, switch to paginated mode
  useEffect(() => {
    setVisibleCount(24);
  }, []);

  const showAll = visibleCount === null;
  const paginatedOther = showAll ? otherDishes : otherDishes.slice(0, visibleCount);
  const paginatedHalal = showAll
    ? halalDishes
    : halalDishes.slice(0, Math.max(0, visibleCount - paginatedOther.length));
  const paginatedPork = showAll
    ? porkDishes
    : porkDishes.slice(
        0,
        Math.max(0, visibleCount - paginatedOther.length - paginatedHalal.length)
      );
  const totalShown = paginatedOther.length + paginatedHalal.length + paginatedPork.length;
  const hasMore = !showAll && totalShown < filtered.length;

  return (
    <>
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
                className="border-line bg-card hover:border-gold-text touch-target inline-flex min-h-[44px] items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition-colors"
                aria-pressed={!showAllergens}
                type="button"
              >
                {showAllergens ? "👁 Скрыть аллергены" : "👁 Показать аллергены"}
              </button>
            }
          />

          {/* Sticky filter bar — sticks below header (top-16 = 64px = h-16 header) */}
          <div className="bg-background/95 border-line/60 sticky top-16 z-30 -mx-4 mb-6 rounded-xl border-b px-4 py-3 backdrop-blur-md">
            {/* Search */}
            <input
              type="search"
              placeholder="Поиск по названию или описанию…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Поиск блюд"
              className="border-line bg-card focus:border-gold-text mb-3 w-full rounded-xl border px-4 py-3 text-sm transition-colors focus:outline-none"
            />

            {/* Station filters — horizontally scrollable on mobile */}
            <div
              className="-mx-1 mb-2 flex gap-2 overflow-x-auto px-1 pb-1"
              role="group"
              aria-label="Фильтр по типу станции"
            >
              {STATIONS.map((s) => (
                <button
                  key={s.key}
                  onClick={() => setStation(s.key)}
                  aria-pressed={station === s.key}
                  className={`touch-target shrink-0 rounded-full border px-4 py-2 text-xs transition-colors ${
                    station === s.key
                      ? "border-gold-text bg-gold-tint text-gold-text"
                      : "border-line text-muted-foreground hover:border-gold-text hover:text-foreground"
                  }`}
                >
                  {s.label} ({stationCounts[s.key]})
                </button>
              ))}
            </div>

            {/* Diet filters */}
            <div
              className="-mx-1 mb-2 flex gap-2 overflow-x-auto px-1 pb-1"
              role="group"
              aria-label="Фильтр по диете"
            >
              {DIETS.map((d) => (
                <button
                  key={d}
                  onClick={() => toggleDiet(d)}
                  aria-pressed={activeDiets.has(d)}
                  className={`touch-target shrink-0 rounded-full border px-4 py-2 text-xs transition-colors ${
                    activeDiets.has(d)
                      ? "border-gold-text bg-gold-tint text-gold-text"
                      : "border-line text-muted-foreground hover:border-gold-text hover:text-foreground"
                  }`}
                >
                  {DIET_FILTERS[d]}
                </button>
              ))}
            </div>

            {/* Allergen exclusion filters */}
            <div
              className="-mx-1 flex items-center gap-2 overflow-x-auto px-1 pb-1"
              role="group"
              aria-label="Исключить аллергены"
            >
              <span className="text-muted-foreground mr-1 shrink-0 self-center text-xs">
                Исключить:
              </span>
              {EXCLUDE_ALLERGENS.map((a) => (
                <button
                  key={a.key}
                  onClick={() => toggleAllergen(a.key)}
                  aria-pressed={excludedAllergens.has(a.key)}
                  className={`touch-target shrink-0 rounded-full border px-3 py-2 text-xs transition-colors ${
                    excludedAllergens.has(a.key)
                      ? "border-destructive bg-destructive/10 text-destructive font-medium"
                      : "border-line text-muted-foreground hover:border-destructive hover:text-destructive"
                  }`}
                >
                  {a.label}
                </button>
              ))}
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-gold-text touch-target ml-auto shrink-0 px-2 py-1 text-xs hover:underline"
                  aria-label="Сбросить все фильтры"
                >
                  ✕ Сбросить
                </button>
              )}
            </div>

            {/* Results count */}
            <p className="text-muted-foreground mt-2 text-xs" aria-live="polite">
              {filtered.length === ALL_DISHES.length
                ? `Показаны все ${ALL_DISHES.length} блюд`
                : `Найдено: ${filtered.length} из ${ALL_DISHES.length}`}
            </p>
          </div>

          <noscript>
            <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              <p className="mb-2 font-medium">
                Фильтры требуют JavaScript. Без JS доступны ссылки по категориям:
              </p>
              <div className="flex flex-wrap gap-2">
                <a href="/menu" className="text-gold-text underline">
                  Все меню
                </a>
                <a href="/menu/furshet" className="text-gold-text underline">
                  Фуршет
                </a>
                <a href="/menu/banquet" className="text-gold-text underline">
                  Банкет
                </a>
                <a href="/menu/coffee-break" className="text-gold-text underline">
                  Кофе-брейк
                </a>
                <a href="/menu/vegan" className="text-gold-text underline">
                  Веган
                </a>
                <a href="/menu/halal" className="text-gold-text underline">
                  Халяль
                </a>
                <a href="/menu/gluten-free" className="text-gold-text underline">
                  Без глютена
                </a>
                <a href="/menu/detskoe" className="text-gold-text underline">
                  Детское
                </a>
              </div>
            </div>
          </noscript>

          {/* Grid — visual separation: halal / other / pork — with pagination */}
          {paginatedOther.length > 0 && (
            <div className="mb-8">
              {halalDishes.length > 0 && porkDishes.length > 0 && (
                <h2 className="font-heading text-muted-foreground mb-3 text-sm font-medium tracking-wide uppercase">
                  📌 Основные блюда
                </h2>
              )}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {paginatedOther.map((dish, idx) => (
                  <DishCard key={dish.id} dish={dish} index={idx} showAllergens={showAllergens} />
                ))}
              </div>
            </div>
          )}

          {paginatedHalal.length > 0 && (
            <div className="mb-8 rounded-xl border-2 border-emerald-300 bg-emerald-50/50 p-4">
              <h2 className="font-heading mb-1 text-base font-medium text-emerald-900">
                🕌 Халяль-блюда (забой по зибха, без свинины, без алкоголя)
              </h2>
              <p className="mb-4 text-xs text-emerald-800">
                Сертификат Совета муфтиев России. Отдельное оборудование — без пересечения со
                свининой.
              </p>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {paginatedHalal.map((dish, idx) => (
                  <DishCard
                    key={dish.id}
                    dish={dish}
                    index={idx + 100}
                    showAllergens={showAllergens}
                  />
                ))}
              </div>
            </div>
          )}

          {paginatedPork.length > 0 && (
            <div className="mb-8 rounded-xl border-2 border-red-300 bg-red-50/50 p-4">
              <h2 className="font-heading mb-1 text-base font-medium text-red-900">
                🚫 Блюда со свининой (НЕ халяль)
              </h2>
              <p className="mb-4 text-xs text-red-800">
                Эти блюда содержат свинину или бекон. Не заказывайте для халяль-мероприятий.
                Готовятся на отдельной линии от халяль-блюд.
              </p>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {paginatedPork.map((dish, idx) => (
                  <DishCard
                    key={dish.id}
                    dish={dish}
                    index={idx + 200}
                    showAllergens={showAllergens}
                  />
                ))}
              </div>
            </div>
          )}

          {/* "Показать ещё" pagination button */}
          {hasMore && (
            <div className="py-8 text-center">
              <button
                onClick={() => setVisibleCount((c) => (c ?? 24) + 24)}
                className="border-gold-text bg-card text-gold-text hover:bg-gold-tint touch-target inline-flex items-center gap-2 rounded-lg border-2 px-6 py-3 text-sm font-semibold transition-colors"
                type="button"
                aria-controls="dishes-grid"
                aria-expanded={visibleCount > 24 ? "true" : "false"}
              >
                Показать ещё {Math.min(24, filtered.length - totalShown)} блюд ↓
              </button>
              <p className="text-muted-foreground mt-2 text-xs">
                Показано {totalShown} из {filtered.length} блюд
              </p>
            </div>
          )}

          {filtered.length === 0 && (
            <div className="text-muted-foreground py-16 text-center">
              <p className="mb-2 text-lg">Ничего не найдено</p>
              <p className="text-sm">Попробуйте изменить фильтры или поисковый запрос</p>

              {/* Спец-баннер для халяль-фильтра */}
              {activeDiets.has("halal") && (
                <div className="border-gold-tint bg-gold-tint/30 mx-auto mt-6 max-w-md rounded-xl border p-5 text-left">
                  <p className="text-foreground mb-1 text-sm font-medium">
                    ☪️ Халяль-меню готовим под заказ
                  </p>
                  <p className="text-muted-foreground mb-3 text-xs">
                    В базовом каталоге нет сертифицированных халяль-блюд, но мы готовим их на
                    отдельной линии по запросу — от 3 рабочих дней. Курица, говядина, баранина без
                    свинины и алкоголя.
                  </p>
                  <a
                    href="/menu/halal"
                    className="text-gold-text text-xs font-semibold hover:underline"
                  >
                    Подробнее про халяль-меню →
                  </a>
                </div>
              )}
            </div>
          )}

          <div className="mt-12 space-y-4">
            <div className="flex flex-wrap gap-3">
              <a
                href="/menu/catalog/pdf"
                download
                className="border-line bg-card text-foreground hover:border-gold-text hover:text-gold-text inline-flex items-center gap-2 rounded-lg border px-5 py-3 text-sm font-medium transition-all active:scale-[0.98]"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Скачать каталог (печать)
              </a>
              <Link
                href="/plan/constructor"
                className="bg-primary text-primary-foreground inline-block rounded-lg px-6 py-3 text-sm font-semibold transition-transform active:scale-[0.98]"
              >
                Собрать меню в конструкторе
              </Link>
              <Link
                href="/delivery/order"
                className="border-gold-text text-gold-text hover:bg-gold-tint inline-block rounded-lg border px-6 py-3 text-sm font-semibold transition-colors"
              >
                🛒 В заказ доставки
              </Link>
            </div>
            <div className="border-line bg-card/50 rounded-xl border border-dashed p-5">
              <p className="mb-1 text-sm font-medium">Не нашли своё? Составим индивидуально</p>
              <p className="text-muted-foreground mb-3 text-xs">
                Шеф соберёт меню под ваш бюджет, формат и пожелания.
              </p>
              <Link
                href="/plan/constructor"
                className="text-gold-text text-sm font-semibold hover:underline"
              >
                Составить меню с шефом →
              </Link>
            </div>
          </div>
        </div>
      </main>
      <PersistentCartRail />
    </>
  );
}

function DishCard({
  dish,
  index = 0,
  showAllergens = true,
}: {
  dish: Dish;
  index?: number;
  showAllergens?: boolean;
}) {
  const dishImg = getDishImageByIndex(dish.id, dish.station, index);
  // Pass dish ID via URL so constructor can pre-add it
  const constructorHref = `/plan/constructor?format=${dish.format[0] || "furshet"}&guests=20&dish=${dish.id}`;

  // W83: in-page add to cart
  const addDish = useConstructor((s) => s.addDish);
  const selectedItems = useConstructor((s) => s.selectedItems);
  const isInCart = selectedItems.some((i) => i.dishId === dish.id);
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isInCart) addDish(dish.id);
  };

  return (
    <div className="drinqit-3d drinqit-shine border-line bg-card group hover:border-gold-text flex flex-col overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-xl">
      <div className="drinqit-3d-inner">
        {/* Image area — FoodPhoto с анимацией Drinqit 3D */}
        <Link
          href={constructorHref}
          className="drinqit-3d-img relative block"
          aria-label={`${dish.name} — открыть в конструкторе меню`}
        >
          <FoodPhoto
            src={dishImg}
            alt={dish.name}
            aspectRatio="square"
            objectPosition={getObjectPositionForDish(dish.id, dish.station)}
            className="w-full"
          />
          {/* W83: Quick add button — appears on hover */}
          <button
            onClick={handleAddToCart}
            className={`absolute top-2 right-2 z-10 flex h-10 w-10 items-center justify-center rounded-full shadow-lg backdrop-blur-md transition-all ${
              isInCart
                ? "bg-success text-white opacity-100"
                : "text-foreground bg-white/90 opacity-0 group-hover:opacity-100 hover:scale-110 hover:bg-white"
            }`}
            aria-label={isInCart ? `${dish.name} уже в меню` : `Добавить ${dish.name} в меню`}
          >
            {isInCart ? (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            )}
          </button>
        </Link>

        {/* Info */}
        <div className="flex flex-1 flex-col p-3">
          <h3 className="mb-1 text-sm leading-tight font-medium">{dish.name}</h3>
          <p className="text-muted-foreground mb-2 line-clamp-2 text-[11px]">{dish.description}</p>

          <div className="mb-2 flex items-center justify-between gap-2">
            <span className="text-gold-text text-xs font-semibold whitespace-nowrap">
              {dish.pricePerGuest} ₽
              <span className="text-muted-foreground font-normal">/гость</span>
            </span>

            <div className="flex flex-wrap justify-end gap-1">
              {/* Diet badges */}
              {dish.dietBadges.includes("vegan") && <Badge label="VG" color="green" />}
              {dish.dietBadges.includes("gluten-free") && <Badge label="GF" color="amber" />}
              {dish.dietBadges.includes("halal") && <Badge label="H" color="blue" />}
              {dish.dietBadges.includes("sugar-free") && <Badge label="SF" color="purple" />}
              {dish.dietBadges.includes("nut-free") && <Badge label="NF" color="red" />}
              {dish.childFriendly && <Badge label="Дети" color="purple" />}
            </div>
          </div>

          {/* ХЕ (хлебные единицы) — extracted from description for СД1 visibility */}
          {dish.description.match(/ХЕ=([0-9.]+)/) && (
            <p className="mb-2 text-[10px] font-semibold text-purple-700">
              ХЕ={dish.description.match(/ХЕ=([0-9.]+)/)?.[1]} · для СД1
            </p>
          )}

          {/* Allergens — shown/hidden via toggle. High-risk подсветка для nuts/peanuts/gluten/fish/crustaceans/molluscs */}
          {showAllergens && dish.allergens.length > 0 && (
            <div className="mt-1 mb-3 flex flex-wrap gap-1">
              {dish.allergens.slice(0, 4).map((a) => {
                const isHighRisk =
                  a === "nuts" ||
                  a === "peanuts" ||
                  a === "gluten" ||
                  a === "fish" ||
                  a === "crustaceans" ||
                  a === "molluscs";
                return (
                  <span
                    key={a}
                    className={`rounded px-1.5 py-0.5 text-[10px] ${
                      isHighRisk
                        ? "bg-destructive/20 text-destructive font-semibold"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {ALLERGEN_LABEL[a]}
                  </span>
                );
              })}
              {dish.allergens.length > 4 && (
                <span className="bg-muted text-muted-foreground rounded px-1.5 py-0.5 text-[10px]">
                  +{dish.allergens.length - 4}
                </span>
              )}
            </div>
          )}

          {/* CTA row: Add to cart (primary) + open constructor (secondary) */}
          <div className="mt-auto flex gap-2">
            <button
              onClick={handleAddToCart}
              className={`touch-target inline-flex flex-1 items-center justify-center rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
                isInCart
                  ? "bg-success/15 text-success border-success/30 border"
                  : "bg-gold-text hover:bg-gold-text/90 text-white"
              }`}
              aria-label={isInCart ? `${dish.name} уже в меню` : `Добавить ${dish.name} в меню`}
            >
              {isInCart ? "✓ В меню" : "+ В меню"}
            </button>
            <Link
              href={constructorHref}
              className="border-line bg-card hover:border-gold-text touch-target inline-flex items-center justify-center rounded-lg border px-3 py-2 text-xs font-semibold no-underline transition-colors"
              aria-label={`Открыть ${dish.name} в конструкторе меню`}
              title="Открыть в конструкторе"
            >
              →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Badge({ label, color }: { label: string; color: string }) {
  const colors: Record<string, string> = {
    green: "bg-emerald-100 text-emerald-700",
    amber: "bg-amber-100 text-amber-700",
    blue: "bg-blue-100 text-blue-700",
    purple: "bg-purple-100 text-purple-700",
  };
  return (
    <span
      className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${colors[color] || "bg-muted"}`}
    >
      {label}
    </span>
  );
}
