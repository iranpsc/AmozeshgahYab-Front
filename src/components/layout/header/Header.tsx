"use client";

import { useState } from "react";
import Link from "next/link";
import { FaBars, FaSearch, FaGraduationCap } from "react-icons/fa";
import { navItems } from "./nav-items";
import MobileMenu from "./MobileMenu";
import SearchModal from "@/components/ui/SearchModal";
import ThemeToggle from "./ThemeToggle";
import AcademiesMegaMenu from "./AcademiesMegaMenu";
import type { AcademyCardData } from "@/lib/academies";
import Image from "next/image";
type Props = {
  /** آموزشگاه‌های نمونه برای مگامنو، از سرور (نگاه کن HeaderServer.tsx) */
  megaMenuAcademies: AcademyCardData[];
};

export default function Header({ megaMenuAcademies }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* موبایل: همبرگر / دسکتاپ: مخفی */}
        <button
          onClick={() => setMenuOpen(true)}
          className="grid h-10 w-10 place-items-center rounded-lg text-foreground lg:hidden"
          aria-label="باز کردن منو"
        >
          <FaBars size={20} />
        </button>

        {/* لوگو */}
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-10 w-10 lg:h-12 lg:w-12 p-1 place-items-center rounded-xl bg-primary-light text-primary">
            <Image src="/images/logo.png"
            alt="amozeshgha logo"
            width={40}
            height={40}
            />
          </span>
          <span className="text-lg font-bold text-foreground">آموزشگاه‌یاب</span>
        </Link>

        {/* ناوبری دسکتاپ */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            if (item.disabled) {
              return item.href === "/academies" ? (
                <AcademiesMegaMenu key={item.href} academies={megaMenuAcademies} />
              ) : (
                <span
                  key={item.href}
                  title="به‌زودی"
                  aria-disabled="true"
                  className="cursor-not-allowed rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground/50"
                >
                  {item.label}
                </span>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* اکشن‌ها */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden h-10 w-10 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-surface hover:text-foreground sm:grid"
            aria-label="جستجو"
          >
            <FaSearch size={16} />
          </button>

          <ThemeToggle />

          <Link
            href="/login"
            className="hidden rounded-lg px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface md:inline-block"
          >
            ورود
          </Link>
          <span
            title="به‌زودی"
            aria-disabled="true"
            className="cursor-not-allowed rounded-lg bg-primary/50 px-4 py-2 text-sm font-semibold text-primary-foreground/70"
          >
            ثبت نام
          </span>

          {/* موبایل: جستجو */}
          <button
            onClick={() => setSearchOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-lg text-foreground sm:hidden"
            aria-label="جستجو"
          >
            <FaSearch size={17} />
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
