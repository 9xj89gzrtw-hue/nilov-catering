"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ReactNode } from "react";

/**
 * ThemeProvider - обёртка для next-themes
 *
 * Использование:
 * ```tsx
 * <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
 *   {children}
 * </ThemeProvider>
 * ```
 *
 * В компонентах:
 * ```tsx
 * import { useTheme } from 'next-themes';
 * const { theme, setTheme } = useTheme();
 * ```
 */
export function ThemeProvider({
  children,
  ...props
}: { children: ReactNode } & React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
