'use client';

import Link from 'next/link';
import { Phone } from 'lucide-react';
import { mobileNavItems } from '@/lib/data';

export default function MobileNav() {
  return (
    <>
      {/* Mobile bottom action bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#080808]/95 backdrop-blur-md border-t border-border safe-area-bottom">
        <div className="flex items-center justify-around h-14 px-2">
          {mobileNavItems.slice(0, 4).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center text-cream-muted hover:text-cream transition-colors duration-200 text-[10px] gap-0.5"
            >
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          ))}
          <a
            href="tel:+78121234567"
            className="flex flex-col items-center justify-center text-gold hover:text-gold-light transition-colors duration-200 text-[10px] gap-0.5"
            aria-label="Позвонить"
          >
            <Phone className="w-5 h-5" />
          </a>
        </div>
      </div>
      {/* Spacer for mobile bottom bar */}
      <div className="md:hidden h-14" />
    </>
  );
}