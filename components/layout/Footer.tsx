import Link from "next/link";
import { SITE, SOCIAL_LINKS } from "@/lib/data";
import TextSizeToggle from "@/components/effects/TextSizeToggle";
import { NewsletterBlock } from "@/components/blocks/NewsletterBlock";

const FOOTER_LINKS = {
  События: [
    { label: "Корпоративы", href: "/events/korporativ" },
    { label: "Свадьбы", href: "/events/svadba" },
    { label: "Выпускные", href: "/events/vypusknoy" },
    { label: "Юбилеи и годовщины", href: "/events/yubiley" },
    { label: "Детские праздники", href: "/events/detskoe" },
    { label: "Поминки", href: "/events/pominki" },
    { label: "Никах и ифтар", href: "/events/nikah" },
    { label: "Выезд шефа", href: "/events/chef-at-home" },
  ],
  Меню: [
    { label: "Фуршет", href: "/menu/furshet" },
    { label: "Банкет", href: "/menu/banquet" },
    { label: "Кофе-брейк", href: "/menu/coffee-break" },
    { label: "Каталог блюд", href: "/menu/catalog" },
    { label: "Детское меню", href: "/menu/detskoe" },
    { label: "Веган", href: "/menu/vegan" },
    { label: "Халяль", href: "/menu/halal" },
    { label: "Без глютена", href: "/menu/gluten-free" },
    { label: "Шоу-кукинг", href: "/menu/show-cooking" },
  ],
  Инструменты: [
    { label: "Тарифы", href: "/pricing" },
    { label: "Подбор меню", href: "/plan/constructor" },
    { label: "Помощник", href: "/plan/helper" },
    { label: "Подписка на обеды", href: "/subscribe" },
    { label: "FAQ", href: "/faq" },
  ],
  Компания: [
    { label: "Почему мы", href: "/why-us" },
    { label: "Команда", href: "/team" },
    { label: "Отзывы", href: "/reviews" },
    { label: "Контакты", href: "/contact" },
    { label: "Блог", href: "/blog" },
    { label: "Партнёрам", href: "/partners" },
    { label: "Карьера", href: "/careers" },
    { label: "Площадки", href: "/venues" },
    { label: "Медиа-кит", href: "/media-kit" },
  ],
  Инфо: [
    { label: "Доставка кейтеринга", href: "/delivery/order" },
    { label: "Зоны доставки", href: "/delivery" },
    { label: "Сертификаты", href: "/certificates" },
    { label: "Аллергены", href: "/allergens" },
    { label: "Дегустация", href: "/tasting" },
    { label: "Сезонное", href: "/seasonal" },
    { label: "Личный кабинет", href: "/account/orders" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-line bg-secondary/50 border-t" role="contentinfo">
      <div className="container-site py-16">
        {/* Newsletter signup — hidden on dignity/somber pages (поминки) */}
        <NewsletterBlock />

        {/* Link columns */}
        <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-5">
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-heading text-foreground mb-3 text-sm font-semibold">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="hover:text-foreground -mx-1 inline-flex min-h-[44px] items-center px-1 py-2 text-sm transition-colors"
                      style={{ color: "#4A423B" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom: social + rating + legal */}
        <div className="border-line flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                aria-label={link.label}
                className="hover:text-foreground -mx-1 inline-flex min-h-[44px] items-center px-2 py-2 text-sm transition-colors"
                style={{ color: "#4A423B" }}
              >
                {link.label}
              </a>
            ))}
          </div>
          {/* Rating badge — рассчитан из /reviews (27 отзывов, среднее 4.8). Ссылка на отзывы для верификации. */}
          <div className="flex items-center gap-4">
            <Link
              href="/reviews"
              className="hover:text-foreground -mx-1 flex min-h-[44px] items-center gap-1 px-1 py-2 text-sm underline transition-colors"
              title="Все 27 отзывов с расчётом среднего рейтинга"
              style={{ color: "#4A423B" }}
            >
              4.8 <span className="hidden sm:inline">из 27 отзывов →</span>
            </Link>
          </div>
        </div>

        <div
          className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm"
          style={{ color: "#4A423B" }}
        >
          <Link
            href="/privacy"
            className="hover:text-foreground inline-flex min-h-[44px] items-center px-2 py-2 no-underline transition-colors"
          >
            Политика
          </Link>
          <Link
            href="/terms"
            className="hover:text-foreground inline-flex min-h-[44px] items-center px-2 py-2 no-underline transition-colors"
          >
            Условия
          </Link>
          <Link
            href="/cookies"
            className="hover:text-foreground inline-flex min-h-[44px] items-center px-2 py-2 no-underline transition-colors"
          >
            Cookies
          </Link>
          <Link
            href="/accessibility"
            className="hover:text-foreground inline-flex min-h-[44px] items-center px-2 py-2 no-underline transition-colors"
          >
            Доступность
          </Link>
          <span className="inline-flex items-center px-2 py-2">© 2007–2026 {SITE.name}</span>
          <TextSizeToggle />
        </div>

        {/* Legal — compact, single line */}
        <div
          className="border-line/50 mt-6 border-t pt-6 text-center text-xs"
          style={{ color: "#6B5F52" }}
        >
          <p>
            {SITE.legalName} · ИНН {SITE.inn} · ОГРНИП {SITE.ogrnip}
          </p>
          <p className="mt-1">
            {SITE.legalAddress} ·{" "}
            <a
              href={`tel:${SITE.phoneTel}`}
              className="hover:text-foreground -mx-1 inline-flex min-h-[44px] items-center px-2 py-2"
            >
              {SITE.phone}
            </a>{" "}
            ·{" "}
            <a
              href={`mailto:${SITE.email}`}
              className="hover:text-foreground -mx-1 inline-flex min-h-[44px] items-center px-2 py-2"
            >
              {SITE.email}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
