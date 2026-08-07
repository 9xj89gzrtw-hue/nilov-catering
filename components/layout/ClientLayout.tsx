import { type ReactNode } from 'react';

/**
 * ClientLayout — pass-through wrapper.
 *
 * Performance audit: "ClientLayout wraps {children} in <AnimatePresence mode="wait"> keyed by
 * pathname — unmounts/remounts entire page tree on every route change."
 *
 * Fixed: removed AnimatePresence + motion.div. Pages now render without remount overhead.
 * Page transitions can be handled by Next.js View Transitions API if needed in the future.
 */
export function ClientLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
