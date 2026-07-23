import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Партнёрам', description: 'Сотрудничество с NiloV Catering — площадки, организаторы, агентства.' };

export default function PartnersPage() {
  return (
    <main className="pt-24 pb-20">
      <div className="container-site max-w-2xl">
        <h1 className="mb-4">Партнёрам</h1>
        <p className="text-muted-foreground mb-8">Мы открыты к сотрудничеству с event-агентствами, организаторами, площадками и корпоративными клиентами.</p>

        <div className="grid gap-6">
          {[
            { title: 'Площадки', desc: 'Добавим ваш объект в каталог рекомендованных площадок. Совместный кейтеринг на вашей территории.' },
            { title: 'Организаторы', desc: 'Партнёрские условия для event-агентств. Вы получаете кейтеринг под ключ — мы ваш надёжный гастрономический партнёр.' },
            { title: 'Поставщики', desc: 'Работаем с фермерами ЛО и локальными производителями. Открыты к новым контактам.' },
          ].map(item => (
            <div key={item.title} className="rounded-xl border border-line bg-card p-6">
              <h2 className="font-heading text-lg font-medium mb-2">{item.title}</h2>
              <p className="text-sm text-muted-foreground mb-4">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link href="/contact" className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">Связаться →</Link>
        </div>
      </div>
    </main>
  );
}