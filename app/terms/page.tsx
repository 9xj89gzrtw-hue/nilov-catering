export default function TermsPage() {
  return (
    <>
      <div className="pt-20 md:pt-24 pb-8 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-4xl sm:text-5xl font-semibold text-cream mt-4">
            Условия использования
          </h1>
        </div>
      </div>
      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-sm text-cream/70 leading-relaxed">
          <p>Дата последнего обновления: 1 января 2025 г.</p>
          <h2 className="font-heading text-xl font-semibold text-cream mt-8">1. Общие условия</h2>
          <p>Используя сайт nilov-catering.ru, вы соглашаетесь с настоящими условиями. Все услуги кейтеринга предоставляются на основании договора, который заключается после согласования деталей.</p>
          <h2 className="font-heading text-xl font-semibold text-cream mt-8">2. Оплата</h2>
          <p>Оплата производится в два этапа: 50% предоплата при заключении договора и 50% за 2 дня до мероприятия. Принимаем безналичную оплату для юридических лиц и перевод для физических лиц.</p>
          <h2 className="font-heading text-xl font-semibold text-cream mt-8">3. Отмена</h2>
          <p>При отмене более чем за 7 дней — полный возврат предоплаты. При отмене за 3-7 дней — удерживается 30%. При отмене менее чем за 3 дня — предоплата не возвращается.</p>
          <h2 className="font-heading text-xl font-semibold text-cream mt-8">4. Контакты</h2>
          <p>По всем вопросам: info@nilov-catering.ru или +7 (812) 919-59-11.</p>
        </div>
      </section>
    </>
  );
}