import { NextResponse } from 'next/server';
import { ALL_TARIFF_OFFERS } from '@/lib/tariff-offers';
import type { Tier } from '@/lib/types';

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export async function GET(_request: Request) {
  const rows: string[] = [];

  for (const [eventId, offers] of Object.entries(ALL_TARIFF_OFFERS)) {
    const eventLabel: Record<string, string> = {
      svadba: '💍 Свадьба', korporativ: '💼 Корпоратив', vypusknoy: '🎓 Выпускной',
      chastnoe: '🥂 Частное событие', detskoe: '🎈 Детский праздник', 'chef-at-home': '👨‍🍳 Шеф на дом',
    };
    rows.push(`<h2 style="color:#8A6D3B; font-size:18px; margin-top:28px;">${eventLabel[eventId] || eventId}</h2>`);

    for (const offer of offers) {
      rows.push(`<div class="tier">
        <div class="tier-header">
          <h3>${escapeHtml(offer.tierLabel)}</h3>
          <span class="price">${offer.pricePerGuest.toLocaleString()} ₽/гость</span>
        </div>
        <p>${escapeHtml(offer.description)}</p>
        <p class="meta">Мин. ${offer.minGuests} гостей</p>
        <p class="highlights">${offer.highlights.map(h => `<span class="hl">${escapeHtml(h)}</span>`).join(' ')}</p>
        <table>
          <thead><tr><th style="width:40%;">Блюдо</th><th>Состав</th><th style="width:80px;">Кол-во</th></tr></thead>
          <tbody>
            ${offer.composition.map(item => `<tr>
              <td><strong>${escapeHtml(item.name)}</strong></td>
              <td>${escapeHtml(item.desc)}</td>
              <td class="qty">${item.qty}</td>
            </tr>`).join('\n')}
          </tbody>
        </table>
      </div>`);
    }
  }

  const html = `<!DOCTYPE html>
<html lang="ru">
<head><meta charset="utf-8"><title>Тарифы и цены — NiloV Catering</title>
<style>
  @page { margin: 1.5cm; size: A4; }
  body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #1C1815; font-size: 10px; line-height: 1.4; }
  h1 { font-size: 24px; color: #8A6D3B; margin-bottom: 2px; }
  .subtitle { color: #6B625A; margin-bottom: 20px; font-size: 11px; }
  .tier { margin-bottom: 20px; padding: 12px; border: 1px solid #EFE6D6; border-radius: 8px; page-break-inside: avoid; }
  .tier-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px; }
  .tier h3 { margin: 0; font-size: 14px; color: #8A6D3B; }
  .price { font-size: 16px; font-weight: 700; color: #8A6D3B; }
  .meta { font-size: 9px; color: #6B625A; margin: 2px 0 6px; }
  .highlights { margin: 6px 0; }
  .hl { display: inline-block; padding: 1px 5px; border-radius: 3px; font-size: 8px; background: #F5F0EB; color: #4A423B; margin-right: 3px; }
  table { width: 100%; border-collapse: collapse; margin-top: 8px; }
  th { text-align: left; padding: 4px 6px; border-bottom: 1px solid #B08D57; color: #8A6D3B; font-size: 8px; text-transform: uppercase; }
  td { padding: 3px 6px; border-bottom: 1px solid #EFE6D6; vertical-align: top; font-size: 9px; }
  .qty { text-align: center; white-space: nowrap; color: #6B625A; }
  footer { margin-top: 24px; padding-top: 10px; border-top: 1px solid #EFE6D6; font-size: 8px; color: #6B625A; }
</style></head>
<body>
<h1>Тарифы и цены NiloV Catering</h1>
<p class="subtitle">Санкт-Петербург • +7 (812) 919-59-11 • odaeda.ru • Цены за человека</p>
${rows.join('\n')}
<footer>
  NiloV Catering • Санкт-Петербург • +7 (812) 919-59-11 • info@odaeda.ru • odaeda.ru<br>
  Цены указаны на июль 2026 г. Для точной сметы свяжитесь с менеджером.<br>
  © NiloV Catering, 2026. Все права защищены. • Информация носит ознакомительный характер.
</footer>
</body></html>`;

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Disposition': 'attachment; filename="nilov-tariffs-menu.html"',
    },
  });
}