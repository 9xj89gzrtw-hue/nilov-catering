import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Бар и mixology',
  description: 'Бармен-шоу, коктейльная карта, пирамида из бокалов — барное сопровождение от NiloV Catering.',
};

const SERVICES = [
  { t: 'Welcome-бар', p: 'от 1 200 ₽/гость', i: 'Аперитив, игристое, лёгкие коктейли. 2 бармена на 50 гостей.' },
  { t: 'Коктейльная карта', p: 'от 1 800 ₽/гость', i: '6 авторских коктейлей + 4 классических. Бармен-шоу с элементами флейринга.' },
  { t: 'Винное сопровождение', p: 'от 2 500 ₽/бутылку', i: 'Сомелье подбирает вино к каждому блюду. Карта от 6 позиций.' },
  { t: 'Пирамида из бокалов', p: '7 000 ₽', i: 'Эффектная подача игристого. 60 бокалов, сборка на месте, фотогенично.' },
  { t: 'Безалкогольный бар', p: 'от 700 ₽/гость', i: 'Смузи, лимонады, мохито 0%, свежевыжатые соки. Для ЗОЖ-мероприятий.' },
  { t: 'Кофе-бар', p: 'от 450 ₽/гость', i: 'Бариста с профессиональной кофемашиной. Капучино, латте, альтернатива — воронка, аэропресс.' },
];

export default function BarPage() {
  return (
    <main className="pt-24 pb-20"><div className="container-site max-w-2xl">
      <h1 className="mb-2">Бар и mixology</h1>
      <p className="text-muted-foreground mb-8">Бармен-шоу, коктейльная карта, винное сопровождение — добавим стиля вашему событию. Цены ориентировочные.</p>

      {SERVICES.map((s) => (
        <div key={s.t} className="mb-4 p-5 rounded-xl border border-line bg-card">
          <div className="flex items-center justify-between mb-2"><h2 className="font-heading text-lg font-medium">{s.t}</h2><span className="text-sm font-semibold text-gold-text">{s.p}</span></div>
          <p className="text-sm text-muted-foreground">{s.i}</p>
        </div>
      ))}

      <Link href="/plan/calculator" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">Добавить бар в заказ</Link>

        {/* PDF + CTA */}
        <div className="mt-6 space-y-4 border-t border-line pt-6">
          <a href="/menu/bar/pdf" download className="inline-flex items-center gap-2 rounded-lg border border-line bg-card px-5 py-3 text-sm font-medium text-foreground hover:border-gold-text hover:text-gold-text transition-all active:scale-[0.98]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Скачать барную карту (PDF)
          </a>
          <div className="p-5 rounded-xl border border-dashed border-line bg-card/50">
            <p className="text-sm font-medium mb-1">Не нашли своё? Составим индивидуально</p>
            <p className="text-xs text-muted-foreground mb-3">Шеф-бармен соберёт коктейльную карту под ваш бюджет и формат.</p>
            <Link href="/plan/constructor" className="text-sm text-gold-text font-semibold hover:underline">Составить барную карту с шефом →</Link>
          </div>
        </div>
    </div></main>
  );
}