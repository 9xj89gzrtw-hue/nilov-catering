"use client";

import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/react-utils";

/**
 * Select - выпадающий список на базе Radix UI
 *
 * Использование:
 * ```tsx
 * <Select value={value} onValueChange={setValue}>
 *   <SelectTrigger>
 *     <SelectValue placeholder="Выберите опцию" />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectItem value="option-1">Опция 1</SelectItem>
 *     <SelectItem value="option-2">Опция 2</SelectItem>
 *   </SelectContent>
 * </Select>
 * ```
 */

function SelectRoot({ children, ...props }: React.ComponentPropsWithoutRef<typeof Select.Root>) {
  return <Select.Root {...props}>{children}</Select.Root>;
}

function SelectTrigger({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Select.Trigger>) {
  return (
    <Select.Trigger
      className={cn(
        "border-input bg-background ring-offset-background placeholder:text-muted-foreground flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm",
        "focus:ring-ring focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
        className
      )}
      {...props}
    >
      {children}
      <Select.Icon asChild>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </Select.Icon>
    </Select.Trigger>
  );
}

function SelectValue(props: React.ComponentPropsWithoutRef<typeof Select.Value>) {
  return <Select.Value {...props} />;
}

interface SelectContentProps extends React.ComponentPropsWithoutRef<typeof Select.Content> {
  /** Позиционирование */
  position?: "popper" | "item-aligned";
}

function SelectContent({ children, className, position = "popper", ...props }: SelectContentProps) {
  return (
    <Select.Portal>
      <Select.Content
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border shadow-md",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        {...props}
      >
        <Select.ScrollUpButton className="flex cursor-default items-center justify-center py-1">
          <ChevronUp className="h-4 w-4" />
        </Select.ScrollUpButton>
        <Select.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          )}
        >
          {children}
        </Select.Viewport>
        <Select.ScrollDownButton className="flex cursor-default items-center justify-center py-1">
          <ChevronDown className="h-4 w-4" />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select.Portal>
  );
}

interface SelectItemProps extends React.ComponentPropsWithoutRef<typeof Select.Item> {
  /** Текстовое значение для отображения */
  textValue?: string;
}

function SelectItem({ children, className, ...props }: SelectItemProps) {
  return (
    <Select.Item
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex w-full cursor-default items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <Select.ItemIndicator>
          <Check className="h-4 w-4" />
        </Select.ItemIndicator>
      </span>
      <Select.ItemText>{children}</Select.ItemText>
    </Select.Item>
  );
}

const SelectLabel = Select.Label;
const SelectSeparator = Select.Separator;
const SelectGroup = Select.Group;

export {
  SelectRoot as Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectGroup,
};
