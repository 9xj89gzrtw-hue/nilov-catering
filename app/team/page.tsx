import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Команда',
  description: 'Команда NiloV Catering: шеф-повар Дмитрий Нилов и 40+ профессионалов ресторанного дела в СПб.',
};

const TEAM = [
  { name: 'Дмитрий Нилов', role: 'Основатель, шеф-повар', bio: '19 лет в ресторанном бизнесе. Работал в топ-ресторанах Петербурга.' },
  { name: 'Елена С.', role: 'Шеф-кондитер', bio: 'Десерты — её страсть. Выпускница Le Cordon Bleu.' },
  { name: 'Алексей К.', role: 'Су-шеф', bio: 'Отвечает за горячий цех. 12 лет в профессии.' },
  { name: 'Мария В.', role: 'Менеджер событий', bio: 'Ведёт свадьбы и корпоративы. 200+ событий в год.' },
];

export default function TeamPage() {
  return (
    <main className="pt-24 pb-20">
      <div className="container-site">
        <h1 className="text-center mb-4">Команда</h1>
        <p className="text-center text-lg text-muted-foreground max-w-xl mx-auto mb-16 text-balance">
          Люди, которые создают ваш праздник. Повара, кондитеры, менеджеры — каждый на своём месте.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((m) => (
            <div key={m.name} className="rounded-xl border border-line bg-card p-6 text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center text-2xl">
                👤
              </div>
              <h2 className="font-heading font-medium text-foreground">{m.name}</h2>
              <p className="text-sm text-gold-text mb-2">{m.role}</p>
              <p className="text-xs text-muted-foreground">{m.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
