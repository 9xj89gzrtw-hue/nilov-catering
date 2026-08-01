'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { type ReactNode } from 'react';

/**
 * ClientLayout — wraps page content with page transition animation only.
 *
 * Breadcrumbs are added by individual pages INSIDE <main pt-24>,
 * so they appear below the fixed header (not hidden behind it).
 *
 * Pages should include <Breadcrumbs /> at the top of <main className="pt-24 pb-20">.
 */
export function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={false}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
