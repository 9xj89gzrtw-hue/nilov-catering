import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Личный кабинет B2B — история заказов и документы',
  description: 'Личный кабинет для постоянных B2B-клиентов: история заказов, закрывающие документы на скачивание, статусы событий.',
  alternates: { canonical: '/account/orders', languages: { 'ru': '/account/orders', 'en': '/en', 'x-default': '/account/orders' } },
  robots: { index: false, follow: false },
};

// Demo B2B order history — replaced by real backend in production
// W93-v7: removed "ООО «ОдаЕда»" reference — operator is ИП Нилов Д.И. (УСН 6% без НДС).
// Счёт-фактура с НДС выставляется через партнёрское ООО по запросу (см. LEGAL.vatStatus в lib/data.ts).
const ORDERS = [
  {
    id: 'NLV-2025-0421',
    date: '2025-12-12',
    event: 'Новогодний корпоратив Корпоративный клиент (NDA)',
    format: 'Банкет',
    guests: 120,
    venue: 'Лофт на Васильевском (NDA)',
    total: 656400,
    status: 'Завершён',
    documents: [
      { type: 'Договор', url: '/api/templates/dogovor', ready: true },
      { type: 'Счёт', url: '#', ready: true },
      { type: 'Акт выполненных работ', url: '#', ready: true },
      { type: 'УПД (через партнёрское ООО, по запросу)', url: '#', ready: true },
      { type: 'Бракеражный журнал', url: '#', ready: false },
    ],
  },
  {
    id: 'NLV-2025-0388',
    date: '2025-11-08',
    event: 'День рождения компании IT-компания (NDA)',
    format: 'Фуршет',
    guests: 80,
    venue: 'Офис клиента (NDA)',
    total: 196000,
    status: 'Завершён',
    documents: [
      { type: 'Договор', url: '/api/templates/dogovor', ready: true },
      { type: 'Счёт', url: '#', ready: true },
      { type: 'Акт', url: '#', ready: true },
      { type: 'УПД', url: '#', ready: false },
    ],
  },
  {
    id: 'NLV-2025-0456',
    date: '2026-02-14',
    event: 'День Святого Валентина — корпоратив отдела',
    format: 'Кофе-брейк',
    guests: 35,
    venue: 'Офис клиента (NDA)',
    // W93-v7: was 28000 (800₽/гость) — не сходилось ни с одним тарифом. Пересчитано по тарифу Стандарт (1450₽/гость)
    total: 50750,
    status: 'Подтверждён',
    documents: [
      { type: 'Договор', url: '/api/templates/dogovor', ready: true },
      { type: 'Счёт на оплату', url: '#', ready: true },
      { type: 'Акт', url: '#', ready: false },
      { type: 'УПД', url: '#', ready: false },
    ],
  },
];

export default function AccountOrdersPage() {
  const totalOrders = ORDERS.length;
  const totalRevenue = ORDERS.reduce((acc, o) => acc + o.total, 0);

  return (
    <main className="pt-24 pb-20" id="main">
      <div className="container-site max-w-5xl">
        <nav aria-label="Хлебные крошки" className="text-sm text-muted-foreground mb-4">
          <Link href="/" className="hover:text-foreground">Главная</Link>
          {' / '}
          <span className="text-foreground">Личный кабинет B2B</span>
        </nav>

        <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
          <div>
            <h1 className="font-heading text-3xl md:text-4xl font-medium mb-1">Личный кабинет B2B</h1>
            <p className="text-muted-foreground">История заказов, закрывающие документы на скачивание, статусы событий.</p>
          </div>
          <a href={`mailto:${SITE.email}?subject=B2B-запрос%20из%20личного%20кабинета`} className="rounded-lg border border-line bg-card px-4 py-2 text-sm font-semibold hover:border-gold-text transition-colors">
             Запросить доступ / поддержку
          </a>
        </div>

        {/* Info notice — W93-v7: clearer demo badge */}
        <div className="mb-8 p-4 rounded-xl border-2 border-amber-300 bg-amber-50 text-amber-900 text-sm">
          <p className="font-semibold mb-1">⚠ Демонстрационный раздел</p>
          <p>Заказы ниже — примеры для презентации B2B-кабинета. Для доступа к вашей реальной истории заказов и закрывающим документам напишите на <a href={`mailto:${SITE.email}`} className="text-amber-900 underline font-semibold">{SITE.email}</a> с темой «B2B-запрос». ЭДО-интеграция (Диадок/СБИС) — в активной разработке.</p>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <div className="p-4 rounded-xl border border-line bg-card">
            <p className="text-xs text-muted-foreground">Заказов всего</p>
            <p className="text-2xl font-heading font-medium text-foreground mt-1">{totalOrders}</p>
          </div>
          <div className="p-4 rounded-xl border border-line bg-card">
            <p className="text-xs text-muted-foreground">Сумма за период</p>
            <p className="text-2xl font-heading font-medium text-gold-text mt-1">{totalRevenue.toLocaleString('ru-RU')} ₽</p>
          </div>
          <div className="p-4 rounded-xl border border-line bg-card">
            <p className="text-xs text-muted-foreground">Отсрочка платежа</p>
            <p className="text-2xl font-heading font-medium text-foreground mt-1">14 раб. дней</p>
          </div>
          <div className="p-4 rounded-xl border border-line bg-card">
            <p className="text-xs text-muted-foreground">ЭДО</p>
            <p className="text-base font-medium text-foreground mt-1">Диадок / СБИС</p>
          </div>
        </div>

        {/* Order list */}
        <div className="space-y-4">
          {ORDERS.map(order => (
            <details key={order.id} className="rounded-xl border border-line bg-card overflow-hidden">
              <summary className="p-5 cursor-pointer flex flex-wrap items-center justify-between gap-3 hover:bg-muted/30 transition-colors">
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-mono text-xs text-muted-foreground">{order.id}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                      order.status === 'Завершён' ? 'bg-emerald-100 text-emerald-700' :
                      order.status === 'Подтверждён' ? 'bg-amber-100 text-amber-700' :
                      'bg-muted text-muted-foreground'
                    }`}>{order.status}</span>
                  </div>
                  <h3 className="font-heading text-base font-medium mt-1">{order.event}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {new Date(order.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })} · {order.format} · {order.guests} гостей · {order.venue}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Сумма</p>
                  <p className="text-lg font-heading font-semibold text-gold-text">{order.total.toLocaleString('ru-RU')} ₽</p>
                </div>
              </summary>
              <div className="p-5 border-t border-line bg-secondary/30">
                <p className="text-sm font-semibold mb-3"> Документы на скачивание</p>
                <ul className="space-y-2">
                  {order.documents.map(doc => (
                    <li key={doc.type} className="flex items-center justify-between gap-3 text-sm">
                      <span>{doc.type}</span>
                      {doc.ready ? (
                        doc.url === '#' ? (
                          <a href={`mailto:${SITE.email}?subject=Запрос%20документа%3A%20${encodeURIComponent(doc.type)}%20(${order.id})`} className="text-gold-text font-semibold hover:underline">
                            Запросить →
                          </a>
                        ) : (
                          <a href={doc.url} download className="text-gold-text font-semibold hover:underline">
                            Скачать PDF →
                          </a>
                        )
                      ) : (
                        <span className="text-muted-foreground text-xs italic">будет доступен после события</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          ))}
        </div>

        {/* Quick links */}
        <div className="mt-10 grid sm:grid-cols-3 gap-3">
          <Link href="/certificates" className="block p-4 rounded-xl border border-line bg-card hover:border-gold-text transition-colors">
            <p className="font-heading font-medium mb-1"> Сертификаты</p>
            <p className="text-xs text-muted-foreground">Декларация ЕАЭС, медкнижки, ППК, полис страхования</p>
          </Link>
          <Link href="/api/templates/sla" download="nilov-sla-template.pdf" className="block p-4 rounded-xl border border-line bg-card hover:border-gold-text transition-colors">
            <p className="font-heading font-medium mb-1"> Скачать SLA (PDF)</p>
            <p className="text-xs text-muted-foreground">Шаблон SLA для нового контракта</p>
          </Link>
          <Link href="/api/templates/nda" download="nilov-nda-template.pdf" className="block p-4 rounded-xl border border-line bg-card hover:border-gold-text transition-colors">
            <p className="font-heading font-medium mb-1"> Скачать NDA (PDF)</p>
            <p className="text-xs text-muted-foreground">Для нового тендера / контрагента</p>
          </Link>
        </div>

        {/* Contact */}
        <div className="mt-8 p-5 rounded-xl border-2 border-gold-tint bg-gold-tint/5 text-center">
          <p className="text-sm font-medium mb-1">Нужна выгрузка истории или конкретный документ?</p>
          <p className="text-xs text-muted-foreground mb-3">Менеджер B2B ответит в течение 1 рабочего дня</p>
          <div className="flex flex-wrap justify-center gap-2 text-sm">
            <a href={`mailto:${SITE.email}`} className="rounded-lg bg-primary text-primary-foreground px-4 py-2 font-semibold hover:bg-primary/90 transition-colors no-underline">
               {SITE.email}
            </a>
            <a href={`tel:${SITE.phoneTel}`} className="rounded-lg border border-line bg-background px-4 py-2 font-semibold hover:border-gold-text transition-colors no-underline">
               {SITE.phone}
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
