module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        // Стандартные типы
        "feat", // Новая функция
        "fix", // Исправление бага
        "docs", // Документация
        "style", // Форматирование (не влияет на код)
        "refactor", // Рефакторинг
        "perf", // Производительность
        "test", // Тесты
        "build", // Сборка/деплой
        "ci", // CI конфигурация
        "chore", // Рутина (dependencies, etc.)
        "revert", // Откат изменений

        // Специфичные для проекта
        "page", // Изменение страницы
        "design", // Изменение дизайна
        "content", // Изменение контента
        "seo", // SEO изменения
        "deploy", // Деплой фикс
      ],
    ],
    "subject-max-length": [2, "always", 100],
    "body-max-line-length": [2, "always", 100],
  },
};
