"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { calcTotal } from "@/lib/pricing";
import { Download, Loader2 } from "lucide-react";
import {
  PRICE_PER_GUEST,
  ADDONS,
  GUESTS_MIN,
  GUESTS_MAX,
  GUESTS_STEP,
  GUEST_QUICK_BUTTONS,
} from "@/lib/constants";
import { TIER_LABEL } from "@/lib/types";
import type { Format, Tier, AddOn } from "@/lib/types";
import AnimatedCounter from "@/components/effects/AnimatedCounter";

const FORMATS: { format: Format; label: string }[] = [
  { format: "furshet", label: "Фуршет" },
  { format: "banket", label: "Банкет" },
  { format: "coffee-break", label: "Кофе-брейк" },
  { format: "detskoe", label: "Детский праздник" },
  { format: "chef-at-home", label: "Выезд шефа" },
];

const TIERS: Tier[] = ["economy", "standard", "premium", "luxury"];

export default function Calculator() {
  const searchParams = useSearchParams();
  const [format, setFormat] = useState<Format>("furshet");
  const [guests, setGuests] = useState(20);
  const [tier, setTier] = useState<Tier>("standard");
  const [selectedAddons, setSelectedAddons] = useState<AddOn[]>([]);
  const [generatingPdf, setGeneratingPdf] = useState(false);

  // Read URL params on mount to pre-fill from helper
  useEffect(() => {
    const fmt = searchParams.get("format") as Format | null;
    const g = searchParams.get("guests");
    const t = searchParams.get("tier") as Tier | null;

    if (fmt && FORMATS.some((f) => f.format === fmt)) setFormat(fmt);
    if (g) {
      const num = Number(g);
      if (!isNaN(num) && num >= GUESTS_MIN && num <= GUESTS_MAX) setGuests(num);
    }
    if (t && TIERS.includes(t)) setTier(t);
  }, [searchParams]);

  const result = useMemo(
    () => calcTotal(guests, format, tier, selectedAddons, { discounts: true }),
    [format, guests, tier, selectedAddons]
  );

  const availableAddons = ADDONS.filter((a) => a.formats.includes(format));

  const toggleAddon = (a: AddOn) => {
    setSelectedAddons((prev) =>
      prev.find((x) => x.id === a.id) ? prev.filter((x) => x.id !== a.id) : [...prev, a]
    );
  };

  // Генерация PDF-КП
  const generatePdf = useCallback(async () => {
    setGeneratingPdf(true);
    try {
      const response = await fetch("/api/calculation/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          format,
          tier,
          guests,
          addons: selectedAddons.map((a) => a.id),
        }),
      });

      if (!response.ok) throw new Error("Failed to generate PDF");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `KP_NilovCatering_${format}_${tier}_${guests}guests.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF generation error:", error);
    } finally {
      setGeneratingPdf(false);
    }
  }, [format, tier, guests, selectedAddons]);

  return (
    <section className="bg-background py-12" aria-label="Калькулятор стоимости">
      <div className="container-site max-w-3xl">
        <h2 className="mb-2 text-center">Калькулятор стоимости</h2>
        <p className="text-muted-foreground mb-10 text-center">
          Выберите параметры — итог обновляется мгновенно
        </p>

        {/* Format */}
        <div className="mb-8">
          <label className="text-muted-foreground mb-3 block text-sm font-medium">Формат</label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {FORMATS.map((f) => (
              <button
                key={f.format}
                onClick={() => setFormat(f.format)}
                className={`rounded-lg border p-3 text-sm font-medium transition-all ${
                  format === f.format
                    ? "border-gold-text bg-gold-tint text-gold-text"
                    : "border-line bg-card text-muted-foreground hover:border-gold-text/50"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Guests */}
        <div className="mb-8">
          <label className="text-muted-foreground mb-3 block text-sm font-medium">
            Гостей: <span className="text-foreground text-lg font-bold">{guests}</span>
          </label>
          <input
            type="range"
            min={GUESTS_MIN}
            max={GUESTS_MAX}
            step={GUESTS_STEP}
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="accent-gold-text w-full"
            aria-label="Количество гостей"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {GUEST_QUICK_BUTTONS.map((n) => (
              <button
                key={n}
                onClick={() => setGuests(n)}
                className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                  guests === n
                    ? "border-gold-text bg-gold-tint text-gold-text"
                    : "border-line text-muted-foreground hover:border-gold-text/50"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Tier */}
        <div className="mb-8">
          <label className="text-muted-foreground mb-3 block text-sm font-medium">Тариф</label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {TIERS.map((t) => {
              const price = PRICE_PER_GUEST[format]?.[t];
              if (!price) return null;
              return (
                <button
                  key={t}
                  onClick={() => setTier(t)}
                  className={`rounded-lg border p-3 text-center transition-all ${
                    tier === t
                      ? "border-gold-text bg-gold-tint"
                      : "border-line bg-card hover:border-gold-text/50"
                  }`}
                >
                  <div className="text-foreground text-sm font-medium">{TIER_LABEL[t]}</div>
                  <div className="text-gold-text text-xs font-semibold">
                    {price.toLocaleString("ru-RU")} ₽/гость
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Add-ons */}
        {availableAddons.length > 0 && (
          <div className="mb-8">
            <label className="text-muted-foreground mb-3 block text-sm font-medium">
              Дополнительные услуги
            </label>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {availableAddons.map((a) => {
                const isSelected = selectedAddons.find((x) => x.id === a.id);
                return (
                  <button
                    key={a.id}
                    onClick={() => toggleAddon(a)}
                    className={`rounded-lg border p-3 text-left transition-all ${
                      isSelected
                        ? "border-gold-text bg-gold-tint"
                        : "border-line bg-card hover:border-gold-text/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-foreground text-sm font-medium">{a.name}</span>
                      <span className="text-gold-text text-xs font-semibold">
                        {a.priceType === "fixed"
                          ? `${a.price.toLocaleString("ru-RU")} ₽`
                          : `+${a.price} ₽/гость`}
                      </span>
                    </div>
                    {isSelected && <div className="text-success mt-1 text-xs">Добавлено</div>}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Summary — aria-live для скринридеров (33_UXSIM_ANNA) */}
        <motion.div
          className="border-gold-text/30 bg-card rounded-xl border-2 p-6 text-center"
          layout
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="text-muted-foreground mb-2 text-sm">Итого</div>
          <div className="font-heading text-gold-text mb-2 text-4xl font-bold">
            <AnimatedCounter value={result.total} suffix=" ₽" />
          </div>
          <div className="text-muted-foreground mb-4 text-sm">
            <AnimatedCounter value={result.perGuest} suffix=" ₽/гость" />
          </div>

          {result.savings > 0 && (
            <div className="bg-success/10 text-success mb-4 inline-block rounded-full px-3 py-1 text-xs font-medium">
              Экономия {result.savings.toLocaleString("ru-RU")} ₽ vs Люкс
            </div>
          )}

          <div className="text-muted-foreground border-line grid grid-cols-3 gap-4 border-t pt-4 text-xs">
            <div>
              База
              <br />
              <span className="text-foreground font-semibold">
                {result.base.toLocaleString("ru-RU")} ₽
              </span>
            </div>
            <div>
              Скидка
              <br />
              <span className="text-foreground font-semibold">
                −{result.discount.toLocaleString("ru-RU")} ₽
              </span>
            </div>
            <div>
              Аддоны
              <br />
              <span className="text-foreground font-semibold">
                {result.addonsTotal.toLocaleString("ru-RU")} ₽
              </span>
            </div>
          </div>

          {/* Service breakdown — сервис-норма (SERVICE_DELIVERY_SPEC §1-4) */}
          {result.serviceBreakdown && (
            <div className="bg-secondary/50 mt-4 rounded-lg p-3 text-left">
              <p className="text-foreground mb-2 text-xs font-medium">
                Сервис-норма {result.service.toLocaleString("ru-RU")} ₽
              </p>
              <div className="text-muted-foreground grid grid-cols-3 gap-2 text-xs">
                <div>Персонал: {result.serviceBreakdown.staffCount} чел.</div>
                <div>Норма: {result.serviceBreakdown.ratio}</div>
                <div>Координатор: да</div>
                <div className="col-span-3">
                  Сетап: {result.serviceBreakdown.setupHours} ч · on-site
                </div>
              </div>
            </div>
          )}

          <p className="text-muted-foreground mt-4 text-xs">
            В цену включено: еда, посуда, доставка в КАД. Не включено: депозит 30% (возвратный),
            надбавка вне КАД.
          </p>

          {/* Кнопка скачивания КП */}
          <button
            onClick={generatePdf}
            disabled={generatingPdf}
            className="bg-gold-text hover:bg-gold-text/90 mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold text-white transition-colors disabled:opacity-60"
          >
            {generatingPdf ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Генерация...
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                Скачать коммерческое предложение (PDF)
              </>
            )}
          </button>
        </motion.div>
      </div>
      {/* Schema.org Offer (07_CALCULATOR_SPEC §SEO) */}
      {result.total > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Offer",
              name: `Кейтеринг NiloV — ${format} ${TIER_LABEL[tier] || tier}`,
              price: result.total.toString(),
              priceCurrency: "RUB",
              eligibleQuantity: { "@type": "QuantitativeValue", value: guests },
              availability: "https://schema.org/InStock",
              seller: {
                "@type": "LocalBusiness",
                name: "NiloV Catering",
                address: { "@type": "PostalAddress", addressLocality: "Санкт-Петербург" },
              },
              priceValidUntil: new Date(Date.UTC(2026, 7, 10) + 30 * 24 * 3600 * 1000)
                .toISOString()
                .slice(0, 10),
            }),
          }}
        />
      )}
    </section>
  );
}
