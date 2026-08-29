"use client";

import { useState } from "react";
import { FaThLarge, FaList } from "react-icons/fa";
import type { AcademyListItemData } from "@/lib/academies";
import AcademyListItem from "@/components/ui/AcademyListItem";
import EmptyState from "@/components/ui/EmptyState";

type Props = {
  academies: AcademyListItemData[];
  totalCount: number;
  currentPage: number;
  /** وقتی فیلتر جنسیت فعاله، totalCount فقط مال همین صفحه‌ست نه کل نتایج بک‌اند */
  approximateCount?: boolean;
};

type ViewMode = "list" | "grid";

export default function AcademyResults({
  academies,
  totalCount,
  currentPage,
  approximateCount = false,
}: Props) {
  const [view, setView] = useState<ViewMode>("list");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          تعداد {approximateCount ? "در این صفحه" : "کل"}:{" "}
          <span className="font-bold text-foreground">{totalCount}</span> آموزشگاه
        </p>

        <div className="flex items-center gap-1 rounded-lg border border-border p-1">
          <button
            type="button"
            onClick={() => setView("grid")}
            aria-label="نمایش شبکه‌ای"
            aria-pressed={view === "grid"}
            className={`grid h-8 w-8 place-items-center rounded-md transition-colors ${
              view === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            }`}
          >
            <FaThLarge size={13} />
          </button>
          <button
            type="button"
            onClick={() => setView("list")}
            aria-label="نمایش لیستی"
            aria-pressed={view === "list"}
            className={`grid h-8 w-8 place-items-center rounded-md transition-colors ${
              view === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            }`}
          >
            <FaList size={13} />
          </button>
        </div>
      </div>

      {academies.length === 0 ? (
        <EmptyState
          title="آموزشگاهی با این فیلترها پیدا نشد"
          description="می‌تونید فیلترها رو تغییر بدید یا پاک کنید."
        />
      ) : (
        <div className={view === "grid" ? "grid grid-cols-1 gap-4 sm:grid-cols-2" : "flex flex-col gap-4"}>
          {academies.map((academy, index) => (
            <AcademyListItem
              key={academy.id}
              academy={academy}
              priority={currentPage === 1 && index < 2}
              isNew={currentPage === 1 && index < 3}
            />
          ))}
        </div>
      )}
    </div>
  );
}
