"use client";

import { useState } from "react";
import { ChevronDown, Phone, MessageCircle } from "lucide-react";
import Link from "next/link";
import { SITE } from "@/lib/data";

/**
 * FAQSection — аккордеон FAQ для главной страницы
 *
 * Решает критику: "FAQ секция отсутствует на главной странице"
 * - 8 ключевых вопросов клиентов
 * - Аккордеон с плавной анимацией
 * - Schema.org FAQPage разметка для SEO
 * - CTA внутри ответов
 */

const FAQ_ITEMS = [
  {
    question: "Как заказать кейтеринг?",
    answer:
      "Оставьте заявку через форму выше, позвоните нам по телефону или напишите в WhatsApp. Менеджер уточнит детали, подготовит предложение и отправит договор. Минимальный срок заказа — 3 дня до события (для стандартных меню). Для свадьбы рекомендуем бронировать за 2-4 недели.",
  },
  {
    question: "Какое минимальное количество гостей?",
    answer:
      "Минимум зависит от формата: фуршет от 20 гостей, банкет от 15, кофе-брейк от 10, детский праздник от 10, шеф на дом от 6 человек. Для меньших компаний предлагаем формат частного ужина или выезд шефа.",
  },
  {
    question: "Доставка работает за пределами СПб?",
    answer:
      "Да, выезжаем во все районы Санкт-Петербурга, а также в Ленинградскую область (до 100 км от КАД включительно). Доставка по области рассчитывается индивидуально в зависимости от расстояния и объёма заказа.",
  },
  {
    question: "Что входит в цену за человека?",
    answer:
      "В базовую стоимость входят: меню (все заявленные позиции), официанты (1 на 8-10 гостей), посуда, приборы, столовые принадлежности, скатерти, декор столов, доставка, сборка и разбор, вывоз мусора. Дополнительно можно заказать: технику, цветы, фотозону, шоу-программу.",
  },
  {
    question: "Можно ли изменить меню под аллергии или предпочтения?",
    answer:
      "Обязательно! Мы готовим с учётом всех пожеланий: безглютеновые, веганские, халяльные, детские диеты. Укажите ограничения при заказе — шеф адаптирует меню. Также есть отдельные меню для каждого типа питания.",
  },
  {
    question: "Какие условия оплаты?",
    answer:
      "Стандартная схема: аванс 50% при подписании договора, остаток — за день до события. Принимаем наличные, банковский перевод. Для юридических лиц работаем с НДС и без. Для корпоративных клиентов возможна отсрочка платежа.",
  },
  {
    question: "Есть ли страховка ответственности?",
    answer:
      "Да! Мы застраховали гражданскую ответственность на 30 млн рублей. Это покрывает любые непредвиденные ситуации во время мероприятия. Также у нас есть все необходимые санитарные разрешения и сертификаты.",
  },
  {
    question: "Можно ли приехать на дегустацию?",
    answer:
      "Конечно! Приглашаем на дегустацию в нашу кухню-студию. Шеф лично представит блюда, подберёт варианты под ваш бюджет и ответит на вопросы. Дегустация бесплатная при оформлении брони. Запишитесь онлайн или по телефону.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-secondary/30 py-20 md:py-28" aria-labelledby="faq-heading">
      {/* Schema.org FAQPage structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ_ITEMS.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }),
        }}
      />

      <div className="container-site mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-gold-text mb-3 text-xs font-medium tracking-[0.22em] uppercase">
            Частые вопросы
          </p>
          <h2
            id="faq-heading"
            className="font-heading text-3xl md:text-5xl"
            style={{ fontWeight: 500 }}
          >
            Возможно, вы хотели <span className="text-gold-text">спросить</span>
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-xl">
            Ответы на популярные вопросы о нашем кейтеринге
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, index) => (
            <div
              key={index}
              className="bg-card border-line hover:border-gold-text/30 overflow-hidden rounded-xl border transition-all duration-200"
            >
              <button
                onClick={() => toggleItem(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
                className="flex min-h-[52px] w-full items-center justify-between gap-4 p-5 text-left no-underline"
              >
                <span className="text-foreground pr-4 text-base font-medium md:text-lg">
                  {item.question}
                </span>
                <ChevronDown
                  className={`text-gold-text h-5 w-5 shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>

              <div
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="text-muted-foreground border-line border-t px-5 pt-4 pb-5 text-sm leading-relaxed md:text-base">
                  <p>{item.answer}</p>

                  {/* CTA inside last item */}
                  {index === FAQ_ITEMS.length - 1 && (
                    <div className="mt-4 flex flex-wrap gap-3">
                      <Link
                        href="/tasting"
                        className="bg-gold-text hover:bg-primary inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white no-underline transition-colors"
                      >
                        Записаться на дегустацию
                      </Link>
                      <a
                        href={`tel:${SITE.phoneTel}`}
                        className="border-line hover:border-gold-text hover:text-gold-text inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium no-underline transition-colors"
                      >
                        <Phone className="h-4 w-4" aria-hidden="true" />
                        Позвонить
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="bg-card border-line mt-12 rounded-2xl border p-6 text-center">
          <p className="text-foreground mb-2 font-medium">Не нашли ответ?</p>
          <p className="text-muted-foreground mb-4 text-sm">
            Свяжитесь с нами — ответим на любой вопрос за 5 минут
          </p>
          <div className="flex justify-center gap-3">
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-medium text-white no-underline transition-colors hover:bg-[#20BD5A]"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp
            </a>
            <Link
              href="/faq"
              className="border-line hover:border-gold-text hover:text-gold-text inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium no-underline transition-colors"
            >
              Все вопросы →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
