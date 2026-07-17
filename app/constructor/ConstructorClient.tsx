'use client';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConstructor } from '@/hooks/useConstructor';
import StepProgress from '@/components/constructor/StepProgress';
import FormatSelector from '@/components/constructor/FormatSelector';
import GuestsSlider from '@/components/constructor/GuestsSlider';
import TierSelector from '@/components/constructor/TierSelector';
import AddOnsSelector from '@/components/constructor/AddOnsSelector';
import SummaryCard from '@/components/constructor/SummaryCard';
import ContactForm from '@/components/constructor/ContactForm';

const STEPS = ['Формат', 'Гости', 'Тариф', 'Доп. услуги', 'Итого', 'Контакты'];

export default function ConstructorClient() {
  const { currentStep, setStep, recalc } = useConstructor();

  useEffect(() => {
    useConstructor.persist?.rehydrate();
    recalc();
  }, [recalc]);

  return (
    <section className="py-8 md:py-16 bg-background min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-[11px] uppercase tracking-[0.35em] text-gold font-medium mb-4">Уникальная услуга — 0 из 74 конкурентов</p>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-semibold text-cream leading-[0.95]">
            Конструктор меню<br /><span className="text-gold">за 2 минуты</span>
          </h1>
          <p className="mt-4 text-sm text-cream-muted max-w-lg mx-auto">
            Соберите кейтеринг онлайн: формат, гости, тариф, доп. услуги. Мгновенный расчёт стоимости без скрытых платежей.
          </p>
        </div>

        <StepProgress steps={STEPS} currentStep={currentStep} onStepClick={(s) => s < currentStep && setStep(s)} />

        <div className="mt-8 bg-card border border-border rounded-2xl p-6 md:p-10 min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 1 && <FormatSelector />}
              {currentStep === 2 && <GuestsSlider />}
              {currentStep === 3 && <TierSelector />}
              {currentStep === 4 && <AddOnsSelector />}
              {currentStep === 5 && <SummaryCard />}
              {currentStep === 6 && <ContactForm />}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={() => currentStep > 1 && setStep(currentStep - 1)}
            disabled={currentStep === 1}
            className="px-6 py-3 text-sm text-cream-muted hover:text-cream disabled:opacity-30 transition-opacity min-h-[44px]"
          >
            ← Назад
          </button>
          <span className="text-xs text-cream-muted">Шаг {currentStep} из 6</span>
          {currentStep < 6 && (
            <button
              onClick={() => setStep(currentStep + 1)}
              className="px-8 py-3 bg-gradient-to-r from-gold to-gold-dark text-background font-heading text-sm rounded-lg hover:opacity-90 transition-opacity min-h-[44px]"
            >
              Далее →
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
