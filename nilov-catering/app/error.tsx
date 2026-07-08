"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-destructive" />
        </div>
        <h1 className="text-2xl font-heading font-bold mb-3">Что-то пошло не так</h1>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          Произошла непредвиденная ошибка при загрузке страницы.
          Попробуйте обновить или вернитесь на главную.
        </p>
        <div className="flex gap-3 justify-center">
          <Button onClick={reset} variant="default">
            Попробовать снова
          </Button>
          <a href="/">
            <Button variant="outline">На главную</Button>
          </a>
        </div>
      </div>
    </div>
  );
}