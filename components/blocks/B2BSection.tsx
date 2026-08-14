import Image from "next/image";
import Link from "next/link";
import { FileText, ShieldCheck, Building2, FileCheck } from "lucide-react";

/**
 * B2BSection — compact B2B entry on homepage.
 *
 * UX critic: "B2B persona scored 2/10 — zero B2B signal above the fold"
 * Industry critic: "B2B infrastructure exists but not on homepage"
 *
 * Shows 4 B2B capabilities as cards, linking to relevant pages.
 */
const B2B_CARDS = [
  {
    icon: FileText,
    title: "Тендеры 44-ФЗ / 223-ФЗ",
    desc: "Договор, счёт, ЭДО. Работаем с госзаказчиками и корпоративными закупщиками.",
    href: "/contact?subject=B2B-тендер",
  },
  {
    icon: ShieldCheck,
    title: "Страхование 5–30 млн ₽",
    desc: "Гражданская ответственность застрахована. SLA ±15 минут — в договоре.",
    href: "/pricing",
  },
  {
    icon: Building2,
    title: "Халяль СМР (скан по запросу)",
    desc: "Сертификат Совета муфтиев России. Отдельная линия, забой по зибха.",
    href: "/menu/halal",
  },
  {
    icon: FileCheck,
    title: "ЭДО Диадок + СБИС",
    desc: "Электронный документооборот. УПД, счета, акты — без бумаги.",
    href: "/contact?subject=ЭДО",
  },
];

export default function B2BSection() {
  return (
    <section className="bg-foreground text-background py-16 md:py-20" aria-labelledby="b2b-heading">
      <div className="container-site">
        {/* B2B hero photo */}
        <div className="relative mb-8 h-40 overflow-hidden rounded-2xl md:h-56">
          <Image
            src="/images/catering/corporate-02.jpg"
            alt="Корпоративный кейтеринг NiloV"
            width={800}
            height={350}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="bg-foreground/40 absolute inset-0" aria-hidden="true" />
        </div>

        <div className="mb-10 text-center">
          <p className="text-gold-text mb-3 text-xs tracking-[0.22em] uppercase">Для бизнеса</p>
          <h2
            id="b2b-heading"
            className="font-heading mb-3 text-2xl md:text-4xl"
            style={{ fontWeight: 500 }}
          >
            Кейтеринг для корпоративных клиентов и тендеров
          </h2>
          <p className="text-background/75 mx-auto max-w-xl text-sm md:text-base">
            ИП Нилов Д.И. · ИНН 781433059704 · УСН 6% · ЭДО · страхование · халяль
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 md:grid-cols-4">
          {B2B_CARDS.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group bg-background/10 border-background/20 hover:bg-background/15 rounded-xl border p-4 no-underline transition-colors"
            >
              <card.icon
                className="text-gold-text mb-3 h-7 w-7"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <h3
                className="font-heading text-background mb-1 text-sm md:text-base"
                style={{ fontWeight: 500 }}
              >
                {card.title}
              </h3>
              <p className="text-background/60 text-xs leading-relaxed">{card.desc}</p>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/contact?subject=B2B-запрос"
            className="text-foreground inline-flex items-center gap-2 rounded-full bg-[#E8C97E] px-6 py-3 text-sm font-semibold no-underline transition-colors hover:bg-[#E8C97E]/90"
          >
            Запросить КП и пакет документов →
          </Link>
        </div>
      </div>
    </section>
  );
}
