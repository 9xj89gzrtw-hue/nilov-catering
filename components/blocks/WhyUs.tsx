import Link from 'next/link';
import { ArrowRight, ChefHat, Leaf, ShieldCheck, Users } from 'lucide-react';

const PILLARS = [
  {
    icon: ChefHat,
    title: 'Шеф-команда из ресторанов СПб',
    desc: 'Дмитрий Нилов и 4 су-шефа из топовых ресторанов Петербурга. Готовим на вашей площадке, не везём готовое.',
  },
  {
    icon: Leaf,
    title: 'Сезонные продукты с фермерских хозяйств',
    desc: 'Прямые контракты с Лен. областью и Карелией: рыба, молочка, овощи, зелень. Меню пересобираем 4 раза в год.',
  },
  {
    icon: ShieldCheck,
    title: '14 аллергенов под контролем',
    desc: 'Маркируем каждое блюдо. Халяль — сертификат СМР. Страхование ответственности 5 млн ₽.',
  },
  {
    icon: Users,
    title: '40 человек в штате, не на аутсорсе',
    desc: 'Официанты, повара, бармены, координаторы — все с медкнижками. Не «звоним друзьям».',
  },
];

export default function WhyUs() {
  return (
    <section className="py-20 md:py-28 bg-background" aria-labelledby="why-us-heading">
      <div className="container-site">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">
          {/* Left — narrative */}
          <div className="md:col-span-5 md:sticky md:top-24">
            <p className="text-xs uppercase tracking-[0.22em] text-gold-text mb-3">О компании</p>
            <h2 id="why-us-heading" className="font-heading text-3xl md:text-5xl mb-5" style={{ fontWeight: 500 }}>
              19 лет на кухне Петербурга
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
              Дмитрий Нилов открыл производство на Васильевском в 2007 году. Начали с кофе-брейков на 20 человек —
              сегодня проводим банкеты на 200 гостей и фестивали на 800+. Без франшизы, без аутсорса — вся команда в штате.
            </p>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-8">
              Работаем с физлицами и компаниями. Для B2B — договор, УПД, ЭДО (Диадок/СБИС), страхование ответственности.
              Участвуем в тендерах по 44-ФЗ и 223-ФЗ.
            </p>

            <Link
              href="/why-us"
              className="inline-flex items-center gap-2 text-sm font-medium text-gold-text hover:underline no-underline"
            >
              Все принципы и команда
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          {/* Right — pillars */}
          <div className="md:col-span-7 space-y-4">
            {PILLARS.map((p) => (
              <div
                key={p.title}
                className="flex gap-5 p-5 md:p-6 rounded-xl border border-line bg-card hover:border-gold-text/40 transition-colors"
              >
                <div className="shrink-0 w-12 h-12 rounded-xl bg-gold-tint flex items-center justify-center">
                  <p.icon className="w-6 h-6 text-gold-text" strokeWidth={1.5} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-heading text-lg md:text-xl mb-1.5" style={{ fontWeight: 500 }}>{p.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
