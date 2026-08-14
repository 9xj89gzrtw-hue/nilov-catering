"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Calculator,
  Phone,
  ArrowRight,
  FileText,
  Utensils,
  Shield,
  Clock,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { SITE } from "@/lib/data";

/**
 * SmartCTA — Premium contextual CTA with luxury aesthetics
 *
 * Inspired by:
 * - Stripe's hero CTAs
 * - Linear's landing pages
 * - Premium SaaS conversion sections
 *
 * Features:
 * - Animated gradient background
 * - Large, confident typography
 * - Satisfying button hover states
 * - Professional trust indicators
 * - Micro-interactions on all elements
 */

export type CTAContext =
  | "event" // Страница события
  | "menu" // Страница меню
  | "pricing" // Цены
  | "info" // Информационная страница
  | "contact" // Контакты
  | "general"; // Общий

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
  alternatives?: Array<{
    href: string;
    label: string;
    icon?: React.ComponentType<{ className?: string }> | null;
  }>;
}

// Trust indicators data
const TRUST_INDICATORS = [
  { icon: Shield, text: "Без спама" },
  { icon: Clock, text: "Ответ за 15 мин" },
  { icon: CheckCircle2, text: "Без обязательств" },
];

function PremiumButton({
  href,
  icon: Icon,
  children,
  isExternal = false,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  isExternal?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-[#6e5530] via-[#7a5f36] to-[#6e5530] bg-[length:200%_100%] px-8 py-4.5 font-semibold text-white shadow-[0_4px_20px_-4px_rgba(110,85,48,0.4)] transition-all duration-300 ${
        isHovered ? "scale-[1.02] bg-right shadow-[0_12px_40px_-4px_rgba(110,85,48,0.55)]" : ""
      } ${isPressed ? "scale-[0.98]" : ""}`}
      style={{
        animation: isHovered ? "gradientShift 2s ease infinite" : undefined,
      }}
    >
      {/* Glow effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />

      <Icon
        className="relative h-5 w-5 transition-transform duration-300 group-hover:rotate-6"
        aria-hidden="true"
      />
      <span className="relative text-base tracking-tight">{children}</span>
      <ArrowRight
        className={`relative h-4 w-4 transition-all duration-300 ${isHovered ? "translate-x-1 opacity-100" : "-translate-x-1 opacity-70"}`}
        aria-hidden="true"
      />

      <style jsx>{`
        @keyframes gradientShift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </Link>
  );
}

function SecondaryButton({
  href,
  icon: Icon,
  children,
  isExternal = false,
}: {
  href: string;
  icon?: React.ComponentType<{ className?: string }> | null;
  children: React.ReactNode;
  isExternal?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
        isHovered ? "bg-[#f2ece3] text-[#1c1815] shadow-sm" : "text-[#4a423b] hover:text-[#1c1815]"
      }`}
    >
      {Icon && (
        <Icon
          className={`h-4 w-4 transition-transform duration-300 ${isHovered ? "scale-110" : ""}`}
          aria-hidden="true"
        />
      )}
      <span className="relative">
        {children}
        <span
          className={`absolute bottom-0 left-0 h-px origin-left bg-current transition-all duration-300 ${
            isHovered ? "w-full scale-x-100" : "w-0 scale-x-0"
          }`}
        />
      </span>
    </Link>
  );
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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMouseInside, setIsMouseInside] = useState(false);

  // Track mouse position for gradient effect
  useEffect(() => {
    if (!isMouseInside || compact || typeof window === "undefined") return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMouseInside, compact]);

  // Компактный режим — только кнопка
  if (compact) {
    return (
      <Link
        href={config.primaryHref}
        className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl bg-gradient-to-r from-[#6e5530] to-[#7a5f36] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
      >
        <PrimaryIcon
          className="h-4 w-4 transition-transform group-hover:rotate-6"
          aria-hidden="true"
        />
        {config.primaryLabel}
        <ArrowRight
          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        />
      </Link>
    );
  }

  // Полный режим — премиум карточка с описанием
  return (
    <section
      className="relative mt-16 overflow-hidden"
      aria-labelledby={`cta-${context}-${slug || "main"}`}
      onMouseEnter={() => setIsMouseInside(true)}
      onMouseLeave={() => setIsMouseInside(false)}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#faf7f2] via-[#f5efe6] to-[#efe6d6]" />

        {/* Moving gradient orbs */}
        <div
          className="absolute h-[500px] w-[500px] rounded-full opacity-60 blur-[100px] transition-all duration-1000 ease-out"
          style={{
            background: "radial-gradient(circle, rgba(201,169,97,0.3) 0%, transparent 70%)",
            left: `${typeof window !== "undefined" ? (mousePos.x / window.innerWidth) * 100 : 50}%`,
            top: `${typeof window !== "undefined" ? (mousePos.y / window.innerHeight) * 30 : 15}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
        <div
          className="absolute top-1/2 right-0 h-[400px] w-[400px] translate-x-1/4 -translate-y-1/2 rounded-full opacity-40 blur-[80px]"
          style={{
            background: "radial-gradient(circle, rgba(110,85,48,0.25) 0%, transparent 70%)",
          }}
        />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #6e5530 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />

        {/* Border gradient */}
        <div className="absolute inset-0 rounded-3xl border border-[#e4dccf]/60" />
        <div className="pointer-events-none absolute inset-0 rounded-3xl border border-transparent bg-gradient-to-b from-[#c9a961]/20 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative px-8 py-12 md:px-12 md:py-16">
        <div className="max-w-3xl">
          {/* Header section */}
          <div className="mb-8">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#6e5530]/10 px-4 py-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[#6e5530]" />
              <span className="text-xs font-semibold tracking-wider text-[#6e5530] uppercase">
                Рекомендуем
              </span>
            </div>

            <h2
              id={`cta-${context}-${slug || "main"}`}
              className="font-heading text-3xl leading-tight font-bold tracking-tight text-[#1c1815] md:text-4xl"
            >
              {title || config.primaryLabel}
            </h2>

            {(description || config.primaryDesc) && (
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#4a423b]/80">
                {description || config.primaryDesc}
              </p>
            )}
          </div>

          {/* Primary CTA */}
          <div className="mb-8">
            <PremiumButton
              href={config.primaryHref}
              icon={PrimaryIcon}
              isExternal={
                config.primaryHref.startsWith("http") ||
                config.primaryHref.startsWith("tel:") ||
                config.primaryHref.startsWith("wa.me")
              }
            >
              {config.primaryLabel}
            </PremiumButton>
          </div>

          {/* Alternatives */}
          {showAlternatives && config.alternatives && config.alternatives.length > 0 && (
            <div className="flex flex-wrap items-center gap-3 border-t border-[#e4dccf]/50 pt-6">
              <span className="mr-2 text-xs font-medium tracking-wider text-[#4a423B]/50 uppercase">
                Или
              </span>
              {config.alternatives.map((alt, i) => {
                const AltIcon = alt.icon;
                const isExternal =
                  alt.href.startsWith("http") ||
                  alt.href.startsWith("tel:") ||
                  alt.href.startsWith("wa.me");

                return (
                  <SecondaryButton key={i} href={alt.href} icon={AltIcon} isExternal={isExternal}>
                    {alt.label}
                  </SecondaryButton>
                );
              })}
            </div>
          )}

          {/* Premium trust indicators */}
          <div className="mt-8 flex flex-wrap items-center gap-6">
            {TRUST_INDICATORS.map((indicator, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-[#4a423B]/70">
                <indicator.icon className="h-4 w-4 text-[#6e5530]/70" aria-hidden="true" />
                <span>{indicator.text}</span>
              </div>
            ))}
          </div>
        </div>
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
  const [isPressed, setIsPressed] = useState(false);

  return (
    <div className="fixed right-4 bottom-24 z-40 md:hidden">
      <Link
        href={href}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        className={`group relative flex items-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-[#6e5530] to-[#7a5f36] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_32px_-4px_rgba(110,85,48,0.5)] transition-all duration-200 ${
          isPressed ? "scale-95" : "hover:scale-105"
        }`}
      >
        {/* Pulse ring animation */}
        <span className="absolute inset-0 animate-ping rounded-full border-2 border-white/30 opacity-20" />

        {Icon && <Icon className="relative h-4 w-4" />}
        <span className="relative">{label}</span>
        <ArrowRight className="relative h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
