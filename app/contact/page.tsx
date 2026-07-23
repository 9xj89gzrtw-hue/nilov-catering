import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Контакты',
  description: 'Свяжитесь с NiloV Catering: телефон, WhatsApp, Telegram. Санкт-Петербург.',
};

export default function ContactPage() {
  return (
    <main className="pt-24 pb-20">
      <div className="container-site max-w-2xl">
              <h1 className="mb-2">Контакты</h1>
              <p className="text-muted-foreground mb-10">Позвоните или напишите — подберём решение за 15 минут. Работаем ежедневно с 9:00 до 21:00.</p>

              {/* Contact cards */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { label: 'Телефон', value: SITE.phone, href: `tel:${SITE.phone}`, icon: '📞' },
                  { label: 'WhatsApp', value: 'Написать', href: `https://wa.me/${SITE.phone.replace(/[\s\(\)\-\+]/g,'')}`, icon: '💬' },
                  { label: 'Telegram', value: '@nilovcatering', href: 'https://t.me/nilovcatering', icon: '✈️' },
                  { label: 'Email', value: SITE.email, href: `mailto:${SITE.email}`, icon: '✉️' },
                ].map((c) => (
                  <a key={c.label} href={c.href} className="rounded-xl border border-line bg-card p-4 text-center hover:border-gold-text transition-colors">
                    <span className="text-2xl block mb-1">{c.icon}</span>
                    <p className="text-xs text-muted-foreground">{c.label}</p>
                    <p className="text-sm font-semibold text-foreground">{c.value}</p>
                  </a>
                ))}
              </div>

              {/* Address */}
              <div className="rounded-xl border border-line bg-card p-4 mb-6 flex items-center gap-3">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="text-sm font-medium">Санкт-Петербург</p>
                  <p className="text-xs text-muted-foreground">Доставка в пределах КАД — бесплатно. За КАД — от 3000 ₽.</p>
                </div>
              </div>
              <div className="rounded-xl border border-line bg-card p-4 mb-10 flex items-center gap-3">
                <span className="text-2xl">🕐</span>
                <div>
                  <p className="text-sm font-medium">Ежедневно 9:00–21:00</p>
                  <p className="text-xs text-muted-foreground">Заявки через сайт принимаем круглосуточно</p>
                </div>
              </div>

        {/* Quick form */}
        <div className="rounded-xl border border-line bg-card p-6">
          <h2 className="font-heading text-xl font-medium mb-4">Быстрая заявка</h2>
          <form className="space-y-4" action="/api/contact" method="POST">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Имя *</label>
              <input type="text" name="name" required className="w-full rounded-lg border border-line bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-ring focus:border-gold-text outline-none transition-shadow" />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Телефон *</label>
              <input type="tel" name="phone" required placeholder="+7" className="w-full rounded-lg border border-line bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-ring focus:border-gold-text outline-none transition-shadow" />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Дата события</label>
              <input type="date" name="date" className="w-full rounded-lg border border-line bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-ring focus:border-gold-text outline-none transition-shadow" />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Комментарий</label>
              <textarea name="comment" rows={3} placeholder="Тип события, количество гостей, пожелания..." className="w-full rounded-lg border border-line bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-ring focus:border-gold-text outline-none transition-shadow resize-none" />
            </div>
            <button type="submit" className="w-full rounded-lg bg-primary py-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 active:scale-[0.98] transition-all">
              Отправить заявку
            </button>
            <p className="text-[10px] text-muted-foreground text-center">Менеджер перезвонит ≤15 минут. Нажимая кнопку, вы соглашаетесь с <Link href="/privacy" className="underline">политикой</Link>.</p>
          </form>
        </div>
      </div>
    </main>
  );
}
