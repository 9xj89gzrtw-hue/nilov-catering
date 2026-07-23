'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { calcTotal } from '@/lib/pricing';
import { PRICE_PER_GUEST, ADDONS, GUESTS_MIN, GUESTS_MAX, GUESTS_STEP, GUEST_QUICK_BUTTONS } from '@/lib/constants';
import { TIER_LABEL } from '@/lib/types';
import type { Format, Tier, AddOn } from '@/lib/types';
import AnimatedCounter from '@/components/effects/AnimatedCounter';

const FORMATS: { format: Format; label: string }[] = [
  { format: 'furshet', label: 'Фуршет' },
  { format: 'banket', label: 'Банкет' },
  { format: 'coffee-break', label: 'Кофе-брейк' },
  { format: 'detskoe', label: 'Детский праздник' },
  { format: 'chef-at-home', label: 'Выезд шефа' },
];

const TIERS: Tier[] = ['economy', 'standard', 'premium', 'luxury'];

export default function Calculator() {
  const searchParams = useSearchParams();
  const [format, setFormat] = useState<Format>('furshet');
  const [guests, setGuests] = useState(20);
  const [tier, setTier] = useState<Tier>('standard');
  const [selectedAddons, setSelectedAddons] = useState<AddOn[]>([]);

  // Read URL params on mount to pre-fill from helper
  useEffect(() => {
    const fmt = searchParams.get('format') as Format | null;
    const g = searchParams.get('guests');
    const t = searchParams.get('tier') as Tier | null;

    if (fmt && FORMATS.some(f => f.format === fmt)) setFormat(fmt);
    if (g) {
      const num = Number(g);
      if (!isNaN(num) && num >= GUESTS_MIN && num <= GUESTS_MAX) setGuests(num);
    }
    if (t && TIERS.includes(t)) setTier(t);
  }, [searchParams]);

  const result = useMemo(
    () => calcTotal(guests, format, tier, selectedAddons, { discounts: true }),
    [format, guests, tier, selectedAddons],
  );

  const availableAddons = ADDONS.filter((a) => a.formats.includes(format));

  const toggleAddon = (a: AddOn) => {
    setSelectedAddons((prev) =>
      prev.find((x) => x.id === a.id) ? prev.filter((x) => x.id !== a.id) : [...prev, a],
    );
  };

  return (
    <section className="py-12 bg-background" aria-label="Калькулятор стоимости">
      <div className="container-site max-w-3xl">
        <h2 className="text-center mb-2">Калькулятор стоимости</h2>
        <p className="text-center text-muted-foreground mb-10">Выберите параметры — итог обновляется мгновенно</p>

        {/* Format */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-muted-foreground mb-3">Формат</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {FORMATS.map((f) => (
              <button
                key={f.format}
                onClick={() => setFormat(f.format)}
                className={`rounded-lg border p-3 text-sm font-medium transition-all ${
                  format === f.format
                    ? 'border-gold-text bg-gold-tint text-gold-text'
                    : 'border-line bg-card text-muted-foreground hover:border-gold-text/50'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Guests */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-muted-foreground mb-3">
            Гостей: <span className="text-foreground font-bold text-lg">{guests}</span>
          </label>
          <input
            type="range"
            min={GUESTS_MIN}
            max={GUESTS_MAX}
            step={GUESTS_STEP}
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full accent-gold-text"
            aria-label="Количество гостей"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {GUEST_QUICK_BUTTONS.map((n) => (
              <button
                key={n}
                onClick={() => setGuests(n)}
                className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                  guests === n ? 'border-gold-text bg-gold-tint text-gold-text' : 'border-line text-muted-foreground hover:border-gold-text/50'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Tier */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-muted-foreground mb-3">Тариф</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {TIERS.map((t) => {
              const price = PRICE_PER_GUEST[format]?.[t];
              if (!price) return null;
              return (
                <button
                  key={t}
                  onClick={() => setTier(t)}
                  className={`rounded-lg border p-3 text-center transition-all ${
                    tier === t
                      ? 'border-gold-text bg-gold-tint'
                      : 'border-line bg-card hover:border-gold-text/50'
                  }`}
                >
                  <div className="text-sm font-medium text-foreground">{TIER_LABEL[t]}</div>
                  <div className="text-xs text-gold-text font-semibold">{price.toLocaleString('ru-RU')} ₽/гость</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Add-ons */}
        {availableAddons.length > 0 && (
          <div className="mb-8">
            <label className="block text-sm font-medium text-muted-foreground mb-3">Дополнительные услуги</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {availableAddons.map((a) => {
                const isSelected = selectedAddons.find((x) => x.id === a.id);
                return (
                  <button
                    key={a.id}
                    onClick={() => toggleAddon(a)}
                    className={`rounded-lg border p-3 text-left transition-all ${
                      isSelected ? 'border-gold-text bg-gold-tint' : 'border-line bg-card hover:border-gold-text/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{a.name}</span>
                      <span className="text-xs text-gold-text font-semibold">
                        {a.priceType === 'fixed' ? `${a.price.toLocaleString('ru-RU')} ₽` : `+${a.price} ₽/гость`}
                      </span>
                    </div>
                    {isSelected && <div className="text-xs text-success mt-1">✓ Добавлено</div>}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Summary — aria-live для скринридеров (33_UXSIM_ANNA) */}
        <motion.div
          className="rounded-xl border-2 border-gold-text/30 bg-card p-6 text-center"
          layout
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="text-sm text-muted-foreground mb-2">Итого</div>
          <div className="text-4xl font-heading font-bold text-gold-text mb-2">
            <AnimatedCounter value={result.total} suffix=" ₽" />
          </div>
          <div className="text-sm text-muted-foreground mb-4">
            <AnimatedCounter value={result.perGuest} suffix=" ₽/гость" />
          </div>

          {result.savings > 0 && (
            <div className="inline-block rounded-full bg-success/10 text-success text-xs font-medium px-3 py-1 mb-4">
              Экономия {result.savings.toLocaleString('ru-RU')} ₽ vs Максимальный
            </div>
          )}

          <div className="grid grid-cols-3 gap-4 text-xs text-muted-foreground border-t border-line pt-4">
            <div>База<br /><span className="font-semibold text-foreground">{result.base.toLocaleString('ru-RU')} ₽</span></div>
            <div>Скидка<br /><span className="font-semibold text-foreground">−{result.discount.toLocaleString('ru-RU')} ₽</span></div>
            <div>Аддоны<br /><span className="font-semibold text-foreground">{result.addonsTotal.toLocaleString('ru-RU')} ₽</span></div>
          </div>

          {/* Service breakdown — сервис-норма (SERVICE_DELIVERY_SPEC §1-4) */}
          {result.serviceBreakdown && (
            <div className="mt-4 rounded-lg bg-secondary/50 p-3 text-left">
              <p className="text-xs font-medium text-foreground mb-2">🧑‍🍳 Сервис-норма {result.service.toLocaleString('ru-RU')} ₽</p>
              <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                <div>Персонал: {result.serviceBreakdown.staffCount} чел.</div>
                <div>Норма: {result.serviceBreakdown.ratio}</div>
                <div>Координатор: да</div>
                <div className="col-span-3">Сетап: {result.serviceBreakdown.setupHours} ч · on-site</div>
              </div>
            </div>
          )}

          <p className="mt-4 text-xs text-muted-foreground">
            В цену включено: еда, посуда, доставка в КАД. Не включено: депозит 30% (возвратный), надбавка вне КАД.
          </p>
        </motion.div>
      </div>
      {/* Schema.org Offer (07_CALCULATOR_SPEC §SEO) */}
      {result.total > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Offer',
              name: `Кейтеринг NiloV — ${format} ${TIER_LABEL[tier] || tier}`,
              price: result.total.toString(),
              priceCurrency: 'RUB',
              eligibleQuantity: { '@type': 'QuantitativeValue', value: guests },
              availability: 'https://schema.org/InStock',
              seller: { '@type': 'LocalBusiness', name: 'NiloV Catering', address: { '@type': 'PostalAddress', addressLocality: 'Санкт-Петербург' } },
              priceValidUntil: new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString().slice(0, 10),
            }),
          }}
        />
      )}
    </section>
  );
}
