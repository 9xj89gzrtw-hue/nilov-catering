'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { SITE } from '@/lib/data';

// 5 ключевых + 5 дополнительных (доступны через "Ещё")
const KEY_LINKS = [
  { href: '/', label: 'Главная' },
  { href: '/events', label: 'События' },
  { href: '/menu', label: 'Меню' },
  { href: '/pricing', label: 'Тарифы' },
  { href: '/plan/helper', label: 'Рассчитать' },
];

const EXTRA_LINKS = [
  { href: '/menu/catalog', label: 'Каталог блюд' },
  { href: '/reviews', label: 'Отзывы' },
  { href: '/why-us', label: 'Почему мы' },
  { href: '/gallery', label: 'Галерея' },
  { href: '/blog', label: 'Блог' },
  { href: '/contact', label: 'Контакты' },
  { href: '/faq', label: 'Вопросы' },
  { href: '/delivery/order', label: 'Доставка' },
  { href: '/delivery', label: 'Зоны доставки' },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!mounted) return null;

  return (
    <>
      {/* Trigger — hamburger */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden flex items-center justify-center w-11 h-11 -mr-2 text-foreground"
        aria-label="Открыть меню"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <svg width="22" height="18" viewBox="0 0 22 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M3 3h16M3 9h16M3 15h10" />
        </svg>
      </button>

      {/* Portal panel — proper dialog for a11y */}
      {createPortal(
        <AnimatePresence>
          {open && (
            <div
              className="fixed inset-0 z-[200] md:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Мобильное меню навигации"
            >
              {/* Backdrop */}
              <motion.button
                className="absolute inset-0 bg-foreground/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
                aria-label="Закрыть меню"
                tabIndex={-1}
              />

              {/* Panel */}
              <motion.div
                className="absolute top-0 right-0 w-80 max-w-[85vw] h-full bg-card border-l border-line shadow-2xl flex flex-col"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') setOpen(false);
                }}
              >
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-line">
                  <span className="font-heading text-lg font-semibold">Меню</span>
                  <button
                    onClick={() => setOpen(false)}
                    className="w-11 h-11 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors"
                    aria-label="Закрыть меню"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M5 5l10 10M5 15L15 5" />
                    </svg>
                  </button>
                </div>

                {/* Key links */}
                <nav className="flex-1 overflow-y-auto overscroll-contain py-2" aria-label="Мобильное меню">
                  {KEY_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center px-6 py-4 text-base font-medium text-foreground hover:bg-secondary active:bg-secondary transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}

                  {/* Extra links section */}
                  <div className="mt-4 px-6 pt-4 border-t border-line">
                    <p className="text-xs text-muted-foreground mb-3">Ещё</p>
                    {EXTRA_LINKS.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary active:bg-secondary transition-colors rounded-lg"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </nav>

                {/* Bottom actions — phone + WhatsApp + CTA */}
                <div className="p-5 border-t border-line space-y-3">
                  <div className="flex gap-2">
                    <a
                      href={`tel:${SITE.phoneTel}`}
                      className="flex items-center justify-center gap-2 flex-1 rounded-lg border-2 border-gold-text py-4 text-base font-semibold text-gold-text active:bg-gold-tint transition-colors"
                    >
                       {SITE.phone}
                    </a>
                    <a
                      href={SITE.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Написать в WhatsApp"
                      className="flex items-center justify-center w-14 rounded-lg border-2 border-emerald-500 text-emerald-600 active:bg-emerald-50 transition-colors"
                    >
                      💬
                    </a>
                  </div>
                  <Link
                    href="/plan/helper"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 w-full rounded-lg bg-primary py-4 text-base font-semibold text-primary-foreground active:scale-[0.98] transition-transform no-underline"
                  >
                    Рассчитать меню — 3 вопроса
                  </Link>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}