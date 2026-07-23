# CRITIC W4 · C9 — Гэпы / SEO (ось 9/9) — ПОВТОРНЫЙ аудит

**Метод:** проверка ПО ДИСКУ (04_BLOCKS.md, 33_UXSIM_DARYA.md, 33_UXSIM_MARINA.md). CRITIC_W3_C9_GAPS.md не использовался как источник истины.

## Проверка закрытия багов

### (a) B3 — per-page OG/meta/canonical в SchemaBlock — ✅ ЗАКРЫТ
`04_BLOCKS.md:1244-1258`. SchemaBlock теперь несёт **обязательный per-page SEO-контракт**:
- Каждая страница (`/`, `/menu`, `/events/*`, `/plan/*`, `/reviews`, `/blog`, `/why-us`, `/seasonal`) обязана иметь `<title>`, `<meta name="description">`, `og:title`, `og:description`, `og:image`, `og:type`, `og:locale=ru_RU`, `<link rel="canonical">` (self-canonical, без www).
- Источник OG — `generateMetadata` (Next 16 metadata API) **per route, НЕ хардкод**.
- Есть маппинг страница→`@type` (1247-1258) и защита `AggregateRating` от фейка (1259).
Явно помечено «(закрывает B3, критик C9)». Требование конкретно и реализуемо.

### (b) B5 — VK-primary / IG-secondary — ✅ ЗАКРЫТ
`04_BLOCKS.md:1270`. В `sameAs` LocalBusiness:
- **VK https://vk.com/nilov_catering — ПЕРВИЧНЫЙ** канал в РФ (всегда доступен);
- Instagram @nilov_catering — **ВТОРИЧНЫЙ** (аудитория через VPN);
- WhatsApp/Telegram — первичные каналы связи; ссылка на правило VK-primary в `17_MEDIA_DIRECTION`; фикс Волны 5А «Instagram→VK». Порядок и приоритет корректны.

### (c) B1 — цена кофе 950 с 🟡-флагом — ✅ СМЯГЧЁН (оба файла)
- `33_UXSIM_DARYA.md:14` — «Кофе-брейк от 950 ₽» 🟡 *(канон spec; живой сайт NiloV «от 390 ₽» — BUG-F2, требует сверки с прайсом заказчика до публикации)*. Рекомендация #7 (стр.67-68) дублирует предупреждение о расхождении 950 vs 390.
- `33_UXSIM_MARINA.md:12` — «Кофе-брейк от 950 ₽ 🟡 *(канон spec; живой сайт «от 390 ₽», BUG-F2)*». Флаг присутствует прямо в Hero-строке.
Расхождение больше не выдаётся за факт — помечено как pending-verification. Смягчение подтверждено.

## Оценка оси 9 (Гэпы/SEO)

| Критерий | Статус |
|---|---|
| Per-page SEO-контракт (title/meta/OG/canonical) | ✅ есть, per-route generateMetadata |
| JSON-LD маппинг + защита AggregateRating от фейка | ✅ есть |
| VK-primary / IG-secondary для РФ | ✅ есть |
| llms.txt для AI-поиска | ✅ есть (1282-1287) |
| Честность цены (950 🟡 BUG-F2) | ✅ флаг проставлен в обоих UXSIM |

**Остаточный (не блокирующий) гэп:** цена 950 остаётся `pending-verification` — это НЕ SEO-дефект, а бизнес-сверка прайса до релиза (корректно помечена, ответственность заказчика).

## Балл оси: **8.5 / 10**

Все три ранее открытых бага (B3, B5, B1) закрыты/смягчены по диску. Требования конкретны, привязаны к Next 16 API и правилам РФ. Минус 1.5 — остаточная неверифицированная цена (мягкий, флагирован) и отсутствие объективных SEO-метрик (spec-стадия, Lighthouse/rich-results не прогонялись — правило §5 self-critic).

## ВЕРДИКТ: **PASS**

(≥8.0, критических дефектов нет, все целевые баги закрыты.)
