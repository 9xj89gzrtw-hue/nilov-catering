# 📦 COMPONENTS CATALOG - Каталог компонентов

> **Все готовые компоненты** — используйте их, не создавайте свои с нуля!

---

## 🎯 БЫСТРЫЙ ПОИСК

| Нужен компонент      | Импорт           | Для чего                   |
| -------------------- | ---------------- | -------------------------- |
| Тёмная/светлая тема  | `ThemeProvider`  | Переключение темы          |
| Анимация при скролле | `InViewWrapper`  | Reveal-эффекты             |
| Аккордеон            | `Accordion`      | FAQ, сворачиваемый контент |
| Вкладки              | `Tabs`           | Переключение контента      |
| Модальное окно       | `Dialog`         | Формы, галерея             |
| Подсказка            | `Tooltip`        | Hover подсказки            |
| Popover              | `Popover`        | Выпадающие панели          |
| Сворачиваемое        | `Collapsible`    | Скрыть/показать            |
| Навигация            | `NavigationMenu` | Меню с dropdown            |
| Выпадающий список    | `Select`         | Стилизованный select       |
| Before/After         | `CompareSlider`  | Фото до/после              |
| Галерея              | `ImageLightbox`  | Просмотр фото              |
| Mobile drawer        | `MobileDrawer`   | Мобильное меню             |
| Анимации авто        | `AutoAnimate`    | Плавные переходы           |

---

## 🎨 UI КОМПОНЕНТЫ (Radix UI)

### ThemeProvider

```tsx
import { ThemeProvider } from "@/components/ui/ThemeProvider";

// В layout.tsx (оберните всё приложение)
export default function RootLayout({ children }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

// В любом компоненте:
("use client");
import { useTheme } from "next-themes";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
```

### InViewWrapper (Scroll Reveal)

```tsx
import { InViewWrapper, scrollAnimations } from '@/components/ui/InViewWrapper';

// Базовое использование
<InViewWrapper>
  <h2>Появится при скролле</h2>
</InViewWrapper>

// С готовым пресетом
<InViewWrapper
  inViewClassName={scrollAnimations.fadeUp.inView}     // "opacity-100 translate-y-0"
  outOfViewClassName={scrollAnimations.fadeUp.outOfView} // "opacity-0 translate-y-10"
  className="transition-all duration-700"
>
  <h2>Появляется снизу</h2>
</InViewWrapper>

// Доступные пресеты:
// scrollAnimations.fadeUp    - появление снизу
// scrollAnimations.fadeDown  - появление сверху
// scrollAnimations.fadeLeft   - появление слева
// scrollAnimations.fadeRight  - появление справа
// scrollAnimations.fadeIn     - простое появление
// scrollAnimations.scaleIn    - с масштабированием

// С задержкой (для последовательного появления)
<InViewWrapper inViewClassName="opacity-100 translate-y-0 transition-all duration-700 delay-[200ms]">
```

### Accordion (FAQ)

```tsx
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/Accordion";

function FAQ() {
  const faqs = [
    { q: "Сколько стоит банкет?", a: "От 3000₽ за человека..." },
    { q: "Выезжаете ли за город?", a: "Да, выезжаем до 100км от СПб..." },
  ];

  return (
    <Accordion type="single" collapsible className="w-full">
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

### Tabs (Вкладки)

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";

function MenuTabs() {
  return (
    <Tabs defaultValue="banquet">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="banquet">Банкет</TabsTrigger>
        <TabsTrigger value="furshet">Фуршет</TabsTrigger>
        <TabsTrigger value="coffee">Кофе-брейк</TabsTrigger>
      </TabsList>

      <TabsContent value="banquet">
        <p>Информация о банкете...</p>
      </TabsContent>
      <TabsContent value="furshet">
        <p>Информация о фуршете...</p>
      </TabsContent>
      <TabsContent value="coffee">
        <p>Информация о кофе-брейке...</p>
      </TabsContent>
    </Tabs>
  );
}
```

### Dialog (Модальное окно)

```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/Dialog";

function ContactModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="rounded-lg bg-[#d4a574] px-6 py-3 text-white">Оставить заявку</button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogTitle>Заявка на расчёт</DialogTitle>
        <DialogDescription>Заполните форму и мы свяжемся в течение 30 минут</DialogDescription>

        <form onSubmit={handleSubmit}>{/* Поля формы */}</form>
      </DialogContent>
    </Dialog>
  );
}
```

### Tooltip (Подсказка)

```tsx
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/Tooltip";

function InfoButton() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="text-[#9a938a] hover:text-[#d4a574]">ℹ️</button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Дополнительная информация</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
```

### Popover (Выпадающая панель)

```tsx
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/Popover";

function UserMenu() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button>Меню пользователя ▼</button>
      </PopoverTrigger>
      <PopoverContent className="w-56">
        <div className="space-y-2">
          <a href="/profile" className="block rounded p-2 hover:bg-gray-100">
            Профиль
          </a>
          <a href="/orders" className="block rounded p-2 hover:bg-gray-100">
            Заказы
          </a>
          <a href="/logout" className="block rounded p-2 text-red-500 hover:bg-gray-100">
            Выйти
          </a>
        </div>
      </PopoverContent>
    </Popover>
  );
}
```

### NavigationMenu (Навигация с dropdown)

```tsx
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/NavigationMenu";

function MainNav() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Меню</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-64 gap-3 p-4">
              <li>
                <NavigationMenuLink href="/menu/banquet">Банкетное меню</NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="/menu/furshet">Фуршет</NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="/menu/coffee-break">Кофе-брейк</NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="/about">О нас</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
```

### Select (Выпадающий список)

```tsx
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/Select";

function GuestCountSelect() {
  const [value, setValue] = useState("50");

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Количество гостей" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="20">до 20 гостей</SelectItem>
        <SelectItem value="50">20-50 гостей</SelectItem>
        <SelectItem value="100">50-100 гостей</SelectItem>
        <SelectItem value="200">100-200 гостей</SelectItem>
        <SelectItem value="500">200+ гостей</SelectItem>
      </SelectContent>
    </Select>
  );
}
```

### CompareSlider (Before/After)

```tsx
import { CompareSlider } from "@/components/ui/CompareSlider";

function PortfolioComparison() {
  return (
    <div className="mx-auto max-w-4xl">
      <h3 className="mb-8 text-center">Пример оформления зала</h3>

      <CompareSlider
        before="/images/hall-empty.jpg"
        after="/images/hall-decorated.jpg"
        beforeAlt="Зал до оформления"
        afterAlt="Зал после оформления"
        beforeLabel="До"
        afterLabel="После"
        showLabels
        defaultPosition={40}
        className="overflow-hidden rounded-xl shadow-lg"
      />
    </div>
  );
}
```

---

## 🖼️ МЕДИА КОМПОНЕНТЫ

### ImageLightbox (Галерея)

```tsx
import ImageLightbox from "@/components/ui/ImageLightbox";

function PhotoGallery({ images }: { images: string[] }) {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
      {images.map((src, i) => (
        <ImageLightbox
          key={i}
          src={src}
          alt={`Фото мероприятия ${i + 1}`}
          className="cursor-pointer rounded-lg transition hover:opacity-90"
        />
      ))}
    </div>
  );
}
```

### MobileDrawer (Мобильное меню)

```tsx
import MobileDrawer from "@/components/ui/MobileDrawer";

function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className="md:hidden">
        ☰ Меню
      </button>

      <MobileDrawer open={open} onOpenChange={setOpen} direction="bottom">
        <nav className="space-y-4 p-6">
          <a href="/" onClick={() => setOpen(false)}>
            Главная
          </a>
          <a href="/menu" onClick={() => setOpen(false)}>
            Меню
          </a>
          <a href="/events" onClick={() => setOpen(false)}>
            Мероприятия
          </a>
          <a href="/contact" onClick={() => setOpen(false)}>
            Контакты
          </a>
        </nav>
      </MobileDrawer>
    </>
  );
}
```

### AutoAnimate (Плавные переходы)

```tsx
import AutoAnimate from "@/components/ui/AutoAnimate";

function ListWithAnimation({ items }) {
  const parentRef = useRef(null);

  return (
    <ul ref={parentRef}>
      <AutoAnimate parent={parentRef} />
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

---

## 🔧 УТИЛИТЫ

### cn() - слияние классов

```tsx
import { cn } from "@/lib/utils";

// Объединение классов
cn("px-4 py-2", isActive && "bg-primary", className);

// Условные классы
cn("text-base", isLarge && "text-lg", isError && "text-red");

// Merge конфликтующих Tailwind классов
cn("p-4", "p-6"); // => 'p-6' (последний выигрывает)
```

### Schema.org helpers (SEO)

```tsx
import { generateOrganizationSchema, generateEventSchema, generateFAQSchema } from "@/lib/schema";

// В layout.tsx или page.tsx
export const metadata: Metadata = {
  title: "Банкетный кейтеринг | Nilov Catering",
  description: "...",
  other: {
    "script:ld+json": JSON.stringify(generateOrganizationSchema()),
  },
};

// Для страницы события
const eventSchema = generateEventSchema({
  name: "Свадьба",
  startDate: eventDate,
  description: "Организация свадебного банкета...",
});
```

---

## 🪝 ХУКИ (usehooks-ts)

```tsx
import {
  useLocalStorage,
  useDebounce,
  useMediaQuery,
  useDarkMode,
  useBoolean,
  useToggle,
  useScroll,
  useWindowSize,
  useCopyToClipboard,
  useInterval,
  useTimeout,
} from "usehooks-ts";

// Сохранение в localStorage
const [name, setName] = useLocalStorage<string>("userName", "");

// Debounce для поиска
const [search, setSearch] = useState("");
const debouncedSearch = useDebounce(search, 300);

// Media query (адаптив)
const isMobile = useMediaQuery("(max-width: 768px)");
const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1024px)");

// Тёмная тема
const { isDark, toggle } = useDarkMode();

// Boolean state
const { value: isOpen, setTrue: open, setFalse: close, toggle: toggleOpen } = useBoolean(false);

// Позиция скролла
const { x, y, direction } = useScroll();

// Размер окна
const { width, height } = useWindowSize();

// Копирование в буфер
const [copied, copy] = useCopyToClipboard();
copy("Текст для копирования");

// Интервал
useInterval(() => {
  console.log("Tick");
}, 1000);
```

---

## ✅ ЧЕКЛИСТ ИСПОЛЬЗОВАНИЯ

Перед созданием нового компонента:

1. **Проверьте каталог** — может быть такой уже есть?
2. **Используйте готовый** — импортируйте из `@/components/ui/`
3. **Расширяйте** — если нужно, обёртывайте существующий
4. **Следуйте паттернам** — те же пропсы, те же имена

**НЕ создавайте дубликаты!**
