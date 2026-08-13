"use client";

import { useEffect, useState } from "react";

export function NewsletterBlock() {
  const [hidden, setHidden] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    const main = document.querySelector("main");
    if (main && main.getAttribute("data-hide-newsletter") === "true") {
      setHidden(true);
    }
  }, []);

  if (hidden) return null;

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched(true);
    const value = e.target.value;
    if (value && !validateEmail(value)) {
      setStatus("error");
      setMessage("Введите корректный email (пример: name@mail.ru)");
    } else {
      setStatus("idle");
      setMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email") as string;
    setTouched(true);
    if (!email || !validateEmail(email)) {
      setStatus("error");
      setMessage("Введите корректный email (пример: name@mail.ru)");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        setMessage(json.message || "Подписка оформлена!");
        (form as HTMLFormElement).reset();
        setTouched(false);
      } else {
        setStatus("error");
        setMessage(json.message || "Ошибка. Попробуйте позже.");
      }
    } catch {
      setStatus("error");
      setMessage("Сеть недоступна. Попробуйте позже.");
    }
  };

  return (
    <div className="border-line bg-card mb-12 rounded-xl border p-6 text-center">
      <h3 className="font-heading mb-2 text-lg font-medium">Будьте в курсе</h3>
      <p className="text-muted-foreground mb-4 text-sm">
        Сезонные предложения и новые меню — раз в месяц, без спама.
      </p>
      <form className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
        <div className="flex-1">
          <label
            htmlFor="newsletter-email"
            className="text-foreground mb-1 block text-sm font-medium"
          >
            Email для подписки
          </label>
          <input
            id="newsletter-email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Ваш email"
            required
            aria-label="Email для подписки на рассылку кейтеринга"
            aria-invalid={status === "error" && touched ? "true" : "false"}
            onBlur={handleEmailBlur}
            className={`bg-background inline-flex min-h-[44px] w-full items-center rounded-lg border px-4 py-2.5 text-sm ${status === "error" && touched ? "border-red-500 focus:ring-red-500" : "border-line focus:ring-primary"}`}
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex min-h-[44px] items-center self-end rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors disabled:opacity-50"
        >
          {status === "loading" ? "Отправляем..." : "Подписаться"}
        </button>
      </form>
      {status === "success" && (
        <p className="mt-3 text-sm font-medium text-emerald-700" role="status" aria-live="polite">
          {message}
        </p>
      )}
      {status === "error" && touched && (
        <p className="mt-3 text-sm font-medium text-red-600" role="alert" aria-live="assertive">
          {message}
        </p>
      )}
      <p className="text-muted-foreground mt-2 text-sm">
        Нажимая «Подписаться», вы соглашаетесь с политикой конфиденциальности (152-ФЗ).
      </p>
    </div>
  );
}
