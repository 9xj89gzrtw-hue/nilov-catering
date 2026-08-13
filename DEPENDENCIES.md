# 📦 Справочник зависимостей для агентов

## ✅ Установленные пакеты (итого: 75+)

### 🎨 UI Компоненты (Radix UI) — ВСЕ ГОТОВЫ К ИСПОЛЬЗОВАНИЮ

Все компоненты уже обёрнуты в `components/ui/` — просто импортируйте:

```tsx
// Темы (тёмная/светлая)
import { ThemeProvider } from "@/components/ui/ThemeProvider";

// Анимации при скролле
import { InViewWrapper, scrollAnimations } from "@/components/ui/InViewWrapper";
// Готовые пресеты: scrollAnimations.fadeUp, fadeIn, scaleIn, fadeLeft, fadeRight

// Аккордеон (для FAQ)
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/Accordion";

// Вкладки
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";

// Модальное окно
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/Dialog";

// Подсказка
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/Tooltip";

// Popover панель
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/Popover";

// Сворачиваемый контент
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/Collapsible";

// Навигация с dropdown
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/NavigationMenu";

// Выпадающий список
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/Select";

// Before/After слайдер (для фото мероприятий)
import { CompareSlider } from "@/components/ui/CompareSlider";
```

### 🔧 Утилиты

```tsx
// Умное слияние Tailwind классов
import { cn } from "@/lib/utils";
cn("px-4", isActive && "bg-primary", className);

// Schema.org для SEO
import { generateOrganizationSchema, generateEventSchema, generateFAQSchema } from "@/lib/schema";
```

### 🪝 Готовые хуки (usehooks-ts)

```tsx
import {
  useLocalStorage, // Хранение в localStorage с типизацией
  useDebounce, // Debounce для поиска
  useMediaQuery, // Media queries (мобильный/десктоп)
  useClickOutside, // Закрытие при клике вне элемента
  useDarkMode, // Переключение тёмной темы
  useLocalStorage, // Типизированное localStorage
  useScroll, // Позиция скролла
  useWindowSize, // Размер окна
  useCopyToClipboard, // Копирование в буфер
  useBoolean, // Boolean state with helpers
  useToggle, // Toggle state
  useCounter, // Counter state
  useInterval, // Interval hook
  useTimeout, // Timeout hook
  useMap, // Map state
  useSet, // Set state
  useArray, // Array operations
  // ... и ещё 30+ хуков
} from "usehooks-ts";
```

### 🎭 Анимации

```tsx
// Framer Motion (уже установлен)
import { motion, AnimatePresence } from "framer-motion";

// GSAP для сложных анимаций
import gsap from "gsap";

// Auto-animate (простые анимации)
import { autoAnimate } from "@formkit/auto-animate";

// Reveal-анимации при скролле
import { InViewWrapper, scrollAnimations } from "@/components/ui/InViewWrapper";

// Использование:
<InViewWrapper
  className="transition-all duration-700"
  inViewClassName={scrollAnimations.fadeUp.inView}
  outOfViewClassName={scrollAnimations.fadeUp.outOfView}
>
  <h2>Появляется при скролле</h2>
</InViewWrapper>;
```

### 📱 Навигация и UX

```tsx
// Command Palette (Cmd+K)
import { Command } from "cmdk";

// URL параметры (для фильтров)
import { useMenuFilters, useEventFilters } from "@/lib/query-params";

// Mobile Drawer
import { Drawer, DrawerTrigger, DrawerContent } from "@/components/ui/MobileDrawer";

// Lenis - плавный скролл
import Lenis from "lenis";

// HeadlessUI компоненты (Dialog, Transition, Menu...)
import { Dialog, Transition, Menu } from "@headlessui/react";
```

### 🖼️ Медиа

```tsx
// Галерея/Lightbox
import "yet-another-react-lightbox/styles.css";
import { Lightbox } from "yet-another-react-lightbox";

// Карусель
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

// Before/After слайдер
import { CompareSlider } from "@/components/ui/CompareSlider";

// Lottie анимации
import Lottie from "lottie-react";

// Particles эффекты
import Particles from "@tsparticles/react";
```

### 📋 Формы и Валидация

```tsx
// React Hook Form + Zod
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Телефон
import PhoneInput from "react-phone-input-2";
import { parsePhoneNumber } from "libphonenumber-js";

// Toast уведомления
import { toast } from "sonner";
```

### 📊 Таблицы и Данные

```tsx
// Таблицы (TanStack Table)
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";

// DnD (drag and drop)
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { sortableCoordinates } from "@dnd-kit/sortable";

// Zustand (state management)
import { create } from "zustand";
```

### 🌍 Интернационализация

```tsx
// next-intl (уже настроен)
import { useTranslations } from "next-intl";

// Форматы дат
import { format, differenceInDays } from "date-fns";
```

### ♿ Доступность (A11y)

```tsx
// axe-core для тестирования
import axe from "axe-core";

// Все Radix UI компоненты доступны по умолчанию!
```

### 🧪 Тестирование

```tsx
// Unit тесты (Vitest)
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event"; // Реалистичные действия!

// E2E тесты (Playwright)
import { test, expect } from "@playwright/test";
```

### 📄 Документы и PDF

```tsx
// PDF генерация
import { Document, Page, pdf } from "@react-pdf/renderer";

// Email шаблоны
import { Html, Button } from "@react-email/html";
```

## 🚀 Частые паттерны для кейтеринга

### Hero секция с reveal-эффектом

```tsx
import { InViewWrapper, scrollAnimations } from "@/components/ui/InViewWrapper";

export function HeroSection() {
  return (
    <section>
      <InViewWrapper
        inViewClassName="opacity-100 translate-y-0 transition-all duration-700"
        outOfViewClassName="opacity-0 translate-y-10"
      >
        <h1>Премиальный кейтеринг</h1>
      </InViewWrapper>

      <InViewWrapper
        inViewClassName="opacity-100 translate-y-0 transition-all duration-700 delay-200"
        outOfViewClassName="opacity-0 translate-y-10"
      >
        <p>Описание услуг</p>
      </InViewWrapper>
    </section>
  );
}
```

### FAQ с аккордеоном

```tsx
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/Accordion";

const faqs = [
  { q: "Сколько стоит банкет?", a: "От 3000₽ за человека..." },
  { q: "Выезжаете ли за город?", a: "Да, выезжаем до 100км..." },
];

export function FAQ() {
  return (
    <Accordion type="single" collapsible>
      {faqs.map((faq, i) => (
        <AccordionItem key={i} value={`item-${i}`}>
          <AccordionTrigger>{faq.q}</AccordionTrigger>
          <AccordionContent>{faq.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
```

### Before/After для портфолио

```tsx
import { CompareSlider } from "@/components/ui/CompareSlider";

export function PortfolioComparison() {
  return (
    <CompareSlider
      before="/images/hall-empty.jpg"
      after="/images/hall-decorated.jpg"
      beforeLabel="До оформления"
      afterLabel="После оформления"
      showLabels
    />
  );
}
```

### Модальная форма заявки

```tsx
"use client";
import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/Dialog";

export function ContactModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button>Оставить заявку</button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Заявка на расчёт</DialogTitle>
        <form onSubmit={handleSubmit}>{/* поля формы */}</form>
      </DialogContent>
    </Dialog>
  );
}
```

## ⚠️ Важно: Правила для агентов

1. **Используйте готовые компоненты** из `components/ui/` — не создавайте свои с нуля
2. **Добавляйте InViewWrapper** на все видимые секции для reveal-эффектов
3. **Используйте cn()** для слияния классов вместо template strings
4. **Schema.org данные** добавляйте на каждую страницу через `lib/schema.ts`
5. **Все формы** валидируйте через react-hook-form + zod
6. **Мобильная версия** обязательна — проверяйте на 375px ширине
7. **Альтернативный текст** обязателен для всех изображений
8. **Toast уведомления** используйте sonner (не alert!)

## 📁 Структура компонентов

```
src/components/
├── ui/                    # Готовые UI компоненты (использовать эти!)
│   ├── ThemeProvider.tsx
│   ├── InViewWrapper.tsx
│   ├── Accordion.tsx
│   ├── Tabs.tsx
│   ├── Dialog.tsx
│   ├── Tooltip.tsx
│   ├── Popover.tsx
│   ├── Collapsible.tsx
│   ├── NavigationMenu.tsx
│   ├── Select.tsx
│   ├── CompareSlider.tsx
│   ├── AutoAnimate.tsx
│   ├── ImageLightbox.tsx
│   └── MobileDrawer.tsx
└── ...                    # Другие компоненты проекта

lib/
├── utils.ts               # cn() utility
├── schema.ts              # Schema.org helpers
├── query-params.ts        # URL параметры
└── ...
```
