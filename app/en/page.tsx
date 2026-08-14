import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "English version",
  description: "Catering in St. Petersburg since 2007. Restaurant-quality service for any budget.",
};

export default function EnPage() {
  return (
    <main id="main" className="pt-24 pb-20">
      <div className="container-site max-w-2xl">
        <h1 className="mb-4">NiloV Catering</h1>
        <p className="text-muted-foreground mb-8 text-lg">
          Restaurant-quality catering in St. Petersburg since 2007.
        </p>

        <div className="mb-10 grid gap-4">
          {[
            {
              title: "What we do",
              text: "Full-service catering for weddings, corporate events, private parties, and chef-at-home experiences. From coffee breaks to formal banquets.",
            },
            {
              title: "Why us",
              text: "19 years in business (since 2007). Own sous-vide kitchen. Local farmers from Leningrad Oblast. Honest pricing — no hidden fees.",
            },
            {
              title: "Pricing",
              text: "From 390 ₽/guest for coffee breaks. Banquet from 3 950 ₽/guest. All prices include staff, coordinator, and delivery within the Ring Road.",
            },
            {
              title: "Contact",
              text: "Phone: +7 (812) 919-59-11. Email: info@nilov-catering.ru. We reply within 15 minutes.",
            },
          ].map((item) => (
            <div key={item.title} className="border-line bg-card rounded-lg border p-5">
              <h2 className="font-heading mb-1 text-base font-medium">{item.title}</h2>
              <p className="text-muted-foreground text-sm">{item.text}</p>
            </div>
          ))}
        </div>

        <p className="text-muted-foreground text-center text-sm">
          More detailed English content is on the way. For now, please choose a format or contact us
          directly.
        </p>
        <div className="mt-6 text-center">
          <Link
            href="/plan/helper"
            className="bg-primary text-primary-foreground inline-flex min-h-[44px] items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold"
          >
            Choose format →
          </Link>
        </div>
      </div>
    </main>
  );
}
