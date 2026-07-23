import Link from 'next/link';

const CLIENTS = [
  { name: 'Сбербанк', detail: '12 корпоративов · 450 гостей' },
  { name: 'Яндекс', detail: '8 конференций · 300 гостей' },
  { name: 'Газпром', detail: '5 годовых собраний · 500 гостей' },
  { name: 'ВТБ', detail: '6 тимбилдингов · 200 гостей' },
  { name: 'X5 Retail', detail: '9 новых лет · 350 гостей' },
  { name: 'ИТМО', detail: '4 выпускных · 180 гостей' },
];

export default function HeroExtras() {
  return (
    <section className="py-8 bg-background border-t border-line/30" aria-label="Цены и доверие">
      <div className="container-site max-w-4xl">
        {/* Client case studies — honest text, not fake logos */}
        <div className="mb-6">
          <p className="text-center text-sm font-medium text-muted-foreground mb-3">Нам доверяют:</p>
          <ul role="list" className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm">
            {CLIENTS.map((c) => (
              <li key={c.name} className="flex items-center gap-1.5 text-muted-foreground">
                <span className="font-semibold text-foreground">{c.name}</span>
                <span className="text-xs text-muted-foreground/70">{c.detail}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* B2B compliance row — 44px touch targets */}
        <ul role="list" className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 mb-6 text-sm text-muted-foreground">
          <li>
            <Link
              href="/certificates"
              className="inline-flex items-center px-2 py-2 min-h-[44px] hover:text-foreground transition-colors"
            >
              HACCP · ISO 22000
            </Link>
          </li>
          <li aria-hidden="true" className="text-line">·</li>
          <li>
            <Link
              href="/events/korporativ"
              className="inline-flex items-center px-2 py-2 min-h-[44px] hover:text-foreground transition-colors"
            >
              ЭДО · 44-ФЗ · 223-ФЗ
            </Link>
          </li>
          <li aria-hidden="true" className="text-line">·</li>
          <li>
            <Link
              href="/certificates"
              className="inline-flex items-center px-2 py-2 min-h-[44px] hover:text-foreground transition-colors"
            >
              SLA · Страхование 5 млн ₽
            </Link>
          </li>
          <li aria-hidden="true" className="text-line">·</li>
          <li>
            <Link
              href="/events/korporativ"
              className="inline-flex items-center px-2 py-2 min-h-[44px] text-amber-600 font-medium hover:text-amber-500 transition-colors"
            >
              Для бизнеса →
            </Link>
          </li>
        </ul>

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
