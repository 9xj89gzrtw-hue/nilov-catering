'use client';

import Link from 'next/link';
import { Phone, Calculator } from 'lucide-react';
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
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0 group"
          aria-label="NiloV Catering — на главную"
        >
          <svg
            className="w-8 h-8 group-hover:scale-105 transition-transform"
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
            <path
              d="M12 28 L12 12 L20 22 L28 12 L28 28"
              stroke="#FFFEF7"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <span className="font-heading text-xl font-semibold tracking-tight text-foreground group-hover:text-gold-text transition-colors">
            NiloV
          </span>
        </Link>

        {/* Desktop nav */}
        <MegaMenu />

        <ul className="hidden md:flex items-center gap-1" role="list">
          <li>
            <Link href="/gallery" className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary/50">
              Галерея
            </Link>
          </li>
          <li>
            <Link href="/pricing" className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary/50">
              Тарифы
            </Link>
          </li>
          <li>
            <Link href="/why-us" className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary/50">
              О нас
            </Link>
          </li>
        </ul>


        {/* Language switcher */}
        <Link
          href="/en"
          className="hidden md:inline-flex items-center text-xs text-muted-foreground hover:text-foreground transition-colors px-2"
          aria-label="Switch to English"
        >
          EN
        </Link>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <TextSizeToggle />
          <a
            href={`tel:${SITE.phoneTel}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-gold-text transition-colors whitespace-nowrap"
            aria-label={`Позвонить ${SITE.phone}`}
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
            <span className="hidden lg:inline">{SITE.phone}</span>
            <span className="lg:hidden">Позвонить</span>
          </a>
          <Link
            href="/plan/calculator"
            className="hidden lg:inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
          >
            <Calculator className="w-4 h-4" aria-hidden="true" />
            Калькулятор
          </Link>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-1 shrink-0">
          <TextSizeToggle />
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
