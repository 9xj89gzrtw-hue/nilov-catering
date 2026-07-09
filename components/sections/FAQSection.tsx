'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { faqItems } from '@/lib/data';
import MaskReveal from '@/components/effects/TextReveal';

export default function FAQSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section ref={ref} className="py-24 md:py-36 bg-muted" aria-label="Часто задаваемые вопросы">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-20">
          <MaskReveal>
            <p className="text-[11px] uppercase tracking-[0.35em] text-gold font-medium mb-4">FAQ</p>
          </MaskReveal>
          <MaskReveal delay={0.1}>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-semibold text-cream leading-[0.95]">
              Частые
              <br />
              <span className="text-cream/40">вопросы</span>
            </h2>
          </MaskReveal>
        </div>

        <div className="space-y-2" role="region" aria-label="Аккордеон вопросов">
          {faqItems.slice(0, 7).map((item, i) => {
            const isOpen = openId === item.id;
            return (
              <motion.div
                key={item.id}
                className={`border overflow-hidden transition-colors duration-300 ${
                  isOpen ? 'border-gold/20 bg-card/50' : 'border-border'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.06,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <button
                  id={`faq-btn-${item.id}`}
                  className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left cursor-hover"
                  onClick={() => toggle(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${item.id}`}
                >
                  <span className={`text-sm font-medium pr-4 transition-colors duration-300 ${
                    isOpen ? 'text-gold' : 'text-cream'
                  }`}>
                    {item.question}
                  </span>
                  <span className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    isOpen ? 'border-gold/40 bg-gold/10 rotate-180' : 'border-border'
                  }`}>
                    <ChevronDown className="w-3.5 h-3.5 text-cream-muted" />
                  </span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${item.id}`}
                      role="region"
                      aria-labelledby={`faq-btn-${item.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 md:px-6 pb-5 md:pb-6 text-sm text-cream/60 leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* JSON-LD for FAQ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqItems.slice(0, 7).map((item) => ({
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
      </div>
    </section>
  );
}