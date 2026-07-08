import Breadcrumbs from "@/components/common/Breadcrumbs";

export default function TermsPage() {
  const breadcrumbs = [
    { label: "Главная", href: "/" },
    { label: "Условия использования", href: "/terms" },
  ];

  return (
    <main>
      <div className="bg-primary py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground">Условия использования</h1>
        </div>
      </div>
      <Breadcrumbs items={breadcrumbs} />
      <article className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">1. Общие положения</h2>
            <p>Настоящие Условия использования регулируют отношения между ООО &quot;Нилов Кейтеринг&quot; (Исполнитель) и пользователями сайта odaeda.ru (Пользователь). Используя сайт, Пользователь подтверждает своё согласие с настоящими Условиями.</p>
          </section>
          <section>
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">2. Услуги</h2>
            <p>Сайт предоставляет информацию об услугах кейтеринга, меню, ценах и позволяет оформить заявку на обслуживание мероприятия. Окончательная стоимость и условия определяются в индивидуальном договоре.</p>
          </section>
          <section>
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">3. Бронирование и оплата</h2>
            <p>Бронирование осуществляется не менее чем за 5 рабочих дней до мероприятия. Предоплата составляет 50% от рассчитанной стоимости. Оставшаяся сумма оплачивается не позднее дня мероприятия.</p>
          </section>
          <section>
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">4. Отмены и возвраты</h2>
            <p>При отмене более чем за 72 часа до мероприятия предоплата возвращается в полном объёме. При отмене менее чем за 72 часа предоплата не возвращается.</p>
          </section>
          <section>
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">5. Ответственность</h2>
            <p>Исполнитель несёт ответственность за качество предоставляемых услуг в соответствии с действующим законодательством РФ. Информация на сайте носит информационный характер и не является публичной офертой.</p>
          </section>
          <section>
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">6. Интеллектуальная собственность</h2>
            <p>Все материалы, размещённые на сайте (тексты, изображения, дизайн), являются интеллектуальной собственностью ООО &quot;Нилов Кейтеринг&quot; или используются на законных основаниях. Копирование без разрешения запрещено.</p>
          </section>
          <section>
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">7. Внесение изменений</h2>
            <p>Исполнитель оставляет за собой право вносить изменения в настоящие Условия без предварительного уведомления Пользователя. Актуальная версия всегда доступна на данной странице.</p>
          </section>
          <section>
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">8. Контакты</h2>
            <p>По всем вопросам обращайтесь: email: info@odaeda.ru, телефон: +7 (495) 123-45-67, адрес: г. Москва, ул. Тверская, д. 15, офис 301.</p>
          </section>
        </div>
      </article>
    </main>
  );
}
