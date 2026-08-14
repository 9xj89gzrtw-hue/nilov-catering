#!/usr/bin/env node

// ============================================================================
// 🏥 PROJECT HEALTH CHECK — Автоматическая проверка состояния проекта
// ============================================================================
// Использование:
//   bun run project-health-check          — базовая проверка
//   bun run project-health-check --full    — полная проверка с деталями
//   bun run project-health-check --fix     — попытаться исправить проблемы
// ============================================================================

import { readFileSync, existsSync, readdirSync, statSync } from "fs";
import { join, relative } from "path";
import { execSync } from "child_process";

const args = process.argv.slice(2);
const isFull = args.includes("--full");
const isFix = args.includes("--fix");

// Цвета для вывода
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  bold: "\x1b[1m",
};

function log(type, message) {
  const icons = {
    success: `${colors.green}✅${colors.reset}`,
    error: `${colors.red}❌${colors.reset}`,
    warning: `${colors.yellow}⚠️${colors.reset}`,
    info: `${colors.blue}ℹ️${colors.reset}`,
    header: `${colors.cyan}📋${colors.reset}`,
  };
  console.log(`${icons[type] || ""} ${message}`);
}

function logSection(title) {
  console.log(`\n${colors.bold}${colors.cyan}═══ ${title} ═══${colors.reset}\n`);
}

// ============================================================================
// КОНФИГУРАЦИЯ ПРОВЕРОК
// ============================================================================

const ROOT_DIR = process.cwd();

// Обязательные файлы документации
const REQUIRED_DOCS = [
  { file: "AGENTS.md", description: "Инструкции для агентов" },
  { file: "DESIGN-SYSTEM.md", description: "Дизайн-справочник" },
  { file: "COMPONENTS-CATALOG.md", description: "Каталог компонентов" },
  { file: "CODE-PATTERNS.md", description: "Паттерны кода" },
  { file: "ERRORS-CHEATSHEET.md", description: "Шпаргалка ошибок" },
  { file: "REVIEW-CHECKLIST.md", description: "Чеклист качества" },
  { file: "DEPENDENCIES.md", description: "Справочник зависимостей" },
];

// Обязательные файлы шаблонов
const REQUIRED_TEMPLATES = [
  { file: "templates/PAGE_TEMPLATE.tsx", description: "Шаблон страницы" },
];

// Обязательные директории
const REQUIRED_DIRS = [
  { dir: "src/components/ui", description: "UI компоненты" },
  { dir: "src/lib", description: "Утилиты" },
  { dir: "scripts", description: "Скрипты" },
  { dir: ".github/workflows", description: "GitHub Actions" },
  { dir: ".husky", description: "Git hooks" },
];

// Обязательные UI компоненты
const REQUIRED_UI_COMPONENTS = [
  "ThemeProvider.tsx",
  "InViewWrapper.tsx",
  "Accordion.tsx",
  "Tabs.tsx",
  "Dialog.tsx",
  "Tooltip.tsx",
  "Popover.tsx",
  "Collapsible.tsx",
  "NavigationMenu.tsx",
  "Select.tsx",
  "CompareSlider.tsx",
];

// Обязательные утилиты
const REQUIRED_UTILS = [
  { file: "src/lib/utils.ts", description: "cn() utility" },
  { file: "src/lib/schema.ts", description: "Schema.org helpers" },
];

// Конфигурационные файлы
const CONFIG_FILES = [
  { file: "package.json", description: "Пакеты проекта" },
  { file: "tsconfig.json", description: "TypeScript конфиг" },
  { file: "tailwind.config.ts", description: "Tailwind конфиг" },
  { file: "next.config.ts", description: "Next.js конфиг" },
  { file: ".eslintrc.json", description: "ESLint конфиг" },
  { file: ".prettierrc", description: "Prettier конфиг" },
  { file: ".github/dependabot.yml", description: "Dependabot конфиг" },
];

// ============================================================================
// ФУНКЦИИ ПРОВЕРКИ
// ============================================================================

let results = {
  docs: { passed: 0, failed: 0, warnings: 0 },
  templates: { passed: 0, failed: 0, warnings: 0 },
  components: { passed: 0, failed: 0, warnings: 0 },
  config: { passed: 0, failed: 0, warnings: 0 },
  code: { passed: 0, failed: 0, warnings: 0 },
};

function checkFileExists(filePath, description) {
  const fullPath = join(ROOT_DIR, filePath);
  if (existsSync(fullPath)) {
    return { exists: true, path: filePath, description };
  }
  return { exists: false, path: filePath, description };
}

function checkDirectoryExists(dirPath, description) {
  const fullPath = join(ROOT_DIR, dirPath);
  if (existsSync(fullPath) && statSync(fullPath).isDirectory()) {
    return { exists: true, path: dirPath, description };
  }
  return { exists: false, path: dirPath, description };
}

function checkConsoleLogs(filePath) {
  try {
    const content = readFileSync(join(ROOT_DIR, filePath), "utf-8");
    // Ищем console.log (но не в комментариях)
    const lines = content.split("\n");
    const violations = [];
    
    lines.forEach((line, index) => {
      // Пропускаем комментарии
      if (line.trim().startsWith("//") || line.trim().startsWith("*") || line.trim().startsWith("/*")) {
        return;
      }
      // Ищем console.log
      if (/console\.(log|debug|info)/.test(line) && !line.includes("// TODO")) {
        violations.push({ line: index + 1, content: line.trim() });
      }
    });
    
    return violations;
  } catch {
    return [];
  }
}

function checkHardcodedColors(filePath) {
  try {
    const content = readFileSync(join(ROOT_DIR, filePath), "utf-8");
    const lines = content.split("\n");
    const violations = [];
    
    lines.forEach((line, index) => {
      // Ищем hex цвета в style или className
      if (/(style|className).*#[0-9a-fA-F]{3,8}/.test(line)) {
        // Исключаем комментарии и некоторые паттерны
        if (!line.trim().startsWith("//") && !line.includes("color: ")) {
          violations.push({ line: index + 1, content: line.trim().substring(0, 80) });
        }
      }
    });
    
    return violations;
  } catch {
    return [];
  }
}

function checkMetadataInPage(filePath) {
  try {
    const content = readFileSync(join(ROOT_DIR, filePath), "utf-8");
    const hasMetadata = /export\s+const\s+metadata/.test(content);
    const hasTitle = /title:\s*["']/.test(content);
    const hasDescription = /description:\s*["']/.test(content);
    const hasErrorBoundary = /ErrorBoundary/.test(content);
    const hasH1 = /<h1/.test(content);
    
    return {
      hasMetadata,
      hasTitle,
      hasDescription,
      hasErrorBoundary,
      hasH1,
      issues: [
        !hasMetadata && "Отсутствует metadata export",
        !hasTitle && "Отсутствует title в metadata",
        !hasDescription && "Отсутствует description в metadata",
        !hasErrorBoundary && "Отсутствует ErrorBoundary обёртка",
        !hasH1 && "Отсутствует H1 заголовок",
      ].filter(Boolean),
    };
  } catch {
    return { issues: ["Не удалось прочитать файл"] };
  }
}

// ============================================================================
// ВЫПОЛНЕНИЕ ПРОВЕРОК
// ============================================================================

console.log(`${colors.bold}${colors.cyan}
╔══════════════════════════════════════════════════════════╗
║           🏥 PROJECT HEALTH CHECK                       ║
║           Проверка состояния проекта                     ║
╚══════════════════════════════════════════════════════════╝
${colors.reset}`);

log("info", `Режим: ${isFull ? "Полная проверка" : "Базовая проверка"}${isFix ? " + Попытка исправления" : ""}`);
log("info", `Директория: ${ROOT_DIR}\n`);

// === 1. ПРОВЕРКА ДОКУМЕНТАЦИИ ===
logSection("1. ДОКУМЕНТАЦИЯ ДЛЯ АГЕНТОВ");

REQUIRED_DOCS.forEach(({ file, description }) => {
  const result = checkFileExists(file, description);
  if (result.exists) {
    log("success", `${file} — ${description}`);
    results.docs.passed++;
  } else {
    log("error", `${file} — ${description} (ОТСУТСТВУЕТ!)`);
    results.docs.failed++;
  }
});

REQUIRED_TEMPLATES.forEach(({ file, description }) => {
  const result = checkFileExists(file, description);
  if (result.exists) {
    log("success", `${file} — ${description}`);
    results.templates.passed++;
  } else {
    log("error", `${file} — ${description} (ОТСУТСТВУЕТ!)`);
    results.templates.failed++;
  }
});

// === 2. ПРОВЕРКА СТРУКТУРЫ ===
logSection("2. СТРУКТУРА ПРОЕКТА");

REQUIRED_DIRS.forEach(({ dir, description }) => {
  const result = checkDirectoryExists(dir, description);
  if (result.exists) {
    log("success", `${dir}/ — ${description}`);
    results.config.passed++;
  } else {
    log("error", `${dir}/ — ${description} (ОТСУТСТВУЕТ!)`);
    results.config.failed++;
  }
});

CONFIG_FILES.forEach(({ file, description }) => {
  const result = checkFileExists(file, description);
  if (result.exists) {
    log("success", `${file} — ${description}`);
    results.config.passed++;
  } else {
    log("warning", `${file} — ${description} (отсутствует — может быть OK)`);
    results.config.warnings++;
  }
});

// === 3. ПРОВЕРКА UI КОМПОНЕНТОВ ===
logSection("3. UI КОМПОНЕНТЫ");

const uiComponentsDir = join(ROOT_DIR, "src/components/ui");
if (existsSync(uiComponentsDir)) {
  const existingComponents = readdirSync(uiComponentsDir)
    .filter(f => f.endsWith(".tsx") || f.endsWith(".ts"));
  
  REQUIRED_UI_COMPONENTS.forEach(component => {
    if (existingComponents.includes(component)) {
      log("success", `components/ui/${component}`);
      results.components.passed++;
    } else {
      log("error", `components/ui/${component} (ОТСУТСТВУЕТ!)`);
      results.components.failed++;
    }
  });
  
  // Показать дополнительные компоненты
  const extraComponents = existingComponents.filter(
    c => !REQUIRED_UI_COMPONENTS.includes(c)
  );
  if (extraComponents.length > 0 && isFull) {
    log("info", `\nДополнительные компоненты:`);
    extraComponents.forEach(c => log("info", `  + ${c}`));
  }
} else {
  log("error", "Директория src/components/ui не существует!");
  results.components.failed += REQUIRED_UI_COMPONENTS.length;
}

// === 4. ПРОВЕРКА УТИЛИТ ===
logSection("4. УТИЛИТЫ");

REQUIRED_UTILS.forEach(({ file, description }) => {
  const result = checkFileExists(file, description);
  if (result.exists) {
    log("success", `${file} — ${description}`);
    results.components.passed++;
  } else {
    log("error", `${file} — ${description} (ОТСУТСТВУЕТ!)`);
    results.components.failed++;
  }
});

// === 5. ПРОВЕРКА КОДА (только в full режиме) ===
if (isFull) {
  logSection("5. КАЧЕСТВО КОДА");
  
  // Проверяем страницы
  const pagesDir = join(ROOT_DIR, "src/app");
  if (existsSync(pagesDir)) {
    function findPages(dir, baseDir = "") {
      const items = readdirSync(dir);
      const pages = [];
      
      items.forEach(item => {
        const fullPath = join(dir, item);
        const stat = statSync(fullPath);
        const relativePath = join(baseDir, item);
        
        if (stat.isDirectory() && item !== "node_modules") {
          pages.push(...findPages(fullPath, relativePath));
        } else if (item === "page.tsx" || item === "page.jsx") {
          pages.push(relativePath);
        }
      });
      
      return pages;
    }
    
    const pages = findPages(pagesDir);
    log("info", `Найдено страниц: ${pages.length}`);
    
    let totalIssues = 0;
    pages.forEach(pagePath => {
      const fullPagePath = join("src/app", pagePath);
      const check = checkMetadataInPage(fullPagePath);
      
      if (check.issues.length > 0) {
        log("warning", `${pagePath}:`);
        check.issues.forEach(issue => {
          log("warning", `  - ${issue}`);
          totalIssues++;
        });
        results.code.warnings++;
      } else {
        results.code.passed++;
      }
    });
    
    if (totalIssues === 0) {
      log("success", "Все страницы прошли проверку! ✨");
    }
  }
  
  // Проверяем console.log
  log("\n");
  log("info", "Поиск console.log...");
  
  const srcDir = join(ROOT_DIR, "src");
  function findTsFiles(dir, baseDir = "") {
    try {
      const items = readdirSync(dir);
      const files = [];
      
      items.forEach(item => {
        if (item === "node_modules") return;
        
        const fullPath = join(dir, item);
        const stat = statSync(fullPath);
        const relativePath = join(baseDir, item);
        
        if (stat.isDirectory()) {
          files.push(...findTsFiles(fullPath, relativePath));
        } else if ((item.endsWith(".tsx") || item.endsWith(".ts")) && !item.includes(".d.")) {
          files.push(relativePath);
        }
      });
      
      return files;
    } catch {
      return [];
    }
  }
  
  const tsFiles = findTsFiles(srcDir);
  let consoleLogCount = 0;
  
  tsFiles.forEach(file => {
    const violations = checkConsoleLogs(join("src", file));
    if (violations.length > 0) {
      log("warning", `${file}: найдено ${violations.length} console.log`);
      if (isFull) {
        violations.slice(0, 3).forEach(v => {
          log("info", `  строка ${v.line}: ${v.content.substring(0, 60)}...`);
        });
        if (violations.length > 3) {
          log("info", `  ... и ещё ${violations.length - 3}`);
        }
      }
      consoleLogCount += violations.length;
      results.code.warnings++;
    }
  });
  
  if (consoleLogCount === 0) {
    log("success", "console.log не найдены!");
    results.code.passed++;
  }
}

// === 6. ПРОВЕРКА GIT HOOKS ===
if (isFull) {
  logSection("6. GIT HOOKS И AUTOMATION");
  
  const prePushHook = join(ROOT_DIR, ".husky/pre-push");
  if (existsSync(prePushHook)) {
    log("success", "Pre-push hook установлен");
    results.config.passed++;
  } else {
    log("warning", "Pre-push hook НЕ установлен");
    results.config.warnings++;
  }
  
  const dependabotConfig = join(ROOT_DIR, ".github/dependabot.yml");
  if (existsSync(dependabotConfig)) {
    log("success", "Dependabot настроен");
    results.config.passed++;
  } else {
    log("warning", "Dependabot НЕ настроен");
    results.config.warnings++;
  }
  
  // Проверяем скрипты в package.json
  try {
    const pkg = JSON.parse(readFileSync(join(ROOT_DIR, "package.json"), "utf-8"));
    const requiredScripts = ["start-work", "safe-push", "pre-deploy:quick"];
    
    requiredScripts.forEach(script => {
      if (pkg.scripts && pkg.scripts[script]) {
        log(`success`, `Скрипт "${script}" доступен (${pkg.scripts[script]})`);
        results.config.passed++;
      } else {
        log("warning", `Скрипт "${script}" НЕ найден в package.json`);
        results.config.warnings++;
      }
    });
  } catch {
    log("error", "Не удалось прочитать package.json");
  }
}

// ============================================================================
// ИТОГИ
// ============================================================================

logSection("ИТОГИ ПРОВЕРКИ");

const totalPassed = Object.values(results).reduce((sum, r) => sum + r.passed, 0);
const totalFailed = Object.values(results).reduce((sum, r) => sum + r.failed, 0);
const totalWarnings = Object.values(results).reduce((sum, r) => sum + r.warnings, 0);
const totalChecks = totalPassed + totalFailed + totalWarnings;

console.log(`
${colors.bold}Статистика:${colors.reset}
  ✅ Пройдено:    ${colors.green}${totalPassed}${colors.reset}
  ❌ Ошибки:      ${colors.red}${totalFailed}${colors.reset}
  ⚠️  Предупреждения: ${colors.yellow}${totalWarnings}${colors.reset}
  ──────────────────────
  Всего проверок: ${totalChecks}
`);

const healthPercentage = Math.round((totalPassed / totalChecks) * 100);

let healthStatus, healthColor;
if (healthPercentage >= 90) {
  healthStatus = "ЗДОРОВО";
  healthColor = colors.green;
} else if (healthPercentage >= 70) {
  healthStatus = "ХОРОШО";
  healthColor = colors.yellow;
} else {
  healthStatus = "ТРЕБУЕТ ВНИМАНИЯ";
  healthColor = colors.red;
}

console.log(`${colors.bold}Здоровье проекта: ${healthColor}${healthPercentage}% (${healthStatus})${colors.reset}\n`);

// Рекомендации
if (totalFailed > 0 || totalWarnings > 0) {
  console.log(`${colors.bold}${colors.cyan}Рекомендации:${colors.reset}\n`);
  
  if (results.docs.failed > 0) {
    console.log(`${colors.yellow}• Создайте отсутствующие файлы документации${colors.reset}`);
    console.log(`  Они критически важны для работы AI агентов!\n`);
  }
  
  if (results.components.failed > 0) {
    console.log(`${colors.yellow}• Установите недостающие UI компоненты${colors.reset}`);
    console.log(`  См. COMPONENTS-CATALOG.md для списка\n`);
  }
  
  if (results.code.warnings > 0) {
    console.log(`${colors.yellow}• Устраните предупреждения в коде${colors.reset}`);
    console.log(`  Удалите console.log, добавьте metadata на страницы\n`);
  }
  
  console.log(`${colors.cyan}• Запустите 'bun run fix-only' для авто-исправления форматирования${colors.reset}`);
  console.log(`${colors.cyan}• Прочитайте AGENTS.md для полной инструкции${colors.reset}\n`);
}

// Exit code
if (totalFailed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
