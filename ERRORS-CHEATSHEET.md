# 🐛 ERRORS CHEATSHEET - Шпаргалка ошибок и решений

> **Быстрое решение типичных проблем** — не тратьте время на поиск!

---

## 📋 ОГЛАВЛЕНИЕ

1. [TypeScript Errors](#typescript-errors)
2. [Build Errors](#build-errors)
3. [Runtime Errors](#runtime-errors)
4. [Styling Errors](#styling-errors)
5. [Git/Deploy Errors](#gitdeploy-errors)
6. [Performance Issues](#performance-issues)

---

## 🔴 TYPESCRIPT ERRORS

### TS2322: Type 'X' is not assignable to type 'Y'

```tsx
// ❌ Проблема
const [count, setCount] = useState<string>(0);
// Type 'number' is not assignable to type 'string'

// ✅ Решение: правильный тип
const [count, setCount] = useState<number>(0);
```

```tsx
// ❌ Проблема с event
handleChange(e) {
  setValue(e.target.value)  // e - unknown type
}

// ✅ Решение: типизировать event
handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  setValue(e.target.value)
}
```

### TS2532: Object is possibly 'undefined'

```tsx
// ❌ Проблема
const name = user.name.toLowerCase(); // user may be undefined

// ✅ Решение 1: optional chaining
const name = user?.name?.toLowerCase();

// ✅ Решение 2: проверка
if (user) {
  const name = user.name.toLowerCase();
}

// ✅ Решение 3: non-null assertion (если уверены)
const name = user!.name.toLowerCase();
```

### TS7053: Element implicitly has an 'any' type

```tsx
// ❌ Проблема
const obj = { a: 1, b: 2 };
const value = obj[key]; // key is any

// ✅ Решение 1: keyof
function getValue<T extends object>(obj: T, key: keyof T) {
  return obj[key];
}

// ✅ Решение 2: Record
const obj: Record<string, number> = { a: 1, b: 2 };
```

### TS1005: ',' expected / Unexpected token

```tsx
// ❌ Проблема: стрелочная функция в объекте
const obj = {
  fn: () => ({ ... }),  // Забыли вернуть объект
};

// ✅ Решение: скобки
const obj = {
  fn: () => ({ ... }),  // Возврат объекта в одной строке
};
```

### TS2698: Spread types may only be created from object types

```tsx
// ❌ Проблема: spread неизвестного типа
const result = { ...unknownVar };

// ✅ Решение: типизация или проверка
if (typeof unknownVar === "object" && unknownVar !== null) {
  const result = { ...unknownVar };
}
```

---

## 🟠 BUILD ERRORS

### Build failed: Module not found

```
Module not found: Can't resolve '@/components/X'
```

**Решения:**

```bash
# 1. Проверьте путь к файлу
ls src/components/

# 2. Проверьте tsconfig.json paths
# Должно быть:
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}

# 3. Проверьте расширение файла
# Используйте .tsx для компонентов с JSX
```

### Build failed: ESM / CommonJS conflict

```
TypeError: Cannot use import statement outside a module
```

**Решения:**

```json
// package.json - добавьте "type": "module"
{
  "type": "module"
  // ...
}
```

```mjs
// Или переименуйте файл в .mjs
scripts/check.mjs → работает как ESM
```

### Build failed: SVG import error

```
Unexpected token (SVG file)
```

**Решения:**

```tsx
// ❌ Не работает
import icon from "./icon.svg";

// ✅ Способ 1: используйте next/image
import Image from "next/image";
<Image src="/icon.svg" alt="icon" width={24} height={24} />;

// ✅ Способ 2: используйте @svgr/webpack (если настроен)
import { ReactComponent as Icon } from "./icon.svg?react";

// ✅ Способ 3: inline SVG
const Icon = () => <svg>...</svg>;
```

### Build failed: CSS Modules / Tailwind error

```
@apply cannot be used with .class {}
```

**Решения:**

```css
/* ❌ Не работает */
.my-class {
  @apply .other-class;
}

/* ✅ Правильно */
.my-class {
  @apply bg-white p-4;
}
```

---

## 🟡 RUNTIME ERRORS

### Hydration mismatch

```
Warning: Text content did not match.
Server: "..." Client: "..."
```

**Причины и решения:**

```tsx
// ❌ Проблема 1: Date/Time
<p>{new Date().toLocaleString()}</p>
// Разное время на сервере и клиенте

// ✅ Решение: рендерить только на клиенте
{typeof window !== 'undefined' && <p>{new Date().toLocaleString()}</p>}
// или
'use client'; // в начале компонента

// ❌ Проблема 2: window/document
<div style={{ height: window.innerHeight }}>
// window не существует на сервере

// ✅ Решение: useEffect
const [height, setHeight] = useState(0);
useEffect(() => {
  setHeight(window.innerHeight);
}, []);
<div style={{ height }}>

// ❌ Проблема 3: случайные значения
<p>{Math.random()}</p>

// ✅ Решение: использовать только детерминированные данные
```

### Cannot read property of undefined (reading 'X')

```tsx
// ❌ Проблема
user.address.street; // address может быть undefined

// ✅ Решение 1: optional chaining
user?.address?.street;

// ✅ Решение 2: default values
const street = user?.address?.street || "Адрес не указан";

// ✅ Решение 3: деструктуризация с default
const { address: { street = "N/A" } = {} } = user;
```

### Too many re-renders / Infinite loop

```tsx
// ❌ Проблема 1: setState в render
function Component() {
  const [state, setState] = useState(0);
  return <button onClick={setState(state + 1)}>{state}</button>;
  // Если onClick отсутствует или вызывается напрямую!

  // ❌ Проблема 2: useEffect без зависимостей
  useEffect(() => {
    setData(fetchData()); // Вызывается каждый рендер!
  }); // Missing dependency array

  // ✅ Решение:
  useEffect(() => {
    setData(fetchData());
  }, []); // Пустой массив = один раз при монтировании
}
```

### Next.js Navigation Error

```
Error: No router instance found
```

**Решения:**

```tsx
// ❌ Неправильный импорт
import { useRouter } from "next/router"; // Pages Router

// ✅ Для App Router (Next.js 13+)
import { useRouter } from "next/navigation";

// ✅ Для client components
("use client");
import { useRouter } from "next/navigation";
const router = useRouter();
router.push("/page");
```

---

## 🟢 STYLING ERRORS

### Tailwind class not working

```tsx
// ❌ Класс не применяется
<div className="custom-color">  // Не стандартный класс

// ✅ Решение 1: использовать произвольные значения
<div className="text-[#d4a574]">

// ✅ Решение 2: добавить в tailwind.config
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      'brand-gold': '#d4a574',
    }
  }
}
// Теперь можно:
<div className="text-brand-gold">
```

### Z-index not working

```tsx
// ❌ z-index не работает
<div className="z-10">  // Над элементом z-50

// ✅ Решение: создайте stacking context
<div className="relative z-10">  // Добавьте position

// ✅ Или используйте более высокое значение
<div className="z-[100]">  // Произвольное значение
```

### Overflow hidden cutting content

```tsx
// ❌ Контент обрезается
<div className="overflow-hidden">
  <div className="transform -translate-y-10">Обрезано!</div>
</div>

// ✅ Решение 1: уберите overflow
<div className="overflow-visible">

// ✅ Решение 2: добавьте padding
<div className="overflow-hidden pt-10">

// ✅ Решение 3: используйте clip-path вместо overflow
<div className="clip-path-inset-0">
```

---

## 🔵 GIT/DEPLOY ERRORS

### Push rejected (pre-push hook)

```
❌ PUSH BLOCKED - X error(s) found
```

**Что делать:**

```bash
# 1. Посмотрите детали ошибки
bun run fix-only

# 2. Автоисправление formatting
npm run format

# 3. Проверка TypeScript
npx tsc --noEmit

# 4. Проверка build
bun run build

# 5. Закоммитьте исправления
git add -A
git commit -m "chore: fix pre-push errors"

# 6. Попробуйте снова
git push
```

### Force push needed (не рекомендуется!)

```bash
# ⚠️ Только если точно знаете что делаете!
git push --force-with-lease  # Безопаснее чем --force
```

### Vercel deployment failed

```
Error: Build failed
```

**Проверки:**

```bash
# 1. Локально проходит билд?
bun run build

# 2. Нет ли переменных окружения?
# Vercel Dashboard → Settings → Environment Variables

# 3. Совпадает ли версия Node.js?
# Убедитесь что local и remote версии совпадают

# 4. Проверьте логи деплоя
# Vercel Deployments → Ваш деплой → Logs
```

---

## ⚡ PERFORMANCE ISSUES

### Large bundle size

```tsx
// ❌ Тяжёлый импорт
import _ from "lodash"; // ~70KB!

// ✅ Решение 1: tree-shakeable imports
import debounce from "lodash/debounce"; // Только нужная функция

// ✅ Решение 2: нативная реализация
const debounce = (fn, delay) => {
  /* ... */
};

// ✅ Решение 3: dynamic import
const HeavyChart = dynamic(() => import("./HeavyChart"), { ssr: false });
```

### Slow initial load

```tsx
// ❌ Загружаем всё сразу
import { Gallery, ContactForm, Map, Reviews } from "./components";

// ✅ Решение: code splitting
import dynamic from "next/dynamic";

const Gallery = dynamic(() => import("./Gallery"), {
  loading: () => <GallerySkeleton />,
  ssr: false,
});
```

### Images loading slow

```tsx
// ❌ Обычный img tag
<img src="/photo.jpg" alt="photo" />;

// ✅ Используйте next/image (оптимизация!)
import Image from "next/image";
<Image
  src="/photo.jpg"
  alt="Описание фото"
  width={800}
  height={600}
  priority // Для hero изображений
  placeholder="blur" // Эффект размытия при загрузке
/>;
```

---

## 🚀 БЫСТРЫЕ КОМАНДЫ ИСПРАВЛЕНИЯ

```bash
# === TypeScript ===
npx tsc --noEmit                    # Проверить все ошибки
npx tsc --noEmit --pretty           # С красивым выводом

# === Formatting ===
npm run format                      # Исправить всё
npx prettier --check "**/*.{ts,tsx}" # Проверить без исправления

# === Build ===
bun run build                       # Полная сборка
bun run build 2>&1 | grep error     # Показать только ошибки

# === Git ===
git status                          # Что изменилось
git diff                            # Конкретные изменения
git log --oneline -10               # Последние коммиты

# === Полная диагностика ===
bun run pre-deploy:quick            # Быстрая проверка перед пушем
bun run safe-push                   # Проверка + пуш вместе
```

---

## 📞 ЕСЛИ НИЧЕГО НЕ ПОМОГАЕТ

```bash
# 1. Очистите кэш
rm -rf .next node_modules/.cache
bun install

# 2. Пересоберите
bun run build

# 3. Если ошибка остаётся - создайте issue
# GitHub Issues → New Issue
# Приложите:
#   - Скриншот ошибки
#   - Команда которая вызвала ошибку
#   - Версии: node -v && bun -v
```
