import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { services } from '@/lib/data';
import { ArrowLeft } from 'lucide-react';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: "Не найдено" };
  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <>
      <div className="pt-20 md:pt-24 pb-8 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[
            { label: "Услуги", href: "/services" },
            { label: service.title },
          ]} />
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-semibold text-cream mt-4">
            {service.title}
          </h1>
          <p className="mt-3 text-sm text-cream-muted max-w-xl">
            {service.description}
          </p>
        </div>
      </div>

      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero image */}
          <div className="relative aspect-[16/7] rounded-md overflow-hidden mb-12">
            <Image
              src={service.image}
              alt={service.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          </div>

          {/* Features */}
          <div className="max-w-2xl">
            <h2 className="font-heading text-2xl font-semibold text-cream mb-6">Что входит</h2>
            <ul className="space-y-3">
              {service.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-cream/80">
                  <span className="text-gold mt-0.5">·</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-cream-muted mb-4">
              Готовы обсудить {service.title.toLowerCase()}? Оставьте заявку — мы подготовим предложение в течение 24 часов.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary text-xs uppercase tracking-wider">
                Обсудить мероприятие
              </Link>
              <Link
                href="/services"
                className="btn-outline text-xs uppercase tracking-wider inline-flex items-center gap-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Все услуги
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}