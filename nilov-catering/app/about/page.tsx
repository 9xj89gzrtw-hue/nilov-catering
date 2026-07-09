import type { Metadata } from "next";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import AnimatedSection from "@/components/common/AnimatedSection";
import { teamMembers } from "@/lib/data";

export const metadata: Metadata = {
  title: "О компании | Nilov Catering",
  description: "Узнайте больше о кейтеринговой компании Nilov Catering — 19 лет опыта, команда профессионалов и уникальный подход к каждому мероприятию.",
  alternates: { canonical: "https://nilov-catering.ru/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-primary py-20 md:py-28 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="text-accent text-sm font-medium tracking-widest uppercase mb-3">
              О нас
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Nilov Catering
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">
              Создаём гастрономические шедевры для ваших самых важных мероприятий с 2007 года
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "О компании", href: "/about" }]} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-8">
            <AnimatedSection>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image
                  src="https://placehold.co/800x600/C8A97E/1A1A1A?text=Nilov+Catering"
                  alt="Команда Nilov Catering"
                  fill
                  className="object-cover"
                  placeholder="empty"
                />
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <h2 className="font-heading text-3xl font-bold mb-4">Наша история</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Nilov Catering был основан в 2013 году шеф-поваром Дмитрием Ниловым с простой, но амбициозной целью — изменить представление о выездном питании в Санкт-Петербурге.
                </p>
                <p>
                  За более чем 19 лет работы мы организовали более 3000 мероприятий — от камерных семейных ужинов на 10 человек до масштабных корпоративов на 500 гостей. Каждый заказ для нас — это уникальный проект, требующий индивидуального подхода.
                </p>
                <p>
                  Сегодня наша команда — это 45 профессионалов: шеф-повара, су-шефы, официанты, координаторы и сомелье. Мы гордимся тем, что 98% наших клиентов возвращаются к нам снова и рекомендуют нас друзьям.
                </p>
              </div>
            </AnimatedSection>
          </div>

          <div className="mt-20">
            <AnimatedSection>
              <h2 className="font-heading text-3xl font-bold text-center mb-4">Наша миссия</h2>
              <p className="text-muted-foreground text-center max-w-2xl mx-auto leading-relaxed">
                Превращать каждое мероприятие в незабываемое гастрономическое путешествие, где безупречный вкус сочетается с эстетикой подачи и высочайшим уровнем сервиса.
              </p>
            </AnimatedSection>
          </div>

          <div className="mt-20">
            <AnimatedSection>
              <h2 className="font-heading text-3xl font-bold text-center mb-12">Команда</h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, i) => (
                <AnimatedSection key={member.id} delay={i * 0.1}>
                  <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        placeholder="empty"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-heading text-lg font-bold">{member.name}</h3>
                      <p className="text-accent text-sm mb-2">{member.role}</p>
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        {member.bio}
                      </p>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>

          <div className="mt-20">
            <AnimatedSection>
              <h2 className="font-heading text-3xl font-bold text-center mb-12">Наши сертификаты</h2>
            </AnimatedSection>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {["ISO 22000", "HACCP", "Санитарная лицензия", "СРО"].map((cert, i) => (
                <AnimatedSection key={cert} delay={i * 0.1}>
                  <div className="bg-muted/50 rounded-xl p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-accent/10 flex items-center justify-center">
                      <span className="text-accent font-bold text-xs">{cert}</span>
                    </div>
                    <p className="text-sm font-medium">{cert}</p>
                    <p className="text-xs text-muted-foreground mt-1">Действителен до 2026</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}