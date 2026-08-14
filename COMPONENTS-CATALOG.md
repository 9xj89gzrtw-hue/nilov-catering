# 📦 КАТАЛОГ КОМПОНЕНТОВ

> **Готовые компоненты для использования. НЕ создавайте свои — используйте эти!**

---

## 🎯 БЫСТРЫЙ ПОИСК

| Нужен компонент       | Используйте      | Импорт                           |
| --------------------- | ---------------- | -------------------------------- |
| Тёмная/светлая тема   | `ThemeProvider`  | `@/components/ui/ThemeProvider`  |
| Анимация при скролле  | `InViewWrapper`  | `@/components/ui/InViewWrapper`  |
| Аккордеон (FAQ)       | `Accordion`      | `@/components/ui/Accordion`      |
| Вкладки               | `Tabs`           | `@/components/ui/Tabs`           |
| Модальное окно        | `Dialog`         | `@/components/ui/Dialog`         |
| Всплывающая подсказка | `Tooltip`        | `@/components/ui/Tooltip`        |
| Popover панель        | `Popover`        | `@/components/ui/Popover`        |
| Сворачиваемый блок    | `Collapsible`    | `@/components/ui/Collapsible`    |
| Навигация с dropdown  | `NavigationMenu` | `@/components/ui/NavigationMenu` |
| Выпадающий список     | `Select`         | `@/components/ui/Select`         |
| Before/After слайдер  | `CompareSlider`  | `@/components/ui/CompareSlider`  |
| Мобильный drawer      | `MobileDrawer`   | `@/components/ui/MobileDrawer`   |
| Lightbox для фото     | `ImageLightbox`  | `@/components/ui/ImageLightbox`  |
| Auto-animate          | `AutoAnimate`    | `@/components/ui/AutoAnimate`    |

---

## 🧩 UI КОМПОНЕНТЫ (Radix UI)

### ThemeProvider

```tsx
// Оборачивает приложение, добавляет тёмную/светлую тему
// УЖЕ настроен в layout.tsx — просто используйте:

"use client";
import { useTheme } from "next-themes";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>Переключить тему</button>
  );
}
```

### InViewWrapper (АНИМАЦИИ ПРИ СКРОЛЛЕ)

**Самый важный компонент! Используйте на ВСЕХ видимых секциях!**

```tsx
import { InViewWrapper, scrollAnimations } from "@/components/ui/InViewWrapper";

// Доступные пресеты анимаций:
scrollAnimations.fadeUp     // Появление снизу ⭐ (самый популярный)
scrollAnimations.fadeIn     // Простое появление
scrollAnimations.scaleIn    // С масштабированием
scrollAnimations.fadeLeft   // Слева направо
scrollAnimations.fadeRight  // Справа налево

// === БАЗОВОЕ ИСПОЛЬЗОВАНИЕ ===
<InViewWrapper
  inViewClassName={scrollAnimations.fadeUp.inView}
  outOfViewClassName={scrollAnimations.fadeUp.outOfView}
>
  <h2>Появляется при скролле</h2>
</InViewWrapper>

// === ПОСЛЕДОВАТЕЛЬНОЕ ПОЯВЛЕНИЕ (с задержкой) ===
<InViewWrapper
  inViewClassName="opacity-100 translate-y-0 transition-all duration-700"
  outOfViewClassName="opacity-0 translate-y-10 transition-all duration-700"
>
  <h2>Появляется первым</h2>
</InViewWrapper>

<InViewWrapper
  inViewClassName="opacity-100 translate-y-0 transition-all duration-700 delay-100"
  outOfViewClassName="opacity-0 translate-y-10 transition-all duration-700"
>
  <p>Появляется вторым</p>
</InViewWrapper>

<InViewWrapper
  inViewClassName="opacity-100 translate-y-0 transition-all duration-700 delay-200"
  outOfViewClassName="opacity-0 translate-y-10 transition-all duration-700"
>
  <button>Появляется третьим</button>
</InViewWrapper>
```

### Accordion (АККОРДЕОН / FAQ)

```tsx
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/Accordion";

// Один открытый за раз
<Accordion type="single" collapsible className="space-y-4">
  <AccordionItem value="item-1" className="bg-gray-50 rounded-lg px-6">
    <AccordionTrigger className="text-left">
      Вопрос 1?
    </AccordionTrigger>
    <AccordionContent>
      Ответ на вопрос 1...
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-2" className="bg-gray-50 rounded-lg px-6">
    <AccordionTrigger className="text-left">
      Вопрос 2?
    </AccordionTrigger>
    <AccordionContent>
      Ответ на вопрос 2...
    </AccordionContent>
  </AccordionItem>
</Accordion>

// Несколько открытых одновременно
<Accordion type="multiple">
  {/* ... */}
</Accordion>
```

### Tabs (ВКЛАДКИ)

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";

<Tabs defaultValue="tab1" className="w-full">
  <TabsList className="grid w-full grid-cols-3">
    <TabsTrigger value="tab1">Вкладка 1</TabsTrigger>
    <TabsTrigger value="tab2">Вкладка 2</TabsTrigger>
    <TabsTrigger value="tab3">Вкладка 3</TabsTrigger>
  </TabsList>

  <TabsContent value="tab1">Контент вкладки 1</TabsContent>
  <TabsContent value="tab2">Контент вкладки 2</TabsContent>
  <TabsContent value="tab3">Контент вкладки 3</TabsContent>
</Tabs>;
```

### Dialog (МОДАЛЬНОЕ ОКНО)

```tsx
"use client";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/Dialog";

export function ModalExample() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button>Открыть модалку</button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>Заголовок модалки</DialogTitle>
        <DialogDescription>Описание (скринридер)</DialogDescription>

        {/* Контент модалки */}
        <form onSubmit={handleSubmit}>
          {/* поля формы */}
          <button type="submit">Отправить</button>
        </form>

        <DialogClose asChild>
          <button>Закрыть</button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
```

### Tooltip (ВСПЛЫВАЮЩАЯ ПОДСКАЗКА)

```tsx
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/Tooltip";

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <button>Наведи на меня</button>
    </TooltipTrigger>
    <TooltipContent side="top">
      <p>Подсказка появляется здесь</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>;

// Позиции: "top" | "bottom" | "left" | "right"
```

### Popover (ВСПЛЫВАЮЩАЯ ПАНЕЛЬ)

```tsx
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/Popover";

<Popover>
  <PopoverTrigger asChild>
    <button>Открыть popover</button>
  </PopoverTrigger>
  <PopoverContent side="bottom" align="start" className="w-80">
    <div className="space-y-2">
      <h4 className="font-medium">Заголовок</h4>
      <p className="text-sm text-muted-foreground">Контент панели</p>
    </div>
  </PopoverContent>
</Popover>;
```

### NavigationMenu (НАВИГАЦИЯ С DROPDOWN)

```tsx
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/NavigationMenu";

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Меню</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-80 gap-3 p-4">
          <li>
            <NavigationMenuLink href="/menu/furshet">Фуршет</NavigationMenuLink>
          </li>
          <li>
            <NavigationMenuLink href="/menu/banquet">Банкет</NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>

    <NavigationMenuItem>
      <NavigationMenuLink href="/contact">Контакты</NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>;
```

### Select (ВЫПАДАЮЩИЙ СПИСОК)

```tsx
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/Select";

<Select value={value} onValueChange={setValue}>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="Выберите..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Вариант 1</SelectItem>
    <SelectItem value="option2">Вариант 2</SelectItem>
    <SelectItem value="option3">Вариант 3</SelectItem>
  </SelectContent>
</Select>;
```

### CompareSlider (BEFORE/AFTER СЛАЙДЕР)

```tsx
import { CompareSlider } from "@/components/ui/CompareSlider";

// Для портфолио — показать трансформацию зала
<CompareSlider
  before="/images/before.jpg"
  after="/images/after.jpg"
  beforeLabel="До оформления"
  afterLabel="После оформления"
  showLabels
  className="rounded-xl overflow-hidden"
/>

// Вертикальный режим
<CompareSlider
  before="/images/before.jpg"
  after="/images/after.jpg"
  isVertical
/>
```

### Collapsible (СВОРАЧИВАЕМЫЙ БЛОК)

```tsx
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/Collapsible";

<Collapsible open={open} onOpenChange={setOpen}>
  <CollapsibleTrigger asChild>
    <button className="flex items-center gap-2">
      {open ? "Свернуть" : "Развернуть"}
      <ChevronDown className={`transition-transform ${open ? "rotate-180" : ""}`} />
    </button>
  </CollapsibleTrigger>
  <CollapsibleContent>
    <div className="mt-4 rounded-lg bg-gray-50 p-4">Скрытый контент...</div>
  </CollapsibleContent>
</Collapsible>;
```

---

## 🖼️ МЕДИА КОМПОНЕНТЫ

### ImageLightbox

```tsx
import { ImageLightbox } from "@/components/ui/ImageLightbox";

// Галерея с lightbox
<ImageLightbox
  images={[
    { src: "/images/photo1.jpg", alt: "Описание 1" },
    { src: "/images/photo2.jpg", alt: "Описание 2" },
    { src: "/images/photo3.jpg", alt: "Описание 3" },
  ]}
/>

// Отдельное изображение с кликом
<ImageLightbox
  images={[{ src: "/images/photo.jpg", alt: "Фото" }]}
/>
```

### MobileDrawer

```tsx
import {
  MobileDrawer,
  DrawerTrigger,
  DrawerContent,
  DrawerTitle,
} from "@/components/ui/MobileDrawer";

// Для мобильного меню
<MobileDrawer>
  <DrawerTrigger asChild>
    <button className="md:hidden">
      <Menu />
    </button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerTitle>Меню</DrawerTitle>
    <nav className="mt-4 space-y-4">
      <a href="/">Главная</a>
      <a href="/menu">Меню</a>
      <a href="/contact">Контакты</a>
    </nav>
  </DrawerContent>
</MobileDrawer>;
```

---

## ✨ АНИМАЦИОННЫЕ КОМПОНЕНТЫ

### AutoAnimate

```tsx
import { AutoAnimate } from "@/components/ui/AutoAnimate";

// Авто-анимация при добавлении/удалении элементов
<AutoAnimate>
  <ul>
    {items.map((item) => (
      <li key={item.id}>{item.name}</li>
    ))}
  </ul>
</AutoAnimate>;
```

---

## 🔧 УТИЛИТЫ

### cn() — слияние классов

```tsx
import { cn } from "@/lib/utils";

// Умное слияние Tailwind классов
cn("px-4 py-2", isActive && "bg-primary", className);

// Пример использования:
<div
  className={cn(
    "base-classes",
    condition && "conditional-class",
    anotherCondition ? "yes" : "no",
    props.className // позволяет переопределить снаружи
  )}
/>;
```

### Schema.org helpers

```tsx
import {
  generateOrganizationSchema,
  generateEventSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
} from "@/lib/schema";

// Организация (для главной)
const orgSchema = generateOrganizationSchema({
  name: "Нилов Кейтеринг",
  url: "https://nilov-catering.ru",
  logo: "https://nilov-catering.ru/images/logo.png",
});

// Мероприятие (для страниц событий)
const eventSchema = generateEventSchema({
  name: "Свадебный банкет",
  description: "...",
  url: "https://nilov-catering.ru/events/svadba",
});

// FAQ (для SEO)
const faqSchema = generateFAQSchema([{ question: "Вопрос?", answer: "Ответ" }]);

// Хлебные крошки
const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Главная", url: "https://nilov-catering.ru/" },
  { name: "Свадьба", url: "https://nilov-catering.ru/events/svadba" },
]);
```

---

## 🪝 ГОТОВЫЕ HOOKS (usehooks-ts)

```tsx
import {
  // === State management ===
  useBoolean, // Boolean state with toggle, setTrue, setFalse
  useToggle, // Toggle state
  useCounter, // Counter with increment, decrement, reset
  useMap, // Map state with get, set, remove
  useSet, // Set state with add, has, remove
  useArray, // Array operations

  // === Side effects ===
  useDebounce, // Debounce value
  useThrottle, // Throttle value
  useInterval, // Set/clear interval
  useTimeout, // Set/clear timeout
  useEffectOnce, // Run effect once

  // === Browser APIs ===
  useLocalStorage, // Persistent state in localStorage
  useSessionStorage, // Persistent state in sessionStorage
  useMediaQuery, // CSS media query listener
  useWindowSize, // Window dimensions
  useScroll, // Scroll position and direction
  useClickOutside, // Detect click outside element
  useDocumentTitle, // Set document title
  useCopyToClipboard, // Copy text to clipboard
  useOS, // Detect OS
  useBrowserInfo, // Browser info

  // === UI State ===
  useDarkMode, // Dark mode detection/toggle
  useFullscreen, // Fullscreen API
  useNetworkState, // Online/offline status
  useBattery, // Battery status
} from "usehooks-ts";

// === ПРИМЕРЫ ===

// Debounce для поиска
const [search, setSearch] = useDebounce("", 500);
// search обновится только через 500ms после последнего ввода

// Media query для responsive
const isMobile = useMediaQuery("(max-width: 768px)");
// true если экран меньше 768px

// LocalStorage с типизацией
const [user, setUser] = useLocalStorage<User>("user", null);
// автоматически сохраняется в localStorage

// Click outside для закрытия меню/dropdown
const ref = useRef(null);
useClickOutside(ref, () => setIsOpen(false));
```

---

## 📋 ЧЕКЛИСТ ИСПОЛЬЗОВАНИЯ КОМПОНЕНТОВ

Перед созданием нового компонента **ОБЯЗАТЕЛЬНО** проверьте:

- [ ] Нет ли похожего в `components/ui/`?
- [ ] Можно ли использовать Radix UI примитив?
- [ ] Подходит ли хук из usehooks-ts?
- [ ] Есть ли паттерн в DESIGN-SYSTEM.md?

**Если ничего не нашлось — тогда создавайте свой компонент!**

---

## 🚫 ЗАПРЕЩЁНО

- ❌ Создавать дубликаты существующих компонентов
- ❌ Использовать inline styles вместо Tailwind классов
- ❌ Хардкодить цвета (используйте токены из DESIGN-SYSTEM.md)
- ❌ Игнорировать accessibility (все Radix компоненты доступны!)
- ❌ Забывать про mobile версию

---

**Помните:** Этот каталог — ваш первый источник компонентов. Используйте его! 🚀
