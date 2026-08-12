import Link from 'next/link';
import { FileText, ShieldCheck, Building2, FileCheck } from 'lucide-react';

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
    title: 'Тендеры 44-ФЗ / 223-ФЗ',
    desc: 'Договор, счёт, ЭДО. Работаем с госзаказчиками и корпоративными закупщиками.',
    href: '/contact?subject=B2B-тендер',
  },
  {
    icon: ShieldCheck,
    title: 'Страхование 5–30 млн ₽',
    desc: 'Гражданская ответственность застрахована. SLA ±15 минут — в договоре.',
    href: '/pricing',
  },
  {
    icon: Building2,
    title: 'Халяль СМР (скан по запросу)',
    desc: 'Сертификат Совета муфтиев России. Отдельная линия, забой по зибха.',
    href: '/menu/halal',
  },
  {
    icon: FileCheck,
    title: 'ЭДО Диадок + СБИС',
    desc: 'Электронный документооборот. УПД, счета, акты — без бумаги.',
    href: '/contact?subject=ЭДО',
  },
];

export default function B2BSection() {
  return (
    <section className="py-16 md:py-20 bg-foreground text-background" aria-labelledby="b2b-heading">
      <div className="container-site">
        {/* B2B hero photo */}
        <div className="relative h-40 md:h-56 rounded-2xl overflow-hidden mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/catering/corporate-02.jpg"
            alt="Корпоративный кейтеринг NiloV"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-foreground/40" aria-hidden="true" />
        </div>

        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.22em] text-gold-text mb-3">Для бизнеса</p>
          <h2 id="b2b-heading" className="font-heading text-2xl md:text-4xl mb-3" style={{ fontWeight: 500 }}>
            Кейтеринг для корпоративных клиентов и тендеров
          </h2>
          <p className="text-background/75 text-sm md:text-base max-w-xl mx-auto">
            ИП Нилов Д.И. · ИНН 781433059704 · УСН 6% · ЭДО · страхование · халяль
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
          {B2B_CARDS.map((card) =>(
            <Link
              key={card.title}
              href={card.href}
              className="group p-4 rounded-xl bg-background/10 border border-background/20 hover:bg-background/15 transition-colors no-underline"
            >
              <card.icon className="w-7 h-7 mb-3 text-gold-text" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="font-heading text-sm md:text-base mb-1 text-background" style={{ fontWeight: 500 }}>
                {card.title}
              </h3>
              <p className="text-xs text-background/60 leading-relaxed">{card.desc}</p>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/contact?subject=B2B-запрос"
            className="inline-flex items-center gap-2 rounded-full bg-[#E8C97E] text-foreground px-6 py-3 text-sm font-semibold hover:bg-[#E8C97E]/90 transition-colors no-underline"
          >
            Запросить КП и пакет документов →
          </Link>
        </div>
      </div>
    </section>
  );
}
