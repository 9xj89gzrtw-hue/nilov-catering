import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import AnimatedSection from "@/components/common/AnimatedSection";
import { services } from "@/lib/data";

export const metadata: Metadata = {
  title: "Услуги кейтеринга",
  description: "Свадебный, корпоративный и частный кейтеринг от Nilov Catering. Полный спектр услуг для мероприятий любого масштаба.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-primary py-20 md:py-28 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="text-accent text-sm font-medium tracking-widest uppercase mb-3">
              Услуги
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Наши услуги
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">
              Полный спектр кейтеринговых услуг для мероприятий любого формата и масштаба
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Услуги", href: "/services" }]} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {services.map((service, i) => (
              <AnimatedSection key={service.id} delay={i * 0.15}>
                <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow group">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      placeholder="empty"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h2 className="font-heading text-2xl font-bold mb-3">{service.title}</h2>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {service.description}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {service.features.slice(0, 4).map((f) => (
                        <li key={f} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-accent mt-0.5">—</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Button variant="outline" className="w-full">
                      <Link href={`/services/${service.slug}`}>Подробнее</Link>
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}