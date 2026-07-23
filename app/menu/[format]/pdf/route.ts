import { NextResponse } from 'next/server';
import { ALL_DISHES, DISH_CATEGORIES } from '@/lib/menu-data';
import { ALLERGEN_LABEL } from '@/lib/types';
import type { Format, Tier } from '@/lib/types';

const FORMAT_LABELS: Record<string, string> = {
  furshet: 'Фуршет',
  banket: 'Банкет',
  'coffee-break': 'Кофе-брейк',
  detskoe: 'Детское меню',
  vegan: 'Веган',
  'gluten-free': 'Без глютена',
  halal: 'Халяль',
  'show-cooking': 'Show-cooking',
  bar: 'Бар',
  'mobile-furshet': 'Выездной фуршет',
  'chef-at-home': 'Выезд шефа',
};

const TIER_INFO: Record<Tier, { label: string; desc: string }> = {
  economy: { label: 'Эконом', desc: 'Базовый набор блюд' },
  standard: { label: 'Стандарт', desc: 'Расширенное меню' },
  premium: { label: 'Расширенный', desc: 'Премиум-подборка' },
  luxury: { label: 'Максимальный', desc: 'Полное меню' },
};

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ format: string }> }
) {
  const { format } = await params;
  const label = FORMAT_LABELS[format] || format;
  const dishes = ALL_DISHES.filter(d => d.format.includes(format as Format));

  const html = `<!DOCTYPE html>
<html lang="ru">
<head><meta charset="utf-8"><title>Меню «${escapeHtml(label)}» — NiloV Catering</title>
<style>
  @page { margin: 2cm; size: A4; }
  body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #1C1815; font-size: 11px; line-height: 1.4; }
  h1 { font-size: 22px; margin-bottom: 4px; color: #8A6D3B; }
  .subtitle { color: #6B625A; margin-bottom: 20px; font-size: 12px; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
  th { text-align: left; padding: 6px 8px; border-bottom: 2px solid #B08D57; color: #8A6D3B; font-size: 10px; text-transform: uppercase; }
  td { padding: 6px 8px; border-bottom: 1px solid #EFE6D6; vertical-align: top; }
  .price { text-align: right; white-space: nowrap; color: #8A6D3B; font-weight: 600; }
  .badge { display: inline-block; padding: 1px 4px; border-radius: 3px; font-size: 8px; margin-right: 2px; }
  .vg { background: #d1fae5; color: #065f46; } .gf { background: #fef3c7; color: #92400e; } .halal { background: #dbeafe; color: #1e40af; }
  footer { margin-top: 30px; padding-top: 12px; border-top: 1px solid #EFE6D6; font-size: 9px; color: #6B625A; }
  .tier { margin-bottom: 16px; padding: 10px; border: 1px solid #EFE6D6; border-radius: 8px; }
  .tier h3 { margin: 0 0 4px; font-size: 14px; color: #8A6D3B; }
  .tier .price { display: inline; float: right; font-size: 14px; }
  .tier p { margin: 0; font-size: 10px; color: #4A423B; }
  .allergens { font-size: 8px; color: #6B625A; }
</style></head>
<body>
<h1>Меню «${escapeHtml(label)}»</h1>
<p class="subtitle">NiloV Catering • Санкт-Петербург • +7 (812) 919-59-11 • odaeda.ru</p>

${format === 'furshet' ? `<div class="tier"><h3>Эконом <span class="price">2 450 ₽/гость</span></h3><p>5–7 видов канапе, 3 вида тарталеток, сезонные фрукты, соки, вода</p></div>
<div class="tier"><h3>Стандарт <span class="price">3 450 ₽/гость</span></h3><p>8–10 видов закусок, рулеты, сырная тарелка, кофе, чай, морсы</p></div>
<div class="tier"><h3>Расширенный <span class="price">4 350 ₽/гость</span></h3><p>12+ видов, горячие мини-блюда, десертный стол, вино, шампанское</p></div>
<div class="tier"><h3>Максимальный <span class="price">5 350 ₽/гость</span></h3><p>Икра, морепродукты, бармен, шоу-станция, полное меню</p></div>` : ''}

<h2>Блюда (${dishes.length})</h2>
<table>
<thead><tr><th>Название</th><th>Описание</th><th>Цена/гость</th><th>Диеты</th><th>Аллергены</th></tr></thead>
<tbody>
${dishes.map(d => `<tr>
  <td>${escapeHtml(d.name)}</td>
  <td>${escapeHtml(d.description)}</td>
  <td class="price">${d.pricePerGuest} ₽</td>
  <td>${d.dietBadges.includes('vegan') ? '<span class="badge vg">VG</span>' : ''}${d.dietBadges.includes('gluten-free') ? '<span class="badge gf">GF</span>' : ''}${d.dietBadges.includes('halal') ? '<span class="badge halal">H</span>' : ''}</td>
  <td class="allergens">${d.allergens.map(a => ALLERGEN_LABEL[a] || a).join(', ')}</td>
</tr>`).join('\n')}
</tbody></table>

<footer>
  NiloV Catering • Санкт-Петербург • +7 (812) 919-59-11 • info@odaeda.ru • odaeda.ru<br>
  Цены указаны на июль 2026 г. Для точной сметы свяжитесь с менеджером.<br>
  © NiloV Catering, 2026. Все права защищены.
</footer>
</body></html>`;

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Disposition': `attachment; filename="nilov-${format}-menu.html"`,
    },
  });
}