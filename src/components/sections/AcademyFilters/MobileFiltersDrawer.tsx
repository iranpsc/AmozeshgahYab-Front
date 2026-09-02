"use client";

import { useEffect, useState } from "react";
import { FaFilter, FaTimes } from "react-icons/fa";

type Props = {
  children: React.ReactNode;
};

export default function MobileFiltersDrawer({ children }: Props) {
  const [open, setOpen] = useState(false);

  // جلوگیری از اسکرول پس‌زمینه وقتی درار بازه
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex px-5 h-11 flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary text-sm font-bold text-primary-foreground"
      >
        <FaFilter size={14} />
        نمایش فیلترها
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 right-0 flex w-[85%] max-w-sm flex-col overflow-y-auto bg-background p-4 shadow-lg">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-bold text-foreground">فیلترها</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="بستن فیلترها"
                className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground hover:bg-surface"
              >
                <FaTimes size={16} />
              </button>
            </div>
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
