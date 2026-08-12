'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';

const TARIFFS = [
  { id: 'coffee-break-economy', label: 'Кофе-брейк', tier: 'Эконом', price: 390, minGuests: 10, format: 'coffee-break' },
  { id: 'furshet-standard', label: 'Фуршет', tier: 'Стандарт', price: 2450, minGuests: 20, format: 'furshet' },
  { id: 'banket-economy', label: 'Банкет', tier: 'Эконом', price: 3950, minGuests: 15, format: 'banket' },
  { id: 'banket-standard', label: 'Банкет', tier: 'Стандарт', price: 5470, minGuests: 15, format: 'banket' },
  { id: 'banket-premium', label: 'Банкет', tier: 'Расширенный', price: 7350, minGuests: 15, format: 'banket' },
  { id: 'banket-luxury', label: 'Банкет', tier: 'Максимальный', price: 9950, minGuests: 15, format: 'banket' },
];

interface Props {
  defaultGuests?: number;
  defaultTariff?: string;
  variant?: 'hero' | 'inline' | 'sidebar';
}

export default function BudgetCalculator({ defaultGuests = 50, defaultTariff = 'furshet-standard', variant = 'inline' }: Props) {
  const [guests, setGuests] = useState(defaultGuests);
  const [tariffId, setTariffId] = useState(defaultTariff);
  const [withNDS, setWithNDS] = useState(false);

  const tariff = TARIFFS.find(t =>t.id === tariffId) || TARIFFS[0];
  const minGuests = tariff.minGuests;
  const effectiveGuests = Math.max(minGuests, guests);
  const subtotal = useMemo(() =>tariff.price * effectiveGuests, [tariff, effectiveGuests]);
  const nds = useMemo(() =>withNDS ? Math.round(subtotal * 0.20) : 0, [subtotal, withNDS]);
  const total = subtotal + nds;
  const perGuest = tariff.price + (withNDS ? Math.round(tariff.price * 0.20) : 0);

  // Dynamic pricing signals — early-bird + volume discounts (C1/C4/C7 conversion)
  const earlyBirdDiscount = effectiveGuests >= 100 ? 0.10 : effectiveGuests >= 50 ? 0.07 : effectiveGuests >= 30 ? 0.05 : 0;
  const volumeDiscount = effectiveGuests >= 200 ? 0.15 : effectiveGuests >= 100 ? 0.10 : 0;
  const totalDiscount = Math.max(earlyBirdDiscount, volumeDiscount);
  const discountedTotal = Math.round(total * (1 - totalDiscount));
  const savings = total - discountedTotal;

  // Feasibility validation — warn on operationally impossible format×guests combinations
  const feasibilityWarnings: string[] = [];
  // Rule 1: Chef-at-home max 30 guests
  if (tariff.format === 'chef-at-home' && effectiveGuests >30) {
    feasibilityWarnings.push('Шеф на дом — максимум 30 гостей. Для большего количества выберите банкет или фуршет.');
  }
  // Rule 2: Coffee-break min 10, max 500
  if (tariff.format === 'coffee-break' && effectiveGuests >500) {
    feasibilityWarnings.push('Кофе-брейк на 500+ гостей — обсудите логистику с менеджером.');
  }
  // Rule 3: Luxury banquet (9950₽) min 15 guests (aligned with calculator and pricing page)
  if (tariffId === 'banket-luxury' && effectiveGuests < 15) {
    feasibilityWarnings.push('Тариф "Максимальный" — минимум 15 гостей.');
  }
  // Rule 4: Furshet min 20
  if (tariff.format === 'furshet' && effectiveGuests < 20) {
    feasibilityWarnings.push('Фуршет — минимум 20 гостей.');
  }

  const heroClass = variant === 'hero' ? 'bg-card/95 backdrop-blur-md border border-gold-text/30 shadow-xl' : 'bg-card border border-line';

  return (
    <div className={`rounded-2xl p-5 ${heroClass}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading text-base font-medium">Калькулятор бюджета</h3>
        <label className="flex items-center gap-1.5 text-xs cursor-pointer">
          <input type="checkbox" checked={withNDS} onChange={(e) =>setWithNDS(e.target.checked)} className="accent-gold-text" />
          <span className="text-muted-foreground">с НДС (через партнёрское ООО)</span>
        </label>
      </div>
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs text-muted-foreground">Гостей</label>
          <span className="text-sm font-semibold">{effectiveGuests} чел</span>
        </div>
        <input type="range" min={minGuests} max={500} step={5} value={effectiveGuests} onChange={(e) =>setGuests(Number(e.target.value))} className="w-full accent-gold-text" aria-label="Количество гостей" />
        <div className="flex justify-between text-[10px] text-muted-foreground mt-0.5">
          <span>{minGuests}</span><span>250</span><span>500</span>
        </div>
      </div>
      <div className="mb-4">
        <label className="text-xs text-muted-foreground block mb-1.5">Тариф</label>
        <div className="grid grid-cols-2 gap-1.5">
          {TARIFFS.map(t =>(
            <button key={t.id} type="button" onClick={() =>setTariffId(t.id)} className={`text-left p-2 rounded-lg border text-xs transition-all ${tariffId === t.id ? 'border-gold-text bg-gold-tint ring-1 ring-gold-text' : 'border-line bg-background hover:border-gold-text'}`}>
              <div className="font-medium">{t.label}</div>
              <div className="text-[10px] text-muted-foreground">{t.tier} · {t.price.toLocaleString('ru-RU')} ₽</div>
            </button>
          ))}
        </div>
      </div>
      <div className="border-t border-line pt-3 mb-3" role="status" aria-live="polite" aria-atomic="true" aria-label={`Итого: ${total.toLocaleString('ru-RU')} рублей, ${perGuest.toLocaleString('ru-RU')} рублей за гостя`}>
        <div className="flex justify-between items-baseline mb-1">
          <span className="text-sm text-muted-foreground">Итого:</span>
          <span className="text-2xl font-heading font-bold text-gold-text">{total.toLocaleString('ru-RU')} ₽</span>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{perGuest.toLocaleString('ru-RU')} ₽/гость</span>
          {withNDS && <span>в т.ч. НДС: {nds.toLocaleString('ru-RU')} ₽</span>}
        </div>
      </div>
      {/* Dynamic pricing indicators — early-bird + volume discounts */}
      {totalDiscount >0 && (
        <div className="mb-3 p-3 rounded-lg bg-emerald-50 border border-emerald-200">
          <p className="text-xs text-emerald-800 font-medium mb-1">
             Скидка {Math.round(totalDiscount * 100)}% ({savings.toLocaleString('ru-RU')} ₽)
          </p>
          <p className="text-[10px] text-emerald-700">
            {volumeDiscount >earlyBirdDiscount
              ? `Объёмная скидка для ${effectiveGuests}+ гостей`
              : `Скидка за раннее бронирование`}
          </p>
          <p className="text-sm font-bold text-emerald-900 mt-1">
            Итого со скидкой: {discountedTotal.toLocaleString('ru-RU')} ₽
          </p>
        </div>
      )}
      {feasibilityWarnings.length >0 && (
        <div className="mb-3 p-3 rounded-lg bg-amber-50 border border-amber-200">
          {feasibilityWarnings.map((w, i) =>(
            <p key={i} className="text-xs text-amber-800 mb-1 last:mb-0">
               {w}
            </p>
          ))}
        </div>
      )}
      <Link
        href={feasibilityWarnings.length >0
          ? `/contact?subject=Консультация&guests=${effectiveGuests}&format=${tariff.format}`
          : `/plan/constructor?format=${tariff.format}&guests=${effectiveGuests}`}
        className={`block w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors text-center no-underline ${
          feasibilityWarnings.length >0
            ? 'bg-amber-600 text-white hover:bg-amber-700'
            : 'bg-gold-text text-white hover:bg-gold-text/90'
        }`}
      >
        {feasibilityWarnings.length >0 ? 'Обсудить с менеджером →' : `Собрать меню ${totalDiscount >0 ? `(${discountedTotal.toLocaleString('ru-RU')} ₽)` : '→'}`}
      </Link>
      <p className="text-[10px] text-muted-foreground text-center mt-2">Расчёт предварительный. Финальная цена — после согласования меню.</p>
    </div>
  );
}
