# 🎨 DESIGN SYSTEM — Living Document (Живой документ)

> **⚠️ ВАЖНО:** Этот документ — отправная точка, НЕ догма!
>
> **ПЕРЕД любой дизайнерской работой агент ОБЯЗАН:**
>
> 1. Использовать веб-поиск для поиска актуальных трендов 2025-2026
> 2. Изучить Awwwards.com — лучшие сайты ресторанов/кейтеринга
> 3. Сравнить с конкурентами (лучшие в мире примеры)
> 4. Предложить улучшения этому документу

---

## 🔄 ФИЛОСОФИЯ ДИЗАЙНА

### Принципы (неизменные):

```
✅ ПРЕМИАЛЬНОСТЬ — каждый пиксел говорит о качестве
✅ ЭМОЦИОНАЛЬНОСТЬ — еда = любовь, праздник = радость
✅ ДОВЕРИЕ — чистота, профессионализм
✅ УДОБСТВО — клиент находит информацию за 3 клика
✅ АКТУАЛЬНОСТЬ — дизайн соответствует лучшим мировым стандартам 2025-2026
```

### Что ДОЛЖЕН делать агент перед работой:

```bash
# 1. Поиск актуальных трендов (ОБЯЗАТЕЛЬНО!)
z-ai function -n web_search -a '{"query": "best restaurant catering website design trends 2026", "num": 10}'

# 2. Изучение лучших примеров
z-ai function -n web_search -a '{"query": "site:awwwards.com hotel restaurant 2025 2026", "num": 10}'

# 3. Анализ конкурентов (российский кейтеринг)
z-ai function -n web_search -a '{"query": "лучшй кейтеринг moscow сайт дизайн premium", "num": 10}'

# 4. Цветовые тренды года
z-ai function -n web_search -a '{"query": "luxury brand color palette trends 2026 champagne gold black", "num": 10}'
```

---

## 🎨 ТЕКУЩАЯ ПАЛИТРА (предварительная — требует обновления!)

> ⚠️ **Эти цвета — БАЗОВАЯ ТОЧКА СТАРТА, не финальный выбор!**
>
> Агент должен предложить УЛУЧШЕННУЮ палитру на основе исследования!

### Вариант A: Classic Luxury (классический люкс)

```css
/* Основные цвета (требуют валидации!) */
--color-black: #0a0a0a; /* Onyx Black — основной фон */
--color-gold: #c9a96e; /* Champagne Gold — акцент */
--color-cream: #faf8f5; /* Ivory/Cream — светлый фон */
--color-navy: #1a1a2e; /* Midnight Navy — тёмный акцент */
--color-warm-white: #f5f2ed; /* Warm White — фон секций */
--color-charcoal: #2d2d2d; /* Charcoal — текст */

/* Градиенты (примеры — искать новые!) */
gradient-dark: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
gradient-gold: linear-gradient(135deg, #c9a96e 0%, #d4af74 100%);
gradient-hero: linear-gradient(to bottom, rgba(10, 10, 10, 0.9), rgba(10, 10, 10, 0.7));
```

### Вариант B: Earthy Modern (земный современный) — ТРЕНД 2026!

```css
/* Согласно исследованиям 2026 */
--color-clay: #c4a882; /* Soft Clay — основной акцент */
--color-taupe: #b8a99a; /* Warm Taupe — нейтральный */
--color-sage: #9caf88; /* Sage Green — органичный акцент */
--color-cream: #f5f0eb; /* Cream — фон */
--color-espresso: #3d2b1f; /* Espresso — текст/темный */
--color-blush: #e8c4b8; /* Blush — мягкий акцент */
```

### Вариант C: Bold Premium (смелый премиум)

```css
/* Для смелого современного бренда */
--color-black: #000000;
--color-gold: #d4af37;
--color-red-accent: #8b2942; /* Deep Cherry/Burgundy */
--color-plum: #6b3a5b; /* Plum Purple */
--color-ivory: #fffff0;
--color-coal: #36454f; /* Coal */
```

---

## 📐 ТИПОГРАФИЯ (исследовать актуальные шрифты!)

### Тренды 2026:

```
✅ Editorial typography — редакторские шрифты (как в журналах)
✅ Kinetic typography — анимированная типографика
✅ Organic/handwritten — рукописные акценты
✅ Large display sizes — огромные заголовки
✅ Mixed font pairing — смешивание стилей
```

### Рекомендуемые пары (требуют исследования!):

```tsx
// Пара 1: Luxury Editorial
font-display: "Playfair Display", "Cormorant Garamond", serif;  // заголовки
font-body: "Inter", "Plus Jakarta Sans", sans-serif;             // текст

// Пара 2: Modern Geometric
font-display: "Unbounded", "Space Grotesk", sans-serif;          // заголовки
font-body: "DM Sans", sans-serif;                               // текст

// Пара 3: Elegant Serif (для классического кейтеринга)
font-display: "Cormorant Garamond", serif;
font-body: "Montserrat", sans-serif;
```

---

## 🖼️ ПАТТЕРНЫ (гибкие — адаптировать под тренды!)

### Hero Section (исследовать лучшие реализации!)

```tsx
// Требования к Hero (неизменные):
// - Сильный визуальный impact
// - Чёткий UVP (Unique Value Proposition)
// - CTA выше fold или близко
// - Качественное фото/видео

// Пример структуры (адаптировать!):
<section className="relative flex min-h-screen items-center overflow-hidden">
  {/* Фон: видео/изображение/градиент — ИССЛЕДОВАТЬ ТРЕНДЫ */}

  {/* Контент */}
  <div>
    <h1>{/* UVP — уникальное предложение */}</h1>
    <p>{/* Поддержка */}</p>
    <CTAButton />
  </div>

  {/* Социальное доказательство (опционально) */}
  <Stats />
</section>
```

### Карточки (гибкая структура!)

```tsx
interface CardProps {
  // Обязательные поля:
  title: string;
  description: string;
  href: string;
  image?: string;

  // Опциональные (адаптировать!):
  icon?: React.ReactNode;
  price?: string;
  badge?: string;
  variant?: "default" | "featured" | "minimal";
}
```

---

## ✨ АНИМАЦИИ (Тренды 2026!)

### Актуальные подходы:

```
✅ Micro-interactions — маленькие реакции на действия
✅ Scroll-triggered animations — появление при скролле
✅ Parallax depth — глубина при скролле
✅ Smooth cursor followers — курсор с эффектом
✅ Page transitions — переходы между страницами
✅ Loading states — красивые состояния загрузки
⚠️ 3D elements — использовать умеренно!
⚠️ AI-generated visuals — экспериментировать!
```

### Рекомендуемые библиотеки:

```tsx
// Framer Motion (уже установлен!)
import { motion, AnimatePresence } from "framer-motion";

// GSAP для сложных анимаций (уже установлен!)
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Lenis для плавного скролла (уже установлен!)
import Lenis from "lenis";
```

---

## 📱 ADAPTIVE (обязательные требования!)

```tsx
// Breakpoints (стандарт):
// sm: 640px   — мобильный (большой)
// md: 768px   — планшет
// lg: 1024px  — ноутбук
// xl: 1280px  — десктоп
// 2xl: 1536px  — большой экран

// Mobile First — ОБЯЗАТЕЛЬНО!
// Touch targets: минимум 44x44px
// Text size mobile: min 16px
```

---

## ♿ ACCESSIBILITY (неизменные требования!)

```
✅ Contrast ratio 4.5:1 minimum (WCAG AA)
✅ Alt-тексты на ВСЕХ изображениях
✅ Semantic HTML (main, section, nav, article)
✅ Keyboard navigation
✅ Focus states visible
✅ ARIA labels где нужно
✅ Skip link (желательно)
✅ Reduced motion support
```

---

## 🚫 ANTI-PATTERNS (чего избегать!)

```tsx
// ❌ Устаревшие практики 2020-2023:
// - Flat design без глубины
// - Слишком много белого пространства "впустую"
// - Одинаковый дизайн у всех
// - Маленький текст (меньше 16px на mobile)
// - Отсутствие micro-interactions
// - Медленная загрузка изображений
// - Неоптимизированные видео

// ✅ Современный подход 2025-2026:
// + Глубина и слои (depth, layers)
// + Персонализация
// + Быстрая загрузка (Core Web Vitals)
// + Иммерсивные элементы
// + Эмоциональный дизайн
+ Уникальность бренда
```

---

## 🔬 ИССЛЕДОВАНИЕ ПЕРЕД РАБОТОЙ

### Чеклист исследования (ОБЯЗАТЕЛЬНЫЙ!):

Перед началом дизайнерской работы агент ДОЛЖЕН:

- [ ] **Поиск трендов:** `web_search("web design trends 2026")`
- [ ] **Лучшие примеры:** `web_search("awwwards restaurant catering 2026")`
- [ ] **Конкуренты:** `web_search("premium catering website russia moscow")`
- [ ] **Цвета:** `web_search("luxury color palette 2026 trends")`
- [ ] **Типографика:** `web_search("font pairing trends 2026 luxury")`
- [ ] **Анимации:** `web_search("micro-interactions animation trends 2026")`

### Где искать вдохновение:

```
🏆 Awwwards.com — лучшие сайты мира
🎨 Dribbble.com — концепты и идеи
💼 Behance.net — кейсы и процессы
🔥 Pinterest.com — mood boards
📱 Mobbin.com — mobile UI patterns
🌐 SiteInspire.com — веб-дизайн inspiration
```

---

## 📝 ОБНОВЛЕНИЕ ЭТОГО ДОКУМЕНТА

Этот документ должен **регулярно обновляться**!

Когда агент находит лучший подход:

1. Сравнить с текущим содержимым
2. Если новый подход лучше — обновить документ
3. Оставить комментарий с датой и источником

### Формат обновления:

```markdown
<!-- UPDATE: YYYY-MM-DD -->
<!-- Source: URL -->
<!-- Что изменилось: описание -->
```

---

## 💡 КЛЮЧЕВОЕ ПРАВИЛО

```
❌ "Сделаю как написано в DESIGN-SYSTEM.md" — WRONG!

✅ "Изучу тренды → сравню с лучшими → предложу УЛУЧШЕННЫЙ вариант" — RIGHT!

Этот документ — ОТПРАВНАЯ ТОЧКА, НЕ ФИНАЛЬНАЯ ОСТАНОВКА!
```

---

**Последнее обновление:** 14 августа 2026  
**Требует обновления:** Да (исследовать тренды!)  
**Версия:** 2.0 (Living Document approach)
