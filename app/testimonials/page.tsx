import type { Metadata } from "next";
import { testimonials } from "@/lib/data";
import AnimatedSection from "@/components/common/AnimatedSection";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Star } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Отзывы | Nilov Catering",
  description: "Отзывы клиентов о кейтеринге Nilov Catering. Узнайте, что говорят о нас те, кто уже доверил нам своё мероприятие.",
  alternates: { canonical: "https://odaeda.ru/testimonials" },
};

export default function TestimonialsPage() {
  const breadcrumbs = [
    { label: "Главная", href: "/" },
    { label: "Отзывы", href: "/testimonials" },
  ];

  return (
    <main>
      <div className="bg-primary py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary-foreground mb-4">Отзывы клиентов</h1>
          <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">Что говорят о нас те, кто уже доверил нам своё мероприятие</p>
        </div>
      </div>
      <Breadcrumbs items={breadcrumbs} />
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t) => (
              <AnimatedSection key={t.id}>
                <div className="bg-card border border-border rounded-lg p-6 md:p-8 h-full flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <Image src={t.avatar} alt={t.name} width={56} height={56} className="rounded-full" />
                    <div>
                      <p className="font-semibold">{t.name}</p>
                      <p className="text-sm text-muted-foreground">{t.event} &middot; {t.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < t.rating ? "fill-accent text-accent" : "text-border"}`} />
                    ))}
                  </div>
                  <p className="text-muted-foreground leading-relaxed flex-1">{t.text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
