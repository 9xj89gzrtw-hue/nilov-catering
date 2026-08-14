#!/usr/bin/env node

/**
 * Скрипт проверки устаревших зависимостей
 * 
 * Использование:
 *   bun run check-updates          - Проверить какие пакеты можно обновить
 *   bun run check-updates --update - Обновить package.json до последних версий
 *   bun run check-updates --install - Обновить и установить
 */

import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

const args = process.argv.slice(2);
const shouldUpdate = args.includes('--update') || args.includes('--install');
const shouldInstall = args.includes('--install');

console.log('📦 Проверка обновлений зависимостей...\n');

try {
  // Получаем список устаревших пакетов
  const result = execSync(
    'bunx npm-check-updates --json 2>/dev/null || echo "[]"',
    { 
      cwd: rootDir, 
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe']
    }
  );
  
  const updates = JSON.parse(result);
  const updateCount = Object.keys(updates).length;
  
  if (updateCount === 0) {
    console.log('✅ Все зависимости на актуальных версиях!\n');
    process.exit(0);
  }
  
  console.log(`🔔 Найдено ${updateCount} пакетов для обновления:\n`);
  
  // Группируем по типу обновления
  const majorUpdates = [];
  const minorUpdates = [];
  const patchUpdates = [];
  
  for (const [pkg, info] of Object.entries(updates)) {
    const line = `  ${pkg}: ${info.current} → ${info.latest}`;
    
    if (info.latest.split('.')[0] !== info.current.split('.')[0]) {
      majorUpdates.push(line);
    } else if (info.latest.split('.')[1] !== info.current.split('.')[1]?.split('-')[0]) {
      minorUpdates.push(line);
    } else {
      patchUpdates.push(line);
    }
  }
  
  if (majorUpdates.length > 0) {
    console.log('⚠️  MAJOR обновления (возможны breaking changes):');
    majorUpdates.forEach(line => console.log(line));
    console.log('');
  }
  
  if (minorUpdates.length > 0) {
    console.log('📈 MINOR обновления (новые функции):');
    minorUpdates.forEach(line => console.log(line));
    console.log('');
  }
  
  if (patchUpdates.length > 0) {
    console.log('🐛 PATCH обновления (исправления):');
    patchUpdates.forEach(line => console.log(line));
    console.log('');
  }
  
  if (!shouldUpdate) {
    console.log('💡 Для обновления запустите:');
    console.log('   bun run check-updates --update   (обновить package.json)');
    console.log('   bun run check-updates --install  (обновить и установить)\n');
    process.exit(1);
  }
  
  // Выполняем обновление
  console.log('🔄 Обновление package.json...\n');
  
  execSync('bunx npm-check-updates -u', { 
    cwd: rootDir, 
    stdio: 'inherit' 
  });
  
  console.log('\n✅ package.json обновлён!');
  
  if (shouldInstall) {
    console.log('\n📦 Установка обновлённых пакетов...\n');
    execSync('bun install', { 
      cwd: rootDir, 
      stdio: 'inherit' 
    });
    console.log('\n✅ Пакеты установлены!');
  }
  
  console.log('\n💡 Рекомендуется:');
  console.log('   1. Запустить bun run build для проверки');
  console.log('   2. Запустить тесты: bun run test');
  console.log('   3. Закоммитить изменения\n');
  
} catch (error) {
  console.error('❌ Ошибка при проверке обновлений:', error.message);
  process.exit(1);
}
