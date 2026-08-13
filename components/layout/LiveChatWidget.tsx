"use client";

import { useEffect, useState, useRef } from "react";
import { MessageCircle, X } from "lucide-react";

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
    const timer = setTimeout(() => setVisible(true), 30000);
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.5) {
        setVisible(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Escape to close + focus management
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        fabRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    // Focus first link in panel
    const firstLink = panelRef.current?.querySelector("a, button") as HTMLElement | null;
    firstLink?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (!visible) return null;

  return (
    <>
      {/* Chat panel — dialog semantics for a11y */}
      {open && (
        <div
          ref={panelRef}
          className="bg-card border-line fixed right-4 bottom-36 z-50 w-80 max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border shadow-xl md:bottom-24"
          role="dialog"
          aria-modal="true"
          aria-label="Быстрая связь с NiloV Catering"
        >
          {/* Header */}
          <div className="bg-foreground text-background flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="bg-gold-tint flex h-10 w-10 items-center justify-center rounded-full">
                <svg
                  className="text-gold-text h-5 w-5"
                  viewBox="0 0 40 40"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M11 29 L11 11 L29 29 L29 11"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold">NiloV Catering</p>
                <p className="text-background/90 text-xs">Отвечаем за 15 минут</p>
              </div>
            </div>
            <button
              onClick={() => {
                setOpen(false);
                fabRef.current?.focus();
              }}
              className="hover:bg-background/10 flex h-11 w-11 items-center justify-center rounded-lg transition-colors"
              aria-label="Закрыть чат"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          <div className="space-y-2 p-4">
            <div className="bg-secondary rounded-xl p-3 text-sm">
              <p className="text-foreground mb-1 font-medium">Здравствуйте!</p>
              <p className="text-muted-foreground">
                Помогу подобрать меню и рассчитать цену. Какой повод и сколько гостей?
              </p>
            </div>

            <a
              href="https://wa.me/78129195911?text=Здравствуйте!%20Хочу%20рассчитать%20кейтеринг"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="border-line hover:border-gold-text flex items-center gap-3 rounded-xl border p-3 no-underline transition-colors"
            >
              <MessageCircle className="text-gold-text h-5 w-5 shrink-0" aria-hidden="true" />
              <div>
                <p className="text-foreground text-sm font-medium">Написать в WhatsApp</p>
                <p className="text-muted-foreground text-xs">Быстрый ответ — 15 минут</p>
              </div>
            </a>
            <a
              href="/plan/helper"
              className="border-line hover:border-gold-text flex items-center gap-3 rounded-xl border p-3 no-underline transition-colors"
            >
              <div className="text-gold-text flex h-5 w-5 shrink-0 items-center justify-center text-sm font-semibold">
                ?
              </div>
              <div>
                <p className="text-foreground text-sm font-medium">Рассчитать меню — 30 секунд</p>
                <p className="text-muted-foreground text-xs">3 вопроса, без звонка</p>
              </div>
            </a>
            <a
              href="tel:+78129195911"
              className="border-line hover:border-gold-text flex items-center gap-3 rounded-xl border p-3 no-underline transition-colors"
            >
              <div className="text-gold-text flex h-5 w-5 shrink-0 items-center justify-center text-sm font-semibold">
                ☎
              </div>
              <div>
                <p className="text-foreground text-sm font-medium">Позвонить</p>
                <p className="text-muted-foreground text-xs">+7 (812) 919-59-11</p>
              </div>
            </a>
          </div>
        </div>
      )}

      {/* Floating button — above bottom nav (bottom-24 on mobile, bottom-4 on desktop) */}
      <button
        ref={fabRef}
        onClick={() => setOpen(!open)}
        className="bg-primary text-primary-foreground hover:bg-primary/90 fixed right-4 bottom-24 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-colors md:bottom-4"
        aria-label={open ? "Закрыть чат" : "Открыть чат"}
        aria-expanded={open}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </>
  );
}
