"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/common/AnimatedSection";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "За какое время нужно оформить заказ?",
    a: "Мы рекомендуем бронировать кейтеринг минимум за 2 недели до мероприятия. Для крупных событий на 100+ гостей — за 1 месяц. Однако мы всегда стараемся помочь даже при срочных заказах — свяжитесь с нами, и мы обсудим возможности.",
  },
  {
    q: "Как происходит процесс выбора меню?",
    a: "После первичной консультации мы подготовим персональное предложение с 2–3 вариантами меню. Вы можете выбрать готовый пакет или собрать меню самостоятельно с помощью нашего онлайн-конструктора. Также доступна бесплатная дегустация для мероприятий от 30 гостей.",
  },
  {
    q: "Работаете ли вы с диетическими требованиями?",
    a: "Да, мы адаптируем меню под любые dietary требования: вегетарианское, веганское, безглютеновое, кошерное, халяльное меню, а также учитываем индивидуальные аллергии. Обязательно уточните эти данные при заказе.",
  },
  {
    q: "Что входит в стоимость кейтеринга?",
    a: "Стоимость включает: разработку меню, закупку продуктов, приготовление блюд, доставку, сервировку, обслуживание официантами, аренду оборудования (столы, посуда, приборы), уборку после мероприятия. Никаких скрытых платежей.",
  },
  {
    q: "Есть ли минимальное количество гостей?",
    a: "Минимальный заказ — 10 человек. Для меньшего количества мы можем предложить формат доставки готовых блюд с инструкцией по сервировке. Свяжитесь с нами для получения индивидуального расчёта.",
  },
  {
    q: "Какие зоны обслуживания?",
    a: "Мы работаем по всей Москве и в радиусе 100 км от МКАД. Для мероприятий за пределами этого радиуса рассчитывается индивидуальная логистическая доплата. Также выезжаем в Санкт-Петербург и другие крупные города РФ.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12 md:mb-16">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-accent/10 text-accent rounded-full px-4 py-1.5 text-xs font-medium tracking-wider uppercase mb-4"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              Частые вопросы
            </motion.div>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Ответы на <span className="gradient-text">вопросы</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base leading-relaxed">
              Собрали самые частые вопросы от наших клиентов
            </p>
          </div>
        </AnimatedSection>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <AnimatedSection key={i} delay={i * 0.05}>
              <motion.div
                className="rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden hover:border-accent/30 transition-colors duration-300"
                layout
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left"
                >
                  <span className="font-medium text-sm md:text-base pr-4">{faq.q}</span>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-accent" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 md:px-6 pb-5 md:pb-6 text-muted-foreground text-sm leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}