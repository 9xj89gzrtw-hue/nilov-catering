import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import AnimatedSection from "@/components/common/AnimatedSection";
import CTASection from "@/components/sections/CTASection";
import { services } from "@/lib/data";

export const metadata: Metadata = {
  title: "Частные мероприятия",
  description: "Кейтеринг для дней рождения, юбилеев и семейных праздников. Превратим ваш праздник в незабываемое гастрономическое путешествие.",
};

export default function PrivatePage() {
  const privateService = services.find((s) => s.slug === "private");

  return (
    <>
      <section className="bg-primary py-20 md:py-28 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="text-accent text-sm font-medium tracking-widest uppercase mb-3">
              Услуги
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Частные мероприятия
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">
              Гастрономические впечатления для ваших личных праздников
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Услуги", href: "/services" }, { label: "Частные мероприятия", href: "/services/private" }]} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-8">
            <AnimatedSection>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image
                  src="https://placehold.co/800x600/C8A97E/1A1A1A?text=Private+Events"
                  alt="Частные мероприятия"
                  fill
                  className="object-cover"
                  placeholder="empty"
                />
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <h2 className="font-heading text-3xl font-bold mb-4">Праздники, которые запоминаются</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>{privateService?.description}</p>
                <p>
                  Каждый праздник уникален, и мы относимся к нему соответственно. Наш шеф-повар разработает меню, которое отразит ваши вкусы и предпочтения, а команда обслуживания обеспечит безупречный вечер.
                </p>
                <p>
                  Мы организуем кейтеринг на дому, на природе, в арендованных площадках и любых других локациях по вашему выбору.
                </p>
              </div>
              <div className="mt-6">
                <Link href="/quote" className="inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors bg-primary text-primary-foreground hover:bg-primary/90">Получить расчёт</Link>
              </div>
            </AnimatedSection>
          </div>

          <div className="mt-20">
            <AnimatedSection>
              <h2 className="font-heading text-3xl font-bold text-center mb-12">Возможности</h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {privateService?.features.map((feature, i) => (
                <AnimatedSection key={feature} delay={i * 0.1}>
                  <Card>
                    <CardContent className="p-5 flex items-start gap-3">
                      <span className="text-accent font-bold text-lg mt-0.5">01</span>
                      <p className="text-sm font-medium">{feature}</p>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}