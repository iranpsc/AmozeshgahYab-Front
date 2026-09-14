import { FaMapMarkerAlt } from "react-icons/fa";
import type { InstituteDetailData } from "@/lib/academies";
import MapEmbed from "./MapEmbed";

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
          {/* تا وقتی کاربر کلیک نکنه iframe گوگل مپ اصلاً لود نمی‌شه — چون خودِ
              iframe (حتی با loading="lazy") به‌محض mount شدن کوکی‌های
              third-party گوگل رو ست می‌کنه؛ این الگوی click-to-load دقیقاً
              همون چیزیه که PageSpeed زیر «Uses third-party cookies» می‌خواد. */}
          <MapEmbed
            title={`موقعیت ${institute.name} روی نقشه`}
            latitude={institute.latitude!}
            longitude={institute.longitude!}
          />
        </div>
      )}

      <h3 className="mb-1.5 text-sm font-bold text-foreground">آدرس</h3>
      <p className="text-xs leading-6 text-muted-foreground">{institute.address}</p>
    </section>
  );
}
