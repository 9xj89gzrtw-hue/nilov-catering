/**
 * SmoothScrollProvider — pass-through (Lenis removed).
 *
 * Performance audit: "SmoothScrollProvider recursive requestAnimationFrame is never cancelled
 * in cleanup — lenis.destroy() runs but the raf chain keeps calling lenis.raf(time) on a
 * destroyed instance forever; also conflicts with html{scroll-behavior:smooth} in globals.css."
 *
 * Fixed: removed Lenis entirely. Native CSS `scroll-behavior: smooth` (already in globals.css)
 * handles anchor links. No JS smooth-scroll needed.
 */
export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
