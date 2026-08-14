# ✅ REVIEW CHECKLIST - Чеклист перед пушем

> **Проверьте ВСЕ пункты** перед каждым коммитом/пушем!

---

## 🚀 БЫСТРАЯ ПРОВЕРКА (5 минут)

### 1. Код работает?

- [ ] `bun run build` проходит без ошибок
- [ ] `npx tsc --noEmit` — 0 TypeScript ошибок
- [ ] Нет console.log в продакшн коде
- [ ] Нет закомментированного кода (`// TODO`, `// FIXME`)

### 2. Страница выглядит хорошо?

- [ ] **Mobile** (375px) — проверил(а)
- [ ] **Tablet** (768px) — проверил(а)
- [ ] **Desktop** (1280px) — проверил(а)
- [ ] Изображения загружаются и имеют alt-текст
- [ ] Текст читаем, контраст достаточный

### 3. SEO на месте?

- [ ] `<title>` уникальный и описательный
- [ ] `<meta description>` 150-300 символов
- [ ] Open Graph теги (og:title, og:description, og:image)
- [ ] Schema.org разметка (если нужна)
- [ ] Canonical URL

---

## 📋 ПОЛНЫЙ ЧЕКЛИСТ (15 минут)

### 🎨 ДИЗАЙН

#### Цвета и Типографика

- [ ] Все цвета из DESIGN-SYSTEM.md (нет хардкода!)
- [ ] Заголовки используют Cormorant Garamond (font-serif)
- [ ] Основной текст использует Inter (font-sans)
- [ ] Размеры шрифтов соответствуют иерархии
- [ ] Достаточный контраст текста (WCAG AA минимум)

#### Отступы и Расположение

- [ ] Секции имеют padding: py-16 md:py-24 lg:py-32
- [ ] Контент центрирован: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
- [ ] Grid/gap используют стандартные значения
- [ ] Footer прижат к низу (sticky footer)

#### Интерактивные элементы

- [ ] Hover состояния у всех кнопок/ссылок
- [ ] Focus стили для keyboard навигации
- [ ] Loading states для async операций
- [ ] Error states для форм
- [ ] Cursor pointer на кликабельных элементах

### ♿ ДОСТУПНОСТЬ (A11y)

- [ ] Все изображения имеют `alt` (описательные!)
- [ ] Семантические HTML теги (nav, main, section, article)
- [ ] ARIA labels где нужно
- [ ] Skip-to-content ссылка
- [ ] Цвет не единственный индикатор (иконка + текст)

### ⚡ ПРОИЗВОДИТЕЛЬНОСТЬ

- [ ] Изображения через next/image с width/height
- [ ] Hero изображения имеют priority prop
- [ ] Тяжёлые компоненты dynamic import с ssr: false
- [ ] Нет лишних re-renders (React DevTools)
- [ ] Lighthouse score > 90 (желательно)

### 🔒 БЕЗОПАСНОСТЬ

- [ ] Формы валидируются на сервере
- [ ] User input санитизируется
- [ ] Нет XSS уязвимостей
- [ ] External links have rel="noopener noreferrer"

### 📱 RESPONSIVE

- [ ] Mobile-first подход (base → md → lg → xl)
- [ ] Touch targets ≥ 44px
- [ ] Text не слишком мелкий на мобильном
- [ ] Horizontal scroll отсутствует
- [ ] Меню адаптируется (hamburger на mobile)

### 🧪 ТЕСТИРОВАНИЕ

- [ ] Формы работают корректно
- [ ] Навигация работает
- [ ] Modal/drawer открывается и закрывается
- [ ] Error boundary ловит ошибки
- [ ] 404 страница существует

---

## 📝 КОД КАЧЕСТВО

### TypeScript

```typescript
// ✅ Хорошо
interface Props {
  name: string;
  count?: number;
}

// ❌ Плохо (any)
const data: any = fetchData();

// ✅ Хорошо (типизация)
const data: DataType = fetchData();
```

### Именование

```
// Компоненты: PascalCase
ContactForm.tsx, ServiceCard.tsx

// Хуки: use + PascalCase
useDebounceValue.ts, useMediaQuery.ts

// Утилиты: camelCase
formatPrice.ts, cn()

// Константы: UPPER_SNAKE_CASE
API_URL, MAX_GUESTS
```

### Структура файла

```tsx
// 1. Imports
import { ... } from '...';

// 2. Types/Interfaces
interface Props { ... }

// 3. Constants
const DEFAULT_VALUE = ...;

// 4. Component
export function Component({ ... }: Props) {
  // Hooks
  // Handlers
  // Render
}

// 4. Sub-components (если маленькие)
function SubComponent() { ... }
```

---

## 🔄 PRE-PUSH CHECKLIST

Перед `git push` выполните:

```bash
# 1. Format check
npm run format:check

# 2. TypeScript check
npx tsc --noEmit

# 3. Build check
bun run build

# 4. Если всё ок - коммит и пуш
git add -A
git commit -m "type(scope): description"
git push  # pre-push хук дополнительно проверит!
```

---

## ❌ ЧАСТЫЕ ОШИБКИ (избегайте!)

| Ошибка                | Решение                                  |
| --------------------- | ---------------------------------------- |
| Хардкод цвета `#fff`  | Используйте `bg-white`, `text-[#d4a574]` |
| Забыли `'use client'` | Добавьте в начало клиентских компонентов |
| Missing alt на img    | Добавьте описательный alt-текст          |
| Console.log в коде    | Удалите или замените на proper logging   |
| Magic numbers         | Используйте значения из design-tokens    |
| Забыли metadata       | Добавьте export const metadata           |
| Inline styles         | Замените на Tailwind классы              |
| Div soup              | Используйте семантические теги           |

---

## ✅ ГОТОВО К ПУШУ?

Если ВСЕ галочки отмечены:

```bash
bun run safe-push  # Или просто git push
```

Если есть проблемы — исправьте сначала! Pre-push хук вас остановит 😊
