# PROJECT PROTECTION — READ BEFORE ANY GIT OPERATIONS

## CRITICAL RULES (для любой модели работающей с этим репо)

### 1. НИКОГДА не делай `git push --force` в main
- Force push может удалить ВСЕ файлы
- Используй только `git push origin main` (без --force)
- Если push отклонён — pull rebase first, потом push

### 2. НИКОГДА не делай `git reset --hard` без проверки
- Перед reset: `git stash` чтобы сохранить изменения
- После reset: проверь `git ls-tree -r --name-only HEAD | wc -l`
- Если < 100 файлов — STOP, что-то сломалось

### 3. ВСЕГДА проверяй file count перед push
```bash
git ls-tree -r --name-only HEAD | wc -l
# Если < 100 — НЕ ПУШЬ, проверь что произошло
```

### 4. НИКОГДА не клонируй v950-bot scripts/ в nilov-catering
- nilov-catering = проект (origin)
- v950-bot = OS (scripts/)
- НЕ коммить scripts/ в nilov-catering
- Если нужен OS: `git checkout v950/main -- scripts/` (временно, не коммитить)

### 5. ВСЕГДА делай backup перед опасными операциями
```bash
git tag backup-$(date +%Y%m%d-%H%M%S)
git push origin backup-$(date +%Y%m%d-%H%M%S)
```

### 6. Если push protection блокирует
- НЕ пытайся обойти через orphan branches
- НЕ создавай новые репозитории
- Удали файлы с секретами из коммита: `git rm --cached scripts/secrets.json`
- Сделай `git commit --amend` чтобы убрать из истории

### 7. Recovery если файлы удалены
```bash
# Найти последний коммит с файлами:
git log --all --oneline | head -20
# Найти коммит с 1000+ файлов:
for c in $(git log --all --format='%H'); do
    n=$(git ls-tree -r --name-only $c | wc -l)
    echo "$c: $n files"
done | sort -t: -k2 -rn | head -5
# Восстановить:
git reset --hard <commit-with-most-files>
git push --force origin main  # ТОЛЬКО для recovery
```

## GitHub Actions Protection
`.github/workflows/block-force-push.yml` проверяет:
- Если file count < 100 после push → Action fails
- Это НЕ блокирует push, но предупреждает

## Для полной защиты:
1. Включи branch protection в GitHub Settings
2. Require pull request before merge
3. Require status checks (включая block-force-push)
4. Restrict force pushes: OFF
