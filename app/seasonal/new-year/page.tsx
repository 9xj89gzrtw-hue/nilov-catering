import type { Metadata } from "next";
import Link from "next/link";
import SeasonalPackages from "@/components/blocks/SeasonalPackages";

export const metadata: Metadata = {
  title: "Новый год — кейтеринг",
  description:
    "Новогодний кейтеринг NiloV: корпоративы, частные вечеринки. Меню, бар, декор — под ключ в СПб.",
  alternates: {
    canonical: "/seasonal/new-year",
    languages: { ru: "/seasonal/new-year", "x-default": "/seasonal/new-year" },
  },
};

const DISHES = [
  {
    name: "Оливье с раковыми шейками",
    desc: "Раковые шейки, картофель, яйцо, горошек, майонез",
    price: 320,
  },
  { name: "Запечённый гусь с яблоками", desc: "Гусь, яблоки, чернослив, 200 г", price: 580 },
  { name: "Корюшка горячего копчения", desc: "Корюшка на ольховой щепе", price: 250 },
  { name: "Сало в шоколаде (сет)", desc: "Солёное сало, бельгийский шоколад 70%", price: 180 },
  { name: "Мандариновый десерт", desc: "Мусс, бисквит, цедра", price: 200 },
  { name: "Имбирный чай с облепихой", desc: "Облепиха, имбирь, мёд, корица", price: 120 },
  { name: "Глинтвейн (безалкогольный)", desc: "Виноградный сок, пряности, апельсин", price: 150 },
  { name: "Шампанское (игристое)", desc: "Брют/просекко", price: 350 },
];

export default function NewYearPage() {
  return (
    <main id="main" className="pt-24 pb-20">
      <div className="container-site max-w-3xl">
        <h1 className="mb-2">Новый год</h1>
        <p className="text-muted-foreground mb-8">
          Корпоративы и частные вечеринки. Бронируйте заранее — декабрь и январь разбирают быстро.
          Цены ориентировочные.
        </p>

        <SeasonalPackages season="new-year" label="Новый год" ctaFormat="furshet" />

        <h2 className="font-heading mt-12 mb-4 text-xl font-medium">Новогодние блюда</h2>
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
            href="/menu/new-year/pdf"
            download
            className="border-line bg-card hover:border-gold-text inline-flex items-center gap-2 rounded-lg border px-5 py-3 text-sm font-medium transition-all"
          >
            Скачать новогоднее меню (печать)
          </a>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/plan/calculator?format=banket"
              className="bg-primary text-primary-foreground rounded-lg px-6 py-3 text-sm font-semibold"
            >
              Рассчитать новый год
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
              Шеф разработает новогоднее меню под ваш бюджет и площадку.
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
