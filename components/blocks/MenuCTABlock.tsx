'use client';

import Link from 'next/link';
import type { Format } from '@/lib/types';

/**
 * Универсальный CTA-блок для страниц меню:
 * — «Не нашли своё? Составим индивидуально» с ссылкой на конструктор
 * — «Скачать PDF» с ссылкой на /menu/{format}/pdf
 */
export default function MenuCTABlock({ format, formatLabel }: { format?: Format; formatLabel?: string }) {
  const label = formatLabel || 'меню';
  const constructorHref = format ? `/plan/constructor?format=${format}` : '/plan/constructor';
  const pdfHref = format ? `/menu/${format}/pdf` : '/menu/pdf';

  return (
    <div className="mt-10 space-y-4">
      {/* PDF download */}
      <a
        href={pdfHref}
        download
        className="inline-flex items-center gap-2 rounded-lg border border-line bg-card px-5 py-3 text-sm font-medium text-foreground hover:border-gold-text hover:text-gold-text transition-all active:scale-[0.98]"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Скачать меню «{label}» (PDF)
      </a>

      {/* Fallback CTA */}
      <div className="p-5 rounded-xl border border-dashed border-line bg-card/50">
        <p className="text-sm font-medium mb-1">Не нашли своё? Составим индивидуально</p>
        <p className="text-xs text-muted-foreground mb-3">
          Шеф соберёт меню под ваш бюджет, формат и пожелания.
        </p>
        <Link
          href={constructorHref}
          className="text-sm text-gold-text font-semibold hover:underline"
        >
          Составить меню с шефом →
        </Link>
      </div>
    </div>
  );
}