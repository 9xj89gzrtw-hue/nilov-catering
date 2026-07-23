import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Сертификаты и безопасность',
  description: '152-ФЗ «О персональных данных», ТР ТС 021/2011 «О безопасности пищевой продукции», декларации соответствия.',
};

export default function CertificatesPage() {
  return (
    <main className="pt-24 pb-20"><div className="container-site max-w-2xl">
      <h1 className="mb-8">Сертификаты и безопасность</h1>

      <div className="space-y-6">
        {[
          {
            title: '152-ФЗ «О персональных данных»',
            desc: 'Все данные клиентов обрабатываются в соответствии с Федеральным законом №152-ФЗ. Мы не передаём ваши данные третьим лицам. Хранение — на серверах в РФ.',
          },
          {
            title: 'ТР ТС 021/2011 «О безопасности пищевой продукции»',
            desc: 'Всё производство соответствует Техническому регламенту Таможенного союза. Маркировка 14 аллергенов обязательна. Холодовая цепь ≤+6 °C на всём пути.',
          },
          {
            title: 'Декларация соответствия ЕАЭС',
            desc: 'Продукция задекларирована в системе Росаккредитации. Номер декларации — по запросу.',
          },
          {
            title: 'Медицинские книжки персонала',
            desc: '100% персонала имеют действующие медицинские книжки. Шеф-повара — с профильным образованием и опытом от 5 лет.',
          },
          {
            title: 'Договор и чек',
            desc: 'Работаем официально. Договор с фиксированной сметой. Чек — кассовый. Никаких «серых» схем.',
          },
        ].map(item => (
          <div key={item.title} className="rounded-xl border border-line bg-card p-5">
            <h2 className="font-heading text-base font-medium mb-2">{item.title}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <p className="mt-10 text-sm text-muted-foreground text-center">Документы доступны по запросу. Пишите на info@odaeda.ru.</p>
    </div></main>
  );
}
