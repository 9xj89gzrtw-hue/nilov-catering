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
  title: "Корпоративный кейтеринг | Nilov Catering",
  description: "Организация питания для корпоративных мероприятий, конференций и бизнес-ланчей. Безналичная оплата и налоговые документы.",
  alternates: { canonical: "https://nilov-catering.ru/services/corporate" },
};

export default function CorporatePage() {
  const corporateService = services.find((s) => s.slug === "corporate");

  return (
    <>
      <section className="bg-primary py-20 md:py-28 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="text-accent text-sm font-medium tracking-widest uppercase mb-3">
              Услуги
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Корпоративный кейтеринг
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">
              Профессиональное питание для деловых мероприятий любого масштаба
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Услуги", href: "/services" }, { label: "Корпоративный кейтеринг", href: "/services/corporate" }]} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-8">
            <AnimatedSection>
              <h2 className="font-heading text-3xl font-bold mb-4">Питание для бизнеса</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>{corporateService?.description}</p>
                <p>
                  Мы работаем с ведущими компаниями Москвы и понимаем требования корпоративного сектора: пунктуальность, стабильность качества, соблюдение бюджета и предоставление всех необходимых финансовых документов.
                </p>
                <p>
                  Наши бизнес-ланчи и кофе-брейки помогут повысить продуктивность ваших конференций и совещаний. А торжественные корпоративы пройдут на высшем уровне.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/quote" className="inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors bg-primary text-primary-foreground hover:bg-primary/90">Получить расчёт</Link>
                <Link href="/pricing" className="inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors border border-border bg-background hover:bg-muted">Тарифы</Link>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image
                  src="https://placehold.co/800x600/C8A97E/1A1A1A?text=Corporate+Catering"
                  alt="Корпоративный кейтеринг"
                  fill
                  className="object-cover"
                  placeholder="empty"
                />
              </div>
            </AnimatedSection>
          </div>

          <div className="mt-20">
            <AnimatedSection>
              <h2 className="font-heading text-3xl font-bold text-center mb-12">Наши преимущества</h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {corporateService?.features.map((feature, i) => (
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