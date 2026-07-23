import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Доступность (WCAG)',
  description: 'Заявление о доступности сайта NiloV Catering. Стремимся к WCAG 2.2 AA.',
};

export default function AccessibilityPage() {
  return (
    <main className="pt-24 pb-20"><div className="container-site max-w-2xl">
      <h1 className="mb-8">Заявление о доступности</h1>

      <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
        <p>NiloV Catering стремится обеспечить доступность сайта для всех пользователей, включая людей с ограниченными возможностями. Мы следуем стандарту WCAG 2.2 уровня AA.</p>

        <div className="space-y-3">
          <h3 className="font-medium text-foreground">Что мы сделали:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Все изображения имеют alt-текст</li>
            <li>Навигация возможна с клавиатуры (Tab, Enter, Escape)</li>
            <li>Focus-visible кольцо на всех интерактивных элементах (4.54:1 AA)</li>
            <li>Контраст текста ≥5.7:1 (AA) на основном фоне</li>
            <li>Ссылка «Перейти к содержимому» (SkipLink) в начале страницы</li>
            <li>Уважение prefers-reduced-motion — анимации отключаются</li>
            <li>Переключатель размера текста (100% / 125% / 150%)</li>
            <li>aria-label на всех навигационных элементах</li>
            <li>semantic HTML (nav, main, section, footer)</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="font-medium text-foreground">Известные ограничения:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Видео-контент — субтитры в процессе внедрения</li>
            <li>Калькулятор — не все состояния анонсируются скринридером</li>
            <li>Галерея — masonry-сетка может быть сложна для навигации</li>
          </ul>
        </div>

        <p>Если вы столкнулись с проблемой доступности, напишите нам: <a href="mailto:info@odaeda.ru" className="text-gold-text underline">info@odaeda.ru</a>. Мы ответим в течение 2 рабочих дней.</p>

        <p className="text-xs pt-4 border-t border-line">Последнее обновление: июль 2026.</p>
      </div>
    </div></main>
  );
}
