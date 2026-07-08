import type { Metadata } from "next";
import Image from 'next/image';
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { teamMembers } from '@/lib/data';

export const metadata: Metadata = {
  title: "О нас",
  description: "Команда Нилов Кейтеринг — 12 лет опыта в организации премиального кейтеринга в Санкт-Петербурге. Шеф-повар, арт-директор, менеджер мероприятий, сомелье.",
};

const values = [
  {
    title: "Качество",
    description: "Только свежие продукты от проверенных поставщиков. Никаких полуфабрикатов.",
  },
  {
    title: "Сервис",
    description: "Внимание к каждой детали — от сервировки до тайминга подачи блюд.",
  },
  {
    title: "Гибкость",
    description: "Адаптируемся под любые пожелания: формат, бюджет, диетические ограничения.",
  },
  {
    title: "Ответственность",
    description: "Полная юридическая прозрачность, договор и чёткие сроки.",
  },
];

export default function AboutPage() {
  return (
    <>
      <div className="pt-20 md:pt-24 pb-8 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "О нас" }]} />
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-semibold text-cream mt-4">
            О компании
          </h1>
        </div>
      </div>

      {/* Story */}
      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gold font-medium mb-4">Наша история</p>
              <h2 className="font-heading text-3xl md:text-4xl font-semibold text-cream leading-tight mb-6">
                12 лет создания гастрономических впечатлений
              </h2>
              <div className="space-y-4 text-sm text-cream/70 leading-relaxed">
                <p>
                  Нилов Кейтеринг основан в 2014 году шеф-поваром Николаем Ниловым с простой идеей: каждое мероприятие заслуживает еды, которая вдохновляет.
                </p>
                <p>
                  За 12 лет мы организовали более 800 мероприятий — от камерных ужинов на 10 человек до свадебных банкетов на 500 гостей. Каждый раз мы начинаем с нуля: слушаем, предлагаем, дегустируем, утверждаем.
                </p>
                <p>
                  Сегодня наша команда — это 4 ключевых специалиста и 50+ профессиональных официантов, которые превращают ваше событие в безупречный гастрономический опыт.
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
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.3em] text-gold font-medium mb-3 text-center">Ценности</p>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-cream text-center mb-12">
            На что мы опираемся
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-card border border-border rounded-md p-6">
                <h3 className="font-heading text-xl font-semibold text-cream mb-2">{v.title}</h3>
                <p className="text-sm text-cream-muted leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.3em] text-gold font-medium mb-3 text-center">Команда</p>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-cream text-center mb-12">
            Ключевые люди
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((m) => (
              <div key={m.id} className="text-center">
                <div className="relative aspect-[4/5] rounded-md overflow-hidden mb-4">
                  <Image
                    src={m.photo}
                    alt={m.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-heading text-lg font-semibold text-cream">{m.name}</h3>
                <p className="text-xs text-gold mt-0.5">{m.role}</p>
                <p className="text-xs text-cream-muted mt-2 leading-relaxed">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}