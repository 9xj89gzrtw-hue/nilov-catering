# 🚨 ERRORS CHEATSHEET — Шпаргалка по ошибкам

> **Быстрые решения частых ошибок. Сначала ищите здесь!**

---

## 🔴 BUILD ОШИБКИ

### Error: "TypeScript error in build"

**Причина:** Ошибка типов, которую TypeScript не пропускает

**Решения:**

```bash
# 1. Посмотрите конкретную ошибку
npx tsc --noEmit

# 2. Частые причины:

# a) Отсутствующая проверка на null/undefined
// ❌ Плохо:
data.items[0].name;

// ✅ Хорошо:
data?.items?.[0]?.name ?? "значение по умолчанию";

# b) Неправильный тип props
// ❌ Плохо:
interface Props {
  count: number; // но приходит string!
}

// ✅ Хорошо:
interface Props {
  count: number | string;
  // или преобразовать:
  // count: Number(props.countString)
}

# c) Missing async/await
// ❌ Плохо:
const data = fetch("/api/data"); // возвращает Promise!

// ✅ Хорошо:
const data = await fetch("/api/data").then(r => r.json());
```

---

### Error: "Cannot find module" / "Module not found"

**Причина:** Неправильный путь импорта или модуль не установлен

**Решения:**

```bash
# 1. Проверьте что пакет установлен
cat package.json | grep "package-name"

# Если нет — установите:
bun add package-name

# 2. Проверьте путь импорта (должен начинаться с @/)
// ✅ Правильно:
import { Component } from "@/components/ui/Component";

// ❌ Неправильно:
import { Component } from "../../components/ui/Component";

# 3. Для tsconfig paths проверьте tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

---

### Error: "Hydration failed" / "Hydration mismatch"

**Причина:** Разница между server и client рендером

**Решения:**

```tsx
// ❌ Причины:

// 1. Использование window/document до гидрации
useEffect(() => {
  // Только тут можно использовать window!
  const width = window.innerWidth;
}, []);

// 2. Случайные значения при рендере
// ❌ Плохо:
<div>{new Date().toString()}</div> // разное на сервере и клиенте!

// ✅ Хорошо:
<div>{new Date().toISOString().split('T')[0]}</div> // одинаковое!

// 3. Browser-specific API
// ❌ Плохо:
const isMobile = window.innerWidth < 768; // Error on server!

// ✅ Хорошо:
const [isMobile, setIsMobile] = useState(false);
useEffect(() => {
  setIsMobile(window.innerWidth < 768);
}, []);
// Или используйте useMediaQuery из usehooks-ts!
```

---

### Error: "Cyrillic characters error" / Unexpected token

**Причина:** Русские символы там, где они не ожидаются

**Решение:**

```tsx
// ❌ Плохо — русское слово "или" похоже на "||"
setMessage(error или 'Ошибка');

// ✅ Хорошо:
setMessage(error || 'Ошибка');

// ❌ Плохо — русские строки в коде (только для UI!)
const status = 'успех';

// ✅ Хорошо — для кода используйте английский:
const status = 'success';
// А для UI (то что видит пользователь) — русский ок:
return <p>Успех!</p>;
```

---

## 🟡 RUNTIME ОШИБКИ

### Error: "White page" / Blank screen

**Причина:** Ошибка рендеринга, не пойманная

**Решения:**

```tsx
// 1. Убедитесь что страница обёрнута в ErrorBoundary
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function Page() {
  return (
    <ErrorBoundary>
      {" "}
      {/* ← ОБЯЗАТЕЛЬНО! */}
      <main>{/* контент */}</main>
    </ErrorBoundary>
  );
}

// 2. Проверьте консоль браузера (F12 → Console)
// Там будет реальная ошибка!

// 3. Частые причины белой страницы:
// - Import ошибки (модуль не найден)
// - Runtime error в render (деление на null и т.д.)
// - Infinite loop в useEffect
// - Missing default export
```

---

### Error: "Render exceeded hooks limit" / Too many re-renders

**Причина:** Бесконечный цикл ререндеров

**Решения:**

```tsx
// ❌ Причины:

// 1. setState прямо в render
function Component() {
  const [count, setCount] = useState(0);

  setCount(count + 1); // ← БЕСКОНЕЧНЫЙ ЦИКЛ!

  return <div>{count}</div>;
}

// ✅ Исправление — вынести в useEffect:
function Component() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(1); // выполнится один раз
  }, []);

  return <div>{count}</div>;
}

// 2. Эффект без зависимостей меняет состояние
useEffect(() => {
  setData(computeHeavy(data)); // data в зависимостях?
}, []); // ← если computeHeavy зависит от data — цикл!
// ✅ Добавить data в зависимости:
useEffect(() => {
  setData(computeHeavy(data));
}, [data]); // теперь нормально

// 3. Callback как prop без memo
// Родитель каждый render создаёт новую функцию → child ререндерится
// ✅ Обернуть callback в useCallback или вынести определение
```

---

### Error: "Cannot read property of undefined/null"

**Причина:** Доступ к свойству несуществующего объекта

**Решения:**

```tsx
// ❌ Плохо:
data.user.address.city;

// ✅ Хорошо — optional chaining:
data?.user?.address?.city ?? "Город не указан";

// ✅ Или с дефолтом:
const city = data?.user?.address?.city || "Москва";

// ✅ Или с проверкой:
if (data?.user?.address) {
  return data.user.address.city;
}
```

---

## 🟠 API ОШИБКИ

### Error: "Failed to fetch" / Network error

**Причина:** Проблема с сетевым запросом

**Решения:**

```tsx
// 1. Проверьте URL (относительный для internal API!)
// ✅ Правильно:
fetch("/api/contact", { method: "POST" });

// ❌ Неправильно:
fetch("http://localhost:3000/api/contact"); // не работает в production!

// 2. Проверьте метод и headers
fetch("/api/data", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data), // не забудьте stringify!
});

// 3. Обрабатывайте ошибки try/catch
try {
  const response = await fetch("/api/data");

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const data = await response.json();
} catch (error) {
  console.error("Fetch error:", error);
  toast.error("Не удалось загрузить данные");
}

// 4. Для external API — проверьте CORS
// External API должен разрешать запросы с вашего домена
```

---

### Error: "422 Unprocessable Entity" / Validation error

**Причина:** Данные не прошли валидацию на сервере

**Решения:**

```tsx
// 1. Проверьте что отправляете правильные данные
const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

// Валидируйте ПЕРЕД отправкой!
const result = schema.safeParse(formData);
if (!result.success) {
  // Показать ошибки пользователю
  return;
}

// 2. Проверьте Content-Type header
headers: {
  "Content-Type": "application/json", // для JSON
  // или
  "Content-Type": "multipart/form-data", // для файлов
}

// 3. Проверьте что body — это строка
body: JSON.stringify(data), // не объект напрямую!
```

---

## 🟢 CSS/СТИЛИ ОШИБКИ

### Error: "Tailwind classes not working"

**Причина:** Классы не применяются

**Решения:**

```bash
# 1. Проверьте что Tailwind настроен
# Должен быть @tailwindcss/postcss в postcss.config.mjs

# 2. Проверьте импорт CSS
// В вашем root layout:
import "@/app/globals.css"; // должен импортироваться!

# 3. Проверьте что классы правильные
// ✅ Правильно:
className="flex items-center justify-center"

// ❌ Неправильно (пробелы внутри):
className="flexitems-center justifycenter"

# 4. Для динамических классов — используйте полный класс!
// ❌ Плохо (Tailwind не видит динамические строки):
className={`padding-${size}`}

// ✅ Хорошо — object map:
const sizes = { sm: "p-2", md: "p-4", lg: "p-6" };
className={sizes[size]}
```

---

### Error: "Z-index issues" / Overlay not showing

**Причина:** Элемент перекрыт другим

**Решения:**

```tsx
// 1. Используйте z-index из шкалы Tailwind
z-0, z-10, z-20, z-30, z-40, z-50, z-auto

// 2. Для modal/dialog — используйте portal (Radix делает это сам!)
<Dialog>
  <DialogContent> {/* автоматически в portal */}>
    ...
  </DialogContent>
</Dialog>

// 3. Для fixed/sticky — проверьте родителя с transform
// transform/creates new stacking context!
// ❌ Плохо:
<div className="relative">
  <div className="transform translate-y-2">
    <div className="fixed"> {/* не будет fixed относительно viewport! */}
  </div>
</div>

// ✅ Вынести fixed за элемент с transform
```

---

## 🔵 DEPENDENCY ОШИБКИ

### Error: "Cannot find package" / Module not found

**Причина:** Пакет не установлен

**Решение:**

```bash
# 1. Установите пакет
bun add package-name

# 2. Если ошибка осталась — удалите node_modules
rm -rf node_modules .next
bun install

# 3. Проверьте package.json что пакет добавился
cat package.json | grep package-name

# 4. Для devDependencies при production build
# Некоторые пакеты нужны только для разработки
# Убедитесь что используете правильно:
// Dev только:
import type { Config } from "tailwindcss"; // типы — OK в production

// Runtime import:
import tailwind from "tailwindcss"; // нужен в dependencies!
```

### Error: "Peer dependency mismatch"

**Причина:** Несовместимые версии зависимостей

**Решение:**

```bash
# 1. Попробуйте установить с --force (временно)
bun add package-name --force

# 2. Или обновите все зависимости
bun update

# 3. Проверьте что версии совместимы
bun audit
```

---

## 📋 DIAGNOSTICS CHECKLIST

Когда ошибка непонятная — пройдите по этому списку:

### 1. Посмотрите консоль браузера

```
F12 → Console → найдите красную ошибку
```

### 2. Проверьте Terminal output

```
Вывод bun run dev / npm run dev
Там часто есть подсказки!
```

### 3. Запустите TypeScript check

```bash
npx tsc --noEmit
```

### 4. Проверьте imports

```
Все ли @/ пути рабочие?
Все ли пакеты установлены?
```

### 5. Проверьте env variables

```
NEXT_PUBLIC_* переменные доступны на клиенте!
Остальные — только на сервере.
```

### 6. Попробуйте clean build

```bash
rm -rf .next
bun run build
```

### 7. Проверьте git diff

```bash
git diff
# Что изменилось? Может проблема в последних изменениях?
```

---

## 🆘 КОГДА НИЧЕГО НЕ ПОМОГАЕТ

Если перепробовали всё:

1. **Спросите AGENTS.md** — может есть специфичные инструкции
2. **Посмотрите CODE-PATTERNS.md** — может нарушен паттерн
3. **Проверьте REVIEW-CHECKLIST.md** — может упущен важный пункт
4. **Создайте минимальный пример** — изолируйте проблему
5. **Поищите в Google** — ошибка + "Next.js" + "solution"

---

**Помните:** 90% ошибок — это опечатки или missing null checks! 🔍
