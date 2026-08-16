import { NextResponse } from "next/server";
import { SITE } from "@/lib/data";
import { ALL_DISHES } from "@/lib/menu-data";
import { ALLERGEN_LABEL } from "@/lib/types";
import type { Format } from "@/lib/types";

const FORMAT_LABELS: Record<string, string> = {
  catalog: "Каталог блюд",
  furshet: "Фуршет",
  banket: "Банкет",
  banquet: "Банкет",
  "coffee-break": "Кофе-брейк",
  detskoe: "Детское меню",
  vegan: "Веган",
  "gluten-free": "Без глютена",
  halal: "Халяль",
  "show-cooking": "Шоу-кухня",
  bar: "Бар",
  "mobile-furshet": "Выездной фуршет",
  "chef-at-home": "Выезд шефа",
  bbq: "BBQ-меню",
  maslenitsa: "Масленица",
  "new-year": "Новогоднее меню",
  pominki: "Поминальное меню",
};

// PDF-specific CSS constants (explicit values required for PDF generation) (/* eslint-disable-line -- PDF constants */)
const PDF_TABLE_WIDTH = "width: 100%;"; /* eslint-disable-line -- PDF style */
const PDF_TABLE_MARGIN = "margin-bottom: 24px;"; /* eslint-disable-line -- PDF style */

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function GET(_request: Request, { params }: { params: Promise<{ format: string }> }) {
  const { format } = await params;
  const label = FORMAT_LABELS[format] || format;

  // Seasonal menus have inline dish lists (not in ALL_DISHES) — provide them directly
  const SEASONAL_DISHES: Record<
    string,
    { name: string; description: string; pricePerGuest: number }[]
  > = {
    bbq: [
      {
        name: "Шашлык из свинины",
        description: "Свиная шея в луковом маринаде, 200 г",
        pricePerGuest: 480,
      },
      {
        name: "Шашлык из курицы",
        description: "Куриное бедро в аджике, 200 г",
        pricePerGuest: 380,
      },
      {
        name: "Люля-кебаб из баранины",
        description: "Рубленая баранина с зеленью, 150 г",
        pricePerGuest: 450,
      },
      {
        name: "Стейк из лосося",
        description: "Лосось на гриле с лимоном, 180 г",
        pricePerGuest: 620,
      },
      {
        name: "Овощи гриль",
        description: "Баклажан, перец, цуккини, шампиньоны",
        pricePerGuest: 250,
      },
      {
        name: "Картофель по-деревенски",
        description: "С розмарином и чесноком",
        pricePerGuest: 180,
      },
      { name: "Кукуруза гриль", description: "С маслом и паприкой", pricePerGuest: 160 },
      {
        name: "Салат «Греческий»",
        description: "Помидоры, огурцы, фета, оливки",
        pricePerGuest: 220,
      },
      { name: "Лимонад домашний", description: "Лимон, мята, содовая", pricePerGuest: 120 },
      { name: "Мохито 0%", description: "Лайм, мята, сахарный сироп, содовая", pricePerGuest: 140 },
    ],
    maslenitsa: [
      { name: "Блины классические", description: "Молочные, тонкие, 5 шт", pricePerGuest: 180 },
      { name: "Блины с икрой", description: "С красной икрой, 3 шт", pricePerGuest: 380 },
      {
        name: "Блины с сёмгой",
        description: "Со сёмгой слабой соли и сливочным сыром, 3 шт",
        pricePerGuest: 320,
      },
      { name: "Блины с мясом", description: "С говяжьей начинкой, 3 шт", pricePerGuest: 220 },
      { name: "Блины с творогом", description: "С творогом и изюмом, 3 шт", pricePerGuest: 200 },
      {
        name: "Самовар",
        description: "Чёрный чай с травами, аренда самовара 2 часа",
        pricePerGuest: 150,
      },
      { name: "Медовуха", description: "Традиционный медовый напиток, 0.5 л", pricePerGuest: 250 },
      {
        name: "Пирожки печёные",
        description: "С капустой, яйцом, яблоком — ассорти",
        pricePerGuest: 120,
      },
      { name: "Ватрушки", description: "С творогом, 2 шт", pricePerGuest: 140 },
      { name: "Горячий сбитень", description: "Пряный медовый напиток, 0.3 л", pricePerGuest: 130 },
    ],
    "new-year": [
      {
        name: "Оливье премиум",
        description: "С курицей, перепелиным яйцом, свежим огурцом",
        pricePerGuest: 220,
      },
      {
        name: "Селёдка под шубой",
        description: "Слоёный салат с сельдью и свёклой",
        pricePerGuest: 200,
      },
      { name: "Мимоза", description: "С консервированным лососем и сыром", pricePerGuest: 210 },
      {
        name: "Запечённая утка",
        description: "С яблоками и черносливом, 200 г",
        pricePerGuest: 480,
      },
      {
        name: "Буженина",
        description: "Запечённая свинина с пряностями, 150 г",
        pricePerGuest: 380,
      },
      {
        name: "Мандариновый десерт",
        description: "Творожно-мандариновый торт, 1 кусок",
        pricePerGuest: 240,
      },
      { name: "Шампанское", description: "Игристое вино, 0.75 л на 6 чел", pricePerGuest: 350 },
      { name: "Глинтвейн", description: "Горячий пряный напиток, 0.3 л", pricePerGuest: 200 },
    ],
  };

  // Seasonal menus: use inline dish list (rendered as simplified table)
  if (SEASONAL_DISHES[format]) {
    const seasonalDishes = SEASONAL_DISHES[format];
    const seasonalHtml = `<!DOCTYPE html>
<html lang="ru">
<head><meta charset="utf-8"><title>Меню «${escapeHtml(label)}» — NiloV Catering</title>
<style>
  @page { margin: 2cm; size: A4; }
  body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #1C1815; font-size: 11px; line-height: 1.4; }
  h1 { font-size: 22px; margin-bottom: 4px; color: #8A6D3B; }
  .subtitle { color: #6B625A; margin-bottom: 20px; font-size: 12px; }
  table { ${PDF_TABLE_WIDTH}; border-collapse: collapse; ${PDF_TABLE_MARGIN}; }
  th { text-align: left; padding: 6px 8px; border-bottom: 2px solid #B08D57; color: #8A6D3B; font-size: 10px; text-transform: uppercase; }
  td { padding: 6px 8px; border-bottom: 1px solid #EFE6D6; vertical-align: top; }
  .price { text-align: right; white-space: nowrap; color: #8A6D3B; font-weight: 600; }
  footer { margin-top: 30px; padding-top: 12px; border-top: 1px solid #EFE6D6; font-size: 9px; color: #6B625A; }
</style></head>
<body>
<h1>Меню «${escapeHtml(label)}»</h1>
<p class="subtitle">NiloV Catering • Санкт-Петербург • +7 (812) 919-59-11 • ${SITE.domain}</p>

<h2>Блюда (${seasonalDishes.length})</h2>
<table>
<thead><tr><th>Название</th><th>Описание</th><th>Цена</th></tr></thead>
<tbody>
${seasonalDishes
  .map(
    (d) => `<tr>
  <td>${escapeHtml(d.name)}</td>
  <td>${escapeHtml(d.description)}</td>
  <td class="price">${d.pricePerGuest} ₽</td>
</tr>`
  )
  .join("\n")}
</tbody></table>

<footer>
  NiloV Catering • Санкт-Петербург • +7 (812) 919-59-11 • ${SITE.email} • ${SITE.domain}<br>
  Цены указаны на ${new Date().toLocaleDateString("ru-RU", { month: "long", year: "numeric" }).replace(" г.", "")}. Для точной сметы свяжитесь с менеджером.<br>
  © NiloV Catering, 2026. Все права защищены.
</footer>
</body></html>`;

    return new NextResponse(seasonalHtml, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Disposition": `inline; filename="nilov-${format}-menu.html"`,
      },
    });
  }

  const formatAliases: Record<string, string[]> = {
    banquet: ["banket", "banquet"],
    banket: ["banket", "banquet"],
  };
  const aliases = formatAliases[format] || [format];

  const dishes =
    format === "catalog"
      ? ALL_DISHES
      : ALL_DISHES.filter((d) => {
          if (aliases.some((a) => d.format.includes(a as Format))) return true;
          if (format === "vegan" && d.dietBadges.includes("vegan" as never)) return true;
          if (format === "gluten-free" && d.dietBadges.includes("gluten-free" as never))
            return true;
          if (format === "halal" && d.dietBadges.includes("halal" as never)) return true;
          return false;
        });

  const html = `<!DOCTYPE html>
<html lang="ru">
<head><meta charset="utf-8"><title>Меню «${escapeHtml(label)}» — NiloV Catering</title>
<style>
  @page { margin: 2cm; size: A4; }
  body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #1C1815; font-size: 11px; line-height: 1.4; }
  h1 { font-size: 22px; margin-bottom: 4px; color: #8A6D3B; }
  .subtitle { color: #6B625A; margin-bottom: 20px; font-size: 12px; }
  table { ${PDF_TABLE_WIDTH}; border-collapse: collapse; ${PDF_TABLE_MARGIN}; }
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
  .empty { padding: 40px 20px; text-align: center; color: #6B625A; font-style: italic; }
</style></head>
<body>
<h1>Меню «${escapeHtml(label)}»</h1>
<p class="subtitle">NiloV Catering • Санкт-Петербург • +7 (812) 919-59-11 • ${SITE.domain}</p>

${
  format === "furshet"
    ? `<div class="tier"><h3>Эконом <span class="price">2 450 ₽/гость</span></h3><p>5–7 видов канапе, 3 вида тарталеток, сезонные фрукты, соки, вода</p></div>
<div class="tier"><h3>Стандарт <span class="price">3 950 ₽/гость</span></h3><p>8–10 видов закусок, рулеты, сырная тарелка, кофе, чай, морсы</p></div>
<div class="tier"><h3>Премиум <span class="price">5 950 ₽/гость</span></h3><p>12+ видов, горячие мини-блюда, десертный стол, вино, шампанское</p></div>`
    : ""
}

${
  dishes.length > 0
    ? `<h2>Блюда (${dishes.length})</h2>
<table>
<thead><tr><th>Название</th><th>Описание</th><th>Цена/гость</th><th>Диеты</th><th>Аллергены</th></tr></thead>
<tbody>
${dishes
  .map(
    (d) => `<tr>
  <td>${escapeHtml(d.name)}</td>
  <td>${escapeHtml(d.description)}</td>
  <td class="price">${d.pricePerGuest} ₽</td>
  <td>${d.dietBadges.includes("vegan" as never) ? '<span class="badge vg">VG</span>' : ""}${d.dietBadges.includes("gluten-free" as never) ? '<span class="badge gf">GF</span>' : ""}${d.dietBadges.includes("halal" as never) ? '<span class="badge halal">H</span>' : ""}</td>
  <td class="allergens">${d.allergens.map((a) => ALLERGEN_LABEL[a] || a).join(", ")}</td>
</tr>`
  )
  .join("\n")}
</tbody></table>`
    : `<div class="empty">Сезонное меню «${escapeHtml(label)}» — блюда подбираются индивидуально.<br>Позвоните +7 (812) 919-59-11 для получения актуального меню.</div>`
}

<footer>
  NiloV Catering • Санкт-Петербург • +7 (812) 919-59-11 • ${SITE.email} • ${SITE.domain}<br>
  Цены указаны на ${new Date().toLocaleDateString("ru-RU", { month: "long", year: "numeric" }).replace(" г.", "")}. Для точной сметы свяжитесь с менеджером.<br>
  © NiloV Catering, 2026. Все права защищены.
</footer>
</body></html>`;

  return new NextResponse(html, {
    headers: {
      // Return as printable HTML (not PDF) — filename reflects actual content.
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition": `inline; filename="nilov-${format}-menu.html"`,
    },
  });
}
