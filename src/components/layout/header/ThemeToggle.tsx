"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { FaSun, FaMoon } from "react-icons/fa";

/**
 * دکمه تاگل دارک/لایت.
 * پیش‌فرض تم بر اساس سیستم است؛ با کلیک، کاربر آن را دستی override می‌کند.
 */
export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // جلوگیری از mismatch هیدریشن، چون تم فقط سمت کلاینت مشخص می‌شود
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-10 w-10 rounded-lg" aria-hidden />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="grid h-10 w-10 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
      aria-label={isDark ? "فعال‌سازی حالت روشن" : "فعال‌سازی حالت تیره"}
    >
      {isDark ? <FaSun size={17} /> : <FaMoon size={16} />}
    </button>
  );
}
