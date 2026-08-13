"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * NavigationMenu - навигационное меню с dropdown на базе Radix UI
 * 
 * Простое использование:
 * ```tsx
 * <NavigationMenu>
 *   <NavigationMenuList>
 *     <NavigationMenuItem>
 *       <NavigationMenuTrigger>Меню</NavigationMenuTrigger>
 *       <NavigationMenuContent>
 *         <ul className="grid gap-3 p-4">
 *           <li><a href="/menu/banquet">Банкет</a></li>
 *           <li><a href="/menu/furshet">Фуршет</a></li>
 *         </ul>
 *       </NavigationMenuContent>
 *     </NavigationMenuItem>
 *   </NavigationMenuList>
 * </NavigationMenu>
 * ```

 * Ссылка без подменю:
 * ```tsx
 * <NavigationMenuItem>
 *   <Link href="/about" legacyBehavior passHref>
 *     <NavigationMenuLink>О нас</NavigationMenuLink>
 *   </Link>
 * </NavigationMenuItem>
 * ```
 */

function NavigationMenuRoot({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof NavigationMenu.Root> & { children: ReactNode }) {
  return (
    <NavigationMenu.Root {...props}>
      {children}
      <NavigationMenuViewport className="origin-top-center" />
    </NavigationMenu.Root>
  );
}

const NavigationMenuList = NavigationMenu.List;
const NavigationMenuItem = NavigationMenu.Item;

function NavigationMenuTrigger({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof NavigationMenu.Trigger>) {
  return (
    <NavigationMenu.Trigger
      className={cn(
        "group bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent/50 inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown
        className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
    </NavigationMenu.Trigger>
  );
}

function NavigationMenuContent({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof NavigationMenu.Content>) {
  return (
    <NavigationMenu.Content
      className={cn(
        "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion=to]:fade-out data-[from=bottom]:slide-in-from-top-10 data-[from=top]:slide-in-from-bottom-10 data-[from=right]:slide-in-from-left-10 data-[from=left]:slide-in-from-right-10 data-[to=bottom]:slide-out-to-top-10 data-[to=top]:slide-out-to-bottom-10 data-[to=right]:slide-out-to-left-10 data-[to=left]:slide-out-to-right-10 top-0 left-0 w-full md:absolute md:w-auto",
        className
      )}
      {...props}
    >
      {children}
    </NavigationMenu.Content>
  );
}

function NavigationMenuLink({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof NavigationMenu.Link>) {
  return (
    <NavigationMenu.Link
      className={cn(
        "group bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none",
        className
      )}
      {...props}
    >
      {children}
    </NavigationMenu.Link>
  );
}

function NavigationMenuViewport({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof NavigationMenu.Viewport>) {
  return (
    <NavigationMenu.Viewport
      className={cn("absolute top-full left-0 flex justify-center overflow-hidden", className)}
      {...props}
    />
  );
}

export {
  NavigationMenuRoot as NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuViewport,
};
