"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SITE } from "@/lib/data";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import RelatedPages from "@/components/common/RelatedPages";
import SmartCTA from "@/components/common/SmartCTA";

export default function ContactPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showB2B, setShowB2B] = useState(false);

  return (
    <main className="pt-24 pb-20" id="main">
      <div className="container-site max-w-2xl">
        <Breadcrumbs />

        <h1 className="font-heading mb-2 text-3xl font-medium md:text-4xl">Контакты</h1>
        <p className="text-muted-foreground mb-8">
          Заполните форму — перезвоним за 15 минут (9:00–21:00). Без спама.
        </p>

        {/* Trust bar */}
        <p className="text-muted-foreground mb-8 text-sm">
          19 лет на кухне СПб · 3 000+ событий · 4.8/5 по 27 отзывам
        </p>

        <h2 className="font-heading mb-4 text-xl font-medium">Заявка на кейтеринг</h2>
        <form
          method="POST"
          action="/api/quote"
          onSubmit={async (e) => {
            e.preventDefault();
            // Validate phone before submit
            const form = e.currentTarget;
            const phoneInput = form.querySelector("#phone") as HTMLInputElement;
            const phone = phoneInput.value.replace(/[\s\-\(\)]/g, "");
            if (phone.replace(/\D/g, "").length < 10) {
              setError(
                "Введите корректный номер телефона — минимум 10 цифр. Например: +7 (812) 919-59-11"
              );
              phoneInput.focus();
              return;
            }
            if (!form.checkValidity()) {
              form.reportValidity();
              return;
            }
            setSubmitting(true);
            setError("");
            const formData = new FormData(form);
            try {
              const res = await fetch("/api/quote", {
                method: "POST",
                body: formData,
                headers: { Accept: "application/json" },
              });
              const json = await res.json();
              if (json.success) {
                router.push(`/thank-you?orderId=${json.orderId || ""}`);
              } else {
                setError(json.message || "Ошибка. Позвоните " + SITE.phone);
                setSubmitting(false);
              }
            } catch {
              setError("Сеть недоступна. Позвоните " + SITE.phone + " или WhatsApp.");
              setSubmitting(false);
            }
          }}
          className="space-y-5"
        >
          <input type="hidden" name="source" value="contact" />

          {/* Honeypot */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          {/* 1. Имя — required */}
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
              Ваше имя *
            </label>
            <input
              id="name"
              type="text"
              name="name"
              required
              autoComplete="name"
              placeholder="Как к вам обращаться?"
              aria-invalid={error ? "true" : "false"}
              onInvalid={(e) => {
                e.preventDefault();
                (e.target as HTMLInputElement).setCustomValidity("Пожалуйста, укажите ваше имя");
              }}
              onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
              className="border-line bg-background focus:border-gold-text focus:ring-gold-text/20 w-full rounded-xl border px-4 py-3.5 text-base focus:ring-2 focus:outline-none aria-[invalid=true]:border-red-500"
            />
          </div>

          {/* 2. Телефон — required */}
          <div>
            <label htmlFor="phone" className="mb-1.5 block text-sm font-medium">
              Телефон *
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              required
              pattern="[\d\s\+\-\(\)]{10,}"
              autoComplete="tel"
              inputMode="tel"
              placeholder="+7 (___) ___-__-__"
              onInvalid={(e) => {
                e.preventDefault();
                (e.target as HTMLInputElement).setCustomValidity("");
                if (!(e.target as HTMLInputElement).value) {
                  (e.target as HTMLInputElement).setCustomValidity("Введите номер телефона");
                } else if ((e.target as HTMLInputElement).value.length < 10) {
                  (e.target as HTMLInputElement).setCustomValidity(
                    "Слишком короткий номер — минимум 10 цифр"
                  );
                }
              }}
              onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
              className="border-line bg-background focus:border-gold-text focus:ring-gold-text/20 w-full rounded-xl border px-4 py-3.5 text-base focus:ring-2 focus:outline-none"
              aria-describedby="phone-hint"
            />
            <p id="phone-hint" className="text-muted-foreground mt-1 text-xs">
              Минимум 10 цифр. Например: +7 (812) 919-59-11
            </p>
          </div>

          {/* 3. Комментарий — required */}
          <div>
            <label htmlFor="comment" className="mb-1.5 block text-sm font-medium">
              Что вам нужно? *
            </label>
            <textarea
              id="comment"
              name="comment"
              required
              rows={3}
              placeholder="Напр. Свадьба на 50 человек, 15 августа, нужно меню и торт"
              className="border-line bg-background focus:border-gold-text focus:ring-gold-text/20 w-full resize-none rounded-xl border px-4 py-3.5 text-base focus:ring-2 focus:outline-none"
            />
          </div>

          {/* 4. Email — optional */}
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
              Email (необязательно)
            </label>
            <input
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="example@mail.ru"
              aria-invalid={error ? "true" : "false"}
              onInvalid={(e) => {
                e.preventDefault();
                const input = e.target as HTMLInputElement;
                if (input.validity.typeMismatch) {
                  input.setCustomValidity("Введите корректный email, например: name@example.com");
                } else if (!input.value) {
                  input.setCustomValidity("Заполните это поле");
                }
              }}
              onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
              className="border-line bg-background focus:border-gold-text focus:ring-gold-text/20 w-full rounded-xl border px-4 py-3.5 text-base focus:ring-2 focus:outline-none aria-[invalid=true]:border-red-500"
            />
          </div>

          {/* 5. Дата и гости — optional */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="mb-1.5 block text-sm font-medium">
                Дата (необязательно)
              </label>
              <input
                id="date"
                type="text"
                name="date"
                placeholder="дд.мм.гггг"
                pattern="\d{2}\.\d{2}\.\d{4}"
                aria-label="Дата мероприятия в формате день.месяц.год"
                className="border-line bg-background focus:border-gold-text focus:ring-gold-text/20 w-full rounded-xl border px-4 py-3.5 text-base focus:ring-2 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="guests" className="mb-1.5 block text-sm font-medium">
                Гостей (необязательно)
              </label>
              <input
                id="guests"
                type="number"
                name="guests"
                min="1"
                placeholder="напр. 50"
                className="border-line bg-background focus:border-gold-text focus:ring-gold-text/20 w-full rounded-xl border px-4 py-3.5 text-base focus:ring-2 focus:outline-none"
              />
            </div>
          </div>

          {/* B2B toggle */}
          <button
            type="button"
            onClick={() => setShowB2B(!showB2B)}
            className="text-gold-text text-sm font-medium hover:underline"
          >
            {showB2B
              ? "− Скрыть корпоративные детали"
              : "+ Для корпоративных клиентов (ИНН, ЭДО, тендеры)"}
          </button>

          {showB2B && (
            <div className="border-line bg-secondary/30 space-y-4 rounded-xl border p-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Название компании</label>
                <input
                  type="text"
                  name="companyName"
                  placeholder="ООО «Ромашка»"
                  className="border-line bg-background focus:border-gold-text w-full rounded-lg border px-4 py-3 text-base focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">ИНН</label>
                  <input
                    type="text"
                    name="companyInn"
                    inputMode="numeric"
                    placeholder="7800000000"
                    className="border-line bg-background focus:border-gold-text w-full rounded-lg border px-4 py-3 text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">ЭДО</label>
                  <select
                    name="edo"
                    className="border-line bg-background focus:border-gold-text w-full rounded-lg border px-4 py-3 text-sm focus:outline-none"
                  >
                    <option value="">—</option>
                    <option value="diadoc">Диадок</option>
                    <option value="sbis">СБИС</option>
                    <option value="rostra">Ростра</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div
              className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-900"
              role="alert"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-xl px-6 py-4 text-base font-semibold transition-colors disabled:opacity-50"
          >
            {submitting ? "Отправляем..." : "Отправить заявку →"}
          </button>
        </form>

        {/* Alternative contacts */}
        <div className="border-line mt-8 border-t pt-8 text-center">
          <p className="text-muted-foreground mb-3 text-sm">Или свяжитесь напрямую:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`tel:${SITE.phoneTel}`}
              className="hover:text-gold-text inline-flex items-center gap-2 text-sm font-semibold"
            >
              📞 {SITE.phone}
            </a>
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold-text inline-flex items-center gap-2 text-sm font-semibold"
            >
              💬 WhatsApp
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="hover:text-gold-text inline-flex items-center gap-2 text-sm font-semibold"
            >
              ✉️ {SITE.email}
            </a>
          </div>
        </div>

        {/* Связанные страницы — логичные переходы */}
        <RelatedPages context="info" slug="contact" />
        <SmartCTA
          context="contact"
          title="Быстрый расчёт без звонка?"
          description="Ответьте на 3 вопроса — получите предварительную стоимость за 30 секунд"
        />
      </div>
    </main>
  );
}
// W91 deploy Sun Aug  9 20:42:11 UTC 2026
