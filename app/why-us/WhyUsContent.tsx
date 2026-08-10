'use client';

import Link from 'next/link';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
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
} from 'lucide-react';

/* Note: `Users` and other lucide icons not used here are kept available for future use. */
import AnimatedCounter from '@/components/effects/AnimatedCounter';
import { SITE } from '@/lib/data';

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
    kind: 'photo-lg' as const,
    span: 'md:col-span-3 md:row-span-2',
    photo: '/images/catering/chef-01.jpg',
    photoAlt: 'Шеф-повар Дмитрий Нилов готовит блюдо на собственном производстве NiloV Catering',
    eyebrow: 'С 2007 года',
    title: '19 лет на кухне Петербурга',
    text: 'Дмитрий Нилов открыл производство на Васильевском в 2007 году. Начали с кофе-брейков на 20 человек — сегодня проводим банкеты на 200+ и фестивали на 800. Без франшизы, без аутсорса.',
    overlay: true,
  },
  {
    kind: 'photo' as const,
    span: 'md:col-span-3',
    photo: '/images/catering/staff-01.jpg',
    photoAlt: 'Команда официантов и поваров NiloV Catering на мероприятии',
    eyebrow: 'Не аутсорс',
    title: '40+ человек в штате',
    text: 'Официанты, повара, бармены, координаторы — все с медкнижками и санминимумом. Не «звоним друзьям».',
    overlay: true,
  },
  {
    kind: 'photo' as const,
    span: 'md:col-span-3',
    photo: '/images/catering/wedding-01.jpg',
    photoAlt: 'Свадебный банкет — сервировка и подача NiloV Catering',
    eyebrow: 'Реальные события',
    title: '3 000+ событий с 2007',
    text: 'От семейного ужина на 10 персон до фестиваля на 800+ гостей. Свадьбы, корпоративы, конгрессы, никях, поминки, дегустации.',
    overlay: true,
  },
  {
    kind: 'icon' as const,
    span: 'md:col-span-2',
    icon: ShieldCheck,
    title: '14 аллергенов под контролем',
    text: 'Маркируем каждое блюдо по ТР ТС 022/2011. EpiPen у координатора при анафилаксии.',
  },
  {
    kind: 'icon' as const,
    span: 'md:col-span-2',
    icon: Clock,
    title: 'Перезвон за 15 минут',
    text: 'В рабочее время 9:00–21:00. B2B-менеджер — отдельная линия.',
  },
  {
    kind: 'icon' as const,
    span: 'md:col-span-2',
    icon: ClipboardCheck,
    title: 'ХАССП + медкнижки 100%',
    text: 'ГОСТ Р 51705.1-2001. Ежеквартальный внутренний аудит. Журнал бракеража.',
  },
];

const TEAM = [
  {
    name: 'Дмитрий Нилов',
    role: 'Основатель, шеф-повар',
    photo: '/images/catering/chef-01.jpg',
    photoAlt: 'Дмитрий Нилов, основатель и шеф-повар NiloV Catering',
    bio: '19 лет в ресторанном бизнесе. Работал в топ-ресторанах Петербурга. Лично курирует свадьбы и B2B-события от 100 гостей.',
    meta: 'С 2007 года',
  },
  {
    name: 'Елена Соколова',
    role: 'Шеф-кондитер',
    photo: '/images/catering/staff-02.jpg',
    photoAlt: 'Елена Соколова, шеф-кондитер NiloV Catering',
    bio: 'Специализация: свадебные торты, БГ-выпечка (на рисовой муке), без-сахарные десерты на стевии/эритрите, веган-десерты.',
    meta: 'С 2012 года',
  },
  {
    name: 'Алексей Козлов',
    role: 'Су-шеф, горячий цех',
    photo: '/images/catering/staff-03.jpg',
    photoAlt: 'Алексей Козлов, су-шеф NiloV Catering',
    bio: 'Отвечает за горячий цех. 12 лет в профессии. Специализация: халяль-линия, банкеты на 200+ гостей, гриль и живые станции.',
    meta: 'С 2014 года',
  },
  {
    name: 'Мария Васильева',
    role: 'Event-координатор',
    photo: '/images/catering/staff-05.jpg',
    photoAlt: 'Мария Васильева, event-координатор NiloV Catering',
    bio: 'Ведёт свадьбы и корпоративы. 120+ событий в год. Отвечает за логистику, тайминг дня, координацию с площадками и подрядчиками.',
    meta: 'С 2016 года',
  },
];

const KITCHEN = [
  { src: '/images/catering/chef-02.jpg', alt: 'Шеф-повар за работой на собственном производстве', caption: 'Шеф за работой' },
  { src: '/images/catering/finedining-01.jpg', alt: 'Авторская подача блюд fine dining', caption: 'Авторская подача' },
  { src: '/images/catering/canape-02.jpg', alt: 'Канапе авторской подачи на фуршете', caption: 'Канапе' },
  { src: '/images/catering/dessert-01.jpg', alt: 'Десерты ручной работы', caption: 'Десерты' },
  { src: '/images/catering/cake-03.jpg', alt: 'Свадебный торт ручной работы', caption: 'Свадебные торты' },
  { src: '/images/catering/bbq-04.jpg', alt: 'Гриль и BBQ на выездном мероприятии', caption: 'Гриль и BBQ' },
];

const CASES = [
  {
    date: 'Май 2025',
    place: 'Конгресс-холл «Экспофорум», СПб',
    title: 'Корпоративный фестиваль 800 чел × 2 дня',
    desc: '4 кофе-брейка + 2 обеда + 1 гала-фуршет на 800 человек ежедневно = 5 600 порций за 2 дня. SLA в договоре (доставка в окно ±15 минут, штраф 1%/мин). Страхование 30 млн ₽. 3 диеты: веган, БГ, всеядные.',
    photo: '/images/real/corporate-buffet.jpg',
    photoAlt: 'Корпоративный фуршет на 800 человек — NiloV Catering, Экспофорум',
    tags: ['B2B', '800+ гостей', 'SLA', '30 млн ₽'],
    featured: true,
  },
  {
    date: 'Сентябрь 2024',
    place: 'Лофт на Васильевском, СПб',
    title: 'Свадебный банкет 120 гостей',
    desc: 'Банкет по тарифу «Стандарт» (5 470 ₽/гость). Свадебный торт на заказ, винная карта, координатор дня. Подача по таймингу ±5 мин. Отзыв: 5,0 на Yandex.Maps.',
    photo: '/images/real/wedding-banquet.jpg',
    photoAlt: 'Свадебный банкет — сервировка и подача NiloV Catering',
    tags: ['Свадьба', '120 гостей', 'Банкет'],
  },
  {
    date: 'Август 2025',
    place: 'Ресторан «Восток», СПб',
    title: 'Никях 60 чел (халяль)',
    desc: 'Халяль-банкет. Сертификат Совета муфтиев России (СМР-Халяль-2026-142) проверен лично заказчиком. Забой по зибха, без алкоголя, винный уксус исключён. Раздельные станции для мужчин и женщин.',
    photo: '/images/catering/wedding-04.jpg',
    photoAlt: 'Халяльный банкет на никяхе — NiloV Catering',
    tags: ['Халяль', 'Никях', 'СМР'],
  },
  {
    date: 'Ноябрь 2025',
    place: 'Дом клиента, СПб',
    title: 'Детский день рождения 8 детей (БГ + анафилаксия)',
    desc: 'У дочки целиакия + анафилаксия на орехи. БГ-меню по умолчанию nut-free (на рисовой муке). БГ торт, БГ капкейки, БГ пицца — всё без орехов. Протокол <20 ppm, отдельная посуда.',
    photo: '/images/catering/cake-04.jpg',
    photoAlt: 'Безглютеновый детский торт без орехов — NiloV Catering',
    tags: ['БГ', 'Анафилаксия', '<20 ppm'],
  },
];

const STATS = [
  { kind: 'counter' as const, value: 19, suffix: '', label: 'лет на кухне Петербурга' },
  { kind: 'counter' as const, value: 3000, suffix: '+', label: 'событий с 2007 года' },
  { kind: 'static' as const, display: '4.8', suffix: '★', label: 'рейтинг · 27 отзывов' },
  { kind: 'counter' as const, value: 40, suffix: '+', label: 'человек в команде' },
];

const CERTS = [
  { icon: ShieldCheck, title: 'ХАССП', desc: 'ГОСТ Р 51705.1-2001. Внутренний аудит ежеквартально.' },
  { icon: Leaf, title: 'ТР ТС 022/2011', desc: '14 аллергенов. Маркировка каждого блюда.' },
  { icon: BadgeCheck, title: 'Халяль — СМР', desc: 'Совет муфтиев России, рег. № СМР-Халяль-2026-142 (до 31.12.2026).' },
  { icon: Wheat, title: 'Безглютеновое <20 ppm', desc: 'Тестирование по стандарту GFCO. Отдельная посуда и инвентарь.' },
  { icon: ShieldCheck, title: 'Страхование ГО 5–30 млн ₽', desc: 'СОГАЗ / РЕСО / Ингосстрах. Базовый 5 млн ₽, расширение до 30 млн ₽.' },
  { icon: Scale, title: 'ЭДО · 152-ФЗ', desc: 'Контур.Диадок (2AE), СБИС (2АК). Соответствие 152-ФЗ.' },
];

/* ──────────────────────────────────────────────────────────────────
   Section: Hero
   ────────────────────────────────────────────────────────────────── */

function Hero() {
  const reducedMotion = useReducedMotion();
  return (
    <section className="relative -mt-px">
      <div className="relative h-[60vh] min-h-[420px] md:h-[72vh] md:min-h-[560px] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img
          src="/images/catering/chef-03.jpg"
          alt="Шеф-повар NiloV Catering за приготовлением блюда на собственном производстве в Санкт-Петербурге"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'center 35%' }}
          initial={reducedMotion ? false : { scale: 1.08, opacity: 1 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: EASE_OUT }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(28,24,21,0.92) 0%, rgba(28,24,21,0.55) 45%, rgba(28,24,21,0.25) 100%)' }}
          aria-hidden="true"
        />
        <div className="relative h-full container-site flex flex-col justify-end pb-12 md:pb-16">
          <motion.p
            initial={reducedMotion ? false : { opacity: 1, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: EASE_OUT }}
            className="text-xs md:text-sm uppercase tracking-[0.22em] text-gold-text mb-3 font-semibold"
          >
            NiloV Catering · с 2007 года
          </motion.p>
          <motion.h1
            initial={reducedMotion ? false : { opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.7, ease: EASE_OUT }}
            className="font-heading text-4xl md:text-6xl lg:text-7xl text-white max-w-4xl leading-[1.05]"
            style={{ fontWeight: 500 }}
          >
            Ресторанное качество<br />не обязано стоить<br />как ресторан
          </motion.h1>
          <motion.p
            initial={reducedMotion ? false : { opacity: 1, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.65, ease: EASE_OUT }}
            className="text-base md:text-lg text-white/85 mt-5 max-w-xl"
          >
            19 лет готовим там, где нас не ждали: на крышах, в парках, в офисах, на съёмочных площадках.
            Команда 40+ человек, 3 000+ событий, 4.8★ на Yandex.Maps.
          </motion.p>
          <motion.div
            initial={reducedMotion ? false : { opacity: 1, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.78, duration: 0.6, ease: EASE_OUT }}
            className="mt-7 flex flex-wrap gap-3"
          >
            <Link
              href="/plan"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors no-underline"
            >
              Спланировать событие
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href="/tasting"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white/70 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors no-underline"
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

function BentoCard({ card }: { card: typeof BENTO[number] }) {
  if (card.kind === 'photo-lg' || card.kind === 'photo') {
    return (
      <motion.article
        variants={itemUp}
        className={`${card.span} relative overflow-hidden rounded-2xl border border-line bg-card group min-h-[220px] md:min-h-[260px]`}
      >
        <img
          src={card.photo}
          alt={card.photoAlt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(28,24,21,0.92) 0%, rgba(28,24,21,0.45) 55%, rgba(28,24,21,0.15) 100%)' }}
          aria-hidden="true"
        />
        <div className="relative h-full flex flex-col justify-end p-5 md:p-6 text-white">
          <p className="text-[11px] md:text-xs uppercase tracking-[0.2em] text-gold-text mb-1.5 font-semibold">
            {card.eyebrow}
          </p>
          <h3 className="font-heading text-xl md:text-2xl mb-1.5" style={{ fontWeight: 500 }}>
            {card.title}
          </h3>
          <p className="text-sm text-white/85 leading-relaxed">{card.text}</p>
        </div>
      </motion.article>
    );
  }

  const Icon = card.icon!;
  return (
    <motion.article
      variants={itemUp}
      className={`${card.span} relative overflow-hidden rounded-2xl border border-line bg-card p-5 md:p-6 flex flex-col justify-between hover:border-gold-text/40 hover:shadow-[0_8px_24px_rgba(28,24,21,0.06)] transition-all duration-300`}
    >
      <div className="w-11 h-11 rounded-xl bg-gold-tint flex items-center justify-center mb-3">
        <Icon className="w-5 h-5 text-gold-text" strokeWidth={1.5} aria-hidden="true" />
      </div>
      <div>
        <h3 className="font-heading text-base md:text-lg mb-1.5" style={{ fontWeight: 500 }}>
          {card.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{card.text}</p>
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
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="max-w-2xl mb-8 md:mb-12"
        >
          <p className="text-xs uppercase tracking-[0.22em] text-gold-text mb-2 font-semibold">
            Принципы
          </p>
          <h2
            id="bento-heading"
            className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground"
            style={{ fontWeight: 500 }}
          >
            Почему нам доверяют
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mt-3 max-w-xl">
            Не лозунги, а конкретные обязательства — закреплённые в договоре, прайсе и SLA.
          </p>
        </motion.div>

        <motion.div
          variants={containerStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-5 auto-rows-[minmax(200px,1fr)]"
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
    <section className="py-16 md:py-24 bg-secondary/40" aria-labelledby="team-heading">
      <div className="container-site">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="max-w-2xl mb-8 md:mb-12"
        >
          <p className="text-xs uppercase tracking-[0.22em] text-gold-text mb-2 font-semibold">
            Команда
          </p>
          <h2
            id="team-heading"
            className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground"
            style={{ fontWeight: 500 }}
          >
            Люди, которые готовят
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mt-3 max-w-xl">
            Шеф-повара, кондитер, шеф халяль-линии, B2B-координатор. Каждый — со своим стажем,
            специализацией и медкнижкой.
          </p>
        </motion.div>

        <motion.div
          variants={containerStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
        >
          {TEAM.map((m) => (
            <motion.article
              key={m.name}
              variants={itemUp}
              className="rounded-2xl overflow-hidden border border-line bg-card group hover:shadow-[0_8px_24px_rgba(28,24,21,0.08)] hover:border-gold-text/40 transition-all duration-300"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                <img
                  src={m.photo}
                  alt={m.photoAlt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(28,24,21,0.75) 0%, rgba(28,24,21,0) 50%)' }}
                  aria-hidden="true"
                />
                <p className="absolute bottom-3 left-3 right-3 text-[11px] uppercase tracking-[0.18em] text-white/85 font-semibold">
                  {m.meta}
                </p>
              </div>
              <div className="p-5">
                <h3 className="font-heading text-lg mb-0.5" style={{ fontWeight: 500 }}>
                  {m.name}
                </h3>
                <p className="text-sm text-gold-text mb-2">{m.role}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{m.bio}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs text-muted-foreground italic mt-6 max-w-2xl"
        >
          Фото команды публикуем с согласия сотрудников. Полный список — на странице{' '}
          <Link href="/team" className="underline text-gold-text">команда</Link>.
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
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="max-w-2xl mb-8 md:mb-12"
        >
          <p className="text-xs uppercase tracking-[0.22em] text-gold-text mb-2 font-semibold">
            Наша кухня
          </p>
          <h2
            id="kitchen-heading"
            className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground"
            style={{ fontWeight: 500 }}
          >
            Собственное производство
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mt-3 max-w-xl">
            Готовим на В.О., 20-я линия, 11. Не везём готовое — дочищаем и сервируем на вашей площадке.
            Сезонное меню пересобираем 4 раза в год.
          </p>
        </motion.div>

        <motion.div
          variants={containerStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4"
        >
          {KITCHEN.map((k, i) => (
            <motion.figure
              key={i}
              variants={itemScale}
              className={`relative overflow-hidden rounded-xl border border-line bg-card group ${
                i === 0 ? 'col-span-2 md:col-span-2 lg:col-span-2 row-span-2' : ''
              }`}
            >
              <div className={`relative overflow-hidden ${i === 0 ? 'aspect-square md:aspect-[4/5]' : 'aspect-square'}`}>
                <img
                  src={k.src}
                  alt={k.alt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(28,24,21,0.85) 0%, rgba(28,24,21,0) 55%)' }}
                  aria-hidden="true"
                />
                <figcaption className="absolute bottom-2 left-2 right-2 text-xs md:text-sm font-medium text-white">
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
            className="inline-flex items-center gap-2 rounded-lg border border-line px-5 py-2.5 font-semibold hover:bg-muted transition-colors no-underline"
          >
            Вся галерея
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
          <span className="text-muted-foreground">
            Больше фото — в{' '}
            <Link href="/gallery" className="underline text-gold-text">галерея</Link>
            {' · '}
            видео с событий — в{' '}
            <Link href="/gallery#videos" className="underline text-gold-text">видеогалерее</Link>.
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
    <section className="py-16 md:py-24 bg-secondary/40" aria-labelledby="cases-heading">
      <div className="container-site">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="max-w-2xl mb-8 md:mb-12"
        >
          <p className="text-xs uppercase tracking-[0.22em] text-gold-text mb-2 font-semibold">
            Кейсы
          </p>
          <h2
            id="cases-heading"
            className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground"
            style={{ fontWeight: 500 }}
          >
            Что мы уже приготовили
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mt-3 max-w-xl">
            Реальные события 2024–2025. С отзывами, SLA и страховым покрытием.
            Полный список — на <Link href="/reviews" className="underline text-gold-text">отзывы</Link>.
          </p>
        </motion.div>

        <div className="space-y-5 md:space-y-6">
          {CASES.map((c, i) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, ease: EASE_OUT, delay: i * 0.05 }}
              className={`grid md:grid-cols-2 gap-0 rounded-2xl border bg-card overflow-hidden group ${
                c.featured ? 'border-gold-text/40 shadow-[0_8px_32px_rgba(142,111,63,0.08)]' : 'border-line'
              } hover:shadow-[0_12px_36px_rgba(28,24,21,0.08)] transition-shadow duration-300`}
            >
              <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[280px] overflow-hidden">
                <img
                  src={c.photo}
                  alt={c.photoAlt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105"
                />
                {c.featured && (
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-gold-text px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                    <Sparkles className="w-3 h-3" aria-hidden="true" />
                    Флагман
                  </div>
                )}
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <p className="text-[11px] uppercase tracking-[0.2em] text-gold-text font-semibold mb-2">
                  {c.date} · {c.place}
                </p>
                <h3 className="font-heading text-xl md:text-2xl mb-3" style={{ fontWeight: 500 }}>
                  {c.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
                  {c.desc}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {c.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2.5 py-1 rounded-full bg-gold-tint text-accent-foreground font-medium"
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
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="rounded-3xl border border-line bg-gradient-to-br from-secondary/60 to-gold-tint/40 p-8 md:p-12"
        >
          <h2 id="stats-heading" className="sr-only">
            Цифры и факты
          </h2>
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {STATS.map((s) => (
              <motion.div key={s.label} variants={itemUp} className="text-center">
                <div
                  className="font-heading text-4xl md:text-5xl lg:text-6xl text-gold-text mb-2 flex items-baseline justify-center gap-0.5"
                  style={{ fontWeight: 500 }}
                >
                  {s.kind === 'counter' ? (
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
                <p className="text-xs md:text-sm text-muted-foreground leading-snug">
                  {s.label}
                </p>
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
    <section className="py-16 md:py-24 bg-secondary/40" aria-labelledby="certs-heading">
      <div className="container-site">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="max-w-2xl mb-8 md:mb-12"
        >
          <p className="text-xs uppercase tracking-[0.22em] text-gold-text mb-2 font-semibold">
            Сертификаты и гарантии
          </p>
          <h2
            id="certs-heading"
            className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground"
            style={{ fontWeight: 500 }}
          >
            Документы, а не обещания
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mt-3 max-w-xl">
            Каждый сертификат проверяем и продлеваем. Сканы — на{' '}
            <Link href="/certificates" className="underline text-gold-text">сертификаты</Link>.
          </p>
        </motion.div>

        <motion.div
          variants={containerStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
        >
          {CERTS.map((c) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.title}
                variants={itemUp}
                className="rounded-2xl border border-line bg-card p-5 md:p-6 hover:border-gold-text/40 hover:shadow-[0_8px_24px_rgba(28,24,21,0.06)] transition-all duration-300"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-gold-tint flex items-center justify-center">
                    <Icon className="w-5 h-5 text-gold-text" strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-base md:text-lg pt-1.5" style={{ fontWeight: 500 }}>
                    {c.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="mt-8 grid sm:grid-cols-3 gap-3 text-sm"
        >
          <div className="rounded-xl border border-line bg-card p-4 flex items-center gap-3">
            <Award className="w-5 h-5 text-gold-text shrink-0" strokeWidth={1.5} aria-hidden="true" />
            <span className="text-muted-foreground">
              ИП Нилов Д.И. · ИНН 781433059704
            </span>
          </div>
          <div className="rounded-xl border border-line bg-card p-4 flex items-center gap-3">
            <Utensils className="w-5 h-5 text-gold-text shrink-0" strokeWidth={1.5} aria-hidden="true" />
            <span className="text-muted-foreground">
              УСН 6% · работаем по безналу с юрлицами
            </span>
          </div>
          <div className="rounded-xl border border-line bg-card p-4 flex items-center gap-3">
            <Truck className="w-5 h-5 text-gold-text shrink-0" strokeWidth={1.5} aria-hidden="true" />
            <span className="text-muted-foreground">
              ЭДО: Диадок (2AE) · СБИС (2АК)
            </span>
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
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground p-8 md:p-12 lg:p-16 text-center"
        >
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.3) 0%, transparent 50%)',
            }}
            aria-hidden="true"
          />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] mb-5">
              <Star className="w-3.5 h-3.5" aria-hidden="true" />
              4.8★ · 27 отзывов на Yandex.Maps
            </div>
            <h2
              id="cta-heading"
              className="font-heading text-3xl md:text-4xl lg:text-5xl mb-4"
              style={{ fontWeight: 500 }}
            >
              Расскажите о вашем событии
            </h2>
            <p className="text-base md:text-lg opacity-90 mb-7 max-w-xl mx-auto">
              Перезвоним за 15 минут в рабочее время. Подготовим смету, меню и тайминг —
              бесплатно и без обязательств.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/plan"
                className="inline-flex items-center gap-2 rounded-lg bg-white text-ink px-6 py-3 text-sm font-semibold hover:bg-white/90 transition-colors no-underline"
              >
                Спланировать событие
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href="/tasting"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-white/70 px-6 py-3 text-sm font-semibold hover:bg-white/10 transition-colors no-underline"
              >
                <ChefHat className="w-4 h-4" aria-hidden="true" />
                Записаться на дегустацию
              </Link>
              <a
                href={`tel:${SITE.phoneTel}`}
                className="inline-flex items-center gap-2 rounded-lg border-2 border-white/70 px-6 py-3 text-sm font-semibold hover:bg-white/10 transition-colors no-underline"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
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
