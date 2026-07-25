'use client';

import { Printer } from 'lucide-react';

interface PrintButtonProps {
  label?: string;
  className?: string;
}

export default function PrintButton({ label = 'Печать', className = '' }: PrintButtonProps) {
  return (
    <button
      onClick={() => window.print()}
      // SSR fallback: if JS is disabled, inline onclick still works in most browsers
      // @ts-ignore — onClick is React handler, but we also add native onclick for SSR
      onclick="window.print()"
      className={`inline-flex items-center gap-2 rounded-lg border border-line bg-card px-4 py-2.5 text-sm font-semibold hover:border-gold-text transition-colors touch-target ${className}`}
      type="button"
    >
      <Printer className="w-4 h-4" aria-hidden="true" />
      {label}
    </button>
  );
}
