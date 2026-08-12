import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Award, CalendarDays, ChefHat, GraduationCap, Star, Tv } from 'lucide-react';

/**
 * ChefStory — секция "История шефа"
 * 
 * Решает критику: "Шеф Дмитрий Нилов — ключевое лицо бренда,
 * но где фото с характером? Где история?"
 * 
 * Структура:
 * - Desktop: фото слева + текст справа
 * - Mobile: фото сверху, текст снизу
 * - Цитата в декоративном блоке
 * - Ключевые достижения — иконки/бейджи
 * - CTA: "Познакомиться с меню"
 */

const ACHIEVEMENTS = [
  {
    icon: GraduationCap,
    title: 'Кулинарная академия',
    desc: 'Профильное образование',
  },
  {
    icon: ChefHat,
    title: 'Французская кухня',
    desc: 'Опыт в топ-ресторанах СПб',
  },
  {
    icon: CalendarDays,
    title: '19 лет опыта',
    desc: 'С 2007 года на кухне',
  },
  {
    icon: Star,
    title: 'Авторское меню',
    desc: 'Лично разрабатывает каждое',
  },
  {
    icon: Tv,
    title: 'ТВ-участник',
    desc: 'Кулинарные шоу',
  },
  {
    icon: Award,
    title: 'Премиум-класс',
    desc: 'Кейтеринг высшей категории',
  },
];

export default function ChefStory() {
  return (
    <section 
      className="py-20 md:py-28 bg-secondary/50" 
      aria-labelledby="chef-story-heading"
    >
      <div className="container-site">
        {/* Eyebrow */}
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.22em] text-gold-text mb-3">
            Лицо бренда
          </p>
          <h2 
            id="chef-story-heading"
            className="font-heading text-3xl md:text-5xl"
            style={{ fontWeight: 500 }}
          >
            История шефа
          </h2>
        </div>

        {/* Main content: Photo + Story */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start max-w-6xl mx-auto">
          
          {/* LEFT — Photo with frame */}
          <div className="relative">
            {/* Decorative gold accent */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-gold-text/30 rounded-tl-2xl hidden lg:block" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-gold-text/30 rounded-br-2xl hidden lg:block" />
            
            {/* Photo container with shadow and gold border accent */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-hover border border-line">
              <Image
                src="/images/team/chef-nilov.jpg"
                alt="Дмитрий Нилов — шеф-повар и основатель NiloV Catering"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {/* Gradient overlay at bottom for text readability if needed */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent" />
              
              {/* Name badge on photo */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
                <p className="font-heading text-2xl md:text-3xl text-white mb-1" style={{ fontWeight: 500 }}>
                  Дмитрий Нилов
                </p>
                <p className="text-white/80 text-sm md:text-base">
                  Основатель · Шеф-повар · С 2007 года
                </p>
              </div>
            </div>

            {/* Floating experience badge */}
            <div className="absolute -right-2 -bottom-2 lg:-right-6 lg:-bottom-6 bg-gold-text text-white px-4 py-3 rounded-xl shadow-lg hidden sm:block">
              <p className="font-heading text-2xl font-semibold">19</p>
              <p className="text-xs text-white/90 uppercase tracking-wider">лет на кухне</p>
            </div>
          </div>

          {/* RIGHT — Story content */}
          <div className="space-y-8">
            {/* Intro text */}
            <div>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-4">
                За 19 лет работы в ресторанном бизнесе прошёл путь от 
                <strong className="text-foreground"> повара-стажёра</strong> до{' '}
                <strong className="text-foreground">шефа премиум-кейтеринга</strong>, 
                чьи блюда украшают свадьбы, корпоративы и частные ужины Петербурга.
              </p>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                Начинал в ресторанах французской кухни, где впитал любовь к 
                безупречной технике и сезонным продуктам. В 2007 году основал 
                NiloV Catering — и с тех пор каждое меню несёт его подпись.
              </p>
            </div>

            {/* Quote block — decorative */}
            <blockquote className="relative p-6 md:p-8 rounded-2xl bg-card border border-line shadow-soft">
              {/* Large decorative quote mark */}
              <span 
                className="absolute top-4 left-4 text-6xl md:text-7xl text-gold-text/15 font-serif leading-none select-none"
                aria-hidden="true"
              >
                &ldquo;
              </span>
              
              <blockquote className="relative z-10 pl-8 pt-4">
                <p className="font-heading text-xl md:text-2xl text-foreground italic leading-relaxed mb-4" style={{ fontWeight: 500 }}>
                  Готовим как для себя
                </p>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                  Каждое блюдо, которое выходит из нашей кухни, я должен быть готов 
                  подать своей семье. Никаких компромиссов в качестве — только свежие 
                  продукты, проверенные техники и искренняя любовь к тому, что мы делаем.
                </p>
                <footer className="mt-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gold-text/30">
                    <Image
                      src="/images/team/chef-nilov.jpg"
                      alt=""
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <cite className="not-italic">
                    <span className="block text-sm font-medium text-foreground">Дмитрий Нилов</span>
                    <span className="text-xs text-gold-text">Шеф-повар, основатель</span>
                  </cite>
                </footer>
              </blockquote>
            </blockquote>

            {/* Philosophy / Key points */}
            <div className="space-y-4">
              <h3 className="font-heading text-lg md:text-xl text-foreground" style={{ fontWeight: 500 }}>
                Философия кухни
              </h3>
              <ul className="space-y-3">
                {[
                  'Сезонные продукты от фермеров Ленинградской области',
                  'Меню пересобираем 4 раза в год по сезону',
                  'Личная дегустация каждого нового блюда',
                  'Без полуфабрикатов — всё готовим с нуля',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm md:text-base text-muted-foreground">
                    <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-gold-text mt-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Achievements badges */}
        <div className="mt-16 md:mt-20 max-w-4xl mx-auto">
          <h3 className="font-heading text-lg md:text-xl text-center mb-8" style={{ fontWeight: 500 }}>
                Вехи карьеры
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {ACHIEVEMENTS.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-3 p-4 rounded-xl bg-card border border-line hover:border-gold-text/40 transition-colors group"
              >
                <div className="shrink-0 w-10 h-10 rounded-lg bg-gold-tint flex items-center justify-center group-hover:bg-gold-text/20 transition-colors">
                  <item.icon 
                    className="w-5 h-5 text-gold-text" 
                    strokeWidth={1.5} 
                    aria-hidden="true" 
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground leading-snug">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 md:mt-20 text-center max-w-2xl mx-auto">
          <div className="p-8 md:p-10 rounded-2xl bg-foreground text-background relative overflow-hidden">
            {/* Decorative background pattern */}
            <div 
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: '24px 24px',
              }}
              aria-hidden="true"
            />
            
            <div className="relative z-10">
              <p className="text-xs uppercase tracking-[0.22em] text-gold-soft mb-3">
                От первого лица
              </p>
              <h3 className="font-heading text-2xl md:text-3xl mb-3" style={{ fontWeight: 500 }}>
                Хотите попробовать?
              </h3>
              <p className="text-background/75 mb-6 text-base md:text-lg">
                Запишитесь на дегустацию — шеф лично представит меню 
                и подберёт варианты под ваше событие.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
                <Link
                  href="/menu"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-text text-white px-8 py-4 text-base font-semibold hover:bg-gold-text/90 transition-colors no-underline shadow-lg min-w-[240px]"
                >
                  Познакомиться с меню
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/tasting"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-background/40 text-background px-6 py-4 text-base font-medium hover:bg-background/10 transition-colors no-underline min-w-[200px]"
                >
                  Записаться на дегустацию
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
