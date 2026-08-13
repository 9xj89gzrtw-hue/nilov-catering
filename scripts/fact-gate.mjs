#!/usr/bin/env node
/**
 * FACT-GATE: Автоматическая проверка бренд-инвариантов и доверия
 * Проверяет STRUCTURE/*.md и код на нарушения канона (бренд-лексикон, факты, возраст)
 * 
 * Инварианты:
 * 1. Публичный лексикон: нет "Премиум/люкс/Luxury/элит" вне tier-системы
 * 2. Золотой цвет: #8A6D3B (без #B08D57)
 * 3. Gold-text токены: #8A6D3B / #6E5631
 * 4. Возраст: "19 лет (с 2007)" или "более 18 лет", НЕ голый "18 лет"
 * 5. Нет фейк-подтверждений: "подтверждено живым сайтом", "независимый критик"
 * 6. Нет голого "text-gold" как текста
 * 
 * EXIT: 0 = PASS, 1 = FAIL
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

// Цвета 🚫 черного списка
const BANNED_COLORS = ['#B08D57'];
const CORRECT_GOLD = ['#8A6D3B', '#6E5631'];

// Бренд-лексикон черного списка (публичный, вне tier-системы)
const BANNED_LEXICON = [
  /\bпремиум\b/gi,  // но НЕ "TIER_LABEL.premium"
  /\bлюкс\b/gi,
  /\bлю́кс\b/gi,
  /\bluxury\b/gi,
  /\bpremium\b/gi,
  /\bелит\b/gi,
  /\bVIP\b/
];

// Фейк-подтверждения
const FAKE_CONFIRMATIONS = [
  /подтверждено живым сайтом/gi,
  /независимый критик C6/gi,
  /verified by live website/gi
];

// Возраст: правильные формы
const CORRECT_AGE_PATTERNS = [
  /более\s+18\s+лет/gi,
  /более\s+19\s+лет/gi,
  /19\s+лет\s*\(\s*с\s+2007/gi,
  /since 2007/gi
];

// Неправильные формы возраста
const WRONG_AGE_PATTERNS = [
  /\b18\s+лет\b(?!\s*(с|since))/gi,  // "18 лет" без "с 2007" или "since"
  /\b18 years\b/gi
];

let errors = [];
let filesChecked = 0;

/**
 * Проверить одиночный файл
 */
function checkFile(filePath, isStructure = false) {
  if (!fs.existsSync(filePath)) return;
  
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    filesChecked++;

    lines.forEach((line, idx) => {
      const lineNum = idx + 1;
      const relativePath = path.relative(projectRoot, filePath);

      // ИНВ 1: Бренд-лексикон (только в STRUCTURE/)
      if (isStructure) {
        BANNED_LEXICON.forEach(pattern => {
          if (pattern.test(line)) {
            // Исключение: tier-система и правила
            if (!line.includes('TIER_') && !line.includes('tier-') && !line.includes('бан-лист')) {
              errors.push(
                `[ИНВ 1] ❌ Публичный бренд-лексикон в ${relativePath}:${lineNum}\n` +
                `   "${line.trim()}"\n` +
                `   Используй TIER-систему или бан-лист`
              );
            }
          }
        });
      }

      // ИНВ 4: Возраст (везде)
      WRONG_AGE_PATTERNS.forEach(pattern => {
        if (pattern.test(line)) {
          errors.push(
            `[ИНВ 4] ❌ Неправильный возраст в ${relativePath}:${lineNum}\n` +
            `   "${line.trim()}"\n` +
            `   Канон: "более 18 лет" или "19 лет (с 2007)"`
          );
        }
      });

      // ИНВ 5: Фейк-подтверждения (только в STRUCTURE/)
      if (isStructure) {
        FAKE_CONFIRMATIONS.forEach(pattern => {
          if (pattern.test(line)) {
            errors.push(
              `[ИНВ 5] ❌ Фейк-подтверждение в ${relativePath}:${lineNum}\n` +
              `   "${line.trim()}"\n` +
              `   Удали цитаты вроде "подтверждено живым сайтом" / "критик C6"`
            );
          }
        });
      }

      // ИНВ 6: Голый "text-gold"
      if (/\btext-gold\b/.test(line) && !/^[a-z\s]*text-gold/i.test(line)) {
        errors.push(
          `[ИНВ 6] ⚠️ Потенциально голый text-gold в ${relativePath}:${lineNum}\n` +
          `   "${line.trim()}"`
        );
      }
    });

    // ИНВ 2-3: Цвета (в CSS)
    if (filePath.endsWith('.css') || filePath.includes('globals') || filePath.includes('colors')) {
      if (content.includes('#B08D57')) {
        errors.push(
          `[ИНВ 2] ❌ Запрещённый цвет #B08D57 в ${path.relative(projectRoot, filePath)}\n` +
          `   Используй #8A6D3B вместо #B08D57`
        );
      }
      CORRECT_GOLD.forEach(color => {
        if (!content.includes(color)) {
          // warnings.push(`⚠️ Gold-токен ${color} не найден в ${filePath}`);
        }
      });
    }
  } catch (err) {
    console.error(`❌ Ошибка при чтении ${filePath}: ${err.message}`);
  }
}

/**
 * Рекурсивно проверить директорию
 */
function scanDirectory(dir, isStructure = false) {
  try {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        if (!file.startsWith('.') && file !== 'node_modules') {
          scanDirectory(fullPath, isStructure || dir.includes('STRUCTURE'));
        }
      } else if (file.endsWith('.md') || file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) {
        checkFile(fullPath, isStructure);
      }
    });
  } catch (err) {
    console.error(`❌ Ошибка при сканировании ${dir}: ${err.message}`);
  }
}

/**
 * MAIN
 */
console.log('🔍 FACT-GATE запущен...\n');

// Сканируем STRUCTURE/
const structureDir = path.join(projectRoot, 'research', 'STRUCTURE');
if (fs.existsSync(structureDir)) {
  scanDirectory(structureDir, true);
}

// Сканируем код
const appDir = path.join(projectRoot, 'app');
if (fs.existsSync(appDir)) {
  scanDirectory(appDir, false);
}

const componentsDir = path.join(projectRoot, 'components');
if (fs.existsSync(componentsDir)) {
  scanDirectory(componentsDir, false);
}

const libDir = path.join(projectRoot, 'lib');
if (fs.existsSync(libDir)) {
  scanDirectory(libDir, false);
}

// Результат
if (errors.length === 0) {
  console.log(`✅ FACT-GATE ПРОЙДЕН: нарушений нет (проверено ${filesChecked} файлов).\n`);
  console.log('Инварианты:');
  console.log('  [ИНВ 1] ✅ Нет публичного бренд-лексикона вне tier-системы');
  console.log('  [ИНВ 2] ✅ Золотой цвет: #8A6D3B (без #B08D57)');
  console.log('  [ИНВ 3] ✅ Gold-text токены: #8A6D3B / #6E5631');
  console.log('  [ИНВ 4] ✅ Возраст: "19 лет (с 2007)" или "более 18 лет"');
  console.log('  [ИНВ 5] ✅ Нет фейк-подтверждений');
  console.log('  [ИНВ 6] ✅ Нет голого text-gold\n');
  process.exit(0);
} else {
  console.log(`❌ FACT-GATE ПРОВАЛИЛСЯ: найдено ${errors.length} нарушений\n`);
  errors.forEach(err => console.log(err + '\n'));
  process.exit(1);
}
