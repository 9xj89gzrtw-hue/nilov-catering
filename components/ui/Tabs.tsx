"use client";

import * as RadixTabs from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

/**
 * Tabs - вкладки на базе Radix UI
 *
 * Использование:
 * ```tsx
 * <Tabs defaultValue="tab-1">
 *   <TabsList>
 *     <TabsTrigger value="tab-1">Вкладка 1</TabsTrigger>
 *     <TabsTrigger value="tab-2">Вкладка 2</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab-1">
 *     Контент первой вкладки
 *   </TabsContent>
 *   <TabsContent value="tab-2">
 *     Контент второй вкладки
 *   </TabsContent>
 * </Tabs>
 * ```
 */

function Tabs({
  defaultValue,
  value,
  onValueChange,
  children,
  className,
}: React.ComponentPropsWithoutRef<typeof RadixTabs.Root> & {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}) {
  return (
    <RadixTabs.Root
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
      className={className}
    >
      {children}
    </RadixTabs.Root>
  );
}

function TabsList({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadixTabs.List>) {
  return (
    <RadixTabs.List
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-10 items-center justify-center rounded-lg p-1",
        className
      )}
      {...props}
    >
      {children}
    </RadixTabs.List>
  );
}

function TabsTrigger({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadixTabs.Trigger>) {
  return (
    <RadixTabs.Trigger
      className={cn(
        "ring-offset-background inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-all",
        "focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
        "disabled:pointer-events-none disabled:opacity-50",
        "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </RadixTabs.Trigger>
  );
}

function TabsContent({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadixTabs.Content>) {
  return (
    <RadixTabs.Content
      className={cn(
        "ring-offset-background focus-visible:ring-ring mt-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
        className
      )}
      {...props}
    >
      {children}
    </RadixTabs.Content>
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
