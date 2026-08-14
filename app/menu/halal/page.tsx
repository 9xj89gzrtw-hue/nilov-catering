"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ALL_DISHES } from "@/lib/menu-data";
import { ALLERGEN_LABEL } from "@/lib/types";
import { SITE } from "@/lib/data";
import FoodPhoto from "@/components/common/FoodPhoto";
import B2BBanner from "@/components/common/B2BBanner";
import { AllergenChips } from "@/components/common/AllergenChips";
import DishCartIndicator from "@/components/interactive/DishCartIndicator";
import { getDishImage, getObjectPositionForDish } from "@/lib/dish-images";

export default function HalalPage() {
  const dishes = useMemo(() => ALL_DISHES.filter((d) => d.dietBadges.includes("halal")), []);

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
          <span className="text-foreground">Халяль</span>
        </nav>

        <h1 className="font-heading mb-3 text-3xl font-medium md:text-4xl">Халяль-кейтеринг</h1>
        <p className="text-muted-foreground mb-3 text-lg">
          Настоящий халяль: забой по обряду зибха (zibh) с произнесением такбира (tasmiya).
          Сертификат от Совета муфтиев России — Международного центра стандартизации и сертификации
          «Халяль». Рег. № СМР-Халяль (скан по запросу), действует до 31.12.2026. Отдельное
          оборудование, без свинины, без алкоголя.
        </p>
        <p className="text-muted-foreground mb-6 text-sm">
          Проверить подлинность сертификата:{" "}
          <a
            href="https://halalcenter.ru"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold-text font-semibold underline"
          >
            реестр МЦСС «Халяль» (halalcenter.ru) →
          </a>
          {" · "}
          <Link href="/certificates" className="text-gold-text font-semibold underline">
            запросить скан PDF на странице сертификатов →
          </Link>
        </p>

        {/* B2B banner — НДС indicator for corporate clients */}
        <div className="mb-8">
          <B2BBanner />
        </div>

        {/* Ифтар / Рамадан блок */}
        <div className="mb-8 rounded-2xl border-2 border-amber-300 bg-amber-50 p-6">
          <h2 className="font-heading mb-3 text-xl font-medium">
            Рамадан и ифтар — меню разговения
          </h2>
          <p className="mb-3 text-sm text-amber-900">
            В месяц Рамадан организуем ифтары (разговение после заката солнца) для коллективов и
            семей. Подача синхронизирована с временем магриба — готовое меню доставляем за 30 минут
            до захода.
          </p>
          <div className="grid gap-3 text-sm sm:grid-cols-3">
            <div className="rounded-lg bg-white/60 p-3">
              <p className="mb-1 font-semibold text-amber-900">Традиционное начало</p>
              <p className="text-xs text-amber-800">
                Финики (3 шт./гость) + вода + молоко — открывают пост по сунне Пророка ﷺ.
              </p>
            </div>
            <div className="rounded-lg bg-white/60 p-3">
              <p className="mb-1 font-semibold text-amber-900">Суп (чорба / харис)</p>
              <p className="text-xs text-amber-800">
                Горячий суп после фиников — баранья чорба или пшеничная харис.
              </p>
            </div>
            <div className="rounded-lg bg-white/60 p-3">
              <p className="mb-1 font-semibold text-amber-900">Основное + салаты</p>
              <p className="text-xs text-amber-800">
                Халяль-шашлык, плов, фаттуш, табуле, хумус — на выбор.
              </p>
            </div>
            <div className="rounded-lg bg-white/60 p-3">
              <p className="mb-1 font-semibold text-amber-900">Десерт (чак-чак)</p>
              <p className="text-xs text-amber-800">
                Татарский чак-чак или пахлава с чаем из трав.
              </p>
            </div>
            <div className="rounded-lg bg-white/60 p-3">
              <p className="mb-1 font-semibold text-amber-900">Логистика магриба</p>
              <p className="text-xs text-amber-800">
                Доставка с учётом точного времени заката. Менеджер уточнит время за день до ифтара.
              </p>
            </div>
            <div className="rounded-lg bg-white/60 p-3">
              <p className="mb-1 font-semibold text-amber-900">Минимум — 20 чел</p>
              <p className="text-xs text-amber-800">
                Ифтар-пакет от 1 800 ₽/гость. Для коллектива 30+ — скидка 10%.
              </p>
            </div>
          </div>
          <p className="mt-3 text-xs text-amber-800">
            <Link
              href="/contact?eventType=Ифтар+%2F+Рамадан&format=Ифтар&guests=30"
              className="font-semibold underline"
            >
              Заказать ифтар →
            </Link>
            {" · "}
            <Link
              href="/plan/constructor?format=furshet&diet=halal"
              className="font-semibold underline"
            >
              Собрать халяль-меню в конструкторе →
            </Link>
          </p>
        </div>

        {/* Никах блок */}
        <div className="mb-8 rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-6">
          <h2 className="font-heading mb-3 text-xl font-medium">
            Никах — исламская свадебная церемония
          </h2>
          <p className="mb-3 text-sm text-emerald-900">
            Организуем помолвку и никах с учётом исламских традиций: без алкоголя, без свинины,
            раздельные станции для мужчин и женщин (по запросу), традиционные блюда.
          </p>
          <div className="grid gap-3 text-sm sm:grid-cols-2">
            <div className="rounded-lg bg-white/60 p-3">
              <p className="mb-1 font-semibold text-emerald-900">Меню никаха</p>
              <p className="text-xs text-emerald-800">
                Плов, манты, чебуреки, самса, халяль-шашлык, чак-чак, пахлава, чайная церемония.
              </p>
            </div>
            <div className="rounded-lg bg-white/60 p-3">
              <p className="mb-1 font-semibold text-emerald-900">Без алкоголя и свинины</p>
              <p className="text-xs text-emerald-800">
                Полный бар — безалкогольный: морсы, лимонады, чай, безалкогольные коктейли. Винный
                уксус, мирин, коньяк, <strong>ванильный экстракт (35% алк.)</strong>, ром в пропитке
                тортов — исключены. Заменяем на ванильный порошок/пасту.
              </p>
            </div>
            <div className="rounded-lg bg-white/60 p-3">
              <p className="mb-1 font-semibold text-emerald-900">Цена никаха</p>
              <p className="text-xs text-emerald-800">
                От <strong>3 950 ₽/гость</strong> (минимум 15 гостей). Включает: меню из 8 блюд,
                безалкогольный бар, сервировка, официанты. Подробности и индивидуальный расчёт — у
                менеджера.
              </p>
            </div>
            <div className="rounded-lg bg-white/60 p-3">
              <p className="mb-1 font-semibold text-emerald-900">Раздельный зал</p>
              <p className="text-xs text-emerald-800">
                По запросу — раздельные станции для мужчин и женщин, перегородка, женский зал с
                женским персоналом.
              </p>
            </div>
            <div className="rounded-lg bg-white/60 p-3">
              <p className="mb-1 font-semibold text-emerald-900">Сертификат СМР</p>
              <p className="text-xs text-emerald-800">
                Предоставляем копию сертификата Совета муфтиев России на подписанный договор.
              </p>
            </div>
          </div>
          <p className="mt-3 text-xs text-emerald-800">
            <Link
              href="/contact?eventType=Никах+%28халяль%29&format=Банкет&guests=50"
              className="font-semibold underline"
            >
              Заказать никах →
            </Link>
            {" · "}
            <Link href="/events/svadba" className="font-semibold underline">
              Свадебный кейтеринг (общая страница) →
            </Link>
          </p>
        </div>

        {/* Халяль-протокол — детально */}
        <div className="mb-8 rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-6">
          <h2 className="font-heading mb-4 text-xl font-medium">Протокол халяль-приготовления</h2>
          <div className="grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <h3 className="mb-1 font-semibold">Сертифицирующий орган</h3>
              <p className="text-muted-foreground">
                Совет муфтиев России (ДУМ РФ) — Международный центр стандартизации и сертификации
                «Халяль». Рег. № СМР-Халяль (скан по запросу), до 31.12.2026.{" "}
              </p>
            </div>
            <div>
              <h3 className="mb-1 font-semibold">Забой скота (zibha)</h3>
              <p className="text-muted-foreground">
                По обряду зибха: перерезание сонной артерии, пищевода и трахеи одним движением, с
                произнесением такбира «Бисмиллях-и-Рахмани-р-Рахим».
              </p>
            </div>
            <div>
              <h3 className="mb-1 font-semibold">Поставщики мяса</h3>
              <p className="text-muted-foreground">
                Сертифицированные халяль-бойни Ленинградской области. Каждая партия — с сертификатом
                халяль.
              </p>
            </div>
            <div>
              <h3 className="mb-1 font-semibold">Раздельное оборудование</h3>
              <p className="text-muted-foreground">
                Отдельный мангал, гриль, сковороды, ножи, разделочные доски — без пересечения со
                свининой. Цветовая маркировка — зелёная.
              </p>
            </div>
            <div>
              <h3 className="mb-1 font-semibold">Без алкоголя</h3>
              <p className="text-muted-foreground">
                Халяль-заказы готовятся в окне без алкогольных ингредиентов. Винный уксус, мирин,
                коньяк, <strong>ванильный экстракт (35% алк.)</strong>, ром в пропитке тортов —
                исключены. Заменяем на ванильный порошок/пасту. Соусы на халяль-базе.
              </p>
            </div>
            <div>
              <h3 className="mb-1 font-semibold">Доставка</h3>
              <p className="text-muted-foreground">
                Отдельный транспорт для халяль-заказов, без пересечения со свининой.
                Водитель-экспедитор — с медкнижкой.
              </p>
            </div>
          </div>
          <p className="text-muted-foreground mt-4 text-xs italic">
            Срок согласования халяль-меню — от 3 рабочих дней (закупка сертифицированного мяса).
          </p>
        </div>

        {/* CTA-блок — собрать халяль-меню */}
        <div className="border-gold-tint bg-gold-tint/10 mb-10 flex flex-wrap items-center justify-between gap-4 rounded-xl border p-5">
          <div>
            <h3 className="font-heading mb-1 text-base font-medium">Собрать халяль-меню</h3>
            <p className="text-muted-foreground text-sm">
              В конструкторе выберите формат — фуршет или банкет — с фильтром «Халяль».
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/plan/constructor?format=furshet&diet=halal"
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex min-h-[44px] items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold no-underline transition-colors"
            >
              Халяль-фуршет
            </Link>
            <Link
              href="/plan/constructor?format=banket&diet=halal"
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex min-h-[44px] items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold no-underline transition-colors"
            >
              Халяль-банкет
            </Link>
            <a
              href={`tel:${SITE.phoneTel}`}
              className="border-line bg-card hover:border-gold-text inline-flex min-h-[44px] items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold no-underline transition-colors"
            >
              Позвонить
            </a>
          </div>
        </div>

        <h2 className="font-heading mb-4 text-2xl font-medium">
          Халяль-блюда в каталоге ({dishes.length})
        </h2>
        <p className="text-muted-foreground mb-4 text-sm">
          Каждое мясное блюдо — из мяса халяль-забоя по обряду зибха. Веганские блюда (хумус,
          фаттуш, табуле) помечены «веган» — они не содержат мяса, забой не требуется. Без свинины,
          без алкоголя.
        </p>

        <B2BBanner />

        {dishes.length > 0 && (
          <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dishes.map((dish) => {
              const isVegan = dish.dietBadges.includes("vegan");
              const isMeat = !isVegan; // For halal dishes: vegan = no meat, others = meat from zibha
              return (
                <div
                  key={dish.id}
                  className="border-line bg-card hover:border-gold-text overflow-hidden rounded-xl border transition-colors"
                >
                  <div className="bg-secondary relative aspect-[4/3] overflow-hidden">
                    <AllergenChips dish={dish} />
                    <DishCartIndicator dishId={dish.id} />
                    <FoodPhoto
                      src={getDishImage(dish.id, dish.station)}
                      alt={dish.name}
                      aspectRatio="wide"
                      objectPosition={getObjectPositionForDish(dish.id, dish.station)}
                      className="h-full w-full"
                    />
                    <div className="absolute top-2 left-2 flex gap-1">
                      <span className="bg-diet-vegan rounded px-1.5 py-0.5 text-[10px] font-bold text-white">
                        H Халяль
                      </span>
                      {isVegan && (
                        <span className="rounded bg-emerald-700 px-1.5 py-0.5 text-[10px] font-bold text-white">
                          VG Веган
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="mb-2 flex items-start justify-between">
                      <h3 className="font-heading pr-2 text-base font-medium">{dish.name}</h3>
                    </div>
                    <p className="text-muted-foreground mb-3 text-sm">{dish.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-gold-text text-sm font-semibold">
                        {dish.pricePerGuest.toLocaleString("ru-RU")} ₽/гость
                      </span>
                      <span
                        className="text-muted-foreground text-xs"
                        title={
                          isMeat
                            ? "Забой по обряду зибха с такбиром"
                            : "Веганское блюдо — забой не требуется"
                        }
                      >
                        {isMeat ? " забой: зибха" : " веган"}
                      </span>
                    </div>
                    {dish.allergens.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {dish.allergens.map((a) => {
                          const isNut = a === "nuts" || a === "peanuts";
                          return (
                            <span
                              key={a}
                              className={`rounded px-2 py-0.5 text-xs ${
                                isNut
                                  ? "bg-destructive/20 text-destructive font-semibold"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {ALLERGEN_LABEL[a]}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Связаться для bespoke халяль-меню */}
        <div className="border-line bg-secondary/30 rounded-xl border-2 p-6">
          <h3 className="font-heading mb-2 text-lg font-medium">
            Нужно индивидуальное халяль-меню?
          </h3>
          <p className="text-muted-foreground mb-4 text-sm">
            Шеф-повар Дмитрий Нилов разработает халяль-меню под ваш бюджет, формат и количество
            гостей. Учитываем традиции: раздельные станции для мужчин/женщин (по запросу), отдельная
            посуда, безалкогольные напитки.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={`tel:${SITE.phoneTel}`}
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex min-h-[44px] items-center rounded-lg px-5 py-2.5 text-sm font-semibold no-underline transition-colors"
            >
              {SITE.phone}
            </a>
            <Link
              href="/contact"
              className="border-line bg-card hover:border-gold-text inline-flex min-h-[44px] items-center rounded-lg border px-5 py-2.5 text-sm font-semibold no-underline transition-colors"
            >
              Оставить заявку
            </Link>
            <Link
              href="/certificates"
              className="border-line bg-card hover:border-gold-text inline-flex min-h-[44px] items-center rounded-lg border px-5 py-2.5 text-sm font-semibold no-underline transition-colors"
            >
              Сертификаты
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
