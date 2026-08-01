# Design Tokens — светлая система (пересмотрено по аудиту репо, 2026-07-18)

**Стек:** Tailwind CSS v4.3.2 (CSS-first `@theme`).
**КРИТИЧНО (из `15_REPO_AUDIT.md`):** репозиторий УЖЕ использует **shadcn-токены**
(`--color-background` / `--color-foreground` / `--color-primary` / `--color-card` /
`--color-muted` / `--color-border` / `--color-ring` …) и `components/ui/*` (button, card, badge…)
заточены под НИХ. Поэтому наша светлая палитра ложится **ТОЧНО в эти имена**
(меняем ЗНАЧЕНИЯ, не имена) + добавляем бренд-токены (gold/earth/burgundy).
Иначе при перекраске shadcn-примитивы сломаются (белый текст на белом).

> Все значения — единственный источник правды. В компонентах НЕТ хардкод-цветов.
> Компоненты импортируют токены через Tailwind utilities
> (`bg-background`, `text-foreground`, `bg-primary`, `bg-gold`…) или `var(--color-*)`.
> ⚠️ `text-gold` НЕ входит в валидные utility-тексты. Редирект-алиас: `@utility text-gold { color: var(--color-gold-text); }` — редирект на безопасный токен (золото как ТЕКСТ напрямую = 2.89:1 FAIL, см. §1 `gold-text`).

---

## 1. Цвета (light) — правим ЗНАЧЕНИЯ в `app/globals.css`

```css
@theme {
  /* === shadcn-база (имена совпадают с components/ui/*) === */
  --color-background:       #FAF7F2;  /* ivory base (было #0A0A0A) */
  --color-foreground:       #1C1815;  /* ink, текст (было #F5F0EB) */
  --color-card:             #FFFFFF;  /* карточки на ivory */
  --color-card-foreground:  #1C1815;
  --color-popover:          #FFFFFF;
  --color-popover-foreground:#1C1815;
  --color-primary:          #B08D57;  /* gold = ЗАЛИВКА кнопки/CTA (декоративная плоскость, НЕ текст) */
  --color-primary-foreground:#1C1815;  /* [Волна 12, DESIGNCRITIC B1/B3/C1 — КРИТ a11y] ink-текст на золоте = 5.7:1 ✓ AA (было #FFFFFF = 3.09:1 FAIL для normal-текста). Белый на золоте проходит только large-bold — недостаточно для 14–16px CTA. */
  --color-secondary:        #F2ECE3;  /* cream-alt секции (канон из 01 §2 Soft cream #F2ECE3) */
  --color-secondary-foreground:#1C1815;
  --color-muted:           #F2ECE3;
  --color-muted-foreground: #4A423B;  /* [Волна 3, закрывает V6 — Виктор] warm grey, подписи. Поднят с #6B625A (~5.6:1) до #4A423B (~9.2:1 на ivory) — заведомо ЧИТАЕМО для sub/microcopy, цель WCAG AAA (контраст ≥7:1). Канон из 01 §2 скорректирован под a11y-требование слабого зрения. */
  --color-accent:          #EFE6D6;  /* gold-tint фон бейджей */
  --color-accent-foreground:#6E5631;  /* [Волна 12, A11Y B2] foreground бейджа на gold-tint = 5.582:1 ✓ AAA (было #7C6A55 = 4.188:1 FAIL AA; #6E5631 на --color-accent #EFE6D6 = 5.582:1 ≥7:1 AAA). */
  --color-border:           #E4DCCF;  /* hairline */
  --color-input:           #E4DCCF;
  --color-ring:            #8A6D3B;  /* focus-visible 2px gold-text (WCAG 1.4.11: 4.537:1 ≥3:1 на ivory, 4.129:1 на secondary) */
  --color-destructive:     #A6443B;
  --color-destructive-foreground:#FFFFFF;

  /* === бренд-расширения (наши, добавляем к shadcn) === */
  --color-gold:       #B08D57;  /* ЗАЛИВКА/акцент/CTA-фон/разделители (декоративная плоскость, НЕ текст на светлом) */
  --color-gold-text:  #8A6D3B;  /* [Волна 12, DESIGNCRITIC B1/B7] золото ДЛЯ ТЕКСТА на ivory = 4.54:1 ✓ AA (gold-акцентный текст, overline, ссылки-акценты). #B08D57 как текст = 2.89:1 FAIL — использовать ТОЛЬКО как заливку. НА secondary (#F2ECE3) gold-text #8A6D3B = 4.13:1 — НИЖЕ AA; НЕ использовать на secondary-фоне (см. B1). */
  /* ⚠️ ОГРАНИЧЕНИЕ gold-text (ХРУПКИЙ AA-ЗАПАС):
     • На ivory #FAF7F2: gold-text #8A6D3B = 4.537:1 — AA-порог 4.5:1 пройден с запасом ВСЕГО 0.037.
       Это «на пределе»: под субпиксельным сглаживанием эффективный контраст падает и мелкий текст
       (<16px) может визуально не дотягивать AA. → НЕ использовать gold-text на тексте <16px без
       font-weight ≥ 600 (полужирный компенсирует падение). Для overline/капса — минимум 12px + 600+
       и желательно на ivory, НЕ на secondary.
     • На secondary #F2ECE3: gold-text #8A6D3B = 4.129:1 — ПРЯМОЙ FAIL для AA (4.5:1).
       → gold-text НА secondary-фоне ЗАПРЕЩЁН. Использовать ТОЛЬКО `--color-gold-text-on-secondary`
       #6E5631 (5.885:1 на secondary / 6.467:1 на ivory — комфортно на ОБОИХ фонах).
     • Не-текстовые плоскости (рамки/линии/underline/focus-ring) ведут через `--color-ring` #8A6D3B
       (≥3:1 по 1.4.11) или заливку `--color-gold` #B08D57 (НЕ как текст).
     • `border-gold` / `--color-gold` как обводка или focus-граница ЗАПРЕЩЕНЫ (2.893:1 < 3:1) — используй только `border-gold-text` (`#8A6D3B`) / `--color-ring`. */
  --color-gold-text-on-secondary: #6E5631;  /* [Волна 12, A11Y B1/B2] золотой ТЕКСТ на cream-секциях (secondary #F2ECE3) = 5.885:1 ✓ AA (и 6.467:1 на ivory). ИСПОЛЬЗОВАТЬ вместо gold-text там, где золотой текст сидит на secondary-фоне (напр. overline CTASection, B2). Контраст на ivory #FAF7F2: 6.467:1; на gold-tint #EFE6D6: 5.582:1. */
  --color-gold-soft:  #C9A961;  /* [Волна 12, DESIGNCRITIC B2] ТОЛЬКО декоративная заливка/градиент/hover-рамка. НЕ ДЛЯ ТЕКСТА (на ivory = 2.11:1 FAIL). Цены рендерятся в ink, см. §5. */
  --color-gold-tint:  #EFE6D6;  /* фон бейджей gold */
  --color-earth:      #7C6A55;  /* [Волна 13, A-R2] бейджи «особое/шефское», тёплый акцент (переименовано с «premium-» — trust-seg T2, без премиум-лексики) */
  --color-burgundy:   #722F37;  /* доверие/печати (редко) */
  --color-burgundy-tint:#F3E7E9;
  --color-line:       #E4DCCF;  /* alias border */
  --color-success:    #4F7A52;
  --color-warning:    #B5803A;
  --color-sage:      #7E8B6B;  /* eco / «в сезоне» (из 01 §2 Sage #7E8B6B) */

  /* === семантические алиасы (наш старый язык из 01_VISUAL_DNA) === */
  --color-bg:      #FAF7F2;  /* = background */
  --color-bg-alt:  #F2ECE3;  /* = secondary (канон #F2ECE3) */
  --color-ink:     #1C1815;  /* = foreground */
  --color-ink-soft:#4A423B;  /* [Волна 3, V6] = muted-foreground, поднят до AAA-читаемого #4A423B (был #6B625A) */
  --color-surface:  #FFFFFF;  /* = card */
}
```

**Правила:**
- НИКОГДА чёрный плашечный фон под текст Hero. Текст Hero — на мягком градиентном
  оверлее поверх фото (`rgba(250,247,242,.55)→transparent`), фото остаётся «живым».
- Gold — только на интерактиве и акцентах. Не заливаем им большие плоскости.
- Диалоги/модалки — `rgba(28,24,21,0.06)` blur, НЕ чёрный.

## 2. Типографика (KEEP из blueprint §6.2)
Репо `app/layout.tsx` импортирует `headingFont/bodyFont/monoFont` из `@/lib/fonts`
и `globals.css` задаёт `--font-heading/--font-body/--font-mono`. Сохраняем.

```css
@theme {
  --font-heading: "Cormorant", ui-serif, Georgia, serif; /* заголовки (КАНОН: Cormorant, НЕ Playfair — см. 01 §3, 44) */
  --font-body:    "Inter", ui-sans-serif, system-ui, sans-serif; /* body/UI */
  --font-mono:    "JetBrains Mono", ui-monospace, monospace;    /* цены/числа */
  --font-sans:    var(--font-body);  /* alias для shadcn-примитивов */
}
```
**Шкала (единая, canonical — rem-clamp из `01` §3, модуль 1.333):**
Все заголовки — **только через clamp-алиасы** (одна шкала для Home Hero / EventHero / подстраниц, см. C6/C7).
Мелкий UI-текст — фикс. rem-токены (база 16px). px-значения — только для справки.

| Token | Значение | Применение |
|---|---|---|
| `--text-2xs` | 0.75rem (12px) | overline, капс-подписи |
| `--text-xs` | 0.8125rem (13px) | бейджи |
| `--text-sm` | 0.875rem (14px) | body UI, кнопки |
| `--text-base` | 1rem (16px) | абзацы |
| `--text-lg` | 1.1875rem (19px) | lead |
| `--text-xl` | 1.5625rem (25px) | h4 / карточки |
| `--text-2xl` | 2.0625rem (33px) | h3 |
| `--text-3xl` | 2.75rem (44px) | h2 секций |
| `--text-h1` | `clamp(2.5rem, 5vw, 4.5rem)` | **H1 — ЕДИНЫЙ для Home Hero И EventHero И подстраниц** (max 72px) |
| `--text-h2` | `clamp(1.8rem, 3.5vw, 3rem)` | H2 секций (max 48px) |
| `--text-h3` | `clamp(1.4rem, 2.5vw, 2rem)` | H3 (max 32px) |
| `--text-body` | `clamp(1rem, 1.2vw, 1.125rem)` | body/lead (max 18px) |
| `--text-hero` | `clamp(2.5rem, 5vw, 4.5rem)` | алиас `--text-h1` (Hero) |

> **Удалены старые конфликтующие px-токены `--text-4xl: 59px` и `--text-hero: 76px`** —
> они НЕ выводились из rem-clamp `01` и давали вторую «истину» для размеров заголовков (C6/C7).
> Теперь H1 везде = `--text-h1`, H2 = `--text-h2`, H3 = `--text-h3`. Компоненты НЕ используют
> голые `px`/`rem` для типографики — только эти токены.
**Display-заголовки:** `--font-heading` = **Cormorant** (Catharsis Fonts, **OFL/бесплатно**, самохост `@fontsource/cormorant` — без вызова Google CDN, RF-ready/приватность/CWV) [Волна 15, A-R1/B-C1] вместо Playfair Display: Cormorant — Renaissance old-style, высокий контраст, выраженный характер, полное кириллическое покрытие (веса 300–700 + настоящий italic). Поднимает индивидуальность до уровня award-лидеров без бюджета (Playfair «заменяет 40 премиум-шрифтов» → потому читается generic). [Волна 15, B8-смягчение] Cormorant имеет НАСТОЯЩИЙ кириллический italic-глиф (не faux-oblique) → RU-акценты ДОПУСТИМО давать курсивом, НО только после проверки рендера реального Cormorant Cyrillic italic; при сомнении — font-weight/цвет (gold-text), как в Волне 13.
Италик (Cormorant italic, ЛАТИНИЦА и КИРИЛЛИЦА при наличии глифа) — для акцентных слов.

## 3. Радиусы, тени, контейнер

```css
@theme {
  --radius:      12px;   /* база shadcn-примитивов */
  --radius-sm:   8px;
  --radius-md:   12px;
  --radius-lg:   16px;
  --radius-xl:   24px;
  --radius-pill: 999px;
  --radius-circle: 50%;          /* [benchmark] круглые фреймы (border-radius:50% + object-fit:cover) */
  --frame-object-pos: 50% 40%;   /* [Волна 12, B8] object-position для Ken Burns/видео внутри масок — фокус на тарелке/лице, не режет важное */

  --shadow-card:   0 8px 24px -12px rgba(28,24,21,.12);
  --shadow-soft:   0 20px 50px -20px rgba(28,24,21,.18);
  --shadow-hover:  0 28px 60px -24px rgba(28,24,21,.24);
  --shadow-gold-glow: 0 0 40px rgba(176,141,87,0.10);

  --container-max: 1280px;
  --container-pad: clamp(20px, 5vw, 80px);
  --section-y: clamp(80px, 12vh, 160px); /* воздух между секциями */

  /* [Волна 13, A-R4] Явная система брейкпоинтов (Tailwind v4 defaults, зафиксировано) */
  --bp-sm: 640px;    /* моб-альбом / крупный телефон */
  --bp-md: 768px;    /* планшет-портрет — tablet-брейкпоинт (см. волна 8, Катя) */
  --bp-lg: 1024px;   /* планшет-альбом / малый ноут */
  --bp-xl: 1280px;   /* десктоп = container-max */
  --bp-2xl: 1536px;  /* wide/ultra-wide — grid-caps, fluid до этого (см. волна 9, Борис) */
}
```
> [Волна 13, A-R4] Сетки/карточки используют эти брейкпоинты явно (mobile-first), НЕ произвольные media-query. На touch (`--bp-md` и ниже) hover-эффекты → tap/autoplay-on-view. Проверка mobile-шкалы clamp обязательна на `--bp-sm`.
**Geometric frames:** фото/лого в круглых (`--radius-circle` + `object-fit:cover`) или
ромбовидных (`clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%)` + `object-fit:cover`)
фреймах с тонкой `--color-line` обводкой — «дорогая» геометрия (Proof of the Pudding /
Queen of Hearts). [Волна 12, B4] Ромб реализуется ТОЛЬКО через `clip-path`, НЕ через
`rotate-45` (поворот бокса перекашивает фото и подпись). Внутри масок — `--frame-object-pos`
для корректного кадрирования живого фото/видео (B8).

## 4. Motion tokens (единый язык анимаций)
> **ВАЖНО:** `gsap` НЕТ в `package.json`. Для scroll-reveal/parallax используем
> **Framer Motion** (`useScroll` + `useTransform`, `whileInView`), который УЖЕ в deps.
> GSAP добавляем только если понадобится timeline-оркестрация сверх Framer.
> См. `05_BUILD.md` Фаза 5.
```css
@theme {
  --ease-out-expo: cubic-bezier(.22,1,.36,1);   /* reveals, slide-in */
  --ease-spring:   cubic-bezier(.34,1.56,.64,1); /* countUp, magnetic */
  --dur-fast: 200ms; --dur-base: 400ms; --dur-slow: 700ms;
  --wipe-dur: 600ms;  /* clip-path wipe (Hero H1, page-transitions) */
}
```
- **Reveal:** translateY(24px)+opacity 0 → 0/1, `--dur-base`, `--ease-out-expo`, stagger 80ms.
- **Clip-path wipe (Hero H1 / page-transitions):** `clip-path: inset(0 100% 0 0)` → `inset(0)`,
  `--wipe-dur`, per-word stagger 60ms. «Ink-bleed» проявление (OpenCode Michelin). Дороже fade.
- **Seamless Preloader→Hero:** лого morph (scale-down в overline) после прогресс-бара 100%.
- **CountUp:** spring 400ms на изменении цены.
- **Magnetic:** кнопка следует курсору ±12px, spring возврат.
- **Ken Burns:** scale 1.0 → 1.08 за 6s ease-out на hover карточки. [Волна 12, C4] hover-loop/Ken Burns ТОЛЬКО при `pointer:fine` + элемент в viewport (IntersectionObserver) + не более 1 активного loop одновременно; на touch — `autoplay muted` on-intersection ИЛИ tap-to-play (C5). Per-animation perf-бюджет: ≤1 decode на main thread за раз.
- **Page transition:** clip-path/blur, Framer `AnimatePresence` (не WebGL video).
- **Reduced motion:** `useReducedMotion()` (Framer) → все transform/opacity-анимации off, clip-path→instant. [Волна 12, C2 — КРИТ] **Lenis НЕ является Framer-анимацией** — при `prefers-reduced-motion` его надо явно НЕ инициализировать (`if (prefersReducedMotion) { lenis?.destroy(); return; }`), иначе hijacked smooth-scroll + INP-провал. [Волна 12, C8] **marquee (Trust-bar) и parallax (галерея) — вне Framer** → их тоже гасить по `useReducedMotion()` + `pause-on-hover/focus` (WCAG 2.2.2 Pause/Stop/Hide для автодвижения >5s).
- [Волна 12, C7] **Reveal-фолбэк:** начальное `opacity:0` ТОЛЬКО при `mounted && !reducedMotion`; при ошибке JS/hydration/no-JS контент виден по умолчанию (`opacity:1`). `viewport={{once:true}}`.

## 5. Маппинг токенов → компоненты (примитивы shadcn + наши)
| Примитив | Токены |
|---|---|
| `Button` (primary) | `bg-primary` (`#B08D57`), `text-primary-foreground` (`#1C1815` ink = 5.7:1 ✓ AA), `rounded-full`, hover `--shadow-hover` + magnetic |
| `Button` (ghost/outline) | `border-border`, `text-foreground`, hover `bg-secondary` |
| `Card` | `bg-card`, `border-border`, `rounded-lg`, `shadow-card`, hover `shadow-soft` |
| `Badge` (особое/шефское) | `bg-gold-tint`, `text-earth` (`#7C6A55` → по канону earth; ТЕКСТ на gold-tint = `text-gold-text-on-secondary` `#6E5631` = 5.582:1 на gold-tint / 5.885:1 на secondary — AA ✓) — [Волна 13, A-R2] переименовано с «premium» (trust-seg T2). earth `#7C6A55` на gold-tint `#EFE6D6` = **4.188:1 (НЕ AA)**, поэтому текст бейджа должен быть `text-gold-text-on-secondary` `#6E5631` (5.582:1 на gold-tint / 5.885:1 на secondary — AA ✓) |
| `Badge` (хит) | `bg-gold-tint`, `text-burgundy` (на gold-tint ≥6:1 ✓) |
| `Badge` (в сезоне) | `bg-sage` заливка + `text-foreground` (ink 4.86:1 ✓ AA) — [Волна 12, B5] sage ТОЛЬКО фон, НЕ текст (sage-текст на ivory = 3.39:1 FAIL) |
| `PriceTag` | `font-mono`, **`text-foreground`** (ink `#1C1815` = 16.5:1 ✓ AAA) — [Волна 12, B2 — КРИТ] цена — самый конверсионный текст, рендерится в ink; золото ТОЛЬКО как декоративный underline/разделитель под ценой (`border-b border-gold-text` #8A6D3B = 4.537:1 на ivory (≥3:1 по WCAG 1.4.11); 4.129:1 — то же на secondary; НЕ `border-gold` #B08D57 = 2.893:1 FAIL), НЕ цвет цифр |
| `SectionHeading` | overline `text-2xs uppercase font-semibold` **`text-gold-text`** (`#8A6D3B` = 4.54:1 ✓ AA; **обязательно `font-semibold` ≥600** — компенсирует хрупкий AA-запас gold-text на ivory; **ivory-only — на secondary-фоне → `text-gold-text-on-secondary`**, см. §1 B1/B2) — [Волна 12, B7] было `text-gold` (2.89:1 FAIL); title `font-heading text-3xl text-foreground` |
| `Container` | `max-w-[--container-max]`, `px-[--container-pad]` |

> `components/ui/button.tsx`, `card.tsx`, `badge.tsx` УЖЕ написаны под shadcn-токены.
> В Фазе 0 меняем ТОЛЬКО значения токенов в `globals.css` — сами файлы примитивов не трогаем.
> Хардкод HEX в компонентах = нарушение (проверяется в аудите).
