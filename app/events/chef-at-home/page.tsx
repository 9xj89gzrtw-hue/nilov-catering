import type { Metadata } from "next";
import Link from "next/link";
import TariffOffersSection from "@/components/blocks/TariffOffersSection";
import { Check, Users, Wine, ChefHat, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Шеф на дом — выезд шеф-повара в СПб | NiloV Catering",
  description:
    "Выезд шеф-повара на дом: персональный ужин ресторанного уровня. 4–6 курсов, Sous-Vide 63°C. От 4 500 ₽/гость. Опции: официант, сомелье.",
  alternates: {
    canonical: "/events/chef-at-home",
    languages: { ru: "/events/chef-at-home", "x-default": "/events/chef-at-home" },
  },
};

// === ОПЦИИ ДОПОЛНИТЕЛЬНЫХ УСЛУГ ===
const OPTIONS = [
  {
    id: "waiter",
    name: "Официант",
    price: "+1 500 ₽/час",
    condition: "мин 3 часа; 1 официант на 6 гостей",
    icon: Users,
    desc: "Профессиональная подача блюд, обслуживание гостей, уборка со стола",
  },
  {
    id: "coordinator",
    name: "Координатор мероприятия",
    price: "+2 000 ₽/час",
    condition: "для 8+ гостей",
    icon: Sparkles,
    desc: "Организация тайминга, координация с шефом, решение вопросов",
  },
  {
    id: "sommelier",
    name: "Сомелье / миксолог",
    price: "от 5 000 ₽",
    condition: "по запросу",
    icon: Wine,
    desc: "Wine-pairing к каждому блюду или авторский коктейльный сет",
    href: "/services/sommelier-at-home",
  },
  {
    id: "servware",
    name: "Премиум-сервировка",
    price: "от 3 000 ₽",
    condition: "аренда",
    icon: ChefHat,
    desc: "Фарфор, хрусталь, текстиль премиум-класса для вашего события",
  },
];

export default function ChefAtHomePage() {
  return (
    <main id="main" className="pt-24 pb-20">
      <div className="container-site max-w-3xl">
        {/* HERO */}
        <div className="mb-10">
          <div className="bg-gold-tint/20 text-gold-text mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
            <ChefHat className="h-4 w-4" />
            Ресторан у вас дома
          </div>

          <h1 className="font-heading mb-4 text-4xl font-bold md:text-5xl">Шеф на дом</h1>
          <p className="text-muted-foreground mb-4 text-lg">
            Шеф-повар приезжает к вам домой. Персональный ужин ресторанного уровня на{" "}
            <strong className="text-foreground">6–12 гостей</strong>.
          </p>
          <p className="text-muted-foreground mb-6">
            от <strong className="text-gold-text text-xl">4 500 ₽/гость</strong> — шеф, продукты,
            базовая сервировка, уборка. Минимум 6 гостей. Меню согласовывается индивидуально.
          </p>
        </div>

        {/* ТАРИФЫ */}
        <TariffOffersSection
          eventId="chef-at-home"
          eventName="Шеф на дом"
          description="Тарифы для выезда шефа: от 4-курсного ужина до гастрономического опыта с винным сопровождением."
        />

        {/* === ЧТО ВХОДИТ === */}
        <section className="mt-12 mb-12">
          <h2 className="font-heading mb-6 text-2xl font-bold">Что входит в цену</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              {
                title: "Работа шеф-повара",
                desc: "Подготовка и приготовление всех блюд на вашей кухне",
              },
              { title: "Продукты премиум", desc: "Свежие ингредиенты высшего качества" },
              { title: "Базовая сервировка", desc: "Посуда, столовые приборы, подача" },
              { title: "Уборка кухни", desc: "Полная уборка после приготовления" },
              { title: "3–6 часов работы", desc: "Приезд за 2 часа до подачи первого блюда" },
              {
                title: "Индивидуальное меню",
                desc: "От 3 до 6 курсов на выбор: французская, итальянская, паназиатская, русская кухня",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="border-line bg-card flex items-start gap-3 rounded-xl border p-4"
              >
                <Check className="text-gold-text mt-0.5 h-5 w-5 shrink-0" />
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-muted-foreground mt-1 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* === ОПЦИИ (ДОПОЛНИТЕЛЬНЫЕ УСЛУГИ) === */}
        <section className="mt-12 mb-12">
          <div className="mb-6">
            <h2 className="font-heading text-2xl font-bold">Дополнительные опции</h2>
            <p className="text-muted-foreground mt-2">
              Расширьте свой опыт — добавьте профессиональное обслуживание и сервис
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {OPTIONS.map((opt) => {
              const Icon = opt.icon;
              return (
                <div
                  key={opt.id}
                  className="border-line bg-card group hover:border-gold-text/50 relative overflow-hidden rounded-xl border p-5 transition-all hover:shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-gold-tint/20 group-hover:bg-gold-tint/40 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors">
                      <Icon className="text-gold-text h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold">{opt.name}</h3>
                        <span className="text-gold-text shrink-0 text-sm font-bold">
                          {opt.price}
                        </span>
                      </div>
                      <p className="text-muted-foreground mt-1 text-sm">{opt.desc}</p>
                      <p className="text-muted-foreground mt-2 text-xs">{opt.condition}</p>

                      {opt.href && (
                        <Link
                          href={opt.href}
                          className="text-gold-text mt-2 inline-flex items-center gap-1 text-xs font-medium hover:underline"
                        >
                          Подробнее →
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ВИННОЕ СОПРОВОЖДЕНИЕ */}
        <section className="from-gold-tint/10 border-gold-tint/30 mt-12 rounded-2xl border bg-gradient-to-br to-transparent p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-heading text-lg font-bold">🍷 Винное сопровождение</h2>
              <p className="text-muted-foreground mt-1 text-sm">
                Сомелье подбирает вино к каждому блюду. Карта от 3 500 ₽/бутылку.
              </p>
            </div>
            <Link
              href="/services/sommelier-at-home"
              className="bg-gold-text hover:bg-gold-text/90 inline-flex shrink-0 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-colors"
            >
              <Wine className="h-4 w-4" />
              Сомелье на дом
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
