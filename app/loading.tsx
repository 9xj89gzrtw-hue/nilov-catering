export default function LoadingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin mx-auto" />
        <p className="mt-4 text-xs text-cream-muted uppercase tracking-wider">Загрузка...</p>
      </div>
    </div>
  );
}