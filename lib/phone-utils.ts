/**
 * Phone Utilities - валидация и форматирование телефонных номеров
 *
 * Использует libphonenumber-js для корректной работы с номерами РФ
 */

import {
  parsePhoneNumber,
  isValidPhoneNumber,
  AsYouType,
  getCountryCallingCode,
} from "libphonenumber-js";

/**
 * Валидация телефонного номера
 */
export function validatePhone(phone: string): {
  valid: boolean;
  formatted?: string;
  error?: string;
} {
  if (!phone || !phone.trim()) {
    return { valid: false, error: "Введите номер телефона" };
  }

  const cleaned = phone.replace(/[^\d+()-]/g, "");

  try {
    const isValid = isValidPhoneNumber(cleaned, "RU");

    if (!isValid) {
      return { valid: false, error: "Некорректный формат номера" };
    }

    const parsed = parsePhoneNumber(cleaned, "RU");
    return {
      valid: true,
      formatted: parsed.formatInternational(),
    };
  } catch {
    return { valid: false, error: "Ошибка парсинга номера" };
  }
}

/**
 * Быстрая проверка (только формат)
 */
export function isPhoneValid(phone: string): boolean {
  if (!phone) return false;

  const digits = phone.replace(/\D/g, "");
  // Российский номер: 10-11 цифр (с кодом страны или без)
  return digits.length >= 10 && digits.length <= 11;
}

/**
 * Форматировать номер для отображения
 */
export function formatPhoneDisplay(phone: string): string {
  try {
    const parsed = parsePhoneNumber(phone, "RU");
    return parsed.formatNational();
  } catch {
    return phone;
  }
}

/**
 * Форматировать номер для ссылки tel:
 */
export function formatPhoneHref(phone: string): string {
  try {
    const parsed = parsePhoneNumber(phone, "RU");
    return `tel:${parsed.format("E.164")}`;
  } catch {
    return `tel:${phone.replace(/\D/g, "")}`;
  }
}

/**
 * Маска для ввода телефона (AsYouType)
 */
export class PhoneFormatter {
  private formatter: AsYouType;

  constructor() {
    this.formatter = new AsYouType("RU");
  }

  /** Ввести символ и получить отформатированный результат */
  input(char: string): string {
    return this.formatter.input(char);
  }

  /** Сбросить форматировщик */
  reset(): void {
    this.formatter.reset();
  }

  /** Получить текущий результат */
  getValue(): string {
    // AsYouType не предоставляет прямого доступа к значению
    // Используем внутреннее поле
    return (this.formatter as unknown as { phoneNumber: string }).phoneNumber || "";
  }

  /** Номер полностью введён? */
  isValid(): boolean {
    const value = this.getValue();
    return value ? isValidPhoneNumber(value, "RU") : false;
  }
}

/**
 * Извлечь только цифры из строки
 */
export function extractDigits(value: string): string {
  return value.replace(/\D/g, "");
}

/**
 * Код страны России
 */
export const RU_COUNTRY_CODE = getCountryCallingCode("RU");

/**
 * Регулярка для быстрой проверки формата
 */
export const PHONE_REGEX = /^(\+7|8)?[\s\-]?\(?[489]\d{2}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/;

/**
 * Примеры корректных форматов
 */
export const PHONE_EXAMPLES = [
  "+7 (912) 345-67-89",
  "89123456789",
  "+79123456789",
  "912 345 67 89",
];
