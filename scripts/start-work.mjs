#!/usr/bin/env node

/**
 * START-WORK.MJS - ОБЯЗАТЕЛЬНЫЙ СКРИПТ НАЧАЛА РАБОТЫ
 * 
 * ⚠️ АГЕНТ ДОЛЖЕН ЗАПУСТИТЬ ЭТОТ СКРИПТ ПЕРЕД ЛЮБОЙ РАБОТОЙ!
 * 
 * Использование:
 *   bun run start-work          # Интерактивный режим
 *   bun run start-work --quick  # Быстрый режим (только проверки)
 */

import { readFileSync, existsSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

const args = process.argv.slice(2);
const isQuick = args.includes('--quick');

// Цвета для вывода
const c = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
};

// ============================================
// КОНФИГУРАЦИЯ - ОБЯЗАТЕЛЬНЫЕ ФАЙЛЫ ДЛЯ ЧТЕНИЯ
// ============================================

const REQUIRED_FILES = [
  {
    path: 'AGENTS.md',
    description: 'Основные инструкции для агентов',
    priority: '🔴 КРИТИЧНО',
    check: (content) => content.length > 1000,
  },
  {
    path: 'DESIGN-SYSTEM.md',
    description: 'Дизайн система (цвета, типографика, спейсинг)',
    priority: '🔴 КРИТИЧНО',
    check: (content) => content.includes('#d4a574'),
  },
  {
    path: 'COMPONENTS-CATALOG.md',
    description: 'Каталог готовых компонентов с примерами',
    priority: '🟡 ВАЖНО',
    check: (content) => content.includes('ThemeProvider'),
  },
  {
    path: 'CODE-PATTERNS.md',
    description: 'Готовые паттерны кода (копируй и используй)',
    priority: '🟡 ВАЖНО',
    check: (content) => content.includes('Page Template'),
  },
  {
    path: 'ERRORS-CHEATSHEET.md',
    description: 'Шпаргалка ошибок и быстрых решений',
    priority: '🟢 ПОЛЕЗНО',
    check: () => true,
  },
  {
    path: 'REVIEW-CHECKLIST.md',
    description: 'Чеклист качества перед пушем',
    priority: '🟢 ПОЛЕЗНО',
    check: () => true,
  },
];

// ============================================
// ФУНКЦИИ
// ============================================

function log(title, msg = '', color = 'cyan') {
  console.log(`${c[color]}${title}${c.reset} ${msg}`);
}

function logBox(title, content, color = 'cyan') {
  const lines = content.split('\n');
  const maxLength = Math.max(title.length, ...lines.map(l => l.length)) + 4;
  
  console.log(`${c[color]}┌${'─'.repeat(maxLength)}┐${c.reset}`);
  console.log(`${c[color]}│${title.padEnd(maxLength)}│${c.reset}`);
  console.log(`${c[color]}├${'─'.repeat(maxLength)}┤${c.reset}`);
  
  for (const line of lines) {
    console.log(`${c[color]}│ ${line.padEnd(maxLength - 2)} │${c.reset}`);
  }
  
  console.log(`${c[color]}└${'─'.repeat(maxLength)}┘${c.reset}`);
}

function prompt(question) {
  // В неинтерактивном режиме возвращаем true
  if (isQuick || !process.stdin.isTTY) return true;
  
  process.stdout.write(`${c.yellow}?${c.reset} ${question} (y/n): `);
  
  return new Promise((resolve) => {
    const stdin = process.openStdin();
    stdin.once('data', (data) => {
      const answer = data.toString().trim().toLowerCase();
      resolve(answer === 'y' || answer === 'yes' || answer === '');
    });
    
    // Timeout после 30 секунд - по умолчанию yes
    setTimeout(() => resolve(true), 30000);
  });
}

function checkFileExists(filePath) {
  const fullPath = join(rootDir, filePath);
  return existsSync(fullPath);
}

function readFileContent(filePath) {
  const fullPath = join(rootDir, filePath);
  try {
    return readFileSync(fullPath, 'utf8');
  } catch {
    return null;
  }
}

// ============================================
// ОСНОВНАЯ ЛОГИКА
// ============================================

async function main() {
  console.log('');
  console.log('═'.repeat(60));
  console.log(`${c.bold}🚀 NILOV CATERING - AGENT WORK INITIALIZER${c.reset}`);
  console.log('═'.repeat(60));
  console.log('');
  
  let allGood = true;
  const confirmedFiles = [];
  
  // ============================================
  // ШАГ 1: ПРОВЕРКА ОБЯЗАТЕЛЬНЫХ ФАЙЛОВ
  // ============================================
  log('ШАГ 1', 'Проверка обязательной документации...', 'bold');
  console.log('');
  
  for (const file of REQUIRED_FILES) {
    const exists = checkFileExists(file.path);
    
    if (!exists) {
      log('❌ MISSING', `${file.path} - ${file.description}`, 'red');
      allGood = false;
    } else {
      const content = readFileContent(file.path);
      const isValid = file.check(content || '');
      
      if (!isValid) {
        log('⚠️  INVALID', `${file.path} - файл повреждён или пустой`, 'yellow');
        allGood = false;
      } else {
        log('✅ FOUND', `[${file.priority}] ${file.path}`, 'green');
        log('', `   ${file.description}`, 'dim');
        
        if (!isQuick) {
          const confirmed = await prompt(`Прочитали "${file.path}"?`);
          if (confirmed) {
            confirmedFiles.push(file.path);
          } else {
            log('⚠️  WARNING', `Вы подтвердили без прочтения: ${file.path}`, 'yellow');
            confirmedFiles.push(file.path + '(unconfirmed)');
          }
        } else {
          confirmedFiles.push(file.path + '(quick-mode)');
        }
      }
    }
    
    console.log('');
  }
  
  if (!allGood && !isQuick) {
    log('❌ ERROR', 'Отсутствуют обязательные файлы! Прервано.', 'red');
    process.exit(1);
  }
  
  // ============================================
  // ШАГ 2: ПРОВЕРКА ТЕКУЩЕГО СОСТОЯНИЯ
  // ============================================
  log('ШАГ 2', 'Проверка состояния проекта...', 'bold');
  console.log('');
  
  // Проверка package.json
  if (checkFileExists('package.json')) {
    try {
      const pkg = JSON.parse(readFileSync('package.json'));
      log('✅ Package', `${pkg.name} v${pkg.version}`, 'green');
      log('   Dependencies:', Object.keys(pkg.dependencies || {}).length.toString(), 'dim');
      log('   DevDependencies:', Object.keys(pkg.devDependencies || {}).length.toString(), 'dim');
    } catch {
      log('❌ Package', 'package.json повреждён!', 'red');
      allGood = false;
    }
  }
  console.log('');
  
  // Проверка компонентов
  const componentsDir = join(rootDir, 'components/ui');
  let componentCount = 0;
  if (existsSync(componentsDir)) {
    const fs = await import('fs');
    const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.tsx'));
    componentCount = files.length;
    log('✅ Components', `${componentCount} UI компонентов готовы к использованию`, 'green');
    
    // Перечислим компоненты
    if (componentCount > 0) {
      log('   Доступно:', files.map(f => f.replace('.tsx', '')).join(', '), 'dim');
    }
  }
  console.log('');
  
  // ============================================
  // ШАГ 3: ИНСТРУКЦИИ ПО РАБОТЕ
  // ============================================
  if (!isQuick) {
    log('ШАГ 3', 'ИНСТРУКЦИИ ДЛЯ РАБОТЫ', 'bold');
    console.log('');
    
    logBox(
      '📋 ОБЯЗАТЕЛЬНЫЙ ПОРЯДОК РАБОТЫ:',
      `
1. ПРОЧТАЙТЕ DESIGN-SYSTEM.md
   → Используйте ТОЛЬКО указанные цвета!

2. ИСПОЛЬЗУЙТЕ COMPONENTS-CATALOG.md
   → Не создавайте компоненты с нуля!

3. КОПИРУЙТЕ ИЗ CODE-PATTERNS.md
   → Готовые решения для типичных задач

4. ПРИ ОШИБКЕ → ERRORS-CHEATSHEET.md
   → Быстрые решения без поиска!

5. ПЕРЕД ПУШЕМ → REVIEW-CHECKLIST.md
   → Проверьте всё по списку!

6. ЗАПУСКАЙТЕ: bun run safe-push
   → Автоматическая проверка!`,
      'cyan'
    );
    
    console.log('');
    
    logBox(
      '🚨 ЗАПРЕЩЕНО:',
      `
• Хардкодить цвета (#fff → bg-white)
• Создавать дубликаты компонентов
• Игнорировать mobile версию
• Коммитить без bun run build
• Пушить без pre-push проверки`,
      'red'
    );
    
    console.log('');
    
    const ready = await prompt('Готовы работать по этим правилам?');
    if (!ready) {
      log('❌ CANCELLED', 'Работа отменена.', 'red');
      process.exit(1);
    }
  }
  
  // ============================================
  // ШАГ 4: СОЗДАНИЕ МАРКЕРА РАБОТЫ
  // ============================================
  const workMarker = {
    startTime: new Date().toISOString(),
    confirmedFiles,
    mode: isQuick ? 'quick' : 'full',
    agent: process.env.AGENT_NAME || 'unknown',
  };
  
  const markerPath = join(rootDir, '.work-session.json');
  writeFileSync(markerPath, JSON.stringify(workMarker, null, 2));
  
  // ============================================
  // ФИНАЛЬНЫЙ ОТЧЁТ
  // ============================================
  console.log('');
  console.log('═'.repeat(60));
  console.log(`${c.green}✅ ИНИЦИАЛИЗАЦИЯ ЗАВЕРШЕНА${c.reset}`);
  console.log('═'.repeat(60));
  console.log('');
  
  log('Статус:', 'Готов к работе!', 'green');
  log('Маркер:', '.work-session.json создан', 'dim');
  log('', '');
  log('Следующий шаг:', '', 'bold');
  log('  1. Работайте над задачей', '', 'dim');
  log('  2. Проверьте: bun run fix-only', '', 'dim');
  log('  3. Закоммитьте: git commit -m "..."', '', 'dim');
  log('  4. Пушите: git push (или bun run safe-push)', '', 'dim');
  console.log('');
  
  // Вывод полезных команд
  logBox(
    '⚡ ПОЛЕЗНЫЕ КОМАНДЫ:',
    `
bun run start-work     # Эта инициализация
bun run safe-push      # Проверка + push
bun run fix-only       # Только исправления
npm run format         # Форматирование
npx tsc --noEmit      # TypeScript проверка
bun run build          # Сборка проекта`,
    'cyan'
  );
  
  console.log('');
  
  // Напоминание о документации
  if (!isQuick) {
    logBox(
      '📚 НЕ ЗАБУДЬТЕ ИСПОЛЬЗОВАТЬ:',
      `
DESIGN-SYSTEM.md      → Цвета, типографика, отступы
COMPONENTS-CATALOG.md  → Готовые компоненты
CODE-PATTERNS.md      → Паттерны кода
ERRORS-CHEATSHEET.md  → Решение ошибок
REVIEW-CHECKLIST.md   → Чеклист качества`,
      'yellow'
    );
  }
  
  return 0;
}

// Запуск
main().catch((err) => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
