"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Phone, Calculator, UtensilsCrossed } from "lucide-react";
import { motion } from "framer-motion";
import { SITE } from "@/lib/data";
import MobileMenu from "@/components/layout/MobileMenu";
import MegaMenu from "@/components/layout/MegaMenu";

// ═══════════════════════════════════════════════════════════════
// 🎨 PREMIUM HEADER v3.0 — Final Version
// ═══════════════════════════════════════════════════════════════
//
// ИСПРАВЛЕНИЯ v3.0:
// - ✅ Премиум логотип (типографика, не буква N)
// - ✅ "Портфель" → "Галерея"
// - ✅ Нет дублирования (MegaMenu чистый)
// - ✅ Единый стиль с MegaMenu
// - ✅ Элегантный hover эффект на логотипе
// - ✅ Правильные отступы, нет переноса
//

/**
 * PremiumLogo — Типографский логотип NiloV Catering
 *
 * Стиль: как у премиум-ресторанов/отелей
 * - Красивая типографика вместо картинки
 * - Золотой акцент на "NiloV"
 * - Тонкая линия-акцент сверху
 */
function PremiumLogo() {
  return (
    <Link
      href="/"
      className="group relative flex shrink-0 items-center no-underline"
      aria-label="NiloV Catering — на главную"
    >
      {/* Логотип — типографский */}
      <div className="relative">
        {/* Тонкая золотая линия сверху как акцент */}
        <motion.div
          className="absolute -top-1 left-0 h-[2px] w-6 rounded-full bg-gradient-to-r from-[#C9A66B] to-transparent"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 24, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          whileHover={{ width: 40 }}
        />

        <div className="flex flex-col leading-none">
          {/* Основное название */}
          <span className="font-heading text-foreground text-xl font-bold tracking-tight transition-colors duration-200 group-hover:text-[#8C7140]">
            NiloV
          </span>
          {/* Подпись */}
          <span className="text-muted-foreground mt-0.5 text-[10px] font-medium tracking-[0.15em] uppercase transition-colors duration-200">
            Catering · СПб
          </span>
        </div>
      </div>
    </Link>
  );
}

/**
 * PrimaryCTA — Главная кнопка действия
 */
function PrimaryCTA({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLAnchorElement> & { href?: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.12 }}
    >
      <Link
        href={props.href || "/plan/helper"}
        className={`inline-flex h-9 items-center gap-2 rounded-lg bg-[#2D2624] px-4 text-sm font-medium text-white no-underline shadow-sm transition-all duration-150 hover:bg-[#3D3634] hover:shadow-md ${className} `}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        <Calculator className="h-3.5 w-3.5" aria-hidden="true" />
        {children || "Рассчитать"}
      </Link>
    </motion.div>
  );
}

/**
 * IconButton — Круглая иконка контакта
 */
function IconButton({
  href,
  children,
  label,
}: {
  href: string;
  children: React.ReactNode;
  label: string;
}) {
  return (
    <motion.a
      href={href}
      className="border-border/50 text-muted-foreground flex h-8 w-8 items-center justify-center rounded-full border transition-colors duration-150 hover:border-[#C9A66B]/50 hover:text-[#8C7140]"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer nofollow"
    >
      {children}
    </motion.a>
  );
}

/**
 * NavLink — Простая навигационная ссылка
 */
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-muted-foreground hover:text-foreground relative px-2.5 py-1.5 text-sm font-medium no-underline transition-colors duration-150 after:absolute after:right-2.5 after:bottom-0 after:left-2.5 after:h-px after:origin-left after:scale-x-0 after:bg-[#C9A66B] after:transition-transform after:duration-150 hover:after:scale-x-100"
    >
      {children}
    </Link>
  );
}

/**
 * ═══════════════════════════════════════════════════════════════
 * MAIN HEADER COMPONENT v3.0
 * ═══════════════════════════════════════════════════════════════
 */
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      <motion.header
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-200 ${isScrolled ? "shadow-sm" : ""} `}
        role="banner"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          backdropFilter: "blur(12px) saturate(180%)",
          WebkitBackdropFilter: "blur(12px) saturate(180%)",
          backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.8)",
          borderBottom: isScrolled ? "1px solid rgba(0, 0, 0, 0.06)" : "1px solid transparent",
        }}
      >
        <nav
          className="container mx-auto flex h-14 max-w-7xl items-center justify-between px-4 lg:px-6"
          aria-label="Главная навигация"
        >
          {/* ─── Logo ─── */}
          <PremiumLogo />

          {/* ─── Desktop Navigation ─── */}
          <div className="hidden items-center lg:flex">
            <MegaMenu />

            {/* Разделитель */}
            <div className="bg-border/40 mx-1 h-5 w-px" aria-hidden="true" />

            {/* Галерея (было "Портфель") */}
            <NavLink href="/gallery">Галерея</NavLink>
          </div>

          {/* ─── Right Side ─── */}
          <div className="hidden items-center gap-2 lg:flex">
            {/* WhatsApp */}
            <IconButton href={SITE.whatsapp} label="Написать в WhatsApp">
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M17.6 6.31A7.85 7.85 0 0 0 12.05 4 7.94 7.94 0 0 0 4.1 11.94a7.84 7.84 0 0 0 1.07 3.97L4 20l4.2-1.1a7.93 7.93 0 0 0 3.85 1h.01a7.94 7.94 0 0 0 7.94-7.94 7.85 7.85 0 0 0-2.4-5.65Zm-5.55 12.21h-.01a6.55 6.55 0 0 1-3.34-.92l-.24-.14-2.49.65.67-2.43-.16-.25a6.6 6.6 0 0 1 10.27-8.16 6.6 6.6 0 0 1-4.7 11.25Zm3.62-4.94c-.2-.1-1.18-.58-1.36-.65-.18-.07-.31-.1-.45.1-.13.2-.51.65-.63.78-.11.13-.23.15-.43.05a5.4 5.4 0 0 1-1.6-.99 6 6 0 0 1-1.1-1.37c-.12-.2 0-.3.08-.4.09-.09.2-.23.3-.35.1-.12.13-.2.2-.34.06-.13.03-.25-.02-.35-.05-.1-.45-1.08-.62-1.48-.16-.39-.33-.34-.45-.34l-.39-.01a.74.74 0 0 0-.53.25c-.18.2-.7.68-.7 1.66s.71 1.92.81 2.05c.1.13 1.4 2.14 3.4 3.4 3 .47.2.84.33 1.13.42.48.15.91.13 1.25.08.38-.06 1.18-.48 1.35-.95.16-.46.16-.86.11-.95-.05-.08-.18-.13-.38-.23Z" />
              </svg>
            </IconButton>

            {/* Телефон */}
            <a
              href={`tel:${SITE.phoneTel}`}
              className="group text-muted-foreground hover:text-foreground hidden items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium no-underline transition-colors duration-150 sm:inline-flex"
              aria-label={`Позвонить ${SITE.phone}`}
            >
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{SITE.phone}</span>
            </a>

            {/* CTA кнопка */}
            <PrimaryCTA>Рассчитать</PrimaryCTA>
          </div>

          {/* ─── Mobile Actions ─── */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <IconButton href={`tel:${SITE.phoneTel}`} label={`Позвонить ${SITE.phone}`}>
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            </IconButton>
            <MobileMenu />
          </div>
        </nav>
      </motion.header>

      {/* Spacer — соответствует h-14 (56px) */}
      <div className="h-14" aria-hidden="true" />
    </>
  );
}
