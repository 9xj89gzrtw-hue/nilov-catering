"use client";

import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * Collapsible - сворачиваемый контент на базе Radix UI
 *
 * Использование:
 * ```tsx
 * function MyComponent() {
 *   const [open, setOpen] = useState(false);
 *
 *   return (
 *     <Collapsible open={open} onOpenChange={setOpen}>
 *       <CollapsibleTrigger>
 *         Нажми чтобы {open ? 'свернуть' : 'развернуть'}
 *         <ChevronDown className={cn('h-4 w-4 transition-transform', open && 'rotate-180')} />
 *       </CollapsibleTrigger>
 *       <CollapsibleContent>
 *         Скрытый контент
 *       </CollapsibleContent>
 *     </Collapsible>
 *   );
 * }
 * ```
 */

function CollapsibleRoot({
  children,
  open,
  onOpenChange,
  ...props
}: React.ComponentPropsWithoutRef<typeof Collapsible.Root> & { children: ReactNode }) {
  return (
    <Collapsible.Root open={open} onOpenChange={onOpenChange} {...props}>
      {children}
    </Collapsible.Root>
  );
}

const CollapsibleTrigger = Collapsible.Trigger;

function CollapsibleContent({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Collapsible.Content>) {
  return (
    <Collapsible.Content
      className={cn(
        "data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="p-1">{children}</div>
    </Collapsible.Content>
  );
}

export { CollapsibleRoot as Collapsible, CollapsibleTrigger, CollapsibleContent };
