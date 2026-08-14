# 🔧 TROUBLESHOOTING - Решение проблем

> **Что делать, когда что-то не работает?** Быстрые решения.

---

## 🚨 СИТУАЦИИ И РЕШЕНИЯ

### Ситуация 1: "Билд падает с ошибкой"

```bash
# Шаг 1: Посмотрите полную ошибку
bun run build 2>&1 | tail -50

# Шаг 2: Если TypeScript ошибка
npx tsc --noEmit 2>&1 | head -30

# Шаг 3: Частые причины:
# - Отсутствующий импорт → добавьте import
# - Неправильный тип → проверьте интерфейс
# - Missing file → создайте или удалите ссылку

# Шаг 4: Очистка кэша
rm -rf .next
bun run build
```

### Ситуация 2: "Pre-push блокирует push"

```bash
# Посмотрите детали ошибки:
bun run fix-only

# Автоисправьте formatting:
npm run build

# Проверьте TypeScript:
npx tsc --noEmit

# Закоммитьте исправления:
git add -A
git commit -m "chore: fix pre-push errors"

# Попробуйте снова:
git push
```

### Ситуация 3: "Изменения не видны на сайте"

```bash
# 1. Проверьте, запушены ли изменения
git status
git log --oneline -3

# 2. Проверьте статус деплоя на Vercel
# Vercel Dashboard → Your Project → Deployments

# 3. Очистите браузерный кэш
# Ctrl+Shift+R (или Cmd+Shift+R на Mac)

# 4. Проверьте правильную ветку
git branch -a
# Должно быть: main (или production)
```

### Ситуация 4: "Страница белая/пустая"

```tsx
// Причины и решения:

// 1. Ошибка в компоненте — добавьте ErrorBoundary
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function Page() {
  return (
    <ErrorBoundary>
      <main>
        {/* Ваш контент */}
      </main>
    </ErrorBoundary>
  );
}

// 2. Забыли 'use client' для интерактивных компонентов
'use client'; // Добавьте в начало файла!

// 3. Async компонент без обработки
// ❌ Плохо:
export default async function Page() {
  const data = await fetch(...); // Может зависнуть

// ✅ Хорошо:
export default function Page() {
  const [data, setData] = useState(null);
  useEffect(() => { fetchData().then(setData); }, []);

  if (!data) return <LoadingSkeleton />;
  return <main>{/* ... */}</main>;
}
```

### Ситуация 5: "Стили не применяются"

```css
/* Проверки: */

/* 1. Tailwind классы правильно написаны? */
/* ❌ text-gray-500 */
/* ✅ text-[#9a938a] */ /* Используйте дизайн-систему! */

/* 2. Файл в директории для сканирования? */
/* tailwind.config.ts content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"] */

/* 3. Не используете scoped CSS в конфликте? */
/* Уберите scoped если есть проблемы */

/* 4. Dev server перезапущен? */
# Ctrl+C затем bun run dev
```

### Ситуация 6: "Изображения не грузятся"

```tsx
// ✅ Правильно (next/image):
import Image from 'next/image';

<Image
  src="/images/photo.jpg"
  alt="Описание"
  width={800}
  height={600}
/>

// ❌ Неправильно (обычный img):
<img src="/images/photo.jpg" /> // Не оптимизировано!

// Если изображения в /public — используйте путь от корня:
// /public/images/photo.jpg → src="/images/photo.jpg"

// Если импорт:
import photo from '@/public/images/photo.jpg';
// → src={photo.src}
```

### Ситуация 7: "Форма не отправляется"

```tsx
// Проверки:

// 1. preventDefault есть?
<form onSubmit={(e) => {
  e.preventDefault(); // Обязательно!
  handleSubmit(data);
}}>

// 2. API route существует?
// app/api/contact/route.ts

// 3. CORS проблемы? (только для external API)
// Для внутренних API routes — не нужно

// 4. Проверьте Network tab в DevTools
// F12 → Network → отправьте форму → посмотрите запрос
```

### Ситуация 8: "Мобильная версия сломана"

```css
/* Проверки: */

/* 1. Viewport meta tag есть? */
// В <head>:
// <meta name="viewport" content="width=device-width, initial-scale=1" />

/* 2. Mobile-first подход? */
/* ❌ Сначала desktop, потом @media mobile */
/* ✅ Сначала base (mobile), потом md:, lg: */

/* 3. Overflow hidden где-нибудь? */
/* Проверьте родительские контейнеры */

/* 4. Touch targets достаточно большие? */
/* Минимум 44x44px для кнопок */
button {
  min-height: 44px;
  min-width: 44px;
}
```

---

## 🛠️ DIAGNOSTIC КОМАНДЫ

### Быстрая диагностика

```bash
# Проверить все сразу:
bun run pre-deploy:quick

# Только билд:
bun run build 2>&1 | grep -E "(error|Error|warning)" | head -20

# TypeScript ошибки:
npx tsc --noEmit 2>&1 | grep "error TS" | head -20

# Найти console.log:
grep -r "console\." app/ components/ --include="*.tsx" --include="*.ts"

# Найти any типы:
grep -r ": any" app/ components/ --include="*.tsx" --include="*.ts"

# Размер сборки:
du -sh .next/

# Неиспользуемые imports:
npx eslint . --ext .ts,.tsx 2>&1 | grep "no-unused"
```

### Browser DevTools

```
F12 → Console:
  - Красные ошибки = критично (fix now!)
  - Желтые предупреждения = исправьте позже

F12 → Network:
  - Failed requests = broken links/API
  - Slow requests > 2s = optimize

F12 → Elements:
  - Check computed styles
  - Check responsive modes (Ctrl+Shift+M)

F12 → Lighthouse:
  - Run audit
  - Fix critical issues first
```

---

## 📞 КОГДА ОБРАТИТЬСЯ ЗА ПОМОЩЬЮ

### Самостоятельно:

1. **Проверьте ERRORS-CHEATSHEET.md** — может быть уже решение
2. **Проверьте CODE-PATTERNS.md** — может паттерн поможет
3. **Поищите в issue tracker** — может кто-то уже решал это

### Создать Issue:

Если ничего не помогло — создайте детальный issue:

```markdown
## 🐛 Описание проблемы

**Что происходит:**
[Опишите проблему 1-2 предложениями]

**Ожидаемое поведение:**
[Что должно происходить]

**Шаги воспроизведения:**

1. Перейти на страницу...
2. Нажать на...
3. Видна ошибка...

**Скриншот:**
[Прикрепите скриншот]

**Окружение:**

- Browser: [Chrome/Safari/Firefox + версия]
- Device: [Desktop/Mobile + размер экрана]
- Node version: `node -v`
- Bun version: `bun -v`

**Логи ошибок:**
[Вставьте console output]
```

---

## 🔄 ВОЗВРАТ К РАБОЧЕМУ СОСТОЯНИЮ

### Откат изменений

```bash
# Посмотреть историю
git log --oneline -10

# Откатить последний коммит (сохраняя изменения)
git reset --soft HEAD~1

# Откатить полностью (потеряете изменения!)
git reset --hard HEAD~1

# Откатить к конкретному коммиту
git reset --hard <commit-hash>

# Отменить push (если уже пушили)
git push --force-with-lease origin main
# ⚠️ Осторожно! Убедитесь что знаете что делаете.
```

### Восстановление после сбоя

```bash
# 1. Очистите всё
rm -rf .next node_modules bun.lockb

# 2. Переустановите
bun install

# 3. Пересоберите
bun run build

# 4. Проверьте
bun run dev
```

---

## 📚 ПОЛЕЗНЫЕ РЕСУРСЫ

| Ресурс        | URL                           |
| ------------- | ----------------------------- |
| Next.js Docs  | https://nextjs.org/docs       |
| Tailwind Docs | https://tailwindcss.com/docs  |
| Radix UI Docs | https://www.radix-ui.com/docs |
| React Docs    | https://react.dev             |
| MDN Web Docs  | https://developer.mozilla.org |
| Can I Use     | https://caniuse.com           |

---

## 💡 ПРОФИЛАКТИКА

Чтобы избежать проблем:

1. **Работайте маленькими коммитами** — легче найти ошибку
2. **Тестируйте часто** — `bun run dev` всегда открыт
3. **Следуйте чеклисту** — REVIEW-CHECKLIST.md
4. **Используйте готовое** — COMPONENTS-CATALOG.md, CODE-PATTERNS.md
5. **Пушите только рабочее** — pre-push хук защитит!

---

_Помните: 15 минут на проверку сэкономят часы на отладку!_ ⏰
