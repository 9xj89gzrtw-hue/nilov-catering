import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  alternates: { canonical: '/why-us' },
  title: 'Почему мы',
  description: 'NiloV Catering — кейтеринг в Петербурге с 2007 года. 3000+ событий. Ресторанное качество по реальной цене.',
};

export default function WhyUsPage() {
  return (
    <main className="pt-24 pb-20">
      <div className="container-site max-w-3xl">
        <h1 className="mb-6">Почему NiloV Catering</h1>

        <div className="prose prose-stone max-w-none space-y-6 text-muted-foreground">
          <p className="text-lg text-foreground">
            Мы начали в 2007 году с простой идеи: <strong>ресторанное качество не обязано стоить как ресторан</strong>.
          </p>
          <p>
            Дмитрий Нилов, основатель и шеф-повар, собрал команду из лучших ресторанов Петербурга. 
            Мы готовим там, где нас не ждали: на крышах, в парках, на частных виллах, в офисах.
          </p>
          <p>
            Сегодня мы — команда из 40+ профессионалов. Провели более 3 000 событий. 
            От семейного ужина на 10 персон до корпоратива на 1500 гостей (через сеть партнёрских кухонь).
          </p>

          <h2 className="font-heading text-2xl text-foreground mt-12">Наши принципы</h2>
          <ul className="space-y-3">
            <li><strong className="text-foreground">Честные цены.</strong> Вы видите итоговую сумму до оформления заявки — без скрытых платежей.</li>
            <li><strong className="text-foreground">Прозрачность.</strong> 14 аллергенов ТР ТС 022/2011. Состав каждого блюда. Фото реальных событий.</li>
            <li><strong className="text-foreground">Персональный менеджер.</strong> Один человек ведёт ваше событие от заявки до фотоотчёта.</li>
            <li><strong className="text-foreground">Гарантия перезвона.</strong> 15 минут в рабочее время. Мы не заставляем ждать.</li>
          </ul>
        </div>

        <div className="mt-12">
          <Link href="/plan" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
            Спланировать событие
          </Link>
        </div>
      </div>
    </main>
  );
}
