# 🔒 Security Policy

## Поддерживаемые версии

| Версия | Поддержка |
|--------|-----------|
| 2.x.x   | ✅ Текущая (bugfix & security) |

## Сообщение об уязвимости

Мы ценим усилия исследователей безопасности по ответственному раскрытию уязвимостей.

**НЕ:**
- Публикуйте публично об уязвимости до её исправления
- Используйте уязвимость для доступа к данным
- Делайте злоупотребления системой

**СДЕЛАЙТЕ:**
- Сообщите конфиденциальly через [GitHub Security Advisories](https://github.com/9xj89gzrtw-hue/nilov-catering/security/advisories/new)
- Включите детали:
  - Тип уязвимости
  - Пути к затронутому коду
  - Шаги воспроизведения
  - Потенциальное воздействие
  - Предложенное исправление (если есть)

## Время ответа

- **В течение 48 часов** — подтверждение получения отчёта
- **В течение 7 дней** — оценка и план исправления
- **В зависимости от критичности** — hotfix или regular release

## Best Practices

Этот проект следует рекомендациям:
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [GitHub Security Best Practices](https://docs.github.com/code-security/getting-started/github-security-best-practices)

### Реализованные меры

- ✅ Content Security Policy (CSP)
- ✅ HTTP Security Headers
- ✅ Input Validation (Zod schemas)
- ✅ No secrets in code
- ✅ Dependencies audit
- ✅ Branch protection rules
