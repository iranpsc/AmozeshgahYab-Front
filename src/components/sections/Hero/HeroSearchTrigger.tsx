"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import SearchModal from "@/components/ui/SearchModal";

/**
 * اینپوت/دکمه‌ی سرچ تو هیرو — خودش هیچ منطق جستجویی نداره،
 * فقط همون SearchModal مشترک (که تو هدر هم استفاده می‌شه) رو باز می‌کنه.
 */
export default function HeroSearchTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label="search btn"
        onClick={() => setOpen(true)}
        className="w-full flex-1 truncate bg-transparent cursor-text px-1 py-2.5 text-right text-sm text-muted-foreground focus:outline-none"
      >
        نام آموزشگاه یا دوره را جستجو کنید...
      </button>

      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="search btn"
        className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary-hover lg:w-auto"
      >
        <FaSearch size={14} />
        جستجو
      </button>

      <SearchModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
