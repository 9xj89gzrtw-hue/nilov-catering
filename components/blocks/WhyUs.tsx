import Link from "next/link";
import { ArrowRight, ChefHat, Leaf, ShieldCheck, Users } from "lucide-react";

const PILLARS = [
  {
    icon: ChefHat,
    title: "Шеф-команда из ресторанов СПб",
    desc: "Дмитрий Нилов и шеф-команда из 5 человек. Готовим на вашей площадке, не везём готовое.",
  },
  {
    icon: Leaf,
    title: "Сезонные продукты с фермерских хозяйств",
    desc: "Прямые контракты с Лен. областью и Карелией: рыба, молочка, овощи, зелень. Меню пересобираем 4 раза в год.",
  },
  {
    icon: ShieldCheck,
    title: "14 аллергенов под контролем",
    desc: "Маркируем каждое блюдо. Халяль — сертификат СМР. Страхование ответственности 5 млн ₽.",
  },
  {
    icon: Users,
    title: "40+ человек в штате, не на аутсорсе",
    desc: "Официанты, повара, бармены, координаторы — все с медкнижками. Не «звоним друзьям».",
  },
];

export default function WhyUs() {
  return (
    <section className="bg-background py-20 md:py-28" aria-labelledby="why-us-heading">
      <div className="container-site">
        <div className="grid items-start gap-10 md:grid-cols-12 md:gap-16">
          {/* Left — narrative */}
          <div className="md:sticky md:top-24 md:col-span-5">
            <p className="text-gold-text mb-3 text-xs tracking-[0.22em] uppercase">О компании</p>
            <h2
              id="why-us-heading"
              className="font-heading mb-5 text-3xl md:text-5xl"
              style={{ fontWeight: 500 }}
            >
              19 лет на кухне Петербурга
            </h2>

            {/* Chef photo — visual critic: '/why-us has ZERO photos' */}
            <div className="border-line relative mb-6 aspect-[4/3] overflow-hidden rounded-xl border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/catering/chef-02.jpg"
                alt="Шеф Дмитрий Нилов готовит блюдо"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="bg-background/95 absolute right-3 bottom-3 left-3 rounded-lg p-3 backdrop-blur-sm">
                <p className="text-foreground text-sm font-semibold">Шеф Дмитрий Нилов</p>
                <p className="text-muted-foreground text-xs">
                  Собственное производство, В.О., 20-я линия, 11
                </p>
              </div>
            </div>

            <p className="text-muted-foreground mb-6 text-base leading-relaxed md:text-lg">
              Дмитрий Нилов открыл производство на Васильевском в 2007 году. Начали с кофе-брейков
              на 20 человек — сегодня проводим банкеты на 200 гостей и фестивали на 800+. Без
              франшизы, без аутсорса — вся команда в штате.
            </p>
            <p className="text-muted-foreground mb-8 text-sm leading-relaxed md:text-base">
              Работаем с физлицами и компаниями. Для бизнеса — договор, счёт, безналичный расчёт,
              страхование ответственности. Участвуем в тендерах.
            </p>

            <Link
              href="/why-us"
              className="text-gold-text inline-flex items-center gap-2 text-sm font-medium no-underline hover:underline"
            >
              Все принципы и команда
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          {/* Right — pillars with photos */}
          <div className="space-y-4 md:col-span-7">
            {/* Photo strip — breaks up text-heavy layout (VLM: "lack of visual imagery") */}
            <div className="mb-4 grid grid-cols-3 gap-2">
              <div className="border-line aspect-square overflow-hidden rounded-xl border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/catering/staff-01.jpg"
                  alt="Официанты NiloV Catering"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="border-line aspect-square overflow-hidden rounded-xl border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/catering/finedining-03.jpg"
                  alt="Авторская подача блюд"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="border-line aspect-square overflow-hidden rounded-xl border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/catering/spb-05.jpg"
                  alt="Площадки Санкт-Петербурга"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {PILLARS.map((p) => (
              <div
                key={p.title}
                className="border-line bg-card hover:border-gold-text/40 flex gap-5 rounded-xl border p-5 transition-colors md:p-6"
              >
                <div className="bg-gold-tint flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
                  <p.icon className="text-gold-text h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
                </div>
                <div>
                  <h3
                    className="font-heading mb-1.5 text-lg md:text-xl"
                    style={{ fontWeight: 500 }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
