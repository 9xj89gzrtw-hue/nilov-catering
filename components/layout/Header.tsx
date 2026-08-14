import Link from "next/link";
import { Phone, Calculator } from "lucide-react";
import { SITE } from "@/lib/data";
import MobileMenu from "@/components/layout/MobileMenu";
import MegaMenu from "@/components/layout/MegaMenu";

/**
 * Header — чистая навигация по принципам UX 2026:
 *
 * Структура (6 пунктов — sweet spot!):
 * [Logo] [Услуги ▾] [Меню ▾] [Галерея] [Цены] [Контакты]
 *                                              [📞][Рассчитать →]
 *
 * Принципы:
 * - 5-7 пунктов в главном меню
 * - Логичная группировка с точки зрения КЛИЕНТА
 * - CTA всегда на виду
 * - Mobile: отдельное меню + bottom nav
 */
export default function Header() {
  return (
    <header
      className="border-line/60 bg-background/90 fixed top-0 right-0 left-0 z-50 border-b shadow-sm backdrop-blur-lg"
      role="banner"
    >
      <nav
        className="container-site flex h-16 items-center justify-between gap-3"
        aria-label="Главная навигация"
      >
        {/* Logo — NiloV monogram */}
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2"
          aria-label="NiloV Catering — на главную"
        >
          <svg
            className="h-9 w-9 transition-transform group-hover:scale-105"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="nilov-gold"
                x1="0"
                y1="0"
                x2="40"
                y2="40"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#C9A66B" />
                <stop offset="1" stopColor="#8C7140" />
              </linearGradient>
            </defs>
            <rect width="40" height="40" rx="8" fill="url(#nilov-gold)" />
            <path
              d="M11 29 L11 11 L29 29 L29 11"
              stroke="#FFFEF7"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <circle cx="31" cy="9" r="2" fill="#F4E2B8" />
          </svg>
          <div className="flex flex-col leading-none">
            <span
              className="font-heading text-foreground group-hover:text-gold-text text-xl font-semibold tracking-tight transition-colors"
              style={{ color: "#1C1815" }}
            >
              NiloV
            </span>
            <span className="text-muted-foreground mt-0.5 text-xs tracking-[0.18em] uppercase">
              Catering · СПб
            </span>
          </div>
        </Link>

        {/* Desktop nav — MegaMenu + ключевые ссылки */}
        <div className="hidden items-center gap-1 md:flex">
          {/* Dropdown меню (Услуги + Меню) */}
          <MegaMenu />

          {/* Прямые ссылки — только самые важные! */}
          <Link
            href="/gallery"
            className="text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-md px-3 py-2 text-sm no-underline transition-colors"
          >
            Галерея
          </Link>
          <Link
            href="/pricing"
            className="text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-md px-3 py-2 text-sm no-underline transition-colors"
          >
            Цены
          </Link>
          <Link
            href="/contact"
            className="text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-md px-3 py-2 text-sm no-underline transition-colors"
          >
            Контакты
          </Link>
        </div>

        {/* Right side — контакты + CTA */}
        <div className="hidden shrink-0 items-center gap-2 md:flex">
          {/* WhatsApp */}
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="border-line text-foreground hover:text-gold-text hover:border-gold-text inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors"
            aria-label="Написать в WhatsApp"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.6 6.31A7.85 7.85 0 0 0 12.05 4 7.94 7.94 0 0 0 4.1 11.94a7.84 7.84 0 0 0 1.07 3.97L4 20l4.2-1.1a7.93 7.93 0 0 0 3.85 1h.01a7.94 7.94 0 0 0 7.94-7.94 7.85 7.85 0 0 0-2.4-5.65Zm-5.55 12.21h-.01a6.55 6.55 0 0 1-3.34-.92l-.24-.14-2.49.65.67-2.43-.16-.25a6.6 6.6 0 0 1 10.27-8.16 6.6 6.6 0 0 1-4.7 11.25Zm3.62-4.94c-.2-.1-1.18-.58-1.36-.65-.18-.07-.31-.1-.45.1-.13.2-.51.65-.63.78-.11.13-.23.15-.43.05a5.4 5.4 0 0 1-1.6-.99 6 6 0 0 1-1.1-1.37c-.12-.2 0-.3.08-.4.09-.09.2-.23.3-.35.1-.12.13-.2.2-.34.06-.13.03-.25-.02-.35-.05-.1-.45-1.08-.62-1.48-.16-.39-.33-.34-.45-.34l-.39-.01a.74.74 0 0 0-.53.25c-.18.2-.7.68-.7 1.66s.71 1.92.81 2.05c.1.13 1.4 2.14 3.4 3.4 3 .47.2.84.33 1.13.42.48.15.91.13 1.25.08.38-.06 1.18-.48 1.35-.95.16-.46.16-.86.11-.95-.05-.08-.18-.13-.38-.23Z" />
            </svg>
          </a>

          {/* Телефон */}
          <a
            href={`tel:${SITE.phoneTel}`}
            className="text-foreground hover:text-gold-text hidden items-center gap-1.5 text-sm font-medium no-underline transition-colors lg:inline-flex"
            aria-label={`Позвонить ${SITE.phone}`}
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span>{SITE.phone}</span>
          </a>

          {/* Главный CTA — Рассчитать */}
          <Link
            href="/plan/helper"
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex min-h-[44px] items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold no-underline shadow-sm transition-colors"
          >
            <Calculator className="h-4 w-4" aria-hidden="true" />
            Рассчитать
          </Link>
        </div>

        {/* Mobile trigger */}
        <div className="flex shrink-0 items-center gap-1 md:hidden">
          <a
            href={`tel:${SITE.phoneTel}`}
            className="border-line text-foreground hover:text-gold-text hover:border-gold-text inline-flex h-11 w-11 items-center justify-center rounded-lg border transition-colors"
            aria-label={`Позвонить ${SITE.phone}`}
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
          </a>
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}
