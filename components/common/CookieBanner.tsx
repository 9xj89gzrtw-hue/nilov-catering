"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem("cookie-consent", "all");
    setVisible(false);
  };

  const acceptNecessary = () => {
    localStorage.setItem("cookie-consent", "necessary");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-card border-t border-border shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-4">
        <p className="text-sm text-muted-foreground flex-1">
          Мы используем файлы cookie для улучшения работы сайта и анализа трафика в соответствии с&nbsp;
          <span className="font-medium text-foreground">ФЗ-152 &laquo;О персональных данных&raquo;</span>.
          Продолжая пользоваться сайтом, вы соглашаетесь с политикой cookie.
        </p>
        <div className="flex gap-2 shrink-0">
          <Button variant="outline" size="sm" onClick={acceptNecessary}>
            Только необходимые
          </Button>
          <Button size="sm" onClick={acceptAll}>
            Принять все
          </Button>
        </div>
      </div>
    </div>
  );
}