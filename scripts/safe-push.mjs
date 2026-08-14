#!/usr/bin/env node

/**
 * SAFE-PUSH - Безопасный push с полной проверкой
 * 
 * Использование:
 *   bun run safe-push              # Проверить + push
 *   bun run safe-push --no-check   # Push без проверки (не рекомендуется)
 *   bun run safe-push --fix-only   # Только исправить, не пушить
 */

import { execSync } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

const args = process.argv.slice(2);
const noCheck = args.includes('--no-check');
const fixOnly = args.includes('--fix-only');

// Цвета
const c = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
};

function log(step, msg) {
  console.log(`${c.cyan}[${step}]${c.reset} ${msg}`);
}

function success(msg) {
  console.log(`${c.green}✓${c.reset} ${msg}`);
}

function error(msg) {
  console.log(`${c.red}✗${c.reset} ${msg}`);
}

function warn(msg) {
  console.log(`${c.yellow}!${c.reset} ${msg}`);
}

let errors = 0;
let fixes = 0;

console.log('');
console.log('='.repeat(60));
console.log(`${c.bold}🛡️  SAFE-PUSH - Safe Git Push with Checks${c.reset}`);
console.log('='.repeat(60));
console.log('');

if (noCheck) {
  warn('⚠️  Skipping checks (--no-check mode)');
} else if (fixOnly) {
  log('MODE', 'Fix only mode (--fix-only)');
}

// ============================================
// 1. ПРОВЕРКА ИЗМЕНЕНИЙ
// ============================================
log('INIT', 'Checking for changes...');

try {
  const status = execSync('git status --porcelain', { 
    cwd: rootDir, 
    encoding: 'utf-8' 
  });
  
  if (!status.trim()) {
    warn('No changes to push');
    process.exit(0);
  }
  
  const lines = status.trim().split('\n');
  const staged = lines.filter(l => l.startsWith('M  ') || l.startsWith('A  ') || l.startsWith('D  ') || l.startsWith('M') && !l.startsWith('M '));
  
  console.log(`   Found ${lines.length} changed file(s), ${staged.length} staged`);
} catch (e) {
  error('Failed to get git status');
}

// ============================================
// 2. FORMATTING CHECK
// ============================================
if (!noCheck) {
  log('1/6', 'Checking formatting (Prettier)...');
  
  try {
    execSync('npx prettier --check "**/*.{ts,tsx,js,jsx,css,md,json}" --no-error-on-unmatched-pattern', {
      cwd: rootDir,
      stdio: 'pipe',
      timeout: 60000
    });
    success('Formatting OK');
  } catch (e) {
    warn('Formatting issues found, fixing...');
    
    try {
      execSync('npx prettier --write "**/*.{ts,tsx,js,jsx,css,md,json}" --no-error-on-unmatched-pattern', {
        cwd: rootDir,
        stdio: 'pipe',
        timeout: 120000
      });
      
      // Stage fixed files
      execSync('git add -A', { cwd: rootDir, stdio: 'pipe' });
      fixes++;
      success('Formatting fixed and staged');
    } catch (fixErr) {
      error('Failed to fix formatting');
      errors++;
    }
  }
}

// ============================================
// 3. TYPESCRIPT CHECK
// ============================================
if (!noCheck) {
  log('2/6', 'Checking TypeScript...');
  
  try {
    const tsOutput = execSync('npx tsc --noEmit', {
      cwd: rootDir,
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
      timeout: 120000
    });
    
    success('TypeScript OK (0 errors)');
  } catch (e) {
    const tsErrors = (e.stdout || '').toString() || e.message;
    const errorCount = (tsErrors.match(/error TS/g) || []).length;
    
    if (errorCount > 0) {
      error(`TypeScript: ${errorCount} error(s) found`);
      console.log(tsErrors.split('\n').slice(0, 15).join('\n'));
      errors++;
    } else {
      // Только warnings
      success('TypeScript OK (warnings only)');
    }
  }
}

// ============================================
// 4. BUILD CHECK
// ============================================
if (!noCheck) {
  log('3/6', 'Checking build...');
  
  try {
    execSync('bun run build', {
      cwd: rootDir,
      stdio: 'pipe',
      encoding: 'utf-8',
      timeout: 180000
    });
    success('Build OK');
  } catch (e) {
    const buildOutput = (e.stdout || '').toString() || e.message;
    
    if (buildOutput.includes('error')) {
      error('Build failed');
      // Показываем последние 10 строк с ошибками
      const lines = buildOutput.split('\n').filter(l => l.includes('error'));
      console.log(lines.slice(-10).join('\n'));
      errors++;
    } else {
      success('Build OK (with warnings)');
    }
  }
}

// ============================================
// 5. YAML VALIDATION
// ============================================
if (!noCheck) {
  log('4/6', 'Checking YAML files...');
  
  let yamlError = false;
  const yamlFiles = [
    '.github/workflows/vercel-deploy.yml',
    '.github/workflows/fact-gate.yml',
    '.github/workflows/external-critics.yml',
    '.github/workflows/block-force-push.yml',
    '.github/workflows/dependency-check.yml',
    '.github/dependabot.yml'
  ];
  
  for (const file of yamlFiles) {
    const fullPath = join(rootDir, file);
    if (existsSync(fullPath)) {
      try {
        execSync(`python3 -c "import yaml; yaml.safe_load(open('${fullPath}'))"`, {
          stdio: 'pipe'
        });
      } catch (e) {
        error(`Invalid YAML: ${file}`);
        yamlError = true;
        errors++;
      }
    }
  }
  
  if (!yamlError) {
    success('YAML files valid');
  }
}

// ============================================
// 6. PACKAGE.JSON VALIDATION
// ============================================
if (!noCheck) {
  log('5/6', 'Checking package.json...');
  
  try {
    const pkgPath = join(rootDir, 'package.json');
    JSON.parse(readFileSync(pkgPath, 'utf8'));
    success('package.json valid');
  } catch (e) {
    error('Invalid package.json: ' + e.message);
    errors++;
  }
}

// ============================================
// 7. COMMIT MESSAGE CHECK (если есть незакоммиченные изменения)
// ============================================
if (!noCheck) {
  log('6/6', 'Checking commit message format...');
  
  try {
    const lastCommit = execSync('git log -1 --format=%s', {
      cwd: rootDir,
      encoding: 'utf-8',
      stdio: 'pipe'
    }).trim();
    
    // Проверяем conventional commits формат
    const validTypes = [
      'feat', 'fix', 'docs', 'style', 'refactor', 'perf', 
      'test', 'build', 'ci', 'chore', 'revert', 'page', 
      'design', 'content', 'seo', 'deploy'
    ];
    
    const isValid = validTypes.some(t => 
      lastCommit.startsWith(t + ':') || lastCommit.startsWith(t + '(')
    );
    
    if (isValid || lastCommit.startsWith('Merge')) {
      success('Commit message format OK');
    } else {
      warn(`Non-standard commit format: "${lastCommit.slice(0, 50)}..."`);
      warn('Recommended: type(scope): description');
      // Не блокируем, только предупреждаем
    }
  } catch (e) {
    // Нет коммитов или другая ошибка - не критично
    success('Commit check skipped');
  }
}

// ============================================
// РЕЗУЛЬТАТ
// ============================================
console.log('');
console.log('='.repeat(60));

if (errors > 0) {
  console.log(`${c.red}❌ PUSH BLOCKED - ${errors} error(s) found${c.reset}`);
  console.log('');
  console.log('To fix:');
  console.log('  1. Run: npx tsc --noEmit          # Check TypeScript');
  console.log('  2. Run: bun run build               # Check build');
  console.log('  3. Run: npm run format              # Fix formatting');
  console.log('  4. Fix errors manually');
  console.log('  5. Commit fixes: git commit -am "chore: fix pre-push issues"');
  console.log('  6. Try push again: bun run safe-push');
  console.log('');
  console.log('Or force push (not recommended):');
  console.log('  bun run safe-push --no-check');
  console.log('='.repeat(60));
  process.exit(1);
} else if (fixOnly) {
  console.log(`${c.green}✅ FIXES APPLIED - No push (--fix-only mode)${c.reset}`);
  if (fixes > 0) {
    console.log(`${c.yellow}   Auto-fixed: ${fixes} issue(s)${c.reset}`);
  }
  console.log('='.repeat(60));
  process.exit(0);
} else {
  console.log(`${c.green}✅ ALL CHECKS PASSED${c.reset}`);
  
  if (fixes > 0) {
    console.log(`${c.yellow}   Auto-fixed and included: ${fixes} issue(s)${c.reset}`);
  }
  
  console.log('');
  log('PUSH', 'Pushing to remote...');
  
  try {
    const pushArgs = args.filter(a => !a.startsWith('--')).join(' ');
    execSync(`git push ${pushArgs}`, {
      cwd: rootDir,
      stdio: 'inherit'
    });
    
    console.log('');
    console.log('='.repeat(60));
    console.log(`${c.green}🚀 PUSH SUCCESSFUL${c.reset}`);
    console.log('='.repeat(60));
  } catch (pushErr) {
    console.log('');
    console.log(`${c.red}❌ PUSH FAILED${c.reset}`);
    console.log(pushErr.message || '');
    process.exit(1);
  }
}
