import { z } from 'zod';

// Контактная форма (07_CALCULATOR_SPEC)
export const contactSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  phone: z.string().regex(/^\+7\d{10}$/, 'Телефон должен быть в формате +7XXXXXXXXXX'),
  email: z.string().email('Некорректный email').optional().or(z.literal('')),
  date: z.string().min(1, 'Дата обязательна'),
  format: z.string().optional(),
  guests: z.number().int().positive().optional(),
  comment: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// Входы калькулятора (07)
export const calculatorInputSchema = z.object({
  format: z.enum(['furshet', 'banket', 'coffee-break', 'mobile-furshet', 'detskoe', 'chef-at-home']),
  guests: z.number().int().positive('Минимум 1 гость'),
  tier: z.enum(['economy', 'standard', 'premium', 'luxury', 'custom']),
  addonIds: z.array(z.string()).optional(),
  childGuests: z.number().int().min(0).optional(),
  bookingDays: z.number().int().min(0).optional(),
});

export type CalculatorInput = z.infer<typeof calculatorInputSchema>;

// Входы конструктора (08)
export const constructorStateSchema = z.object({
  format: z.enum(['furshet', 'banket', 'coffee-break', 'mobile-furshet', 'detskoe', 'chef-at-home']),
  tier: z.enum(['economy', 'standard', 'premium', 'luxury']),
  guests: z.number().int().positive(),
  selectedDishIds: z.array(z.string()),
  addonIds: z.array(z.string()).optional(),
  contact: contactSchema.optional(),
});

export type ConstructorState = z.infer<typeof constructorStateSchema>;
