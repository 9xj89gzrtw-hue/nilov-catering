#!/usr/bin/env node

/**
 * ENFORCE-RULES.MJS - ПРОВЕРКА СОБЛЮДЕНИЯ ПРАВИЛ
 * 
 * Проверяет что агент:
 * - Использует цвета из DESIGN-SYSTEM.md
 * - Использует готовые компоненты
 * - Не хардкодит значения
 * - Следует паттернам из CODE-PATTERNS.md
 * 
 * Запускается автоматически перед push!
 */

import { readFileSync, existsSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

// ============================================
// ПРАВИЛА ДЛЯ ПРОВЕРКИ
// ============================================

const RULES = {
  // ЗАПРЕЩЁННЫЕ ЦВЕТА (должны использовать дизайн-систему)
  forbiddenColors: [
    { pattern: /#000000/g, replacement: '#1a1816', name: 'Чистый чёрный' },
    { pattern: /#000/g, replacement: '#1a1816', name: 'Короткий чёрный' },
    { pattern: /#fff/g, replacement: 'white / bg-white', name: 'Короткий белый' },
    { pattern: /#ffffff/g, replacement: 'white', name: 'Полный белый' },
    { pattern: /rgb\s*\(\s*0\s*,\s*0\s*,\s*0\s*\)/gi, replacement: '#1a1816', name: 'RGB чёрный' },
    { pattern: /rgb\s*\(\s*255\s*,\s*255\s*,\s*255\s*\)/gi, replacement: 'white', name: 'RGB белый' },
  ],
  
  // РАЗРЕШЁННЫЕ ЦВЕТА (из дизайн-системы)
  allowedColors: [
    '#d4a574', // brand primary (золотой)
    '#8b4513', // brand secondary (коричневый)
    '#c9a227', // brand accent (яркий золотой)
    '#1a1816', // dark (тёмный)
    '#faf9f7', // off-white
    '#f5f0e8', // cream
    '#e8e2d9', // light gray
    '#9a938a', // gray
    '#4a4540', // dark gray
    '#c44536', // error
    '#4a7c59', // success
    '#5b8cb8', // info
  ],
  
  // ФАЙЛЫ КОТОРЫЕ НЕ НУЖНО ПРОВЕРЯТЬ
  skipPatterns: [
    'node_modules',
    '.next',
    '.git',
    '*.lock',
    'package.json',
    'md', // markdown файлы
    'skills/', // внешние скиллы
    'templates/', // шаблоны
    'lib/design-tokens.ts', // файл ОПРЕДЕЛЯЕТ цвета
  ],
};

// ============================================
// ФУНКЦИИ ПРОВЕРКИ
// ============================================

let errors = [];
let warnings = [];

function error(file, line, message) {
  errors.push({ file, line, message });
}

function warning(file, line, message) {
  warnings.push({ file, line, message });
}

function getTsFiles() {
  try {
    const result = execSync(
      "find . -name '*.ts' -o -name '*.tsx' | grep -v node_modules | grep -v .next | grep -v '.git'",
      { cwd: rootDir, encoding: 'utf-8' }
    );
    return result.split('\n').filter(f => f.trim());
  } catch {
    return [];
  }
}

function checkFile(filePath) {
  const fullPath = join(rootDir, filePath);
  
  if (!existsSync(fullPath)) return;
  
  let content;
  try {
    content = readFileSync(fullPath, 'utf8');
  } catch {
    return; // Пропускаем нечитаемые файлы
  }
  
  const lines = content.split('\n');
  
  // Проверяем каждую строку
  lines.forEach((line, index) => {
    const lineNumber = index + 1;
    
    // 1. Проверка запрещённых цветов
    for (const rule of RULES.forbiddenColors) {
      if (rule.pattern.test(line)) {
        error(filePath, lineNumber, 
          `Запрещённый цвет (${rule.name}): используйте "${rule.replacement}" из DESIGN-SYSTEM.md`
        );
      }
    }
    
    // 2. Проверка magic numbers в стилях
    // Исключаем: классы Tailwind, стандартные значения
    if (
      /(padding|margin|top|right|bottom|left|width|height):\s*\d{3,}/.test(line) &&
      !/\/\*/.test(line) && // не в комментарии
      !/px-/.test(line) && // не Tailwind
      !/\[.*?\]/.test(line) && // не arbitrary values
      !/var\(--/.test(line) // не CSS переменные
    ) {
      warning(filePath, lineNumber,
        'Возможно magic number — используйте значения из DESIGN-SYSTEM.md'
      );
    }
    
    // 3. Проверка console.log (кроме отладочных файлов)
    if (/console\.(log|debug)/.test(line) && 
        !filePath.includes('debug') && 
        !filePath.includes('test')) {
      warning(filePath, lineNumber,
        'console.log обнаружен — удалите перед коммитом'
      );
    }
    
    // 4. Проверка any типа
    if (/\:\s*any[\s;,]/.test(line) || /as any/.test(line)) {
      warning(filePath, lineNumber,
        'Использование "any" типа — добавьте правильную типизацию'
      );
    }
    
    // 5. Проверка использования inline styles вместо Tailwind
    if (/style=\{\{[^}]*color[^}]*\}\}/.test(line)) {
      warning(filePath, lineNumber,
        'Inline style с color — используйте Tailwind классы из DESIGN-SYSTEM.md'
      );
    }
  });
}

// ============================================
// ОСНОВНАЯ ЛОГИКА
// ============================================

function main() {
  console.log('\n');
  console.log('📋 ENFORCE-RULES: Checking code quality rules...\n');
  
  // Получаем все TS/TSX файлы
  const files = getTsFiles();
  
  console.log(`   Scanning ${files.length} files...\n`);
  
  // Проверяем каждый файл
  files.forEach(file => {
    // Пропускаем файлы из исключений
    const shouldSkip = RULES.skipPatterns.some(pattern => file.includes(pattern));
    if (shouldSkip) return;
    
    checkFile(file);
  });
  
  // ============================================
  // ВЫВОД РЕЗУЛЬТАТОВ
  // ============================================
  
  console.log('═'.repeat(60));
  
  if (errors.length > 0) {
    console.log(`\n❌ ERRORS (${errors.length}):\n`);
    errors.slice(0, 20).forEach(err => {
      console.log(`   ${err.file}:${err.line}`);
      console.log(`   → ${err.message}\n`);
    });
    
    if (errors.length > 20) {
      console.log(`   ... and ${errors.length - 20} more errors\n`);
    }
  }
  
  if (warnings.length > 0) {
    console.log(`⚠️  WARNINGS (${warnings.length}):\n`);
    warnings.slice(0, 10).forEach(warn => {
      console.log(`   ${warn.file}:${warn.line}`);
      console.log(`   → ${warn.message}\n`);
    });
    
    if (warnings.length > 10) {
      console.log(`   ... and ${warnings.length - 10} more warnings\n`);
    }
  }
  
  if (errors.length === 0 && warnings.length === 0) {
    console.log(`\n✅ ALL CHECKS PASSED! Code follows the rules.\n`);
  }
  
  console.log('═'.repeat(60));
  console.log('');
  
  // Сохраняем отчёт
  const report = {
    timestamp: new Date().toISOString(),
    errors,
    warnings,
    summary: {
      filesScanned: files.length,
      errorsCount: errors.length,
      warningsCount: warnings.length,
    }
  };
  
  const reportPath = join(rootDir, '.enforce-report.json');
  writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  // Возвращаем результат
  if (errors.length > 0) {
    console.log('💡 Quick fixes:');
    console.log('   • Replace #fff with white or bg-white');
    console.log('   • Replace #000 with #1a1816 or text-[#1a1816]');
    console.log('   • Use Tailwind classes instead of inline styles');
    console.log('   • Check DESIGN-SYSTEM.md for allowed colors\n');
    
    process.exit(1);
  }
  
  process.exit(0);
}

// Для работы с файлами
import { writeFileSync as _writeFileSync } from 'fs';

main();
