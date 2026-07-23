import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Дегустация',
  description: 'Пробуем меню вместе перед событием. Для заказов от 30 гостей — обязательный этап.',
};

export default function TastingPage() {
  return (
    <main className="pt-24 pb-20"><div className="container-site max-w-xl">
      <h1 className="mb-4">Дегустация</h1>
      <p className="text-muted-foreground mb-8 text-balance">Пробуем меню вместе перед событием. Вы выбираете блюда, мы готовим — вы дегустируете и утверждаете. Для заказов от 30 гостей — обязательный этап.</p>

      <div className="grid gap-4 mb-10">
        {[
          { title: 'Что входит', text: 'До 6 блюд на выбор из вашего тарифа. Аперитив и комплимент от шефа. Длительность — до 1.5 часов.' },
          { title: 'Где проходит', text: 'У нас на производстве (м. Нарвская) или с выездом к вам (от 5 000 ₽ за выезд).' },
          { title: 'Когда', text: 'Будни 10:00–18:00, суббота по договорённости. Запись минимум за 5 дней.' },
        ].map(item => (
          <div key={item.title} className="rounded-lg border border-line bg-card p-4">
            <h2 className="font-heading text-base font-medium mb-1">{item.title}</h2>
            <p className="text-sm text-muted-foreground">{item.text}</p>
          </div>
        ))}
      </div>

      <form className="space-y-4" action="/api/quote" method="POST">
        <input type="hidden" name="format" value="Дегустация" />
        <div><label htmlFor="name" className="block text-sm font-medium mb-1">Имя</label><input id="name" name="name" required className="w-full rounded-lg border border-line bg-background px-4 py-2.5 text-sm" /></div>
        <div><label htmlFor="phone" className="block text-sm font-medium mb-1">Телефон</label><input id="phone" name="phone" type="tel" required className="w-full rounded-lg border border-line bg-background px-4 py-2.5 text-sm" /></div>
        <div><label htmlFor="date" className="block text-sm font-medium mb-1">Желаемая дата</label><input id="date" name="date" type="date" className="w-full rounded-lg border border-line bg-background px-4 py-2.5 text-sm" /></div>
        <button type="submit" className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground">Записаться на дегустацию</button>
      </form>
    </div></main>
  );
}
