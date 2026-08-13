"use client";

import * as Popover from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * Popover - всплывающий панель на базе Radix UI
 *
 * Использование:
 * ```tsx
 * <Popover>
 *   <PopoverTrigger asChild>
 *     <button>Открыть popover</button>
 *   </PopoverTrigger>
 *   <PopoverContent>
 *     <p>Контент внутри popover</p>
 *   </PopoverContent>
 * </Popover>
 * ```
 */

function PopoverRoot({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Popover.Root> & { children: ReactNode }) {
  return <Popover.Root {...props}>{children}</Popover.Root>;
}

const PopoverTrigger = Popover.Trigger;

function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Popover.Content>) {
  return (
    <Popover.Portal>
      <Popover.Content
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "bg-background text-popover-foreground z-50 w-72 rounded-md border p-4 shadow-md outline-none",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-side=bottom:slide-in-from-top-2 data-side=left:slide-in-from-right-2",
          "data-side=right:slide-in-from-left-2 data-side=top:slide-in-from-bottom-2",
          className
        )}
        {...props}
      >
        {children}
      </Popover.Content>
    </Popover.Portal>
  );
}

export { PopoverRoot as Popover, PopoverTrigger, PopoverContent };
