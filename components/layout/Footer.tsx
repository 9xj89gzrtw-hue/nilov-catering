import Link from 'next/link';
import { SITE, SOCIAL_LINKS } from '@/lib/data';
import TextSizeToggle from '@/components/effects/TextSizeToggle';
import { NewsletterBlock } from '@/components/blocks/NewsletterBlock';

const FOOTER_LINKS = {
  События: [
    { label: 'Корпоративы', href: '/events/korporativ' },
    { label: 'Свадьбы', href: '/events/svadba' },
    { label: 'Выпускные', href: '/events/vypusknoy' },
    { label: 'Юбилеи и годовщины', href: '/events/yubiley' },
    { label: 'Детские праздники', href: '/events/detskoe' },
    { label: 'Поминки', href: '/events/pominki' },
    { label: 'Никах и ифтар', href: '/events/nikah' },
    { label: 'Выезд шефа', href: '/events/chef-at-home' },
  ],
  Меню: [
    { label: 'Фуршет', href: '/menu/furshet' },
    { label: 'Банкет', href: '/menu/banquet' },
    { label: 'Кофе-брейк', href: '/menu/coffee-break' },
    { label: 'Каталог блюд', href: '/menu/catalog' },
  ],
  Инструменты: [
    { label: 'Калькулятор', href: '/plan/calculator' },
    { label: 'Подбор меню', href: '/plan/constructor' },
    { label: 'Помощник', href: '/plan/helper' },
    { label: 'Подписка на обеды', href: '/subscribe' },
    { label: 'FAQ', href: '/faq' },
  ],
  Компания: [
    { label: 'Почему мы', href: '/why-us' },
    { label: 'Команда', href: '/team' },
    { label: 'Отзывы', href: '/reviews' },
    { label: 'Контакты', href: '/contact' },
    { label: 'Блог', href: '/blog' },
  ],
  Инфо: [
    { label: 'Доставка кейтеринга', href: '/delivery/order' },
    { label: 'Зоны доставки', href: '/delivery' },
    { label: 'Сертификаты', href: '/certificates' },
    { label: 'Аллергены', href: '/allergens' },
    { label: 'Дегустация', href: '/tasting' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-line bg-secondary/50" role="contentinfo">
      <div className="container-site py-16">
        {/* Newsletter signup — hidden on dignity/somber pages (поминки) */}
        <NewsletterBlock />

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-heading text-sm font-semibold text-foreground mb-3">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center min-h-[44px] py-2 px-1 -mx-1">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom: social + rating + legal */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-line">
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((link) => (
              <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.label} className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center min-h-[44px] py-2 px-2 -mx-1">{link.label}</a>
            ))}
          </div>
          {/* Rating badge — рассчитан из /reviews (27 отзывов, среднее 4.8). Ссылка на отзывы для верификации. */}
          <div className="flex items-center gap-4">
            <Link
              href="/reviews"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 underline min-h-[44px] py-2 px-1 -mx-1"
              title="Все 27 отзывов с расчётом среднего рейтинга"
            >
               4.8 <span className="hidden sm:inline">из 27 отзывов →</span>
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
          <Link href="/privacy" className="hover:text-foreground transition-colors no-underline inline-flex items-center min-h-[44px] py-2 px-2">Политика</Link>
          <Link href="/terms" className="hover:text-foreground transition-colors no-underline inline-flex items-center min-h-[44px] py-2 px-2">Условия</Link>
          <Link href="/cookies" className="hover:text-foreground transition-colors no-underline inline-flex items-center min-h-[44px] py-2 px-2">Cookies</Link>
          <Link href="/accessibility" className="hover:text-foreground transition-colors no-underline inline-flex items-center min-h-[44px] py-2 px-2">Доступность</Link>
          <span className="inline-flex items-center py-2 px-2">© 2007–2026 {SITE.name}</span>
          <TextSizeToggle />
        </div>

        {/* Legal — compact, single line */}
        <div className="mt-6 pt-6 border-t border-line/50 text-center text-xs text-muted-foreground">
          <p>
            {SITE.legalName} · ИНН {SITE.inn} · ОГРНИП {SITE.ogrnip}
          </p>
          <p className="mt-1">
            {SITE.legalAddress} ·{' '}
            <a href={`tel:${SITE.phoneTel}`} className="underline hover:text-foreground no-underline inline-flex items-center min-h-[44px] py-2 px-2 -mx-1">{SITE.phone}</a>{' '}
            ·{' '}
            <a href={`mailto:${SITE.email}`} className="underline hover:text-foreground no-underline inline-flex items-center min-h-[44px] py-2 px-2 -mx-1">{SITE.email}</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
