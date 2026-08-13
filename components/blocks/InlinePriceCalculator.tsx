'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Users } from 'lucide-react';

const FORMATS = [
  { id: 'furshet',      label: 'Фуршет',     pricePerGuest: 2450, minGuests: 20, icon: '🥂' },
  { id: 'banket',       label: 'Банкет',     pricePerGuest: 3950, minGuests: 15, icon: '🍽️' },
  { id: 'coffee-break', label: 'Кофе-брейк', pricePerGuest: 390,  minGuests: 10, icon: '☕' },
  { id: 'detskoe',      label: 'Детское',    pricePerGuest: 1550, minGuests: 10, icon: '🎈' },
  { id: 'pominki',      label: 'Поминки',    pricePerGuest: 1800, minGuests: 10, icon: '🕯️' },
  { id: 'chef-at-home', label: 'Шеф на дом', pricePerGuest: 4500, minGuests: 6,  icon: '👨‍🍳' },
] as const;

type FormatId = typeof FORMATS[number]['id'];

// Коэффициент для расчёта максимальной цены (учитывает премиум-опции)
const PRICE_RANGE_FACTOR = 1.4;

export default function InlinePriceCalculator() {
  const [format, setFormat] = useState<FormatId>('furshet');
  const [guests, setGuests] = useState(50);
  const [isAnimating, setIsAnimating] = useState(false);
  const prevTotalRef = useRef(0);

  const selected = FORMATS.find(f => f.id === format)!;
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
    const newSelected = FORMATS.find(f => f.id === newFormat)!;
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

        <div className="bg-card border border-line rounded-2xl p-6 md:p-8 shadow-lg">
          {/* Format selector */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <span>1. Выберите формат мероприятия</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {FORMATS.map(f => (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={format === f.id}
                  onClick={() => handleFormatChange(f.id)}
                  className={`relative p-4 rounded-xl border text-left transition-all duration-200 group ${
                    format === f.id
                      ? 'border-primary bg-primary/10 text-primary shadow-md scale-[1.02]'
                      : 'border-line text-muted-foreground hover:border-gold-text hover:bg-secondary/50'
                  }`}
                >
                  {/* Индикатор выбора */}
                  {format === f.id && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </div>
                  )}
                  
                  <span className="text-xl mb-1 block">{f.icon}</span>
                  <span className={`text-sm font-medium block ${format === f.id ? 'text-primary' : 'group-hover:text-foreground'}`}>
                    {f.label}
                  </span>
                  <span className="text-xs mt-1 block opacity-75">
                    от {f.pricePerGuest.toLocaleString('ru-RU')} ₽/чел
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Guests slider */}
          <div className="mb-8">
            <label htmlFor="guests-slider" className="block text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <span>2. Укажите количество гостей</span>
            </label>
            
            {/* Гости prominently */}
            <div className="flex items-center justify-center gap-3 mb-4 p-4 bg-secondary/50 rounded-xl">
              <Users className="w-6 h-6 text-gold-text" />
              <span className="font-heading text-4xl md:text-5xl text-foreground font-semibold transition-all duration-200">
                {guests}
              </span>
              <span className="text-lg text-muted-foreground">гостей</span>
            </div>

            <input
              id="guests-slider"
              type="range"
              min={selected.minGuests}
              max="500"
              step="5"
              value={guests}
              onChange={e => handleGuestsChange(Number(e.target.value))}
              aria-label="Количество гостей"
              className="w-full h-3 bg-secondary rounded-lg appearance-none cursor-pointer 
                         [&::-webkit-slider-thumb]:appearance-none 
                         [&::-webkit-slider-thumb]:w-6 
                         [&::-webkit-slider-thumb]:h-6 
                         [&::-webkit-slider-thumb]:rounded-full 
                         [&::-webkit-slider-thumb]:bg-primary 
                         [&::-webkit-slider-thumb]:shadow-lg
                         [&::-webkit-slider-thumb]:cursor-pointer
                         [&::-webkit-slider-thumb]:transition-transform
                         [&::-webkit-slider-thumb]:hover:scale-110
                         min-h-[44px]"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2 px-1">
              <span>мин. {selected.minGuests}</span>
              <span>100</span>
              <span>250</span>
              <span>500</span>
            </div>
          </div>

          {/* Result - улучшенный блок с чётким отображением параметров */}
          <div 
            className={`bg-gradient-to-br from-primary/5 to-gold-text/5 rounded-2xl p-6 mb-6 border border-primary/20 transition-all duration-300 ${
              isAnimating ? 'scale-[1.01] shadow-lg' : ''
            }`}
          >
            {/* Заголовок блока результата */}
            <div className="text-center mb-4 pb-4 border-b border-line">
              <p className="text-sm text-muted-foreground mb-1">Ваша ориентировочная стоимость</p>
              
              {/* Выбранный формат prominently */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-3">
                <span className="text-lg">{selected.icon}</span>
                <span className="font-semibold text-foreground">{selected.label}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-gold-text font-semibold">{guests} guests</span>
              </div>
            </div>

            {/* Цена с анимацией */}
            <div className="text-center">
              <p 
                className={`font-heading text-4xl md:text-5xl text-foreground font-bold transition-all duration-300 ${
                  isAnimating ? 'scale-105 text-primary' : ''
                }`}
                style={{ fontWeight: 700 }}
              >
                {total.toLocaleString('ru-RU')} ₽
              </p>
              
              {/* Диапазон цен */}
              <p className="text-sm text-muted-foreground mt-2">
                от <span className="font-medium">{total.toLocaleString('ru-RU')}</span> до{' '}
                <span className="font-medium">{maxTotal.toLocaleString('ru-RU')}</span> ₽
              </p>

              {/* Цена за человека prominently */}
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg">
                <span className="text-xs text-muted-foreground">Цена за человека:</span>
                <span className="font-bold text-gold-text">{selected.pricePerGuest.toLocaleString('ru-RU')} ₽</span>
              </div>
            </div>

            {/* Формула расчёта */}
            <div className="mt-4 pt-4 border-t border-line">
              <p className="text-xs text-center text-muted-foreground">
                <span className="inline-block px-2 py-1 bg-secondary rounded mr-1">
                  {selected.pricePerGuest.toLocaleString('ru-RU')} ₽
                </span>
                ×
                <span className="inline-block px-2 py-1 bg-secondary rounded mx-1">
                  {guests} чел.
                </span>
                =
                <span className="inline-block px-2 py-1 bg-primary/10 text-primary rounded ml-1 font-semibold">
                  {total.toLocaleString('ru-RU')} ₽
                </span>
              </p>
            </div>

            {/* Предупреждение о минимуме */}
            {!meets && (
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-xs text-amber-700 text-center">
                  ⚠️ Минимум для формата «{selected.label}» — <strong>{selected.minGuests} гостей</strong>
                </p>
              </div>
            )}

            {/* Дисклеймер */}
            <p className="text-xs text-muted-foreground mt-4 text-center leading-relaxed">
              * Финальная стоимость зависит от выбранного меню и фиксируется в договоре. 
              Указан диапазон базовой и расширенной комплектации.
            </p>
          </div>

          {/* CTA */}
          <Link
            href={`/plan/helper?occasion=${encodeURIComponent(selected.label)}&guests=${guests}`}
            className="flex items-center justify-center gap-2 w-full rounded-full bg-primary text-primary-foreground px-6 py-4 text-base font-semibold hover:bg-primary/90 transition-all duration-200 hover:shadow-lg hover:scale-[1.02] no-underline"
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
