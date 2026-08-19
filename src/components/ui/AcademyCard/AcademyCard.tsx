import Image from "next/image";
import Link from "next/link";
import { FaMapMarkerAlt } from "react-icons/fa";
import type { AcademyCardData } from "@/lib/academies";

type Props = {
  academy: AcademyCardData;

  /** برای اولین کارت‌های بالای صفحه true بدید تا next/image اولویت لود بگیره */
  priority?: boolean;

  /** بج گوشه‌ی عکس */
  badge?: string;
};

export default function AcademyCard({
  academy,
  priority = false,
  badge,
}: Props) {
  // اگر عکس API وجود نداشت، عکس پیش‌فرض استفاده می‌شود
  const imageSrc = academy.imageUrl || "/default.png";

  return (
    <Link
      href={academy.href}
      className="group flex w-64 shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-border bg-card  hover:shadow-[0_0_20px_0px_rgba(0,255,255,0.32)]   sm:w-72"
    >
      {/* Image */}
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-surface">
        <Image
          src={imageSrc}
          alt={academy.name}
          fill
          sizes="(max-width: 640px) 256px, 288px"
          priority={priority}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {badge && (
          <span className="absolute right-3 top-3 rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold text-primary-foreground">
            {badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-3.5">
        <h3 className="line-clamp-1 text-sm font-bold text-foreground">
          {academy.name}
        </h3>

        {academy.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {academy.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-surface px-2 py-0.5 text-[11px] text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center gap-1 pt-1 text-[11px] text-muted-foreground">
          <FaMapMarkerAlt size={11} />
          <span className="line-clamp-1">{academy.cityName}</span>
        </div>
      </div>
    </Link>
  );
}

/** اسکلتون هم‌سایز، کنار خودِ کارت */
export function AcademyCardSkeleton() {
  return (
    <div className="flex w-64 shrink-0 flex-col overflow-hidden rounded-2xl border border-border bg-card sm:w-72">
      <div className="aspect-[3/2] w-full animate-pulse bg-surface-2" />

      <div className="flex flex-col gap-2 p-3.5">
        <div className="h-4 w-3/4 animate-pulse rounded bg-surface-2" />

        <div className="flex gap-1.5">
          <div className="h-5 w-16 animate-pulse rounded bg-surface-2" />
          <div className="h-5 w-14 animate-pulse rounded bg-surface-2" />
        </div>

        <div className="mt-1 h-3 w-12 animate-pulse rounded bg-surface-2" />
      </div>
    </div>
  );
}