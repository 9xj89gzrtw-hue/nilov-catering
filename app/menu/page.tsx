import type { Metadata } from "next";
import Link from "next/link";
import { ALL_DISHES } from "@/lib/menu-data";
import { getDishImage, getObjectPositionForDish } from "@/lib/dish-images";
import FoodPhoto from "@/components/common/FoodPhoto";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import PageHeader from "@/components/common/PageHeader";
import { ALLERGEN_LABEL } from "@/lib/types";

export const metadata: Metadata = {
  alternates: { canonical: "/menu", languages: { ru: "/menu", "x-default": "/menu" } },
  title: "Меню и цены",
  description:
    "Фуршет, банкет, кофе-брейк — меню и цены на кейтеринг в СПб. От 390 ₽/гость. Все блюда с ценами и составом.",
};

// Группируем блюда по форматам
const FORMATS = [
  {
    slug: "furshet",
    label: "Фуршет",
    href: "/menu/furshet",
    price: "от 2 450 ₽/гость",
    emoji: "",
    desc: "Канапе, тарталетки, закуски. Для корпоративов и дней рождения. Гости едят стоя.",
  },
  {
    slug: "banket",
    label: "Банкет",
    href: "/menu/banquet",
    price: "от 3 950 ₽/гость",
    emoji: "",
    desc: "Полноценный обед с посадкой. Салаты, суп, горячее. Для свадеб и торжеств.",
  },
  {
    slug: "coffee-break",
    label: "Кофе-брейк",
    href: "/menu/coffee-break",
    price: "от 390 ₽/гость",
    emoji: "",
    desc: "Выпечка, сэндвичи, десерты, кофе. Для конференций и тренингов.",
  },
  {
    slug: "detskoe",
    label: "Детское",
    href: "/menu/detskoe",
    price: "от 1 550 ₽/гость",
    emoji: "",
    desc: "Бургеры, наггетсы, смузи. Безопасное и вкусное меню для детей.",
  },
  {
    slug: "vegan",
    label: "Веган",
    href: "/menu/vegan",
    price: "от 2 950 ₽/гость",
    emoji: "",
    desc: "Растительное меню без продуктов животного происхождения.",
  },
  {
    slug: "show-cooking",
    label: "Шоу-кухня",
    href: "/menu/show-cooking",
    price: "от 3 950 ₽/гость",
    emoji: "👨‍🍳",
    desc: "Живые станции: паста, суши, пицца. Еда как шоу для ваших гостей.",
  },
  {
    slug: "pominki",
    label: "Поминки",
    href: "/events/pominki",
    price: "от 1 800 ₽/гость",
    emoji: "",
    desc: "Поминальный обед по православной традиции: кутья, блины, кисель, рыба. Без алкоголя.",
  },
];

// Популярные блюда со всех меню (для витрины)
const POPULAR = ALL_DISHES.filter(
  (d) => d.id.startsWith("canape-") || d.id.startsWith("tartaletka-")
).slice(0, 8);

function DishCard({ dish }: { dish: (typeof ALL_DISHES)[number] }) {
  const dishImg = getDishImage(dish.id, dish.station);
  return (
    <div className="border-line bg-card hover:border-gold-text group overflow-hidden rounded-xl border transition-all duration-300 hover:-translate-y-0.5">
      <div className="relative">
        <FoodPhoto
          src={dishImg}
          alt={dish.name}
          aspectRatio="wide"
          objectPosition={getObjectPositionForDish(dish.id, dish.station)}
          className="w-full"
        />
        <div className="absolute right-2 bottom-2 z-10">
          <span className="rounded-full bg-white/80 px-2 py-0.5 text-xs font-semibold backdrop-blur-sm">
            {dish.pricePerGuest} ₽/гость
          </span>
        </div>
        {dish.dietBadges.length > 0 && (
          <div className="absolute top-2 left-2 z-10 flex gap-1">
            {dish.dietBadges.includes("vegan") && (
              <span className="bg-diet-vegan rounded px-1.5 py-0.5 text-[10px] font-bold text-white">
                VEGAN
              </span>
            )}
            {dish.dietBadges.includes("gluten-free") && (
              <span className="bg-diet-gf rounded px-1.5 py-0.5 text-[10px] font-bold text-white">
                GF
              </span>
            )}
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="group-hover:text-gold-text mb-1 text-sm leading-tight font-medium transition-colors">
          {dish.name}
        </h3>
        <p className="text-muted-foreground mb-2 line-clamp-2 text-xs">{dish.description}</p>
        {/* Allergen chips — visible на /menu */}
        {dish.allergens.length > 0 && (
          <div className="flex flex-wrap gap-0.5">
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
                  className={`rounded px-1 py-0.5 text-xs leading-none ${
                    isHighRisk
                      ? "bg-destructive/20 text-destructive font-semibold"
                      : "bg-muted text-muted-foreground"
                  }`}
                  title={ALLERGEN_LABEL[a]}
                >
                  {ALLERGEN_LABEL[a]}
                </span>
              );
            })}
            {dish.allergens.length > 4 && (
              <span className="bg-muted text-muted-foreground rounded px-1 py-0.5 text-[10px] leading-none">
                +{dish.allergens.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function MenuPage() {
  return (
    <main className="pt-24 pb-20" id="main">
      <div className="container-site">
        <Breadcrumbs />

        <PageHeader
          title="Меню и цены"
          eyebrow="Все форматы"
          subtitle="Любой формат — от кофе-брейка до банкета. Все цены указаны за человека."
          actions={
            <Link
              href="/plan/helper"
              className="bg-primary text-primary-foreground hover:bg-primary/90 touch-target inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold no-underline transition-colors"
            >
              Не знаете что выбрать? Подберём за 3 вопроса →
            </Link>
          }
        />

        {/* Quick price anchors */}
        <div className="mb-16 flex flex-wrap justify-center gap-3">
          {FORMATS.filter((f) => f.price).map((f) => (
            <Link
              key={f.slug}
              href={f.href}
              className="border-line hover:border-gold-text hover:bg-gold-tint rounded-full border px-5 py-2 text-sm transition-colors"
            >
              {f.emoji} {f.label} — <span className="text-gold-text font-semibold">{f.price}</span>
            </Link>
          ))}
        </div>

        {/* Format grid */}
        <div className="mb-20 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FORMATS.map((f) => (
            <Link
              key={f.slug}
              href={f.href}
              className="group border-line bg-card hover:border-gold-text relative overflow-hidden rounded-xl border p-6 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="mb-3 text-3xl">{f.emoji}</div>
              <h2 className="font-heading group-hover:text-gold-text mb-2 text-xl font-medium transition-colors">
                {f.label}
              </h2>
              <p className="text-muted-foreground mb-3 text-sm">{f.desc}</p>
              {f.price && <span className="text-gold-text text-sm font-bold">{f.price}</span>}
              <div className="absolute top-3 right-3 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="bg-gold-text rounded-full px-3 py-1 text-xs text-white">→</span>
              </div>
            </Link>
          ))}
        </div>

        {/* POPULAR DISHES SHOWCASE */}
        <div className="mb-20">
          <h2 className="font-heading mb-2 text-2xl font-medium">Популярные блюда</h2>
          <p className="text-muted-foreground mb-6">
            Примеры того, что мы готовим. Каждое блюдо — под заказ.
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {POPULAR.map((dish) => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </div>
        </div>

        {/* Diet lines */}
        <div className="bg-muted/30 border-line mb-16 rounded-2xl border p-8">
          <h2 className="font-heading mb-3 text-center text-2xl font-medium">
            Специальные линии меню
          </h2>
          <p className="text-muted-foreground mb-6 text-center">
            Для гостей с особыми предпочтениями
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: "Веган", href: "/menu/vegan", desc: "Без мяса, молока, яиц" },
              {
                label: "Без глютена",
                href: "/menu/gluten-free",
                desc: "Для целиакии (отдельная линия <20 ppm)",
              },
              { label: "Халяль", href: "/menu/halal", desc: "Сертифицированное халяль-меню" },
              {
                label: "Без сахара (СД1/СД2)",
                href: "/allergens#sd1",
                desc: "Стевия/эритрит, ХЕ на каждом блюде",
              },
              {
                label: "Без орехов",
                href: "/allergens#anafilaksiya",
                desc: "Анафилаксия: EpiPen-протокол",
              },
              {
                label: "Целиакия-протокол",
                href: "/allergens#celiakia",
                desc: "Отдельная зона + синяя маркировка",
              },
            ].map((d) => (
              <Link
                key={d.href}
                href={d.href}
                className="border-line bg-card hover:border-gold-text rounded-xl border px-5 py-3 transition-all hover:-translate-y-0.5"
              >
                <div className="mb-0.5 text-sm font-medium">{d.label}</div>
                <div className="text-muted-foreground text-xs">{d.desc}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="from-muted/50 border-line rounded-2xl border bg-gradient-to-b to-transparent py-10 text-center">
          <p className="font-heading mb-2 text-xl font-medium">Не нашли то, что ищете?</p>
          <p className="text-muted-foreground mb-5">
            Мы составим индивидуальное меню под ваш бюджет и вкусы.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/plan/constructor"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-6 py-3 text-sm font-semibold transition-colors"
            >
              Собрать меню
            </Link>
            <Link
              href="/plan/helper"
              className="border-line hover:bg-muted rounded-lg border px-6 py-3 text-sm font-semibold transition-colors"
            >
              Помогите выбрать
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
