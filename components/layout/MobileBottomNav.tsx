"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PartyPopper, Utensils, Calculator, Phone, Menu, Sparkles } from "lucide-react";

// ── Scroll thresholds ───────────────────────────────────────────────
const SCROLL_SHOW_THRESHOLD = 100; // Show nav when near top
const SCROLL_HIDE_THRESHOLD = 200; // Hide nav when scrolling down past this

/**
 * MobileBottomNav — Premium polished bottom navigation
 *
 * Inspired by:
 * - Instagram/TikTok refined bottom nav
 * - Modern iOS tab bars
 * - Luxury app navigation patterns
 *
 * Features:
 * - Glassmorphism background
 * - Floating center CTA button with glow
 * - Smooth active state transitions
 * - Haptic-style feedback visuals
 * - Refined icon sizing and spacing
 * - Subtle animations on interaction
 */

const LEFT_LINKS = [
  { href: "/", label: "Главная", Icon: Home },
  { href: "/events", label: "Услуги", Icon: PartyPopper },
];

const RIGHT_LINKS = [
  { href: "/menu", label: "Меню", Icon: Utensils },
  { href: "/contact", label: "Контакты", Icon: Phone },
];

// Контекстные изменения центральной кнопки
const CENTER_CTA: Record<string, { href: string; label: string; icon: typeof Calculator }> = {
  default: { href: "/plan/helper", label: "Подбор", icon: Calculator },
  "/events": { href: "/events", label: "Все", icon: Menu },
  "/menu": { href: "/plan/constructor", label: "Сборка", icon: Utensils },
  "/pricing": { href: "/plan/calculator", label: "Расчёт", icon: Calculator },
};

interface NavLinkProps {
  href: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  isActive: boolean;
}

function NavLink({ href, label, Icon, isActive }: NavLinkProps) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <li className="flex-1">
      <Link
        href={href}
        aria-current={isActive ? "page" : undefined}
        aria-label={label}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        className={`group relative flex flex-col items-center justify-center gap-1 px-1 py-2 no-underline transition-all duration-300 ${
          isPressed ? "scale-95" : ""
        }`}
      >
        {/* Active indicator background */}
        {isActive && (
          <span className="absolute top-0 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#6e5530] to-[#c9a961]" />
        )}

        {/* Icon container */}
        <div
          className={`relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 ${
            isActive
              ? "bg-gradient-to-br from-[#6e5530] to-[#7a5f36] shadow-lg shadow-[#6e5530]/30"
              : "bg-transparent group-hover:bg-white/[0.06]"
          }`}
        >
          {/* Glow effect for active state */}
          {isActive && (
            <>
              <span className="absolute inset-0 animate-pulse rounded-xl bg-gradient-to-br from-[#6e5530] to-[#7a5f36] opacity-50 blur-lg" />
              <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#c9a961]/20 to-transparent opacity-60" />
            </>
          )}

          <Icon
            className={`h-5 w-5 transition-all duration-300 ${
              isActive ? "scale-110 text-white" : "text-white/50 group-hover:text-white/80"
            }`}
            aria-hidden="true"
          />

          {/* Active dot indicator */}
          {isActive && (
            <span className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#c9a961]" />
          )}
        </div>

        {/* Label */}
        <span
          className={`text-[10px] font-medium tracking-wide transition-all duration-300 ${
            isActive ? "font-semibold text-white" : "text-white/40 group-hover:text-white/70"
          }`}
        >
          {label}
        </span>

        {/* Haptic feedback ripple effect (visual only) */}
        {isPressed && (
          <span
            className="absolute inset-0 animate-ping rounded-xl bg-white/[0.1]"
            style={{ animationDuration: "300ms" }}
          />
        )}
      </Link>
    </li>
  );
}

interface CenterButtonProps {
  href: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
}

function CenterButton({ href, label, Icon }: CenterButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <li className="relative flex flex-1 justify-center">
      {/* Elevated container for floating effect */}
      <div className="relative -mt-4">
        {/* Outer glow ring */}
        <div
          className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
            isHovered || isPressed ? "opacity-100" : "opacity-60"
          }`}
        >
          <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-[#6e5530] to-[#8B6914] opacity-60 blur-md" />
        </div>

        {/* Main button */}
        <Link
          href={href}
          aria-label={`${label} — рассчитать стоимость`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setIsPressed(false);
          }}
          onMouseDown={() => setIsPressed(true)}
          onMouseUp={() => setIsPressed(false)}
          className={`group relative flex h-16 w-16 flex-col items-center justify-center rounded-full no-underline transition-all duration-200 ${
            isPressed
              ? "scale-90"
              : isHovered
                ? "scale-105 shadow-[0_12px_32px_-4px_rgba(110,85,48,0.6)]"
                : "shadow-[0_8px_24px_-4px_rgba(110,85,48,0.45)]"
          }`}
          style={{
            background:
              isHovered || isPressed
                ? "linear-gradient(135deg, #7a5f36 0%, #8B6914 100%)"
                : "linear-gradient(135deg, #6e5530 0%, #7a5f36 100%)",
          }}
        >
          {/* Inner shimmer effect */}
          <div className={`absolute inset-0 overflow-hidden rounded-full`}>
            <div
              className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ${
                isHovered ? "translate-x-full" : "-translate-x-full"
              }`}
              style={{
                animation: isHovered ? "shimmer 2s ease-in-out infinite" : undefined,
              }}
            />
          </div>

          {/* Rotating border gradient */}
          <span className="absolute inset-0 rounded-full p-[2px]">
            <span className="block h-full w-full rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </span>

          {/* Icon */}
          <Icon className="relative h-6 w-6 text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />

          {/* Label */}
          <span className="relative mt-0.5 text-[9px] leading-none font-bold tracking-wider text-white/90 uppercase">
            {label}
          </span>

          {/* Sparkle decoration */}
          <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-[#c9a961] opacity-80" />
        </Link>

        {/* Bottom connecting line */}
        <div className="absolute -bottom-2 left-1/2 h-2 w-px -translate-x-1/2 bg-gradient-to-b from-[#6e5530]/50 to-transparent" />
      </div>
    </li>
  );
}

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Определяем контекстную центральную кнопку
  const getCenterCTA = () => {
    if (pathname.startsWith("/events")) return CENTER_CTA["/events"];
    if (pathname.startsWith("/menu")) return CENTER_CTA["/menu"];
    if (pathname === "/pricing") return CENTER_CTA["/pricing"];
    return CENTER_CTA["default"];
  };

  const centerCTA = getCenterCTA();
  const CenterIcon = centerCTA.icon;

  // Hide/show based on scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show when scrolling up or near top, hide when scrolling down
      if (currentScrollY < SCROLL_SHOW_THRESHOLD) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > SCROLL_HIDE_THRESHOLD) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const renderLink = (link: (typeof LEFT_LINKS)[number]) => {
    const isActive =
      pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));

    return (
      <NavLink
        key={link.href}
        href={link.href}
        label={link.label}
        Icon={link.Icon}
        isActive={isActive}
      />
    );
  };

  return (
    <nav
      className={`safe-area-bottom fixed right-0 left-0 z-40 transition-transform duration-300 ease-out md:hidden ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-label="Мобильная навигация"
    >
      {/* Glassmorphism background */}
      <div
        className="relative mx-3 mb-3 overflow-hidden rounded-2xl border border-white/[0.08] backdrop-blur-2xl"
        style={{
          background: "rgba(26, 22, 20, 0.85)",
        }}
      >
        {/* Top subtle highlight */}
        <div className="pointer-events-none absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Bottom shadow/glow */}
        <div className="pointer-events-none absolute -bottom-1 left-1/2 h-4 w-3/4 -translate-x-1/2 rounded-b-2xl bg-black/20 blur-sm" />

        <ul className="relative flex h-16 items-center justify-evenly" role="list">
          {LEFT_LINKS.map(renderLink)}

          {/* Center — raised primary CTA pill */}
          <CenterButton href={centerCTA.href} label={centerCTA.label} Icon={CenterIcon} />

          {RIGHT_LINKS.map(renderLink)}
        </ul>
      </div>

      {/* Keyframe animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </nav>
  );
}
