import Breadcrumbs from "@/components/common/Breadcrumbs";

export default function PrivacyPage() {
  const breadcrumbs = [
    { label: "Главная", href: "/" },
    { label: "Политика конфиденциальности", href: "/privacy" },
  ];

  return (
    <main>
      <div className="bg-primary py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground">Политика конфиденциальности</h1>
        </div>
      </div>
      <Breadcrumbs items={breadcrumbs} />
      <article className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">1. Общие положения</h2>
            <p>Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта Nilov Catering (nilov-catering.ru), принадлежащего ООО &quot;Нилов Кейтеринг&quot;. Политика разработана в соответствии с Федеральным законом от 27.07.2006 N 152-ФЗ &quot;О персональных данных&quot;. Используя сайт, вы подтверждаете согласие с настоящей Политикой.</p>
          </section>
          <section>
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">2. Собираемые данные</h2>
            <p>Оператор собирает следующие категории персональных данных: имя и фамилия, номер телефона, адрес электронной почты, IP-адрес, данные о поведении на сайте (cookies, страницы посещений, время проведения). Данные собираются при заполнении форм заявки, подписки на рассылку и автоматически с помощью сервисов аналитики.</p>
          </section>
          <section>
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">3. Цели обработки</h2>
            <p>Персональные данные обрабатываются в следующих целях: обработка заявок на кейтеринговое обслуживание, связь с клиентами для уточнения деталей мероприятий, отправка информационных материалов по подписке, улучшение качества сервиса, анализ посещаемости и поведения на сайте, соблюдение требований законодательства Российской Федерации.</p>
          </section>
          <section>
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">4. Юридические основания</h2>
            <p>Обработка персональных данных осуществляется на основании: согласия субъекта персональных данных (ст. 6 п. 1 пп. 1 ФЗ-152), исполнения договора (ст. 6 п. 1 пп. 5 ФЗ-152), законных интересов Оператора (ст. 6 п. 1 пп. 7 ФЗ-152).</p>
          </section>
          <section>
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">5. Третьи лица</h2>
            <p>Оператор передаёт персональные данные следующим третьим лицам: Яндекс.Метрика (для аналитики посещаемости), хостинг-провайдер (для обеспечения работоспособности сайта). Передача данных иным третьим лицам осуществляется только с согласия субъекта персональных данных.</p>
          </section>
          <section>
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">6. Сроки хранения</h2>
            <p>Персональные данные хранятся в течение 3 лет с момента последнего взаимодействия с клиентом, если иное не предусмотрено договором. Данные форм аналитики хранятся в течение 26 месяцев. По истечении сроков хранения данные уничтожаются.</p>
          </section>
          <section>
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">7. Права субъекта данных</h2>
            <p>Вы имеете право: на доступ к своим персональным данным, на их исправление, на удаление, на отзыв согласия на обработку, на обращение в уполномоченный орган по защите прав субъектов персональных данных. Для реализации прав направьте запрос на interfood-catering@yandex.ru.</p>
          </section>
          <section>
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">8. Контакты</h2>
            <p>По всем вопросам, связанным с обработкой персональных данных, обращайтесь: ООО &quot;Нилов Кейтеринг&quot;, ИНН 7712345678, , адрес: Санкт-Петербург, email: interfood-catering@yandex.ru, телефон: +7 (812) 919-59-11.</p>
          </section>
        </div>
      </article>
    </main>
  );
}
