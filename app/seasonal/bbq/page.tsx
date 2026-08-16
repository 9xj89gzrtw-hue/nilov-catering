import type { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import Link from "next/link";
import SeasonalPackages from "@/components/blocks/SeasonalPackages";

export const metadata: Metadata = {
  title: "BBQ-лето — кейтеринг",
  description:
    "Летний кейтеринг NiloV: гриль-меню на открытом воздухе. Шашлыки, стейки, овощи гриль — выезд в СПб и область.",
  alternates: {
    canonical: "/seasonal/bbq",
    languages: { ru: "/seasonal/bbq", "x-default": "/seasonal/bbq" },
  },
};

const DISHES = [
  { name: "Шашлык из свинины", desc: "Свиная шея в луковом маринаде, 200 г", price: 480 },
  { name: "Шашлык из курицы", desc: "Куриное бедро в аджике, 200 г", price: 380 },
  { name: "Люля-кебаб из баранины", desc: "Рубленая баранина с зеленью, 150 г", price: 450 },
  { name: "Стейк из лосося", desc: "Лосось на гриле с лимоном, 180 г", price: 620 },
  { name: "Овощи гриль", desc: "Баклажан, перец, цуккини, шампиньоны", price: 250 },
  { name: "Картофель по-деревенски", desc: "С розмарином и чесноком", price: 180 },
  { name: "Кукуруза гриль", desc: "С маслом и паприкой", price: 160 },
  { name: "Салат «Греческий»", desc: "Помидоры, огурцы, фета, оливки", price: 220 },
  { name: "Лимонад домашний", desc: "Лимон, мята, содовая", price: 120 },
  { name: "Мохито 0%", desc: "Лайм, мята, сахарный сироп, содовая", price: 140 },
];

export default function BBQPage() {
  return (
    <main id="main" className="pt-24 pb-20">
        <Breadcrumbs />
      <div className="container-site max-w-3xl">
        <h1 className="mb-2">BBQ-лето</h1>
        <p className="text-muted-foreground mb-8">
          Гриль-меню на открытом воздухе. Выезд на дачу, веранду, берег залива. Меню и цены
          ориентировочные.
        </p>

        <SeasonalPackages season="bbq" label="BBQ" ctaFormat="furshet" />

        <h2 className="font-heading mt-12 mb-4 text-xl font-medium">Блюда гриль-меню</h2>
        <div className="mb-10 space-y-3">
          {DISHES.map((d) => (
            <div
              key={d.name}
              className="border-line bg-card hover:border-gold-text rounded-xl border p-4 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">{d.name}</h3>
                  <p className="text-muted-foreground mt-0.5 text-xs">{d.desc}</p>
                </div>
                <span className="text-gold-text ml-4 shrink-0 text-sm font-semibold">
                  {d.price} ₽
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <a
            href="/menu/bbq/pdf"
            download
            className="border-line bg-card hover:border-gold-text inline-flex items-center gap-2 rounded-lg border px-5 py-3 text-sm font-medium transition-all"
          >
            Скачать BBQ-меню (печать)
          </a>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/plan/calculator?format=furshet"
              className="bg-primary text-primary-foreground rounded-lg px-6 py-3 text-sm font-semibold"
            >
              Рассчитать BBQ
            </Link>
            <Link
              href="/plan/constructor"
              className="border-gold-text text-gold-text hover:bg-gold-tint rounded-lg border px-6 py-3 text-sm font-semibold transition-all"
            >
              Собрать меню в конструкторе
            </Link>
          </div>
          <div className="border-line bg-card/50 rounded-xl border border-dashed p-5">
            <p className="mb-1 text-sm font-medium">Нужен особый формат? Составим индивидуально</p>
            <p className="text-muted-foreground mb-3 text-xs">
              Шеф разработает гриль-меню под вашу площадку и количество гостей.
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
  );
}
