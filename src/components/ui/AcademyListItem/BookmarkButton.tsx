"use client";

import { useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

type Props = {
  academyId: number;
};

/**
 * فعلاً ذخیره‌سازی نشدنیه (API نشونه/علاقه‌مندی مستند نبود) — فقط toggle بصریه.
 * جدا از AcademyListItem نگه داشته شده تا خود کارت Server Component بمونه
 * و باندل کلاینت فقط همین جزیره‌ی کوچیک باشه.
 */
export default function BookmarkButton({ academyId }: Props) {
  const [saved, setSaved] = useState(false);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        setSaved((v) => !v);
      }}
      aria-pressed={saved}
      aria-label={saved ? "حذف از نشان‌شده‌ها" : "نشان کردن آموزشگاه"}
      data-academy-id={academyId}
      className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-card/80 text-muted-foreground backdrop-blur transition-colors hover:text-primary"
    >
      {saved ? (
        <FaBookmark size={14} className="text-primary" />
      ) : (
        <FaRegBookmark size={14} />
      )}
    </button>
  );
}
