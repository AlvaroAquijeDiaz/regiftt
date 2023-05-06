"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

/**
 *
 * TODO: This is throwing errors - extra attributes returned from the server ...
 * https://github.com/pacocoursey/next-themes/issues/152
 * https://github.com/vercel/next.js/issues/49350
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
