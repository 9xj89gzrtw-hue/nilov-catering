"use client";

import * as RadixAccordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Accordion - аккордеон на базе Radix UI
 * 
 * Простое использование:
 * ```tsx
 * <Accordion type="single" collapsible>
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>Заголовок</AccordionTrigger>
 *     <AccordionContent>Контент</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * ```

 * Множественное открытие:
 * ```tsx
 * <Accordion type="multiple">
 *   <AccordionItem value="item-1">...</AccordionItem>
 *   <AccordionItem value="item-2">...</AccordionItem>
 * </Accordion>
 * ```
 */

const Accordion = RadixAccordion.Root;

interface AccordionItemProps extends React.ComponentPropsWithoutRef<typeof RadixAccordion.Item> {
  /** Дополнительный класс для контейнера */
  containerClassName?: string;
}

function AccordionItem({ children, className, containerClassName, ...props }: AccordionItemProps) {
  return (
    <RadixAccordion.Item className={cn("border-border border-b", containerClassName)} {...props}>
      <div className={cn("overflow-hidden", className)}>{children}</div>
    </RadixAccordion.Item>
  );
}

interface AccordionTriggerProps extends React.ComponentPropsWithoutRef<
  typeof RadixAccordion.Trigger
> {
  /** Показывать иконку стрелки */
  showChevron?: boolean;
}

function AccordionTrigger({
  children,
  className,
  showChevron = true,
  ...props
}: AccordionTriggerProps) {
  return (
    <RadixAccordion.Header className="flex">
      <RadixAccordion.Trigger
        className={cn(
          "flex flex-1 items-center justify-between py-4 text-left font-medium transition-all",
          "hover:text-primary [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        {showChevron && (
          <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
        )}
      </RadixAccordion.Trigger>
    </RadixAccordion.Header>
  );
}

function AccordionContent({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadixAccordion.Content>) {
  return (
    <RadixAccordion.Content
      className={cn(
        "text-muted-foreground data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden transition-all",
        className
      )}
      {...props}
    >
      <div className="pt-0 pb-4">{children}</div>
    </RadixAccordion.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
