"use client";

import { useState } from "react";
import Image from "next/image";
import { FaInfoCircle, FaBookOpen, FaChevronDown } from "react-icons/fa";
import type { InstituteDetailData, InstituteSubcourseCard } from "@/lib/academies";

type Props = {
  institute: InstituteDetailData;
};

/** طبق حرف کاربر، هر بار ۹ تا نشون داده می‌شه/اضافه می‌شه */
const PAGE_SIZE = 9;

const CARD_CLASS =
  "flex flex-col items-center gap-2 rounded-xl border border-border p-4 text-center";

export default function InstituteSubcourses({ institute }: Props) {
  const [visibleCount, setVisibleCount] = useState(
    Math.min(PAGE_SIZE, institute.subcourses.length)
  );
  const [loadingMore, setLoadingMore] = useState(false);

  if (institute.subcourses.length === 0) return null;

  const visible = institute.subcourses.slice(0, visibleCount);
  const remaining = institute.subcourses.length - visibleCount;
  const hasMore = remaining > 0;

  const handleLoadMore = () => {
    // دیتا از همون فچ اولِ آموزشگاه از قبل local موجوده (API صفحه‌بندی جدا برای
    // زیردوره‌ها نداشت)، پس فقط reveal محلیه — ولی برای این‌که همون حس «لود شدن
    // کارت‌های جدید» که خواسته شده رو بده، یه اسکلتون کوتاه قبل از نمایش واقعی نشون می‌دیم.
    setLoadingMore(true);
    window.setTimeout(() => {
      setVisibleCount((c) => Math.min(c + PAGE_SIZE, institute.subcourses.length));
      setLoadingMore(false);
    }, 400);
  };

  return (
    <section className="rounded-2xl border border-border bg-card p-4 sm:p-6">
      <h2 className="flex items-center gap-1.5 text-base font-bold text-foreground">
        <FaInfoCircle size={20} className="text-primary text-xl" />
        زیر دوره‌های آموزشگاه
      </h2>

      <div className=" grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 mt-9">
        {visible.map((subcourse) => (
          <SubcourseCard key={subcourse.id} subcourse={subcourse} />
        ))}

        {loadingMore &&
          Array.from({ length: Math.min(PAGE_SIZE, remaining) }).map((_, i) => (
            <SubcourseCardSkeleton key={`skeleton-${i}`} />
          ))}

        {hasMore && !loadingMore && (
          <button
            type="button"
            onClick={handleLoadMore}
            className={`${CARD_CLASS} border-dashed border-primary/40 text-primary transition-colors hover:bg-primary-light`}
          >
            <span className="grid h-14 w-14 place-items-center rounded-xl bg-primary-light text-primary">
              <FaChevronDown size={20} />
            </span>
            <span className="text-sm font-bold">مشاهده بیشتر</span>
          </button>
        )}
      </div>
    </section>
  );
}

function SubcourseCard({ subcourse }: { subcourse: InstituteSubcourseCard }) {
  return (
    <div className={CARD_CLASS}>
      <span className="grid h-14 w-14 place-items-center overflow-hidden rounded-xl bg-primary-light text-primary">
        {subcourse.iconUrl ? (
          <Image src={subcourse.iconUrl} alt="" width={32} height={32} />
        ) : (
          <FaBookOpen size={24} />
        )}
      </span>
      <span className="line-clamp-2 text-sm font-bold text-foreground">{subcourse.title}</span>
    </div>
  );
}

function SubcourseCardSkeleton() {
  return (
    <div className={CARD_CLASS}>
      <span className="h-14 w-14 animate-pulse rounded-xl bg-surface-2" />
      <span className="h-4 w-16 animate-pulse rounded bg-surface-2" />
    </div>
  );
}
