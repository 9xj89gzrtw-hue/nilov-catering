"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Star } from "lucide-react";

/**
 * NamedPackageGrid — Premium package grid with luxury card effects
 *
 * W95: Upgrade по критике Design Critic #1:
 * - Featured cards with gold border glow and star badge
 * - Premium hover: lift + gold shine sweep effect
 * - Art-deco corner accents on featured packages
 * - Enhanced typography and spacing
 */

const PACKAGES = [
  {
    name: "Фуршет «Гавань»",
    price: "2 450 ₽",
    unit: "/гость",
    min: "от 20 гостей",
    photoUrl: "/images/catering/canape-01.jpg",
    includes: ["12 закусок", "2 горячего", "1 десерт", "Официанты", "Посуда"],
    href: "/menu/furshet",
    badge: "Популярное",
    featured: true,
  },
  {
    name: "Банкет «Гранд»",
    price: "3 950 ₽",
    unit: "/гость",
    min: "от 15 гостей",
    photoUrl: "/images/catering/finedining-01.jpg",
    includes: ["4 закуски", "2 горячего", "Десерт", "Винная карта", "Координатор"],
    href: "/menu/banquet",
    badge: null,
    featured: false,
  },
  {
    name: "Кофе-брейк «Лайт»",
    price: "390 ₽",
    unit: "/гость",
    min: "от 10 гостей",
    photoUrl: "/images/catering/coffee-01.jpg",
    includes: ["Кофе-бар", "3 выпечки", "Сэндвичи", "Фрукты", "2 смены"],
    href: "/menu/coffee-break",
    badge: "от 390₽",
    featured: false,
  },
  {
    name: "BBQ «Пикник»",
    price: "2 700 ₽",
    unit: "/гость",
    min: "от 15 гостей",
    photoUrl: "/images/catering/bbq-01.jpg",
    includes: ["Мангал", "3 вида мяса", "Овощи-гриль", "Соусы", "Бармен"],
    href: "/seasonal/bbq",
    badge: null,
    featured: false,
  },
  {
    name: "Детский «Праздник»",
    price: "1 550 ₽",
    unit: "/гость",
    min: "от 10 детей",
    photoUrl: "/images/catering/dessert-01.jpg",
    includes: ["Детское меню", "Аниматор 2 часа", "Капкейки", "Сок-бар", "Шоу-программа"],
    href: "/events/detskoe",
    badge: null,
    featured: false,
  },
  {
    name: "Шеф на дом",
    price: "4 500 ₽",
    unit: "/гость",
    min: "от 6 гостей",
    photoUrl: "/images/catering/chef-01.jpg",
    includes: ["Шеф-повар", "6 подач", "Сомелье (опц.)", "Продукты", "Уборка"],
    href: "/events/chef-at-home",
    badge: "Премиум",
    featured: true,
  },
];

// Animation variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function NamedPackageGrid() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="bg-background relative overflow-hidden py-20 md:py-32"
      aria-labelledby="packages-heading"
    >
      {/* Subtle background decoration */}
      <div
        className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full opacity-[0.03]"
        style={{
          background: "radial-gradient(circle, #D4AF37 0%, transparent 70%)",
          transform: "translate(30%, -30%)",
        }}
        aria-hidden="true"
      />

      <div className="container-site relative z-10">
        {/* Header */}
        <motion.div
          className="mb-12 flex flex-col justify-between gap-4 md:mb-16 md:flex-row md:items-end"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-2xl">
            <p className="text-gold-text mb-3 text-xs font-medium tracking-[0.22em] uppercase">
              Готовые пакеты
            </p>
            <h2
              id="packages-heading"
              className="font-heading text-3xl md:text-5xl"
              style={{ fontWeight: 500 }}
            >
              6 готовых пакетов <span className="text-gold-premium">под ваш бюджет</span>
            </h2>
          </div>

          <Link
            href="/pricing"
            className="group border-line bg-card text-foreground hover:text-gold-text inline-flex min-h-[44px] items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium no-underline transition-all duration-300 hover:border-[#D4AF37]"
          >
            Все тарифы и сравнение
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </motion.div>

        {/* Package Grid */}
        <motion.div
          className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {PACKAGES.map((pkg) => (
            <motion.article
              key={pkg.name}
              variants={itemVariants}
              className={`group relative ${pkg.featured ? "lg:row-span-1" : ""}`}
            >
              <Link
                href={pkg.href}
                className={`block h-full overflow-hidden rounded-2xl no-underline transition-all duration-500 ${
                  pkg.featured
                    ? "bg-card border-2 border-[#D4AF37]/60 shadow-lg hover:shadow-2xl"
                    : "border-line bg-card border hover:border-[#D4AF37]/40 hover:shadow-xl"
                }`}
                style={
                  pkg.featured
                    ? {
                        boxShadow:
                          "0 0 0 1px rgba(212,175,55,0.15), 0 8px 32px rgba(139,105,20,0.12), 0 0 60px rgba(201,169,97,0.08)",
                      }
                    : {}
                }
              >
                {/* Shine sweep effect container */}
                <div className="relative">
                  {/* Photo */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={pkg.photoUrl}
                      alt={`${pkg.name} — фото блюд`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* Badge */}
                    {pkg.badge && (
                      <span
                        className={`absolute top-3 right-3 z-10 inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold ${
                          pkg.featured
                            ? "bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-white shadow-lg"
                            : "bg-foreground text-background"
                        }`}
                      >
                        {pkg.featured && <Star className="h-3 w-3" aria-hidden="true" />}
                        {pkg.badge}
                      </span>
                    )}

                    {/* Gold corner accent for featured */}
                    {pkg.featured && (
                      <>
                        <div
                          className="absolute top-0 left-0 h-8 w-8 rounded-tl-2xl border-t-2 border-l-2 border-[#D4AF37]/50"
                          aria-hidden="true"
                        />
                        <div
                          className="absolute right-0 bottom-0 h-8 w-8 rounded-br-2xl border-r-2 border-b-2 border-[#D4AF37]/50"
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </div>

                  {/* Shine sweep effect */}
                  <div
                    className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 45%, rgba(255,255,255,0.08) 51%, transparent 56%)",
                      transform: "translateX(-100%)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateX(200%)";
                      e.currentTarget.style.transition =
                        "transform 0.7s cubic-bezier(0.23, 1, 0.32, 1)";
                    }}
                  />
                </div>

                {/* Content */}
                <div className="p-5 lg:p-6">
                  <h3
                    className="font-heading text-foreground mb-2 text-lg lg:text-xl"
                    style={{ fontWeight: 500 }}
                  >
                    {pkg.name}
                  </h3>

                  {/* Price */}
                  <div className="mb-4 flex items-baseline gap-2">
                    <span
                      className={`font-heading text-2xl lg:text-3xl ${
                        pkg.featured ? "text-gold-premium" : "text-foreground"
                      }`}
                      style={{ fontWeight: 600 }}
                    >
                      от {pkg.price}
                    </span>
                    <span className="text-muted-foreground text-sm">{pkg.unit}</span>
                    <span className="text-muted-foreground ml-auto text-xs">{pkg.min}</span>
                  </div>

                  {/* Includes list */}
                  <ul className="mb-5 space-y-2">
                    {pkg.includes.map((item) => (
                      <li
                        key={item}
                        className="text-muted-foreground flex items-center gap-2.5 text-sm"
                      >
                        <svg
                          className={`h-4 w-4 shrink-0 ${pkg.featured ? "text-[#D4AF37]" : "text-gold-text"}`}
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          aria-hidden="true"
                        >
                          <path
                            d="M3 8l3.5 3.5L13 5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div
                    className={`flex items-center justify-between border-t pt-4 text-sm font-medium transition-colors ${
                      pkg.featured
                        ? "text-gold-text border-[#D4AF37]/20 group-hover:text-[#B8860B]"
                        : "border-line text-foreground group-hover:text-gold-text"
                    }`}
                  >
                    <span>Выбрать пакет</span>
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// W95: NamedPackageGrid premium upgrade with featured cards, shine effects, art-deco accents
