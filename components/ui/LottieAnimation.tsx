"use client";

/**
 * LOTTIE ANIMATION COMPONENT
 *
 * Профессиональные Lottie анимации от After Effects
 */

import { useEffect } from "react";
import { useLottie } from "lottie-react";

interface LottieAnimationProps {
  /** URL или путь к JSON файлу анимации */
  animationData: object;
  /** Ширина контейнера */
  width?: number | string;
  /** Высота контейнера */
  height?: number | string;
  /** Зациклить? */
  loop?: boolean;
  /** Автостарт? */
  autoplay?: boolean;
  /** Класс для стилизации */
  className?: string;
  /** Скорость воспроизведения */
  speed?: number;
}

export function LottieAnimation({
  animationData,
  width = "100%",
  height = "100%",
  loop = true,
  autoplay = true,
  className = "",
  speed = 1,
}: LottieAnimationProps) {
  const { View, play, stop, setSpeed } = useLottie({
    animationData,
    loop,
    autoplay,
    style: { width, height },
  });

  useEffect(() => {
    setSpeed(speed);
  }, [speed, setSpeed]);

  return (
    <div className={`lottie-container ${className}`} style={{ width, height }} aria-hidden="true">
      {View}
    </div>
  );
}

/** Анимация загрузки для страниц */
export function LoadingAnimation() {
  return (
    <div className="flex items-center justify-center p-8">
      <LottieAnimation animationData={{}} width={120} height={120} loop autoplay />
    </div>
  );
}

/** Анимация успешной отправки формы */
export function SuccessAnimation() {
  return <LottieAnimation animationData={{}} width={200} height={200} loop={false} autoplay />;
}

/** Декоративная анимация для hero секции */
export function HeroDecoration() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
      <LottieAnimation animationData={{}} width="100%" height="100%" loop autoplay />
    </div>
  );
}
