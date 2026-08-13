import Link from "next/link";
import { Phone, MessageCircle, Calendar, ShieldCheck, Truck, Users } from "lucide-react";
import { SITE } from "@/lib/data";

const GUARANTEES = [
  { icon: Calendar, title: "Бронь за 3 дня", desc: "Фиксируем дату и цену в договоре" },
  {
    icon: Truck,
    title: "Доставка вовремя",
    desc: "SLA ±15 минут. Опоздание — штраф 1% за минуту (макс. 30%)",
  },
  {
    icon: ShieldCheck,
    title: "14 аллергенов",
    desc: "Маркируем каждое блюдо — глютен, орехи, молоко и др.",
  },
  { icon: Users, title: "Обученный персонал", desc: "Официанты, повара, бармены — с медкнижками" },
];

export default function CTASection() {
  return (
    <section className="bg-background py-20 md:py-28" aria-labelledby="cta-heading">
      <div className="container-site mx-auto max-w-5xl">
        {/* Guarantees strip */}
        <div className="mb-12 grid grid-cols-2 gap-4 md:mb-16 md:grid-cols-4">
          {GUARANTEES.map((g) => (
            <div
              key={g.title}
              className="border-line bg-card rounded-xl border p-4 text-center md:text-left"
            >
              <g.icon
                className="text-gold-text mx-auto mb-3 h-7 w-7 md:mx-0"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <h3 className="font-heading mb-1 text-base" style={{ fontWeight: 500 }}>
                {g.title}
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed">{g.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA panel */}
        <div className="bg-foreground text-background relative overflow-hidden rounded-2xl px-6 py-12 text-center md:px-12 md:py-16">
          <div className="relative">
            <p className="text-gold-text mb-4 text-xs tracking-[0.22em] uppercase">
              Бесплатно и без обязательств
            </p>
            <h2
              id="cta-heading"
              className="font-heading mb-4 text-3xl md:text-5xl"
              style={{ fontWeight: 500 }}
            >
              Рассчитаем за 15 минут
            </h2>
            <p className="text-background/75 mx-auto mb-8 max-w-xl text-base md:text-lg">
              Ответьте на 3 вопроса — получите расчёт с ценой под ваш бюджет. Перезвоним в рабочее
              время (9:00–21:00).
            </p>

            <div className="mb-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <Link
                href="/plan/helper"
                className="bg-primary text-primary-foreground inline-flex min-w-[280px] items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-semibold no-underline shadow-sm transition-colors"
              >
                Узнать цену — 3 вопроса
              </Link>
              {/* Secondary CTAs — compact icon buttons, not competing with primary */}
              <div className="flex justify-center gap-2">
                <a
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-background/30 text-background hover:bg-background/10 inline-flex h-12 w-12 items-center justify-center rounded-full border no-underline transition-colors"
                  aria-label="Написать в WhatsApp"
                >
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                </a>
                <a
                  href={`tel:${SITE.phoneTel}`}
                  className="border-background/30 text-background hover:bg-background/10 inline-flex h-12 w-12 items-center justify-center rounded-full border no-underline transition-colors"
                  aria-label="Позвонить"
                >
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </a>
              </div>
            </div>

            <p className="text-background/55 text-sm">
              Или напишите на почту{" "}
              <a
                href={`mailto:${SITE.email}`}
                className="text-background/80 hover:text-gold-text inline-flex min-h-[44px] items-center py-2 underline underline-offset-2"
              >
                {SITE.email}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
