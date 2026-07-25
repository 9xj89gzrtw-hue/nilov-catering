'use client';

import { Printer } from 'lucide-react';

interface PrintButtonProps {
  label?: string;
  className?: string;
}

export default function PrintButton({ label = 'Печать', className = '' }: PrintButtonProps) {
  return (
    <a
      href="javascript:window.print()"
      className={`inline-flex items-center gap-2 rounded-lg border border-line bg-card px-4 py-2.5 text-sm font-semibold hover:border-gold-text transition-colors touch-target no-underline ${className}`}
      role="button"
    >
      <Printer className="w-4 h-4" aria-hidden="true" />
      {label}
    </a>
  );
}
