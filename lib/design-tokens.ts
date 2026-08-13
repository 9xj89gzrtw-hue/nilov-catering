/**
 * DESIGN TOKENS - Дизайн система мирового уровня
 *
 * Все цвета, типографика, анимации в одном месте.
 * Используйте ТОЛЬКО эти токены - не хардкодьте значения!
 */

// ============================================
// ЦВЕТОВАЯ ПАЛИТРА (Кейтеринг / Гастрономия)
// ============================================

export const colors = {
  // Основные брендовые цвета
  brand: {
    primary: "#d4a574", // Золотой (основной)
    secondary: "#8b4513", // Коричневый (шоколад)
    accent: "#c9a227", // Яркий золотой (акценты)
  },

  // Нейтральные
  neutral: {
    white: "#ffffff",
    offWhite: "#faf9f7",
    cream: "#f5f0e8",
    lightGray: "#e8e2d9",
    gray: "#9a938a",
    darkGray: "#4a4540",
    black: "#1a1816",
  },

  // Семантические
  semantic: {
    success: "#4a7c59",
    warning: "#d4a574",
    error: "#c44536",
    info: "#5b8cb8",
  },

  // Градиенты (для премиального вида)
  gradients: {
    gold: "linear-gradient(135deg, #d4a574 0%, #c9a227 50%, #8b4513 100%)",
    warm: "linear-gradient(135deg, #f5f0e8 0%, #d4a574 100%)",
    dark: "linear-gradient(135deg, #1a1816 0%, #4a4540 100%)",
    luxury: "linear-gradient(135deg, #c9a227 0%, #d4a574 50%, #ffffff 100%)",
    overlay: "linear-gradient(180deg, transparent 0%, rgba(26,24,22,0.8) 100%)",
  },
} as const;

// ============================================
// ТИПОГРАФИКА
// ============================================

export const typography = {
  fontFamily: {
    display: "'Cormorant Garamond', 'Playfair Display', Georgia, serif", // Для заголовков
    body: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", // Для текста
    accent: "'Cormorant Garamond', italic", // Для акцентов
  },

  fontSize: {
    // Display (героические заголовки)
    "display-2xl": ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
    "display-xl": ["3.75rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
    "display-lg": ["3rem", { lineHeight: "1.15", letterSpacing: "-0.01em" }],

    // Heading (заголовки секций)
    "heading-xl": ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
    "heading-lg": ["1.875rem", { lineHeight: "1.25" }],
    "heading-md": ["1.5rem", { lineHeight: "1.3" }],
    "heading-sm": ["1.25rem", { lineHeight: "1.35" }],

    // Body (основной текст)
    "body-lg": ["1.125rem", { lineHeight: "1.6" }],
    "body-md": ["1rem", { lineHeight: "1.6" }],
    "body-sm": ["0.875rem", { lineHeight: "1.5" }],

    // Caption (подписи)
    "caption-md": ["0.8125rem", { lineHeight: "1.45" }],
    "caption-sm": ["0.75rem", { lineHeight: "1.4" }],
  },

  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  } as const,
} as const;

// ============================================
// ПРОСТРАНСТВО (Spacing)
// ============================================

export const spacing = {
  // Секции
  section: {
    paddingY: { mobile: "4rem", tablet: "6rem", desktop: "8rem" },
    maxWidth: "1280px",
  },

  // Контейнеры
  container: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1440px",
  },

  // Grid gaps
  gap: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
    "3xl": "4rem",
  },
} as const;

// ============================================
// БОРДЕРЫ И РАДИУСЫ
// ============================================

export const borders = {
  radius: {
    none: "0",
    sm: "0.25rem",
    md: "0.5rem",
    lg: "1rem",
    xl: "1.5rem",
    "2xl": "2rem",
    full: "9999px",
  },
  width: {
    thin: "1px",
    normal: "1.5px",
    thick: "2px",
    xl: "3px",
  },
} as const;

// ============================================
// ТЕНИ (Shadows) - для премиального вида
// ============================================

export const shadows = {
  // Карточки
  card: {
    sm: "0 2px 8px rgba(26,24,22,0.08)",
    md: "0 4px 16px rgba(26,24,22,0.10)",
    lg: "0 8px 32px rgba(26,24,22,0.12)",
    xl: "0 16px 48px rgba(26,24,22,0.15)",
  },

  // Glow эффекты (брендовые)
  glow: {
    gold: "0 0 20px rgba(212,165,116,0.3)",
    soft: "0 0 40px rgba(212,165,116,0.15)",
    intense: "0 0 60px rgba(201,162,39,0.4)",
  },

  // Внутренние тени
  inner: {
    subtle: "inset 0 2px 4px rgba(26,24,22,0.06)",
    medium: "inset 0 4px 12px rgba(26,24,22,0.1)",
  },
} as const;

// ============================================
// АНИМАЦИИ (Timing & Easing)
// ============================================

export const animations = {
  // Длительности
  duration: {
    instant: "100ms",
    fast: "200ms",
    normal: "300ms",
    slow: "500ms",
    slower: "700ms",
    slowest: "1000ms",
  },

  // Easing функции (как у лучших сайтов)
  easing: {
    // Стандартные
    linear: "linear",
    easeIn: "cubic-bezier(0.4, 0, 1, 1)",
    easeOut: "cubic-bezier(0, 0, 0.2, 1)",
    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",

    // Премиальные (Apple-style)
    spring: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    smooth: "cubic-bezier(0.23, 1, 0.32, 1)",
    dramatic: "cubic-bezier(0.87, 0, 0.13, 1)",
  },

  // Готовые CSS transition
  transitions: {
    fast: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)",
    normal: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
    smooth: "all 500ms cubic-bezier(0.23, 1, 0.32, 1)",
    spring: "all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  },
} as const;

// ============================================
// BREAKPOINTS (Responsive)
// ============================================

export const breakpoints = {
  mobile: "320px",
  mobileLandscape: "480px",
  tablet: "768px",
  tabletLandscape: "1024px",
  desktop: "1280px",
  wide: "1536px",
  ultraWide: "1920px",
} as const;

// ============================================
// Z-INDEX LAYERS
// ============================================

export const zIndex = {
  base: 0,
  dropdown: 100,
  sticky: 200,
  fixed: 300,
  modalBackdrop: 400,
  modal: 500,
  popover: 600,
  tooltip: 700,
  toast: 800,
  maximum: 9999,
} as const;

// ============================================
// ЭКСПОРТ ДЕФОЛТНЫХ НАСТРОЕК
// ============================================

export const designSystem = {
  colors,
  typography,
  spacing,
  borders,
  shadows,
  animations,
  breakpoints,
  zIndex,
} as const;

export default designSystem;
