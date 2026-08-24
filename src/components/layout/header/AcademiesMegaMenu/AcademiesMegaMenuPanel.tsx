"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { FaChevronDown, FaArrowLeft, FaSchool } from "react-icons/fa";
import type { AcademyCardData } from "@/lib/academies";

type Props = {
  academies: AcademyCardData[];
};

const CLOSE_DELAY_MS = 150;

/**
 * ظاهرش کاملاً عادی/رنگیه (نه محو/غیرفعال)؛ فقط ناوبری واقعی نداره —
 * کارت‌ها و دکمه‌ی «مشاهده همه» عمداً div هستن، نه Link.
 */
export default function AcademiesMegaMenuPanel({ academies }: Props) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  };

  return (
    <div
      className="relative hidden lg:block"
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
      >
        آموزشگاه‌ها
        <FaChevronDown size={10} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {/* پل نامرئی بین دکمه و پنل، تا موس موقع رد شدن مسیر بسته نشه */}
      <div className={`absolute inset-x-0 top-full h-2 ${open ? "block" : "hidden"}`} />

      <div
        className={`absolute right-1/2 top-full z-50 mt-3 w-[38rem] max-w-[90vw] origin-top translate-x-1/2 transition-all duration-200 ${
          open
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
          {academies.length === 0 ? (
            <p className="px-5 py-8 text-center text-sm text-muted-foreground">
              فعلاً آموزشگاهی برای نمایش نیست
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-3 p-4">
              {academies.map((academy) => (
                <div
                  key={academy.id}
                  className="group flex flex-col overflow-hidden rounded-xl border border-border transition-shadow hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface">
                    {academy.imageUrl ? (
                      <Image
                        src={academy.imageUrl}
                        alt={academy.name}
                        fill
                        sizes="200px"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <span className="grid h-full w-full place-items-center text-muted-foreground">
                        <FaSchool size={20} />
                      </span>
                    )}
                  </div>
                  <div className="p-2.5">
                    <p className="line-clamp-1 text-xs font-bold text-foreground">
                      {academy.name}
                    </p>
                    <p className="mt-0.5 line-clamp-1 text-[11px] text-muted-foreground">
                      {academy.cityName}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-center gap-2 border-t border-border bg-surface py-3 text-sm font-medium text-primary">
            مشاهده همه آموزشگاه‌ها
            <FaArrowLeft size={12} />
          </div>
        </div>
      </div>
    </div>
  );
}