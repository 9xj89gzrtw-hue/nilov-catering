import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Страница не найдена",
  robots: { index: false, follow: true },
};

const POPULAR_PAGES = [
  { href: "/menu", label: "Меню", desc: "124 блюда, 7 категорий" },
  { href: "/events", label: "Услуги", desc: "Свадьбы, корпоративы, дни рождения" },
  { href: "/pricing", label: "Цены", desc: "От 390 ₽/гость" },
  { href: "/gallery", label: "Галерея", desc: "Фото с реальных событий" },
  { href: "/plan/helper", label: "Рассчитать стоимость", desc: "За 30 секунд" },
  { href: "/reviews", label: "Отзывы", desc: "4.8/5, 27+ отзывов" },
];

export default function NotFound() {
  return (
    <main id="main" className="flex min-h-screen flex-col items-center justify-center px-4 py-20">
      <div className="w-full max-w-2xl text-center">
        <p className="text-gold-text/30 mb-4 font-mono text-7xl font-light">404</p>
        <h1 className="font-heading mb-3 text-3xl font-medium md:text-4xl">
          Страница не найдена
        </h1>
        <p className="text-muted-foreground mb-8 text-lg">
          Возможно, страница была перемещена или вы перешли по устаревшей ссылке. Вот популярные
          разделы, которые могут помочь:
        </p>

        <div className="mb-8 grid gap-3 sm:grid-cols-2">
          {POPULAR_PAGES.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="border-line bg-card hover:border-gold-text rounded-lg border p-4 text-left transition-colors"
            >
              <span className="block font-medium">{p.label}</span>
              <span className="text-muted-foreground text-sm">{p.desc}</span>
            </Link>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="bg-primary text-primary-foreground inline-flex min-h-[44px] items-center rounded-lg px-6 py-2.5 text-sm font-semibold"
          >
            На главную
          </Link>
          <Link
            href="/contact"
            className="text-gold-text inline-flex min-h-[44px] items-center px-2 text-sm hover:underline"
          >
            Связаться с нами
          </Link>
        </div>
      </div>
    </main>
  );
}
