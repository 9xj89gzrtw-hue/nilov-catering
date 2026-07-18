import type { Metadata } from "next";
import Image from 'next/image';
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { teamMembers } from '@/lib/data';

export const metadata: Metadata = {
  title: "О компании",
  description: "Нилов Кейтеринг — 12 лет опыта в организации премиальных мероприятий в Санкт-Петербурге.",
};

const values = [
  {
    number: '01',
    title: "Качество",
    description: "Только свежие продукты от проверенных поставщиков. Никаких полуфабрикатов. Каждый ингредиент проходит личный контроль шеф-повара.",
  },
  {
    number: '02',
    title: "Сервис",
    description: "Внимание к каждой детали — от сервировки до тайминга подачи блюд. Обученная команда официантов и координаторов.",
  },
  {
    number: '03',
    title: "Гибкость",
    description: "Адаптируемся под любые пожелания: формат, бюджет, диетические ограничения. Индивидуальный подход к каждому событию.",
  },
  {
    number: '04',
    title: "Ответственность",
    description: "Полная юридическая прозрачность, договор и чёткие сроки. Мы несём ответственность за каждый аспект обслуживания.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <div className="pt-20 md:pt-24 pb-4 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "О нас" }]} />
          <div className="mt-6">
            <p className="text-[11px] uppercase tracking-[0.35em] text-gold font-medium mb-4">О компании</p>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-cream leading-[0.95]">
              12 лет
              <br />
              <span className="text-cream/40">гастрономических</span>
              <br />
              впечатлений
            </h1>
          </div>
        </div>
      </div>

      {/* Story */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="space-y-5 text-sm text-cream/70 leading-relaxed">
                <p>
                  Нилов Кейтеринг основан в 2014 году шеф-поваром Николаем Ниловым с простой идеей: каждое мероприятие заслуживает еды, которая вдохновляет. То, что начиналось как студия авторских ужинов, выросло в одну из ведущих кейтеринговых компаний Санкт-Петербурга.
                </p>
                <p>
                  За 12 лет мы организовали более 800 мероприятий — от камерных ужинов на 10 человек до свадебных банкетов на 500 гостей. Каждый раз мы начинаем с нуля: слушаем, предлагаем, дегустируем, утверждаем. Никаких шаблонов — только персональный подход.
                </p>
                <p>
                  Сегодня наша команда — это 4 ключевых специалиста и 50+ профессиональных официантов, которые превращают ваше событие в безупречный гастрономический опыт. Мы работаем с лучшими поставщиками Санкт-Петербурга и используем только свежие, сезонные продукты.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/5] rounded-md overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=1000&fit=crop"
                alt="Команда Нилов Кейтеринг за работой"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/30 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 bg-muted">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[11px] uppercase tracking-[0.35em] text-gold font-medium mb-4">Ценности</p>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-semibold text-cream leading-[0.95]">
              На что мы
              <br />
              <span className="text-cream/40">опираемся</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-card border border-border p-6 md:p-8 group hover:border-border-light transition-colors duration-500">
                <span className="block font-heading text-3xl font-semibold text-gold/15 leading-none mb-5">
                  {v.number}
                </span>
                <h3 className="font-heading text-xl font-semibold text-cream mb-3 group-hover:text-gold transition-colors duration-300">
                  {v.title}
                </h3>
                <p className="text-sm text-cream-muted leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[11px] uppercase tracking-[0.35em] text-gold font-medium mb-4">Команда</p>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-semibold text-cream leading-[0.95]">
              Ключевые
              <br />
              <span className="text-cream/40">люди</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((m) => (
              <div key={m.id} className="group cursor-hover">
                <div className="relative aspect-[4/5] rounded-md overflow-hidden mb-5">
                  <Image
                    src={m.photo}
                    alt={m.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[#0A0A0A]/0 group-hover:bg-[#0A0A0A]/30 transition-colors duration-500" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-cream group-hover:text-gold transition-colors duration-300">
                  {m.name}
                </h3>
                <p className="text-[11px] uppercase tracking-wider text-gold/70 mt-0.5">{m.role}</p>
                <p className="text-xs text-cream-muted mt-2 leading-relaxed">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-muted border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-[11px] uppercase tracking-[0.35em] text-gold font-medium mb-4">Начнём</p>
          <h2 className="font-heading text-4xl sm:text-5xl font-semibold text-cream leading-[0.95] mb-6">
            Давайте работать
            <br />
            <span className="text-cream/40">вместе</span>
          </h2>
          <p className="text-sm text-cream-muted mb-10 max-w-md mx-auto leading-relaxed">
            Расскажите о вашем мероприятии — мы подготовим индивидуальное предложение с персональным меню
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-primary text-xs uppercase tracking-wider cursor-hover">
              Оставить заявку
            </a>
            <a href="tel:+78129195911" className="btn-outline text-xs uppercase tracking-wider cursor-hover">
              +7 (812) 919-59-11
            </a>
          </div>
        </div>
      </section>
    </>
  );
}