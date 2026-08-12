'use client';

import { useEffect, useState, useRef } from 'react';
import { MessageCircle, X } from 'lucide-react';

/**
 * LiveChatWidget — floating WhatsApp/helper/phone panel.
 *
 * Mobile critic: "FAB bottom-4 right-4 overlaps MobileBottomNav"
 * Fix: FAB at bottom-24 (above bottom nav h-16=64px + 32px gap)
 *
 * A11y critic: "No dialog semantics, no Escape, no focus trap"
 * Fix: role="dialog", aria-modal, Escape handler, focus management
 */
export default function LiveChatWidget() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const timer = setTimeout(() =>setVisible(true), 30000);
    const onScroll = () => {
      if (window.scrollY >window.innerHeight * 0.5) {
        setVisible(true);
        window.removeEventListener('scroll', onScroll);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { clearTimeout(timer); window.removeEventListener('scroll', onScroll); };
  }, []);

  // Escape to close + focus management
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        fabRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    // Focus first link in panel
    const firstLink = panelRef.current?.querySelector('a, button') as HTMLElement | null;
    firstLink?.focus();
    return () =>document.removeEventListener('keydown', onKey);
  }, [open]);

  if (!visible) return null;

  return (
    <>
      {/* Chat panel — dialog semantics for a11y */}
      {open && (
        <div
          ref={panelRef}
          className="fixed bottom-36 right-4 z-50 w-80 max-w-[calc(100vw-2rem)] bg-card border border-line rounded-2xl shadow-xl overflow-hidden md:bottom-24"
          role="dialog"
          aria-modal="true"
          aria-label="Быстрая связь с NiloV Catering"
        >
          {/* Header */}
          <div className="bg-foreground text-background p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold-tint flex items-center justify-center">
                <svg className="w-5 h-5 text-gold-text" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                  <path d="M11 29 L11 11 L29 29 L29 11" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-sm">NiloV Catering</p>
                <p className="text-xs text-background/90">Отвечаем за 15 минут</p>
              </div>
            </div>
            <button
              onClick={() => { setOpen(false); fabRef.current?.focus(); }}
              className="w-11 h-11 flex items-center justify-center rounded-lg hover:bg-background/10 transition-colors"
              aria-label="Закрыть чат"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-2">
            <div className="bg-secondary rounded-xl p-3 text-sm">
              <p className="font-medium text-foreground mb-1">Здравствуйте!</p>
              <p className="text-muted-foreground">
                Помогу подобрать меню и рассчитать цену. Какой повод и сколько гостей?
              </p>
            </div>

            <a
              href="https://wa.me/78129195911?text=Здравствуйте!%20Хочу%20рассчитать%20кейтеринг"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl border border-line hover:border-gold-text transition-colors no-underline"
            >
              <MessageCircle className="w-5 h-5 text-gold-text shrink-0" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium text-foreground">Написать в WhatsApp</p>
                <p className="text-xs text-muted-foreground">Быстрый ответ — 15 минут</p>
              </div>
            </a>
            <a
              href="/plan/helper"
              className="flex items-center gap-3 p-3 rounded-xl border border-line hover:border-gold-text transition-colors no-underline"
            >
              <div className="w-5 h-5 shrink-0 flex items-center justify-center text-gold-text font-semibold text-sm">?</div>
              <div>
                <p className="text-sm font-medium text-foreground">Рассчитать меню — 30 секунд</p>
                <p className="text-xs text-muted-foreground">3 вопроса, без звонка</p>
              </div>
            </a>
            <a
              href="tel:+78129195911"
              className="flex items-center gap-3 p-3 rounded-xl border border-line hover:border-gold-text transition-colors no-underline"
            >
              <div className="w-5 h-5 shrink-0 flex items-center justify-center text-gold-text font-semibold text-sm">☎</div>
              <div>
                <p className="text-sm font-medium text-foreground">Позвонить</p>
                <p className="text-xs text-muted-foreground">+7 (812) 919-59-11</p>
              </div>
            </a>
          </div>
        </div>
      )}

      {/* Floating button — above bottom nav (bottom-24 on mobile, bottom-4 on desktop) */}
      <button
        ref={fabRef}
        onClick={() =>setOpen(!open)}
        className="fixed bottom-24 right-4 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors flex items-center justify-center md:bottom-4"
        aria-label={open ? 'Закрыть чат' : 'Открыть чат'}
        aria-expanded={open}
      >
        {open ? <X className="w-6 h-6" />: <MessageCircle className="w-6 h-6" />}
      </button>
    </>
  );
}
