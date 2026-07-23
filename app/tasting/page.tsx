import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/data';

export const metadata: Metadata = {
  alternates: { canonical: '/tasting' },
  title: 'Дегустация меню — NiloV Catering СПб',
  description: 'Дегустация перед событием: бесплатно для событий от 30 гостей, от 1 гостя для медицинских диет. До 6 блюд, аперитив, комплимент от шефа.',
};

export default function TastingPage() {
  return (
    <main className="pt-24 pb-20">
      <div className="container-site max-w-2xl">
        <nav aria-label="Хлебные крошки" className="text-sm text-muted-foreground mb-4">
          <Link href="/" className="hover:text-foreground">Главная</Link>
          {' / '}
          <span className="text-foreground">Дегустация</span>
        </nav>

        <h1 className="font-heading text-3xl md:text-4xl font-medium mb-3">Дегустация</h1>
        <p className="text-muted-foreground mb-8 text-lg">
          Пробуем меню вместе перед событием. Вы выбираете блюда, мы готовим — вы дегустируете и утверждаете.
          Для событий от 30 гостей — бесплатно. Для медицинских диет (целиакия, анафилаксия) — обязательно от 1 гостя.
        </p>

        {/* Free/paid block */}
        <div className="mb-8 p-5 rounded-xl border-2 border-gold-tint bg-gold-tint/10">
          <h2 className="font-heading text-lg font-medium mb-3">💸 Стоимость дегустации</h2>
          <ul className="text-sm space-y-2">
            <li>✓ <strong>Бесплатно</strong> — для событий от 30 гостей (до 6 блюд из вашего тарифа)</li>
            <li>✓ <strong>Бесплатно</strong> — для медицинских диет (целиакия, анафилаксия) от 1 гостя</li>
            <li>✓ <strong>1 500 ₽</strong> — для событий до 30 гостей (3 блюда на выбор)</li>
            <li>✓ <strong>3 000 ₽</strong> — расширенная дегустация (6 блюд + вино pairing)</li>
            <li>✓ <strong>От 5 000 ₽</strong> — выезд к вам (выездные расходы)</li>
          </ul>
          <p className="text-xs text-muted-foreground mt-3">
            При бронировании события — стоимость дегустации вычитается из итогового счёта (для платных дегустаций).
          </p>
        </div>

        {/* Что входит */}
        <div className="grid gap-4 mb-8">
          {[
            {
              title: '🍽️ Что входит',
              text: 'До 6 блюд на выбор из вашего тарифа. Аперитив (игристое/морс) и комплимент от шефа. Длительность — до 1.5 часов. Возможность адаптации блюд под диету (веган/БГ/халяль).',
            },
            {
              title: '📍 Где проходит',
              text: 'У нас на производстве (м. Василеостровская, В.О., 20-я линия, 11) или с выездом к вам (от 5 000 ₽ за выезд по СПб и ЛО).',
            },
            {
              title: '🕐 Когда',
              text: 'Будни 10:00–18:00, суббота по договорённости. Запись минимум за 5 дней. Для срочных — по запросу.',
            },
            {
              title: '🥗 Диеты и аллергены',
              text: 'Для целейакии, анафилаксии, халяль, веган — дегустация по отдельному протоколу. Можно попробовать безглютеновый торт, халяль-шашлык, веган-десерт. Укажите диеты в форме ниже.',
            },
          ].map((item) => (
            <div key={item.title} className="rounded-lg border border-line bg-card p-4">
              <h2 className="font-heading text-base font-medium mb-1">{item.title}</h2>
              <p className="text-sm text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Tasting form — with diet field */}
        <div className="rounded-xl border border-line bg-card p-6">
          <h2 className="font-heading text-xl font-medium mb-4">Записаться на дегустацию</h2>
          <form className="space-y-4" action="/api/quote" method="POST">
            <input type="hidden" name="format" value="Дегустация" />

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">Имя *</label>
                <input id="name" name="name" required className="w-full rounded-lg border border-line bg-background px-4 py-3 text-base focus:ring-2 focus:ring-ring focus:border-gold-text outline-none transition-shadow" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">Телефон *</label>
                <input id="phone" name="phone" type="tel" required placeholder="+7 (___) ___-__-__" className="w-full rounded-lg border border-line bg-background px-4 py-3 text-base focus:ring-2 focus:ring-ring focus:border-gold-text outline-none transition-shadow" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-foreground mb-1">Желаемая дата</label>
                <input id="date" name="date" type="date" className="w-full rounded-lg border border-line bg-background px-4 py-3 text-base focus:ring-2 focus:ring-ring focus:border-gold-text outline-none transition-shadow" />
              </div>
              <div>
                <label htmlFor="guests" className="block text-sm font-medium text-foreground mb-1">Кол-во гостей на дегустацию</label>
                <input id="guests" name="guests" type="number" min="1" max="6" defaultValue="2" className="w-full rounded-lg border border-line bg-background px-4 py-3 text-base focus:ring-2 focus:ring-ring focus:border-gold-text outline-none transition-shadow" />
              </div>
            </div>

            {/* Diets — multi-select */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">🥗 Диеты гостей на дегустации</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                {[
                  { value: 'vegan', label: '🌱 Веган' },
                  { value: 'gluten-free', label: '🌾 Без глютена' },
                  { value: 'halal', label: '🕌 Халяль' },
                  { value: 'nut-free', label: '🥜 Без орехов' },
                  { value: 'dairy-free', label: '🥛 Без молока' },
                  { value: 'allergy-other', label: '⚠️ Другая аллергия' },
                ].map((d) => (
                  <label key={d.value} className="flex items-center gap-2 px-3 py-2 rounded-lg border border-line bg-background cursor-pointer hover:border-gold-text transition-colors">
                    <input type="checkbox" name="diets" value={d.value} />
                    <span>{d.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Format of event */}
            <div>
              <label htmlFor="eventFormat" className="block text-sm font-medium text-foreground mb-1">Формат планируемого события</label>
              <select id="eventFormat" name="eventFormat" className="w-full rounded-lg border border-line bg-background px-4 py-3 text-base focus:ring-2 focus:ring-ring focus:border-gold-text outline-none transition-shadow">
                <option value="">Не определились</option>
                <option value="Свадьба">Свадьба</option>
                <option value="Корпоратив">Корпоратив</option>
                <option value="День рождения / Юбилей">День рождения / Юбилей</option>
                <option value="Выпускной">Выпускной</option>
                <option value="Конференция / Кофе-брейк">Конференция / Кофе-брейк</option>
                <option value="Другое">Другое</option>
              </select>
            </div>

            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-foreground mb-1">Комментарий</label>
              <textarea
                id="comment"
                name="comment"
                rows={3}
                placeholder="Какие блюда хотите попробовать? Особые пожелания? Аллергии?"
                className="w-full rounded-lg border border-line bg-background px-4 py-3 text-base focus:ring-2 focus:ring-ring focus:border-gold-text outline-none transition-shadow resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-primary py-3.5 text-base font-semibold text-primary-foreground hover:bg-primary/90 active:scale-[0.98] transition-all"
            >
              Записаться на дегустацию
            </button>
            <p className="text-xs text-muted-foreground text-center">
              Менеджер перезвонит ≤15 минут для подтверждения. Нажимая кнопку, вы соглашаетесь с{' '}
              <Link href="/privacy" className="underline hover:text-foreground">политикой конфиденциальности</Link>.
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
