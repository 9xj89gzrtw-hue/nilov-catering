"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  ChefHat,
  ClipboardCheck,
  Clock,
  Leaf,
  Phone,
  Scale,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
  Utensils,
  Wheat,
} from "lucide-react";

/* Note: `Users` and other lucide icons not used here are kept available for future use. */
import AnimatedCounter from "@/components/effects/AnimatedCounter";
import { SITE } from "@/lib/data";

/* ──────────────────────────────────────────────────────────────────
   Motion variants — staggered scroll-triggered reveals
   ────────────────────────────────────────────────────────────────── */

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const containerStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const itemUp: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE_OUT } },
};

const itemScale: Variants = {
  hidden: { opacity: 1, scale: 1 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE_OUT } },
};

/* ──────────────────────────────────────────────────────────────────
   Data
   ────────────────────────────────────────────────────────────────── */

const BENTO = [
  {
    kind: "photo-lg" as const,
    span: "md:col-span-3 md:row-span-2",
    photo: "/images/catering/chef-01.jpg",
    photoAlt: "Шеф-повар Дмитрий Нилов готовит блюдо на собственном производстве NiloV Catering",
    eyebrow: "С 2007 года",
    title: "19 лет на кухне Петербурга",
    text: "Дмитрий Нилов открыл производство на Васильевском в 2007 году. Начали с кофе-брейков на 20 человек — сегодня проводим банкеты на 200+ и фестивали на 800. Без франшизы, без аутсорса.",
    overlay: true,
  },
  {
    kind: "photo" as const,
    span: "md:col-span-3",
    photo: "/images/catering/staff-01.jpg",
    photoAlt: "Команда официантов и поваров NiloV Catering на мероприятии",
    eyebrow: "Не аутсорс",
    title: "40+ человек в штате",
    text: "Официанты, повара, бармены, координаторы — все с медкнижками и санминимумом. Не «звоним друзьям».",
    overlay: true,
  },
  {
    kind: "photo" as const,
    span: "md:col-span-3",
    photo: "/images/catering/wedding-01.jpg",
    photoAlt: "Свадебный банкет — сервировка и подача NiloV Catering",
    eyebrow: "Реальные события",
    title: "3 000+ событий с 2007",
    text: "От семейного ужина на 10 персон до фестиваля на 800+ гостей. Свадьбы, корпоративы, конгрессы, никях, поминки, дегустации.",
    overlay: true,
  },
  {
    kind: "icon" as const,
    span: "md:col-span-2",
    icon: ShieldCheck,
    title: "14 аллергенов под контролем",
    text: "Маркируем каждое блюдо по ТР ТС 022/2011. EpiPen у координатора при анафилаксии.",
  },
  {
    kind: "icon" as const,
    span: "md:col-span-2",
    icon: Clock,
    title: "Перезвон за 15 минут",
    text: "В рабочее время 9:00–21:00. B2B-менеджер — отдельная линия.",
  },
  {
    kind: "icon" as const,
    span: "md:col-span-2",
    icon: ClipboardCheck,
    title: "ХАССП + медкнижки 100%",
    text: "ГОСТ Р 51705.1-2001. Ежеквартальный внутренний аудит. Журнал бракеража.",
  },
];

const TEAM = [
  {
    name: "Дмитрий Нилов",
    role: "Основатель, шеф-повар",
    photo: "/images/catering/chef-01.jpg",
    photoAlt: "Дмитрий Нилов, основатель и шеф-повар NiloV Catering",
    bio: "19 лет в ресторанном бизнесе. Работал в топ-ресторанах Петербурга. Лично курирует свадьбы и B2B-события от 100 гостей.",
    meta: "С 2007 года",
  },
  {
    name: "Елена Соколова",
    role: "Шеф-кондитер",
    photo: "/images/catering/staff-02.jpg",
    photoAlt: "Елена Соколова, шеф-кондитер NiloV Catering",
    bio: "Специализация: свадебные торты, БГ-выпечка (на рисовой муке), без-сахарные десерты на стевии/эритрите, веган-десерты.",
    meta: "С 2012 года",
  },
  {
    name: "Алексей Козлов",
    role: "Су-шеф, горячий цех",
    photo: "/images/catering/staff-03.jpg",
    photoAlt: "Алексей Козлов, су-шеф NiloV Catering",
    bio: "Отвечает за горячий цех. 12 лет в профессии. Специализация: халяль-линия, банкеты на 200+ гостей, гриль и живые станции.",
    meta: "С 2014 года",
  },
  {
    name: "Мария Васильева",
    role: "Координатор мероприятий",
    photo: "/images/catering/staff-05.jpg",
    photoAlt: "Мария Васильева, event-координатор NiloV Catering",
    bio: "Ведёт свадьбы и корпоративы. 120+ событий в год. Отвечает за логистику, тайминг дня, координацию с площадками и подрядчиками.",
    meta: "С 2016 года",
  },
  {
    name: "Игорь Петров",
    role: "B2B-менеджер",
    photo: "/images/catering/staff-06.jpg",
    photoAlt: "Игорь Петров, B2B-менеджер NiloV Catering",
    bio: "Отвечает за корпоративных клиентов, школы, гос. учреждения. Договоры, ЭДО, НДС, тендеры по 44-ФЗ/223-ФЗ.",
    meta: "С 2018 года",
  },
  {
    name: "Ольга Дмитриева",
    role: "Менеджер по безопасности",
    photo: "/images/catering/staff-07.jpg",
    photoAlt: "Ольга Дмитриева, менеджер по безопасности NiloV Catering",
    bio: "Отвечает за пищевые протоколы: аллергены, целиакия, халяль. Обучает персонал первой помощи при анафилаксии.",
    meta: "С 2019 года",
  },
];

const KITCHEN = [
  {
    src: "/images/catering/chef-02.jpg",
    alt: "Шеф-повар за работой на собственном производстве",
    caption: "Шеф за работой",
  },
  {
    src: "/images/catering/finedining-01.jpg",
    alt: "Авторская подача блюд ресторанного уровня",
    caption: "Авторская подача",
  },
  {
    src: "/images/catering/canape-02.jpg",
    alt: "Канапе авторской подачи на фуршете",
    caption: "Канапе",
  },
  { src: "/images/catering/dessert-01.jpg", alt: "Десерты ручной работы", caption: "Десерты" },
  {
    src: "/images/catering/cake-03.jpg",
    alt: "Свадебный торт ручной работы",
    caption: "Свадебные торты",
  },
  {
    src: "/images/catering/bbq-04.jpg",
    alt: "Гриль и BBQ на выездном мероприятии",
    caption: "Гриль и BBQ",
  },
];

const CASES = [
  {
    date: "Май 2025",
    place: "Конгресс-холл «Экспофорум», СПб",
    title: "Корпоративный фестиваль 800 чел × 2 дня",
    desc: "4 кофе-брейка + 2 обеда + 1 гала-фуршет на 800 человек × 2 дня = 11 200 порций. SLA в договоре (доставка в окно ±15 минут, штраф 1%/мин). Страхование 30 млн ₽. 3 диеты: веган, БГ, всеядные.",
    photo: "/images/real/corporate-buffet.jpg",
    photoAlt: "Корпоративный фуршет на 800 человек — NiloV Catering, Экспофорум",
    tags: ["B2B", "800+ гостей", "SLA", "30 млн ₽"],
    featured: true,
  },
  {
    date: "Сентябрь 2024",
    place: "Лофт на Васильевском, СПб",
    title: "Свадебный банкет 120 гостей",
    desc: "Банкет по тарифу «Стандарт» (5 470 ₽/гость). Свадебный торт на заказ, винная карта, координатор дня. Подача по таймингу ±15 минут (SLA в договоре). Отзыв: 5,0 .",
    photo: "/images/real/wedding-banquet.jpg",
    photoAlt: "Свадебный банкет — сервировка и подача NiloV Catering",
    tags: ["Свадьба", "120 гостей", "Банкет"],
  },
  {
    date: "Август 2025",
    place: "Ресторан «Восток», СПб",
    title: "Никях 60 чел (халяль)",
    desc: "Халяль-банкет. Сертификат Совета муфтиев России (СМР-Халяль (скан по запросу)) проверен лично заказчиком. Забой по зибха, без алкоголя, винный уксус исключён. Раздельные станции для мужчин и женщин.",
    photo: "/images/catering/wedding-04.jpg",
    photoAlt: "Халяльный банкет на никяхе — NiloV Catering",
    tags: ["Халяль", "Никях", "СМР"],
  },
  {
    date: "Ноябрь 2025",
    place: "Дом клиента, СПб",
    title: "Детский день рождения 8 детей (БГ + анафилаксия)",
    desc: "У дочки целиакия + анафилаксия на орехи. БГ-меню по умолчанию без орехов (на рисовой муке). БГ торт, БГ капкейки, БГ пицца — всё без орехов. Протокол <20 ppm, отдельная посуда.",
    photo: "/images/catering/cake-04.jpg",
    photoAlt: "Безглютеновый детский торт без орехов — NiloV Catering",
    tags: ["БГ", "Анафилаксия", "<20 ppm"],
  },
];

const STATS = [
  { kind: "counter" as const, value: 19, suffix: "", label: "лет на кухне Петербурга" },
  { kind: "counter" as const, value: 3000, suffix: "+", label: "событий с 2007 года" },
  { kind: "static" as const, display: "4.8", suffix: "★", label: "рейтинг · 27 отзывов" },
  { kind: "counter" as const, value: 40, suffix: "+", label: "человек в команде" },
];

const CERTS = [
  {
    icon: ShieldCheck,
    title: "ХАССП",
    desc: "ГОСТ Р 51705.1-2001. Внутренний аудит ежеквартально.",
  },
  { icon: Leaf, title: "ТР ТС 022/2011", desc: "14 аллергенов. Маркировка каждого блюда." },
  {
    icon: BadgeCheck,
    title: "Халяль — СМР",
    desc: "Совет муфтиев России, рег. № СМР-Халяль (скан по запросу) (до 31.12.2026).",
  },
  {
    icon: Wheat,
    title: "Безглютеновое <20 ppm",
    desc: "Тестирование по стандарту GFCO. Отдельная посуда и инвентарь.",
  },
  {
    icon: ShieldCheck,
    title: "Страхование ГО 5–30 млн ₽",
    desc: "ведущие страховые компании РФ. Базовый 5 млн ₽, расширение до 30 млн ₽.",
  },
  {
    icon: Scale,
    title: "ЭДО · 152-ФЗ",
    desc: "Контур.Диадок (2AE), СБИС (2АК). Соответствие 152-ФЗ.",
  },
];

/* ──────────────────────────────────────────────────────────────────
   Section: Hero
   ────────────────────────────────────────────────────────────────── */

function Hero() {
  const reducedMotion = useReducedMotion();
  return (
    <section className="relative -mt-px">
      <div className="relative h-[60vh] min-h-[420px] overflow-hidden md:h-[72vh] md:min-h-[560px]">
        <motion.img
          src="/images/catering/chef-03.jpg"
          alt="Шеф-повар NiloV Catering за приготовлением блюда на собственном производстве в Санкт-Петербурге"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "center 35%" }}
          initial={reducedMotion ? false : { scale: 1.08, opacity: 1 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: EASE_OUT }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(28,24,21,0.92) 0%, rgba(28,24,21,0.55) 45%, rgba(28,24,21,0.25) 100%)",
          }}
          aria-hidden="true"
        />
        <div className="container-site relative flex h-full flex-col justify-end pb-12 md:pb-16">
          <motion.p
            initial={reducedMotion ? false : { opacity: 1, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: EASE_OUT }}
            className="text-gold-text mb-3 text-xs font-semibold tracking-[0.22em] uppercase md:text-sm"
          >
            NiloV Catering · с 2007 года
          </motion.p>
          <motion.h1
            initial={reducedMotion ? false : { opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.7, ease: EASE_OUT }}
            className="font-heading max-w-4xl text-4xl leading-[1.05] text-white md:text-6xl lg:text-7xl"
            style={{ fontWeight: 500 }}
          >
            Ресторанное качество <br />
            не обязано стоить <br />
            как ресторан
          </motion.h1>
          <motion.p
            initial={reducedMotion ? false : { opacity: 1, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.65, ease: EASE_OUT }}
            className="mt-5 max-w-xl text-base text-white/85 md:text-lg"
          >
            19 лет готовим там, где нас не ждали: на крышах, в парках, в офисах, на съёмочных
            площадках. Команда 40+ человек, 3 000+ событий, 4.8★ .
          </motion.p>
          <motion.div
            initial={reducedMotion ? false : { opacity: 1, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.78, duration: 0.6, ease: EASE_OUT }}
            className="mt-7 flex flex-wrap gap-3"
          >
            <Link
              href="/plan"
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold no-underline transition-colors"
            >
              Спланировать событие
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/tasting"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white/70 px-6 py-3 text-sm font-semibold text-white no-underline transition-colors hover:bg-white/10"
            >
              Записаться на дегустацию
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Section: Bento grid преимуществ
   ────────────────────────────────────────────────────────────────── */

function BentoCard({ card }: { card: (typeof BENTO)[number] }) {
  if (card.kind === "photo-lg" || card.kind === "photo") {
    return (
      <motion.article
        variants={itemUp}
        className={`${card.span} border-line bg-card group relative min-h-[220px] overflow-hidden rounded-2xl border md:min-h-[260px]`}
      >
        <Image
          src={card.photo}
          alt={card.photoAlt}
          width={600}
          height={400}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(28,24,21,0.92) 0%, rgba(28,24,21,0.45) 55%, rgba(28,24,21,0.15) 100%)",
          }}
          aria-hidden="true"
        />
        <div className="relative flex h-full flex-col justify-end p-5 text-white md:p-6">
          <p className="text-gold-text mb-1.5 text-[11px] font-semibold tracking-[0.2em] uppercase md:text-xs">
            {card.eyebrow}
          </p>
          <h3 className="font-heading mb-1.5 text-xl md:text-2xl" style={{ fontWeight: 500 }}>
            {card.title}
          </h3>
          <p className="text-sm leading-relaxed text-white/85">{card.text}</p>
        </div>
      </motion.article>
    );
  }

  const Icon = card.icon!;
  return (
    <motion.article
      variants={itemUp}
      className={`${card.span} border-line bg-card hover:border-gold-text/40 relative flex flex-col justify-between overflow-hidden rounded-2xl border p-5 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(28,24,21,0.06)] md:p-6`}
    >
      <div className="bg-gold-tint mb-3 flex h-11 w-11 items-center justify-center rounded-xl">
        <Icon className="text-gold-text h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
      </div>
      <div>
        <h3 className="font-heading mb-1.5 text-base md:text-lg" style={{ fontWeight: 500 }}>
          {card.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{card.text}</p>
      </div>
    </motion.article>
  );
}

function BentoGrid() {
  return (
    <section className="py-16 md:py-24" aria-labelledby="bento-heading">
      <div className="container-site">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="mb-8 max-w-2xl md:mb-12"
        >
          <p className="text-gold-text mb-2 text-xs font-semibold tracking-[0.22em] uppercase">
            Принципы
          </p>
          <h2
            id="bento-heading"
            className="font-heading text-foreground text-3xl md:text-4xl lg:text-5xl"
            style={{ fontWeight: 500 }}
          >
            Почему нам доверяют
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl text-base md:text-lg">
            Не лозунги, а конкретные обязательства — закреплённые в договоре, прайсе и SLA.
          </p>
        </motion.div>

        <motion.div
          variants={containerStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid auto-rows-[minmax(200px,1fr)] grid-cols-1 gap-4 md:grid-cols-6 md:gap-5"
        >
          {BENTO.map((card) => (
            <BentoCard key={card.title} card={card} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Section: Team
   ────────────────────────────────────────────────────────────────── */

function Team() {
  return (
    <section className="bg-secondary/40 py-16 md:py-24" aria-labelledby="team-heading">
      <div className="container-site">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="mb-8 max-w-2xl md:mb-12"
        >
          <p className="text-gold-text mb-2 text-xs font-semibold tracking-[0.22em] uppercase">
            Команда
          </p>
          <h2
            id="team-heading"
            className="font-heading text-foreground text-3xl md:text-4xl lg:text-5xl"
            style={{ fontWeight: 500 }}
          >
            Люди, которые готовят
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl text-base md:text-lg">
            Шеф-повара, кондитер, шеф халяль-линии, B2B-координатор. Каждый — со своим стажем,
            специализацией и медкнижкой.
          </p>
        </motion.div>

        <motion.div
          variants={containerStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4"
        >
          {TEAM.map((m) => (
            <motion.article
              key={m.name}
              variants={itemUp}
              className="border-line bg-card group hover:border-gold-text/40 overflow-hidden rounded-2xl border transition-all duration-300 hover:shadow-[0_8px_24px_rgba(28,24,21,0.08)]"
            >
              <div className="bg-secondary relative aspect-[3/4] overflow-hidden">
                <Image
                  src={m.photo}
                  alt={m.photoAlt}
                  width={400}
                  height={533}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(28,24,21,0.75) 0%, rgba(28,24,21,0) 50%)",
                  }}
                  aria-hidden="true"
                />
                <p className="absolute right-3 bottom-3 left-3 text-[11px] font-semibold tracking-[0.18em] text-white/85 uppercase">
                  {m.meta}
                </p>
              </div>
              <div className="p-5">
                <h3 className="font-heading mb-0.5 text-lg" style={{ fontWeight: 500 }}>
                  {m.name}
                </h3>
                <p className="text-gold-text mb-2 text-sm">{m.role}</p>
                <p className="text-muted-foreground text-xs leading-relaxed">{m.bio}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-muted-foreground mt-6 max-w-2xl text-xs italic"
        >
          Фото команды публикуем с согласия сотрудников. Полный список — на странице{" "}
          <Link href="/team" className="text-gold-text underline">
            команда
          </Link>
          .
        </motion.p>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Section: Kitchen gallery
   ────────────────────────────────────────────────────────────────── */

function Kitchen() {
  return (
    <section className="py-16 md:py-24" aria-labelledby="kitchen-heading">
      <div className="container-site">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="mb-8 max-w-2xl md:mb-12"
        >
          <p className="text-gold-text mb-2 text-xs font-semibold tracking-[0.22em] uppercase">
            Наша кухня
          </p>
          <h2
            id="kitchen-heading"
            className="font-heading text-foreground text-3xl md:text-4xl lg:text-5xl"
            style={{ fontWeight: 500 }}
          >
            Собственное производство
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl text-base md:text-lg">
            Готовим на В.О., 20-я линия, 11. Не везём готовое — дочищаем и сервируем на вашей
            площадке. Сезонное меню пересобираем 4 раза в год.
          </p>
        </motion.div>

        <motion.div
          variants={containerStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-6"
        >
          {KITCHEN.map((k, i) => (
            <motion.figure
              key={i}
              variants={itemScale}
              className={`border-line bg-card group relative overflow-hidden rounded-xl border ${
                i === 0 ? "col-span-2 row-span-2 md:col-span-2 lg:col-span-2" : ""
              }`}
            >
              <div
                className={`relative overflow-hidden ${i === 0 ? "aspect-square md:aspect-[4/5]" : "aspect-square"}`}
              >
                <Image
                  src={k.src}
                  alt={k.alt}
                  width={400}
                  height={400}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(28,24,21,0.85) 0%, rgba(28,24,21,0) 55%)",
                  }}
                  aria-hidden="true"
                />
                <figcaption className="absolute right-2 bottom-2 left-2 text-xs font-medium text-white md:text-sm">
                  {k.caption}
                </figcaption>
              </div>
            </motion.figure>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="mt-8 flex flex-wrap items-center gap-3 text-sm"
        >
          <Link
            href="/gallery"
            className="border-line hover:bg-muted inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 font-semibold no-underline transition-colors"
          >
            Вся галерея
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <span className="text-muted-foreground">
            Больше фото — в{" "}
            <Link href="/gallery" className="text-gold-text underline">
              галерея
            </Link>
            {" · "}
            видео с событий — в{" "}
            <Link href="/gallery#videos" className="text-gold-text underline">
              видеогалерее
            </Link>
            .
          </span>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Section: Cases
   ────────────────────────────────────────────────────────────────── */

function Cases() {
  return (
    <section className="bg-secondary/40 py-16 md:py-24" aria-labelledby="cases-heading">
      <div className="container-site">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="mb-8 max-w-2xl md:mb-12"
        >
          <p className="text-gold-text mb-2 text-xs font-semibold tracking-[0.22em] uppercase">
            Кейсы
          </p>
          <h2
            id="cases-heading"
            className="font-heading text-foreground text-3xl md:text-4xl lg:text-5xl"
            style={{ fontWeight: 500 }}
          >
            Что мы уже приготовили
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl text-base md:text-lg">
            Реальные события 2024–2025. С отзывами, SLA и страховым покрытием. Полный список — на{" "}
            <Link href="/reviews" className="text-gold-text underline">
              отзывы
            </Link>
            .
          </p>
        </motion.div>

        <div className="space-y-5 md:space-y-6">
          {CASES.map((c, i) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, ease: EASE_OUT, delay: i * 0.05 }}
              className={`bg-card group grid gap-0 overflow-hidden rounded-2xl border md:grid-cols-2 ${
                c.featured
                  ? "border-gold-text/40 shadow-[0_8px_32px_rgba(142,111,63,0.08)]"
                  : "border-line"
              } transition-shadow duration-300 hover:shadow-[0_12px_36px_rgba(28,24,21,0.08)]`}
            >
              <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[280px]">
                <Image
                  src={c.photo}
                  alt={c.photoAlt}
                  width={600}
                  height={450}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105"
                />
                {c.featured && (
                  <div className="bg-gold-text absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide text-white uppercase">
                    <Sparkles className="h-3 w-3" aria-hidden="true" />
                    Флагман
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-center p-6 md:p-8">
                <p className="text-gold-text mb-2 text-[11px] font-semibold tracking-[0.2em] uppercase">
                  {c.date} · {c.place}
                </p>
                <h3 className="font-heading mb-3 text-xl md:text-2xl" style={{ fontWeight: 500 }}>
                  {c.title}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed md:text-base">
                  {c.desc}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {c.tags.map((t) => (
                    <span
                      key={t}
                      className="bg-gold-tint text-accent-foreground rounded-full px-2.5 py-1 text-xs font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Section: Trust stats (animated counters)
   ────────────────────────────────────────────────────────────────── */

function TrustStats() {
  return (
    <section className="py-16 md:py-24" aria-labelledby="stats-heading">
      <div className="container-site">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="border-line from-secondary/60 to-gold-tint/40 rounded-3xl border bg-gradient-to-br p-8 md:p-12"
        >
          <h2 id="stats-heading" className="sr-only">
            Цифры и факты
          </h2>
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 gap-6 md:gap-8 lg:grid-cols-4"
          >
            {STATS.map((s) => (
              <motion.div key={s.label} variants={itemUp} className="text-center">
                <div
                  className="font-heading text-gold-text mb-2 flex items-baseline justify-center gap-0.5 text-4xl md:text-5xl lg:text-6xl"
                  style={{ fontWeight: 500 }}
                >
                  {s.kind === "counter" ? (
                    <AnimatedCounter value={s.value} suffix={s.suffix} duration={1.8} />
                  ) : (
                    <>
                      <span>{s.display}</span>
                      <span aria-hidden="true" className="text-3xl md:text-4xl">
                        {s.suffix}
                      </span>
                    </>
                  )}
                </div>
                <p className="text-muted-foreground text-xs leading-snug md:text-sm">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Section: Certificates
   ────────────────────────────────────────────────────────────────── */

function Certificates() {
  return (
    <section className="bg-secondary/40 py-16 md:py-24" aria-labelledby="certs-heading">
      <div className="container-site">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="mb-8 max-w-2xl md:mb-12"
        >
          <p className="text-gold-text mb-2 text-xs font-semibold tracking-[0.22em] uppercase">
            Сертификаты и гарантии
          </p>
          <h2
            id="certs-heading"
            className="font-heading text-foreground text-3xl md:text-4xl lg:text-5xl"
            style={{ fontWeight: 500 }}
          >
            Документы, а не обещания
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl text-base md:text-lg">
            Каждый сертификат проверяем и продлеваем. Сканы — на{" "}
            <Link href="/certificates" className="text-gold-text underline">
              сертификаты
            </Link>
            .
          </p>
        </motion.div>

        <motion.div
          variants={containerStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3"
        >
          {CERTS.map((c) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.title}
                variants={itemUp}
                className="border-line bg-card hover:border-gold-text/40 rounded-2xl border p-5 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(28,24,21,0.06)] md:p-6"
              >
                <div className="mb-3 flex items-start gap-3">
                  <div className="bg-gold-tint flex h-11 w-11 shrink-0 items-center justify-center rounded-xl">
                    <Icon className="text-gold-text h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <h3
                    className="font-heading pt-1.5 text-base md:text-lg"
                    style={{ fontWeight: 500 }}
                  >
                    {c.title}
                  </h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{c.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="mt-8 grid gap-3 text-sm sm:grid-cols-3"
        >
          <div className="border-line bg-card flex items-center gap-3 rounded-xl border p-4">
            <Award
              className="text-gold-text h-5 w-5 shrink-0"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <span className="text-muted-foreground">ИП Нилов Д.И. · ИНН 781433059704</span>
          </div>
          <div className="border-line bg-card flex items-center gap-3 rounded-xl border p-4">
            <Utensils
              className="text-gold-text h-5 w-5 shrink-0"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <span className="text-muted-foreground">УСН 6% · работаем по безналу с юрлицами</span>
          </div>
          <div className="border-line bg-card flex items-center gap-3 rounded-xl border p-4">
            <Truck
              className="text-gold-text h-5 w-5 shrink-0"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <span className="text-muted-foreground">ЭДО: Диадок (2AE) · СБИС (2АК)</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Section: CTA
   ────────────────────────────────────────────────────────────────── */

function CTA() {
  return (
    <section className="py-16 md:py-24" aria-labelledby="cta-heading">
      <div className="container-site">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="bg-primary text-primary-foreground relative overflow-hidden rounded-3xl p-8 text-center md:p-12 lg:p-16"
        >
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.3) 0%, transparent 50%)",
            }}
            aria-hidden="true"
          />
          <div className="relative">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] uppercase">
              <Star className="h-3.5 w-3.5" aria-hidden="true" />
              4.8★ · 27 отзывов
            </div>
            <h2
              id="cta-heading"
              className="font-heading mb-4 text-3xl md:text-4xl lg:text-5xl"
              style={{ fontWeight: 500 }}
            >
              Расскажите о вашем событии
            </h2>
            <p className="mx-auto mb-7 max-w-xl text-base opacity-90 md:text-lg">
              Перезвоним за 15 минут в рабочее время. Подготовим смету, меню и тайминг — бесплатно и
              без обязательств.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/plan"
                className="text-ink inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold no-underline transition-colors hover:bg-white/90"
              >
                Спланировать событие
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/tasting"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-white/70 px-6 py-3 text-sm font-semibold no-underline transition-colors hover:bg-white/10"
              >
                <ChefHat className="h-4 w-4" aria-hidden="true" />
                Записаться на дегустацию
              </Link>
              <a
                href={`tel:${SITE.phoneTel}`}
                className="inline-flex items-center gap-2 rounded-lg border-2 border-white/70 px-6 py-3 text-sm font-semibold no-underline transition-colors hover:bg-white/10"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {SITE.phone}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Page content
   ────────────────────────────────────────────────────────────────── */

export default function WhyUsContent() {
  return (
    <main id="main">
      <Hero />
      <BentoGrid />
      <Team />
      <Kitchen />
      <Cases />
      <TrustStats />
      <Certificates />
      <CTA />
    </main>
  );
}
