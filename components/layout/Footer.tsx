import Link from 'next/link';
import { navItems } from '@/lib/data';
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';

const socialLinks = [
  { label: 'Telegram', href: '#' },
  { label: 'VK', href: '#' },
  { label: 'Instagram', href: '#' },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#080808] border-t border-border" role="contentinfo">
      {/* Gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer grid */}
        <div className="py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand — wider column */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-block cursor-hover">
              <span className="font-heading text-3xl font-semibold text-cream tracking-wide">
                Нилов<span className="text-gold ml-2 font-normal text-xl">Кейтеринг</span>
              </span>
            </Link>
            <p className="mt-5 text-sm text-cream-muted leading-relaxed max-w-sm">
              Премиальный кейтеринг в Санкт-Петербурге. 12 лет безупречного сервиса на свадьбах, корпоративах и частных мероприятиях.
            </p>
            {/* Social */}
            <div className="flex gap-5 mt-8">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="group flex items-center gap-1.5 text-cream-muted hover:text-gold transition-colors duration-300 cursor-hover"
                  aria-label={s.label}
                >
                  <span className="text-[10px] uppercase tracking-widest font-medium">{s.label}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 lg:col-start-7">
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-cream-muted font-medium mb-6">
              Навигация
            </h3>
            <ul className="space-y-3.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-cream/50 hover:text-cream transition-colors duration-300 cursor-hover inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-0 h-px bg-gold group-hover:w-3 transition-all duration-300" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More pages */}
          <div className="lg:col-span-2">
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-cream-muted font-medium mb-6">
              Информация
            </h3>
            <ul className="space-y-3.5">
              {[
                { label: 'Цены', href: '/pricing' },
                { label: 'Вопросы и ответы', href: '/faq' },
                { label: 'Блог', href: '/blog' },
                { label: 'Отзывы', href: '/testimonials' },
                { label: 'Конфиденциальность', href: '/privacy' },
                { label: 'Условия использования', href: '/terms' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/50 hover:text-cream transition-colors duration-300 cursor-hover inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-0 h-px bg-gold group-hover:w-3 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-cream-muted font-medium mb-6">
              Контакты
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+78121234567"
                  className="flex items-start gap-3 text-sm text-cream/50 hover:text-gold transition-colors duration-300 cursor-hover"
                >
                  <Phone className="w-3.5 h-3.5 mt-0.5 shrink-0 text-gold/50" />
                  <span>+7 (812) 123-45-67</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@nilov-catering.ru"
                  className="flex items-start gap-3 text-sm text-cream/50 hover:text-gold transition-colors duration-300 cursor-hover"
                >
                  <Mail className="w-3.5 h-3.5 mt-0.5 shrink-0 text-gold/50" />
                  <span>info@nilov-catering.ru</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-cream/50">
                <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-gold/50" />
                <span>Санкт-Петербург,<br />наб. реки Фонтанки, 90</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-cream-muted/60 tracking-wide">
            &copy; {new Date().getFullYear()} Нилов Кейтеринг. Все права защищены.
          </p>
          <p className="text-[11px] text-cream-muted/40 tracking-wide">
            Санкт-Петербург, Россия
          </p>
        </div>
      </div>
    </footer>
  );
}