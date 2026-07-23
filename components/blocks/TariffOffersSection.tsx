'use client';

import { useState, useEffect } from 'react';
import { ALL_TARIFF_OFFERS, type TariffOffer } from '@/lib/tariff-offers';
import { type Tier } from '@/lib/types';
import Link from 'next/link';

interface Props {
  eventId?: string;
  eventName?: string;
  description?: string;
}

const EVENT_META: Record<string, { label: string; emoji: string; desc: string; gradient: string }> = {
  svadba:     { label: 'Свадьба',     emoji: '💍', desc: 'От камерной росписи до банкета на 200 гостей', gradient: 'from-rose-50 to-rose-100' },
  korporativ: { label: 'Корпоратив',  emoji: '💼', desc: 'Бизнес-ланчи, гала-ужины, тимбилдинги', gradient: 'from-sky-50 to-sky-100' },
  vypusknoy:  { label: 'Выпускной',   emoji: '🎓', desc: 'Школьные и студенческие выпускные', gradient: 'from-amber-50 to-amber-100' },
  chastnoe:   { label: 'Частное',     emoji: '🥂', desc: 'Дни рождения, юбилеи, семейные ужины', gradient: 'from-emerald-50 to-emerald-100' },
  detskoe:    { label: 'Детское',     emoji: '🎈', desc: 'Праздники с аниматорами и шоу', gradient: 'from-purple-50 to-purple-100' },
  'chef-at-home': { label: 'Шеф на дом', emoji: '👨‍🍳', desc: 'Шеф-повар и сомелье у вас дома', gradient: 'from-orange-50 to-orange-100' },
};

// Маппинг событие → формат (для ссылки в конструктор)
const EVENT_TO_FORMAT: Record<string, string> = {
  svadba: 'banket',
  korporativ: 'banket',
  vypusknoy: 'banket',
  chastnoe: 'furshet',
  detskoe: 'detskoe',
  'chef-at-home': 'chef-at-home',
};

const TIER_ORDER: Tier[] = ['standard', 'economy', 'premium', 'luxury'];

function TariffCard({ offer }: { offer: TariffOffer }) {
  const [expanded, setExpanded] = useState(false);
  const colors = ['bg-amber-100', 'bg-rose-100', 'bg-emerald-100', 'bg-sky-100'];
  const color = colors[TIER_ORDER.indexOf(offer.tier) % colors.length];
  const isRec = offer.tier === 'standard';

  const CAT_ORDER = ['Канапе', 'Тарталетки', 'Закуски', 'Премиум', 'Амюз-буш', 'Горячее', 'Шоу', 'Основное', 'Десерты', 'Десерт', 'Фрукты', 'Бар', 'Напитки', 'Сыр'];

  return (
    <div className={`rounded-2xl border ${isRec ? 'border-gold-text ring-1 ring-gold-text' : 'border-line'} bg-card overflow-hidden hover:shadow-lg transition-shadow`}>
      <div className="p-5 border-b border-line">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <h3 className="font-heading text-lg font-semibold">{offer.tierLabel}</h3>
            {isRec && <span className="text-[10px] bg-gold-text text-white px-2 py-0.5 rounded-full font-semibold">Рекомендуем</span>}
          </div>
          <span className="text-2xl font-bold text-gold-text">{offer.pricePerGuest.toLocaleString()} ₽</span>
        </div>
        <p className="text-sm text-muted-foreground">/ гость · мин. {offer.minGuests} гостей</p>
      </div>

      <div className={`aspect-[16/9] ${color} flex items-center justify-center`}>
        <span className="text-5xl select-none">{offer.imagePlaceholder}</span>
      </div>

      <div className="px-5 py-4 space-y-2">
        <p className="text-sm font-medium leading-snug">{offer.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {offer.highlights.map(h => (
            <span key={h} className="text-[11px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{h}</span>
          ))}
        </div>
      </div>

      <div className="px-5 pb-4">
        <button onClick={() => setExpanded(!expanded)} className="text-xs text-gold-text hover:underline font-medium">
          {expanded ? 'Скрыть состав' : `Показать состав (${offer.composition.length} позиций)`}
        </button>
        {expanded && (
          <div className="mt-3 space-y-2 border-t border-line pt-3">
            {CAT_ORDER.map(cat => {
              const items = offer.composition.filter(i => i.category === cat);
              if (!items.length) return null;
              return (
                <div key={cat}>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">{cat}</p>
                  {items.map(item => (
                    <div key={item.dishId} className="flex items-start justify-between py-1">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium">{item.name}</p>
                        <p className="text-[10px] text-muted-foreground line-clamp-1">{item.desc}</p>
                      </div>
                      <span className="text-[10px] text-muted-foreground shrink-0 ml-2">{item.qty}</span>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="px-5 pb-5 flex flex-col gap-2">
        <Link href={`/plan/constructor?format=${EVENT_TO_FORMAT[offer.eventId] || 'furshet'}&tier=${offer.tier}&guests=${offer.minGuests}`}
          className="block w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground text-center hover:bg-primary/90 transition-colors">
          Выбрать этот тариф
        </Link>
        <a
          href="/pricing/pdf"
          download
          className="block w-full rounded-lg border border-line py-2.5 text-xs font-medium text-muted-foreground text-center hover:bg-muted transition-colors"
        >
          Скачать PDF-меню
        </a>
      </div>
    </div>
  );
}

export default function TariffOffersSection({ eventId: propEventId, eventName, description }: Props) {
  const [selectedEvent, setSelectedEvent] = useState<string>(propEventId || 'svadba');

  useEffect(() => {
    if (propEventId) setSelectedEvent(propEventId);
  }, [propEventId]);

  const isStandalone = !propEventId;
  const events = Object.entries(EVENT_META);
  const offers = ALL_TARIFF_OFFERS[selectedEvent] || [];
  const meta = EVENT_META[selectedEvent];
  const sorted = [...offers].sort((a, b) => TIER_ORDER.indexOf(a.tier) - TIER_ORDER.indexOf(b.tier));

  return (
    <div>
      {/* Event type tabs — only if standalone */}
      {isStandalone && (
        <>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading mb-4">Тарифы и цены</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Прозрачные цены за человека. Всё включено: еда, персонал, посуда, доставка по КАД.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {events.map(([id, m]) => (
              <button key={id} onClick={() => setSelectedEvent(id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  selectedEvent === id
                    ? 'bg-gold-text text-white'
                    : 'border border-line text-muted-foreground hover:border-gold-text'
                }`}>
                {m.emoji} {m.label}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Event hero */}
      {meta && (
        <div className={`rounded-2xl bg-gradient-to-br ${meta.gradient} p-6 mb-10 text-center`}>
          <span className="text-4xl block mb-2">{meta.emoji}</span>
          <h2 className="text-2xl font-heading font-medium mb-1">{eventName || meta.label}</h2>
          <p className="text-muted-foreground">{description || meta.desc}</p>
        </div>
      )}

      {/* Tariff grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {sorted.map(offer => (
          <TariffCard key={`${offer.eventId}-${offer.tier}`} offer={offer} />
        ))}
      </div>

      {/* Custom CTA */}
      <div className="mt-16 text-center py-10 rounded-2xl border border-line bg-muted/30">
        <p className="text-xl font-heading font-medium mb-2">Не подходит ни один тариф?</p>
        <p className="text-muted-foreground mb-5">Соберите меню под себя — выберите блюда поштучно.</p>
        <Link href="/plan/constructor"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
          Собрать своё меню
        </Link>
      </div>
    </div>
  );
}