import Link from 'next/link';

const CLIENTS = ['Сбербанк', 'Яндекс', 'Газпром', 'ВТБ', 'X5 Retail', 'ИТМО'];

export default function HeroExtras() {
  return (
    <section className="border-t border-line/30 bg-background" aria-label="Цены и клиенты">
      <div className="container-site max-w-5xl py-7">
        <ul role="list" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-base">
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
            <Link href="/pricing" className="inline-flex items-center px-3 py-2 min-h-[44px] text-amber-600 font-medium hover:text-amber-500 transition-colors">
              Все тарифы →
            </Link>
          </li>
        </ul>

        <ul role="list" className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground/80">
          {CLIENTS.map((name, i) => (
            <li key={name} className="flex items-center gap-4">
              <span className="font-medium text-foreground/90">{name}</span>
              {i < CLIENTS.length - 1 && <span aria-hidden="true" className="text-line">·</span>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
