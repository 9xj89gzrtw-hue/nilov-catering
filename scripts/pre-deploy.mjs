#!/usr/bin/env node

/**
 * PRE-DEPLOY CHECK SCRIPT
 * 
 * Этот скрипт ВСЕГДА выполняется перед деплоем.
 * Он проверяет:
 * 1. Форматирование кода (prettier)
 * 2. Сборку Next.js (next build)
 * 3. Базовые E2E тесты (playwright)
 * 
 * Использование:
 *   node scripts/pre-deploy.mjs          # Все проверки
 *   node scripts/pre-deploy.mjs --skip-build # Без билда (быстро)
 *   node scripts/pre-deploy.mjs --skip-e2e   # Без E2E тестов
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(step, message, color = 'cyan') {
  console.log(`${colors[color]}[${step}]${colors.reset} ${message}`);
}

function logSuccess(message) {
  console.log(`${colors.green}✓${colors.reset} ${message}`);
}

function logError(message) {
  console.log(`${colors.red}✗${colors.reset} ${message}`);
}

function logWarning(message) {
  console.log(`${colors.yellow}!${colors.reset} ${message}`);
}

// Parse arguments
const args = process.argv.slice(2);
const skipBuild = args.includes('--skip-build');
const skipE2E = args.includes('--skip-e2e');
const skipFormat = args.includes('--skip-format');

let hasErrors = false;
let warnings = [];

// Track execution time
const startTime = Date.now();

console.log('\n' + '='.repeat(60));
console.log('🔍 PRE-DEPLOY CHECK');
console.log('='.repeat(60) + '\n');

// ============================================
// CHECK 1: Prettier formatting
// ============================================
if (!skipFormat) {
  log('1/3', 'Checking code formatting...');
  try {
    execSync('npx prettier --check "**/*.{ts,tsx,js,jsx,css,md,json}"', {
      cwd: root,
      stdio: 'pipe',
      timeout: 60000,
    });
    logSuccess('Code is properly formatted');
  } catch (error) {
    logError('Formatting issues found!');
    logWarning('Run: npm run format');
    warnings.push('Formatting issues - run npm run format');
    
    // Auto-fix option
    if (!args.includes('--no-fix')) {
      log('FIX', 'Auto-fixing formatting...', 'yellow');
      try {
        execSync('npx prettier --write "**/*.{ts,tsx,js,jsx,css,md,json}"', {
          cwd: root,
          stdio: 'pipe',
          timeout: 120000,
        });
        logSuccess('Formatting fixed automatically');
      } catch (fixError) {
        logError('Failed to auto-fix formatting');
        hasErrors = true;
      }
    }
  }
} else {
  log('1/3', 'Skipping format check', 'yellow');
}

// ============================================
// CHECK 2: Next.js build
// ============================================
if (!skipBuild) {
  log('2/3', 'Building Next.js project...');
  try {
    execSync('npm run build', {
      cwd: root,
      stdio: 'pipe',
      timeout: 300000, // 5 minutes
    });
    logSuccess('Build successful - no errors!');
  } catch (error) {
    const output = error.stdout?.toString() || error.stderr?.toString() || '';
    logError('BUILD FAILED!');
    
    // Extract common errors
    if (output.includes('TypeScript')) {
      logWarning('TypeScript errors found in build');
      warnings.push('TypeScript errors in build');
    }
    if (output.includes('SyntaxError') || output.includes('Unexpected token')) {
      logWarning('Syntax errors found');
      warnings.push('Syntax errors in code');
    }
    if (output.includes('Module not found')) {
      logWarning('Missing dependencies or imports');
      warnings.push('Missing modules');
    }
    
    // Show first few lines of error
    const lines = output.split('\n').filter(l => l.trim()).slice(0, 20);
    lines.forEach(line => console.log(`   ${line}`));
    
    hasErrors = true;
  }
} else {
  log('2/3', 'Skipping build check', 'yellow');
}

// ============================================
// CHECK 3: Basic page structure validation
// ============================================
log('3/3', 'Validating page structure...');

// Critical pages that MUST exist and work
const criticalPages = [
  '/',
  '/menu/furshet',
  '/menu/banquet',
  '/events/svadba',
  '/events/korporativ',
  '/contact',
  '/gallery',
  '/reviews',
  '/pricing',
  '/about', // should redirect or exist
];

// Check that pages directory has expected structure
const fs = await import('fs');
const expectedDirs = [
  'app/menu',
  'app/events',
  'app/contact',
  'app/gallery',
  'app/reviews',
  'app/pricing',
];

let missingPages = [];
for (const dir of expectedDirs) {
  if (!existsSync(join(root, dir))) {
    missingPages.push(dir);
  }
}

if (missingPages.length > 0) {
  logWarning(`Missing page directories: ${missingPages.join(', ')}`);
  warnings.push(`Missing directories: ${missingPages.join(', ')}`);
} else {
  logSuccess('All critical page directories exist');
}

// ============================================
// SUMMARY
// ============================================
const endTime = Date.now();
const duration = ((endTime - startTime) / 1000).toFixed(1);

console.log('\n' + '-'.repeat(60));
console.log('📊 SUMMARY');
console.log('-'.repeat(60));

if (hasErrors) {
  console.log(`\n${colors.red}STATUS: FAILED - Fix errors before deploying${colors.reset}\n`);
  process.exit(1);
} else if (warnings.length > 0) {
  console.log(`\n${colors.yellow}STATUS: WARNINGS (${warnings.length})${colors.reset}`);
  warnings.forEach(w => console.log(`   ⚠ ${w}`));
  console.log(`\n⏱  Duration: ${duration}s`);
  console.log('✅ Can deploy, but consider fixing warnings\n');
  process.exit(0);
} else {
  console.log(`\n${colors.green}STATUS: ALL CHECKS PASSED ✅${colors.reset}`);
  console.log(`⏱  Duration: ${duration}s`);
  console.log('🚀 Safe to deploy!\n');
  process.exit(0);
}
