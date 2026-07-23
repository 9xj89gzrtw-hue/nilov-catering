import type { Metadata } from 'next';
import DeliveryZonesMap from '@/components/blocks/DeliveryZonesMap';

export const metadata: Metadata = {
  title: 'Доставка',
  description: 'Зоны доставки NiloV Catering. Бесплатно в пределах КАД. Честные надбавки за городом.',
};

export default function DeliveryPage() {
  return (
    <main className="pt-24">
      <DeliveryZonesMap />
    </main>
  );
}
