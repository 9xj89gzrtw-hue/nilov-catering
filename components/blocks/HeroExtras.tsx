"use client";

import Link from "next/link";

export default function HeroExtras() {
  return (
    <section className="bg-secondary py-8 md:py-10" aria-label="Цены и возможности">
      <div className="container-site max-w-4xl">
        {/* Quick actions — helper is primary for first-time visitors */}
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/plan/helper"
            className="bg-primary text-primary-foreground hover:bg-primary/90 touch-target rounded-lg px-6 py-3 text-center text-sm font-semibold transition-colors"
          >
            Не знаете что выбрать? Подберём за 3 вопроса →
          </Link>
          <Link
            href="/plan/calculator"
            className="border-gold-text text-gold-text hover:bg-gold-tint touch-target rounded-lg border px-5 py-3 text-center text-sm font-semibold transition-colors"
          >
            Узнать цены
          </Link>
        </div>
      </div>
    </section>
  );
}
