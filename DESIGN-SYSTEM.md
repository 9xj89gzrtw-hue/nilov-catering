# 🎨 DESIGN SYSTEM - Дизайн Система Nilov Catering

> **Используйте ТОЛЬКО эти значения!** Не хардкодьте цвета/размеры.

---

## 🎯 БРЕНДОВЫЕ ЦВЕТА

### Основные (используйте всегда!)

| Tailwind класс                    | HEX     | Когда использовать                          |
| --------------------------------- | ------- | ------------------------------------------- |
| `bg-[#d4a574]` / `text-[#d4a574]` | #d4a574 | **Основной золотой** - кнопки, акценты, CTA |
| `bg-[#8b4513]` / `text-[#8b4513]` | #8b4513 | **Коричневый** - заголовки, важный текст    |
| `bg-[#c9a227]` / `text-[#c9a227]` | #c9a227 | **Яркий золотой** - иконки, highlight       |

### Нейтральные

| Класс                             | HEX     | Использование               |
| --------------------------------- | ------- | --------------------------- |
| `bg-white` / `text-white`         | #ffffff | Фон, текст на тёмном        |
| `bg-[#faf9f7]`                    | #faf9f7 | Лёгкий фон секций           |
| `bg-[#f5f0e8]`                    | #f5f0e8 | Кремовый фон (альтернатива) |
| `bg-[#e8e2d9]`                    | #e8e2d9 | Разделители, borders        |
| `text-[#9a938a]`                  | #9a938a | Второстепенный текст        |
| `text-[#4a4540]`                  | #4a4540 | Основной текст (не чёрный!) |
| `bg-[#1a1816]` / `text-[#1a1816]` | #1a1816 | Тёмный фон, footer          |

### Семантические

| Класс                             | HEX     | Использование           |
| --------------------------------- | ------- | ----------------------- |
| `text-[#4a7c59]` / `bg-[#4a7c59]` | #4a7c59 | ✅ Успех, подтверждение |
| `text-[#d4a574]`                  | #d4a574 | ⚠️ Предупреждение       |
| `text-[#c44536]` / `bg-[#c44536]` | #c44536 | ❌ Ошибка               |
| `text-[#5b8cb8]`                  | #5b8cb8 | ℹ️ Информация           |

### Градиенты (для премиального вида)

```tsx
// Золотой градиент (hero, CTA)
className = "bg-gradient-to-r from-[#d4a574] via-[#c9a227] to-[#8b4513]";

// Тёплый градиент (фоны)
className = "bg-gradient-to-b from-[#faf9f7] to-[#f5f0e8]";

// Тёмный градиент (overlay на изображениях)
className = "bg-gradient-to-t from-[#1a1816] to-transparent";

// Люкс градиент (специальные элементы)
className = "bg-gradient-to-r from-[#c9a227] via-[#d4a574] to-white";
```

---

## ✍️ ТИПОГРАФИКА

### Шрифты (УЖЕ ПОДКЛЮЧЕНЫ)

```tsx
// Заголовки (элегантный serif)
fontFamily: ("Cormorant Garamond", Georgia, serif);
className = "font-serif"; // или используйте @fontsource/cormorant

// Основной текст (чистый sans-serif)
fontFamily: (Inter, system - ui, sans - serif);
className = "font-sans";
```

### Размеры (используйте эти!)

| Элемент          | Tailwind                    | Пример                  |
| ---------------- | --------------------------- | ----------------------- |
| Hero заголовок   | `text-5xl md:text-7xl`      | "Премиальный кейтеринг" |
| Заголовок секции | `text-3xl md:text-4xl`      | "Наши услуги"           |
| Подзаголовок     | `text-xl md:text-2xl`       | "Более 15 лет опыта"    |
| Большой текст    | `text-lg leading-relaxed`   | Описания                |
| Основной текст   | `text-base leading-relaxed` | Параграфы               |
| Мелкий текст     | `text-sm`                   | Подписи, легенда        |
| Caption          | `text-xs text-[#9a938a]`    | Метки                   |

### Вес шрифта

| Вес | Tailwind         | Использование          |
| --- | ---------------- | ---------------------- |
| 300 | `font-light`     | Декоративные заголовки |
| 400 | `font-normal`    | Основной текст         |
| 500 | `font-medium`    | Навигация, labels      |
| 600 | `font-semibold`  | Акценты в тексте       |
| 700 | `font-bold`      | Заголовки              |
| 800 | `font-extrabold` | Hero заголовки (редко) |

---

## 📐 ПРОСТРАНСТВО (Spacing)

### Отступы секций

```tsx
// Стандартная секция
<section className="py-16 md:py-24 lg:py-32">
  {/* content */}
</section>

// Компактная секция
<section className="py-12 md:py-16">
  {/* content */}
</section>

// Полноэкранная секция
<section className="min-h-screen flex items-center">
  {/* content */}
</section>
```

### Контейнеры

```tsx
// Стандартный контент
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* content */}
</div>

// Узкий контент (текст)
<div className="max-w-3xl mx-auto px-4 sm:px-6">
  {/* content */}
</div>

// Широкий (hero, галерея)
<div className="w-full">
  {/* content */}
</div>
```

### Grid система

```tsx
// 3 колонки (услуги, преимущества)
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  <Card />
  <Card />
  <Card />
</div>

// 2 колонки (текст + изображение)
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
  <div>Текст</div>
  <div>Изображение</div>
</div>

// 4 колонки (меню, gallery)
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  <Item />
</div>
```

---

## 🔲 БОРДЕРЫ И РАДИУСЫ

### Border Radius

```tsx
// Скругления
rounded-none    // Без скругления
rounded         // 4px - мелкие элементы
rounded-lg      // 8px - карточки, кнопки
rounded-xl      // 12px - большие карточки
rounded-2xl     // 16px - модальные окна
rounded-full    // 50% - аватарки, бейджи
```

### Borders

```tsx
// Тонкие разделители
border-b border-[#e8e2d9]

// Карточки
border border-[#e8e2d9] rounded-xl

// Акцентные рамки
border-2 border-[#d4a574] rounded-xl
```

---

## 🌫️ ТЕНИ (Shadows)

```tsx
// Карточки (лёгкая)
shadow-sm        // Мелкие UI элементы
shadow-md        // Стандартные карточки
shadow-lg        // Elevated карточки
shadow-xl        // Popovers, dropdowns

// Брендовые glow эффекты
// Золотое свечение (для hero элементов)
style={{ boxShadow: '0 0 20px rgba(212,165,116,0.3)' }}

// Мягкое свечение (для hover)
style={{ boxShadow: '0 0 40px rgba(212,165,116,0.15)' }}
className="hover:shadow-[0_0_40px_rgba(212,165,116,0.15)]"
```

---

## 🎬 АНИМАЦИИ

### Длительности

| Тип        | Время | Tailwind       |
| ---------- | ----- | -------------- |
| Мгновенная | 100ms | `duration-100` |
| Быстрая    | 200ms | `duration-200` |
| Нормальная | 300ms | `duration-300` |
| Медленная  | 500ms | `duration-500` |
| Плавная    | 700ms | `duration-700` |

### Easing функции

```tsx
// Стандартные
ease-linear
ease-in-out          // Для большинства анимаций
ease-out             // Для enter-анимаций

// Премиальные (Apple-style)
[0.175, 0.885, 0.32, 1.275]  // Spring (bounce эффект)
[0.23, 1, 0.32, 1]           // Smooth (плавный)
[0.87, 0, 0.13, 1]           // Dramatic (драматичный)

// В Tailwind:
transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]
```

### Готовые transition классы

```tsx
// Стандартный hover
className = "transition-all duration-300 ease-in-out hover:scale-105";

// Плавное появление
className = "transition-opacity duration-500";

// Цветовой переход
className = "transition-colors duration-200";

// Transform переход
className = "transition-transform duration-300 ease-out";
```

---

## 📱 BREAKPOINTS (Responsive)

```tsx
// Tailwind breakpoints (используйте mobile-first!)
sm: '640px'   // Маленькие планшеты
md: '768px'   // Планшеты
lg: '1024px'  // Ноутбуки
xl: '1280px'  // Десктопы
2xl: '1536px' // Большие экраны

// Пример:
<div className="text-center md:text-left">       // Выравнивание
<div className="text-2xl md:text-4xl lg:text-5xl"> // Размеры
<div className="grid-cols-1 md:grid-cols-2">       // Колонки
<div className="hidden md:block">                 // Показать от md
<div className="block md:hidden">                 // Показать до md
```

---

## 🎭 ГОТОВЫЕ ПАТТЕРНЫЕ СЕКЦИЙ

### Hero Section

```tsx
export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#1a1816]">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/catering/finedining-01.avif)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1816]/90 via-[#1a1816]/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <InViewWrapper
          inViewClassName="opacity-100 translate-y-0 transition-all duration-700"
          outOfViewClassName="opacity-0 translate-y-10"
        >
          <h1 className="font-serif text-5xl font-bold leading-tight text-white md:text-7xl lg:text-8xl">
            Премиальный <span className="text-[#d4a574]">кейтеринг</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-300 md:text-xl">
            Организация банкетов, фуршетов и корпоративных мероприятий в Санкт-Петербурге
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button className="rounded-lg bg-gradient-to-r from-[#d4a574] to-[#c9a227] px-8 py-4 font-semibold text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,165,116,0.4)]">
              Рассчитать стоимость
            </button>
            <button className="rounded-lg border-2 border-white/30 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-white/10">
              Смотреть портфолио
            </button>
          </div>
        </InViewWrapper>
      </div>
    </section>
  );
}
```

### Services Section (3 колонки)

```tsx
export function ServicesSection() {
  const services = [
    { icon: "🍽️", title: "Банкетное обслуживание", desc: "Полный цикл организации банкетов" },
    { icon: "🥂", title: "Фуршет", desc: "Выездной фуршет любой сложности" },
    { icon: "🏢", title: "Корпоративы", desc: "Презентации, конференции, тимбилдинги" },
  ];

  return (
    <section className="bg-[#faf9f7] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <InViewWrapper>
          <h2 className="mb-4 text-center font-serif text-4xl text-[#1a1816] md:text-5xl">
            Наши услуги
          </h2>
          <p className="mx-auto mb-16 max-w-2xl text-center text-lg text-[#9a938a]">
            Более 15 лет создаём незабываемые мероприятия
          </p>
        </InViewWrapper>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {services.map((service, i) => (
            <InViewWrapper key={i} delay={i * 100}>
              <div className="group rounded-2xl border border-[#e8e2d9] bg-white p-8 shadow-md transition-all duration-300 hover:border-[#d4a574]/30 hover:shadow-xl">
                <span className="text-4xl">{service.icon}</span>
                <h3 className="mt-4 text-xl font-semibold text-[#1a1816]">{service.title}</h3>
                <p className="mt-2 leading-relaxed text-[#9a938a]">{service.desc}</p>
              </div>
            </InViewWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### CTA Section

```tsx
export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#1a1816] via-[#4a4540] to-[#1a1816] py-24">
      {/* Decorative elements */}
      <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-[#d4a574]/20 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-[#c9a227]/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="mb-6 font-serif text-4xl text-white md:text-5xl">
          Готовы обсудить ваше мероприятие?
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-xl text-gray-300">
          Получите персональное предложение в течение 2 часов
        </p>

        <button className="transform rounded-xl bg-gradient-to-r from-[#d4a574] to-[#c9a227] px-10 py-5 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(212,165,116,0.4)]">
          Оставить заявку
        </button>
      </div>
    </section>
  );
}
```

---

## ❌ ЗАПРЕЩЁНО

| Что                  | Почему                | Вместо этого                    |
| -------------------- | --------------------- | ------------------------------- |
| `color: #fff`        | Хардкод               | `text-white`, `bg-white`        |
| `padding: 20px`      | Произвольное значение | `p-5` или `px-5 py-5`           |
| `margin-top: 50px`   | Magic number          | `mt-12` или `space-y-12`        |
| `font-size: 18px`    | Нет в системе         | `text-lg` или `text-[1.125rem]` |
| Чистый чёрный `#000` | Слишком жёсткий       | `#1a1816` (тёплый чёрный)       |
| Яркие цвета          | Не брендовые          | Только палитра выше             |
| `!important`         | Признак проблемы      | Правильная специфичность        |

---

## ✅ ЧЕКЛИСТ ДИЗАЙНА

Перед завершением работы над страницей проверьте:

- [ ] Все цвета из дизайн-системы (нет хардкода)
- [ ] Шрифты: Cormorant для заголовков, Inter для текста
- [ ] Отступы используют стандартную сетку
- [ ] Mobile-first responsive (проверить на 375px)
- [ ] Hover состояния у интерактивных элементов
- [ ] Loading states для async компонентов
- [ ] Достаточный контраст текста (WCAG AA)
- [ ] Альтернативный текст у всех изображений
- [ ] Focus стили для keyboard навигации
- [ ] Reveal-анимации при скролле (InViewWrapper)
