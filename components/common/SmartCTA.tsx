import Link from "next/link";
import { Calculator, Phone, ArrowRight, FileText, Utensils } from "lucide-react";
import { SITE } from "@/lib/data";

/**
 * SmartCTA — контекстный призыв к действию (UX 2025-2026)
 *
 * Показывает релевантный CTA в зависимости от:
 * - Текущей страницы (контекст)
 * - Этапа user journey
 * - Intent пользователя
 *
 * Принципы:
 * - One CTA per page (primary action)
 * - Context-aware (меняется от страницы)
 * - Progressive disclosure (раскрывает опции по необходимости)
 *
 * Варианты CTA по контексту:
 * 1. Событие → Рассчитать это событие
 * 2. Меню → Собрать/Рассчитать меню
 * 3. Инфо → Связаться / Перейти к действию
 */

export type CTAContext =
  | "event"      // Страница события
  | "menu"       // Страница меню
  | "pricing"    // Цены
  | "info"       // Информационная страница
  | "contact"    // Контакты
  | "general";   // Общий

interface SmartCTAProps {
  /** Контекст страницы */
  context: CTAContext;
  /** Дополнительные данные (slug события/меню) */
  slug?: string;
  /** Кастомный заголовок */
  title?: string;
  /** Кастомное описание */
  description?: string;
  /** Показывать альтернативные действия */
  showAlternatives?: boolean;
  /** Компактный режим (для боковой панели) */
  compact?: boolean;
}

// === КАРТЫ CTA ПО КОНТЕКСТУ ===

const CTA_MAP: Record<CTAContext, Omit<CTAConfig, "context">> & {
  alternatives?: Array<{ href: string; label: string; icon?: React.ReactNode }>;
} = {
  event: {
    primaryHref: "/plan/helper",
    primaryLabel: "Рассчитать стоимость",
    primaryDesc: "Ответим за 15 минут · Без обязательств",
    primaryIcon: Calculator,
    alternatives: [
      { href: "/contact", label: "Задать вопрос", icon: Phone },
      { href: "/menu", label: "Смотреть меню", icon: Utensils },
    ],
  },
  menu: {
    primaryHref: "/plan/constructor",
    primaryLabel: "Собрать своё меню",
    primaryDesc: "Выберите блюда поштучно под свой бюджет",
    primaryIcon: Utensils,
    alternatives: [
      { href: "/plan/helper", label: "Помочь выбрать", icon: Calculator },
      { href: "/pricing", label: "Смотреть цены", icon: FileText },
    ],
  },
  pricing: {
    primaryHref: "/plan/helper",
    primaryLabel: "Рассчитать точно",
    primaryDesc: "Индивидуальный расчёт под ваше событие",
    primaryIcon: Calculator,
    alternatives: [
      { href: "/contact", label: "Позвонить", icon: Phone },
      { href: "/menu", label: "Выбрать меню", icon: Utensils },
    ],
  },
  info: {
    primaryHref: "/contact",
    primaryLabel: "Связаться с нами",
    primaryDesc: "Перезвоним за 15 минут (9:00–21:00)",
    primaryIcon: Phone,
    alternatives: [
      { href: "/plan/helper", label: "Быстрый расчёт", icon: Calculator },
      { href: "/faq", label: "FAQ", icon: null },
    ],
  },
  contact: {
    primaryHref: "tel:+78129195911",
    primaryLabel: SITE.phone,
    primaryDesc: "Позвонить прямо сейчас",
    primaryIcon: Phone,
    alternatives: [
      { href: SITE.whatsapp, label: "WhatsApp", icon: null },
      { href: "/plan/helper", label: "Онлайн-расчёт", icon: Calculator },
    ],
  },
  general: {
    primaryHref: "/plan/helper",
    primaryLabel: "Начать подбор",
    primaryDesc: "3 вопроса — и мы предложим лучший вариант",
    primaryIcon: Calculator,
    alternatives: [
      { href: "/events", label: "Смотреть услуги", icon: null },
      { href: "/menu", label: "Смотреть меню", icon: Utensils },
    ],
  },
};

interface CTAConfig {
  context: CTAContext;
  primaryHref: string;
  primaryLabel: string;
  primaryDesc: string;
  primaryIcon: React.ComponentType<{ className?: string }>;
  alternatives?: Array<{ href: string; label: string; icon?: React.ComponentType<{ className?: string }> | null }>;
}

export default function SmartCTA({
  context,
  slug,
  title,
  description,
  showAlternatives = true,
  compact = false,
}: SmartCTAProps) {
  const config = CTA_MAP[context];
  const PrimaryIcon = config.primaryIcon;

  // Компактный режим — только кнопка
  if (compact) {
    return (
      <Link
        href={config.primaryHref}
        className="bg-primary hover:bg-primary/90 text-primary-foreground inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold no-underline shadow-sm transition-all hover:shadow-md"
      >
        <PrimaryIcon className="h-4 w-4" aria-hidden="true" />
        {config.primaryLabel}
      </Link>
    );
  }

  // Полный режим — карточка с описанием
  return (
    <section
      className="from-primary/5 to-gold-tint/10 border-gold-text/20 mt-12 overflow-hidden rounded-2xl border bg-gradient-to-br"
      aria-labelledby={`cta-${context}-${slug || "main"}`}
    >
      <div className="p-6 md:p-8">
        {/* Заголовок */}
        <div className="mb-4">
          <h2
            id={`cta-${context}-${slug || "main"}`}
            className="font-heading text-xl font-medium md:text-2xl"
          >
            {title || config.primaryLabel}
          </h2>
          {description && (
            <p className="text-muted-foreground mt-1">{description}</p>
          )}
          {!description && config.primaryDesc && (
            <p className="text-muted-foreground mt-1">{config.primaryDesc}</p>
          )}
        </div>

        {/* Основной CTA */}
        <Link
          href={config.primaryHref}
          className="bg-primary hover:bg-primary/90 text-primary-foreground inline-flex min-h-[48px] items-center gap-2.5 rounded-xl px-8 py-4 text-base font-semibold no-underline shadow-lg transition-all hover:shadow-xl"
        >
          <PrimaryIcon className="h-5 w-5" aria-hidden="true" />
          {config.primaryLabel}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>

        {/* Альтернативы */}
        {showAlternatives && config.alternatives && config.alternatives.length > 0 && (
          <div className="border-line/50 mt-5 flex flex-wrap gap-3 border-t pt-5">
            {config.alternatives.map((alt, i) => {
              const AltIcon = alt.icon;
              const isExternal = alt.href.startsWith("http") || alt.href.startsWith("tel:") || alt.href.startsWith("wa.me");
              
              return (
                <Link
                  key={i}
                  href={alt.href}
                  {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="text-muted-foreground hover:text-foreground hover:bg-secondary/60 inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
                >
                  {AltIcon && <AltIcon className="h-4 w-4" aria-hidden="true" />}
                  {alt.label}
                </Link>
              );
            })}
          </div>
        )}

        {/* Trust badge */}
        <p className="text-muted-foreground mt-4 flex items-center gap-2 text-xs">
          <span className="inline-flex h-2 w-2 rounded-full bg-green-500" aria-hidden="true" />
          Без спама · Без обязательств · Перезвоним за 15 минут
        </p>
      </div>
    </section>
  );
}

/**
 * StickyBottomCTA — плавающая кнопка внизу мобильного экрана
 * Показывается на длинных страницах для быстрого доступа к CTA
 */
interface StickyBottomCTAProps {
  href: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export function StickyBottomCTA({ href, label, icon: Icon }: StickyBottomCTAProps) {
  return (
    <div className="fixed bottom-20 right-4 z-40 md:hidden">
      <Link
        href={href}
        className="bg-primary text-primary-foreground flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold shadow-lg transition-transform active:scale-95"
      >
        {Icon && <Icon className="h-4 w-4" />}
        {label}
      </Link>
    </div>
  );
}
