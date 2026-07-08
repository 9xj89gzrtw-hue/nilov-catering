import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        <p className="text-8xl font-heading font-bold text-accent/20 mb-2">404</p>
        <h1 className="text-2xl font-heading font-bold mb-3">Страница не найдена</h1>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          Запрашиваемая страница не существует или была перемещена.
        </p>
        <Link href="/">
          <Button>Вернуться на главную</Button>
        </Link>
      </div>
    </div>
  );
}