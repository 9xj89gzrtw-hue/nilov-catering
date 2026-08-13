"use client";

import { useMemo } from "react";
import { ALL_DISHES } from "@/lib/menu-data";
import { getDishImage } from "@/lib/dish-images";
import FoodPhoto from "@/components/common/FoodPhoto";
import { ALLERGEN_LABEL } from "@/lib/types";
import MenuTariffs from "@/components/blocks/MenuTariffs";
import B2BBanner from "@/components/common/B2BBanner";
import Link from "next/link";

export default function DetskoePage() {
  const kidsDishes = useMemo(() => ALL_DISHES.filter((d) => d.format.includes("detskoe")), []);

  return (
    <main className="pt-24 pb-20" id="main">
      <div className="container-site max-w-4xl">
        <h1 className="mb-2">Детское меню</h1>
        <p className="text-muted-foreground mb-4">
          Безопасное, вкусное и красивое меню для детских праздников. Все ингредиенты согласованы,
          аллергены промаркированы. Соответствие СанПиН 2.3/2.4.3590-20. Минимум 10 гостей (для
          медицинских диет — целиакия, анафилаксия — от 6 детей).
        </p>

        {/* B2B banner — НДС indicator for corporate clients */}
        <div className="mb-8">
          <B2BBanner />
        </div>

        {/* Safety banner — ВВЕРХУ, перед тарифами и блюдами */}
        <div className="mb-8 rounded-xl border-2 border-amber-400 bg-amber-50 p-5">
          <p className="mb-2 text-base font-bold text-amber-900">
            Аллергены в детском меню — безопасность детей
          </p>
          <p className="mb-3 text-sm text-amber-900">
            <strong>В пакетах «Эконом» и базовом детском наборе НЕТ блюд с цельными орехами</strong>{" "}
            (арахис, лесной, кедровый, грецкий). В пакетах «Стандарт» и «Расширенный» часть десертов
            (брауни, миндальная мука в БГ-выпечке) содержит орехи — они имеют значок Орехи и
            промаркированы.
            <strong>Если у ребёнка аллергия или анафилаксия — укажите это в заявке.</strong>{" "}
            Менеджер свяжется с вами для подтверждения протокола безопасности (отдельная зона кухни,
            отдельные доски/ножи, EpiPen на руках у ответственного сотрудника). Для 100%
            без-орехового меню отметьте фильтр «Без орехов» в каталоге или конструкторе.
          </p>
          <p className="mb-3 text-sm text-amber-900">
            Все блюда маркируются по 14 аллергенам ТР ТС 022/2011 (Приложение 3). Безглютеновое
            детское меню доступно на{" "}
            <Link href="/menu/gluten-free" className="font-semibold underline">
              /menu/gluten-free
            </Link>
            . Халяльное детское меню — на{" "}
            <Link href="/menu/halal" className="font-semibold underline">
              /menu/halal
            </Link>
            .
          </p>
          <p className="mb-3 text-sm text-amber-900">
            <strong>Сахарный диабет (СД1/СД2)?</strong> По умолчанию сладкий стол включены в пакеты
            «Стандарт» и «Расширенный». Для ребёнка с СД1 мы заменяем их на сырно-фруктовую тарелку
            (брусника, черника, киви, твёрдые сыры — низкий ГИ) или десерты без добавленного сахара
            (стевия/эритрит). Ищите в каталоге блюда со значком{" "}
            <span className="inline-block rounded bg-purple-100 px-1.5 py-0.5 text-[10px] font-medium text-purple-700">
              SF
            </span>{" "}
            (без сахара). Полный протокол — на странице{" "}
            <Link href="/allergens" className="font-semibold underline">
              /allergens
            </Link>
            .
          </p>
          <p className="mb-3 text-sm text-amber-900">
            <strong>Анафилаксия на молоко и/или яйца?</strong> Те же протоколы безопасности:
            отдельная смена, отдельные доски/ножи, EpiPen. Веган-меню = безопасный выбор (без
            молока, без яиц). В каталоге используйте фильтр «Без молока» и «Без яиц». Подробнее на{" "}
            <Link href="/allergens" className="font-semibold underline">
              /allergens →
            </Link>
            .
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/plan/constructor?format=detskoe"
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex min-h-[44px] items-center rounded-lg px-4 py-2 text-sm font-semibold no-underline transition-colors"
            >
              Собрать детское меню в конструкторе →
            </Link>
            <Link
              href="/certificates"
              className="inline-flex min-h-[44px] items-center rounded-lg border border-amber-700 bg-white px-4 py-2 text-sm font-semibold text-amber-900 no-underline transition-colors hover:bg-amber-100"
            >
              Протокол безопасности
            </Link>
            <Link
              href="/allergens"
              className="inline-flex min-h-[44px] items-center rounded-lg border border-amber-700 bg-white px-4 py-2 text-sm font-semibold text-amber-900 no-underline transition-colors hover:bg-amber-100"
            >
              14 аллергенов
            </Link>
            <Link
              href="/events/vypusknoy"
              className="inline-flex min-h-[44px] items-center rounded-lg border border-amber-700 bg-white px-4 py-2 text-sm font-semibold text-amber-900 no-underline transition-colors hover:bg-amber-100"
            >
              Школьный выпускной
            </Link>
          </div>
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

        <MenuTariffs format="detskoe" formatLabel="Детское меню" />

        {/* Регуляторное соответствие — dedicated section */}
        <div className="border-line bg-card mt-8 rounded-xl border p-5">
          <h2 className="font-heading mb-3 text-lg font-medium">Регуляторное соответствие</h2>
          <ul className="text-muted-foreground space-y-2 text-sm">
            <li>
              <strong className="text-foreground">СанПиН 2.3/2.4.3590-20</strong> —
              санитарно-эпидемиологические требования к организации питания детей. Соблюдается
              полностью: температурный режим, сроки хранения, обработка.
            </li>
            <li>
              <strong className="text-foreground">ТР ТС 021/2011</strong> — безопасность пищевой
              продукции. HACCP внедрён.
            </li>
            <li>
              <strong className="text-foreground">ТР ТС 022/2011</strong> — маркировка 14 аллергенов
              (Приложение 3). Каждое блюдо промаркировано.
            </li>
            <li>
              <strong className="text-foreground">Медкнижки</strong> — 100% персонала. Прививки от
              дифтерии и гепатита В.
            </li>
            <li>
              <strong className="text-foreground">Бракеражный журнал</strong> — ведётся на каждое
              событие. Доступен по запросу для Роспотребнадзора.
            </li>
          </ul>
        </div>

        <h2 className="font-heading mt-12 mb-4 text-xl font-medium">
          Все детские блюда ({kidsDishes.length})
        </h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {kidsDishes.map((dish) => (
            <div
              key={dish.id}
              className="border-line bg-card hover:border-gold-text group overflow-hidden rounded-xl border transition-colors"
            >
              <FoodPhoto
                src={getDishImage(dish.id, dish.station)}
                alt={dish.name}
                aspectRatio="square"
                className="w-full"
              />
              <div className="p-3">
                <h3 className="mb-1 text-sm font-medium">
                  {dish.name}
                  {dish.childFriendly && (
                    <span className="ml-1 rounded bg-purple-100 px-1 py-0.5 text-[10px] font-medium text-purple-700">
                      Дети
                    </span>
                  )}
                </h3>
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
                    {dish.dietBadges.includes("sugar-free") && (
                      <span
                        className="rounded bg-purple-100 px-1.5 py-0.5 text-[10px] font-medium text-purple-700"
                        title="Без добавленного сахара — подходит для СД1/СД2"
                      >
                        SF
                      </span>
                    )}
                    {dish.dietBadges.includes("nut-free") && (
                      <span
                        className="rounded bg-red-100 px-1.5 py-0.5 text-[10px] font-medium text-red-700"
                        title="Без орехов — для анафилаксии"
                      >
                        NF
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {dish.allergens.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
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
                        className={`rounded px-1 py-0.5 text-[10px] ${
                          isHighRisk
                            ? "bg-destructive/20 text-destructive font-semibold"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {isHighRisk && " "}
                        {ALLERGEN_LABEL[a]}
                      </span>
                    );
                  })}
                  {dish.allergens.length > 4 && (
                    <span className="bg-muted text-muted-foreground rounded px-1 py-0.5 text-[10px]">
                      +{dish.allergens.length - 4}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
