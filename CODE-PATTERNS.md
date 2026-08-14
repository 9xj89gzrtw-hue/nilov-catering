# 📝 CODE PATTERNS — Паттерны кода

> **Как правильно писать код в этом проекте. Копируйте и следуйте этим паттернам!**

---

## 🏗️ СТРУКТУРА ФАЙЛОВ

### Стандартная структура компонента

```tsx
// 1. Импорты (сгруппированы!)
//    React/Next
import type { Metadata } from "next";
import { useState, useEffect } from "react";

// Внутренние компоненты
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { cn } from "@/lib/utils";

// UI компоненты
import { InViewWrapper, scrollAnimations } from "@/components/ui/InViewWrapper";

// Типы
interface ComponentProps {
  // ...
}

// 2. Константы (если есть)
const DEFAULT_VALUE = "...";

// 3. Главный компонент
export default function Component({ ... }: ComponentProps) {
  return (
    <div>
      {/* JSX */}
    </div>
  );
}

// 4. Экспорт вспомогательных компонентов (если есть)
export function SubComponent() {
  // ...
}
```

### Группировка импортов

```tsx
// ✅ Правильно — группы разделены пустой строкой

// React / Next
import type { Metadata } from "next";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

// Внешние библиотеки
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Внутренние UI компоненты
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/Dialog";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";

// Утилиты и хелперы
import { cn } from "@/lib/utils";
import { generateEventSchema } from "@/lib/schema";

// Типы (если много)
import type { User, Event } from "@/types";

// Иконки (lucide-react)
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";

// Стили (CSS modules если используются)
// import styles from "./Component.module.css";
```

---

## 📄 ШАБОНЫ КОМПОНЕНТОВ

### Server Component (по умолчанию)

```tsx
// Используйте Server Components по умолчанию!
// Они быстрее, безопаснее и уменьшают bundle size.

import type { Metadata } from "next";
import Link from "next/link";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export const metadata: Metadata = {
  title: "Страница | Нилов Кейтеринг",
  description: "Описание страницы...",
};

// Можно использовать async!
export default async function Page() {
  // Fetch данные прямо здесь (только на сервере!)
  const data = await fetch("https://api.example.com/data");

  return (
    <ErrorBoundary>
      <main className="min-h-screen">
        <h1>Заголовок</h1>
        <p>{data.text}</p>

        {/* Для интерактивности — отдельный client component */}
        <ContactForm />
      </main>
    </ErrorBoundary>
  );
}
```

### Client Component (когда нужна интерактивность)

```tsx
"use client"; // ОБЯЗАТЕЛЬНО в первой строке!

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

interface ClientComponentProps {
  initialData?: string;
  onSubmit?: (data: FormData) => void;
}

export function ClientComponent({ initialData, onSubmit }: ClientComponentProps) {
  // State
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Hooks
  const router = useRouter();

  // Effects
  useEffect(() => {
    // Что-то при монтировании
  }, []);

  // Handlers (useCallback для оптимизации!)
  const handleClick = useCallback(() => {
    setIsLoading(true);
    // логика...
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      try {
        setIsLoading(true);
        setError(null);

        // API вызов
        const response = await fetch("/api/some-endpoint", {
          method: "POST",
          body: JSON.stringify(/* data */),
        });

        if (!response.ok) {
          throw new Error("Ошибка запроса");
        }

        router.push("/success");
        router.refresh(); // обновить серверные данные
      } catch (err) {
        setError(err instanceof Error ? err.message : "Произошла ошибка");
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  // Render
  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
        {error}
        <button onClick={() => setError(null)} className="ml-2 underline">
          Закрыть
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* поля формы */}

      <button
        type="submit"
        disabled={isLoading}
        className="rounded-full bg-amber-500 px-6 py-3 text-white disabled:bg-amber-300"
      >
        {isLoading ? "Загрузка..." : "Отправить"}
      </button>
    </form>
  );
}
```

---

## 🎣 ФОРМЫ (СТАНДАРТНЫЙ ПАТТЕРН)

### Полная форма с валидацией

```tsx
"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

// === 1. Schema валидации ===
const formSchema = z.object({
  name: z.string().min(2, "Имя слишком короткое").max(50, "Имя слишком длинное"),
  email: z.string().email("Введите корректный email"),
  phone: z.string().regex(/^\+?[\d\s-()]+$/, "Некорректный телефон"),
  message: z.string().max(1000, "Сообщение слишком длинное").optional(),
  agree: z.literal(true, {
    errorMap: () => ({ message: "Необходимо согласие" }),
  }),
});

type FormValues = z.infer<typeof formSchema>;

// === 2. Компонент формы ===
export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  // === 3. Submit handler ===
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Ошибка отправки");
      }

      toast.success("Заявка отправлена! Мы свяжемся с вами.");
      reset();
    } catch (error) {
      toast.error("Произошла ошибка. Попробуйте ещё раз.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // === 4. Render ===
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {/* Поле: Имя */}
      <FormField label="Ваше имя" error={errors.name} required>
        <input
          type="text"
          placeholder="Как к вам обращаться?"
          {...register("name")}
          className={cn(
            "w-full rounded-xl border px-4 py-3 transition-all",
            errors.name
              ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
              : "border-gray-300 focus:border-amber-500 focus:ring-amber-500/20"
          )}
        />
      </FormField>

      {/* Поле: Email */}
      <FormField label="Email" error={errors.email} required>
        <input
          type="email"
          placeholder="your@email.com"
          {...register("email")}
          className={cn(
            "w-full rounded-xl border px-4 py-3 transition-all",
            errors.email
              ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
              : "border-gray-300 focus:border-amber-500 focus:ring-amber-500/20"
          )}
        />
      </FormField>

      {/* Поле: Телефон */}
      <FormField label="Телефон" error={errors.phone}>
        <input
          type="tel"
          placeholder="+7 (___) ___-__-__"
          {...register("phone")}
          className={cn(
            "w-full rounded-xl border px-4 py-3 transition-all",
            errors.phone
              ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
              : "border-gray-300 focus:border-amber-500 focus:ring-amber-500/20"
          )}
        />
      </FormField>

      {/* Поле: Сообщение */}
      <FormField label="Сообщение" error={errors.message}>
        <textarea
          rows={4}
          placeholder="Расскажите подробнее..."
          {...register("message")}
          className={cn(
            "w-full resize-none rounded-xl border px-4 py-3 transition-all",
            errors.message
              ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
              : "border-gray-300 focus:border-amber-500 focus:ring-amber-500/20"
          )}
        />
      </FormField>

      {/* Чекбокс согласия */}
      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          {...register("agree")}
          className="mt-1 h-5 w-5 rounded border-gray-300 text-amber-500 focus:ring-amber-500"
        />
        <span className="text-sm text-gray-600">
          Я согласен с{" "}
          <a href="/privacy" className="text-amber-600 underline">
            политикой конфиденциальности
          </a>
        </span>
      </label>
      {errors.agree && <p className="text-sm text-red-500">{errors.agree.message}</p>}

      {/* Submit кнопка */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          "w-full rounded-xl bg-amber-500 py-4 font-semibold text-white transition-colors",
          "hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50",
          "disabled:cursor-not-allowed disabled:bg-amber-300",
          "flex items-center justify-center gap-2"
        )}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Отправка...
          </>
        ) : (
          <>
            Отправить заявку
            <Send className="h-5 w-5" />
          </>
        )}
      </button>
    </form>
  );
}

// === 5. Вспомогательный компонент поля ===
function FormField({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: { message?: string };
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      {children}
      {error?.message && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
    </div>
  );
}
```

---

## 🔄 DATA FETCHING ПАТТЕРНЫ

### Server Component (рекомендуется)

```tsx
// ✅ Лучший способ — fetch в Server Component
export default async function Page() {
  // Next.js расширяет fetch с кэшированием и revalidation
  const data = await fetch("https://api.example.com/data", {
    // Кэш на 1 час (static generation)
    next: { revalidate: 3600 },

    // Или no-cache для всегда свежих данных:
    // cache: "no-store",
  }).then((res) => res.json());

  return <Component data={data} />;
}
```

### Client Component с SWR/TanStack Query

```tsx
"use client";
import useSWR from "swr";
// или
// import { useQuery } from "@tanstack/react-query";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function DataComponent() {
  // SWR
  const { data, error, isLoading } = useSWR("/api/data", fetcher);

  // TanStack Query
  // const { data, error, isLoading } = useQuery({
  //   queryKey: ["data"],
  //   queryFn: () => fetch("/api/data").then(r => r.json()),
  // });

  if (isLoading) return <Skeleton />;
  if (error) return <ErrorState error={error} />;

  return <Display data={data} />;
}
```

### Route Handler (API)

```tsx
// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Валидация
    const data = contactSchema.parse(body);

    // Обработка...
    // await saveToDatabase(data);
    // await sendEmail(data);

    return NextResponse.json({ success: true, message: "Заявка получена" }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
    }

    return NextResponse.json({ success: false, message: "Внутренняя ошибка" }, { status: 500 });
  }
}
```

---

## 🎨 СТИЛИЗАЦИЯ ПАТТЕРНЫ

### Tailwind классы (ПРЕДПОЧТИТЕЛЬНО!)

```tsx
// ✅ Правильно — Tailwind utility classes
<div className="flex items-center justify-between px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">

// ❌ Неправильно — CSS modules для простых вещей
<div className={styles.container}> // Только для сложной анимации/логики!

// ✅ Правильно — cn() для условных классов
<div className={cn(
  "base-classes",
  isActive && "bg-amber-500",
  isError && "border-red-500",
  props.className, // позволяет переопределение извне
)}>
```

### CSS Modules (когда нужен сложный стиль)

```tsx
// Component.module.css
.container {
  /* Complex animation that can't be done with Tailwind */
  animation: complex-gradient 3s ease-in-out infinite;

  @keyframes complex-gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
}

// Component.tsx
import styles from "./Component.module.css";

export function Component() {
  return <div className={styles.container}>...</div>;
}
```

---

## 🧩 COMPOSITION ПАТТЕРНЫ

### Layout Pattern (обёртка страницы)

```tsx
// components/PageLayout.tsx
import { Header } from "./Header";
import { Footer } from "./Footer";

interface PageLayoutProps {
  children: React.ReactNode;
  hideHeader?: boolean;
  hideFooter?: boolean;
}

export function PageLayout({ children, hideHeader, hideFooter }: PageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {!hideHeader && <Header />}

      <main className="flex-1">{children}</main>

      {!hideFooter && <Footer className="mt-auto" />}
    </div>
  );
}
```

### Container Pattern

```tsx
// components/Container.tsx
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

export function Container({ children, className, size = "lg" }: ContainerProps) {
  const sizes = {
    sm: "max-w-3xl",
    md: "max-w-5xl",
    lg: "max-w-7xl", // стандарт
    xl: "max-w-screen-xl",
    full: "max-w-full",
  };

  return (
    <div className={cn(
      "mx-auto px-4 sm:px-6 lg:px-8",
      sizes[size],
      className
    )}>
      {children}
    </div>
  );
}

// Использование:
<Container>
  <h1>Контент</h1>
</Container>

<Container size="sm">
  <form>Узкая форма</form>
</Container>
```

### Section Pattern

```tsx
// components/Section.tsx
import { Container } from "./Container";
import { InViewWrapper, scrollAnimations } from "@/components/ui/InViewWrapper";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string; // для якорных ссылок
  bg?: "white" | "gray" | "dark"; // варианты фона
  animate?: boolean; // включить reveal анимацию
  padding?: "sm" | "md" | "lg" | "xl"; // отступы
}

export function Section({
  children,
  className,
  id,
  bg = "white",
  animate = true,
  padding = "lg",
}: SectionProps) {
  const backgrounds = {
    white: "bg-white",
    gray: "bg-gray-50",
    dark: "bg-emerald-900 text-white",
  };

  const paddings = {
    sm: "py-12 md:py-16",
    md: "py-16 md:py-20",
    lg: "py-16 md:py-24", // стандарт
    xl: "py-20 md:py-32",
  };

  const content = <Container>{children}</Container>;

  return (
    <section id={id} className={cn(backgrounds[bg], paddings[padding], className)}>
      {animate ? (
        <InViewWrapper
          inViewClassName={scrollAnimations.fadeUp.inView}
          outOfViewClassName={scrollAnimations.fadeUp.outOfView}
        >
          {content}
        </InViewWrapper>
      ) : (
        content
      )}
    </section>
  );
}

// Использование:
<Section id="about" bg="gray">
  <h2>О нас</h2>
  <p>Текст...</p>
</Section>;
```

---

## 📦 ЭКСПОРТЫ И RE-EXPORTS

### Barrel exports (index.ts)

```tsx
// components/ui/index.ts — централизованный экспорт всех UI компонентов
export { ThemeProvider } from "./ThemeProvider";
export { InViewWrapper, scrollAnimations } from "./InViewWrapper";
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./Accordion";
export { Tabs, TabsList, TabsTrigger, TabsContent } from "./Tabs";
export { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogClose } from "./Dialog";
// ... остальные компоненты

// Теперь можно импортировать так:
import { Dialog, Accordion } from "@/components/ui";
```

---

## 🔧 УТИЛИТЫ И HELPERS

### Date formatting

```tsx
import { format, formatDistanceToNow, isValid, parseISO } from "date-fns";
import { ru } from "date-fns/locale";

// Форматирование даты
format(new Date(), "d MMMM yyyy", { locale: ru }); // "15 января 2024"

// Relative time
formatDistanceToNow(new Date(), { addSuffix: true, locale: ru }); // "2 часа назад"

// Парсинг ISO строки
const date = parseISO("2024-01-15T10:00:00Z");
if (isValid(date)) {
  format(date, "dd.MM.yyyy"); // "15.01.2024"
}
```

### String utilities

```tsx
// Транслитерация для slug
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(
      /[а-яё]/g,
      (c) =>
        ({
          а: "a",
          б: "b",
          в: "v",
          г: "g",
          д: "d",
          е: "e",
          ё: "e",
          ж: "zh",
          з: "z",
          и: "i",
          й: "y",
          к: "k",
          л: "l",
          м: "m",
          н: "n",
          о: "o",
          п: "p",
          р: "r",
          с: "s",
          т: "t",
          у: "u",
          ф: "f",
          х: "kh",
          ц: "ts",
          ч: "ch",
          ш: "sh",
          щ: "shch",
          ъ: "",
          ы: "y",
          ь: "",
          э: "e",
          ю: "yu",
          я: "ya",
        })[c] || c
    )
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

slugify("Свадебный банкет"); // "svadebnyy-banket"
```

### Price formatting

```tsx
function formatPrice(price: number): string {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

formatPrice(3500); // "3 500 ₽"
formatPrice(150000); // "150 000 ₽"
```

### Phone formatting

```tsx
function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);

  if (match) {
    return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`;
  }

  return phone;
}

formatPhone("79001234567"); // "+7 (900) 123-45-67"
```

---

## 🚫 ANTI-PATTERNS (чего НЕ делать)

```tsx
// ❌ НЕ делайте так:

// 1. Хардкод значений
const PRICE = 3500; // → вынести в config/env
const API_URL = "https://api.example.com"; // → process.env.NEXT_PUBLIC_API_URL

// 2. Магические числа
<div style={{ marginTop: 42 }}> // → mt-10 или константа

// 3. any тип
const data: any = await fetchData(); // → конкретный тип

// 4. Nested ternaries
const color = isDark ? (isActive ? "white" : "gray") : "black"; // → if/else или object map

// 5. Huge components (>200 строк)
// → Разбейте на подкомпоненты

// 6. Props drilling глубже 2 уровней
// → Используйте Context или state management

// 7. Direct DOM manipulation
// useEffect(() => {
//   document.getElementById("el").style.color = "red";
// }, []); // → React state + className

// 8. Index as key (для изменяемых списков)
{items.map((item, i) => <div key={i}>{item}</div>)} // → item.id

// 9. setState в render
// (вызывает бесконечный ререндер!)

// 10. Forgotten cleanup in effects
// useEffect(() => {
//   window.addEventListener("scroll", handleScroll);
// }, []); // → вернуть функцию очистки
```

---

**Помните:** Чистый код = счастливые агенты! 😊
