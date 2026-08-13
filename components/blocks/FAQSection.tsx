'use client';

import { useState } from 'react';
import { ChevronDown, Phone, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { SITE } from '@/lib/data';

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
    question: 'Как заказать кейтеринг?',
    answer: 'Оставьте заявку через форму выше, позвоните нам по телефону или напишите в WhatsApp. Менеджер уточнит детали, подготовит предложение и отправит договор. Минимальный срок заказа — 3 дня до события (для стандартных меню). Для свадьбы рекомендуем бронировать за 2-4 недели.',
  },
  {
    question: 'Какое минимальное количество гостей?',
    answer: 'Минимум зависит от формата: фуршет от 20 гостей, банкет от 15, кофе-брейк от 10, детский праздник от 10, шеф на дом от 6 человек. Для меньших компаний предлагаем формат частного ужина или выезд шефа.',
  },
  {
    question: 'Доставка работает за пределами СПб?',
    answer: 'Да, выезжаем во все районы Санкт-Петербурга, а также в Ленинградскую область (до 100 км от КАД включительно). Доставка по области рассчитывается индивидуально в зависимости от расстояния и объёма заказа.',
  },
  {
    question: 'Что входит в цену за человека?',
    answer: 'В базовую стоимость входят: меню (все заявленные позиции), официанты (1 на 8-10 гостей), посуда, приборы, столовые принадлежности, скатерти, декор столов, доставка, сборка и разбор, вывоз мусора. Дополнительно можно заказать: технику, цветы, фотозону, шоу-программу.',
  },
  {
    question: 'Можно ли изменить меню под аллергии или предпочтения?',
    answer: 'Обязательно! Мы готовим с учётом всех пожеланий: безглютеновые, веганские, халяльные, детские диеты. Укажите ограничения при заказе — шеф адаптирует меню. Также есть отдельные меню для каждого типа питания.',
  },
  {
    question: 'Какие условия оплаты?',
    answer: 'Стандартная схема: аванс 50% при подписании договора, остаток — за день до события. Принимаем наличные, банковский перевод. Для юридических лиц работаем с НДС и без. Для корпоративных клиентов возможна отсрочка платежа.',
  },
  {
    question: 'Есть ли страховка ответственности?',
    answer: 'Да! Мы застраховали гражданскую ответственность на 30 млн рублей. Это покрывает любые непредвиденные ситуации во время мероприятия. Также у нас есть все необходимые санитарные разрешения и сертификаты.',
  },
  {
    question: 'Можно ли приехать на дегустацию?',
    answer: 'Конечно! Приглашаем на дегустацию в нашу кухню-студию. Шеф лично представит блюда, подберёт варианты под ваш бюджет и ответит на вопросы. Дегустация бесплатная при оформлении брони. Запишитесь онлайн или по телефону.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 md:py-28 bg-secondary/30" aria-labelledby="faq-heading">
      {/* Schema.org FAQPage structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ_ITEMS.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
              },
            })),
          }),
        }}
      />

      <div className="container-site max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.22em] text-gold-text mb-3 font-medium">
            Частые вопросы
          </p>
          <h2 id="faq-heading" className="font-heading text-3xl md:text-5xl" style={{ fontWeight: 500 }}>
            Возможно, вы хотели <span className="text-gold-text">спросить</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Ответы на популярные вопросы о нашем кейтеринге
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, index) => (
            <div
              key={index}
              className="bg-card border border-line rounded-xl overflow-hidden transition-all duration-200 hover:border-gold-text/30"
            >
              <button
                onClick={() => toggleItem(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
                className="w-full flex items-center justify-between gap-4 p-5 text-left no-underline min-h-[52px]"
              >
                <span className="font-medium text-base md:text-lg text-foreground pr-4">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 shrink-0 text-gold-text transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
              
              <div
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-5 pb-5 text-muted-foreground leading-relaxed text-sm md:text-base border-t border-line pt-4">
                  <p>{item.answer}</p>
                  
                  {/* CTA inside last item */}
                  {index === FAQ_ITEMS.length - 1 && (
                    <div className="mt-4 flex flex-wrap gap-3">
                      <Link
                        href="/tasting"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-text text-white text-sm font-medium hover:bg-primary transition-colors no-underline"
                      >
                        Записаться на дегустацию
                      </Link>
                      <a
                        href={`tel:${SITE.phoneTel}`}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-line text-sm font-medium hover:border-gold-text hover:text-gold-text transition-colors no-underline"
                      >
                        <Phone className="w-4 h-4" aria-hidden="true" />
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
        <div className="mt-12 text-center p-6 bg-card rounded-2xl border border-line">
          <p className="text-foreground font-medium mb-2">Не нашли ответ?</p>
          <p className="text-sm text-muted-foreground mb-4">
            Свяжитесь с нами — ответим на любой вопрос за 5 минут
          </p>
          <div className="flex justify-center gap-3">
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] text-white text-sm font-medium hover:bg-[#20BD5A] transition-colors no-underline"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              WhatsApp
            </a>
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-line text-sm font-medium hover:border-gold-text hover:text-gold-text transition-colors no-underline"
            >
              Все вопросы →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
