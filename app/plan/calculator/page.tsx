import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import Calculator from "@/components/interactive/Calculator";
import { SITE } from "@/lib/data";
import { getPricesForFormat } from "@/lib/tariff-offers";
import type { Format } from "@/lib/types";

export const metadata: Metadata = {
  alternates: {
    canonical: "/plan/calculator",
    languages: { ru: "/plan/calculator", "x-default": "/plan/calculator" },
  },
  title: "Тарифы и таблицы — кейтеринг СПб",
  description:
    "Тарифы и таблицы: стоимость кейтеринга. Фуршет от 2 450 ₽/гость, банкет от 3 950 ₽/гость, кофе-брейк от 390 ₽/гость. Всё включено: еда, персонал, посуда, доставка по КАД.",
};

/**
 * SSR-fallback для калькулятора.
 * Показывает статичную таблицу тарифов с формулой guests × price/guest.
 * JS-калькулятор заменяет блок на интерактивный.
 */
function CalculatorServerFallback() {
  const formats: {
    format: Format;
    label: string;
    emoji: string;
    tiers: { tier: string; price: number; min: number }[];
  }[] = [
    {
      format: "furshet",
      label: "Фуршет",
      emoji: "🥂",
      tiers: [
        { tier: "Эконом", price: 2450, min: 20 },
        { tier: "Стандарт", price: 3950, min: 20 },
        { tier: "Расширенный", price: 5950, min: 20 },
      ],
    },
    {
      format: "banket",
      label: "Банкет",
      emoji: "🍽",
      tiers: [
        { tier: "Эконом", price: 3950, min: 15 },
        { tier: "Стандарт", price: 5470, min: 15 },
        { tier: "Расширенный", price: 7350, min: 15 },
        { tier: "Максимальный", price: 9950, min: 15 },
      ],
    },
    {
      format: "coffee-break",
      label: "Кофе-брейк",
      emoji: "☕",
      tiers: [
        { tier: "Эконом", price: 390, min: 10 },
        { tier: "Стандарт", price: 1450, min: 10 },
        { tier: "Расширенный", price: 1950, min: 10 },
      ],
    },
    {
      format: "detskoe",
      label: "Детский",
      emoji: "🧒",
      tiers: [
        { tier: "Эконом", price: 1550, min: 10 },
        { tier: "Стандарт", price: 2450, min: 10 },
        { tier: "Расширенный", price: 3450, min: 10 },
      ],
    },
  ];

  return (
    <div className="pt-24 pb-20">
      <div className="container-site max-w-4xl">
        <nav aria-label="Хлебные крошки" className="text-muted-foreground mb-4 text-sm">
          <Link href="/" className="hover:text-foreground">
            Главная
          </Link>
          {" / "}
          <Link href="/plan" className="hover:text-foreground">
            Спланировать
          </Link>
          {" / "}
          <span className="text-foreground">Тарифы</span>
        </nav>

        <h1 className="font-heading mb-4 text-center text-4xl font-medium md:text-5xl">
          Тарифы и таблицы
        </h1>
        <p className="text-muted-foreground mb-8 text-center text-lg">
          Базовая формула: <strong>гостей × цена за гостя</strong>. Всё включено — еда, персонал,
          посуда, доставка по КАД. Для точного расчёта под ваш сценарий —{" "}
          <a href="/contact" className="text-gold-text underline">
            оставьте заявку
          </a>
          .
        </p>

        {/* Статичная таблица тарифов — видна SSR */}
        <div className="border-line overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50">
              <tr>
                <th className="font-heading p-4 text-left">Формат</th>
                <th className="font-heading p-4 text-left">Тариф</th>
                <th className="font-heading p-4 text-right">Цена/гость</th>
                <th className="font-heading p-4 text-right">Мин. гостей</th>
                <th className="font-heading p-4 text-right">Пример: 50 гостей</th>
              </tr>
            </thead>
            <tbody>
              {formats.map((f) =>
                f.tiers.map((t, idx) => (
                  <tr
                    key={`${f.format}-${t.tier}`}
                    className={idx === 0 ? "border-line/30 border-t-2" : "border-line/30 border-t"}
                  >
                    {idx === 0 ? (
                      <td className="p-4 align-top font-semibold" rowSpan={f.tiers.length}>
                        <span className="mr-2 text-2xl">{f.emoji}</span>
                        {f.label}
                      </td>
                    ) : null}
                    <td className="p-4">{t.tier}</td>
                    <td className="text-gold-text p-4 text-right font-semibold">
                      {t.price.toLocaleString("ru-RU")} ₽
                    </td>
                    <td className="text-muted-foreground p-4 text-right">от {t.min}</td>
                    <td className="p-4 text-right font-medium">
                      {(t.price * 50).toLocaleString("ru-RU")} ₽
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Что включено */}
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="border-line bg-card rounded-xl border p-5">
            <h2 className="font-heading mb-3 text-lg font-medium">Что включено в цену</h2>
            <ul className="text-muted-foreground space-y-1.5 text-sm">
              <li>• Еда и напитки по тарифу</li>
              <li>• Официанты (1 на 10 гостей)</li>
              <li>• Координатор события</li>
              <li>• Посуда, столовые приборы, текстиль</li>
              <li>• Доставка в пределах КАД</li>
              <li>• Установка и сервировка</li>
              <li>• Уборка после события</li>
            </ul>
          </div>
          <div className="border-line bg-card rounded-xl border p-5">
            <h2 className="font-heading mb-3 text-lg font-medium">Дополнительно (опционально)</h2>
            <ul className="text-muted-foreground space-y-1.5 text-sm">
              <li>• Доставка за КАД — от 3 000 ₽</li>
              <li>• Аренда оборудования — от 5 000 ₽</li>
              <li>• Бармен-шоу — от 8 000 ₽</li>
              <li>• Шампанское безлимит — от 1 500 ₽/гость</li>
              <li>• Свадебный торт — от 1 200 ₽/кг</li>
              <li>• Флористика — по запросу</li>
              <li>• Депозит 30%, возврат за 7+ дней</li>
            </ul>
          </div>
        </div>

        {/* Скидки */}
        <div className="border-gold-tint bg-gold-tint/5 mt-6 rounded-xl border-2 p-5">
          <h2 className="font-heading mb-2 text-lg font-medium">Скидки</h2>
          <ul className="space-y-1.5 text-sm">
            <li>
              • <strong>Раннее бронирование:</strong> 10% за 60+ дней, 15% за 90+ дней
            </li>
            <li>
              • <strong>Объём:</strong> от 100 гостей — индивидуальная скидка
            </li>
            <li>
              • <strong>B2B:</strong> от 50 гостей — отсрочка платежа для постоянных клиентов
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="bg-primary text-primary-foreground mt-8 rounded-xl p-6 text-center">
          <h2 className="font-heading mb-2 text-2xl font-medium">Готовы точнее?</h2>
          <p className="mb-4 text-sm opacity-90">
            Менеджер рассчитает точную смету под ваш сценарий за 15 минут — с учётом доставки, диет,
            оборудования и скидок. Или оставьте заявку онлайн.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`tel:${SITE.phoneTel}`}
              className="bg-background text-foreground hover:bg-background/90 inline-flex min-h-[44px] items-center rounded-lg px-5 py-2.5 text-sm font-semibold no-underline transition-colors"
            >
              {SITE.phone}
            </a>
            <Link
              href="/plan/constructor"
              className="border-background hover:bg-background/10 inline-flex min-h-[44px] items-center rounded-lg border-2 px-5 py-2.5 text-sm font-semibold no-underline transition-colors"
            >
              Открыть конструктор
            </Link>
            <Link
              href="/contact"
              className="border-background hover:bg-background/10 inline-flex min-h-[44px] items-center rounded-lg border-2 px-5 py-2.5 text-sm font-semibold no-underline transition-colors"
            >
              Оставить заявку
            </Link>
          </div>
        </div>

        <noscript>
          <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            <strong>Внимание:</strong> интерактивный калькулятор требует JavaScript. Выше —
            статичная таблица тарифов. Для точного расчёта позвоните{" "}
            <a href={`tel:${SITE.phoneTel}`} className="underline">
              {SITE.phone}
            </a>
            .
          </div>
        </noscript>
      </div>
    </div>
  );
}

export default function CalculatorPage() {
  return (
    <main id="main" className="pt-24 pb-20">
      <Suspense fallback={<CalculatorServerFallback />}>
        <Calculator />
      </Suspense>
    </main>
  );
}
