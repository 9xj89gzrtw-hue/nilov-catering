"use client";

/**
 * MOBILE DRAWER (Bottom Sheet)
 *
 * Использует vaul для мобильных drawer'ов
 * Идеально для: фильтров меню, контактной формы, навигации
 *
 * Пример:
 * <MobileDrawer trigger={<button>Открыть</button>}>
 *   <div>Контент</div>
 * </MobileDrawer>
 */

import { Drawer } from "vaul";
import { X } from "lucide-react";

interface MobileDrawerProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  title?: string;
  /** Should this only render on mobile? */
  mobileOnly?: boolean;
  /** Drawer snap points */
  snapPoints?: string[];
  className?: string;
}

export function MobileDrawer({
  trigger,
  children,
  title,
  mobileOnly = true,
  snapPoints = ["80%", "100%"],
  className = "",
}: MobileDrawerProps) {
  return (
    <Drawer.Root shouldScaleBackground>
      <Drawer.Trigger asChild>{trigger}</Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-black/40" />

        <Drawer.Content
          className={`bg-background fixed right-0 bottom-0 left-0 z-50 flex max-h-[90vh] flex-col rounded-t-2xl ${mobileOnly ? "md:hidden" : ""} ${className} `}
        >
          {/* Handle */}
          <div className="flex-shrink-0 p-4 pb-0">
            <div className="bg-muted-foreground/30 mx-auto mb-4 h-1.5 w-10 rounded-full" />

            {title && (
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">{title}</h2>
                <Drawer.Close className="hover:bg-muted rounded-lg p-2 transition-colors">
                  <X className="h-5 w-5" />
                </Drawer.Close>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 pt-0">{children}</div>

          {/* Bottom safe area for mobile */}
          <div className="h-safe-area-inset-bottom flex-shrink-0" />
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

// Also export individual parts for custom usage
export { Drawer };
export default MobileDrawer;
