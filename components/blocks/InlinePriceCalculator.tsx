'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const FORMATS = [
  { id: 'furshet',      label: 'Фуршет',     pricePerGuest: 2450, minGuests: 20 },
  { id: 'banket',       label: 'Банкет',     pricePerGuest: 3950, minGuests: 15 },
  { id: 'coffee-break', label: 'Кофе-брейк', pricePerGuest: 390,  minGuests: 10 },
  { id: 'detskoe',      label: 'Детское',    pricePerGuest: 1550, minGuests: 10 },
  { id: 'pominki',      label: 'Поминки',    pricePerGuest: 1800, minGuests: 10 },
  { id: 'chef-at-home', label: 'Шеф на дом', pricePerGuest: 4500, minGuests: 6 },
] as const;

export default function InlinePriceCalculator() {
  const [format, setFormat] = useState<typeof FORMATS[number]['id']>('furshet');
  const [guests, setGuests] = useState(50);

  const selected = FORMATS.find(f => f.id === format)!;
  const total = selected.pricePerGuest * guests;
  const meets = guests >= selected.minGuests;

  return (
    <section className="py-20 md:py-28 bg-secondary/30" aria-labelledby="calc-heading">
      <div className="container-site max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.22em] text-gold-text mb-3">Калькулятор цены</p>
          <h2 id="calc-heading" className="font-heading text-3xl md:text-5xl mb-3" style={{ fontWeight: 500 }}>
            Узнайте цену за 30 секунд
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Выберите формат и количество гостей — покажем ориентировочную стоимость
          </p>
        </div>

        <div className="bg-card border border-line rounded-2xl p-6 md:p-8">
          {/* Format selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-3">Формат</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {FORMATS.map(f => (
                <button
                  key={f.id}
                  onClick={() => setFormat(f.id)}
                  className={`p-3 rounded-xl border text-sm font-medium transition-colors ${
                    format === f.id
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-line text-muted-foreground hover:border-gold-text'
                  }`}
                >
                  {f.label}
                  <span className="block text-xs mt-0.5 text-muted-foreground">от {f.pricePerGuest.toLocaleString('ru-RU')} ₽</span>
                </button>
              ))}
            </div>
          </div>

          {/* Guests slider */}
          <div className="mb-6">
            <label htmlFor="guests-slider" className="block text-sm font-medium text-foreground mb-3">
              Гостей: <span className="text-gold-text font-semibold text-lg">{guests}</span>
            </label>
            <input
              id="guests-slider"
              type="range"
              min="10"
              max="200"
              step="5"
              value={guests}
              onChange={e => setGuests(Number(e.target.value))}
              aria-label="Количество гостей"
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary min-h-[44px]"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>10</span>
              <span>50</span>
              <span>100</span>
              <span>200</span>
            </div>
          </div>

          {/* Result */}
          <div className="bg-secondary/50 rounded-xl p-4 mb-6">
            <div className="flex items-baseline justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Ориентировочная стоимость</p>
                <p className="font-heading text-3xl md:text-4xl text-foreground" style={{ fontWeight: 600 }}>
                  {total.toLocaleString('ru-RU')} ₽
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">{selected.pricePerGuest.toLocaleString('ru-RU')} ₽ × {guests}</p>
                <p className="text-xs text-muted-foreground">гостей</p>
              </div>
            </div>
            {!meets && (
              <p className="text-xs text-amber-700 mt-2">
                Минимум для {selected.label.toLowerCase()} — {selected.minGuests} гостей
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-2">
              Финальная смета фиксируется в договоре после уточнения меню
            </p>
          </div>

          {/* CTA */}
          <Link
            href={`/plan/helper?occasion=${encodeURIComponent(selected.label)}`}
            className="flex items-center justify-center gap-2 w-full rounded-full bg-primary text-primary-foreground px-6 py-4 text-base font-semibold hover:bg-primary/90 transition-colors no-underline"
          >
            Получить точный расчёт
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
          <p className="text-xs text-muted-foreground text-center mt-3">
            Перезвоним за 15 минут в рабочее время (9:00–21:00)
          </p>
        </div>
      </div>
    </section>
  );
}
