'use client';

import Link from 'next/link';

export default function HeroExtras() {
  return (
    <section className="py-8 bg-background border-t border-line/30" aria-label="Цены и доверие">
      <div className="container-site max-w-4xl">
        {/* Client trust marquee */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mb-6 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Нам доверяют:</span>
          <span>Сбербанк</span>
          <span className="text-line">·</span>
          <span>Яндекс</span>
          <span className="text-line">·</span>
          <span>Газпром</span>
          <span className="text-line">·</span>
          <span>ВТБ</span>
          <span className="text-line">·</span>
          <span>X5 Retail</span>
          <span className="text-line">·</span>
          <span>ITMO</span>
        </div>

        {/* B2B compliance row */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mb-6 text-sm text-muted-foreground">
          <Link href="/certificates" className="hover:text-foreground transition-colors">HACCP · ISO 22000</Link>
          <span>·</span>
          <Link href="/events/korporativ" className="hover:text-foreground transition-colors">ЭДО · 44-ФЗ · 223-ФЗ</Link>
          <span>·</span>
          <span>SLA · Страхование 5 млн ₽</span>
        </div>

        {/* Price row */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-base">
          <span className="text-muted-foreground">
            Фуршет от <strong className="text-foreground">2 450 ₽</strong>/гость
          </span>
          <span className="text-muted-foreground">
            Банкет от <strong className="text-foreground">3 950 ₽</strong>/гость
          </span>
          <span className="text-muted-foreground">
            Кофе-брейк от <strong className="text-foreground">390 ₽</strong>/гость
          </span>
          <Link
            href="/pricing"
            className="text-amber-600 font-medium hover:text-amber-500 transition-colors"
          >
            Все тарифы →
          </Link>
        </div>
      </div>
    </section>
  );
}
