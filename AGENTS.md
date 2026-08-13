# 🤖 AGENTS.md - Инструкции для AI агентов

> **ВНИМАНИЕ:** Прочитай это ПЕРЕД началом работы. Это сэкономит время и предотвратит ошибки.

---

## 📋 ПРАВИЛА РАБОТЫ С ЭТИМ ПРОЕКТОМ

### 1. ПЕРЕД ЛЮБЫМИ ИЗМЕНЕНИЯМИ

```bash
# 1. Запусти pre-deploy проверку (обязательно!)
npm run pre-deploy:quick

# 2. Если проверка прошла - работай
# 3. После изменений - запусти снова
```

### 2. НИКОГДА НЕ ДЕЛАЙТЕ

- ❌ Не коммитьте без `npm run pre-deploy:quick`
- ❌ Не используйте хардкодные цвета (`#fff` → `bg-white`)
- ❌ Не забывайте metadata на страницах
- ❌ Не игнорируйте подстраницы (они так же важны как главная!)

---

## 🎯 СТРУКТУРА САЙТА (ОБЯЗАТЕЛЬНО ЗНАТЬ)

```
/                          ← Главная (landing)
├── /menu                  ← Меню (корневая)
│   ├── /furshet           ← Фуршет
│   ├── /banquet           ← Банкет
│   ├── /coffee-break      ← Кофе-брейк
│   ├── /catalog           ← Каталог блюд
│   ├── /halal             ← Халяль
│   ├── /vegan             ← Веган
│   ├── /gluten-free       ← Без глютена
│   └── /detskoe           ← Детское
├── /events                ← Мероприятия (корневая)
│   ├── /svadba            ← Свадьба
│   ├── /korporativ        ← Корпоратив
│   ├── /detskoe           ← Детский праздник
│   ├── /yubiley           ← Юбилей
│   ├── /nikah             ← Никах
│   └── ... (другие события)
├── /contact               ← Контакты
├── /gallery               ← Галерея
├── /reviews               ← Отзывы
├── /pricing               ← Цены
├── /plan                  ← Планировщик
│   └── /helper            ← Помощник расчёта
└── /blog                  ← Блог
```

---

## 📄 ШАБЛОН ПОДСТРАНИЦЫ (ИСПОЛЬЗУЙТЕ ВСЕГДА)

Смотри полный шаблон: `templates/PAGE_TEMPLATE.tsx`

### Минимальные требования для страницы:

```tsx
import type { Metadata } from "next";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// 1. Metadata ОБЯЗАТЕЛЬНО
export const metadata: Metadata = {
  title: "Название | Нилов Кейтеринг",
  description: "Описание 150-300 символов",
};

// 2. ErrorBoundary ОБЯЗАТЕЛЬНО
export default function Page() {
  return (
    <ErrorBoundary>
      <main className="min-h-screen">
        {/* Hero */}
        <section>
          <h1>Уникальный H1</h1>
          <p>Описание страницы</p>
        </section>

        {/* Контент */}
        <section>...</section>

        {/* CTA - всегда в конце! */}
        <section className="bg-primary text-primary-foreground">
          <a href="/contact">Связаться с нами</a>
        </section>
      </main>
    </ErrorBoundary>
  );
}
```

---

## 🔍 CHECKLIST ПЕРЕД КОММИТОМ

- [ ] `npm run pre-deploy:quick` прошёл без ошибок
- [ ] Все страницы имеют metadata (title, description)
- [ ] ErrorBoundary обёртка на каждой странице
- [ ] CTA секция в конце страницы
- [ ] Адаптивная вёрстка (проверить mobile)
- [ ] Нет console.log для production
- [ ] Коммит следует conventional commits:
  - `feat: добавил новое...`
  - `fix: исправил баг...`
  - `page: обновил страницу /events/svadba`
  - `design: изменил цвета навигации`
  - `style: форматирование кода`

---

## 🚨 ЧАСТЫЕ ОШИБКИ И КАК ИХ ИЗБЕЖАТЬ

### Ошибка 1: "TypeScript error in build"

**Причина:** Использование `||` вместо `??`, отсутствующие проверки на null
**Решение:** Всегда используйте `?.` и `??` для optional values

```tsx
// Плохо
data.items[0].name;

// Хорошо
data?.items?.[0]?.name ?? "Значение по умолчанию";
```

### Ошибка 2: "Cyrillic characters error"

**Причина:** Русские слова в коде (например, "или" вместо "||")
**Решение:** Только английские ключевые слова в коде!

```tsx
// Плохо
setMessage(error или 'Ошибка')

// Хорошо
 setMessage(error || 'Ошибка')
```

### Ошибка 3: Build успешен, но страница белая

**Причина:** Ошибка рендеринга, не пойманная ErrorBoundary
**Решение:** ВСЕГДА оборачивайте страницы в ErrorBoundary

### Ошибка 4: Навигация не работает на мобильных

**Причина:** Забыли мобильное меню или touch events
**Решение:** Тестируйте на мобильном размере (375px)

---

## 🛠️ ДОСТУПНЫЕ КОМАНДЫ

| Команда                    | Когда использовать        |
| -------------------------- | ------------------------- |
| `npm run dev`              | Разработка                |
| `npm run build`            | Проверка билда            |
| `npm run format`           | Форматирование кода       |
| `npm run pre-deploy:quick` | **ПЕРЕД КАЖДЫМ КОММИТОМ** |
| `npm run pre-deploy`       | Полная проверка (с E2E)   |
| `npm run e2e`              | Тестировать все страницы  |

---

## 🎨 DESIGN SYSTEM (ЦВЕТА И КОМПОНЕНТЫ)

Используйте ТОЛЬКО эти классы:

### Цвета

- `bg-primary`, `text-primary` - Основной цвет бренда
- `bg-background`, `text-background` - Фон/текст фона
- `text-muted-foreground` - Вторичный текст
- `bg-card` - Карточки
- `border-border` - Границы
- `destructive` - Ошибки

### Типографика

- `prose prose-lg dark:prose-invert` - Для текстового контента
- `@tailwindcss/typography` уже установлен

### Компоненты (из @headlessui/react)

- `<Dialog>` - Модальные окна
- `<Disclosure>` - Аккордеоны
- `<Menu>` - Выпадающие меню
- `<NavigationMenu>` - Навигация

---

## 📝 КОГДА ВЫ РАБОТАЕТЕ НАД СТРАНИЦЕЙ

### Если это ГЛАВНАЯ страница (/):

- Проверьте hero section
- Проверьте все CTA кнопки
- Убедитесь что навигация работает

### Если это ПОДСТРАНИЦА:

1. ✅ Скопируйте шаблон из `templates/PAGE_TEMPLATE.tsx`
2. ✅ Заполните metadata
3. ✅ Добавьте контент
4. ✅ Добавьте CTA секцию
5. ✅ Проверьте что ссылки ведут на правильные страницы
6. ✅ Запустите `npm run pre-deploy:quick`

### Если вы меняете НАВИГАЦИЮ:

1. ✅ Проверьте на desktop (1024px+)
2. ✅ Проверьте на tablet (768px)
3. ✅ Проверьте на mobile (375px)
4. ✅ Убедитесь что ВСЕ страницы доступны из меню

---

## ⚡ БЫСТРЫЙ СТАРТ

```bash
# 1. Установите зависимости (если нужно)
npm install

# 2. Запустите dev сервер
npm run dev

# 3. Перед коммитом - ОБЯЗАТЕЛЬНО
npm run pre-deploy:quick

# 4. Коммитьте
git add . && git commit -m "type: описание изменений"
git push
```

---

## 🔗 ПОЛЕЗНЫЕ ССЫЛКИ

- Шаблон страницы: `/templates/PAGE_TEMPLATE.tsx`
- ErrorBoundary: `/components/ErrorBoundary.tsx`
- Pre-deploy скрипт: `/scripts/pre-deploy.mjs`
- E2E тесты: `/e2e/all-pages.spec.ts`

---

**Помните:** Главная страница важна, но подстраницы - это где клиенты принимают решение о заказе!
