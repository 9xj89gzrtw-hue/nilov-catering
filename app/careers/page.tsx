import type { Metadata } from "next";
import Link from "next/link";
import CareersClient from "./CareersClient";

export const metadata: Metadata = {
  title: "Вакансии кейтеринга в СПб — Карьера",
  description:
    "Вакансии NiloV Catering в Санкт-Петербурге: шеф-повара, кондитеры, менеджеры событий, официанты. Присоединяйтесь к команде профессионалов!",
  alternates: { canonical: "/careers", languages: { ru: "/careers", "x-default": "/careers" } },
};

const BENEFITS = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Конкурентная зарплата",
    desc: "Выше рынка на 15-20%. Премии по итогам сезона и KPI.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
    title: "Питание сотрудников",
    desc: "Бесплатные обеды на сменах, свежие напитки и перекусы.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    title: "Обучение и развитие",
    desc: "Обучение внутри компании, курсы повышения квалификации, менторство.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
    title: "Гибкий график",
    desc: "График по договорённости, возможность совмещения, сезонная занятость.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
        />
      </svg>
    ),
    title: "ДМС и страховка",
    desc: "ДМС после испытательного срока, страхование жизни, оплачиваемые больничные.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 10a3 3 0 01-3 3H6a3 3 0 01-3-3V9a3 3 0 013-3h12a3 3 0 013 3v8z"
        />
      </svg>
    ),
    title: "Дружный коллектив",
    desc: "Команда из 40+ профессионалов. Корпоративы, поддержка и дружелюбная атмосфера.",
  },
];

export default function CareersPage() {
  return (
    <main id="main" className="pt-24 pb-20">
      <div className="container-site max-w-5xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="bg-gold/10 text-gold-text mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            Мы ищем талантливых людей
          </div>
          <h1 className="font-heading mb-3 text-3xl font-medium md:text-4xl lg:text-5xl">
            Карьера в NiloV
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Присоединяйтесь к команде кейтеринга, работающей с 2007 года. Растём вместе —
            создавайте события, которыми гордитесь.
          </p>
        </div>

        {/* Benefits Section */}
        <section className="mb-16">
          <h2 className="font-heading mb-8 text-center text-2xl font-medium">
            Почему работают у нас
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b, i) => (
              <div
                key={i}
                className="group border-line bg-card hover:border-gold-text hover:shadow-gold/10 rounded-xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="bg-primary/10 text-primary group-hover:bg-gold/20 group-hover:text-gold-text mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-colors">
                  {b.icon}
                </div>
                <h3 className="font-heading mb-2 text-lg font-medium">{b.title}</h3>
                <p className="text-muted-foreground text-sm">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Vacancies Section */}
        <section className="mb-16">
          <h2 className="font-heading mb-2 text-center text-2xl font-medium">Открытые вакансии</h2>
          <p className="text-muted-foreground mb-8 text-center">
            Не нашли подходящую позицию? Отправьте резюме — мы всегда открыты к профи.
          </p>

          <CareersClient />
        </section>

        {/* Team Photo / CTA */}
        <div className="from-primary/10 via-accent to-primary/5 border-gold/20 relative overflow-hidden rounded-2xl border bg-gradient-to-br p-8 md:p-12">
          <div className="relative z-10 text-center">
            <h2 className="font-heading mb-3 text-2xl font-medium md:text-3xl">
              Станьте частью NiloV
            </h2>
            <p className="text-muted-foreground mx-auto mb-6 max-w-md">
              Каждое событие — это результат работы нашей команды. Хотите создавать незабываемые
              моменты?
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="#application-form"
                className="bg-primary text-primary-foreground hover:bg-primary/90 touch-target shadow-primary/20 inline-flex items-center justify-center gap-2 rounded-lg px-8 py-3.5 text-sm font-semibold shadow-lg transition-colors"
              >
                Откликнуться на вакансию
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </Link>
              <Link
                href="/team"
                className="border-line bg-card hover:border-gold-text touch-target inline-flex items-center justify-center gap-2 rounded-lg border px-8 py-3.5 text-sm font-semibold transition-colors"
              >
                Познакомиться с командой
              </Link>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="bg-gold/10 absolute top-4 right-4 h-20 w-20 rounded-full blur-2xl" />
          <div className="bg-primary/10 absolute bottom-4 left-4 h-32 w-32 rounded-full blur-3xl" />
        </div>
      </div>
    </main>
  );
}
