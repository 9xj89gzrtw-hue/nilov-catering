"use client";

import { useMemo, useState, useEffect } from "react";
import { ALL_DISHES } from "@/lib/menu-data";
import { ALLERGEN_LABEL } from "@/lib/types";
import MenuCTABlock from "@/components/blocks/MenuCTABlock";
import MenuTariffs from "@/components/blocks/MenuTariffs";
import B2BBanner from "@/components/common/B2BBanner";
import { AllergenChips } from "@/components/common/AllergenChips";
import DishCartIndicator from "@/components/interactive/DishCartIndicator";
import FoodPhoto from "@/components/common/FoodPhoto";
import { getDishImage, getObjectPositionForDish } from "@/lib/dish-images";
import Link from "next/link";
import RelatedPages from "@/components/common/RelatedPages";
import SmartCTA from "@/components/common/SmartCTA";

const GRADIENT_MAP: Record<string, string> = {
  cold: "from-blue-100 via-blue-50 to-cyan-50",
  hot: "from-orange-100 via-orange-50 to-amber-50",
  desserts: "from-pink-100 via-pink-50 to-rose-50",
  drinks: "from-emerald-100 via-emerald-50 to-teal-50",
  show: "from-purple-100 via-purple-50 to-fuchsia-50",
};

const STATION_LABELS: Record<string, string> = {
  cold: "Холодные закуски",
  hot: "Горячее",
  desserts: "Десерты",
  drinks: "Напитки",
  show: "Шоу-станции",
};

export default function FurshetPage() {
  const furshetDishes = useMemo(() => ALL_DISHES.filter((d) => d.format.includes("furshet")), []);
  const [visibleStations, setVisibleStations] = useState<number | null>(null);
  useEffect(() => {
    setVisibleStations(2);
  }, []);

  const grouped = useMemo(() => {
    const map: Record<string, typeof ALL_DISHES> = {};
    furshetDishes.forEach((d) => {
      const station = d.station || "cold";
      if (!map[station]) map[station] = [];
      map[station].push(d);
    });
    return map;
  }, [furshetDishes]);

  return (
    <main className="pt-24 pb-20" id="main">
      <div className="container-site">
        {/* Hero */}
        <div className="mb-12 text-center">
          <h1 className="font-heading mb-4 text-4xl md:text-5xl">Фуршет</h1>
          <p className="text-muted-foreground mx-auto max-w-xl text-lg">
            Лёгкие закуски на стоячем приёме. Канапе, тарталетки, брускетты, мини-бургеры. Гости
            свободно перемещаются и общаются.
          </p>
          <p className="text-gold-text mt-3 text-sm font-semibold">
            от 2 450 ₽/гость · мин. 20 гостей
          </p>
        </div>

        {/* Quick links */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          <Link
            href="#tariffs"
            className="bg-gold-text rounded-full px-4 py-1.5 text-xs font-semibold text-white"
          >
            Тарифы и цены
          </Link>
          <Link
            href="#dishes"
            className="border-line hover:border-gold-text rounded-full border px-4 py-1.5 text-xs transition-colors"
          >
            Все блюда
          </Link>
          <Link
            href="/plan/constructor?format=furshet"
            className="border-line hover:border-gold-text rounded-full border px-4 py-1.5 text-xs transition-colors"
          >
            Собрать меню
          </Link>
        </div>

        {/* B2B banner — НДС indicator for corporate clients */}
        <div className="mb-10">
          <B2BBanner />
        </div>

        {/* Tariffs */}
        <div id="tariffs" className="scroll-mt-20">
          <h2 className="font-heading mb-6 text-2xl font-medium">Тарифы</h2>
          <MenuTariffs format="furshet" formatLabel="Фуршет" />
        </div>

        {/* All dishes by station — with pagination */}
        <B2BBanner />
        <div id="dishes" className="mt-8 scroll-mt-20">
          <h2 className="font-heading mb-6 text-2xl font-medium">Все блюда фуршета</h2>

          {Object.entries(grouped)
            .slice(0, visibleStations === null ? undefined : visibleStations)
            .map(([station, dishes]) => (
              <div key={station} className="mb-10">
                <h3 className="font-heading mb-4 text-lg font-medium">
                  {STATION_LABELS[station] || station}
                </h3>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {dishes.map((dish) => {
                    return (
                      <div
                        key={dish.id}
                        className="border-line bg-card hover:border-gold-text group overflow-hidden rounded-xl border transition-all hover:-translate-y-0.5"
                      >
                        <div className="bg-secondary relative aspect-[4/3]">
                          <FoodPhoto
                            src={getDishImage(dish.id, dish.station)}
                            alt={dish.name}
                            aspectRatio="wide"
                            objectPosition={getObjectPositionForDish(dish.id, dish.station)}
                            className="h-full w-full"
                          />
                          <AllergenChips dish={dish} />
                          <DishCartIndicator dishId={dish.id} />
                          <div className="absolute right-1.5 bottom-1.5">
                            <span className="rounded-full bg-white/80 px-1.5 py-0.5 text-[10px] font-semibold backdrop-blur-sm">
                              {dish.pricePerGuest} ₽
                            </span>
                          </div>
                          {dish.dietBadges.length > 0 && (
                            <div className="absolute top-1.5 left-1.5 flex gap-0.5">
                              {dish.dietBadges.includes("vegan") && (
                                <span className="rounded bg-[#065F46] px-1 py-0.5 text-[10px] font-bold text-white">
                                  VG
                                </span>
                              )}
                              {dish.dietBadges.includes("gluten-free") && (
                                <span className="rounded bg-[#B45309] px-1 py-0.5 text-[10px] font-bold text-white">
                                  GF
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="p-2.5">
                          <h4 className="group-hover:text-gold-text mb-0.5 line-clamp-1 text-xs leading-tight font-medium transition-colors">
                            {dish.name}
                          </h4>
                          <p className="text-muted-foreground line-clamp-2 text-[10px]">
                            {dish.description}
                          </p>
                          {dish.allergens.length > 0 && (
                            <div className="mt-1 flex flex-wrap gap-0.5">
                              {dish.allergens.slice(0, 2).map((a) => (
                                <span
                                  key={a}
                                  className="bg-muted text-muted-foreground rounded px-1 py-0.5 text-[10px]"
                                >
                                  {ALLERGEN_LABEL[a]}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

          {/* Pagination for stations */}
          {visibleStations !== null && visibleStations < Object.keys(grouped).length && (
            <div className="py-8 text-center">
              <button
                onClick={() => setVisibleStations((s) => (s ?? 0) + 2)}
                className="border-gold-text bg-card text-gold-text hover:bg-gold-tint touch-target inline-flex items-center gap-2 rounded-lg border-2 px-6 py-3 text-sm font-semibold transition-colors"
                type="button"
                aria-controls="dishes"
                aria-expanded={(visibleStations ?? 0) > 2 ? "true" : "false"}
              >
                Показать ещё станции ↓
              </button>
              <p className="text-muted-foreground mt-2 text-xs" aria-live="polite">
                Показано {visibleStations} из {Object.keys(grouped).length} категорий
              </p>
            </div>
          )}
        </div>

        <MenuCTABlock format="furshet" formatLabel="Фуршет" />

        {/* Связанные страницы — логичные переходы */}
        <RelatedPages context="menu" slug="furshet" />
        <SmartCTA
          context="menu"
          slug="furshet"
          title="Организуете фуршет?"
          description="12+ закусок на выбор — соберите меню или доверьте подбор нам"
        />
      </div>
    </main>
  );
}
