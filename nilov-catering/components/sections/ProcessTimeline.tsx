"use client";

import { motion } from "framer-motion";
import { Phone, ChefHat, Truck, PartyPopper, CheckCircle2 } from "lucide-react";
import AnimatedSection from "@/components/common/AnimatedSection";

const steps = [
  {
    icon: Phone,
    step: "01",
    title: "Звонок или заявка",
    description: "Вы оставляете заявку на сайте или звоните нам. Мы обсуждаем формат, дату и количество гостей — ответим за 2 часа.",
  },
  {
    icon: ChefHat,
    step: "02",
    title: "Дегустация и меню",
    description: "Шеф-повар готовит 5–7 пробных блюд. Вы выбираете любимые, мы дорабатываем меню до идеала. Дегустация — бесплатно.",
  },
  {
    icon: Truck,
    step: "03",
    title: "Подготовка и логистика",
    description: "За 48 часов до мероприятия согласовываем финальные детали. Свежие продукты доставляем напрямую от фермеров.",
  },
  {
    icon: PartyPopper,
    step: "04",
    title: "День мероприятия",
    description: "Наша команда прибывает за 3 часа, настраивает зоны фуршета, готовит финальную подачу. Вы наслаждаетесь праздником.",
  },
  {
    icon: CheckCircle2,
    step: "05",
    title: "Идеальный результат",
    description: "98% клиентов возвращаются снова. После мероприятия мы собираем обратную связь и дарим скидку на следующий заказ.",
  },
];

export default function ProcessTimeline() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(200,120,42,0.04),transparent_50%)]" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-14">
            <p className="text-accent text-sm font-medium tracking-widest uppercase mb-3">
              Как мы работаем
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              5 шагов к <span className="gradient-text">идеальному мероприятию</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base leading-relaxed">
              Прозрачный процесс от первого звонка до финальной подачи — без сюрпризов
            </p>
          </div>
        </AnimatedSection>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            const isLeft = i % 2 === 0;

            return (
              <AnimatedSection key={step.step} delay={i * 0.1}>
                <div className={`relative flex items-start gap-6 mb-10 md:mb-14 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}>
                  {/* Dot */}
                  <div className="absolute left-5 md:left-1/2 w-3 h-3 bg-accent rounded-full -translate-x-1.5 mt-2 z-10 ring-4 ring-background" />

                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
                    isLeft ? "md:text-right md:pr-8" : "md:text-left md:pl-8"
                  }`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-5 md:p-6 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
                    >
                      <div className={`flex items-center gap-3 mb-3 ${
                        isLeft ? "md:justify-end" : ""
                      }`}>
                        <span className="text-xs font-mono text-accent/50 font-bold">
                          {step.step}
                        </span>
                        <div className={`w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center ${
                          isLeft ? "md:order-last" : ""
                        }`}>
                          <Icon className="w-4.5 h-4.5 text-accent" />
                        </div>
                      </div>
                      <h3 className="font-heading text-lg font-bold mb-1.5">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}