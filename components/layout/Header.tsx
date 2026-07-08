'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { navItems } from '@/lib/data';
import { Menu, X, Phone } from 'lucide-react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="font-heading text-2xl md:text-3xl font-semibold text-cream tracking-wide"
            aria-label="Нилов Кейтеринг — на главную"
          >
            Нилов
            <span className="text-gold ml-1.5 font-normal text-lg md:text-xl">Кейтеринг</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Основная навигация">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium uppercase tracking-wider text-cream/70 hover:text-cream transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+78121234567"
              className="hidden sm:flex items-center gap-2 text-sm text-cream/70 hover:text-gold transition-colors duration-200"
              aria-label="Позвонить: +7 (812) 123-45-67"
            >
              <Phone className="w-4 h-4" />
              <span className="font-medium">+7 (812) 123-45-67</span>
            </a>

            <Link
              href="/contact"
              className="hidden md:inline-flex btn-primary text-xs uppercase tracking-wider"
            >
              Обсудить мероприятие
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 text-cream"
              aria-label={mobileOpen ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-background/98 backdrop-blur-lg z-40">
          <nav className="flex flex-col items-center justify-center h-full gap-8" aria-label="Мобильная навигация">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="font-heading text-3xl text-cream hover:text-gold transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4 flex flex-col items-center gap-4">
              <a
                href="tel:+78121234567"
                className="text-gold font-medium"
              >
                +7 (812) 123-45-67
              </a>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="btn-primary text-sm uppercase tracking-wider mt-2"
              >
                Обсудить мероприятие
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}