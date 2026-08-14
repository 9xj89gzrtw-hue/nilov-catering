"use client";

import { useMemo } from "react";
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

export default function BanquetPage() {
  const banquetDishes = useMemo(() => ALL_DISHES.filter((d) => d.format.includes("banket")), []);

  return (
    <main className="pt-24 pb-20" id="main">
      <div className="container-site max-w-4xl">
        <h1 className="mb-2">Банкет</h1>
        <p className="text-muted-foreground mb-2">
          Посадка за стол, официанты, смена блюд. Классический формат для свадеб и юбилеев.
        </p>
        <p className="text-gold-text mt-1 mb-8 text-sm font-semibold">
          от 3 950 ₽/гость · мин. 15 гостей
        </p>

        {/* B2B banner — НДС indicator for corporate clients */}
        <div className="mb-8">
          <B2BBanner />
        </div>

        {/* CTA: "Не нашли — составим" */}
        <div className="border-gold-text bg-gold-tint mb-8 flex flex-col items-center justify-between gap-3 rounded-xl border p-4 sm:flex-row">
          <p className="text-sm font-medium">Не нашли подходящее меню? Составим индивидуально.</p>
          <Link
            href="/plan/helper"
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex min-h-[44px] items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors"
          >
            Составить меню
          </Link>
        </div>

        <MenuTariffs format="banquet" formatLabel="Банкет" />

        <B2BBanner />

        <h2 className="font-heading mt-12 mb-4 text-xl font-medium">
          Все блюда банкета ({banquetDishes.length})
        </h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {banquetDishes.map((dish) => (
            <div
              key={dish.id}
              className="border-line bg-card hover:border-gold-text overflow-hidden rounded-xl border transition-colors"
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
              </div>
              <div className="p-3">
                <h3 className="mb-1 text-sm font-medium">{dish.name}</h3>
                <p className="text-muted-foreground mb-2 line-clamp-2 text-[11px]">
                  {dish.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-gold-text text-xs font-semibold">
                    {dish.pricePerGuest} ₽/гость
                  </span>
                  <div className="flex gap-1">
                    {dish.dietBadges.includes("vegan") && (
                      <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-medium text-emerald-700">
                        VG
                      </span>
                    )}
                    {dish.dietBadges.includes("gluten-free") && (
                      <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium text-amber-700">
                        GF
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <MenuCTABlock format="banket" formatLabel="Банкет" />

        {/* Связанные страницы — логичные переходы */}
        <RelatedPages context="menu" slug="banquet" />
        <SmartCTA
          context="menu"
          slug="banquet"
          title="Собираете банкетное меню?"
          description="Выберите блюда поштучно или доверьте подбор нам — рассчитаем за 15 минут"
        />
      </div>
    </main>
  );
}
