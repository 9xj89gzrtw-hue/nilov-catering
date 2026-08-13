# 🍽️ Nilov Catering — Кейтеринг под ключ в Санкт-Петербурге

<p align="center">
  <strong>Премиальный кейтеринг с 2007 года</strong> • Санкт-Петербург<br/>
  <a href="https://odaeda.ru/">🌐 Live Site</a> • 
  <a href="#технологии">🛠 Tech Stack</a> • 
  <a href="#структура-проекта">📁 Structure</a>
</p>

---

## О проекте

Сайт **Nilov Catering** — современная веб-платформа для компании премиального кейтеринга в Санкт-Петербурге. Проект представляет собой полнофункциональный Next.js 16 сайт с:

- 🎨 **Премиальным дизайном** с анимациями и плавным скроллом
- 📱 **Полной адаптивностью** (mobile-first подход)
- ⚡ **Высокой производительностью** (Core Web Vitals оптимизация)
- 🔒 **Безопасностью** enterprise-уровня
- ♿ **Доступностью** (WCAG 2.1 AA)

## ✨ Ключевые возможности

| Модуль              | Описание                                      |
| ------------------- | --------------------------------------------- |
| **Hero Block**      | Параллакс-герой с ценовой лестницей           |
| **Каталог пакетов** | 6 именованных пакетов с фиксированными ценами |
| **Калькулятор**     | Мгновенный расчёт стоимости за 15 секунд      |
| **B2B раздел**      | Корпоративные предложения                     |
| **Меню**            | Превью блюд с фото                            |
| **Галерея**         | Портфолио с фильтрами по типам мероприятий    |
| **Отзывы**          | Карусель отзывов клиентов                     |
| **Шеф-повар**       | История Дмитрия Нилова                        |

## Технологии

### Core Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** [TypeScript 5](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Components:** [shadcn/ui](https://ui.shadcn.com/)

### UI/UX

- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Smooth Scroll:** [Lenis](https://lenis.studiofreight.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Carousel:** [Embla Carousel](https://www.embla-carousel.com/)

### Forms & Validation

- **Forms:** [React Hook Form](https://react-hook-form.com/)
- **Validation:** [Zod](https://zod.dev/)

### Deployment

- **Host:** [Vercel](https://vercel.com/)
- **CI/CD:** GitHub Actions

## 🚀 Быстрый старт

### Требования

```bash
Node.js >= 22
pnpm >= 9 (рекомендуется) или npm/yarn
```

### Установка

```bash
# Клонирование репозитория
git clone https://github.com/9xj89gzrtw-hue/nilov-catering.git
cd nilov-catering

# Установка зависимостей
pnpm install

# Создание .env файла
cp .env.example .env
# Отредактируйте .env своими значениями

# Запуск dev сервера
pnpm dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

### Скрипты

| Команда         | Описание                   |
| --------------- | -------------------------- |
| `pnpm dev`      | Запуск development сервера |
| `pnpm build`    | Production сборка          |
| `pnpm start`    | Запуск production сборки   |
| `pnpm lint`     | Проверка кода ESLint       |
| `pnpm factgate` | Запуск fact-gate проверки  |

## 📁 Структура проекта

```
nilov-catering/
├── app/                    # Next.js App Router страницы
│   ├── page.tsx           # Главная страница
│   └── layout.tsx         # Корневой layout
├── components/             # React компоненты
│   └── blocks/            # Секционные компоненты
├── lib/                    # Утилиты и helpers
├── hooks/                  # Custom React hooks
├── data/                   # Статические данные
├── public/                 # Статические ресурсы
├── scripts/                # Build скрипты
│   └── fact-gate.mjs      # Проверка бренд-инвариантов
└── .github/workflows/     # CI/CD пайплайны
```

## 🔐 Безопасность

Проект следует best practices безопасности:

- ✅ Content Security Policy (CSP) headers
- ✅ X-Frame-Options, X-Content-Type-Options
- ✅ Referrer-Policy, Permissions-Policy
- ✅ Защита от CSRF
- ✅ Нет чувствительных данных в коде
- ✅ Зависимости регулярно обновляются

## 🤝 Вклад в проект

Смотрите [CONTRIBUTING.md](./CONTRIBUTING.md) для информации о том как внести вклад.

## 📄 Лицензия

Этот проект распространяется под лицензией MIT — см. файл [LICENSE](./LICENSE).

---

<p align="center">
  Made with ❤️ для <strong>Nilov Catering</strong><br/>
  © 2007—2026 • Санкт-Петербург
</p>
