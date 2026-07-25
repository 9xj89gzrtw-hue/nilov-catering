'use client';

import Link from 'next/link';

export default function HeroExtras() {
  return (
    <section className="py-8 md:py-10 bg-secondary" aria-label="Цены и возможности">
      <div className="container-site max-w-4xl">
        {/* Quick actions — helper is primary for first-time visitors */}
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Link
            href="/plan/helper"
            className="rounded-lg bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:bg-primary/90 transition-colors text-center touch-target"
          >
            🎯 Не знаете что выбрать? Подберём за 3 вопроса →
          </Link>
          <Link
            href="/plan/calculator"
            className="rounded-lg border border-gold-text text-gold-text px-5 py-3 text-sm font-semibold hover:bg-gold-tint transition-colors text-center touch-target"
          >
            Узнать цены
          </Link>
        </div>
      </div>
    </section>
  );
}