'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { TariffOffer } from '@/lib/tariff-offers';

const TIER_COLORS: Record<string, string> = {
  economy: 'bg-slate-100 border-slate-300',
  standard: 'bg-blue-50 border-blue-300',
  premium: 'bg-amber-50 border-amber-300',
  luxury: 'bg-purple-50 border-purple-300',
};

const TIER_BADGES: Record<string, { bg: string; text: string }> = {
  economy: { bg: 'bg-slate-200 text-slate-700', text: 'Эконом' },
  standard: { bg: 'bg-blue-200 text-blue-800', text: 'Стандарт' },
  premium: { bg: 'bg-amber-200 text-amber-800', text: 'Расширенный' },
  luxury: { bg: 'bg-purple-200 text-purple-800', text: 'Максимальный' },
};

function groupBy<T>(arr: T[], key: (item: T) => string): Map<string, T[]> {
  const map = new Map<string, T[]>();
  for (const item of arr) {
    const k = key(item);
    if (!map.has(k)) map.set(k, []);
    map.get(k)!.push(item);
  }
  return map;
}

export default function TariffOfferCard({ offer }: { offer: TariffOffer }) {
  const [expanded, setExpanded] = useState(false);
  const colors = TIER_COLORS[offer.tier] || TIER_COLORS.standard;
  const badge = TIER_BADGES[offer.tier] || TIER_BADGES.standard;
  const categories = groupBy(offer.composition, d => d.category);

  return (
    <div className={`rounded-2xl border-2 ${colors} bg-white overflow-hidden transition-shadow hover:shadow-lg`}>
      {/* Header */}
      <div className="p-6 pb-0">
        <div className="flex items-start justify-between mb-3">
          <div>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${badge.bg}`}>
              {offer.tierLabel}
            </span>
            <h3 className="text-2xl font-heading font-semibold mt-2 text-foreground">
              {offer.eventName} · {offer.tierLabel}
            </h3>
          </div>
          <div className="text-right shrink-0">
            <div className="text-3xl font-heading font-bold text-gold-text tabular-nums">
              {offer.pricePerGuest.toLocaleString('ru-RU')} ₽
            </div>
            <div className="text-xs text-muted-foreground">за гостя</div>
          </div>
        </div>

        <p className="text-muted-foreground mb-3">{offer.description}</p>

        {/* Highlights */}
        <div className="flex flex-wrap gap-2 mb-4">
          {offer.highlights.map((h, i) => (
            <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary text-xs font-medium text-foreground">
              <span className="text-gold-text">✦</span> {h}
            </span>
          ))}
        </div>

        <div className="text-sm text-muted-foreground">
          Мин. гостей: <strong className="text-foreground">{offer.minGuests}</strong>
        </div>
      </div>

      {/* Composition — collapsed/expanded */}
      <div className="px-6 pb-6 mt-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between py-2.5 px-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors text-sm font-medium"
        >
          <span>
            {expanded ? 'Скрыть состав' : 'Показать полный состав меню'} ({offer.composition.length} позиций)
          </span>
          <svg
            className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`}
            fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {expanded && (
          <div className="mt-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            {Array.from(categories.entries()).map(([cat, dishes]) => (
              <div key={cat}>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  {cat}
                </h4>
                <ul className="space-y-2">
                  {dishes.map((d, i) => (
                    <li key={i} className="py-1.5 border-b border-line/30 last:border-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <span className="text-sm text-foreground font-medium">{d.name}</span>
                          {d.desc && (
                            <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{d.desc}</p>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground shrink-0 mt-0.5">{d.qty}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="px-6 pb-6 flex flex-wrap gap-3">
        <button
          className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2.5 text-sm font-medium hover:bg-secondary transition-colors"
          onClick={() => {
            // Inline customization — will open a modal/sheet for dish add/remove
            setExpanded(true);
          }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Настроить меню
        </button>

        <button
          className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2.5 text-sm font-medium hover:bg-secondary transition-colors"
          onClick={() => window.print()}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
            <path d="M6 14h12v8H6z" />
          </svg>
          Скачать PDF
        </button>

        <Link
          href={`/plan/constructor?format=${offer.eventId}&tier=${offer.tier}`}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Собрать с нуля
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}