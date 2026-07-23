'use client';

import Link from 'next/link';

const CLIENTS = [
  { name: 'Сбербанк', logo: '/images/clients/sberbank.svg' },
  { name: 'Яндекс', logo: '/images/clients/yandex.svg' },
  { name: 'Газпром', logo: '/images/clients/gazprom.svg' },
  { name: 'ВТБ', logo: '/images/clients/vtb.svg' },
  { name: 'X5 Retail', logo: '/images/clients/x5.svg' },
  { name: 'ИТМО', logo: '/images/clients/itmo.svg' },
];

export default function HeroExtras() {
  return (
    <section className="py-8 bg-background border-t border-line/30" aria-label="Цены и доверие">
      <div className="container-site max-w-4xl">
        {/* Client SVG logo wall */}
        <div className="mb-6">
          <p className="text-center text-sm font-medium text-muted-foreground mb-3">Нам доверяют:</p>
          <ul role="list" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {CLIENTS.map((c) => (
              <li key={c.name}>
                <img
                  src={c.logo}
                  alt={c.name}
                  width={100}
                  height={32}
                  className="h-7 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all"
                  loading="lazy"
                />
              </li>
            ))}
          </ul>
        </div>

        {/* B2B compliance row — 44px touch targets */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 mb-6 text-sm text-muted-foreground">
          <Link
            href="/certificates"
            className="inline-flex items-center px-2 py-2 min-h-[44px] hover:text-foreground transition-colors"
          >
            HACCP · ISO 22000
          </Link>
          <span className="text-line">·</span>
          <Link
            href="/events/korporativ"
            className="inline-flex items-center px-2 py-2 min-h-[44px] hover:text-foreground transition-colors"
          >
            ЭДО · 44-ФЗ · 223-ФЗ
          </Link>
          <span className="text-line">·</span>
          <Link
            href="/certificates"
            className="inline-flex items-center px-2 py-2 min-h-[44px] hover:text-foreground transition-colors"
          >
            SLA · Страхование 5 млн ₽
          </Link>
          <span className="text-line">·</span>
          <Link
            href="/events/korporativ"
            className="inline-flex items-center px-2 py-2 min-h-[44px] text-amber-600 font-medium hover:text-amber-500 transition-colors"
          >
            Для бизнеса →
          </Link>
        </div>

        {/* Price row — semantic list, 44px touch targets */}
        <ul role="list" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-base">
          <li className="text-muted-foreground">
            Фуршет от <strong className="text-foreground">2 450 ₽</strong>/гость
          </li>
          <li className="text-muted-foreground">
            Банкет от <strong className="text-foreground">3 950 ₽</strong>/гость
          </li>
          <li className="text-muted-foreground">
            Кофе-брейк от <strong className="text-foreground">390 ₽</strong>/гость
          </li>
          <li>
            <Link
              href="/pricing"
              className="inline-flex items-center px-3 py-2 min-h-[44px] text-amber-600 font-medium hover:text-amber-500 transition-colors"
            >
              Все тарифы →
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
