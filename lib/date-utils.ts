/**
 * Date Utilities - форматирование дат для кейтеринг-сайта
 *
 * Использует date-fns для локализованного отображения дат
 */

import {
  format,
  formatDistanceToNow,
  parseISO,
  isValid,
  differenceInDays,
  differenceInMonths,
  addDays,
  addWeeks,
  isWeekend,
  isFuture,
  isPast,
  startOfDay,
  endOfDay,
} from "date-fns";
import { ru } from "date-fns/locale";

/**
 * Форматировать дату в русском формате
 */
export function formatDate(date: string | Date, pattern: string = "d MMMM yyyy"): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  if (!isValid(d)) return "";
  return format(d, pattern, { locale: ru });
}

/**
 * Короткий формат даты (для карточек)
 */
export function formatDateShort(date: string | Date): string {
  return formatDate(date, "dd.MM.yyyy");
}

/**
 * Полный формат даты (для статей блога)
 */
export function formatDateFull(date: string | Date): string {
  return formatDate(date, "d MMMM yyyy'г.'");
}

/**
 * Относительная дата ("2 часа назад", "3 дня назад")
 */
export function timeAgo(date: string | Date): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  return formatDistanceToNow(d, { addSuffix: true, locale: ru });
}

/**
 * Проверить что дата в будущем
 */
export function isUpcoming(date: string | Date): boolean {
  const d = typeof date === "string" ? parseISO(date) : date;
  return isFuture(d);
}

/**
 * Проверить что дата в прошлом
 */
export function hasPassed(date: string | Date): boolean {
  const d = typeof date === "string" ? parseISO(date) : date;
  return isPast(d) && !isToday(d);
}

/**
 * Дней до события
 */
export function daysUntil(date: string | Date): number {
  const d = typeof date === "string" ? parseISO(date) : date;
  return Math.max(0, differenceInDays(d, new Date()));
}

/**
 * Месяцев до события
 */
export function monthsUntil(date: string | Date): number {
  const d = typeof date === "string" ? parseISO(date) : date;
  return differenceInMonths(d, new Date());
}

/**
 * Сегодняшняя дата?
 */
export function isToday(date: string | Date): boolean {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(new Date(), "yyyy-MM-dd") === format(d, "yyyy-MM-dd");
}

/**
 * Выходной день? (суббота/воскресенье)
 */
export function isWeekendDay(date: string | Date): boolean {
  const d = typeof date === "string" ? parseISO(date) : date;
  return isWeekend(d);
}

/**
 * Добавить N дней
 */
export function plusDays(date: Date, days: number): Date {
  return addDays(date, days);
}

/**
 * Добавить N недель
 */
export function plusWeeks(date: Date, weeks: number): Date {
  return addWeeks(date, weeks);
}

/**
 * Начало дня
 */
export function dayStart(date: Date): Date {
  return startOfDay(date);
}

/**
 * Конец дня
 */
export function dayEnd(date: Date): Date {
  return endOfDay(date);
}

/**
 * Русские месяцы (для заголовков)
 */
export const RUSSIAN_MONTHS = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

export const RUSSIAN_MONTHS_GENITIVE = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

export const RUSSIAN_WEEKDAYS = [
  "воскресенье",
  "понедельник",
  "вторник",
  "среда",
  "четверг",
  "пятница",
  "суббота",
];

export const RUSSIAN_WEEKDAYS_SHORT = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];
