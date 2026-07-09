import type { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { services } from '@/lib/data';

export const metadata: Metadata = {
  title: "Услуги",
  description: "Услуги кейтеринга: фуршеты, банкеты, свадебный и корпоративный кейтеринг в Санкт-Петербурге.",
};

export default function ServicesPage() {
  return (
    <>
      <div className="pt-20 md:pt-24 pb-4 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Услуги" }]} />
          <div className="mt-6">
            <p className="text-[11px] uppercase tracking-[0.35em] text-gold font-medium mb-4">Услуги</p>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-cream leading-[0.95]">
              Форматы
              <br />
              <span className="text-cream/40">мероприятий</span>
            </h1>
          </div>
        </div>
      </div>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {services.map((service, i) => (
              <a
                key={service.id}
                href={`/services/${service.slug}`}
                className="group relative overflow-hidden border border-border bg-card cursor-hover block"
              >
                <div className={`relative overflow-hidden ${i === 0 ? 'aspect-[4/3] md:aspect-[16/9]' : 'aspect-[4/3]'}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/30 to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-gold/60 font-mono mb-3">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 className="font-heading text-2xl md:text-3xl font-semibold text-cream mb-2 group-hover:text-gold transition-colors duration-300">
                    {service.title}
                  </h2>
                  <p className="text-sm text-cream/50 leading-relaxed line-clamp-2">
                    {service.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}