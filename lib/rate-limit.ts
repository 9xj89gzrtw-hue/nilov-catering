/**
 * Rate Limiter - защита API от спама и DDoS
 * 
 * Использует in-memory хранилище для Vercel Edge/Serverless
 * Для продакшена рекомендуется Upstash Redis
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: number;
  limit: number;
}

/**
 * Проверить rate limit
 * @param key - идентификатор (IP, email, etc.)
 * @param limit - максимальное количество запросов
 * @param windowMs - окно времени в миллисекундах (default: 1 минута)
 */
export function rateLimit(
  key: string,
  limit: number = 10,
  windowMs: number = 60_000
): RateLimitResult {
  const now = Date.now();
  const existing = store.get(key);

  // Если записи нет или окно истекло - создаём новую
  if (!existing || now > existing.resetAt) {
    const entry: RateLimitEntry = {
      count: 1,
      resetAt: now + windowMs,
    };
    store.set(key, entry);
    
    // Очистка через 2 окна (чтобы не утекала память)
    setTimeout(() => store.delete(key), windowMs * 2);
    
    return {
      success: true,
      remaining: limit - 1,
      resetAt: entry.resetAt,
      limit,
    };
  }

  // Проверяем лимит
  if (existing.count >= limit) {
    return {
      success: false,
      remaining: 0,
      resetAt: existing.resetAt,
      limit,
    };
  }

  // Увеличиваем счётчик
  existing.count += 1;
  
  return {
    success: true,
    remaining: limit - existing.count,
    resetAt: existing.resetAt,
    limit,
  };
}

/**
 * Получить IP адрес из запроса (Vercel / Node.js)
 */
export function getClientIP(request: Request): string {
  // Vercel headers
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }
  
  return 'unknown';
}

/**
 * Пресеты для разных endpoint'ов
 */
export const RATE_LIMITS = {
  /** Формы заявок - строгий лимит */
  contactForm: { limit: 5, windowMs: 60_000 },      // 5 заявок/мин
  /** Newsletter подписка */
  newsletter: { limit: 3, windowMs: 3600_000 },       // 3 подписки/час
  /** Калькулятор цен */
  calculator: { limit: 30, windowMs: 60_000 },         // 30 запросов/мин
  /** Общий API */
  api: { limit: 100, windowMs: 60_000 },              // 100 запросов/мин
} as const;

/**
 * Middleware для проверки rate limit с автоматическим ответом 429
 */
export async function withRateLimit(
  request: Request,
  preset: keyof typeof RATE_LIMITS = 'api'
): Promise<{ allowed: boolean } | Response> {
  const ip = getClientIP(request);
  const config = RATE_LIMITS[preset];
  const result = rateLimit(ip, config.limit, config.windowMs);
  
  if (!result.success) {
    return new Response(
      JSON.stringify({
        error: 'Too many requests',
        retryAfter: Math.ceil((result.resetAt - Date.now()) / 1000),
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': String(Math.ceil((result.resetAt - Date.now()) / 1000)),
          'X-RateLimit-Limit': String(result.limit),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(Math.ceil(result.resetAt / 1000)),
        },
      }
    );
  }
  
  return { allowed: true };
}
