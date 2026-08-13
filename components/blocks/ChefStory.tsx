"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Award, CalendarDays, ChefHat, GraduationCap, Star, Tv } from "lucide-react";

/**
 * ChefStory — Premium секция "История шефа" с art-deco элементами
 *
 * W95: Upgrade по критике Design Critic #1:
 * - Art-deco frame на фото шефа
 * - Premium quote block с золотым градиентом
 * - Enhanced achievements grid
 * - Floating gold accent elements
 */

const ACHIEVEMENTS = [
  { icon: GraduationCap, title: "Кулинарная академия", desc: "Профильное образование" },
  { icon: ChefHat, title: "Французская кухня", desc: "Опыт в топ-ресторанах СПб" },
  { icon: CalendarDays, title: "19 лет опыта", desc: "С 2007 года на кухне" },
  { icon: Star, title: "Авторское меню", desc: "Лично разрабатывает каждое" },
  { icon: Tv, title: "ТВ-участник", desc: "Кулинарные шоу" },
  { icon: Award, title: "Премиум-класс", desc: "Кейтеринг высшей категории" },
];

export default function ChefStory() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="bg-secondary/40 relative overflow-hidden py-20 md:py-32"
      aria-labelledby="chef-story-heading"
    >
      {/* Decorative background elements */}
      <div
        className="absolute top-20 left-10 h-[400px] w-[400px] rounded-full opacity-[0.04]"
        style={{ background: "radial-gradient(circle, #D4AF37 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute right-10 bottom-10 h-[300px] w-[300px] rounded-full opacity-[0.03]"
        style={{ background: "radial-gradient(circle, #D4AF37 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      {/* Gold line at top */}
      <div
        className="absolute top-0 right-0 left-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #C9A961 30%, #D4AF37 50%, #C9A961 70%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <div className="container-site relative z-10">
        {/* Header */}
        <motion.div
          className="mb-14 text-center md:mb-18"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-gold-text mb-3 text-xs font-medium tracking-[0.22em] uppercase">
            Лицо бренда
          </p>
          <h2
            id="chef-story-heading"
            className="font-heading text-3xl md:text-5xl"
            style={{ fontWeight: 500 }}
          >
            История <span className="text-gold-premium">шефа</span>
          </h2>
        </motion.div>

        {/* Main content: Photo + Story */}
        <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT — Photo with art-deco frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="relative mx-auto max-w-md lg:mx-0"
          >
            {/* Art-deco corner accents */}
            <div
              className="absolute -top-4 -left-4 z-10 h-12 w-12 rounded-tl-xl border-t-2 border-l-2 border-[#D4AF37]/50"
              aria-hidden="true"
            />
            <div
              className="absolute -right-4 -bottom-4 z-10 h-12 w-12 rounded-br-xl border-r-2 border-b-2 border-[#D4AF37]/50"
              aria-hidden="true"
            />

            {/* Photo container */}
            <div
              className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-lg"
              style={{
                border: "1px solid rgba(201,169,97,0.25)",
                boxShadow: "0 8px 32px rgba(139,105,20,0.1), 0 0 0 1px rgba(212,175,55,0.08) inset",
              }}
            >
              <Image
                src="/images/team/chef-nilov.jpg"
                alt="Дмитрий Нилов — шеф-повар и основатель NiloV Catering"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

              {/* Name badge */}
              <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/75 via-black/50 to-transparent p-5 md:p-6">
                <p
                  className="font-heading mb-1 text-2xl text-white md:text-3xl"
                  style={{ fontWeight: 500 }}
                >
                  Дмитрий Нилов
                </p>
                <p className="flex items-center gap-2 text-sm text-white/80 md:text-base">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" aria-hidden="true" />
                  Основатель · Шеф-повар · С 2007 года
                </p>
              </div>
            </div>

            {/* Floating experience badge */}
            <div
              className="absolute -right-3 -bottom-3 z-20 rounded-xl px-5 py-3.5 shadow-lg md:-right-6 md:-bottom-6"
              style={{
                background: "linear-gradient(135deg, #B8860B 0%, #D4AF37 100%)",
                boxShadow: "0 8px 24px rgba(184,134,11,0.35)",
              }}
            >
              <p className="font-heading text-3xl leading-none font-semibold text-white">19</p>
              <p className="mt-0.5 text-xs tracking-wider text-white/90 uppercase">лет на кухне</p>
            </div>
          </motion.div>

          {/* RIGHT — Story content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
          >
            {/* Intro text */}
            <div>
              <p className="text-muted-foreground mb-4 text-base leading-relaxed md:text-lg">
                За 19 лет работы в ресторанном бизнесе прошёл путь от{" "}
                <strong className="text-foreground">повара-стажёра</strong> до{" "}
                <strong className="text-foreground">шефа премиум-кейтеринга</strong>, чьи блюда
                украшают свадьбы, корпоративы и частные ужины Петербурга.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed md:text-lg">
                Начинал в ресторанах французской кухни, где впитал любовь к безупречной технике и
                сезонным продуктам. В 2007 году основал NiloV Catering — и с тех пор каждое меню
                несёт его подпись.
              </p>
            </div>

            {/* Quote block */}
            <blockquote
              className="bg-card relative overflow-hidden rounded-2xl p-6 md:p-8"
              style={{
                border: "1px solid rgba(201,169,97,0.2)",
                boxShadow: "0 4px 24px rgba(139,105,20,0.06)",
              }}
            >
              <div
                className="absolute top-0 right-0 left-0 h-px opacity-50"
                style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }}
                aria-hidden="true"
              />
              <span
                className="absolute top-3 left-4 text-7xl leading-none opacity-10 select-none md:text-8xl"
                style={{ fontFamily: "Georgia, serif", color: "#D4AF37" }}
                aria-hidden="true"
              >
                &ldquo;
              </span>

              <blockquote className="relative z-10 pt-6 pl-8">
                <p
                  className="font-heading text-foreground mb-4 text-xl leading-relaxed italic md:text-2xl"
                  style={{ fontWeight: 500 }}
                >
                  Готовим как для себя
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
                  Каждое блюдо, которое выходит из нашей кухни, я должен быть готов подать своей
                  семье. Никаких компромиссов в качестве — только свежие продукты, проверенные
                  техники и искренняя любовь к тому, что мы делаем.
                </p>
                <footer className="mt-5 flex items-center gap-3">
                  <div
                    className="h-11 w-11 overflow-hidden rounded-full"
                    style={{ border: "2px solid rgba(201,169,97,0.4)" }}
                  >
                    <Image
                      src="/images/team/chef-nilov.jpg"
                      alt="Шеф-повар Дмитрий Нилов"
                      width={44}
                      height={44}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <cite className="not-italic">
                    <span className="text-foreground block text-sm font-medium">Дмитрий Нилов</span>
                    <span className="text-gold-text text-xs">Шеф-повар, основатель</span>
                  </cite>
                </footer>
              </blockquote>
            </blockquote>

            {/* Philosophy */}
            <div className="space-y-4">
              <h3
                className="font-heading text-foreground flex items-center gap-3 text-lg md:text-xl"
                style={{ fontWeight: 500 }}
              >
                <span className="h-px w-8 bg-[#D4AF37]" aria-hidden="true" />
                Философия кухни
              </h3>
              <ul className="space-y-3">
                {[
                  "Сезонные продукты от фермеров Ленинградской области",
                  "Меню пересобираем 4 раза в год по сезону",
                  "Личная дегустация каждого нового блюда",
                  "Без полуфабрикатов — всё готовим с нуля",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="text-muted-foreground flex items-start gap-3 text-sm md:text-base"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: "linear-gradient(135deg, #B8860B, #D4AF37)" }}
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Achievements badges */}
        <motion.div
          className="mx-auto mt-16 max-w-4xl md:mt-22"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.35 }}
        >
          <h3
            className="font-heading mb-9 text-center text-lg md:text-xl"
            style={{ fontWeight: 500 }}
          >
            Вехи карьеры
          </h3>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {ACHIEVEMENTS.map((item) => (
              <div
                key={item.title}
                className="group bg-card border-line flex items-start gap-3 rounded-xl border p-4 transition-all duration-300 hover:border-[#D4AF37]/40 md:p-5"
                style={{ boxShadow: "0 1px 3px rgba(28,24,21,0.04)" }}
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 group-hover:bg-[#D4AF37]/15"
                  style={{ background: "rgba(239,230,214,0.6)" }}
                >
                  <item.icon
                    className="text-gold-text h-5 w-5 transition-colors group-hover:text-[#B8860B]"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <p className="text-foreground text-sm leading-snug font-medium">{item.title}</p>
                  <p className="text-muted-foreground mt-0.5 text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="mx-auto mt-16 max-w-2xl text-center md:mt-22"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.45 }}
        >
          <div
            className="relative overflow-hidden rounded-2xl p-8 md:p-12"
            style={{ background: "linear-gradient(145deg, #1C1815 0%, #2A2420 100%)" }}
          >
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: "24px 24px",
              }}
              aria-hidden="true"
            />
            <div
              className="absolute top-0 right-0 left-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }}
              aria-hidden="true"
            />

            <div className="relative z-10">
              <p className="mb-3 text-xs font-medium tracking-[0.22em] text-[#D4AF37] uppercase">
                От первого лица
              </p>
              <h3
                className="font-heading mb-3 text-2xl text-white md:text-3xl"
                style={{ fontWeight: 500 }}
              >
                Хотите попробовать?
              </h3>
              <p className="mb-7 text-base leading-relaxed text-white/65 md:text-lg">
                Запишитесь на дегустацию — шеф лично представит меню и подберёт варианты под ваше
                событие.
              </p>
              <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/menu"
                  className="group inline-flex min-w-[240px] items-center justify-center gap-2.5 rounded-full px-8 py-4 text-base font-semibold no-underline transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: "linear-gradient(135deg, #B8860B 0%, #D4AF37 50%, #AA771C 100%)",
                    color: "white",
                    boxShadow: "0 4px 16px rgba(184,134,11,0.35)",
                  }}
                >
                  Познакомиться с меню
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
                <Link
                  href="/tasting"
                  className="inline-flex min-w-[200px] items-center justify-center gap-2.5 rounded-full border-2 border-white/20 px-6 py-4 text-base font-medium text-white no-underline transition-all duration-300 hover:border-white/30 hover:bg-white/5"
                >
                  Записаться на дегустацию
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom gold line */}
      <div
        className="absolute right-0 bottom-0 left-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #C9A961 30%, #D4AF37 50%, #C9A961 70%, transparent 100%)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
