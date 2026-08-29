"use client";

import { useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

type Props = {
  currentPage: number;
  /** فقط برای رسم شماره‌های وسط — تخمینیه چون pageSize دقیق بک‌اند مستند نیست */
  totalPages: number;
  /** منبع درستِ فعال/غیرفعال بودن دکمه‌ی «بعدی» — از فیلد next خودِ API */
  hasNext: boolean;
  /** منبع درستِ فعال/غیرفعال بودن دکمه‌ی «قبلی» — از فیلد previous خودِ API */
  hasPrevious: boolean;
};

/** حداکثر تعداد دکمه‌ی شماره صفحه که همزمان نشون داده می‌شه */
const MAX_VISIBLE = 5;

function getVisiblePages(current: number, total: number): number[] {
  if (total <= MAX_VISIBLE) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const half = Math.floor(MAX_VISIBLE / 2);
  let start = Math.max(1, current - half);
  const end = Math.min(total, start + MAX_VISIBLE - 1);
  start = Math.max(1, end - MAX_VISIBLE + 1);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export default function Pagination({ currentPage, totalPages, hasNext, hasPrevious }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // اگه نه صفحه‌ی بعدی هست نه قبلی، و طبق شماره‌های صفحه هم فقط یه صفحه‌ایم، چیزی نشون نده
  if (totalPages <= 1 && !hasNext && !hasPrevious) return null;

  const goToPage = (page: number) => {
    if (page < 1 || page === currentPage) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: true });
    });
  };

  const visible = getVisiblePages(currentPage, Math.max(totalPages, currentPage));

  return (
    <nav
      aria-label="صفحه‌بندی"
      className={`flex items-center justify-center gap-2 pt-2 ${isPending ? "opacity-60" : ""}`}
    >
      <button
        type="button"
        onClick={() => goToPage(currentPage - 1)}
        disabled={!hasPrevious}
        className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:opacity-40"
      >
        قبلی
      </button>

      {visible[0] > 1 && (
        <>
          <button
            type="button"
            onClick={() => goToPage(1)}
            className="grid h-8 w-8 place-items-center rounded-lg text-sm text-muted-foreground hover:bg-surface"
          >
            1
          </button>
          {visible[0] > 2 && <span className="text-muted-foreground">…</span>}
        </>
      )}

      {visible.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => goToPage(page)}
          aria-current={page === currentPage ? "page" : undefined}
          className={`grid h-8 w-8 place-items-center rounded-lg text-sm font-medium transition-colors ${
            page === currentPage
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-surface"
          }`}
        >
          {page}
        </button>
      ))}

      {hasNext && visible[visible.length - 1] < totalPages && (
        <>
          {visible[visible.length - 1] < totalPages - 1 && (
            <span className="text-muted-foreground">…</span>
          )}
          <button
            type="button"
            onClick={() => goToPage(totalPages)}
            className="grid h-8 w-8 place-items-center rounded-lg text-sm text-muted-foreground hover:bg-surface"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        type="button"
        onClick={() => goToPage(currentPage + 1)}
        disabled={!hasNext}
        className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:opacity-40"
      >
        بعدی
      </button>
    </nav>
  );
}
