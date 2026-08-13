"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ALL_DISHES } from "@/lib/menu-data";
import { getDishImage, getObjectPositionForDish } from "@/lib/dish-images";
import FoodPhoto from "@/components/common/FoodPhoto";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { useConstructor } from "@/hooks/useConstructor";
import { Search, Plus, Check, ArrowRight } from "lucide-react";

const STATIONS = [
  { key: "all", label: "Все", emoji: "🍽" },
  { key: "cold", label: "Закуски", emoji: "🥗" },
  { key: "hot", label: "Горячее", emoji: "🍖" },
  { key: "desserts", label: "Десерты", emoji: "🍰" },
  { key: "drinks", label: "Напитки", emoji: "🥂" },
] as const;

const DIETS = [
  { key: "vegan", label: "Веган" },
  { key: "gluten-free", label: "Без глютена" },
  { key: "halal", label: "Халяль" },
] as const;

export default function CatalogPage() {
  const [search, setSearch] = useState("");
  const [station, setStation] = useState<string>("all");
  const [activeDiets, setActiveDiets] = useState<Set<string>>(new Set());
  const [visibleCount, setVisibleCount] = useState(24);

  const addDish = useConstructor((s) => s.addDish);
  const removeDish = useConstructor((s) => s.removeDish);
  const selectedItems = useConstructor((s) => s.selectedItems);

  const toggleDiet = (d: string) => {
    const next = new Set(activeDiets);
    if (next.has(d)) next.delete(d);
    else next.add(d);
    setActiveDiets(next);
  };

  const filtered = useMemo(() => {
    let dishes = ALL_DISHES;
    if (station !== "all") dishes = dishes.filter((d) => d.station === station);
    if (activeDiets.size > 0) {
      dishes = dishes.filter((d) =>
        [...activeDiets].every((diet) => (d.dietBadges as string[]).includes(diet))
      );
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      dishes = dishes.filter(
        (d) => d.name.toLowerCase().includes(q) || d.description.toLowerCase().includes(q)
      );
    }
    return dishes;
  }, [station, activeDiets, search]);

  const hasActiveFilters = search.trim() !== "" || station !== "all" || activeDiets.size > 0;
  const resetFilters = () => {
    setSearch("");
    setStation("all");
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
          <h1 className="font-heading mb-3 text-4xl font-medium tracking-tight md:text-5xl">
            Каталог блюд
          </h1>
          <p className="text-muted-foreground mb-4 max-w-2xl text-base">
            {ALL_DISHES.length} блюд. Нажмите «В меню» на карточке, чтобы собрать свой заказ.
          </p>
          {/* Trust bar — compact, one line */}
          <p className="text-muted-foreground text-sm">
            19 лет на кухне СПб · 3 000+ событий · 4.8/5 по 27 отзывам · ⏱ Перезвоним за 15 минут
          </p>
        </section>

        {/* ════════ 2. ФИЛЬТРЫ — второстепенная панель ════════ */}
        <section className="mb-10 space-y-3 md:mb-12">
          {/* Поиск */}
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <input
              type="search"
              aria-label="Поиск блюда по названию"
              placeholder="Поиск блюда…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-line bg-card focus:border-gold-text w-full rounded-xl border py-3 pr-4 pl-10 text-sm focus:outline-none"
            />
          </div>

          {/* Тип блюда */}
          <div className="flex flex-wrap gap-2">
            {STATIONS.map((s) => (
              <button
                key={s.key}
                onClick={() => setStation(s.key)}
                className={`inline-flex min-h-[44px] items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  station === s.key
                    ? "border-gold-text bg-gold-tint text-gold-text"
                    : "border-line text-muted-foreground hover:border-gold-text hover:text-foreground"
                }`}
              >
                <span className="mr-1">{s.emoji}</span> {s.label}
              </button>
            ))}
          </div>

          {/* Диета + счётчик на одной строке (убираем «висящую» строку) */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-muted-foreground text-xs">Диета:</span>
              {DIETS.map((d) => (
                <button
                  key={d.key}
                  onClick={() => toggleDiet(d.key)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                    activeDiets.has(d.key)
                      ? "border-gold-text bg-gold-tint text-gold-text"
                      : "border-line text-muted-foreground hover:border-gold-text"
                  }`}
                >
                  {d.label}
                </button>
              ))}
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-gold-text ml-2 inline-flex min-h-[44px] items-center text-xs hover:underline"
                >
                  ✕ Сбросить фильтры
                </button>
              )}
            </div>
            <p className="text-muted-foreground text-xs whitespace-nowrap">{totalCountLabel}</p>
          </div>
        </section>

        {/* ════════ 3. СЕТКА БЛЮД — главный фокус ════════ */}
        {visible.length > 0 ? (
          <section>
            <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((dish) => {
                const isInCart = selectedItems.some((i) => i.dishId === dish.id);
                const constructorHref = `/plan/constructor?format=${dish.format[0] || "furshet"}&guests=20&dish=${dish.id}`;
                return (
                  <article
                    key={dish.id}
                    className="group border-line bg-card hover:border-gold-text flex h-full flex-col overflow-hidden rounded-2xl border transition-all hover:shadow-lg"
                  >
                    {/* Фото — фиксированная высота для консистентности */}
                    <Link
                      href={constructorHref}
                      className="bg-secondary relative block aspect-[4/3] shrink-0 overflow-hidden"
                      aria-label={dish.name}
                    >
                      <FoodPhoto
                        src={getDishImage(dish.id, dish.station)}
                        alt={dish.name}
                        aspectRatio="wide"
                        objectPosition={getObjectPositionForDish(dish.id, dish.station)}
                        className="h-full w-full"
                      />
                      {/* Цена на фото */}
                      <div className="absolute top-2 right-2">
                        <span className="text-foreground inline-block rounded-full bg-white/95 px-3 py-1 text-sm font-bold shadow-md backdrop-blur-sm">
                          {dish.pricePerGuest} ₽
                        </span>
                      </div>
                      {/* Бейджи диет */}
                      <div className="absolute top-2 left-2 flex gap-1">
                        {dish.dietBadges.includes("vegan") && (
                          <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-xs font-bold text-white">
                            VG
                          </span>
                        )}
                        {dish.dietBadges.includes("gluten-free") && (
                          <span className="rounded-full bg-amber-500 px-2 py-0.5 text-xs font-bold text-white">
                            GF
                          </span>
                        )}
                        {dish.dietBadges.includes("halal") && (
                          <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs font-bold text-white">
                            H
                          </span>
                        )}
                      </div>
                    </Link>

                    {/* Инфо — flex-col с mt-auto прижимает кнопку к низу для одинаковой высоты */}
                    <div className="flex flex-1 flex-col p-4">
                      <div className="font-heading mb-1 text-lg leading-snug font-medium">
                        {dish.name}
                      </div>
                      <p className="text-muted-foreground mb-4 line-clamp-2 min-h-[2.5rem] text-sm">
                        {dish.description}
                      </p>

                      {/* Цена + кнопка — прижата к низу карточки */}
                      <div className="border-line mt-auto flex items-center justify-between gap-2 border-t pt-3">
                        <span className="text-muted-foreground text-sm">
                          <span className="text-foreground text-lg font-bold">
                            {dish.pricePerGuest}
                          </span>{" "}
                          ₽/гость
                        </span>
                        <button
                          onClick={() => (isInCart ? removeDish(dish.id) : addDish(dish.id))}
                          aria-pressed={isInCart}
                          className={`inline-flex min-h-[44px] items-center gap-1 rounded-lg px-4 py-2 text-sm font-bold transition-all ${
                            isInCart
                              ? "border border-emerald-300 bg-emerald-100 text-emerald-700"
                              : "bg-gold-text hover:bg-gold-text/90 text-white shadow-sm"
                          }`}
                        >
                          {isInCart ? (
                            <>
                              <Check className="h-4 w-4" />
                              Добавлено
                            </>
                          ) : (
                            <>
                              <Plus className="h-4 w-4" />В меню
                            </>
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
          <div className="py-16 text-center">
            <p className="mb-4 text-4xl">🍽</p>
            <p className="mb-2 text-lg">Ничего не найдено</p>
            <button
              onClick={resetFilters}
              className="text-gold-text text-sm font-semibold hover:underline"
            >
              Сбросить фильтры
            </button>
          </div>
        )}

        {/* ════════ 4. ПАГИНАЦИЯ ════════ */}
        {hasMore && (
          <div className="py-10 text-center">
            <button
              onClick={() => setVisibleCount((c) => c + 12)}
              className="border-gold-text bg-card text-gold-text hover:bg-gold-tint inline-flex items-center gap-2 rounded-lg border-2 px-8 py-3 text-sm font-semibold transition-colors"
            >
              Показать ещё {Math.min(12, filtered.length - visibleCount)} блюд
            </button>
            <p className="text-muted-foreground mt-2 text-xs">
              Показано {visible.length} из {filtered.length}
            </p>
          </div>
        )}

        {/* Min order info */}
        <div className="border-line bg-card mt-8 rounded-xl border p-5 text-center">
          <p className="text-muted-foreground text-sm">
            Минимальный заказ: от 10 гостей (кофе-брейк) / 20 (фуршет) / 15 (банкет)
          </p>
        </div>

        {/* ════════ 5. КОРЗИНА — плавающая внизу ════════ */}
        {selectedItems.length > 0 && (
          <div className="bg-background/95 border-line fixed right-4 bottom-4 left-4 z-50 rounded-2xl border p-4 shadow-2xl backdrop-blur-xl md:right-6 md:left-auto md:max-w-md">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">
                  {selectedItems.reduce((s, i) => s + i.qty, 0)} блюд в меню
                </p>
                <p className="text-muted-foreground text-xs">
                  ≈{" "}
                  {selectedItems
                    .reduce((sum, i) => {
                      const d = ALL_DISHES.find((x) => x.id === i.dishId);
                      return sum + (d?.pricePerGuest || 0) * i.qty * 20;
                    }, 0)
                    .toLocaleString("ru-RU")}{" "}
                  ₽ на 20 гостей
                </p>
              </div>
              <Link
                href="/plan/constructor"
                className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex min-h-[44px] items-center gap-1 rounded-lg px-4 py-2 text-sm font-semibold"
              >
                Оформить <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
// W89 deploy Sun Aug  9 18:38:38 UTC 2026
