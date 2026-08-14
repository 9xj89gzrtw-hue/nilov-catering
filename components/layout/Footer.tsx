import Link from "next/link";
import { SITE, SOCIAL_LINKS } from "@/lib/data";
import TextSizeToggle from "@/components/effects/TextSizeToggle";

/**
 * Footer — оптимизированный под UX 2025-2026 (ВЕРСИЯ 2.0)
 *
 * Структура (4 колонки + CTA-зона):
 * [Услуги] [Меню] [Компания] [Поддержка]
 *
 * Ключевые улучшения:
 * - Группировка по USER JOURNEY (не по отделам)
 * - Быстрые пути к конверсии в каждой секции
 * - Минимум ссылок (Hick's Law: 7±2)
 * - Чёткий визуальный порядок
 */

interface FooterLink {
  label: string;
  href: string;
  desc?: string;
  highlight?: boolean;
  cta?: boolean;
}

const FOOTER_LINKS: Record<string, FooterLink[]> = {
  Услуги: [
    { label: "Свадьбы", href: "/events/svadba", desc: "Под ключ" },
    { label: "Корпоративы", href: "/events/korporativ", desc: "B2B пакет" },
    { label: "Детские праздники", href: "/events/detskoe", desc: "С аниматорами" },
    { label: "Шеф на дом", href: "/events/chef-at-home", desc: "Ресторан у вас" },
    { label: "Все услуги →", href: "/events", highlight: true },
  ],
  Меню: [
    { label: "Банкет", href: "/menu/banquet", desc: "от 3 950 ₽" },
    { label: "Фуршет", href: "/menu/furshet", desc: "от 2 450 ₽" },
    { label: "Кофе-брейк", href: "/menu/coffee-break", desc: "от 390 ₽" },
    { label: "Каталог блюд", href: "/menu/catalog", desc: "124+ позиций" },
    { label: "Спец. меню →", href: "/menu#special", highlight: true },
  ],
  Компания: [
    { label: "Почему мы", href: "/why-us", desc: "17 лет опыта" },
    { label: "Отзывы (4.8⭐)", href: "/reviews", desc: "200+ отзывов" },
    { label: "Портфель", href: "/gallery", desc: "Фото работ" },
    { label: "Команда", href: "/team", desc: "Наши шефы" },
    { label: "Блог →", href: "/blog", highlight: true },
  ],
  Поддержка: [
    { label: "Рассчитать стоимость", href: "/plan/helper", desc: "За 15 минут", cta: true },
    { label: "Цены", href: "/pricing", desc: "Прозрачные тарифы" },
    { label: "FAQ", href: "/faq", desc: "Ответы на вопросы" },
    { label: "Контакты", href: "/contact", desc: "Связаться с нами" },
    { label: "Документы →", href: "/certificates", highlight: true },
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
                      className={`hover:text-foreground -mx-1 inline-flex min-h-[44px] items-center px-1 py-2 text-sm no-underline transition-colors ${
                        link.cta
                          ? "bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-3 py-2 font-semibold shadow-sm"
                          : link.highlight
                            ? "text-gold-text font-medium"
                            : ""
                      }`}
                      style={!link.cta && !link.highlight ? { color: "#4A423B" } : undefined}
                    >
                      {link.label}
                    </Link>
                    {link.desc && !link.cta && (
                      <span className="text-muted-foreground ml-1.5 text-xs">{link.desc}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Контакты + социальные сети + CTA */}
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
            <p className="text-muted-foreground mt-1 text-xs">Ежедневно 9:00–21:00</p>
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

          {/* Главный CTA */}
          <div className="flex gap-3">
            <Link
              href="/plan/helper"
              className="bg-primary hover:bg-primary/90 text-primary-foreground inline-flex min-h-[44px] items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold no-underline shadow-sm transition-all hover:shadow-md"
            >
              Рассчитать стоимость
            </Link>
            <Link
              href="/contact"
              className="border-line hover:bg-secondary inline-flex min-h-[44px] items-center gap-2 rounded-lg border px-6 py-3 text-sm font-semibold no-underline transition-colors"
            >
              Написать
            </Link>
          </div>
        </div>

        {/* Полезные ссылки (компактная строка) */}
        <div className="border-line mb-8 flex flex-wrap justify-center gap-x-4 gap-y-2 border-t pt-6 text-sm">
          <Link
            href="/faq"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            FAQ
          </Link>
          <Link
            href="/delivery"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Доставка
          </Link>
          <Link
            href="/venues"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Площадки СПб
          </Link>
          <Link
            href="/allergens"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Аллергены
          </Link>
          <Link
            href="/certificates"
            className="text-muted-foreground hover:text-foreground transition-colores"
          >
            Документы
          </Link>
          <Link
            href="/tasting"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Дегустация
          </Link>
          <Link
            href="/careers"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Вакансии
          </Link>
          <Link
            href="/partners"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Партнёрам
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
              Конфиденциальность
            </Link>
            <span>·</span>
            <Link
              href="/terms"
              className="hover:text-foreground inline-flex min-h-[44px] items-center px-2 py-1 no-underline transition-colors"
            >
              Условия
            </Link>
            <span>·</span>
            <Link
              href="/cookies"
              className="hover:text-foreground inline-flex min-h-[44px] items-center px-2 py-1 no-underline transition-colors"
            >
              Cookies
            </Link>
            <span>·</span>
            <Link
              href="/accessibility"
              className="hover:text-foreground inline-flex min-h-[44px] items-center px-2 py-1 no-underline transition-colors"
            >
              Доступность
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
