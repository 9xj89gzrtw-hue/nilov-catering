import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Подписка', description: 'Регулярный кейтеринг для офисов и частных клиентов.' };

export default function SubscribePage() {
  return (
    <main className="pt-24 pb-20">
      <div className="container-site max-w-xl text-center">
        <h1 className="mb-4">Регулярный кейтеринг</h1>
        <p className="text-muted-foreground mb-6 text-balance">Кофе-брейки, бизнес-ланчи, еженедельные закупки для офиса — на постоянной основе со скидкой.</p>
        <form className="space-y-4 text-left max-w-md mx-auto" action="/api/quote" method="POST">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">Имя</label>
            <input id="name" name="name" required className="w-full rounded-lg border border-line bg-background px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">Телефон</label>
            <input id="phone" name="phone" type="tel" required className="w-full rounded-lg border border-line bg-background px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label htmlFor="period" className="block text-sm font-medium mb-1">Периодичность</label>
            <select id="period" name="period" className="w-full rounded-lg border border-line bg-background px-4 py-2.5 text-sm">
              <option>1 раз в неделю</option>
              <option>2–3 раза в неделю</option>
              <option>Ежедневно</option>
              <option>По запросу</option>
            </select>
          </div>
          <button type="submit" className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground">Отправить заявку</button>
        </form>
      </div>
    </main>
  );
}