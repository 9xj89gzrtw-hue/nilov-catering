import Link from 'next/link';
import type { Format } from '@/lib/types';
import { PRICE_PER_GUEST } from '@/lib/constants';
import { KenBurnsCard } from '@/components/effects/PhotoAliveCard';

const FORMATS: { format: Format; href: string; tier: 'economy'; badge: string; explain: string; img: string }[] = [
  { format: 'furshet', href: '/menu/furshet', tier: 'economy', badge: 'Хит', explain: 'Гости едят стоя, лёгкие закуски', img: '/images/formats/furshet-hero.svg' },
  { format: 'banket', href: '/menu/banquet', tier: 'economy', badge: 'Свадьбы', explain: 'Посадка за стол, официанты', img: '/images/formats/banquet-hero.svg' },
  { format: 'coffee-break', href: '/menu/coffee-break', tier: 'economy', badge: 'Офисы', explain: 'Кофе и десерты в перерыве (деловой завтрак тоже)', img: '/images/formats/coffee-break-hero.svg' },
];

export default function FormatShowcase() {
  return (
    <section className="py-16 md:py-20 bg-background border-t border-line" aria-labelledby="formats-heading">
      <div className="container-site">
        <div className="mb-8">
          <p className="font-mono text-xs tracking-[0.2em] text-gold-text uppercase mb-2">Что вы задумали?</p>
          <h2 id="formats-heading">Три формата</h2>
          <Link href="/help/formats" className="text-sm text-gold-text hover:underline mt-1 inline-block">Что такое формат? →</Link>
        </div>

        {/* Horizontal scroll mobile, grid desktop */}
        <div className="flex md:grid md:grid-cols-3 gap-3 overflow-x-auto snap-x snap-mandatory md:snap-none -mx-4 px-4 md:mx-0 md:px-0 scrollbar-none">
          {FORMATS.map((f) => {
            const price = PRICE_PER_GUEST[f.format]?.[f.tier] ?? 0;
            return (
              <Link key={f.format} href={f.href}
                className="snap-start shrink-0 w-[75vw] max-w-[300px] md:w-auto md:max-w-none group flex flex-col rounded-xl border border-line bg-card overflow-hidden transition-all duration-200
                  hover:border-gold-text active:scale-[0.98]
                  focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="aspect-[16/10] bg-secondary overflow-hidden">
                  {/* KenBurnsCard with diamond frame for format heroes */}
                  <KenBurnsCard
                    src={f.img}
                    alt={getFormatName(f.format)}
                    aspectRatio="video"
                    frameShape="diamond"
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-heading text-base font-medium">{getFormatName(f.format)}</h3>
                    <span className="text-xs text-gold-text bg-gold-tint px-2 py-0.5 rounded-full">{f.badge}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{f.explain}</p>
                  <p className="mt-auto font-mono text-sm font-semibold text-foreground">
                    от {price.toLocaleString('ru-RU')} ₽ <span className="text-xs font-normal text-muted-foreground">/гость</span>
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          <Link href="/menu/furshet" className="text-gold-text hover:underline">Мобильный фуршет</Link> — выезд на площадку без кухни
        </p>
      </div>
    </section>
  );
}

function getFormatName(f: Format): string {
  const m: Record<string, string> = { furshet: 'Фуршет', banket: 'Банкет', 'coffee-break': 'Кофе-брейк', detskoe: 'Детский', 'chef-at-home': 'Выезд шефа' };
  return m[f] ?? f;
}
