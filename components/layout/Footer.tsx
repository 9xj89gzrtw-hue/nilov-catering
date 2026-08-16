"use client";

import { useState } from "react";
import Link from "next/link";
import { SITE, SOCIAL_LINKS } from "@/lib/data";
import TextSizeToggle from "@/components/effects/TextSizeToggle";
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  Video,
  ExternalLink,
  Heart,
  Sparkles,
  Calculator,
} from "lucide-react";

/**
 * Footer - Premium luxury footer inspired by Stripe, Linear, Vercel
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
    { label: "Почему мы", href: "/why-us", desc: "с 2007 года" },
    { label: "Отзывы (4.8⭐)", href: "/reviews", desc: "27 отзывов" },
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

const SOCIAL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  vk: MessageCircle,
  telegram: Send,
  whatsapp: MessageCircle,
  rutube: Video,
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isHoveredSocial, setIsHoveredSocial] = useState<string | null>(null);

  return (
    <footer className="relative overflow-hidden bg-[#1a1614]" role="contentinfo">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/4 h-[600px] w-[600px] rounded-full bg-[#6e5530]/10 blur-[120px]" />
        <div className="absolute right-1/4 bottom-0 h-[400px] w-[400px] rounded-full bg-[#c9a961]/5 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-[#6e5530]/40 to-transparent" />
      </div>

      <div className="container-site relative py-20">
        {/* Main content area */}
        <div className="mb-16 grid gap-16 lg:grid-cols-[1fr_2fr]">
          {/* Brand section */}
          <div className="max-w-md">
            <Link href="/" className="group inline-flex items-center gap-3 no-underline">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#6e5530] to-[#8B6914] shadow-lg transition-transform duration-300 group-hover:scale-105">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white">NiloV</span>
                <span className="ml-1.5 text-lg font-light text-[#c9a961]/80">Catering</span>
              </div>
            </Link>

            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/80">
              Премиум кейтеринг в Санкт-Петербурге с 2007 года. Более 3 000 успешных событий и
              безупречная репутация.
            </p>

            {/* Contact info cards */}
            <div className="mt-8 space-y-3">
              <a
                href={`tel:${SITE.phoneTel}`}
                className="group flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.04] px-4 py-3 transition-all duration-300 hover:border-[#6e5530]/30 hover:bg-white/[0.08]"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#6e5530]/20">
                  <Phone className="h-4 w-4 text-[#c9a961]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white transition-colors group-hover:text-[#c9a961]">
                    {SITE.phone}
                  </p>
                  <p className="text-xs text-white/70">Ежедневно 9:00–21:00</p>
                </div>
              </a>

              <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.04] px-4 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#6e5530]/20">
                  <MapPin className="h-4 w-4 text-[#c9a961]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{SITE.address}</p>
                  <p className="text-xs text-white/70">Санкт-Петербург</p>
                </div>
              </div>
            </div>
          </div>

          {/* Links section */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-8 sm:grid-cols-4">
            {Object.entries(FOOTER_LINKS).map(([title, links]) => (
              <div key={title}>
                <h4 className="mb-4 text-xs font-bold tracking-[0.15em] text-white/70 uppercase">
                  {title}
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`group inline-flex min-h-[36px] items-center gap-1.5 text-sm no-underline transition-all duration-300 ${
                          link.cta
                            ? "inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#6e5530] to-[#7a5f36] px-3.5 py-2 text-sm font-semibold text-white shadow-md hover:scale-[1.02] hover:shadow-lg hover:shadow-[#6e5530]/25"
                            : link.highlight
                              ? "font-medium text-[#c9a961] hover:text-white"
                              : "text-white/80 hover:text-white"
                        }`}
                      >
                        {link.label}
                        {!link.cta && (
                          <ExternalLink
                            className={`h-3 w-3 opacity-0 transition-all duration-200 ${"group-hover:translate-x-0 group-hover:opacity-100"} -translate-x-1`}
                          />
                        )}
                        {link.cta && (
                          <ArrowRight className="h-3.5 w-3.5 opacity-70 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                        )}
                      </Link>
                      {link.desc && !link.cta && (
                        <span className="mt-0.5 block text-xs text-white/70">{link.desc}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter section */}
        <div className="relative mb-16 overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-sm">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#6e5530]/10 via-transparent to-[#c9a961]/5" />

          <div className="relative flex flex-col items-center justify-between gap-8 p-8 md:flex-row md:p-10">
            <div className="max-w-md text-center md:text-left">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#6e5530]/20 px-4 py-1.5">
                <Mail className="h-3.5 w-3.5 text-[#c9a961]" />
                <span className="text-xs font-semibold tracking-wider text-[#c9a961] uppercase">
                  Рассылка
                </span>
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Будьте в курсе новостей</h3>
              <p className="text-sm text-white/75">
                Получайте эксклюзивные предложения, рецепты от шефа и идеи для мероприятий.
              </p>
            </div>

            <form className="flex w-full max-w-md gap-3" onSubmit={(e) => e.preventDefault()}>
              <div className="relative flex-1">
                <Mail className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-white/70" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ваш email"
                  className="w-full rounded-xl border border-white/[0.1] bg-white/[0.05] py-3.5 pr-4 pl-11 text-sm text-white transition-all duration-300 outline-none placeholder:text-white/70 focus:border-[#6e5530]/50 focus:bg-white/[0.08] focus:ring-1 focus:ring-[#6e5530]/30"
                  aria-label="Email для рассылки"
                />
              </div>
              <button
                type="submit"
                className="group inline-flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-[#6e5530] to-[#7a5f36] px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-[#6e5530]/25 active:scale-[0.98]"
              >
                Подписаться
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </div>
        </div>

        {/* Social links bar */}
        <div className="mb-12 flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.slice(0, 4).map((link) => {
              const Icon = SOCIAL_ICONS[link.platform] || ExternalLink;
              return (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  aria-label={link.label}
                  onMouseEnter={() => setIsHoveredSocial(link.platform)}
                  onMouseLeave={() => setIsHoveredSocial(null)}
                  className={`group relative flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-300 ${
                    isHoveredSocial === link.platform
                      ? "scale-110 border-[#6e5530]/50 bg-[#6e5530]/20"
                      : "border-white/[0.1] bg-white/[0.03] hover:border-white/[0.2]"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 transition-colors duration-300 ${
                      isHoveredSocial === link.platform
                        ? "text-[#c9a961]"
                        : "text-white/80 group-hover:text-white/90"
                    }`}
                  />
                  {isHoveredSocial === link.platform && (
                    <span className="absolute inset-0 animate-pulse rounded-xl bg-[#6e5530]/20" />
                  )}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/plan/helper"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#6e5530] to-[#7a5f36] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#6e5530]/25"
            >
              <Calculator className="h-4 w-4" />
              Рассчитать стоимость
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-white/[0.15] px-6 py-3 text-sm font-medium text-white/80 transition-all duration-300 hover:border-white/30 hover:bg-white/[0.05] hover:text-white"
            >
              Написать нам
            </Link>
          </div>
        </div>

        {/* Utility links */}
        <div className="mb-8 flex flex-wrap justify-center gap-x-6 gap-y-2 border-t border-white/[0.06] pt-8 text-sm">
          {[
            { href: "/faq", label: "FAQ" },
            { href: "/delivery", label: "Доставка" },
            { href: "/venues", label: "Площадки СПб" },
            { href: "/allergens", label: "Аллергены" },
            { href: "/certificates", label: "Документы" },
            { href: "/tasting", label: "Дегустация" },
            { href: "/careers", label: "Вакансии" },
            { href: "/partners", label: "Партнёрам" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/70 transition-colors duration-200 hover:text-white/80"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Bottom section - legal + copyright */}
        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/[0.06] pt-8 text-sm md:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-white/35">
            <Link href="/privacy" className="transition-colors duration-200 hover:text-white/80">
              Конфиденциальность
            </Link>
            <span className="text-white/15">·</span>
            <Link href="/terms" className="transition-colors duration-200 hover:text-white/80">
              Условия
            </Link>
            <span className="text-white/15">·</span>
            <Link href="/cookies" className="transition-colors duration-200 hover:text-white/80">
              Cookies
            </Link>
            <span className="text-white/15">·</span>
            <Link
              href="/accessibility"
              className="transition-colors duration-200 hover:text-white/80"
            >
              Доступность
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <TextSizeToggle />
            <span className="text-sm text-white/70">© 2007–2026 {SITE.name}</span>
          </div>
        </div>

        {/* Legal info */}
        <div className="mt-6 text-center text-xs leading-relaxed text-white/25">
          <p>
            {SITE.legalName} · ИНН {SITE.inn} · ОГРНИП {SITE.ogrnip}
          </p>
          <p className="mt-2 flex items-center justify-center gap-1.5">
            Сделано <Heart className="h-3 w-3 text-[#c9a961]/60" /> в Санкт-Петербурге
          </p>
        </div>
      </div>
    </footer>
  );
}
