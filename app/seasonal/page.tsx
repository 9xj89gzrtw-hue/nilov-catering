import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Сезонные предложения",
  description:
    "Сезонные форматы кейтеринга: BBQ-лето, Новый год, Масленица. Выезд в СПб и область. Гриль, блины, новогоднее меню.",
  alternates: { canonical: "/seasonal", languages: { ru: "/seasonal", "x-default": "/seasonal" } },
};

export default function SeasonalPage() {
  return (
    <main id="main" className="pt-24 pb-20">
      <div className="container-site">
        <h1 className="mb-4 text-center">Сезонные предложения</h1>
        <p className="text-muted-foreground mb-16 text-center">Специальные форматы по сезону.</p>
        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-3">
          {[
            { title: "BBQ-лето", desc: "Гриль-меню на открытом воздухе", href: "/seasonal/bbq" },
            {
              title: "Новый год",
              desc: "Корпоративы и частные вечеринки",
              href: "/seasonal/new-year",
            },
            {
              title: "Масленица",
              desc: "Блины, самовар, народные гуляния",
              href: "/seasonal/maslenitsa",
            },
          ].map((s) => (
            <Link
              key={s.title}
              href={s.href}
              className="border-line bg-card hover:border-gold-text rounded-xl border p-6 text-center transition-colors"
            >
              <h2 className="font-heading mb-2 text-xl font-medium">{s.title}</h2>
              <p className="text-muted-foreground text-sm">{s.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
