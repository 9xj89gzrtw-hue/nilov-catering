import type { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import Link from "next/link";
import SeasonalPackages from "@/components/blocks/SeasonalPackages";

export const metadata: Metadata = {
  title: "Масленица — кейтеринг",
  description: "Масленица с NiloV: блины, самовар, народные гуляния. Выездной кейтеринг в СПб.",
  alternates: {
    canonical: "/seasonal/maslenitsa",
    languages: { ru: "/seasonal/maslenitsa", "x-default": "/seasonal/maslenitsa" },
  },
};

const DISHES = [
  { name: "Блины классические", desc: "Тонкие блины со сметаной, мёдом, вареньем", price: 120 },
  {
    name: "Блины с красной икрой",
    desc: "Тонкий блин, сливочное масло, икра лососёвая",
    price: 280,
  },
  { name: "Блины с сёмгой", desc: "Слабосолёная сёмга, творожный сыр, укроп", price: 250 },
  {
    name: "Блины с грибами",
    desc: "Жульен из шампиньонов и лисичек в блинном мешочке",
    price: 220,
  },
  { name: "Блины с мясом", desc: "Томлёная говядина, лук, сметанный соус", price: 240 },
  { name: "Блинный торт", desc: "10 слоёв с заварным кремом и ягодами", price: 180 },
  { name: "Оладьи яблочные", desc: "Пышные оладьи с карамелизированными яблоками", price: 150 },
  { name: "Самовар (чай)", desc: "Традиционный самовар с чёрным чаем, травами, мёдом", price: 90 },
  { name: "Сбитень медовый", desc: "Горячий напиток с мёдом, имбирём и пряностями", price: 130 },
  { name: "Морс клюквенный", desc: "Домашний морс из клюквы с мятой", price: 100 },
];

export default function MaslenitsaPage() {
  return (
    <main id="main" className="pt-24 pb-20">
        <Breadcrumbs />
      <div className="container-site max-w-3xl">
        <h1 className="mb-2">Масленица</h1>
        <p className="text-muted-foreground mb-8">
          Блины, самовар, народные гуляния — выездной кейтеринг на Масленицу. Меню согласовывается
          индивидуально.
        </p>

        <SeasonalPackages season="maslenitsa" label="Масленица" ctaFormat="furshet" />

        <h2 className="font-heading mt-12 mb-4 text-xl font-medium">Все масленичные блюда</h2>
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
                  {d.price} ₽/гость
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <a
            href="/menu/maslenitsa/pdf"
            download
            className="border-line bg-card hover:border-gold-text inline-flex items-center gap-2 rounded-lg border px-5 py-3 text-sm font-medium transition-all"
          >
            Скачать меню Масленицы (печать)
          </a>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/plan/calculator?format=furshet"
              className="bg-primary text-primary-foreground rounded-lg px-6 py-3 text-sm font-semibold"
            >
              Рассчитать Масленицу
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
              Шеф разработает масленичное меню под количество гостей и площадку.
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
