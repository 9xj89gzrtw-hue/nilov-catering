# 🤖 AGENTS.md — ИНСТРУКЦИИ ДЛЯ AI АГЕНТОВ

> **⚠️ КРИТИЧНО ВАЖНО:** Прочитайте этот файл ПЕРЕД началом работы!
>
> **ВЕРСИЯ 3.0 — Living Documentation Approach**
>
> Этот документ регулярно обновляется. Последнее обновление: 14 августа 2026

---

## 🚀 САМОЕ ВАЖНОЕ ПРАВИЛО

```
❌ НЕ ДЕЛАЙТЕ НИЧЕГО "ПО ПАМЯТИ" — это устареет!

✅ ВСЕГДА ИССЛЕДУЙТЕ ПЕРЕД РАБОТОЙ:
   → Веб-поиск трендов
   → Лучшие мировые примеры
   → Конкурентов
   → Актуальные решения
```

---

## 🔄 РАБОЧИЙ ПРОЦЕСС АГЕНТА (ОБЯЗАТЕЛЬНЫЙ!)

### Шаг 1: Инициализация

```bash
bun run start-work
```

### Шаг 2: ИССЛЕДОВАНИЕ (ОБЯЗАТЕЛЬНО перед дизайнерской работой!)

```bash
# === ТРЕНДЫ ДИЗАЙНА 2025-2026 ===
z-ai function -n web_search -a '{"query": "web design trends 2025 2026 luxury premium", "num": 10}'

# === ЛУЧШИЕ ПРИМЕРЫ МИРА ===
z-ai function -n web_search -a '{"query": "awwwards best restaurant catering website 2026", "num": 10}'

# === ЦВЕТОВЫЕ ТРЕНДЫ ===
z-ai function -n web_search -a '{"query": "luxury brand color palette 2026 champagne gold black trends", "num": 8}'

# === ТИПОГРАФИКА ===
z-ai function -n web_search -a '{"query": "font pairing luxury editorial 2026 trends", "num": 8}'

# === КОНКУРЕНТЫ (РОССИЯ) ===
z-ai function -n web_search -a '{"query": "премиальный кейтеринг moscow сайт дизайн", "num": 10}'

# === MICRO-INTERACTIONS / АНИМАЦИИ ===
z-ai function -n web_search -a '{"query": "micro-interactions animation web design 2026 examples", "num": 8}'
```

### Шаг 3: Сравнение и принятие решений

После исследования агент ДОЛЖЕН:

1. Сравнить найденное с текущей документацией
2. Если найдено ЛУЧШЕЕ решение — использовать ЕГО
3. Обновить документацию с новым знанием
4. Обосновать выбор

### Шаг 4: Работа над задачей

### Шаг 5: Проверка и коммит

```bash
bun run pre-deploy:quick
git add -A && git commit -m "type: описание"
git push  # или bun run safe-push
```

---

## 📚 ДОКУМЕНТАЦИЯ ПРОЕКТА

### 📋 Файлы документации (ОБЯЗАТНЫЕ К ЧТЕНИЮ!)

| Файл                      | Статус              | Когда читать       | Описание                                  |
| ------------------------- | ------------------- | ------------------ | ----------------------------------------- |
| **AGENTS.md**             | 🟢 Актуальна        | 🔴 КАЖДЫЙ РАЗ      | Эта инструкция — skills, процесс, команды |
| **DESIGN-SYSTEM.md**      | 🟡 Требует research | 🔴 КАЖДЫЙ РАЗ      | Дизайн — живой документ, отправная точка  |
| **COMPONENTS-CATALOG.md** | 🟢 Актуальна        | При работе с UI    | Готовые компоненты                        |
| **CODE-PATTERNS.md**      | 🟢 Актуальна        | При написании кода | Паттерны кода                             |
| **ERRORS-CHEATSHEET.md**  | 🟢 Актуальна        | При ошибке         | Решения проблем                           |
| **REVIEW-CHECKLIST.md**   | 🟢 Актуальна        | Перед пушем        | Чеклист качества                          |
| **DEPENDENCIES.md**       | 🟢 Актуальна        | При необходимости  | Все пакеты                                |

### ⚠️ ВАЖНО: Отношение к документации

```
📗 DESIGN-SYSTEM.md = ОТПРАВНАЯ ТОЧКА, НЕ ДОГМА!
   → Исследовать тренды → Сравнить → Улучшить → Обновить

📘 COMPONENTS-CATALOG.md = ИСПОЛЬЗОВАТЬ ГОТОВОЕ!
   → Не создавать дубликаты → Экономия времени

📙 CODE-PATTERNS.md = ПАТТЕРНЫ КОДА, НЕ ДИЗАЙН!
   → Структура кода → А не визуальный дизайн
```

---

## 🛠️ DOSTUPNYE SKILLS (СКИЛЛЫ)

### Что такое Skills?

Skills — специальные возможности для выполнения задач через **z-ai-web-dev-sdk**.

### 📋 ПОЛНЫЙ СПИСОК:

#### 🖼️ Медиа и Контент

| Skill                | Когда использовать          | Пример запроса                                                                  |
| -------------------- | --------------------------- | ------------------------------------------------------------------------------- |
| **image-generation** | Нужно создать изображение   | "Сгенерируй фото банкетного стола в стиле премиум, тёмный фон, золотые акценты" |
| **image-edit**       | Отредактировать изображение | "Добавь логотип на фото, измени цветовую гамму"                                 |
| **image-search**     | Найти изображение           | "Найди примеры свадебного декора в тёмных тонах"                                |
| **TTS**              | Озвучить текст              | "Создай аудио приветствия для сайта"                                            |
| **ASR**              | Распознать речь             | "Транскрибируй видео отзыва клиента"                                            |
| **video-understand** | Проанализировать видео      | "Опиши что в этом видео о мероприятии"                                          |

#### 💬 Текст и AI

| Skill          | Когда использовать                | Пример запроса                       |
| -------------- | --------------------------------- | ------------------------------------ |
| **LLM**        | Генерация текста, чат-бот         | "Напиши текст для главной страницы"  |
| **web-search** | 🔴 **ОБЯЗАТЕЛЬНО ПЕРЕД РАБОТОЙ!** | "Найди тренды дизайна 2026"          |
| **web-reader** | Извлечь контент со страницы       | "Прочитай статью с сайта конкурента" |

#### 📄 Документы

| Skill    | Когда использовать    | Пример запроса                     |
| -------- | --------------------- | ---------------------------------- |
| **docx** | Создать Word документ | "Создай договор на оказание услуг" |
| **pdf**  | Создать PDF           | "Сгенерируй меню в PDF"            |
| **pptx** | Создать презентацию   | "Сделай презентацию для клиента"   |
| **xlsx** | Создать таблицу       | "Сделай прайс-лист"                |

#### 🎨 Дизайн

| Skill                       | Когда использовать | Пример запроса                |
| --------------------------- | ------------------ | ----------------------------- |
| **charts**                  | Графики/диаграммы  | "Построй график роста продаж" |
| **frontend-styling-expert** | Сложные CSS задачи | "Сложная анимация для hero"   |
| **ui-ux-design**            | Проектирование UX  | "Спроектируй форму заказа"    |

#### 🔧 Разработка

| Skill             | Когда использовать | Пример запроса                   |
| ----------------- | ------------------ | -------------------------------- |
| **fullstack-dev** | Полноценная фича   | "Сделай страницу с формой и API" |
| **api-dev**       | API endpoint       | "Сделай API для заявок"          |
| **github-api**    | GitHub операции    | "Создай issue для бага"          |

### 🎯 КАК ИСПОЛЬЗОВАТЬ SKILLS?

**НЕ вызываете skills напрямую!** Опишите задачу — система выберет skill.

```
✅ Правильно:
"Мне нужно создать изображение банкетного стола для страницы /events/svadba
в стиле luxury dark с champagne gold акцентами. Найди сначала референсы
через image-search, потом сгенерируй."
→ Система использует image-search + image-generation

✅ Правильно:
"Перед началом работы найди актуальные тренды дизайна кейтеринга 2026"
→ Система использует web-search
```

---

## 📦 ЗАВИСИМОСТИ (Краткий справочник)

Полный список: `DEPENDENCIES.md`

### 🎨 UI Компоненты (ГОТОВЫЕ!)

```tsx
// Темы
import { ThemeProvider } from "@/components/ui/ThemeProvider";

// Анимации при скролле
import { InViewWrapper, scrollAnimations } from "@/components/ui/InViewWrapper";

// Аккордеон (FAQ)
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/Accordion";

// Вкладки
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";

// Модальное окно
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/Dialog";

// Подсказка
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/Tooltip";

// Popover
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/Popover";

// Навигация с dropdown
import { NavigationMenu, NavigationMenuList, ... } from "@/components/ui/NavigationMenu";

// Выпадающий список
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/Select";

// Before/After слайдер
import { CompareSlider } from "@/components/ui/CompareSlider";

// Mobile Drawer
import { MobileDrawer, DrawerTrigger, DrawerContent } from "@/components/ui/MobileDrawer";

// Lightbox
import { ImageLightbox } from "@/components/ui/ImageLightbox";
```

### 🪝 Хуки (usehooks-ts)

```tsx
import {
  useLocalStorage,
  useDebounce,
  useMediaQuery,
  useClickOutside,
  useDarkMode,
  useScroll,
  useWindowSize,
  useCopyToClipboard,
  useBoolean,
  // ... ещё 30+ хуков
} from "usehooks-ts";
```

### 🎭 Анимации

```tsx
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { autoAnimate } from "@formkit/auto-animate";
import { InViewWrapper, scrollAnimations } from "@/components/ui/InViewWrapper";
```

### 📋 Формы

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
```

---

## 🏗️ СТРУКТУРА САЙТА (ПРЕДВАРИТЕЛЬНАЯ!)

> ⚠️ **ЭТА СТРУКТУРА БУДЕТ МЕНЯТЬСЯ!**
>
> Она здесь только для ориентира. Если у вас есть идеи по улучшению — **предлагайте!**

```
/                          ← Главная (landing)
├── /menu                  ← Меню
│   ├── /furshet           ← Фуршет
│   ├── /banquet           ← Банкет
│   ├── /coffee-break      ← Кофе-брейк
│   └── ...
├── /events                ← Мероприятия
│   ├── /svadba            ← Свадьба
│   ├── /korporativ        ← Корпоратив
│   └── ...
├── /contact               ← Контакты
├── /gallery               ← Галерея
├── /reviews               ← Отзывы
├── /pricing               ← Цены
└── /blog                  ← Блог
```

---

## 📄 ШАБЛОН СТРАНИЦЫ

Полный шаблон: `templates/PAGE_TEMPLATE.tsx`

> ⚠️ **Шаблон — это отправная точка!**
>
> После исследования трендов — улучшайте его!

### Минимальные требования:

```tsx
import type { Metadata } from "next";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export const metadata: Metadata = {
  title: "Название | Нилов Кейтеринг",
  description: "Описание 150-300 символов",
};

export default function Page() {
  return (
    <ErrorBoundary>
      <main className="min-h-screen">
        {/* Hero с УНИКАЛЬНЫМ контентом */}
        <section>
          <h1>Уникальный H1</h1>
        </section>

        {/* Контент — ИССЛЕДОВАТЬ ЛУЧШИЕ ПАТТЕРНЫ! */}
        <section>...</section>

        {/* CTA — ОБЯЗАТЕЛЬНО! */}
        <section>
          <a href="/contact">Связаться</a>
        </section>
      </main>
    </ErrorBoundary>
  );
}
```

---

## ⚡ PUSH — АВТОМАТИЧЕСКАЯ ПРОВЕРКА

Перед `git push` автоматически запускается **pre-push хук**:

- ✅ Formatting (Prettier)
- ✅ TypeScript
- ✅ Build
- ✅ YAML
- ✅ package.json

### Команды:

```bash
bun run safe-push       # Проверка + push
bun run fix-only        # Только исправления
bun run pre-deploy:quick # Быстрая проверка
```

---

## 🔍 CHECKLIST ПЕРЕД КОММИТОМ

### Быстрый:

- [ ] `bun run pre-deploy:quick` прошёл
- [ ] Metadata заполнена (title, description)
- [ ] ErrorBoundary обёртка
- [ ] CTA секция есть
- [ ] Адаптивность проверена (mobile 375px)
- [ ] Нет console.log
- [ ] **Исследование трендов выполнено** (если дизайн)

### Conventional Commits:

```
feat:     новая функция
fix:      исправление бага
page:     обновление страницы /url
design:   изменение дизайна (с обоснованием!)
style:    форматирование
refactor: рефакторинг
docs:     документация
chore:    вспомогательное
```

---

## 🚨 ЧАСТЫЕ ОШИБКИ

Подробнее: `ERRORS-CHEATSHEET.md`

### TypeScript error:

```tsx
// ❌ data.items[0].name;
// ✅ data?.items?.[0]?.name ?? "default";
```

### Cyrillic error:

```tsx
// ❌ setMessage(error или 'Ошибка')
// ✅ setMessage(error || 'Ошибка')
```

### White page:

→ Оберните в `<ErrorBoundary>`

---

## 🛠️ КОМАНДЫ

| Команда                             | Когда                    |
| ----------------------------------- | ------------------------ |
| `bun run dev`                       | Разработка               |
| `bun run build`                     | Проверка билда           |
| `bun run lint`                      | ESLint                   |
| `bun run format`                    | Prettier                 |
| `bun run pre-deploy:quick`          | **Перед коммитом**       |
| `bun run safe-push`                 | Безопасный push          |
| `bun run fix-only`                  | Исправить ошибки         |
| `bun run project-health-check:full` | Проверка проекта         |
| `bun run start-work`                | **Перед любой работой!** |

---

## 💡 КЛЮЧЕВЫЕ ПРИНЦИПЫ

```
✅ ИССЛЕДОВАТЬ ПЕРЕД РАБОТОЙ (web_search!)
✅ СРАВНИВАТЬ С ЛУЧШИМИ В МИРЕ
✅ ПРЕДЛАГАТЬ УЛУЧШЕНИЯ
✅ ОБНОВЛЯТЬ ДОКУМЕНТАЦИЮ
✅ ДЕЛАТЬ КАК ЛУЧШИЕ, А НЕ "КАК НАПИСАНО"

❌ НЕ ДЕЛАТЬ "ПО ПАМЯТИ"
❌ НЕ СЛЕПО СЛЕДОВАТЬ УСТАРЕВШИМ ШАБЛОНАМ
❌ НЕ ИГНОРИРОВАТЬ ТРЕНДЫ 2025-2026
❌ НЕ СОЗДАВАТЬ ДУБЛИКАТЫ КОМПОНЕНТОВ
```

---

## 📞 СВЯЗЬ С ВЛАДЕЛЬЦЕМ

Если вы обнаружили что:

- Документация устарела → **Обновите её!**
- Нашли лучшее решение → **Предложите и внедрите!**
- Структура сайта плохая → **Предложите улучшения!**
- Навигация неудобная → **Спроектируйте лучше!**

**Цель:** Сделать сайт лучшим в своём классе, а не "ещё одним кейтерингом".

---

**Версия:** 3.0 (Living Documentation)  
**Последнее обновление:** 14 августа 2026  
**Следующее обновление:** При следующей значимой работе
