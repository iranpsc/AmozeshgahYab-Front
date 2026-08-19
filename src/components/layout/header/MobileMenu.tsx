"use client";

import Link from "next/link";
import { FaTimes } from "react-icons/fa";
import { navItems } from "./nav-items";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function MobileMenu({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden bg-black/10 h-svh">
      <div className="absolute inset-0 " onClick={onClose} />
      <div className="absolute inset-y-0 right-0 flex w-72 flex-col bg-card p-5 shadow-lg">
        <div className="mb-6 flex items-center justify-between">
          <span className="text-base font-bold text-foreground">منو</span>
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground hover:bg-surface"
            aria-label="بستن منو"
          >
            <FaTimes size={17} />
          </button>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map((item) =>
            item.disabled ? (
              <span
                key={item.href}
                title="به‌زودی"
                aria-disabled="true"
                className="cursor-not-allowed rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground/50"
              >
                {item.label}
              </span>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-surface"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="mt-auto flex flex-col gap-2 border-t border-border pt-4">
          <Link
            href="/login"
            onClick={onClose}
            className="rounded-lg px-4 py-2.5 text-center text-sm font-medium text-foreground hover:bg-surface"
          >
            ورود
          </Link>
          <span
            title="به‌زودی"
            aria-disabled="true"
            className="cursor-not-allowed rounded-lg bg-primary/50 px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground/70"
          >
            ثبت نام
          </span>
        </div>
      </div>
    </div>
  );
}