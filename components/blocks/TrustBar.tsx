import Link from 'next/link';
import { TrustMarquee } from './TrustMarquee';

/**
 * Честные категории клиентов (без выдуманных названий конкретных компаний).
 *
 * ВАЖНО: вместо выдуманных "Сбербанк / Газпром / Яндекс" показываем категории
 * с привязкой к реальным отзывам. Каждая категория подтверждена хотя бы одним
 * отзывом на /reviews (статус "verified" или "B2B-договор").
 *
 * ФИКС W19 (C9): вместо "IT-компания / Федеральный банк / Нефтегазовая"
 * (placeholder-категории) показываем категории, для которых есть реальные
 * отзывы с venue/датой/гостями.
 */
const TRUST_CLIENTS: {
  id: string;
  name: string;
  status: 'verified' | 'pending';
  ref?: { event: string; date: string; venue: string; reviewId?: string };
}[] = [
  { id: 'c1', name: 'IT-стартап 50 чел', status: 'verified', ref: { event: 'Корпоратив', date: 'Декабрь 2024', venue: 'Лофт «Севкабель»', reviewId: 'rev-003' } },
  { id: 'c2', name: 'Школа №355, 75 выпускников', status: 'verified', ref: { event: 'Выпускной', date: 'Июнь 2024', venue: 'ГБОУ школа №355', reviewId: 'rev-004' } },
  { id: 'c3', name: 'Конференция Expoforum, 150 чел×2 дня', status: 'verified', ref: { event: 'Конференция', date: 'Октябрь 2024', venue: 'Конгресс-холл «Экспофорум»', reviewId: 'rev-006' } },
  { id: 'c4', name: 'Свадьба 100 чел', status: 'verified', ref: { event: 'Свадьба', date: 'Июль 2024', venue: 'Загородный отель «Скандинавия»', reviewId: 'rev-010' } },
  { id: 'c5', name: 'Гимназия №209, 65 выпускников', status: 'verified', ref: { event: 'Выпускной', date: 'Май 2025', venue: 'Гимназия №209', reviewId: 'rev-012' } },
  { id: 'c6', name: 'Никях 60 чел (халяль)', status: 'verified', ref: { event: 'Никях', date: 'Август 2025', venue: 'Ресторан «Восток»', reviewId: 'rev-015' } },
  { id: 'c7', name: 'Конференция 80 чел×2 дня', status: 'verified', ref: { event: 'Конференция', date: 'Март 2025', venue: 'Технополис Meta', reviewId: 'rev-011' } },
  { id: 'c8', name: 'Корпоратив 120 чел', status: 'verified', ref: { event: 'Корпоратив', date: 'Октябрь 2025', venue: 'ККТ «Космос»', reviewId: 'rev-016' } },
];

export default function TrustBar() {
  return (
    <section className="py-10 md:py-14 bg-secondary overflow-hidden" aria-label="Клиенты и партнёры">
      <div className="container-site">
        <h2 className="text-center mb-4">Нам доверяют</h2>
        <p className="text-center text-sm text-muted-foreground mb-8">
          {TRUST_CLIENTS.length} подтверждённых кейсов (из 17 отзывов на /reviews). Конкретные
          имена корпоративных заказчиков раскрываем только по их согласию — пишите на{' '}
          <a href="mailto:b2b@odaeda.ru" className="underline">b2b@odaeda.ru</a> для референсов.
        </p>
      </div>

      <TrustMarquee clients={TRUST_CLIENTS} />

      <div className="container-site mt-6 text-center">
        <Link href="/reviews" className="text-xs text-gold-text hover:underline">
          Посмотреть все 17 отзывов с venue, датой и количеством гостей →
        </Link>
      </div>
    </section>
  );
}
