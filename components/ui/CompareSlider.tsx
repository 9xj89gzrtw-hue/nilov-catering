"use client";

import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

/**
 * CompareSlider - before/after слайдер
 * 
 * Идеально для кейтеринга: показать "до/после" оформления мероприятия
 * 
 * Базовое использование:
 * ```tsx
 * <CompareSlider
 *   before="/images/before.jpg"
 *   after="/images/after.jpg"
 *   beforeLabel="До"
 *   afterLabel="После"
 * />
 * ```

 * С кастомным handle:
 * ```tsx
 * <CompareSlider
 *   before="/images/event-empty.jpg"
 *   after="/images/event-decorated.jpg"
 *   handle={
 *     <div className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-primary shadow-lg">
 *       <ArrowLeftRight className="h-3 w-3 text-white" />
 *     </div>
 *   }
 * />
 * ```
 */

interface CompareSliderProps {
  /** URL изображения "ДО" */
  before: string;
  /** URL изображения "ПОСЛЕ" */
  after: string;
  /** Alt текст для изображения ДО */
  beforeAlt?: string;
  /** Alt текст для изображения ПОСЛЕ */
  afterAlt?: string;
  /** Подпись для ДО */
  beforeLabel?: string;
  /** Подпись для ПОСЛЕ */
  afterLabel?: string;
  /** Кастомный handle */
  handle?: React.ReactNode;
  /** Начальная позиция (0-100) */
  defaultPosition?: number;
  /** Дополнительные классы */
  className?: string;
  /** Показывать подписи */
  showLabels?: boolean;
  /** Стиль (по умолчанию или вертикальный) */
  direction?: "horizontal" | "vertical";
}

export function CompareSlider({
  before,
  after,
  beforeAlt = "До",
  afterAlt = "После",
  beforeLabel,
  afterLabel,
  handle,
  defaultPosition = 50,
  className,
  showLabels = false,
  direction = "horizontal",
}: CompareSliderProps) {
  const isVertical = direction === "vertical";

  return (
    <div className={cn("group relative", className)}>
      <ReactCompareSlider
        itemOne={
          <ReactCompareSliderImage
            src={before}
            alt={beforeAlt}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src={after}
            alt={afterAlt}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        }
        handle={handle as ComponentProps<typeof ReactCompareSlider>["handle"]}
        defaultValue={defaultPosition}
        style={
          {
            width: "100%",
            height: isVertical ? "400px" : undefined,
            ...(isVertical ? {} : { aspectRatio: "16/9" }),
          } as React.CSSProperties
        }
        boundsPadding="0px"
        onlyHandleDraggable={false}
      />

      {showLabels && (
        <>
          {/* Label для "До" */}
          <div className="absolute top-3 left-3 rounded-md bg-black/60 px-2 py-1 text-xs text-white backdrop-blur-sm">
            {beforeLabel || "До"}
          </div>

          {/* Label для "После" */}
          <div className="absolute top-3 right-3 rounded-md bg-black/60 px-2 py-1 text-xs text-white backdrop-blur-sm">
            {afterLabel || "После"}
          </div>
        </>
      )}

      {/* Подсказка */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-md bg-black/40 px-3 py-1.5 text-xs text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
        Перетащите для сравнения
      </div>
    </div>
  );
}

/**
 * CompareSliderVertical - вертикальный вариант (для мобильных)
 */
export function CompareSliderVertical(props: Omit<CompareSliderProps, "direction">) {
  return <CompareSlider {...props} direction="vertical" />;
}
