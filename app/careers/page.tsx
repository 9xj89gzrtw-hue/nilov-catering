import type { Metadata } from 'next';
import Link from 'next/link';
import CareersClient from './CareersClient';

export const metadata: Metadata = {
  title: 'Карьера в NiloV Catering',
  description: 'Вакансии NiloV Catering в Санкт-Петербурге: шеф-повара, кондитеры, менеджеры событий, официанты. Присоединяйтесь к команде профессионалов!',
  alternates: { canonical: '/careers', languages: { 'ru': '/careers', 'x-default': '/careers' } },
};

const BENEFITS = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Конкурентная зарплата',
    desc: 'Выше рынка на 15-20%. Премии по итогам сезона и KPI.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: 'Забота о команде',
    desc: 'Питание на сменах, экипировка, компенсация транспорта.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Карьерный рост',
    desc: 'Обучение внутри компании, курсы повышения квалификации.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: 'График по договорённости',
    desc: 'Гибкий график, возможность совмещения, сезонная занятость.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 10a3 3 0 01-3 3H6a3 3 0 01-3-3V9a3 3 0 013-3h12a3 3 0 013 3v8z" />
      </svg>
    ),
    title: 'Дружный коллектив',
    desc: 'Командные мероприятия, корпоративы, атмосфера поддержки.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: 'Стабильность',
    desc: 'Официальное трудоустройство, ДМС, оплачиваемые отпуска.',
  },
];

export default function CareersPage() {
  return (
    <main id="main" className="pt-24 pb-20">
      <div className="container-site max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 text-gold-text text-sm font-medium mb-4">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Мы ищем талантливых людей
          </div>
          <h1 className="mb-3 font-heading text-3xl md:text-4xl lg:text-5xl font-medium">
            Карьера в NiloV
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Присоединяйтесь к команде профессионалов кейтеринга с 17-летним опытом. 
            Растём вместе — создавайте события, которыми гордитесь.
          </p>
        </div>

        {/* Benefits Section */}
        <section className="mb-16">
          <h2 className="font-heading text-2xl font-medium text-center mb-8">
            Почему работают у нас
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((b, i) => (
              <div
                key={i}
                className="group p-6 rounded-xl border border-line bg-card transition-all duration-300 hover:border-gold-text hover:shadow-lg hover:shadow-gold/10 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-gold/20 group-hover:text-gold-text transition-colors">
                  {b.icon}
                </div>
                <h3 className="font-heading text-lg font-medium mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Vacancies Section */}
        <section className="mb-16">
          <h2 className="font-heading text-2xl font-medium text-center mb-2">
            Открытые вакансии
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            Не нашли подходящую позицию? Отправьте резюме — мы всегда открыты к профи.
          </p>

          <CareersClient />
        </section>

        {/* Team Photo / CTA */}
        <div className="rounded-2xl overflow-hidden relative bg-gradient-to-br from-primary/10 via-accent to-primary/5 p-8 md:p-12 border border-gold/20">
          <div className="relative z-10 text-center">
            <h2 className="font-heading text-2xl md:text-3xl font-medium mb-3">
              Станьте частью NiloV
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Каждое событие — это результат работы нашей команды. 
              Хотите создавать незабываемые моменты?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#application-form"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors touch-target shadow-lg shadow-primary/20"
              >
                Откликнуться на вакансию
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </Link>
              <Link
                href="/team"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-card px-8 py-3.5 text-sm font-semibold hover:border-gold-text transition-colors touch-target"
              >
                Познакомиться с командой
              </Link>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-gold/10 blur-2xl" />
          <div className="absolute bottom-4 left-4 w-32 h-32 rounded-full bg-primary/10 blur-3xl" />
        </div>
      </div>
    </main>
  );
}
