import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'FAQ' };

const FAQS = [
  { q: 'Какая минимальная сумма заказа?', a: 'Кофе-брейк — от 10 гостей и 390 ₽/гость. Фуршет — от 20 гостей и 2 450 ₽/гость. Банкет — от 30 гостей и 3 950 ₽/гость (свадебный) или от 30 гостей и 4 470 ₽/гость (корпоративный).' },
  { q: 'За сколько дней бронировать?', a: 'Минимум 3 дня. Рекомендуем 2–4 недели. Скидка 10% за 60+ дней, 15% за 90+ дней.' },
  { q: 'Работаете ли за КАД?', a: 'Да, по всей ЛО. В пределах КАД — бесплатно. Надбавка за городом зависит от расстояния.' },
  { q: 'Можно ли заказать дегустацию?', a: 'Да, для событий от 30 гостей — обязательно. Для меньших — по запросу.' },
  { q: 'Что с аллергиями?', a: 'Маркируем 14 аллергенов ТР ТС 022/2011. Веган, безглютен, халяль — отдельные линии меню.' },
  { q: 'Включены ли чаевые?', a: 'Нет, чаевые не включены и остаются на усмотрение заказчика.' },
];

export default function FAQPage() {
  return (
    <main className="pt-24 pb-20"><div className="container-site max-w-2xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      }) }} />
      <h1 className="text-center mb-4">Частые вопросы</h1>
      <p className="text-center text-muted-foreground mb-16">Всё, что вы хотели знать о кейтеринге.</p>
      <div className="space-y-4">
        {FAQS.map((f, i) => (
          <details key={i} className="group rounded-xl border border-line bg-card">
            <summary className="p-5 cursor-pointer font-medium text-foreground list-none flex items-center justify-between">
              {f.q}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-muted-foreground group-open:rotate-45 transition-transform"><path d="M8 3v10M3 8h10"/></svg>
            </summary>
            <p className="px-5 pb-5 text-sm text-muted-foreground">{f.a}</p>
          </details>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link href="/plan" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">Спланировать событие</Link>
      </div>
    </div></main>
  );
}
