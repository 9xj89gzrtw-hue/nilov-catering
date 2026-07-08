"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Check, X, Clock } from "lucide-react";
import AnimatedSection from "@/components/common/AnimatedSection";

const BOOKED_DATES = new Set([
  "2026-07-12", "2026-07-18", "2026-07-19", "2026-07-25",
  "2026-07-26", "2026-08-02", "2026-08-08", "2026-08-09",
  "2026-08-15", "2026-08-16", "2026-08-22", "2026-08-23",
  "2026-09-05", "2026-09-06", "2026-09-12", "2026-09-13",
]);

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  return (new Date(year, month, 1).getDay() + 6) % 7; // Monday=0
}

const MONTH_NAMES = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
];

const DAY_NAMES = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

export default function AvailabilityCalendar() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => { setIsClient(true); }, []);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfWeek(currentYear, currentMonth);

  const calendarDays = useMemo(() => {
    const days: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(d);
    return days;
  }, [daysInMonth, firstDay]);

  const isPastDate = (day: number) => {
    const d = new Date(currentYear, currentMonth, day);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return d < todayStart;
  };

  const isBooked = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return BOOKED_DATES.has(dateStr);
  };

  const bookedCount = Array.from(BOOKED_DATES).filter(d => d.startsWith(`${currentYear}-${String(currentMonth + 1).padStart(2, "0")}`)).length;
  const availableCount = daysInMonth - bookedCount - (currentMonth === today.getMonth() ? today.getDate() - 1 : 0);

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
  };

  if (!isClient) {
    return <div className="h-80 bg-muted/20 animate-pulse rounded-2xl" />;
  }

  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      <div className="relative z-10 max-w-lg mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent rounded-full px-4 py-1.5 text-xs font-medium tracking-wider uppercase mb-4">
              <Calendar className="w-3.5 h-3.5" />
              Проверьте дату
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-2">
              Свободные даты
            </h2>
            <p className="text-muted-foreground text-sm">
              {availableCount > 0 ? (
                <>Осталось <span className="text-accent font-semibold">{availableCount} {availableCount === 1 ? "дата" : availableCount < 5 ? "даты" : "дат"}</span> в {MONTH_NAMES[currentMonth]}</>
              ) : (
                <span className="text-destructive">Мест нет — забронируйте следующий месяц</span>
              )}
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="glass-card rounded-2xl p-5 md:p-6 border-gradient">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <button
                onClick={prevMonth}
                className="w-9 h-9 rounded-lg bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors text-sm"
                aria-label="Предыдущий месяц"
              >
                ←
              </button>
              <h3 className="font-heading text-lg font-bold">
                {MONTH_NAMES[currentMonth]} {currentYear}
              </h3>
              <button
                onClick={nextMonth}
                className="w-9 h-9 rounded-lg bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors text-sm"
                aria-label="Следующий месяц"
              >
                →
              </button>
            </div>

            {/* Day names */}
            <div className="grid grid-cols-7 mb-2">
              {DAY_NAMES.map(d => (
                <div key={d} className="text-center text-xs text-muted-foreground font-medium py-1">
                  {d}
                </div>
              ))}
            </div>

            {/* Days */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, i) => {
                if (day === null) return <div key={`empty-${i}`} />;

                const past = isPastDate(day);
                const booked = isBooked(day);
                const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                const isSelected = selectedDate === dateStr;
                const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();

                let cellClass = "h-10 md:h-11 rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-200 ";
                if (past) {
                  cellClass += "text-muted-foreground/30 cursor-not-allowed";
                } else if (booked) {
                  cellClass += "bg-destructive/10 text-destructive/50 cursor-not-allowed line-through";
                } else if (isSelected) {
                  cellClass += "bg-accent text-white shadow-lg shadow-accent/30 cursor-pointer";
                } else {
                  cellClass += "bg-muted/30 text-foreground hover:bg-accent/10 hover:text-accent cursor-pointer";
                }

                return (
                  <button
                    key={day}
                    onClick={() => !past && !booked && setSelectedDate(dateStr === selectedDate ? null : dateStr)}
                    disabled={past || booked}
                    className={cellClass}
                    aria-label={`${day} ${MONTH_NAMES[currentMonth]}${booked ? " — занято" : past ? " — прошлое" : isToday ? " — сегодня" : ""}`}
                  >
                    <span className="relative">
                      {day}
                      {isToday && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-5 mt-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-muted/30" /> Свободно
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-destructive/10 line-through text-destructive/40 text-[10px]">X</span> Занято
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-accent" /> Выбрано
              </span>
            </div>

            {/* Selected date CTA */}
            <AnimatePresence>
              {selectedDate && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden mt-4"
                >
                  <div className="bg-accent/5 border border-accent/20 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-accent" />
                      <div>
                        <p className="text-sm font-medium">
                          {parseInt(selectedDate.split("-")[2])} {MONTH_NAMES[parseInt(selectedDate.split("-")[1]) - 1]}
                        </p>
                        <p className="text-xs text-muted-foreground">Дата свободна</p>
                      </div>
                    </div>
                    <a
                      href={`/quote?date=${selectedDate}`}
                      className="h-10 px-5 rounded-lg bg-accent text-white text-sm font-medium flex items-center gap-1.5 hover:bg-accent-dark transition-colors"
                    >
                      Забронировать
                      <Check className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}