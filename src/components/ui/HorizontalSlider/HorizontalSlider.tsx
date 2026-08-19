"use client";

import { useRef } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

type Props = {
  children: React.ReactNode;
};

/**
 * اسلایدر عمومی بدون کتابخانه خارجی: اسکرول native + scroll-snap.
 * دکمه‌ها فقط scrollBy صدا می‌زنن؛ swipe لمسی/موس خودش با CSS کار می‌کنه.
 * چون jsهاش خیلی کمه، بار اضافه‌ای رو باندل کلاینت نمی‌ذاره.
 * دامنه‌محور نیست (academy-agnostic) — هرجا لیست افقی لازم شد قابل استفاده‌ست.
 */
export default function HorizontalSlider({ children }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (direction: "prev" | "next") => {
    const el = scrollerRef.current;
    if (!el) return;

    const amount = el.clientWidth * 0.85;
    // چون direction: rtl هست، "بعدی" یعنی اسکرول به سمت منفی (چپ بصری)
    const delta = direction === "next" ? -amount : amount;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="flex gap-4 overflow-x-auto scroll-smooth py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {children}
      </div>

      <div className="mt-3 hidden items-center justify-end gap-2 sm:flex">
        <button
          type="button"
          onClick={() => scrollByAmount("prev")}
          className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
          aria-label="آیتم قبلی"
        >
          <FaChevronRight size={13} />
        </button>
        <button
          type="button"
          onClick={() => scrollByAmount("next")}
          className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
          aria-label="آیتم بعدی"
        >
          <FaChevronLeft size={13} />
        </button>
      </div>
    </div>
  );
}
