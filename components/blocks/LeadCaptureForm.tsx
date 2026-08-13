"use client";

import { useState } from "react";
import { Send, Check, Phone, ChevronDown, ChevronUp } from "lucide-react";
import { SITE } from "@/lib/data";

/**
 * LeadCaptureForm v2 — УПРОЩЁННАЯ форма для максимальной конверсии
 *
 * Cycle 3 fix: Упрощение с 5 полей до 2 обязательных + опциональные
 * - Обязательные: Имя, Телефон (максимум конверсии)
 * - Опциональные: Тип события, Дата (под expand)
 * - GDPR consent в одну строку
 * - Trust badges над формой
 */

export default function LeadCaptureForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [eventType, setEventType] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const validatePhone = (p: string): boolean => {
    return p.replace(/\D/g, "").length >= 10;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setStatus("error");
      setMessage("Пожалуйста, укажите имя");
      return;
    }

    if (!validatePhone(phone)) {
      setStatus("error");
      setMessage("Проверьте телефон");
      return;
    }

    if (!consent) {
      setStatus("error");
      setMessage("Дайте согласие на обработку данных");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          subject: `Заявка · ${eventType || "Главная"}`,
          format: "lead-form-v2",
          source: "homepage",
          eventType,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        setMessage("✓ Заявка принята! Перезвоним за 15 минут.");
        setName("");
        setPhone("");
        setEventType("");
        setExpanded(false);
      } else {
        setStatus("error");
        setMessage(json.message || "Ошибка. Позвоните нам.");
      }
    } catch {
      setStatus("error");
      setMessage("Нет связи. Позвоните +7 (812) 919-59-11");
    }
  };

  if (status === "success") {
    return (
      <div
        className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center"
        role="status"
      >
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <Check className="h-8 w-8 text-emerald-600" />
        </div>
        <h3 className="font-heading text-foreground mb-2 text-xl">Заявка отправлена!</h3>
        <p className="text-mutedforeground mb-4">{message}</p>
        <button
          onClick={() => setStatus("idle")}
          className="text-gold-text text-sm hover:underline"
        >
          Отправить ещё
        </button>
      </div>
    );
  }

  return (
    <div className="bg-card border-line overflow-hidden rounded-2xl border p-5 shadow-lg md:p-6">
      {/* Trust bar над формой */}
      <div className="border-line/50 mb-5 flex items-center justify-center gap-4 border-b pb-5">
        <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
          <span className="text-gold-text font-semibold">19 лет</span>
          <span>опыта</span>
        </div>
        <span className="bg-line h-3 w-px" aria-hidden="true" />
        <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
          <span className="text-gold-text font-semibold">3000+</span>
          <span>событий</span>
        </div>
        <span className="bg-line h-3 w-px" aria-hidden="true" />
        <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
          <span className="text-gold-text font-semibold">15 мин</span>
          <span>ответ</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Два основных поля — рядом на desktop */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {/* Имя */}
          <div>
            <label htmlFor="lf-name" className="text-foreground mb-1.5 block text-sm font-medium">
              Ваше имя <span className="text-red-400">*</span>
            </label>
            <input
              id="lf-name"
              type="text"
              required
              autoComplete="name"
              placeholder="Как к вам?"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-line bg-background focus:border-gold-text focus:ring-gold-text/20 min-h-[48px] w-full rounded-xl border px-4 py-3 text-base transition-colors focus:ring-2 focus:outline-none"
            />
          </div>

          {/* Телефон */}
          <div>
            <label
              htmlFor="lf-phone"
              className="text-foreground mb-1.5 block flex items-center gap-1 text-sm font-medium"
            >
              <Phone className="text-gold-text h-3.5 w-3.5" aria-hidden="true" />
              Телефон <span className="text-red-400">*</span>
            </label>
            <input
              id="lf-phone"
              type="tel"
              required
              autoComplete="tel"
              placeholder="+7 (___) ___-__-__"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border-line bg-background focus:border-gold-text focus:ring-gold-text/20 min-h-[48px] w-full rounded-xl border px-4 py-3 text-base transition-colors focus:ring-2 focus:outline-none"
            />
          </div>
        </div>

        {/* Expandable optional fields */}
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="text-muted-foreground hover:text-foreground mx-auto flex min-h-[36px] items-center gap-2 text-sm no-underline transition-colors"
          aria-expanded={expanded}
        >
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          {expanded ? "Свернуть детали" : "Добавить детали (необязательно)"}
        </button>

        {expanded && (
          <div className="border-line/50 animate-in slide-in-from-top-2 space-y-3 border-t pt-2 duration-200">
            <div>
              <label
                htmlFor="lf-event"
                className="text-foreground mb-1.5 block text-sm font-medium"
              >
                Тип мероприятия
              </label>
              <select
                id="lf-event"
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="border-line bg-background focus:border-gold-text min-h-[48px] w-full rounded-xl border px-4 py-3 text-base transition-colors focus:outline-none"
              >
                <option value="">Не выбрано</option>
                <option>Свадьба</option>
                <option>Корпоратив</option>
                <option>День рождения</option>
                <option>Детский праздник</option>
                <option>Частный ужин</option>
                <option>Другое</option>
              </select>
            </div>

            <div className="flex gap-3">
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl border-2 border-[#25D366] px-4 py-3 text-sm font-medium text-[#25D366] no-underline transition-colors hover:bg-[#25D366] hover:text-white"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.6 6.31A7.85 7.85 0 0 0 12.05 4 7.94 7.94 0 0 0 4.1 11.94a7.84 7.84 0 0 0 1.07 3.97L4 20l4.2-1.1a7.93 7.93 0 0 0 3.85 1h.01a7.94 7.94 0 0 0 7.94-7.94 7.85 7.85 0 0 0-2.4-5.65Z" />
                </svg>
                WhatsApp
              </a>
              <a
                href={`tel:${SITE.phoneTel}`}
                className="border-line text-foreground hover:border-gold-text hover:text-gold-text flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl border text-sm font-medium no-underline transition-colors"
              >
                Позвонить
              </a>
            </div>
          </div>
        )}

        {/* Error */}
        {status === "error" && message && (
          <div
            className="flex items-start gap-2 rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-700"
            role="alert"
          >
            <span aria-hidden="true">⚠️</span>
            <span>{message}</span>
          </div>
        )}

        {/* Consent — компактная версия */}
        <label className="bg-secondary/40 group flex cursor-pointer items-start gap-2.5 rounded-xl p-3">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="border-border text-gold-text focus:ring-gold-text/20 mt-0.5 h-4 w-4 rounded"
            required
          />
          <span className="text-muted-foreground group-hover:text-foreground text-xs leading-relaxed transition-colors">
            Согласен на обработку{" "}
            <a href="/privacy" target="_blank" className="text-gold-text hover:underline">
              персональных данных
            </a>
          </span>
        </label>

        {/* Submit */}
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-primary text-primary-foreground hover:bg-primary/90 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-base font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "loading" ? (
            <>
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Отправляем...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden="true" />
              Рассчитать стоимость меню →
            </>
          )}
        </button>

        {/* Footer note */}
        <p className="text-muted-foreground text-center text-xs">
          Перезвоним за 15 минут · Работаем 9–21 · Без спама
        </p>
      </form>
    </div>
  );
}
