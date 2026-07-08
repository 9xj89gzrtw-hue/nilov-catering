"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { formatPrice, cn } from "@/lib/utils";
import { pricingPackages, additionalServices } from "@/lib/data";
import AnimatedSection from "@/components/common/AnimatedSection";

export default function PriceCalculator() {
  const [guestCount, setGuestCount] = useState(50);
  const [packageId, setPackageId] = useState("premium");
  const [selectedAdditional, setSelectedAdditional] = useState<Set<string>>(
    new Set()
  );

  const pkg = pricingPackages.find((p) => p.id === packageId);
  const baseTotal = pkg ? (pkg.pricePerPerson ?? pkg.pricePerGuest ?? 0) * guestCount : 0;

  const additionalTotal = Array.from(selectedAdditional).reduce((acc, id) => {
    const svc = additionalServices.find((s) => s.id === id);
    if (!svc) return acc;
    if (svc.priceType === "per-guest") return acc + svc.price * guestCount;
    if (svc.priceType === "per-hour") return acc + svc.price * 5;
    return acc + svc.price;
  }, 0);

  const grandTotal = baseTotal + additionalTotal;

  const toggleAdditional = (id: string) => {
    setSelectedAdditional((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div id="calculator" className="scroll-mt-24">
      <AnimatedSection>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
          Калькулятор стоимости
        </h2>
        <p className="text-muted-foreground text-center max-w-xl mx-auto mb-10">
          Рассчитайте предварительную стоимость кейтеринга для вашего мероприятия
        </p>
      </AnimatedSection>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left: Inputs */}
        <AnimatedSection delay={0.1}>
          <div className="space-y-6">
            <div>
              <Label className="mb-2 block">Количество гостей</Label>
              <Input
                type="number"
                min={10}
                max={1000}
                value={guestCount}
                onChange={(e) =>
                  setGuestCount(
                    Math.max(10, Math.min(1000, Number(e.target.value) || 10))
                  )
                }
              />
            </div>

            <div>
              <Label className="mb-2 block">Пакет обслуживания</Label>
              <Select value={packageId} onValueChange={(v) => v && setPackageId(v)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {pricingPackages.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name} — {formatPrice(p.pricePerPerson)}/чел.
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div>
              <Label className="mb-3 block font-medium">
                Дополнительные услуги
              </Label>
              <div className="space-y-4">
                {additionalServices.map((svc) => {
                  const priceLabel =
                    svc.priceType === "per-guest"
                      ? `${formatPrice(svc.price)}/чел.`
                      : svc.priceType === "per-hour"
                      ? `${formatPrice(svc.price)}/час`
                      : formatPrice(svc.price);
                  return (
                    <div
                      key={svc.id}
                      className="flex items-center justify-between gap-4"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium">{svc.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {svc.description} ({priceLabel})
                        </p>
                      </div>
                      <Switch
                        checked={selectedAdditional.has(svc.id)}
                        onCheckedChange={() => toggleAdditional(svc.id)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Right: Result */}
        <AnimatedSection delay={0.2}>
          <div className="bg-muted/50 rounded-xl p-6 lg:p-8 h-fit lg:sticky lg:top-24">
            <h3 className="font-heading text-xl font-bold mb-6">
              Расчёт стоимости
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Пакет &laquo;{pkg?.name}&raquo;</span>
                <span>{formatPrice(baseTotal)}</span>
              </div>
              {Array.from(selectedAdditional).map((id) => {
                const svc = additionalServices.find((s) => s.id === id);
                if (!svc) return null;
                let price = 0;
                if (svc.priceType === "per-guest") price = svc.price * guestCount;
                else if (svc.priceType === "per-hour") price = svc.price * 5;
                else price = svc.price;
                return (
                  <div key={id} className="flex justify-between">
                    <span className="text-muted-foreground">{svc.name}</span>
                    <span>{formatPrice(price)}</span>
                  </div>
                );
              })}
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between items-end">
              <span className="text-lg font-bold">Итого</span>
              <span className="text-2xl font-heading font-bold text-accent">
                {formatPrice(grandTotal)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              * Предварительный расчёт. Точная стоимость определяется после
              согласования меню.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}