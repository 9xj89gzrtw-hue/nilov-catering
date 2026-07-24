# ITER2 — Правки 02_IA.md (P0-4 Домен/SEO)

**Файл:** `research/STRUCTURE/02_IA.md` (только он).
**Задача:** зафиксировать ЕДИНЫЙ продакшн-домен `nilov-catering.ru` и привести
canonical/metadataBase/sitemap/robots к единому канону; устранить рассинхрон с кодом
(`app/*` ставил canonical на `odaeda.ru`, спека — `nilov-catering.ru`, sitemap/robots — `vercel.app`).

## Что изменил

1. **Добавлен раздел «Домен и канонические URL»** — `02_IA.md:8–31`.
   - Явно: прод-домен `nilov-catering.ru`; staging = `*.vercel.app` (только превью, `noindex` + canonical на прод); `odaeda.ru` помечен как чужой сайт/ошибка (удалён из канона); `localhost` — только локальная разработка.
   - Таблица: `metadataBase` / canonical / `sitemap.xml` / `robots.txt` / `llms.txt` → `https://nilov-catering.ru/...`.
   - Правило для `app/*`: canonical/metadataBase ДОЛЖНЫ указывать на `nilov-catering.ru`, а НЕ на `odaeda.ru`/`*.vercel.app`/`localhost`.

2. **Добавлен подраздел «Sitemap (XML) — индексируемые роуты»** — `02_IA.md:116–140`
   (сразу после блока «Финальный sitemap», перед «Каноничные slug'и»).
   - `<urlset>` с базой `https://nilov-catering.ru/`, содержит актуальные роуты IA:
     `/`, `/events`, `/events/svadba`, `/events/korporativ`, `/menu/furshet`, `/menu/banquet`,
     `/plan`, `/plan/calculator`, `/plan/constructor`, `/plan/helper`, `/gallery`, `/why-us`,
     `/contact`, `/delivery`.

## Замечания / расхождения с исходным перечнем

- Файл **не содержал** упоминаний `odaeda.ru`/`vercel.app`/`localhost`/`nilov-catering.ru`
  до правки — домены заданы впервые (это сама спека, а не код).
- Согласовано с каноном IA (сама IA — истина): `/about`→`/why-us`, `/contacts`→`/contact`.
  Устаревшие `/about`,`/services`,`/testimonials`,`/contacts` в sitemap НЕ включены (301-редиректы).
- `/events/rozhdestvo` **отсутствует в IA** (новогодние офферы живут в `/seasonal`) — в sitemap
  не добавлен; `/why-us`, `/gallery`, `/delivery` добавлены по фактическим роутам IA.
- Прочие доменные упоминания в файле отсутствуют — рассинхрон устраняется на уровне правила к коду.
