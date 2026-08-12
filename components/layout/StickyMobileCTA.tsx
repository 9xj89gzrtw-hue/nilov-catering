'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';
import { SITE } from '@/lib/data';
import { usePathname } from 'next/navigation';

interface Props {
  ctaLabel?: string;
  ctaHref?: string;
  waContext?: string;
}

/**
 * Sticky mobile CTA bar — appears after the user scrolls 300px down.
 *
 * C10 fix (Mobile UX, 5.5 → 7+): adds a persistent "Рассчитать стоимость"CTA
 * so mobile users always have a one-tap path to the planning flow without
 * scrolling back to the top.
 *
 * Merges with previous design:
 * - Keeps path-based hiding (don't show on pages with their own primary CTA:
 *   constructor, calculator, helper, contact form, etc.)
 * - Adds scroll-based visibility (show after 300px scroll) so the bar doesn't
 *   compete with hero CTAs at the top of the page.
 * - Keeps phone + WhatsApp quick actions for users who want to skip the form.
 */
export default function StickyMobileCTA({
  ctaLabel = 'Рассчитать →',
  ctaHref = '/plan/helper',
  waContext,
}: Props) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  // Show after scrolling 300px down — gives hero CTA room to breathe
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY >100);
    };
    // Initial check (in case page loads scrolled, e.g. on back navigation)
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () =>window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide sticky CTA ONLY on pages where it would compete with a page-specific lead form
  if (
    !visible ||
    pathname === '/contact' ||
    pathname.startsWith('/plan/')
  ) {
    return null;
  }

  const waHref = waContext
    ? `${SITE.whatsapp}?text=${encodeURIComponent(waContext)}`
    : SITE.whatsapp;

  return (
    <motion.div
      className="fixed bottom-16 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-t border-line shadow-lg px-3 py-3 flex items-center gap-3 md:hidden safe-area-bottom"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      aria-label="Быстрые действия"
    >
      {/* Price + CTA — primary affordance */}
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground leading-tight">От 2 450 ₽/гость</p>
        <p className="text-sm font-bold text-gold-text leading-tight">Рассчитать стоимость</p>
      </div>
      <Link
        href={ctaHref}
        className="rounded-lg bg-gold-text text-white px-6 py-3 text-sm font-semibold hover:bg-gold-text/90 transition-colors no-underline touch-target"
        aria-label="Рассчитать стоимость"
      >
        {ctaLabel}
      </Link>
      <a
        href={`tel:${SITE.phoneTel}`}
        className="p-3 rounded-lg text-muted-foreground hover:text-foreground border border-line bg-background touch-target"
        aria-label="Позвонить"
      >
        <Phone className="w-5 h-5" />
      </a>
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 rounded-lg text-muted-foreground hover:text-foreground border border-line bg-background touch-target"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-5 h-5" />
      </a>
    </motion.div>
  );
}
