import type { Metadata } from 'next';
import Link from 'next/link';
import TariffOffersSection from '@/components/blocks/TariffOffersSection';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import PageHeader from '@/components/common/PageHeader';
import PrintButton from '@/components/common/PrintButton';
import { FileText, FileSignature, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  alternates: { canonical: '/pricing', languages: { 'ru': '/pricing', 'en': '/en', 'x-default': '/pricing' } },
  title: 'Тарифы и цены',
  description: 'Прозрачные цены на кейтеринг в СПб. Фуршет от 2 450 ₽/гость, банкет от 3 950 ₽/гость, кофе-брейк от 390 ₽/гость. Все тарифы с полным составом меню.',
};

// Force static rendering — removes cookie/searchParams dependency that prevents prerender
export const dynamic = 'force-static';

export default function PricingPage() {
  return (
    <main className="pt-24 pb-20" id="main">
      <div className="container-site max-w-5xl">
        <Breadcrumbs />

        <PageHeader
          title="Тарифы и цены"
          eyebrow="Прозрачные цены"
          subtitle={
            <>
              Все тарифы включают: меню, официантов, координатора, доставку в пределах КАД,
              сервировку и уборку. <strong className="text-foreground">Без скрытых платежей.</strong>
            </>
          }
          actions={
            <>
              <Link
                href="/api/templates/dogovor"
                download="nilov-dogovor-template.pdf"
                className="inline-flex items-center gap-2 rounded-lg border border-line bg-card px-4 py-2.5 text-sm font-semibold hover:border-gold-text transition-colors touch-target no-underline"
                title="Шаблон договора на оказание кейтеринговых услуг"
              >
                <FileText className="w-4 h-4" aria-hidden="true" />
                Договор PDF
              </Link>
              <Link
                href="/api/templates/nda"
                download="nilov-nda-template.pdf"
                className="inline-flex items-center gap-2 rounded-lg border border-line bg-card px-4 py-2.5 text-sm font-semibold hover:border-gold-text transition-colors touch-target no-underline"
                title="Шаблон соглашения о неразглашении (NDA)"
              >
                <FileSignature className="w-4 h-4" aria-hidden="true" />
                NDA PDF
              </Link>
              <Link
                href="/api/templates/sla"
                download="nilov-sla-template.pdf"
                className="inline-flex items-center gap-2 rounded-lg border border-line bg-card px-4 py-2.5 text-sm font-semibold hover:border-gold-text transition-colors touch-target no-underline"
                title="Шаблон SLA — уровень обслуживания для B2B"
              >
                <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                SLA PDF
              </Link>
              <PrintButton label="Печать тарифов" />
            </>
          }
        />

        <TariffOffersSection />
      </div>
    </main>
  );
}
