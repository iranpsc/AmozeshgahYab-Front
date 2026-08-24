"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

/**
 * پوشاننده next-themes.
 * پیش‌فرض روی حالت سیستم (خودکار) است، اما کاربر می‌تواند با ThemeToggle
 * آن را به‌صورت دستی به لایت/دارک تغییر دهد (در localStorage ذخیره می‌شود).
 */
export function ThemeProvider({ children }: Props) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
