export default function OfferPage() {
  return (
    <main className="pt-24 pb-20">
      <div className="container-site max-w-xl text-center">
        <h1 className="mb-4">Ваше предложение готово</h1>
        <p className="text-muted-foreground mb-6">Коммерческое предложение сформировано на основе выбранных параметров.</p>
        <p className="text-sm text-muted-foreground mb-8">Страница заглушка — PDF-генерация на стороне сервера.</p>
        <a href="/plan/calculator" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
          Вернуться к калькулятору
        </a>
      </div>
    </main>
  );
}