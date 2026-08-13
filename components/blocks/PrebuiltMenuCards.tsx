"use client";

import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import { ALL_DISHES } from "@/lib/menu-data";
import { getDishImage } from "@/lib/dish-images";
import FoodPhoto from "@/components/common/FoodPhoto";

/**
 * PrebuiltMenuCards — ready-made menu sets shown at top of catalog.
 *
 * Owner: 'клиент должен сразу видеть все красивые меню с картинками стандартные'
 * Menu UX critic: 'Pre-built menus exist in code but aren't shown on catalog'
 *
 * Shows 6 pre-built menu sets with photos, dish count, price/guest, total.
 */
const SETS = [
  {
    name: "Фуршет «Лёгкий»",
    format: "furshet",
    tier: "economy",
    pricePerGuest: 2450,
    minGuests: 20,
    defaultGuests: 50,
    dishIds: [
      "canape-salmon",
      "canape-caprese",
      "tartaletka-olivier",
      "bruschetta-tomato",
      "mini-burger",
      "meat-platter",
      "cheese-platter",
      "fruit-platter",
      "lemonade-tarragon",
      "cranberry-mors",
    ],
    photo: "/images/catering/canape-04.jpg",
    desc: "10 закусок + 2 напитка — для фуршета на 50 гостей",
  },
  {
    name: "Фуршет «Премиум»",
    format: "furshet",
    tier: "premium",
    pricePerGuest: 5950,
    minGuests: 20,
    defaultGuests: 50,
    dishIds: [
      "canape-salmon",
      "tartar-beef",
      "bruschetta-tomato",
      "mini-burger",
      "beef-medallions",
      "meat-platter",
      "cheese-platter",
      "burrata-tomatoes",
      "macaron-shooter",
      "choc-mousse",
      "fruit-platter",
      "lemonade-tarragon",
      "cranberry-mors",
      "cedar-raf",
    ],
    photo: "/images/catering/finedining-04.jpg",
    desc: "14 блюд с тартаром, бурратой и медальонами — для фуршета на 50 гостей",
  },
  {
    name: "Банкет «Классика»",
    format: "banket",
    tier: "standard",
    pricePerGuest: 5470,
    minGuests: 15,
    defaultGuests: 50,
    dishIds: [
      "canape-salmon",
      "tartar-beef",
      "burrata-tomatoes",
      "meat-platter",
      "cheese-platter",
      "beef-medallions",
      "cauli-steak",
      "macaron-shooter",
      "choc-mousse",
      "fruit-platter",
      "lemonade-tarragon",
      "cranberry-mors",
    ],
    photo: "/images/catering/wedding-05.jpg",
    desc: "12 блюд с подачей — банкет с посадкой на 50 гостей",
  },
  {
    name: "Кофе-брейк «Конференция»",
    format: "coffee-break",
    tier: "standard",
    pricePerGuest: 1450,
    minGuests: 10,
    defaultGuests: 50,
    dishIds: [
      "croissant",
      "muffin",
      "mini-sandwich",
      "fruit-platter",
      "lemonade-berry",
      "seabuckthorn-tea",
      "cedar-raf",
    ],
    photo: "/images/catering/coffee-04.jpg",
    desc: "7 позиций: выпечка, сэндвичи, фрукты, напитки — 2 смены подачи",
  },
  {
    name: "Детский «Праздник»",
    format: "detskoe",
    tier: "standard",
    pricePerGuest: 1550,
    minGuests: 10,
    defaultGuests: 20,
    dishIds: [
      "mini-burger",
      "mini-pizza",
      "fruit-platter",
      "macaron-shooter",
      "choc-mousse",
      "lemonade-tarragon",
      "cranberry-mors",
    ],
    photo: "/images/catering/dessert-04.jpg",
    desc: "7 блюд + аниматор 2 часа — для детского дня рождения на 20 детей",
  },
  {
    name: "BBQ «Пикник»",
    format: "furshet",
    tier: "economy",
    pricePerGuest: 2450,
    minGuests: 20,
    defaultGuests: 30,
    dishIds: [
      "shashlik-pork",
      "shashlik-chicken",
      "grilled-vegetables",
      "bruschetta-tomato",
      "meat-platter",
      "fruit-platter",
      "lemonade-tarragon",
      "cranberry-mors",
    ],
    photo: "/images/catering/bbq-04.jpg",
    desc: "8 блюд на мангале — для загородного пикника на 30 гостей",
  },
];

export default function PrebuiltMenuCards() {
  return (
    <section className="mb-10" aria-labelledby="prebuilt-heading">
      <h2 id="prebuilt-heading" className="font-heading mb-2 text-2xl font-medium">
        Готовые меню
      </h2>
      <p className="text-muted-foreground mb-5 text-sm">
        Нажмите на меню, чтобы увидеть все блюда. Можно изменить состав под себя.
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {SETS.map((set) => {
          const total = set.pricePerGuest * set.defaultGuests;
          const constructorHref = `/plan/constructor?format=${set.format}&tier=${set.tier}&guests=${set.defaultGuests}`;
          return (
            <Link
              key={set.name}
              href={constructorHref}
              className="group border-line bg-card hover:border-gold-text/40 block overflow-hidden rounded-2xl border no-underline transition-all hover:shadow-lg"
            >
              {/* Photo */}
              <div className="relative aspect-[16/9] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={set.photo}
                  alt={set.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)",
                  }}
                  aria-hidden="true"
                />
                <div className="absolute right-3 bottom-2 left-3">
                  <p className="font-heading text-lg text-white" style={{ fontWeight: 500 }}>
                    {set.name}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-muted-foreground mb-3 line-clamp-2 text-xs">{set.desc}</p>

                <div className="mb-3 flex items-baseline justify-between">
                  <div>
                    <span className="font-heading text-foreground text-2xl font-semibold">
                      {set.pricePerGuest.toLocaleString("ru-RU")} ₽
                    </span>
                    <span className="text-muted-foreground ml-1 text-xs">/гость</span>
                  </div>
                  <div className="text-right">
                    <span className="text-muted-foreground text-xs">
                      ≈ {total.toLocaleString("ru-RU")} ₽
                    </span>
                    <p className="text-muted-foreground flex items-center justify-end gap-1 text-[10px]">
                      <Users className="h-3 w-3" />
                      {set.defaultGuests} гостей
                    </p>
                  </div>
                </div>

                <div className="text-foreground group-hover:text-gold-text flex items-center justify-between text-sm font-medium transition-colors">
                  <span>Открыть меню ({set.dishIds.length} блюд)</span>
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
