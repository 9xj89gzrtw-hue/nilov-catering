'use client';

import Link from 'next/link';

export default function HeroExtras() {
  return (
    <section className="py-6 bg-background border-t border-line/30" aria-label="Цены">
      <div className="container-site max-w-3xl">
        {/* Price row — minimal, clean */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
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
