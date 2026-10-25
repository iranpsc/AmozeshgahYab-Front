"use client";

import { memo, useState } from "react";
import Image from "next/image";
import { FaInfoCircle, FaBookOpen, FaChevronDown } from "react-icons/fa";
import type { InstituteDetailData, InstituteSubcourseCard } from "@/lib/academies";
import { getInstituteBySlug, mapInstituteToDetail } from "@/lib/academies";

type Props = {
  institute: InstituteDetailData;
};

/** تعداد اسکلتون‌ها موقع لود (هم‌اندازه‌ی یه صفحه‌ی معمولی) */
const SKELETON_COUNT = 9;

const CARD_CLASS =
  "flex flex-col items-center gap-2 rounded-xl border border-border p-4 text-center";

/**
 * زیردوره‌ها از بک‌اند صفحه‌بندی می‌شن (?subcourses_page=)؛ دکمه‌ی «مشاهده بیشتر»
 * صفحه‌ی بعد رو می‌گیره و به لیست فعلی اضافه می‌کنه (جایگزین نمی‌شه).
 * این بخش مستقل از دوره‌هاست و پارامتر courses_page رو دست نمی‌زنه.
 */
export default function InstituteSubcourses({ institute }: Props) {
  const [items, setItems] = useState<InstituteSubcourseCard[]>(institute.subcourses);
  const [page, setPage] = useState(institute.subcoursesPagination.currentPage);
  const [hasNext, setHasNext] = useState(institute.subcoursesPagination.hasNext);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (items.length === 0) return null;

  const handleLoadMore = async () => {
    if (loadingMore) return;
    const nextPage = page + 1;

    setLoadingMore(true);
    setError(null);

    try {
      const raw = await getInstituteBySlug(institute.slug, { subcoursesPage: nextPage });
      const data = mapInstituteToDetail(raw, { subcoursesPage: nextPage });

      // dedupe با id تا اگه صفحه‌ها همپوشانی داشتن، کارت تکراری نیاد
      setItems((prev) => {
        const seen = new Set(prev.map((s) => s.id));
        return [...prev, ...data.subcourses.filter((s) => !seen.has(s.id))];
      });
      setPage(nextPage);
      setHasNext(data.subcoursesPagination.hasNext);
    } catch {
      setError("دریافت زیردوره‌های بیشتر ناموفق بود. دوباره تلاش کنید.");
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <section className="rounded-2xl border border-border bg-card p-4 sm:p-6">
      <h2 className="flex items-center gap-1.5 text-base font-bold text-foreground">
        <FaInfoCircle size={20} className="text-primary text-xl" />
        زیر دوره‌های آموزشگاه
      </h2>

      <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((subcourse) => (
          <SubcourseCard key={subcourse.id} subcourse={subcourse} />
        ))}

        {loadingMore &&
          Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <SubcourseCardSkeleton key={`skeleton-${i}`} />
          ))}

        {hasNext && !loadingMore && (
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

      {error && (
        <p role="alert" className="mt-3 text-sm font-medium text-danger">
          {error}
        </p>
      )}
    </section>
  );
}

// memo: با هر «مشاهده بیشتر» فقط کارت‌های جدید رندر بشن، نه کل لیست
const SubcourseCard = memo(function SubcourseCard({
  subcourse,
}: {
  subcourse: InstituteSubcourseCard;
}) {
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
});

function SubcourseCardSkeleton() {
  return (
    <div className={CARD_CLASS}>
      <span className="h-14 w-14 animate-pulse rounded-xl bg-surface-2" />
      <span className="h-4 w-16 animate-pulse rounded bg-surface-2" />
    </div>
  );
}
