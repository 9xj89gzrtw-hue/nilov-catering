import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import AnimatedSection from "@/components/common/AnimatedSection";
import CTASection from "@/components/sections/CTASection";
import { services, pricingPackages } from "@/lib/data";

export const metadata: Metadata = {
  title: "Свадебный кейтеринг",
  description: "Свадебный кейтеринг от Nilov Catering — изысканное меню, безупречная подача и премиальный сервис для вашего самого важного дня.",
  alternates: { canonical: "https://odaeda.ru/services/weddings" },
};

export default function WeddingsPage() {
  const weddingService = services.find((s) => s.slug === "weddings");

  return (
    <>
      <section className="bg-primary py-20 md:py-28 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="text-accent text-sm font-medium tracking-widest uppercase mb-3">
              Услуги
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Свадебный кейтеринг
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">
              Создаём гастрономическое настроение для самого важного дня в вашей жизни
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Услуги", href: "/services" }, { label: "Свадебный кейтеринг", href: "/services/weddings" }]} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-8">
            <AnimatedSection>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image
                  src="https://placehold.co/800x600/C8A97E/1A1A1A?text=Wedding+Catering"
                  alt="Свадебный кейтеринг"
                  fill
                  className="object-cover"
                  placeholder="empty"
                />
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <h2 className="font-heading text-3xl font-bold mb-4">Ваш свадебный banquet</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>{weddingService?.description}</p>
                <p>
                  Мы понимаем, что свадьба — это не просто застолье. Это精心 продуманное гастрономическое путешествие, где каждое блюдо рассказывает историю пары и создаёт атмосферу праздника.
                </p>
                <p>
                  Наша команда работает с лучшими поставщиками, чтобы обеспечить свежесть и качество каждого ингредиента. От приветственного фуршета до десертного стола — всё будет на высшем уровне.
                </p>
              </div>
              <div className="mt-6">
                <Link href="/quote" className="inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors bg-primary text-primary-foreground hover:bg-primary/90">Получить расчёт</Link>
              </div>
            </AnimatedSection>
          </div>

          <div className="mt-20">
            <AnimatedSection>
              <h2 className="font-heading text-3xl font-bold text-center mb-12">Что мы предлагаем</h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {weddingService?.features.map((feature, i) => (
                <AnimatedSection key={feature} delay={i * 0.1}>
                  <Card>
                    <CardContent className="p-5 flex items-start gap-3">
                      <span className="text-accent font-bold text-lg mt-0.5">01</span>
                      <div>
                        <p className="text-sm font-medium">{feature}</p>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>

          <div className="mt-20">
            <AnimatedSection>
              <h2 className="font-heading text-3xl font-bold text-center mb-12">Тарифы</h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pricingPackages.filter((pkg) => pkg.format === "banket").map((pkg, i) => (
                <AnimatedSection key={pkg.id} delay={i * 0.1}>
                  <Card className={`h-full relative ${pkg.isPopular ? "border-accent" : ""}`}>
                    {pkg.isPopular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="bg-accent text-white text-xs px-3 py-1 rounded-full font-medium">Популярный</span>
                      </div>
                    )}
                    <CardContent className="p-6 text-center">
                      <h3 className="font-heading text-xl font-bold mb-2">{pkg.name}</h3>
                      <p className="text-accent text-3xl font-bold mb-1">{(pkg.pricePerPerson ?? pkg.pricePerGuest ?? 0).toLocaleString("ru-RU")} ₽</p>
                      <p className="text-xs text-muted-foreground mb-4">от {pkg.minGuests ?? 20} гостей</p>
                      <ul className="space-y-2 text-sm text-muted-foreground text-left">
                        {pkg.features.map((f) => (
                          <li key={f} className="flex items-start gap-2">
                            <span className="text-accent mt-0.5">+</span>
                            {f}
                          </li>
                        ))}
                      </ul>
                      <Link href="/quote" className="inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors border border-border bg-background hover:bg-muted">Выбрать</Link>
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