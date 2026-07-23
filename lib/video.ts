// Единый видео-слой (04_BLOCKS:321-392)
// Видео-провайдер РФ-стека: Rutube / self-host. Vimeo ЗАПРЕЩЁН бюджетным стеком.

export type VideoProvider = 'rutube' | 'selfhost';

export interface VideoRef {
  provider: VideoProvider;
  id?: string;       // Rutube embed ID
  src?: string;      // self-host URL
}

export function getEmbedUrl(ref: VideoRef): string | null {
  switch (ref.provider) {
    case 'rutube':
      return ref.id ? `https://rutube.ru/play/embed/${ref.id}` : null;
    case 'selfhost':
      return ref.src ?? null;
  }
}

export const VIDEO_PROVIDER_DEFAULT: VideoProvider = 'rutube';

export interface HomeShowcaseClip {
  video: VideoRef;
  posterSrc: string;
  eventType: string;
  title: string;
  durationSec: number;
}

export interface RecapClip extends HomeShowcaseClip {
  venue?: string;
  guests?: number;
}
