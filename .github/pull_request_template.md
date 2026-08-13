name: Pull Request Template
description: Шаблон для Pull Request
labels: []
body:
  - type: markdown
    attributes:
      value: "## Thanks for contributing! 🎉"

  - type: textarea
    id: description
    attributes:
      label: Описание изменений
      placeholder: Опишите что изменилось и почему...
    validations:
      required: true

  - type: textarea
    id: changes
    attributes:
      label: Тип изменений
      description: Что этот PR изменяет?
      placeholder: |
        - [ ] Bug fix (небаг исправлен)
        - [ ] New feature (новая функциональность)
        - [ ] Breaking change (breaking changes)
        - [ ] Documentation update
        - [ ] Code refactoring

  - type: input
    id: issue
    attributes:
      label: Связанный Issue
      placeholder: "#123"

  - type: textarea
    id: screenshots
    attributes:
      label: Скриншоты / Демо
      description: Добавьте скриншоты для UI-изменений
      placeholder: Перетащите скриншоты...

  - type: textarea
    id: checklist
    attributes:
      label: Чеклист
      description: Перед созданием PR убедитесь что:
      value: |
        - [ ] Код следует code style проекта
        - [ ] `pnpm lint` проходит без ошибок
        - [ ] Тесты добавлены/обновлены (если применимо)
        - [ ] Документация обновлена
        - [ ] Нет console.log в production коде
        - [ ] Fact-Gate (`pnpm factgate`) проходит
