import Link from 'next/link';
import { Phone, Calculator } from 'lucide-react';
import { SITE } from '@/lib/data';
import MobileMenu from '@/components/layout/MobileMenu';
import MegaMenu from '@/components/layout/MegaMenu';

export default function Header() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b border-line/60 bg-background/90 backdrop-blur-lg shadow-sm"
      role="banner"
    >
      <nav
        className="container-site flex h-16 items-center justify-between gap-3"
        aria-label="Главная навигация"
      >
        {/* Logo — NiloV monogram: real N (not M) */}
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0 group"
          aria-label="NiloV Catering — на главную. CATERING · СПБ"
        >
          <svg
            className="w-9 h-9 group-hover:scale-105 transition-transform"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="nilov-gold" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                <stop stopColor="#C9A66B" />
                <stop offset="1" stopColor="#8C7140" />
              </linearGradient>
            </defs>
            <rect width="40" height="40" rx="8" fill="url(#nilov-gold)" />
            {/* Real N shape: top-left → bottom-left → top-right → bottom-right */}
            <path
              d="M11 29 L11 11 L29 29 L29 11"
              stroke="#FFFEF7"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Accent dot for the "V" of NiloV — small gold-soft dot at top-right */}
            <circle cx="31" cy="9" r="2" fill="#F4E2B8" />
          </svg>
          <div className="flex flex-col leading-none">
            <span className="font-heading text-xl font-semibold tracking-tight text-foreground group-hover:text-gold-text transition-colors">
              NiloV
            </span>
            <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground mt-0.5">
              Catering · СПб
            </span>
          </div>
        </Link>

        {/* Desktop nav — MegaMenu visible md+ (was lg only) */}
        <div className="hidden md:flex items-center gap-1">
          <MegaMenu />
          <Link href="/menu/catalog" className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary/50 no-underline">
            Каталог блюд
          </Link>
          <Link href="/pricing" className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary/50 no-underline">
            Тарифы
          </Link>
          <Link href="/why-us" className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary/50 no-underline">
            О нас
          </Link>
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-line text-foreground hover:text-gold-text hover:border-gold-text transition-colors"
            aria-label="Написать в WhatsApp"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.6 6.31A7.85 7.85 0 0 0 12.05 4 7.94 7.94 0 0 0 4.1 11.94a7.84 7.84 0 0 0 1.07 3.97L4 20l4.2-1.1a7.93 7.93 0 0 0 3.85 1h.01a7.94 7.94 0 0 0 7.94-7.94 7.85 7.85 0 0 0-2.4-5.65Zm-5.55 12.21h-.01a6.55 6.55 0 0 1-3.34-.92l-.24-.14-2.49.65.67-2.43-.16-.25a6.6 6.6 0 0 1 10.27-8.16 6.6 6.6 0 0 1-4.7 11.25Zm3.62-4.94c-.2-.1-1.18-.58-1.36-.65-.18-.07-.31-.1-.45.1-.13.2-.51.65-.63.78-.11.13-.23.15-.43.05a5.4 5.4 0 0 1-1.6-.99 6 6 0 0 1-1.1-1.37c-.12-.2 0-.3.08-.4.09-.09.2-.23.3-.35.1-.12.13-.2.2-.34.06-.13.03-.25-.02-.35-.05-.1-.45-1.08-.62-1.48-.16-.39-.33-.34-.45-.34l-.39-.01a.74.74 0 0 0-.53.25c-.18.2-.7.68-.7 1.66s.71 1.92.81 2.05c.1.13 1.4 2.14 3.4 3 .47.2.84.33 1.13.42.48.15.91.13 1.25.08.38-.06 1.18-.48 1.35-.95.16-.46.16-.86.11-.95-.05-.08-.18-.13-.38-.23Z"/>
            </svg>
          </a>
          <a
            href={`tel:${SITE.phoneTel}`}
            className="hidden lg:inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-gold-text transition-colors no-underline"
            aria-label={`Позвонить ${SITE.phone}`}
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
            <span>{SITE.phone}</span>
          </a>
          <Link
            href="/plan/helper"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm no-underline"
          >
            <Calculator className="w-4 h-4" aria-hidden="true" />
            Рассчитать меню
          </Link>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-1 shrink-0">
          <a
            href={`tel:${SITE.phoneTel}`}
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-line text-foreground hover:text-gold-text hover:border-gold-text transition-colors"
            aria-label={`Позвонить ${SITE.phone}`}
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
          </a>
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}
