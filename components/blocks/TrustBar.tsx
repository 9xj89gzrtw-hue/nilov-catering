import { TrustMarquee } from './TrustMarquee';

// Настоящие categories клиентов
const TRUST_CLIENTS: { id: string; name: string; status: 'verified' | 'pending'; disclaimer?: string }[] = [
  { id: 'c1', name: 'IT-компания', status: 'verified' },
  { id: 'c2', name: 'Федеральный банк', status: 'verified' },
  { id: 'c3', name: 'Нефтегазовая компания', status: 'verified' },
  { id: 'c4', name: 'Телеком-оператор', status: 'verified' },
  { id: 'c5', name: 'Гос. учреждение', status: 'verified' },
  { id: 'c6', name: 'Медиа-холдинг', status: 'verified' },
];

export default function TrustBar() {
  return (
    <section className="py-10 md:py-14 bg-secondary overflow-hidden" aria-label="Клиенты и партнёры">
      <div className="container-site">
        <h2 className="text-center mb-4">Нам доверяют</h2>
        <p className="text-center text-sm text-muted-foreground mb-8">
          Более 3 000 мероприятий для крупных компаний и частных клиентов
        </p>
      </div>

      <TrustMarquee clients={TRUST_CLIENTS} />

      <div className="container-site mt-4">
        <p className="text-xs text-muted-foreground text-center leading-relaxed">
          Конкретные имена раскрываются при заключении договора
        </p>
      </div>
    </section>
  );
}