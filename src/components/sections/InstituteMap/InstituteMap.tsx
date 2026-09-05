import { FaMapMarkerAlt } from "react-icons/fa";
import type { InstituteDetailData } from "@/lib/academies";

type Props = {
  institute: InstituteDetailData;
};

export default function InstituteLocation({ institute }: Props) {
  const hasCoords = institute.latitude !== null && institute.longitude !== null;

  return (
    <section className="rounded-2xl border border-border bg-card p-4">
      {hasCoords && (
        <h2 className="mb-3 flex items-center gap-1.5 text-sm font-bold text-foreground">
          <FaMapMarkerAlt size={13} className="text-primary" />
          موقعیت روی نقشه
        </h2>
      )}

      {hasCoords && (
        <div className="mb-4 overflow-hidden rounded-xl border border-border">
          {/* iframe بدون نیاز به API key؛ loading="lazy" یعنی تا وقتی تو viewport نیاد
              اصلاً بارگذاری نمی‌شه — سبک‌ترین راه برای نقشه بدون اضافه‌کردن باندل JS */}
          <iframe
            title={`موقعیت ${institute.name} روی نقشه`}
            src={`https://www.google.com/maps?q=${institute.latitude},${institute.longitude}&hl=fa&z=15&output=embed`}
            className="h-48 w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      )}

      <h3 className="mb-1.5 text-sm font-bold text-foreground">آدرس</h3>
      <p className="text-xs leading-6 text-muted-foreground">{institute.address}</p>
    </section>
  );
}
