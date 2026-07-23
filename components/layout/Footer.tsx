import Link from 'next/link';
import { SITE, SOCIAL_LINKS } from '@/lib/data';
import TextSizeToggle from '@/components/effects/TextSizeToggle';

const FOOTER_LINKS = {
  События: [
    { label: 'Корпоративы', href: '/events/korporativ' },
    { label: 'Свадьбы', href: '/events/svadba' },
    { label: 'Выпускные', href: '/events/vypusknoy' },
    { label: 'Юбилеи и годовщины', href: '/events/yubiley' },
    { label: 'Детские праздники', href: '/events/detskoe' },
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
    { label: 'Конструктор меню', href: '/plan/constructor' },
    { label: 'Помощник', href: '/plan/helper' },
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
        {/* Newsletter signup (03_JOURNEYS) */}
        <div className="mb-12 p-6 rounded-xl border border-line bg-card text-center">
          <h3 className="font-heading text-lg font-medium mb-2">Будьте в курсе</h3>
          <p className="text-sm text-muted-foreground mb-4">Сезонные предложения и новые меню — раз в месяц, без спама.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" action="/api/newsletter" method="POST">
            <input type="email" name="email" placeholder="Ваш email" required className="flex-1 rounded-lg border border-line bg-background px-4 py-2.5 text-sm" />
            <button type="submit" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">Подписаться</button>
          </form>
          <p className="mt-2 text-xs text-muted-foreground">Нажимая «Подписаться», вы соглашаетесь с политикой конфиденциальности (152-ФЗ).</p>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-heading text-sm font-semibold text-foreground mb-3">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{link.label}</Link>
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
              <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{link.label}</a>
            ))}
          </div>
          {/* Rating badge (03_JOURNEYS / 30_REVIEWS) — ссылка на Яндекс.Карты для верификации */}
          <div className="flex items-center gap-4">
            <a
              href="https://yandex.ru/maps/?text=%D0%BA%D0%B5%D0%B9%D1%82%D0%B5%D1%80%D0%B8%D0%BD%D0%B3%20NiloV%20Catering%20%D0%A1%D0%B0%D0%BD%D0%BA%D1%82-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 underline"
              title="Посмотреть отзывы на Яндекс.Картах"
            >
              ★ 4.8 <span className="hidden sm:inline">на Яндекс.Картах →</span>
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
          <Link href="/privacy" className="hover:text-foreground transition-colors">Политика</Link>
          <Link href="/terms" className="hover:text-foreground transition-colors">Условия</Link>
          <Link href="/cookies" className="hover:text-foreground transition-colors">Cookies</Link>
          <Link href="/accessibility" className="hover:text-foreground transition-colors">Доступность</Link>
          <span>© 2007–2024 {SITE.name}</span>
          <TextSizeToggle />
        </div>

        {/* Юридические реквизиты (реальные данные — ИП Нилов Д.И.) */}
        <div className="mt-6 pt-6 border-t border-line/50 text-center">
          <p className="text-sm text-foreground">
            <span className="font-semibold">{SITE.legalName}</span>
            {' · '}
            <span>ИНН {SITE.inn}</span>
            {' · '}
            <span>ОГРНИП {SITE.ogrnip}</span>
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {SITE.legalAddress}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Бренд {SITE.name} работает с 2007 года. ИП Нилов Д.И. зарегистрирован в 2014 (перерегистрация с ранее действовавшей формы). Документы и договор — по запросу{' '}
            <a href={`mailto:${SITE.email}`} className="underline hover:text-foreground">{SITE.email}</a>
            {' · '}
            <a href={`tel:${SITE.phoneTel}`} className="underline hover:text-foreground">{SITE.phone}</a>
          </p>
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Сайт соответствует 152-ФЗ «О персональных данных». ТР ТС 022/2011 «О безопасности пищевой продукции». Маркировка 14 аллергенов по ТР ТС 022/2011 Приложение 3.
        </p>
      </div>
    </footer>
  );
}
