'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Award, CalendarDays, ChefHat, GraduationCap, Star, Tv } from 'lucide-react';

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
  { icon: GraduationCap, title: 'Кулинарная академия', desc: 'Профильное образование' },
  { icon: ChefHat, title: 'Французская кухня', desc: 'Опыт в топ-ресторанах СПб' },
  { icon: CalendarDays, title: '19 лет опыта', desc: 'С 2007 года на кухне' },
  { icon: Star, title: 'Авторское меню', desc: 'Лично разрабатывает каждое' },
  { icon: Tv, title: 'ТВ-участник', desc: 'Кулинарные шоу' },
  { icon: Award, title: 'Премиум-класс', desc: 'Кейтеринг высшей категории' },
];

export default function ChefStory() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-20 md:py-32 bg-secondary/40 relative overflow-hidden" aria-labelledby="chef-story-heading">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-[400px] h-[400px] rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)' }} aria-hidden="true" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] rounded-full opacity-[0.03]" style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)' }} aria-hidden="true" />
      
      {/* Gold line at top */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent 0%, #C9A961 30%, #D4AF37 50%, #C9A961 70%, transparent 100%)' }} aria-hidden="true" />

      <div className="container-site relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-14 md:mb-18"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="text-xs uppercase tracking-[0.22em] text-gold-text mb-3 font-medium">Лицо бренда</p>
          <h2 id="chef-story-heading" className="font-heading text-3xl md:text-5xl" style={{ fontWeight: 500 }}>
            История <span className="text-gold-premium">шефа</span>
          </h2>
        </motion.div>

        {/* Main content: Photo + Story */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">
          
          {/* LEFT — Photo with art-deco frame */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
            className="relative max-w-md mx-auto lg:mx-0"
          >
            {/* Art-deco corner accents */}
            <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-[#D4AF37]/50 rounded-tl-xl z-10" aria-hidden="true" />
            <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-[#D4AF37]/50 rounded-br-xl z-10" aria-hidden="true" />
            
            {/* Photo container */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg" style={{ border: '1px solid rgba(201,169,97,0.25)', boxShadow: '0 8px 32px rgba(139,105,20,0.1), 0 0 0 1px rgba(212,175,55,0.08) inset' }}>
              <Image src="/images/team/chef-nilov.jpg" alt="Дмитрий Нилов — шеф-повар и основатель NiloV Catering" fill className="object-cover object-top" sizes="(max-width: 1024px) 100vw, 50vw" priority />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
              
              {/* Name badge */}
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 bg-gradient-to-t from-black/75 via-black/50 to-transparent">
                <p className="font-heading text-2xl md:text-3xl text-white mb-1" style={{ fontWeight: 500 }}>Дмитрий Нилов</p>
                <p className="text-white/80 text-sm md:text-base flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" aria-hidden="true" />
                  Основатель · Шеф-повар · С 2007 года
                </p>
              </div>
            </div>

            {/* Floating experience badge */}
            <div className="absolute -right-3 -bottom-3 md:-right-6 md:-bottom-6 px-5 py-3.5 rounded-xl shadow-lg z-20" style={{ background: 'linear-gradient(135deg, #B8860B 0%, #D4AF37 100%)', boxShadow: '0 8px 24px rgba(184,134,11,0.35)' }}>
              <p className="font-heading text-3xl font-semibold text-white leading-none">19</p>
              <p className="text-xs text-white/90 uppercase tracking-wider mt-0.5">лет на кухне</p>
            </div>
          </motion.div>

          {/* RIGHT — Story content */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.25 }}
          >
            
            {/* Intro text */}
            <div>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-4">
                За 19 лет работы в ресторанном бизнесе прошёл путь от{' '}
                <strong className="text-foreground">повара-стажёра</strong> до{' '}
                <strong className="text-foreground">шефа премиум-кейтеринга</strong>, чьи блюда украшают свадьбы, корпоративы и частные ужины Петербурга.
              </p>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                Начинал в ресторанах французской кухни, где впитал любовь к безупречной технике и сезонным продуктам. В 2007 году основал NiloV Catering — и с тех пор каждое меню несёт его подпись.
              </p>
            </div>

            {/* Quote block */}
            <blockquote className="relative p-6 md:p-8 rounded-2xl bg-card overflow-hidden" style={{ border: '1px solid rgba(201,169,97,0.2)', boxShadow: '0 4px 24px rgba(139,105,20,0.06)' }}>
              <div className="absolute top-0 left-0 right-0 h-px opacity-50" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }} aria-hidden="true" />
              <span className="absolute top-3 left-4 text-7xl md:text-8xl leading-none select-none opacity-10" style={{ fontFamily: 'Georgia, serif', color: '#D4AF37' }} aria-hidden="true">&ldquo;</span>
              
              <blockquote className="relative z-10 pl-8 pt-6">
                <p className="font-heading text-xl md:text-2xl text-foreground italic leading-relaxed mb-4" style={{ fontWeight: 500 }}>Готовим как для себя</p>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                  Каждое блюдо, которое выходит из нашей кухни, я должен быть готов подать своей семье. Никаких компромиссов в качестве — только свежие продукты, проверенные техники и искренняя любовь к тому, что мы делаем.
                </p>
                <footer className="mt-5 flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full overflow-hidden" style={{ border: '2px solid rgba(201,169,97,0.4)' }}>
                    <Image src="/images/team/chef-nilov.jpg" alt="" width={44} height={44} className="w-full h-full object-cover" />
                  </div>
                  <cite className="not-italic">
                    <span className="block text-sm font-medium text-foreground">Дмитрий Нилов</span>
                    <span className="text-xs text-gold-text">Шеф-повар, основатель</span>
                  </cite>
                </footer>
              </blockquote>
            </blockquote>

            {/* Philosophy */}
            <div className="space-y-4">
              <h3 className="font-heading text-lg md:text-xl text-foreground flex items-center gap-3" style={{ fontWeight: 500 }}>
                <span className="w-8 h-px bg-[#D4AF37]" aria-hidden="true" />
                Философия кухни
              </h3>
              <ul className="space-y-3">
                {['Сезонные продукты от фермеров Ленинградской области', 'Меню пересобираем 4 раза в год по сезону', 'Личная дегустация каждого нового блюда', 'Без полуфабрикатов — всё готовим с нуля'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm md:text-base text-muted-foreground">
                    <span className="shrink-0 w-1.5 h-1.5 rounded-full mt-2" style={{ background: 'linear-gradient(135deg, #B8860B, #D4AF37)' }} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Achievements badges */}
        <motion.div 
          className="mt-16 md:mt-22 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.35 }}
        >
          <h3 className="font-heading text-lg md:text-xl text-center mb-9" style={{ fontWeight: 500 }}>Вехи карьеры</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {ACHIEVEMENTS.map((item) => (
              <div key={item.title} className="group flex items-start gap-3 p-4 md:p-5 rounded-xl bg-card border border-line hover:border-[#D4AF37]/40 transition-all duration-300" style={{ boxShadow: '0 1px 3px rgba(28,24,21,0.04)' }}>
                <div className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300 group-hover:bg-[#D4AF37]/15" style={{ background: 'rgba(239,230,214,0.6)' }}>
                  <item.icon className="w-5 h-5 text-gold-text group-hover:text-[#B8860B] transition-colors" strokeWidth={1.5} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground leading-snug">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="mt-16 md:mt-22 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.45 }}
        >
          <div className="relative p-8 md:p-12 rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(145deg, #1C1815 0%, #2A2420 100%)' }}>
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '24px 24px' }} aria-hidden="true" />
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }} aria-hidden="true" />
            
            <div className="relative z-10">
              <p className="text-xs uppercase tracking-[0.22em] text-[#D4AF37] mb-3 font-medium">От первого лица</p>
              <h3 className="font-heading text-2xl md:text-3xl mb-3 text-white" style={{ fontWeight: 500 }}>Хотите попробовать?</h3>
              <p className="text-white/65 mb-7 text-base md:text-lg leading-relaxed">
                Запишитесь на дегустацию — шеф лично представит меню и подберёт варианты под ваше событие.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
                <Link href="/menu" className="group inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-base font-semibold no-underline min-w-[240px] transition-all duration-300 hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg, #B8860B 0%, #D4AF37 50%, #AA771C 100%)', color: 'white', boxShadow: '0 4px 16px rgba(184,134,11,0.35)' }}>
                  Познакомиться с меню
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
                <Link href="/tasting" className="inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-white/20 text-white px-6 py-4 text-base font-medium no-underline min-w-[200px] hover:bg-white/5 hover:border-white/30 transition-all duration-300">
                  Записаться на дегустацию
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom gold line */}
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #C9A961 30%, #D4AF37 50%, #C9A961 70%, transparent 100%)' }} aria-hidden="true" />
    </section>
  );
}
