'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';
import { SITE } from '@/lib/data';

interface Props {
  ctaLabel?: string;
  ctaHref?: string;
  phone?: string;
  whatsapp?: string;
  waContext?: string;
}

export default function StickyMobileCTA({
  ctaLabel = 'Спланировать событие',
  ctaHref = '/plan',
  phone = SITE.phone,
  whatsapp = 'https://wa.me/78129195911',
  waContext,
}: Props) {
  const waHref = waContext
    ? `${whatsapp}?text=${encodeURIComponent(waContext)}`
    : whatsapp;

  return (
    <motion.div
      className="fixed bottom-16 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-line px-3 py-2 flex items-center gap-2 lg:hidden safe-area-bottom"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 1.2, duration: 0.35 }}
      aria-label="Быстрые действия"
    >
      <Link
        href={ctaHref}
        className="flex-1 rounded-lg bg-primary py-3 text-center text-sm font-semibold text-primary-foreground touch-target"
      >
        {ctaLabel}
      </Link>
      <a href={`tel:${phone.replace(/\D/g, '')}`} className="p-3 text-muted-foreground hover:text-foreground touch-target" aria-label="Позвонить">
        <Phone className="w-5 h-5" />
      </a>
      <a href={waHref} target="_blank" rel="noopener noreferrer" className="p-3 text-muted-foreground hover:text-foreground touch-target" aria-label="WhatsApp">
        <MessageCircle className="w-5 h-5" />
      </a>
    </motion.div>
  );
}