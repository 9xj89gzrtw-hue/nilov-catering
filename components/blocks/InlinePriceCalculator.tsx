"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Check, Users } from "lucide-react";

const FORMATS = [
  { id: "furshet", label: "Фуршет", pricePerGuest: 2450, minGuests: 20, icon: "🥂" },
  { id: "banket", label: "Банкет", pricePerGuest: 3950, minGuests: 15, icon: "🍽️" },
  { id: "coffee-break", label: "Кофе-брейк", pricePerGuest: 390, minGuests: 10, icon: "☕" },
  { id: "detskoe", label: "Детское", pricePerGuest: 1550, minGuests: 10, icon: "🎈" },
  { id: "pominki", label: "Поминки", pricePerGuest: 1800, minGuests: 10, icon: "🕯️" },
  { id: "chef-at-home", label: "Шеф на дом", pricePerGuest: 4500, minGuests: 6, icon: "👨‍🍳" },
] as const;

type FormatId = (typeof FORMATS)[number]["id"];

// Коэффициент для расчёта максимальной цены (учитывает премиум-опции)
const PRICE_RANGE_FACTOR = 1.4;

export default function InlinePriceCalculator() {
  const [format, setFormat] = useState<FormatId>("furshet");
  const [guests, setGuests] = useState(50);
  const [isAnimating, setIsAnimating] = useState(false);
  const prevTotalRef = useRef(0);

  const selected = FORMATS.find((f) => f.id === format)!;
  const total = selected.pricePerGuest * guests;
  const maxTotal = Math.round(total * PRICE_RANGE_FACTOR);
  const meets = guests >= selected.minGuests;

  // Анимация при изменении цены
  const triggerAnimation = useCallback(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Отслеживаем изменения для анимации
  useEffect(() => {
    if (prevTotalRef.current !== 0 && prevTotalRef.current !== total) {
      triggerAnimation();
    }
    prevTotalRef.current = total;
  }, [total, triggerAnimation]);

  const handleFormatChange = (newFormat: FormatId) => {
    const newSelected = FORMATS.find((f) => f.id === newFormat)!;
    setFormat(newFormat);
    // Автоматически корректируем гостей если меньше минимума
    if (guests < newSelected.minGuests) {
      setGuests(newSelected.minGuests);
    }
  };

  const handleGuestsChange = (value: number) => {
    setGuests(value);
  };

  return (
    <section className="bg-secondary/30 py-20 md:py-28" aria-labelledby="calc-heading">
      <div className="container-site mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <p className="text-gold-text mb-3 text-xs tracking-[0.22em] uppercase">
            Калькулятор цены
          </p>
          <h2
            id="calc-heading"
            className="font-heading mb-3 text-3xl md:text-5xl"
            style={{ fontWeight: 500 }}
          >
            Узнайте цену за 30 секунд
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Выберите формат и количество гостей — покажем ориентировочную стоимость
          </p>
        </div>

        <div className="bg-card border-line rounded-2xl border p-6 shadow-lg md:p-8">
          {/* Format selector */}
          <div className="mb-8">
            <label className="text-foreground mb-3 block flex items-center gap-2 text-sm font-semibold">
              <span>1. Выберите формат мероприятия</span>
            </label>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
              {FORMATS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={format === f.id}
                  onClick={() => handleFormatChange(f.id)}
                  className={`group relative rounded-xl border p-4 text-left transition-all duration-200 ${
                    format === f.id
                      ? "border-primary bg-primary/10 text-primary scale-[1.02] shadow-md"
                      : "border-line text-muted-foreground hover:border-gold-text hover:bg-secondary/50"
                  }`}
                >
                  {/* Индикатор выбора */}
                  {format === f.id && (
                    <div className="bg-primary absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full">
                      <Check className="h-3 w-3 text-white" strokeWidth={3} />
                    </div>
                  )}

                  <span className="mb-1 block text-xl">{f.icon}</span>
                  <span
                    className={`block text-sm font-medium ${format === f.id ? "text-primary" : "group-hover:text-foreground"}`}
                  >
                    {f.label}
                  </span>
                  <span className="mt-1 block text-xs opacity-75">
                    от {f.pricePerGuest.toLocaleString("ru-RU")} ₽/чел
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Guests slider */}
          <div className="mb-8">
            <label
              htmlFor="guests-slider"
              className="text-foreground mb-3 block flex items-center gap-2 text-sm font-semibold"
            >
              <span>2. Укажите количество гостей</span>
            </label>

            {/* Гости prominently */}
            <div className="bg-secondary/50 mb-4 flex items-center justify-center gap-3 rounded-xl p-4">
              <Users className="text-gold-text h-6 w-6" />
              <span className="font-heading text-foreground text-4xl font-semibold transition-all duration-200 md:text-5xl">
                {guests}
              </span>
              <span className="text-muted-foreground text-lg">гостей</span>
            </div>

            <input
              id="guests-slider"
              type="range"
              min={selected.minGuests}
              max="500"
              step="5"
              value={guests}
              onChange={(e) => handleGuestsChange(Number(e.target.value))}
              aria-label="Количество гостей"
              className="bg-secondary [&::-webkit-slider-thumb]:bg-primary h-3 min-h-[44px] w-full cursor-pointer appearance-none rounded-lg [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
            />
            <div className="text-muted-foreground mt-2 flex justify-between px-1 text-xs">
              <span>мин. {selected.minGuests}</span>
              <span>100</span>
              <span>250</span>
              <span>500</span>
            </div>
          </div>

          {/* Result - улучшенный блок с чётким отображением параметров */}
          <div
            className={`from-primary/5 to-gold-text/5 border-primary/20 mb-6 rounded-2xl border bg-gradient-to-br p-6 transition-all duration-300 ${
              isAnimating ? "scale-[1.01] shadow-lg" : ""
            }`}
          >
            {/* Заголовок блока результата */}
            <div className="border-line mb-4 border-b pb-4 text-center">
              <p className="text-muted-foreground mb-1 text-sm">Ваша ориентировочная стоимость</p>

              {/* Выбранный формат prominently */}
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
                <span className="text-lg">{selected.icon}</span>
                <span className="text-foreground font-semibold">{selected.label}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-gold-text font-semibold">{guests} guests</span>
              </div>
            </div>

            {/* Цена с анимацией */}
            <div className="text-center">
              <p
                className={`font-heading text-foreground text-4xl font-bold transition-all duration-300 md:text-5xl ${
                  isAnimating ? "text-primary scale-105" : ""
                }`}
                style={{ fontWeight: 700 }}
              >
                {total.toLocaleString("ru-RU")} ₽
              </p>

              {/* Диапазон цен */}
              <p className="text-muted-foreground mt-2 text-sm">
                от <span className="font-medium">{total.toLocaleString("ru-RU")}</span> до{" "}
                <span className="font-medium">{maxTotal.toLocaleString("ru-RU")}</span> ₽
              </p>

              {/* Цена за человека prominently */}
              <div className="bg-secondary mt-4 inline-flex items-center gap-2 rounded-lg px-4 py-2">
                <span className="text-muted-foreground text-xs">Цена за человека:</span>
                <span className="text-gold-text font-bold">
                  {selected.pricePerGuest.toLocaleString("ru-RU")} ₽
                </span>
              </div>
            </div>

            {/* Формула расчёта */}
            <div className="border-line mt-4 border-t pt-4">
              <p className="text-muted-foreground text-center text-xs">
                <span className="bg-secondary mr-1 inline-block rounded px-2 py-1">
                  {selected.pricePerGuest.toLocaleString("ru-RU")} ₽
                </span>
                ×
                <span className="bg-secondary mx-1 inline-block rounded px-2 py-1">
                  {guests} чел.
                </span>
                =
                <span className="bg-primary/10 text-primary ml-1 inline-block rounded px-2 py-1 font-semibold">
                  {total.toLocaleString("ru-RU")} ₽
                </span>
              </p>
            </div>

            {/* Предупреждение о минимуме */}
            {!meets && (
              <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3">
                <p className="text-center text-xs text-amber-700">
                  ⚠️ Минимум для формата «{selected.label}» —{" "}
                  <strong>{selected.minGuests} гостей</strong>
                </p>
              </div>
            )}

            {/* Дисклеймер */}
            <p className="text-muted-foreground mt-4 text-center text-xs leading-relaxed">
              * Финальная стоимость зависит от выбранного меню и фиксируется в договоре. Указан
              диапазон базовой и расширенной комплектации.
            </p>
          </div>

          {/* CTA */}
          <Link
            href={`/plan/helper?occasion=${encodeURIComponent(selected.label)}&guests=${guests}`}
            className="bg-primary text-primary-foreground hover:bg-primary/90 flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-base font-semibold no-underline transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
          >
            Получить точный расчёт
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <p className="text-muted-foreground mt-3 text-center text-xs">
            Перезвоним за 15 минут в рабочее время (9:00–21:00)
          </p>
        </div>
      </div>
    </section>
  );
}
