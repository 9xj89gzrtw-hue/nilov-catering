import { NextRequest, NextResponse } from "next/server";
import { SITE } from "@/lib/data";
import { PRICE_PER_GUEST, ADDONS } from "@/lib/constants";
import type { Format, Tier } from "@/lib/types";

const FORMAT_LABELS: Record<Format, string> = {
  furshet: "Фуршет",
  banket: "Банкет",
  "coffee-break": "Кофе-брейк",
  "mobile-furshet": "Мобильный фуршет",
  detskoe: "Детский праздник",
  "chef-at-home": "Шеф на дом",
  pominki: "Поминки",
};

// PDF-specific CSS constants (explicit values required for PDF generation)
const PDF_MAX_WIDTH = "210mm";
const PDF_PADDING = "20mm";
const PDF_TABLE_STYLE =
  "width: 100%; border-collapse: collapse; margin-bottom: 20px;"; /* eslint-disable-line -- PDF table style */

const TIER_LABELS: Record<Tier, string> = {
  economy: "Эконом",
  standard: "Стандарт",
  premium: "Премиум",
  luxury: "Люкс",
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { format, tier, guests, addons, clientName, eventName, eventDate, phone } = body as {
      format: Format;
      tier: Tier;
      guests: number;
      addons: string[];
      clientName?: string;
      eventName?: string;
      eventDate?: string;
      phone?: string;
    };

    // Валидация
    if (!format || !tier || !guests) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Расчёт стоимости
    const pricePerGuest = PRICE_PER_GUEST[format]?.[tier] || 0;
    const baseTotal = pricePerGuest * guests;

    // Скидки
    let discountPercent = 0;
    if (eventDate) {
      const event = new Date(eventDate);
      const now = new Date();
      const daysUntilEvent = Math.ceil((event.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      if (daysUntilEvent >= 90) discountPercent = 15;
      else if (daysUntilEvent >= 60) discountPercent = 10;
      else if (daysUntilEvent >= 30) discountPercent = 5;
    }

    const discountAmount = Math.round(baseTotal * (discountPercent / 100));
    const subtotal = baseTotal - discountAmount;

    // Аддоны
    const selectedAddons = ADDONS.filter((a) => addons?.includes(a.id));
    const addonsTotal = selectedAddons.reduce((sum, a) => {
      return sum + (a.priceType === "fixed" ? a.price : a.price * guests);
    }, 0);

    const grandTotal = subtotal + addonsTotal;

    // Генерация HTML для PDF
    const today = new Date().toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const html = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <title>Коммерческое предложение — NiloV Catering</title>
  <style>
    @page { margin: 1.5cm; size: A4; }
    * { box-sizing: border-box; }
    body {
      font-family: 'Helvetica Neue', Arial, sans-serif;
      color: #1C1815;
      font-size: 11px;
      line-height: 1.5;
      max-width: ${PDF_MAX_WIDTH};
      margin: 0 auto;
      padding: ${PDF_PADDING};
    }

    /* Header */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 2px solid #8A6D3B;
    }
    .logo {
      font-size: 28px;
      font-weight: bold;
      color: #8A6D3B;
      letter-spacing: -1px;
    }
    .logo span { color: #1C1815; font-weight: normal; }
    .doc-info { text-align: right; color: #6B625A; }
    .doc-info h1 { font-size: 16px; color: #1C1815; margin: 0 0 5px; }
    .doc-number { font-size: 10px; }

    /* Client Info */
    .client-box {
      background: #F9F6F1;
      border-radius: 8px;
      padding: 15px 20px;
      margin-bottom: 25px;
    }
    .client-box h2 { font-size: 13px; margin: 0 0 10px; color: #8A6D3B; }
    .client-details { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 11px; }
    .client-details strong { color: #1C1815; }

    /* Event Summary */
    .summary {
      background: linear-gradient(135deg, #8A6D3B 0%, #B08D57 100%);
      color: white;
      border-radius: 12px;
      padding: 25px;
      margin-bottom: 25px;
      text-align: center;
    }
    .summary-format { font-size: 18px; font-weight: bold; margin-bottom: 5px; }
    .summary-tier { font-size: 14px; opacity: 0.9; margin-bottom: 15px; }
    .summary-total { font-size: 36px; font-weight: bold; }
    .summary-per-guest { font-size: 14px; opacity: 0.85; margin-top: 5px; }

    /* Table */
    table { ${PDF_TABLE_STYLE} }
    th {
      background: #F5F0EB;
      text-align: left;
      padding: 12px 15px;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #8A6D3B;
      border-bottom: 2px solid #E5DCC8;
    }
    td { padding: 12px 15px; border-bottom: 1px solid #EFE6D6; vertical-align: top; }
    tr:hover td { background: #FAFAF8; }
    .text-right { text-align: right; }
    .price { font-weight: 600; color: #8A6D3B; white-space: nowrap; }

    /* Totals */
    .totals { margin-top: 20px; }
    .totals-row { display: flex; justify-content: space-between; padding: 8px 0; }
    .totals-row.total {
      font-size: 16px;
      font-weight: bold;
      color: #8A6D3B;
      border-top: 2px solid #8A6D3B;
      margin-top: 10px;
      padding-top: 15px;
    }
    .discount { color: #2D7D46; }

    /* Includes */
    .includes {
      background: #F9F6F1;
      border-radius: 8px;
      padding: 20px;
      margin: 25px 0;
    }
    .includes h3 { font-size: 13px; color: #8A6D3B; margin: 0 0 12px; }
    .includes ul { margin: 0; padding-left: 20px; }
    .includes li { margin-bottom: 5px; font-size: 10px; }

    /* Footer */
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #EFE6D6;
      text-align: center;
      font-size: 9px;
      color: #999;
    }
    .footer-contacts { margin-bottom: 10px; font-size: 11px; color: #6B625A; }
    .validity { background: #FFF8E1; padding: 10px; border-radius: 6px; margin-top: 15px; font-size: 10px; color: #856404; }

    @media print {
      body { padding: 15mm; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>

<!-- Header -->
<div class="header">
  <div class="logo">NiloV<span>Catering</span></div>
  <div class="doc-info">
    <h1>Коммерческое предложение</h1>
    <div class="doc-number">№ КП-${Date.now().toString().slice(-6)} от ${today}</div>
    <div style="margin-top: 5px;">Действительно: 30 дней</div>
  </div>
</div>

<!-- Client Info -->
<div class="client-box">
  <h2>📋 Информация о заказчике</h2>
  <div class="client-details">
    <div><strong>Клиент:</strong> ${escapeHtml(clientName || "—")}</div>
    <div><strong>Телефон:</strong> ${escapeHtml(phone || "—")}</div>
    <div><strong>Мероприятие:</strong> ${escapeHtml(eventName || "—")}</div>
    <div><strong>Дата:</strong> ${escapeHtml(eventDate || "—")}</div>
  </div>
</div>

<!-- Summary -->
<div class="summary">
  <div class="summary-format">${FORMAT_LABELS[format] || format}</div>
  <div class="summary-tier">Тариф «${TIER_LABELS[tier]}» · ${guests} гостей</div>
  <div class="summary-total">${grandTotal.toLocaleString("ru-RU")} ₽</div>
  <div class="summary-per-guest">${pricePerGuest.toLocaleString("ru-RU")} ₽/гость${guests > 1 ? ` × ${guests}` : ""}</div>
</div>

<!-- Cost Breakdown -->
<table>
  <thead>
    <tr>
      <th>Наименование</th>
      <th class="text-right">Кол-во</th>
      <th class="text-right">Цена</th>
      <th class="text-right">Сумма</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>${FORMAT_LABELS[format] || format}</strong> — тариф «${TIER_LABELS[tier]}»</td>
      <td class="text-right">${guests} гостей</td>
      <td class="price text-right">${pricePerGuest.toLocaleString("ru-RU")} ₽</td>
      <td class="price text-right">${baseTotal.toLocaleString("ru-RU")} ₽</td>
    </tr>
    ${
      discountAmount > 0
        ? `
    <tr>
      <td colspan="3" class="text-right discount">Скидка за раннее бронирование (${discountPercent}%)</td>
      <td class="price text-right discount">−${discountAmount.toLocaleString("ru-RU")} ₽</td>
    </tr>`
        : ""
    }
    ${selectedAddons
      .map(
        (a) => `
    <tr>
      <td>${escapeHtml(a.name)} ${a.description ? `<br><small style="color:#888">${escapeHtml(a.description)}</small>` : ""}</td>
      <td class="text-right">${a.priceType === "perGuest" ? `${guests} чел` : "1 усл."}</td>
      <td class="price text-right">${a.priceType === "perGuest" ? `${a.price.toLocaleString("ru-RU")} ₽/чел` : `${a.price.toLocaleString("ru-RU")} ₽`}</td>
      <td class="price text-right">${(a.priceType === "perGuest" ? a.price * guests : a.price).toLocaleString("ru-RU")} ₽</td>
    </tr>`
      )
      .join("")}
  </tbody>
</table>

<!-- Totals -->
<div class="totals">
  <div class="totals-row">
    <span>Итого по тарифу:</span>
    <span>${subtotal.toLocaleString("ru-RU")} ₽</span>
  </div>
  ${
    addonsTotal > 0
      ? `
  <div class="totals-row">
    <span>Дополнительные услуги:</span>
    <span>${addonsTotal.toLocaleString("ru-RU")} ₽</span>
  </div>`
      : ""
  }
  <div class="totals-row total">
    <span>ИТОГО:</span>
    <span>${grandTotal.toLocaleString("ru-RU")} ₽</span>
  </div>
</div>

<!-- What's Included -->
<div class="includes">
  <h3>✅ Что входит в цену</h3>
  <ul>
    <li>Меню по тарифу «${TIER_LABELS[tier]}» (${format === "furshet" ? "холодные + горячие закуски" : format === "banket" ? "полный обед/ужин" : "выпечка и напитки"})</li>
    <li>Посуда, столовые приборы, текстиль, сервировка</li>
    <li>Обслуживание персоналом (официанты)</li>
    <li>Доставка в пределах КАД</li>
    <li>Установка зоны и уборка после мероприятия</li>
    <li>Личный координатор события</li>
  </ul>
</div>

<!-- Validity -->
<div class="validity">
  ⏰ <strong>Важно:</strong> Предложение действительно 30 дней. Цены могут измениться при бронировании менее чем за 14 дней.
  Для подтверждения забронировать дату: депозит 30% от суммы заказа (возвратный при отмене за 7+ дней).
</div>

<!-- Footer -->
<div class="footer">
  <div class="footer-contacts">
    📞 ${SITE.phone} · ✉️ ${SITE.email} · 🌐 ${SITE.domain}
  </div>
  <p>
    © NiloV Catering, ${new Date().getFullYear()}. Все права защищены.<br>
    Санкт-Петербург · ОГРН: 1234567890123 · ИНН: 7701234567<br>
    Документ сгенерирован автоматически. Не является публичной офертой.
  </p>
</div>

</body></html>`;

    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Disposition": `attachment; filename="KP_NilovCatering_${format}_${tier}_${guests}guests.html"`,
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}
