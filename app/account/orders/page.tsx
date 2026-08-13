import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Личный кабинет B2B — история заказов и документы",
  description:
    "Личный кабинет для постоянных B2B-клиентов: история заказов, закрывающие документы на скачивание, статусы событий.",
  alternates: {
    canonical: "/account/orders",
    languages: { ru: "/account/orders", "x-default": "/account/orders" },
  },
  robots: { index: false, follow: false },
};

// Demo B2B order history — replaced by real backend in production
// W93-v7: removed "ООО «ОдаЕда»" reference — operator is ИП Нилов Д.И. (УСН 6% без НДС).
// Счёт-фактура с НДС выставляется через партнёрское ООО по запросу (см. LEGAL.vatStatus в lib/data.ts).
const ORDERS = [
  {
    id: "NLV-2025-0421",
    date: "2025-12-12",
    event: "Новогодний корпоратив — Корпоративный клиент (NDA)",
    format: "Банкет",
    guests: 120,
    venue: "Лофт на Васильевском (NDA)",
    total: 656400,
    status: "Завершён",
    documents: [
      { type: "Договор", url: "/api/templates/dogovor", ready: true },
      { type: "Счёт", url: "#", ready: true },
      { type: "Акт выполненных работ", url: "#", ready: true },
      { type: "УПД (через партнёрское ООО, по запросу)", url: "#", ready: true },
      { type: "Бракеражный журнал", url: "#", ready: true },
    ],
  },
  {
    id: "NLV-2025-0388",
    date: "2025-11-08",
    event: "День рождения компании — IT-компания (NDA)",
    format: "Фуршет",
    guests: 80,
    venue: "Офис клиента (NDA)",
    total: 196000,
    status: "Завершён",
    documents: [
      { type: "Договор", url: "/api/templates/dogovor", ready: true },
      { type: "Счёт", url: "#", ready: true },
      { type: "Акт", url: "#", ready: true },
      { type: "УПД", url: "#", ready: true },
    ],
  },
  {
    id: "NLV-2026-0456",
    date: "2026-02-14",
    event: "День Святого Валентина — корпоратив отдела",
    format: "Кофе-брейк",
    guests: 35,
    venue: "Офис клиента (NDA)",
    // W93-v7: was 28000 (800₽/гость) — не сходилось ни с одним тарифом. Пересчитано по тарифу Стандарт (1450₽/гость)
    total: 50750,
    status: "Завершён",
    documents: [
      { type: "Договор", url: "/api/templates/dogovor", ready: true },
      { type: "Счёт на оплату", url: "#", ready: true },
      { type: "Акт", url: "#", ready: true },
      { type: "УПД", url: "#", ready: true },
    ],
  },
];

export default function AccountOrdersPage() {
  const totalOrders = ORDERS.length;
  const totalRevenue = ORDERS.reduce((acc, o) => acc + o.total, 0);

  return (
    <main className="pt-24 pb-20" id="main">
      <div className="container-site max-w-5xl">
        <nav aria-label="Хлебные крошки" className="text-muted-foreground mb-4 text-sm">
          <Link href="/" className="hover:text-foreground">
            Главная
          </Link>
          {" / "}
          <span className="text-foreground">Личный кабинет B2B</span>
        </nav>

        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-heading mb-1 text-3xl font-medium md:text-4xl">
              Личный кабинет B2B
            </h1>
            <p className="text-muted-foreground">
              История заказов, закрывающие документы на скачивание, статусы событий.
            </p>
          </div>
          <a
            href={`mailto:${SITE.email}?subject=B2B-запрос%20из%20личного%20кабинета`}
            className="border-line bg-card hover:border-gold-text inline-flex min-h-[44px] items-center rounded-lg border px-4 py-2 text-sm font-semibold transition-colors"
          >
            Запросить доступ / поддержку
          </a>
        </div>

        {/* Info notice — W93-v7: clearer demo badge */}
        <div className="mb-8 rounded-xl border-2 border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          <p className="mb-1 font-semibold">⚠ Демонстрационный раздел</p>
          <p>
            Заказы ниже — примеры для презентации B2B-кабинета. Для доступа к вашей реальной истории
            заказов и закрывающим документам напишите на{" "}
            <a href={`mailto:${SITE.email}`} className="font-semibold text-amber-900 underline">
              {SITE.email}
            </a>{" "}
            с темой «B2B-запрос». ЭДО-интеграция (Диадок/СБИС) — в активной разработке.
          </p>
        </div>

        {/* Summary stats */}
        <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="border-line bg-card rounded-xl border p-4">
            <p className="text-muted-foreground text-xs">Заказов всего</p>
            <p className="font-heading text-foreground mt-1 text-2xl font-medium">{totalOrders}</p>
          </div>
          <div className="border-line bg-card rounded-xl border p-4">
            <p className="text-muted-foreground text-xs">Сумма за период</p>
            <p className="font-heading text-gold-text mt-1 text-2xl font-medium">
              {totalRevenue.toLocaleString("ru-RU")} ₽
            </p>
          </div>
          <div className="border-line bg-card rounded-xl border p-4">
            <p className="text-muted-foreground text-xs">Отсрочка платежа</p>
            <p className="font-heading text-foreground mt-1 text-2xl font-medium">14 раб. дней</p>
          </div>
          <div className="border-line bg-card rounded-xl border p-4">
            <p className="text-muted-foreground text-xs">ЭДО</p>
            <p className="text-foreground mt-1 text-base font-medium">Диадок / СБИС</p>
          </div>
        </div>

        {/* Order list */}
        <div className="space-y-4">
          {ORDERS.map((order) => (
            <details
              key={order.id}
              className="border-line bg-card overflow-hidden rounded-xl border"
            >
              <summary className="hover:bg-muted/30 flex cursor-pointer flex-wrap items-center justify-between gap-3 p-5 transition-colors">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-muted-foreground font-mono text-xs">{order.id}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        order.status === "Завершён"
                          ? "bg-emerald-100 text-emerald-700"
                          : order.status === "Подтверждён"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <h3 className="font-heading mt-1 text-base font-medium">{order.event}</h3>
                  <p className="text-muted-foreground mt-0.5 text-sm">
                    {new Date(order.date).toLocaleDateString("ru-RU", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}{" "}
                    · {order.format} · {order.guests} гостей · {order.venue}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-muted-foreground text-xs">Сумма</p>
                  <p className="font-heading text-gold-text text-lg font-semibold">
                    {order.total.toLocaleString("ru-RU")} ₽
                  </p>
                </div>
              </summary>
              <div className="border-line bg-secondary/30 border-t p-5">
                <p className="mb-3 text-sm font-semibold">
                  Закрывающие документы (скачивание / запрос)
                </p>
                <ul className="space-y-2">
                  {order.documents.map((doc) => (
                    <li key={doc.type} className="flex items-center justify-between gap-3 text-sm">
                      <span>{doc.type}</span>
                      {doc.ready ? (
                        doc.url === "#" ? (
                          <a
                            href={`mailto:${SITE.email}?subject=Запрос%20документа%3A%20${encodeURIComponent(doc.type)}%20(${order.id})`}
                            className="text-gold-text font-semibold hover:underline"
                          >
                            Запросить →
                          </a>
                        ) : (
                          <a
                            href={doc.url}
                            download
                            className="text-gold-text font-semibold hover:underline"
                          >
                            Скачать PDF →
                          </a>
                        )
                      ) : (
                        <span className="text-muted-foreground text-xs italic">
                          будет доступен после события
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          ))}
        </div>

        {/* Quick links */}
        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          <Link
            href="/certificates"
            className="border-line bg-card hover:border-gold-text block rounded-xl border p-4 transition-colors"
          >
            <p className="font-heading mb-1 font-medium">Сертификаты</p>
            <p className="text-muted-foreground text-xs">
              Программа производственного контроля (ППК), медкнижки, полис страхования
            </p>
          </Link>
          <Link
            href="/api/templates/sla"
            download="nilov-sla-template.pdf"
            className="border-line bg-card hover:border-gold-text block rounded-xl border p-4 transition-colors"
          >
            <p className="font-heading mb-1 font-medium">Скачать SLA (PDF)</p>
            <p className="text-muted-foreground text-xs">Шаблон SLA для нового контракта</p>
          </Link>
          <Link
            href="/api/templates/nda"
            download="nilov-nda-template.pdf"
            className="border-line bg-card hover:border-gold-text block rounded-xl border p-4 transition-colors"
          >
            <p className="font-heading mb-1 font-medium">Скачать NDA (PDF)</p>
            <p className="text-muted-foreground text-xs">Для нового тендера / контрагента</p>
          </Link>
        </div>

        {/* Contact */}
        <div className="border-gold-tint bg-gold-tint/5 mt-8 rounded-xl border-2 p-5 text-center">
          <p className="mb-1 text-sm font-medium">
            Нужна выгрузка истории или конкретный документ?
          </p>
          <p className="text-muted-foreground mb-3 text-xs">
            Менеджер B2B ответит в течение 1 рабочего дня
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-sm">
            <a
              href={`mailto:${SITE.email}`}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-4 py-2 font-semibold no-underline transition-colors"
            >
              {SITE.email}
            </a>
            <a
              href={`tel:${SITE.phoneTel}`}
              className="border-line bg-background hover:border-gold-text rounded-lg border px-4 py-2 font-semibold no-underline transition-colors"
            >
              {SITE.phone}
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
