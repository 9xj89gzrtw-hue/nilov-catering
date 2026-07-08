import Link from 'next/link';
import { navItems } from '@/lib/data';
import { Phone, Mail, MapPin } from 'lucide-react';

const socialLinks = [
  { label: 'Telegram', href: '#' },
  { label: 'VK', href: '#' },
  { label: 'Instagram', href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-border" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer grid */}
        <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <span className="font-heading text-2xl font-semibold text-cream tracking-wide">
                Нилов<span className="text-gold ml-1.5 font-normal text-lg">Кейтеринг</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-cream-muted leading-relaxed max-w-xs">
              Премиальный кейтеринг в Санкт-Петербурге. 12 лет безупречного сервиса на свадьбах, корпоративах и частных мероприятиях.
            </p>
            <div className="flex gap-4 mt-6">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="text-cream-muted hover:text-gold transition-colors duration-200 text-xs uppercase tracking-wider"
                  aria-label={s.label}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-cream-muted font-medium mb-5">
              Навигация
            </h3>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-cream/70 hover:text-cream transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More pages */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-cream-muted font-medium mb-5">
              Информация
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/pricing" className="text-sm text-cream/70 hover:text-cream transition-colors duration-200">
                  Цены
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-cream/70 hover:text-cream transition-colors duration-200">
                  Вопросы и ответы
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-cream/70 hover:text-cream transition-colors duration-200">
                  Блог
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-sm text-cream/70 hover:text-cream transition-colors duration-200">
                  Отзывы
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-cream/70 hover:text-cream transition-colors duration-200">
                  Политика конфиденциальности
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-cream/70 hover:text-cream transition-colors duration-200">
                  Условия использования
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-cream-muted font-medium mb-5">
              Контакты
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+78121234567"
                  className="flex items-start gap-3 text-sm text-cream/70 hover:text-gold transition-colors duration-200"
                >
                  <Phone className="w-4 h-4 mt-0.5 shrink-0 text-gold/70" />
                  <span>+7 (812) 123-45-67</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@nilov-catering.ru"
                  className="flex items-start gap-3 text-sm text-cream/70 hover:text-gold transition-colors duration-200"
                >
                  <Mail className="w-4 h-4 mt-0.5 shrink-0 text-gold/70" />
                  <span>info@nilov-catering.ru</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-cream/70">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-gold/70" />
                <span>Санкт-Петербург, наб. реки Фонтанки, 90</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cream-muted">
            © {new Date().getFullYear()} Нилов Кейтеринг. Все права защищены.
          </p>
          <p className="text-xs text-cream-muted">
            Санкт-Петербург, Россия
          </p>
        </div>
      </div>
    </footer>
  );
}