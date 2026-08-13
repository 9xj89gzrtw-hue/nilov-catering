import Link from "next/link";
import type { Format } from "@/lib/types";
import { PRICE_PER_GUEST } from "@/lib/constants";
import { KenBurnsCard } from "@/components/effects/PhotoAliveCard";
import { FORMAT_HERO_IMAGES } from "@/lib/data";

const FORMATS: { format: Format; href: string; tier: "economy"; badge: string; explain: string }[] =
  [
    {
      format: "furshet",
      href: "/menu/furshet",
      tier: "economy",
      badge: "Хит",
      explain: "Гости едят стоя, лёгкие закуски",
    },
    {
      format: "banket",
      href: "/menu/banquet",
      tier: "economy",
      badge: "Свадьбы",
      explain: "Посадка за стол, официанты",
    },
    {
      format: "coffee-break",
      href: "/menu/coffee-break",
      tier: "economy",
      badge: "Офисы",
      explain: "Кофе и десерты в перерыве (деловой завтрак тоже)",
    },
  ];

export default function FormatShowcase() {
  return (
    <section
      className="bg-background border-line border-t py-16 md:py-20"
      aria-labelledby="formats-heading"
    >
      <div className="container-site">
        <div className="mb-8">
          <p className="text-gold-text mb-2 font-mono text-xs tracking-[0.2em] uppercase">
            Что вы задумали?
          </p>
          <h2 id="formats-heading">Три формата</h2>
          <Link
            href="/help/formats"
            className="text-gold-text mt-1 inline-block text-sm hover:underline"
          >
            Что такое формат? →
          </Link>
        </div>

        {/* Horizontal scroll mobile, grid desktop */}
        <div className="-mx-4 flex snap-x snap-mandatory scrollbar-none gap-3 overflow-x-auto px-4 md:mx-0 md:grid md:snap-none md:grid-cols-3 md:px-0">
          {FORMATS.map((f) => {
            const price = PRICE_PER_GUEST[f.format]?.[f.tier] ?? 0;
            return (
              <Link
                key={f.format}
                href={f.href}
                className="group border-line bg-card hover:border-gold-text focus-visible:ring-ring flex w-[75vw] max-w-[300px] shrink-0 snap-start flex-col overflow-hidden rounded-xl border transition-all duration-200 focus-visible:ring-2 active:scale-[0.98] md:w-auto md:max-w-none"
              >
                <div className="bg-secondary aspect-[16/10] overflow-hidden">
                  {/* KenBurnsCard with diamond frame for format heroes */}
                  <KenBurnsCard
                    src={FORMAT_HERO_IMAGES[f.format]}
                    alt={getFormatName(f.format)}
                    aspectRatio="video"
                    frameShape="rounded-xl"
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <div className="mb-1 flex items-center justify-between">
                    <h3 className="font-heading text-base font-medium">
                      {getFormatName(f.format)}
                    </h3>
                    <span className="text-gold-text bg-gold-tint rounded-full px-2 py-0.5 text-xs">
                      {f.badge}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-3 text-xs">{f.explain}</p>
                  <p className="text-foreground mt-auto font-mono text-sm font-semibold">
                    от {price.toLocaleString("ru-RU")} ₽{" "}
                    <span className="text-muted-foreground text-xs font-normal">/гость</span>
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
        <p className="text-muted-foreground mt-4 text-center text-sm">
          <Link href="/menu/furshet" className="text-gold-text hover:underline">
            Мобильный фуршет
          </Link>{" "}
          — выезд на площадку без кухни
        </p>
      </div>
    </section>
  );
}

function getFormatName(f: Format): string {
  const m: Record<string, string> = {
    furshet: "Фуршет",
    banket: "Банкет",
    "coffee-break": "Кофе-брейк",
    detskoe: "Детский",
    "chef-at-home": "Выезд шефа",
  };
  return m[f] ?? f;
}
