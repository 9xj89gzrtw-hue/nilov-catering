import Link from "next/link";
import { SITE, SOCIAL_LINKS } from "@/lib/data";
import TextSizeToggle from "@/components/effects/TextSizeToggle";

/**
 * Footer — чистый и не перегруженный
 *
 * Структура (3 колонки вместо 5):
 * [Услуги]     [Компания]      [Контакты]
 *
 * Принципы:
 * - Только самые важные ссылки
 * - Логичная группировка для клиента
 * - Место для CTA (подписка/контакты)
 */

const FOOTER_LINKS = {
  Услуги: [
    { label: "Свадьбы", href: "/events/svadba" },
    { label: "Корпоративы", href: "/events/korporativ" },
    { label: "Детские праздники", href: "/events/detskoe" },
    { label: "Частные мероприятия", href: "/events/chastnoe" },
    { label: "Шеф на дом", href: "/events/chef-at-home" },
    { label: "Все услуги →", href: "/events" },
  ],
  Меню: [
    { label: "Банкетное меню", href: "/menu/banquet" },
    { label: "Фуршет", href: "/menu/furshet" },
    { label: "Кофе-брейк", href: "/menu/coffee-break" },
    { label: "Каталог блюд", href: "/menu/catalog" },
    { label: "Веган / Халяль", href: "/menu/vegan" },
    { label: "Всё меню →", href: "/menu" },
  ],
  Компания: [
    { label: "О нас", href: "/why-us" },
    { label: "Отзывы (4.8⭐)", href: "/reviews" },
    { label: "Галерея работ", href: "/gallery" },
    { label: "Команда", href: "/team" },
    { label: "Блог", href: "/blog" },
    { label: "Вакансии", href: "/careers" },
  ],
  Полезное: [
    { label: "Цены и калькулятор", href: "/pricing" },
    { label: "FAQ", href: "/faq" },
    { label: "Доставка кейтеринга", href: "/delivery/order" },
    { label: "Сертификаты", href: "/certificates" },
    { label: "Площадки", href: "/venues" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-line bg-secondary/50 border-t" role="contentinfo">
      <div className="container-site py-16">
        {/* Основные ссылки — 4 колонки */}
        <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-4">
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

        {/* Контакты + социальные сети */}
        <div className="border-line md:bg-background/50 mb-10 flex flex-col items-center justify-between gap-6 rounded-xl border p-6 md:flex-row">
          {/* Контакты */}
          <div className="text-center md:text-left">
            <p className="text-muted-foreground text-sm">Связаться с нами:</p>
            <a
              href={`tel:${SITE.phoneTel}`}
              className="hover:text-gold-text text-lg font-semibold transition-colors"
              style={{ color: "#1C1815" }}
            >
              {SITE.phone}
            </a>
          </div>

          {/* Соцсети */}
          <div className="flex gap-3">
            {SOCIAL_LINKS.slice(0, 4).map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                aria-label={link.label}
                className="hover:text-gold-text flex h-11 w-11 items-center justify-center rounded-full border transition-colors"
                style={{ color: "#4A423B", borderColor: "#ddd" }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <Link
            href="/contact"
            className="bg-primary hover:bg-primary/90 text-primary-foreground inline-flex min-h-[44px] items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold no-underline shadow-sm transition-all hover:shadow-md"
          >
            Оставить заявку
          </Link>
        </div>

        {/* Нижняя часть — legal + copyright */}
        <div
          className="flex flex-col items-center justify-between gap-4 border-t pt-8 text-sm md:flex-row"
          style={{ color: "#6B5F52" }}
        >
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <Link
              href="/privacy"
              className="hover:text-foreground inline-flex min-h-[44px] items-center px-2 py-1 no-underline transition-colors"
            >
              Политика конфиденциальности
            </Link>
            <span>·</span>
            <Link
              href="/terms"
              className="hover:text-foreground inline-flex min-h-[44px] items-center px-2 py-1 no-underline transition-colors"
            >
              Условия использования
            </Link>
            <span>·</span>
            <Link
              href="/cookies"
              className="hover:text-foreground inline-flex min-h-[44px] items-center px-2 py-1 no-underline transition-colors"
            >
              Cookies
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <TextSizeToggle />
            <span>© 2007–2026 {SITE.name}</span>
          </div>
        </div>

        {/* Юридическая информация (компактная) */}
        <div className="mt-4 text-center text-xs" style={{ color: "#9a8b80" }}>
          <p>
            {SITE.legalName} · ИНН {SITE.inn} · ОГРНИП {SITE.ogrnip}
          </p>
        </div>
      </div>
    </footer>
  );
}
