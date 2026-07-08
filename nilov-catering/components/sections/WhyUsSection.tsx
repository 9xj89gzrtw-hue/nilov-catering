"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/common/AnimatedSection";
import { Leaf, ChefHat, HeartHandshake, Truck, Clock, Award } from "lucide-react";

const features = [
  {
    icon: ChefHat,
    title: "Авторская кухня",
    description: "Каждое блюдо разрабатывается шеф-поваром Николаем Ниловым лично. Мы не используем полуфабрикаты — только свежие продукты и оригинальные рецепты.",
  },
  {
    icon: Leaf,
    title: "Свежие локальные продукты",
    description: "Работаем с проверенными фермерскими хозяйствами Подмосковья. Сезонные ингредиенты, короткая цепочка поставок от поля к вашему столу.",
  },
  {
    icon: HeartHandshake,
    title: "Индивидуальный подход",
    description: "Адаптируем меню под dietary требования, allergies и предпочтения каждого гостя. Создаём уникальное меню для каждого мероприятия.",
  },
  {
    icon: Truck,
    title: "Полный сервис под ключ",
    description: "Доставка, сервировка, обслуживание, уборка — берём на себя всю логистику. Вам остаётся только наслаждаться праздником.",
  },
  {
    icon: Clock,
    title: "Точность до минуты",
    description: "12 лет опыта позволяют нам рассчитать тайминг каждого мероприятия с хирургической точностью. Никаких задержек и накладок.",
  },
  {
    icon: Award,
    title: "Премиальный сервис",
    description: "Наши официанты проходят специальное обучение. Безупречная подача, знание меню и внимательность к каждому гостю — наш стандарт.",
  },
];

export default function WhyUsSection() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(200,120,42,0.04),transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12 md:mb-16">
            <p className="text-accent text-sm font-medium tracking-widest uppercase mb-3">
              Почему мы
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Отличия, которые <span className="gradient-text">заметят ваши гости</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              Мы не просто кормим — мы создаём гастрономический опыт. Вот что делает наш кейтеринг особенным
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <AnimatedSection key={feature.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group relative p-6 md:p-8 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 transition-all duration-500 h-full"
                >
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-accent/0 group-hover:bg-accent/[0.02] transition-colors duration-500" />

                  <div className="relative z-10">
                    <motion.div
                      className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent group-hover:scale-110 transition-all duration-500"
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="w-6 h-6 text-accent group-hover:text-white transition-colors duration-500" />
                    </motion.div>
                    <h3 className="font-heading text-lg font-bold mb-2 group-hover:text-accent transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}