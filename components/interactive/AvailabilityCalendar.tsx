"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  slaHours?: number;
  slaBooking?: string;
  variant?: "mini" | "full";
  mode?: "book" | "check";
}

const MONTHS = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

// Демо-занятости (в проде — API)
const BUSY_DATES = new Set(["2026-08-15", "2026-08-22", "2026-09-05", "2026-09-10"]);

export default function AvailabilityCalendar({
  slaHours = 2,
  slaBooking = "O3",
  variant = "full",
  mode = "check",
}: Props) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState<string | null>(null);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const offset = firstDay === 0 ? 6 : firstDay - 1; // Пн=0

  const days: (number | null)[] = [];
  for (let i = 0; i < offset; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  const dateStr = (d: number) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  const isPast = (d: number) =>
    new Date(year, month, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const isBusy = (d: number) => BUSY_DATES.has(dateStr(d));

  const prevMonth = () => {
    if (month === 0) {
      setYear((y) => y - 1);
      setMonth(11);
    } else {
      setMonth((m) => m - 1);
    }
  };
  const nextMonth = () => {
    if (month === 11) {
      setYear((y) => y + 1);
      setMonth(0);
    } else {
      setMonth((m) => m + 1);
    }
  };

  if (variant === "mini") {
    return (
      <div className="border-line bg-card inline-block rounded-lg border p-3">
        <div className="mb-2 flex items-center justify-between">
          <button onClick={prevMonth} className="touch-target p-1">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-xs font-medium">
            {MONTHS[month]} {year}
          </span>
          <button onClick={nextMonth} className="touch-target p-1">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-0.5 text-center">
          {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((d) => (
            <div key={d} className="text-muted-foreground py-0.5 text-[10px]">
              {d}
            </div>
          ))}
          {days.map((d, i) => (
            <div
              key={i}
              tabIndex={d === null || isPast(d) || isBusy(d) ? -1 : 0}
              role={d === null ? undefined : "button"}
              aria-label={d ? `Выбрать дату ${dateStr(d)}` : undefined}
              aria-disabled={d === null || isPast(d) || isBusy(d) ? "true" : "false"}
              className={`rounded py-1 text-xs outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6E5530] ${d === null ? "" : isPast(d) ? "text-muted-foreground/40" : isBusy(d) ? "bg-destructive/10 text-destructive line-through" : "hover:bg-gold-tint cursor-pointer"}`}
              onClick={() => d && !isPast(d) && !isBusy(d) && setSelected(dateStr(d))}
              onKeyDown={(e) => {
                if (d && !isPast(d) && !isBusy(d) && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  setSelected(dateStr(d));
                }
              }}
            >
              {d}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="border-line bg-card rounded-xl border p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-heading text-lg font-medium">
          {MONTHS[month]} {year}
        </h3>
        <div className="flex gap-1">
          <button onClick={prevMonth} className="hover:bg-secondary touch-target rounded-lg p-2">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button onClick={nextMonth} className="hover:bg-secondary touch-target rounded-lg p-2">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="mb-6 grid grid-cols-7 gap-1 text-center">
        {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((d) => (
          <div key={d} className="text-muted-foreground py-1 text-xs font-medium">
            {d}
          </div>
        ))}
        {days.map((d, i) => (
          <button
            key={i}
            disabled={d === null || isPast(d!) || isBusy(d!)}
            onClick={() => d && setSelected(dateStr(d))}
            className={`touch-target rounded-lg py-2.5 text-sm transition-colors ${
              d === null
                ? ""
                : isPast(d!)
                  ? "text-muted-foreground/30 cursor-not-allowed"
                  : isBusy(d!)
                    ? "bg-destructive/10 text-destructive cursor-not-allowed line-through"
                    : selected === dateStr(d!)
                      ? "bg-primary text-primary-foreground font-semibold"
                      : "hover:bg-gold-tint"
            } `}
          >
            {d}
          </button>
        ))}
      </div>
      <div className="text-muted-foreground flex items-center gap-6 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="bg-destructive/10 border-destructive/30 h-3 w-3 rounded border" />
          <span>Занято</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="bg-primary h-3 w-3 rounded" />
          <span>Выбрано</span>
        </div>
        {selected && (
          <span className="text-foreground ml-auto font-medium">
            {selected} — ответ за {slaHours}ч
          </span>
        )}
      </div>
    </div>
  );
}
