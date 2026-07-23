// Sanity imports for validation types (only available in Sanity Studio)
// import type { Rule } from 'sanity';

/**
 * CMS Media Schema — NiloV Catering
 * 
 * For Sanity.io (free tier) or Strapi (self-hosted)
 * All media types include blurDataURL for Next.js Image blur-up
 * All assets require `status: 'verified' | 'pending'` for FactGate
 */

// ============================================================================
// SANITY SCHEMA (sanity.config.ts + schemas/)
// ============================================================================

/**
 * Base media fields shared by all asset types
 */
export const baseMediaFields = `
  // Core asset
  asset: { 
    _ref: string,           // Sanity asset reference
    _type: 'reference',
    _weak: true
  },
  // Blur placeholder (10px base64 WebP)
  blurDataURL: { 
    type: 'string',
    description: 'Base64 10px WebP for blur-up. Auto-generated on upload.'
  },
  // Accessibility
  alt: { 
    type: 'string', 
    title: 'Alt text (required)',
    validation: (Rule: any) => Rule.required().min(10).max(125)
  },
  // Fact-gate
  status: {
    type: 'string',
    options: { list: ['verified', 'pending'], layout: 'radio' },
    initialValue: 'pending',
    validation: (Rule: any) => Rule.required()
  },
  disclaimer: {
    type: 'string',
    title: 'Visible disclaimer if pending (e.g. "Пример из архива", "На проверке")',
    hidden: ({ parent }) => parent?.status === 'verified'
  }
`;

/**
 * Dish media (photo + optional hover video)
 */
export const dishMediaSchema = {
  name: 'dishMedia',
  title: 'Блюдо: фото + видео',
  type: 'object',
  fields: [
    {
      name: 'photo',
      type: 'image',
      title: 'Фото блюда (обязательно)',
      options: { hotspot: true, accept: 'image/*' },
      fields: [
              { name: 'alt', type: 'string', title: 'Alt text', validation: (Rule: any) => Rule.required().min(10).max(125) },
              { name: 'blurDataURL', type: 'string', title: 'Blur Data URL (auto)', readOnly: true },
              { name: 'status', type: 'string', options: { list: ['verified', 'pending'] }, initialValue: 'pending' },
              { name: 'disclaimer', type: 'string', hidden: ({ parent }: { parent?: { status?: string } }) => parent?.status === 'verified' }
            ]
    },
    {
      name: 'hoverVideo',
      type: 'file',
      title: 'Hover-видео (5s loop, WebM, <500KB)',
      description: 'Опционально. Автовоспроизведение при наведении.',
      options: { accept: 'video/webm,video/mp4' },
      fields: [
        { name: 'poster', type: 'image', title: 'Постер кадр', options: { hotspot: true } },
        { name: 'duration', type: 'number', title: 'Длительность (сек)', initialValue: 5 },
        { name: 'blurDataURL', type: 'string', readOnly: true },
        { name: 'status', type: 'string', options: { list: ['verified', 'pending'] }, initialValue: 'pending' },
        { name: 'disclaimer', type: 'string' }
      ]
    },
    {
      name: 'frameShape',
      type: 'string',
      title: 'Форма рамки',
      options: { list: ['circle', 'diamond', 'rounded-xl'], layout: 'radio' },
      initialValue: 'circle'
    },
    {
      name: 'objectPosition',
      type: 'string',
      title: 'Object position (focus point)',
      description: 'Напр. "center 40%" — фокус на тарелке, не на крае',
      initialValue: 'center 40%'
    }
  ]
};

/**
 * Event/Case study media
 */
export const eventMediaSchema = {
  name: 'eventMedia',
  title: 'Событие/Кейс',
  type: 'object',
  fields: [
    {
      name: 'coverImage',
      type: 'image',
      title: 'Обложка (4:3 или 3:2)',
      options: { hotspot: true },
      fields: [/* baseMediaFields */]
    },
    {
      name: 'gallery',
      type: 'array',
      title: 'Галерея (6-12 фото)',
      of: [{ type: 'image', options: { hotspot: true }, fields: [/* baseMediaFields */] }]
    },
    {
      name: 'recapVideo',
      type: 'file',
      title: 'Видео-рекап (8-12s loop)',
      options: { accept: 'video/webm,video/mp4' },
      fields: [
        { name: 'poster', type: 'image', options: { hotspot: true } },
        { name: 'duration', type: 'number', initialValue: 10 },
        { name: 'blurDataURL', type: 'string', readOnly: true }
      ]
    }
  ]
};

/**
 * Hero video (homepage + event pages)
 */
export const heroVideoSchema = {
  name: 'heroVideo',
  title: 'Hero видео',
  type: 'object',
  fields: [
    {
      name: 'webm',
      type: 'file',
      title: 'WebM (VP9, 10-15s, <5MB)',
      options: { accept: 'video/webm' },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'mp4',
      type: 'file',
      title: 'MP4 Fallback (H.264)',
      options: { accept: 'video/mp4' }
    },
    {
      name: 'poster',
      type: 'image',
      title: 'Постер (первый кадр, 1920×1080 WebP)',
      options: { hotspot: true },
      fields: [/* baseMediaFields */],
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'duration',
      type: 'number',
      title: 'Длительность (сек)',
      initialValue: 12,
      validation: (Rule: any) => Rule.min(8).max(20)
    },
    {
      name: 'isSeamlessLoop',
      type: 'boolean',
      title: 'Бесшовный цикл (последний кадр = первый)',
      initialValue: true
    }
  ]
};

/**
 * Client logos for TrustBar
 */
export const clientLogoSchema = {
  name: 'clientLogo',
  title: 'Логотип клиента',
  type: 'object',
  fields: [
    { name: 'name', type: 'string', title: 'Название', validation: (Rule: any) => Rule.required() },
    { 
      name: 'logo', 
      type: 'image', 
      title: 'SVG логотип (предпочтительно) или PNG', 
      options: { hotspot: true, accept: 'image/svg+xml,image/png' },
      fields: [/* baseMediaFields */]
    },
    { name: 'href', type: 'url', title: 'Сайт клиента (опционально)' },
    { 
      name: 'status', 
      type: 'string', 
      options: { list: ['verified', 'pending'] }, 
      initialValue: 'pending' 
    },
    { name: 'disclaimer', type: 'string', hidden: ({ parent }: { parent?: { status?: string } }) => parent?.status === 'verified' }
  ]
};

/**
 * Team member
 */
export const teamMemberSchema = {
  name: 'teamMember',
  title: 'Член команды',
  type: 'document',
  fields: [
    { name: 'name', type: 'string', title: 'Имя', validation: (Rule: any) => Rule.required() },
    { name: 'role', type: 'string', title: 'Роль (Шеф, Менеджер, Парикмахер...)' },
    { 
      name: 'photo', 
      type: 'image', 
      title: 'Портрет (3:4)', 
      options: { hotspot: true },
      fields: [/* baseMediaFields */]
    },
    { name: 'bio', type: 'text', title: 'Краткое био' },
    { name: 'order', type: 'number', title: 'Порядок сортировки' }
  ]
};

/**
 * Kitchen/Process photo
 */
export const processPhotoSchema = {
  name: 'processPhoto',
  title: 'Процесс/Кухня',
  type: 'object',
  fields: [
    { 
      name: 'image', 
      type: 'image', 
      title: 'Фото (4:3)', 
      options: { hotspot: true },
      fields: [/* baseMediaFields */]
    },
    { name: 'caption', type: 'string', title: 'Подпись' },
    { name: 'category', type: 'string', options: { list: ['prep', 'cooking', 'plating', 'equipment', 'team', 'venue'] }}
  ]
};

/**
 * Video testimonial
 */
export const videoTestimonialSchema = {
  name: 'videoTestimonial',
  title: 'Видео-отзыв',
  type: 'object',
  fields: [
    { name: 'clientName', type: 'string', title: 'Имя клиента', validation: (Rule: any) => Rule.required() },
    { name: 'eventType', type: 'string', title: 'Тип события' },
    { 
      name: 'video', 
      type: 'file', 
      title: 'Видео (WebM/MP4)', 
      options: { accept: 'video/webm,video/mp4' }
    },
    { 
      name: 'poster', 
      type: 'image', 
      title: 'Постер', 
      options: { hotspot: true }
    },
    { name: 'transcript', type: 'text', title: 'Транскрипт (обязательно для a11y)', validation: (Rule: any) => Rule.required() },
    { 
      name: 'status', 
      type: 'string', 
      options: { list: ['verified', 'pending'] }, 
      initialValue: 'pending' 
    }
  ]
};

/**
 * Seasonal campaign
 */
export const seasonalMediaSchema = {
  name: 'seasonalMedia',
  title: 'Сезонная кампания',
  type: 'object',
  fields: [
    { name: 'season', type: 'string', options: { list: ['newyear', 'maslenitsa', 'spring', 'summer', 'autumn', 'wedding'] }},
    { name: 'hero', type: 'image', title: 'Геройское фото/видео (16:9)', options: { hotspot: true }},
    { name: 'dishes', type: 'array', of: [{ type: 'reference', to: [{ type: 'dish' }]}] },
    { name: 'announcement', type: 'string' },
    { name: 'deadline', type: 'date', title: 'Дедлайн бронирования' }
  ]
};

// ============================================================================
// TYPES FOR TYPESCRIPT (lib/cms-types.ts)
// ============================================================================

/*
export interface SanityImageAsset {
  _ref: string;
  _type: 'reference';
}

export interface MediaWithBlur {
  asset: SanityImageAsset;
  alt: string;
  blurDataURL: string;
  status: 'verified' | 'pending';
  disclaimer?: string;
}

export interface DishMedia {
  photo: MediaWithBlur & {
    frameShape: 'circle' | 'diamond' | 'rounded-xl';
    objectPosition: string;
  };
  hoverVideo?: {
    asset: SanityImageAsset;
    poster: MediaWithBlur;
    duration: number;
    status: 'verified' | 'pending';
    disclaimer?: string;
  };
  frameShape: 'circle' | 'diamond' | 'rounded-xl';
  objectPosition: string;
}

export interface EventMedia {
  coverImage: MediaWithBlur;
  gallery: MediaWithBlur[];
  recapVideo?: {
    asset: SanityImageAsset;
    poster: MediaWithBlur;
    duration: number;
    blurDataURL: string;
  };
}

export interface HeroVideo {
  webm: { asset: SanityImageAsset };
  mp4?: { asset: SanityImageAsset };
  poster: MediaWithBlur;
  duration: number;
  isSeamlessLoop: boolean;
}

export interface ClientLogo {
  name: string;
  logo: MediaWithBlur;
  href?: string;
  status: 'verified' | 'pending';
  disclaimer?: string;
}
*/

// ============================================================================
// MIGRATION HELPER: Generate blurDataURL on upload (Sanity plugin)
// ============================================================================

/*
// sanity/plugins/generate-blur-url.js
import sharp from 'sharp';

export default function generateBlurUrl() {
  return {
    name: 'generate-blur-url',
    validate: () => true,
    process: async (document, context) => {
      if (document._type === 'image' || document._type === 'file') {
        const asset = await context.client.getAsset(document.asset._ref);
        if (asset && asset.url) {
          // Download, resize to 10px, WebP 20%, blur 5px
          const response = await fetch(asset.url);
          const buffer = await response.arrayBuffer();
          
          const blurBuffer = await sharp(Buffer.from(buffer))
            .resize(10, 10, { fit: 'inside', withoutEnlargement: true })
            .webp({ quality: 20 })
            .blur(5)
            .toBuffer();
            
          const base64 = `data:image/webp;base64,${blurBuffer.toString('base64')}`;
          
          // Patch the document
          await context.client.patch(document._id)
            .set({ blurDataURL: base64 })
            .commit();
        }
      }
      return document;
    }
  };
}
*/

// ============================================================================
// NEXT.JS IMAGE LOADER CONFIG (next.config.ts)
// ============================================================================

/*
// next.config.ts
import { defineConfig } from 'next';

export default defineConfig({
  images: {
    loader: 'custom',
    loaderFile: './lib/image-loader.ts',
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: '*.sanity.io' }
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [480, 720, 1024, 1280, 1600, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
  },
});
*/

/*
// lib/image-loader.ts
export default function loader({ src, width, quality }) {
  const params = [`w=${width}`, `q=${quality || 75}`, 'fit=max', 'auto=format'];
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${src}?${params.join('&')}`;
}
*/