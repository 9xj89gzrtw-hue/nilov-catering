import Link from 'next/link';
import { SITE } from '@/lib/data';
import TextSizeToggle from '@/components/effects/TextSizeToggle';
import MobileMenu from '@/components/layout/MobileMenu';
import MegaMenu from '@/components/layout/MegaMenu';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-line/50 bg-background/80 backdrop-blur-md" role="banner">
      <nav className="container-site flex h-16 items-center justify-between gap-2" aria-label="Главная навигация">
        {/* Logo */}
        <Link href="/" className="font-heading text-xl font-semibold tracking-tight text-foreground hover:text-gold-text transition-colors shrink-0" aria-label="NiloV Catering — на главную">
          NiloV
        </Link>

        {/* Desktop: 2 mega-menu items */}
        <MegaMenu />

        {/* Desktop: links + phone + CTA — visible on md+ (tablet portrait included) */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          <li>
            <Link href="/gallery" className="relative px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              Галерея
            </Link>
          </li>
          <li>
            <Link href="/pricing" className="relative px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              Тарифы
            </Link>
          </li>
          <li>
            <Link href="/why-us" className="relative px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              О нас
            </Link>
          </li>
        </ul>

        {/* Phone + CTA — visible on md+ (tablet portrait included) */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <TextSizeToggle />
          <a
            href={`tel:${SITE.phoneTel}`}
            className="text-base font-semibold text-foreground hover:text-gold-text transition-colors whitespace-nowrap"
            aria-label={`Позвонить ${SITE.phone}`}
          >
            📞 {SITE.phone}
          </a>
          <Link href="/plan/calculator" className="hidden lg:inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
            Рассчитать
          </Link>
        </div>

        {/* Mobile (sm only): phone-icon visible + burger */}
        <div className="flex md:hidden items-center gap-1 shrink-0">
          <a
            href={`tel:${SITE.phoneTel}`}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-line text-foreground hover:text-gold-text hover:border-gold-text transition-colors"
            aria-label={`Позвонить ${SITE.phone}`}
          >
            <span className="text-lg" aria-hidden="true">📞</span>
            <span className="text-sm font-semibold">{SITE.phone}</span>
          </a>
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}
