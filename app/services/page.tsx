import type { Metadata } from "next";
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { services } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: "Услуги",
  description: "Кейтеринг для свадеб, корпоративных мероприятий, частных праздников и фуршетов в Санкт-Петербурге.",
};

export default function ServicesPage() {
  return (
    <>
      <div className="pt-20 md:pt-24 pb-8 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Услуги" }]} />
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-semibold text-cream mt-4">
            Наши услуги
          </h1>
          <p className="mt-3 text-sm text-cream-muted max-w-xl">
            Подбираем идеальный формат питания под каждое мероприятие — от камерного ужина до масштабного корпоратива на 500+ гостей.
          </p>
        </div>
      </div>

      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {services.map((service, i) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              className={`group block rounded-md overflow-hidden border border-border bg-card card-hover ${
                i % 2 === 0 ? 'md:grid md:grid-cols-2' : 'md:grid md:grid-cols-2'
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/60 to-transparent hidden md:block" />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <h2 className="font-heading text-2xl md:text-3xl font-semibold text-cream mb-3">
                  {service.title}
                </h2>
                <p className="text-sm text-cream/70 leading-relaxed mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-8">
                  {service.features.slice(0, 4).map((f) => (
                    <li key={f} className="text-sm text-cream-muted flex items-start gap-2">
                      <span className="text-gold mt-0.5">·</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-gold font-medium">
                  Подробнее
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}