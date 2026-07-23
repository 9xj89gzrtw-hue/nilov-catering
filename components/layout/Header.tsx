import Link from 'next/link';
import { SITE } from '@/lib/data';
import TextSizeToggle from '@/components/effects/TextSizeToggle';
import MobileMenu from '@/components/layout/MobileMenu';
import MegaMenu from '@/components/layout/MegaMenu';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-line/50 bg-background/80 backdrop-blur-md" role="banner">
      <nav className="container-site flex h-16 items-center justify-between" aria-label="Главная навигация">
        {/* Logo */}
        <Link href="/" className="font-heading text-xl font-semibold tracking-tight text-foreground hover:text-gold-text transition-colors">
          NiloV
        </Link>

        {/* Desktop: 2 mega-menu items + 3 plain links */}
        <MegaMenu />
        <ul className="hidden lg:flex items-center gap-1" role="list">
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

        {/* Desktop: phone + CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <TextSizeToggle />
          <a href={`tel:${SITE.phone}`} className="text-sm font-medium text-foreground hover:text-gold-text transition-colors">
            📞 {SITE.phone}
          </a>
          <Link href="/delivery/order" className="text-sm font-medium text-muted-foreground hover:text-gold-text transition-colors">
            🚚 Доставка
          </Link>
          <Link href="/plan" className="inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
            Спланировать
          </Link>
        </div>

        {/* Mobile: phone + burger */}
        <div className="flex lg:hidden items-center gap-1">
          <a href={`tel:${SITE.phone}`} className="w-11 h-11 flex items-center justify-center text-foreground hover:text-gold-text transition-colors" aria-label="Позвонить">
            📞
          </a>
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}