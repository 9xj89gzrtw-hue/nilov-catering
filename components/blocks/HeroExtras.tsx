'use client';

import Link from 'next/link';

export default function HeroExtras() {
  return (
    <section className="py-8 md:py-10 bg-secondary" aria-label="Цены и возможности">
      <div className="container-site max-w-4xl">
        {/* Quick actions */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/plan/calculator"
            className="rounded-lg border border-gold-text text-gold-text px-5 py-2.5 text-sm font-semibold hover:bg-gold-tint transition-colors"
          >
            Рассчитать стоимость
          </Link>
          <Link
            href="/plan/helper"
            className="rounded-lg border border-line text-muted-foreground px-5 py-2.5 text-sm font-semibold hover:bg-muted transition-colors"
          >
            Помогите выбрать
          </Link>
        </div>
      </div>
    </section>
  );
}