'use client';

import Link from 'next/link';
import { Phone, Calculator, MessageCircle } from 'lucide-react';
import { SITE } from '@/lib/data';
import TextSizeToggle from '@/components/effects/TextSizeToggle';
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
          aria-label="NiloV Catering — на главную"
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
            {/* Real N shape: top-left bottom-left top-right bottom-right */}
            <path
              d="M11 29 L11 11 L29 29 L29 11"
              stroke="#FFFEF7"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Accent dot for the "V" of NiloV */}
            <circle cx="31" cy="9" r="2" fill="#F4E2B8" />
          </svg>
          <div className="flex flex-col leading-none">
            <span className="font-heading text-xl font-semibold tracking-tight text-foreground group-hover:text-gold-text transition-colors">
              NiloV
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground mt-0.5">
              Catering · СПб
            </span>
          </div>
        </Link>

        {/* Desktop nav — MegaMenu visible md+ (was lg+ only) */}
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
          <Link href="/gallery" className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary/50 no-underline">
            Галерея
          </Link>
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <TextSizeToggle />
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-line text-foreground hover:text-gold-text hover:border-gold-text transition-colors"
            aria-label="Написать в WhatsApp"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
          </a>
          <a
            href={`tel:${SITE.phoneTel}`}
            className="hidden lg:inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-gold-text transition-colors whitespace-nowrap no-underline"
            aria-label={`Позвонить ${SITE.phone}`}
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
            <span>{SITE.phone}</span>
          </a>
          <Link
            href="/plan/helper"
            className="hidden md:inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm no-underline"
          >
            <Calculator className="w-4 h-4" aria-hidden="true" />
            Рассчитать меню
          </Link>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-1 shrink-0">
          <TextSizeToggle />
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-line text-foreground hover:text-gold-text hover:border-gold-text transition-colors"
            aria-label="Написать в WhatsApp"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
          </a>
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
