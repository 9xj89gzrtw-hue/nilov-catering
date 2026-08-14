"use client";

import { useMemo } from "react";
import { ALL_DISHES } from "@/lib/menu-data";
import MenuTariffs from "@/components/blocks/MenuTariffs";
import B2BBanner from "@/components/common/B2BBanner";
import { AllergenChips } from "@/components/common/AllergenChips";
import DishCartIndicator from "@/components/interactive/DishCartIndicator";
import FoodPhoto from "@/components/common/FoodPhoto";
import { getDishImage, getObjectPositionForDish } from "@/lib/dish-images";
import Link from "next/link";

export default function CoffeeBreakPage() {
  const coffeeDishes = useMemo(
    () => ALL_DISHES.filter((d) => d.format.includes("coffee-break")),
    []
  );

  return (
    <main className="pt-24 pb-20" id="main">
      <div className="container-site max-w-4xl">
        <h1 className="mb-2">Кофе-брейк</h1>
        <p className="text-muted-foreground mb-2">
          Кофе, чай, выпечка и десерты для перерывов. Идеально для конференций и деловых встреч.
        </p>
        <p className="text-gold-text mt-1 mb-8 text-sm font-semibold">
          от 390 ₽/гость · мин. 10 гостей
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

        <MenuTariffs format="coffee-break" formatLabel="Кофе-брейк" />

        {/* Multi-day conference pricing */}
        <div className="border-gold-tint bg-gold-tint/10 mt-8 rounded-xl border-2 p-6">
          <h2 className="font-heading mb-3 text-xl font-medium">
            Многодневные конференции (2+ дня)
          </h2>
          <p className="text-muted-foreground mb-4 text-sm">
            Для конференций 2+ дня — пакетная цена со скидкой 20% + объёмные скидки.
          </p>
          <div className="mb-4 grid gap-3 sm:grid-cols-2">
            <div className="border-line bg-background rounded-lg border p-3">
              <p className="mb-1 text-sm font-semibold">Пример: 200 чел × 3 дня × 6 кофе-брейков</p>
              <p className="text-muted-foreground text-xs">
                1 450 ₽ × 200 × 6 × 3 = 5 220 000 ₽ (без скидок)
              </p>
              <p className="text-muted-foreground text-xs">
                Со скидками 15% (объём) + 20% (многодневность) ={" "}
                <strong className="text-foreground">3 549 600 ₽</strong>
              </p>
              <p className="text-muted-foreground text-xs">Экономия: 1 670 400 ₽</p>
            </div>
            <div className="border-line bg-background rounded-lg border p-3">
              <p className="mb-1 text-sm font-semibold">Пример: 100 чел × 2 дня × 4 кофе-брейка</p>
              <p className="text-muted-foreground text-xs">
                1 450 ₽ × 100 × 4 × 2 = 1 160 000 ₽ (без скидок)
              </p>
              <p className="text-muted-foreground text-xs">
                Со скидкой 10% (объём) = <strong className="text-foreground">1 044 000 ₽</strong>
              </p>
              <p className="text-muted-foreground text-xs">Экономия: 116 000 ₽</p>
            </div>
          </div>
          <div className="text-muted-foreground mb-3 text-sm">
            Скидки: от 50 гостей — 5%, от 100 — 10%, от 200 — 15%, от 500 — индивидуально.
            Многодневные конференции (2+ дня) — дополнительно -20%.
          </div>
          <div className="border-line bg-secondary/30 mb-3 rounded-lg border p-4">
            <p className="mb-2 font-medium">Подписка для офисов</p>
            <p className="text-muted-foreground mb-2 text-xs">
              Для регулярных кофе-брейков (4+ раза в месяц): еженедельно 4 события × 50 чел × 390 ₽
              = 78 000 ₽/мес → со скидкой 15% = 66 300 ₽/мес. Долгосрочный контракт: фикс-цена 60
              000 ₽/мес (скидка 23%), ежемесячный ЭДО-инвойс, SLA в комплекте. Ротация меню:
              8-недельный цикл без повторов, сезонные обновления.
            </p>
            <p className="text-muted-foreground text-xs">
              <strong>Для многодневных конференций (2+ дня):</strong> ротация меню между днями —
              разные сеты канапе/выпечки/напитков каждый день, чтобы делегаты не устали от
              однообразия. 3-дневная конференция = 3 разных кофе-брейк-сета без повторов.
            </p>
          </div>
          <Link
            href="/contact?subject=Многодневная-конференция"
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex min-h-[44px] items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold no-underline transition-colors"
          >
            Запросить точную смету для конференции
          </Link>
        </div>

        {/* Conference Day Package */}
        <div className="border-gold-text/40 bg-gold-text/5 mt-6 rounded-xl border-2 p-5">
          <h2 className="font-heading mb-2 text-lg font-medium">
            Конференционный пакет (на делегата/день)
          </h2>
          <p className="text-foreground/90 mb-3 text-sm">
            Комплексная цена: утренний кофе-брейк + обед + дневной кофе-брейк. Один счёт, одна
            доставка, одна смета — без раздельных заказов.
          </p>
          <ul className="text-foreground/90 mb-3 list-inside list-disc space-y-1 text-sm">
            <li>
              <strong>Стандарт:</strong> 1 430 ₽/делегат/день (кофе-брейк 390 + обед 650 +
              кофе-брейк 390)
            </li>
            <li>
              <strong>Скидка 20%</strong> для 2+ дневных конференций → 1 144 ₽/делегат/день
            </li>
            <li>
              Пример: 200 делегатов × 2 дня × 1 144 ={" "}
              <strong className="text-gold-text">457 600 ₽</strong> (включая доставку, посуду,
              официантов)
            </li>
            <li>Ротация: 3 разных кофе-брейк-сета + 2 разных обеда — без повторов</li>
            <li>
              Координатор конференции: <strong>Мария Васильева</strong>, прямой мобильный через{" "}
              <a href="/contact" className="text-gold-text underline">
                форму B2B-заявки
              </a>
            </li>
          </ul>
          <Link
            href="/contact?eventType=Конференция&format=Кофе-брейк&comment=Конференционный пакет"
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex min-h-[44px] items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold no-underline transition-colors"
          >
            Заказать конференционный пакет →
          </Link>
        </div>

        <h2 className="font-heading mt-12 mb-4 text-xl font-medium">
          Все блюда кофе-брейка ({coffeeDishes.length})
        </h2>
        <B2BBanner />
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
          {coffeeDishes.map((dish) => (
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
      </div>
    </main>
  );
}
