"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * Tooltip - всплывающая подсказка на базе Radix UI
 *
 * Использование:
 * ```tsx
 * <TooltipProvider>
 *   <Tooltip>
 *     <TooltipTrigger asChild>
 *       <button>Наведи на меня</button>
 *     </TooltipTrigger>
 *     <TooltipContent>
 *       <p>Подсказка</p>
 *     </TooltipContent>
 *   </Tooltip>
 * </TooltipProvider>
 * ```
 */

function TooltipProvider({
  children,
  delayDuration = 200,
  ...props
}: React.ComponentPropsWithoutRef<typeof Tooltip.Provider>) {
  return (
    <Tooltip.Provider delayDuration={delayDuration} {...props}>
      {children}
    </Tooltip.Provider>
  );
}

function TooltipRoot({
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof Tooltip.Root>, "children"> & {
  children: ReactNode;
}) {
  return <Tooltip.Root {...props}>{children}</Tooltip.Root>;
}

const TooltipTrigger = Tooltip.Trigger;

interface TooltipContentProps extends React.ComponentPropsWithoutRef<typeof Tooltip.Content> {
  /** Сторона появления */
  side?: "top" | "right" | "bottom" | "left";
  /** Отступ от триггера */
  offset?: number;
}

function TooltipContent({ className, sideOffset = 4, children, ...props }: TooltipContentProps) {
  return (
    <Tooltip.Portal>
      <Tooltip.Content
        sideOffset={sideOffset}
        className={cn(
          "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 z-50 overflow-hidden rounded-md px-3 py-1.5 text-xs",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          "data-side=bottom:slide-in-from-top-2 data-side=left:slide-in-from-right-2",
          "data-side=right:slide-in-from-left-2 data-side=top:slide-in-from-bottom-2",
          className
        )}
        {...props}
      >
        {children}
      </Tooltip.Content>
    </Tooltip.Portal>
  );
}

export { TooltipProvider, TooltipRoot as Tooltip, TooltipTrigger, TooltipContent };
