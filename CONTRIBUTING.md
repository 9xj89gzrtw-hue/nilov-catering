# 🤝 Contributing to Nilov Catering

Спасибо за интерес к проекту! Мы рады любому вкладу.

## Как внести вклад

### 1. Сообщить о проблеме (Issue)

- Проверьте [существующие issues](../../issues) — возможно проблема уже известна
- Используйте шаблоны для создания issue
- Опишите проблему чётко: шаги воспроизведения, ожидаемое/фактическое поведение
- Приложите скриншоты если это UI-проблема

### 2. Предложить улучшение (Pull Request)

#### Fork & Clone
```bash
git clone https://github.com/YOUR-USERNAME/nilov-catering.git
cd nilov-catering
git checkout -b feature/your-feature-name
```

#### Разработка
```bash
pnpm install
pnpm dev
```

- Следуйте существующему code style (TypeScript strict, ESLint)
- Тестируйте изменения локально
- Проверяйте `pnpm lint` — ошибок быть не должно

#### Commit
Следуйте [Conventional Commits](https://www.conventionalcommits.org/):
- `fix:` — исправление бага
- `feat:` — новая функциональность
- `docs:` — документация
- `style:` — форматирование кода
- `refactor:` — рефакторинг
- `test:` — тесты
- `chore:` - вспомогательные изменения

#### Push & PR
```bash
git push origin feature/your-feature-name
```
Создайте PR с:
- Чётким описанием изменений
- Ссылками на связанные issues
- Скриншотами для UI-изменений

## Стандарты кода

### TypeScript
- Strict mode включён
- Избегайте `any` типа
- Используйте типы для всех функций

### React / Next.js
- Functional components + hooks
- Server Components где возможно
- Proper TypeScript types for props

### CSS / Styling
- Tailwind CSS утилиты
- shadcn/ui компоненты
- Responsive design (mobile-first)

## Fact-Gate (бренд-инварианты)

Проект имеет автоматическую проверку бренд-инвариантов (`fact-gate.mjs`):

| Инвариант | Правило |
|-----------|---------|
| Лексикон | Нет "премиум/люкс/luxury" вне tier-системы |
| Цвета | Только #8A6D3B (не #B08D57) |
| Возраст | "19 лет (с 2007)" или "более 18 лет" |

Запуск проверки: `pnpm factgate`

## Вопросы?

- Создайте [Discussion](../../discussions/new)
- Или откройте Issue с меткой `question`
