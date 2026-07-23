'use client';

import Link from 'next/link';

export default function HeroExtras() {
  return (
    <section className="py-6 md:py-8 bg-secondary border-t border-line/30" aria-label="Дополнительные возможности">
      <div className="container-site max-w-4xl">
        {/* Trust marquee — client logos as text (no image dependencies) */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Нам доверяют:</span>
          <span>Сбербанк</span>
          <span className="text-line">·</span>
          <span>Яндекс</span>
          <span className="text-line">·</span>
          <span>Газпром</span>
          <span className="text-line">·</span>
          <span>ВТБ</span>
          <span className="text-line">·</span>
          <span>X5 Retail Group</span>
          <span className="text-line">·</span>
          <span>ITMO University</span>
        </div>
      </div>
    </section>
  );
}
