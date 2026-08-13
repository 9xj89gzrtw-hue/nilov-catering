"use client";

import { Printer } from "lucide-react";

interface PrintButtonProps {
  label?: string;
  className?: string;
}

export default function PrintButton({ label = "Печать", className = "" }: PrintButtonProps) {
  return (
    <button
      onClick={() => window.print()}
      className={`border-line bg-card hover:border-gold-text touch-target inline-flex min-h-[44px] items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors ${className}`}
      type="button"
    >
      <Printer className="h-4 w-4" aria-hidden="true" />
      {label}
    </button>
  );
}
