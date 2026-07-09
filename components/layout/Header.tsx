'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useSpring } from 'framer-motion';
import { navItems } from '@/lib/data';
import { Menu, X, Phone } from 'lucide-react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

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
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="scroll-progress"
        style={{ scaleX }}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-border/50'
            : 'bg-transparent'
        }`}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="font-heading text-2xl md:text-[1.7rem] font-semibold text-cream tracking-wide cursor-hover"
              aria-label="Нилов Кейтеринг — на главную"
            >
              Нилов
              <span className="text-gold ml-1.5 font-normal text-lg md:text-xl">Кейтеринг</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8" aria-label="Основная навигация">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[11px] font-medium uppercase tracking-[0.15em] text-cream/50 hover:text-cream transition-colors duration-300 cursor-hover relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </nav>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-4">
              <a
                href="tel:+78121234567"
                className="hidden md:flex items-center gap-2 text-sm text-cream/50 hover:text-gold transition-colors duration-300 cursor-hover"
                aria-label="Позвонить: +7 (812) 123-45-67"
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="text-xs font-medium tracking-wide">+7 (812) 123-45-67</span>
              </a>

              <Link
                href="/contact"
                className="hidden md:inline-flex btn-primary text-[10px] uppercase tracking-wider cursor-hover"
              >
                Обсудить
              </Link>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden flex items-center justify-center w-10 h-10 text-cream cursor-hover"
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
          <motion.div
            className="lg:hidden fixed inset-0 top-0 bg-[#0A0A0A] z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-heading text-3xl text-cream hover:text-gold transition-colors duration-300 cursor-hover block"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                className="mt-8 flex flex-col items-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <a href="tel:+78121234567" className="text-gold font-medium text-lg">
                  +7 (812) 123-45-67
                </a>
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary text-sm uppercase tracking-wider mt-2 cursor-hover"
                >
                  Обсудить мероприятие
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </header>
    </>
  );
}