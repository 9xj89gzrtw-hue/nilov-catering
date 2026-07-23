import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'NiloV Catering — English',
  description: 'Catering in St. Petersburg since 2007. Restaurant-quality service for any budget.',
};

export default function EnPage() {
  return (
    <main className="pt-24 pb-20"><div className="container-site max-w-2xl">
      <h1 className="mb-4">NiloV Catering</h1>
      <p className="text-lg text-muted-foreground mb-8">Restaurant-quality catering in St. Petersburg since 2007.</p>

      <div className="grid gap-4 mb-10">
        {[
          { title: 'What we do', text: 'Full-service catering for weddings, corporate events, private parties, and chef-at-home experiences. From coffee breaks to formal banquets.' },
          { title: 'Why us', text: '19+ years in business. Own sous-vide kitchen. Local farmers from Leningrad Oblast. Honest pricing — no hidden fees.' },
          { title: 'Pricing', text: 'From 390 ₽/guest for coffee breaks. Banquet from 4 470 ₽/guest. All prices include staff, coordinator, and delivery within the Ring Road.' },
          { title: 'Contact', text: 'Phone: +7 (812) 919-59-11. Email: info@odaeda.ru. We reply within 2 hours.' },
        ].map(item => (
          <div key={item.title} className="rounded-lg border border-line bg-card p-5">
            <h3 className="font-heading text-base font-medium mb-1">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.text}</p>
          </div>
        ))}
      </div>

      <p className="text-sm text-muted-foreground text-center">Full English version coming soon. For now, please use the calculator or contact us directly.</p>
      <div className="mt-6 text-center">
        <Link href="/plan/calculator" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">Calculator →</Link>
      </div>
    </div></main>
  );
}
