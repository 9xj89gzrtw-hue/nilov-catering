"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ALL_DISHES } from "@/lib/menu-data";
import { ALLERGEN_LABEL } from "@/lib/types";
import { SITE } from "@/lib/data";
import B2BBanner from "@/components/common/B2BBanner";
import { AllergenChips } from "@/components/common/AllergenChips";
import DishCartIndicator from "@/components/interactive/DishCartIndicator";
import FoodPhoto from "@/components/common/FoodPhoto";
import { getDishImage, getObjectPositionForDish } from "@/lib/dish-images";

export default function GlutenFreePage() {
  const dishes = useMemo(() => ALL_DISHES.filter((d) => d.dietBadges.includes("gluten-free")), []);
  // Split desserts: без орехов DEFAULT vs nut-containing OPTION
  const dessertsNutFree = dishes.filter(
    (d) =>
      d.station === "desserts" && !d.allergens.includes("nuts") && !d.allergens.includes("peanuts")
  );
  const dessertsWithNuts = dishes.filter(
    (d) =>
      d.station === "desserts" && (d.allergens.includes("nuts") || d.allergens.includes("peanuts"))
  );
  const mainsNutFree = dishes.filter(
    (d) =>
      (d.station === "hot" || d.station === "cold") &&
      !d.allergens.includes("nuts") &&
      !d.allergens.includes("peanuts")
  );
  const mainsWithNuts = dishes.filter(
    (d) =>
      (d.station === "hot" || d.station === "cold") &&
      (d.allergens.includes("nuts") || d.allergens.includes("peanuts"))
  );
  const drinksNutFree = dishes.filter(
    (d) =>
      d.station === "drinks" && !d.allergens.includes("nuts") && !d.allergens.includes("peanuts")
  );
  const drinksWithNuts = dishes.filter(
    (d) =>
      d.station === "drinks" && (d.allergens.includes("nuts") || d.allergens.includes("peanuts"))
  );
  const allWithNuts = [...dessertsWithNuts, ...mainsWithNuts, ...drinksWithNuts];

  return (
    <main id="main" className="pt-24 pb-20">
      <div className="container-site max-w-4xl">
        <nav aria-label="Хлебные крошки" className="text-muted-foreground mb-4 text-sm">
          <Link href="/" className="hover:text-foreground">
            Главная
          </Link>
          {" / "}
          <Link href="/menu" className="hover:text-foreground">
            Меню
          </Link>
          {" / "}
          <span className="text-foreground">Без глютена</span>
        </nav>

        <h1 className="font-heading mb-3 text-3xl font-medium md:text-4xl">Безглютеновое меню</h1>
        <p className="text-muted-foreground mb-6 text-lg">
          {dishes.length} блюд без глютена — от закусок до десертов. Отдельная линия кухни,
          отдельная посуда (синяя маркировка), тестирование &lt;20 ppm. Подходит для целиакии.
        </p>

        {/* B2B banner — НДС indicator for corporate clients */}
        <div className="mb-8">
          <B2BBanner />
        </div>

        {/* Целиакия-протокол */}
        <div className="mb-8 rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-6">
          <h2 className="font-heading mb-4 text-xl font-medium">Протокол для целиакии</h2>
          <div className="grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <h3 className="mb-1 font-semibold">Отдельная зона кухни</h3>
              <p className="text-muted-foreground">
                Отдельные разделочные столы, плиты, духовки. Не пересекаются с пшеничными блюдами.
              </p>
            </div>
            <div>
              <h3 className="mb-1 font-semibold">Отдельная посуда</h3>
              <p className="text-muted-foreground">
                Ножи, доски, сковороды, противни — отдельные, с синей цветовой маркировкой.
              </p>
            </div>
            <div>
              <h3 className="mb-1 font-semibold">Тестирование &lt;20 ppm</h3>
              <p className="text-muted-foreground">
                Целевая норма &lt;20 ppm gluten (соответствует Codex Alimentarius, GFCO, Coeliac
                UK). Регулярная проверка.
              </p>
            </div>
            <div>
              <h3 className="mb-1 font-semibold">Поставщики</h3>
              <p className="text-muted-foreground">
                Верифицированные БГ-производители: миндальная мука Bob&apos;s Red Mill, рисовая мука
                ТМ Гарнец, БГ овсянка.
              </p>
            </div>
            <div>
              <h3 className="mb-1 font-semibold">Перекрёстное загрязнение глютеном</h3>
              <p className="text-muted-foreground">
                Приготовление в отдельной смене. Без пересечения с пшеничной мукой в воздухе.
                Отдельный фритюр.
              </p>
            </div>
            <div>
              <h3 className="mb-1 font-semibold">Перекрёстное загрязнение орехами</h3>
              <p className="text-muted-foreground">
                Несколько БГ-блюд содержат орехи (Сырная тарелка с орехами, Канапе капрезе с песто,
                Куриное филе с песто, Кедровый раф с кедровым орехом) — они вынесены в отдельный
                блок «Опция (содержит орехи)» внизу страницы. Для гостей с сочетанной целиакии +
                анафилаксия на орехи — выбирайте только блюда из основного без орехов блока.
              </p>
            </div>
          </div>
          <p className="text-muted-foreground mt-4 text-xs italic">
            При заказе для целиакии: укажите в заявке — менеджер подтвердит протокол и пришлёт
            спецификацию БГ-блюд. Для сочетанной целиакии + анафилаксия на орехи — укажите обе
            диеты, шеф подберёт без орехов БГ-меню.
          </p>
        </div>

        {/* Nut-free DEFAULT banner */}
        <div className="mb-8 rounded-xl border-2 border-emerald-300 bg-emerald-50 p-4">
          <p className="mb-2 text-sm font-semibold text-emerald-900">
            БГ-меню по умолчанию — без орехов (без орехов)
          </p>
          <p className="mb-2 text-sm text-emerald-900">
            Все блюда в основном БГ-меню ниже — на <strong>рисовой и овсяной муке</strong>, без
            миндальной муки и кедрового ореха. Безопасно для гостей с целиакией + анафилаксией на
            орехи.
          </p>
          <p className="text-sm text-emerald-900">
            БГ-блюда с орехами (Сырная тарелка, Канапе капрезе, Куриное филе с песто, Кедровый раф)
            вынесены в отдельный блок <strong>«Опция (содержит орехи)»</strong> внизу страницы —
            доступны только по явному запросу.
          </p>
        </div>

        {/* Десерты — DEFAULT без орехов */}
        <B2BBanner />
        <div className="mt-6 mb-10">
          <h2 className="font-heading mb-2 text-2xl font-medium">
            БГ-десерты и выпечка (без орехов по умолчанию)
          </h2>
          <p className="text-muted-foreground mb-4 text-sm">
            Безглютеновый торт на день рождения, БГ капкейки, БГ хлеб — на{" "}
            <strong>рисовой и овсяной муке</strong> (без орехов). Безопасно для гостей с целиакией +
            анафилаксией на орехи.
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
            {dessertsNutFree.map((dish) => (
              <div
                key={dish.id}
                className="hover:border-gold-text group relative overflow-hidden rounded-xl border-2 border-emerald-200 bg-emerald-50/50 transition-all hover:shadow-lg"
              >
                <AllergenChips dish={dish} />
                <DishCartIndicator dishId={dish.id} />
                <div className="bg-secondary relative aspect-[4/3] overflow-hidden">
                  <FoodPhoto
                    src={getDishImage(dish.id, dish.station)}
                    alt={dish.name}
                    aspectRatio="wide"
                    objectPosition={getObjectPositionForDish(dish.id, dish.station)}
                    className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 z-10">
                    <span className="rounded bg-emerald-700 px-2 py-0.5 text-xs font-semibold text-white">
                      GF ✓
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-heading mb-1 text-base font-medium">{dish.name}</h3>
                  <p className="text-muted-foreground mb-3 line-clamp-2 text-xs">
                    {dish.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-gold-text text-sm font-semibold">
                      {dish.pricePerGuest.toLocaleString("ru-RU")} ₽/гость
                    </span>
                    <span className="text-muted-foreground text-xs">&lt;20 ppm</span>
                  </div>
                  {dish.allergens.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {dish.allergens.map((a) => (
                        <span
                          key={a}
                          className="bg-muted text-muted-foreground rounded px-2 py-0.5 text-xs"
                        >
                          {ALLERGEN_LABEL[a]}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Основные блюда — DEFAULT без орехов */}
        <div className="mb-10">
          <h2 className="font-heading mb-2 text-2xl font-medium">
            БГ-закуски и горячее (без орехов по умолчанию)
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
            {mainsNutFree.map((dish) => (
              <div
                key={dish.id}
                className="border-line bg-card hover:border-gold-text group relative overflow-hidden rounded-xl border transition-all hover:shadow-lg"
              >
                <AllergenChips dish={dish} />
                <DishCartIndicator dishId={dish.id} />
                <div className="bg-secondary relative aspect-[4/3] overflow-hidden">
                  <FoodPhoto
                    src={getDishImage(dish.id, dish.station)}
                    alt={dish.name}
                    aspectRatio="wide"
                    objectPosition={getObjectPositionForDish(dish.id, dish.station)}
                    className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 z-10">
                    <span className="rounded bg-emerald-700 px-2 py-0.5 text-xs font-semibold text-white">
                      GF ✓
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-heading mb-1 text-base font-medium">{dish.name}</h3>
                  <p className="text-muted-foreground mb-3 line-clamp-2 text-xs">
                    {dish.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-gold-text text-sm font-semibold">
                      {dish.pricePerGuest.toLocaleString("ru-RU")} ₽/гость
                    </span>
                  </div>
                  {dish.allergens.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {dish.allergens.map((a) => (
                        <span
                          key={a}
                          className="bg-muted text-muted-foreground rounded px-2 py-0.5 text-xs"
                        >
                          {ALLERGEN_LABEL[a]}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Напитки — DEFAULT без орехов */}
        {drinksNutFree.length > 0 && (
          <div className="mb-10">
            <h2 className="font-heading mb-2 text-2xl font-medium">
              БГ-напитки (без орехов по умолчанию)
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
              {drinksNutFree.map((dish) => (
                <div
                  key={dish.id}
                  className="border-line bg-card hover:border-gold-text group relative overflow-hidden rounded-xl border transition-all hover:shadow-lg"
                >
                  <AllergenChips dish={dish} />
                  <DishCartIndicator dishId={dish.id} />
                  <div className="bg-secondary relative aspect-[4/3] overflow-hidden">
                    <FoodPhoto
                      src={getDishImage(dish.id, dish.station)}
                      alt={dish.name}
                      aspectRatio="wide"
                      objectPosition={getObjectPositionForDish(dish.id, dish.station)}
                      className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-2 right-2 z-10">
                      <span className="rounded bg-emerald-700 px-2 py-0.5 text-xs font-semibold text-white">
                        GF ✓
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading mb-1 text-base font-medium">{dish.name}</h3>
                    <p className="text-muted-foreground mb-3 line-clamp-2 text-xs">
                      {dish.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-gold-text text-sm font-semibold">
                        {dish.pricePerGuest.toLocaleString("ru-RU")} ₽/гость
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Опция — блюда с миндальной мукой / кедровым орехом (НЕ для анафилаксии на орехи) */}
        {allWithNuts.length > 0 && (
          <div className="mb-10 rounded-xl border-2 border-amber-400 bg-amber-50 p-5">
            <h2 className="font-heading mb-2 text-xl font-medium text-amber-900">
              Опция: БГ-блюда с орехами (НЕ по умолчанию)
            </h2>
            <p className="mb-4 text-sm text-amber-900">
              Эти блюда <strong>безопасны для целиакии</strong> (&lt;20 ppm), но{" "}
              <strong>содержат миндальную муку или кедровый орех</strong>. Не заказывайте их при
              анафилаксии на орехи. По умолчанию БГ-меню состоит только из без орехов блюд выше. Эти
              блюда доступны только по явному запросу.
            </p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
              {allWithNuts.map((dish) => (
                <div
                  key={dish.id}
                  className="group relative overflow-hidden rounded-xl border border-amber-300 bg-white transition-all hover:shadow-lg"
                >
                  <AllergenChips dish={dish} />
                  <DishCartIndicator dishId={dish.id} />
                  <div className="bg-secondary relative aspect-[4/3] overflow-hidden">
                    <FoodPhoto
                      src={getDishImage(dish.id, dish.station)}
                      alt={dish.name}
                      aspectRatio="wide"
                      objectPosition={getObjectPositionForDish(dish.id, dish.station)}
                      className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-2 right-2 z-10">
                      <span className="rounded bg-amber-600 px-2 py-0.5 text-xs font-semibold text-white">
                        Орехи
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading mb-1 text-base font-medium">{dish.name}</h3>
                    <p className="text-muted-foreground mb-3 line-clamp-2 text-xs">
                      {dish.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-gold-text text-sm font-semibold">
                        {dish.pricePerGuest.toLocaleString("ru-RU")} ₽/гость
                      </span>
                      <span className="text-xs font-medium text-amber-700">опция</span>
                    </div>
                    {dish.allergens.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {dish.allergens.map((a) => (
                          <span
                            key={a}
                            className="rounded bg-amber-100 px-2 py-0.5 text-xs text-amber-800"
                          >
                            {ALLERGEN_LABEL[a]}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="border-gold-tint bg-gold-tint/10 rounded-xl border-2 p-6">
          <h2 className="font-heading mb-2 text-lg font-medium">Заказать полностью БГ-меню</h2>
          <p className="text-muted-foreground mb-4 text-sm">
            Соберите БГ-меню в конструкторе с фильтром «без глютена» или позвоните — шеф-повар
            подберёт под ваш бюджет. Для целиакии — обязательное подтверждение протокола перед
            бронированием.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/plan/constructor?diet=gluten-free"
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex min-h-[44px] items-center rounded-lg px-5 py-2.5 text-sm font-semibold no-underline transition-colors"
            >
              Собрать БГ-меню
            </Link>
            <a
              href={`tel:${SITE.phoneTel}`}
              className="border-line bg-card hover:border-gold-text inline-flex min-h-[44px] items-center rounded-lg border px-5 py-2.5 text-sm font-semibold no-underline transition-colors"
            >
              {SITE.phone}
            </a>
            <Link
              href="/contact"
              className="border-line bg-card hover:border-gold-text inline-flex min-h-[44px] items-center rounded-lg border px-5 py-2.5 text-sm font-semibold no-underline transition-colors"
            >
              Заявка
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
