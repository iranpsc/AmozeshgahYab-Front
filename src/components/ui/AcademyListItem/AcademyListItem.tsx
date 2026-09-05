import Image from "next/image";
import Link from "next/link";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaMobileAlt,
  FaGraduationCap,
  FaBuilding,
  FaUserFriends,
  FaMale,
  FaFemale,
} from "react-icons/fa";
import type { AcademyListItemData } from "@/lib/academies";
import BookmarkButton from "./BookmarkButton";

type Props = {
  academy: AcademyListItemData;
  /** برای اولین ردیف‌های بالای صفحه true بدید تا next/image اولویت لود بگیره */
  priority?: boolean;
  /** بج «جدیدترین» گوشه‌ی تصویر */
  isNew?: boolean;
};

const genderIcon = {
  male: FaMale,
  female: FaFemale,
  mixed: FaUserFriends,
  unknown: FaUserFriends,
} as const;

export default function AcademyListItem({ academy, priority = false, isNew = false }: Props) {
  const imageSrc = academy.imageUrl || "/default.png";
  const GenderIcon = genderIcon[academy.gender.kind];

  return (
    <Link
      href={academy.href}
      className="group relative flex flex-col lg:flex-row gap-4 rounded-2xl border border-border bg-card p-3 transition-shadow hover:shadow-[0_0_20px_0px_rgba(0,255,255,0.18)] sm:p-4"
    >
      {/* تصویر — چون dir:rtl هست، اولین child یعنی سمت راست (مطابق موکاپ) */}
      <div className="relative aspect-video lg:aspect-square w-full shrink-0 overflow-hidden rounded-xl bg-surface  lg:w-60">
        <Image
          src={imageSrc}
          alt={academy.name}
          fill
          sizes="(max-width: 640px) 96px, (max-width: 768px) 160px, 192px"
          priority={priority}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {isNew && (
          <span className="absolute right-2 top-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
            جدیدترین
          </span>
        )}
        {academy.logoUrl && (
          <span className="absolute right-2 top-1/2 grid h-14 w-14 -translate-y-1/2 place-items-center overflow-hidden rounded-xl border-2 border-card bg-card shadow sm:h-12 sm:w-12">
            <Image
              src={academy.logoUrl}
              alt=""
              width={56}
              height={56}
              className="h-full w-full object-cover"
            />
          </span>
        )}
      </div>

      {/* محتوا */}
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-start justify-between gap-2">
          <h2 className="line-clamp-1  2xl:text-xl font-bold text-foreground sm:text-base">
            {academy.name}
          </h2>
          <BookmarkButton academyId={academy.id} />
        </div>

        {(academy.coursesCount > 0 || academy.primaryCourseName) && (
          <div className="flex flex-wrap items-center gap-1.5 mt-4">
            {academy.coursesCount > 0 && (
              <span className="inline-flex items-center gap-1 rounded-md bg-surface px-2 py-1 text-[14px]  text-muted-foreground">
                <FaGraduationCap size={14} className="text-primary" />
                دوره‌های ارائه‌شده ({academy.coursesCount})
              </span>
            )}
            {academy.primaryCourseName && (
              <span className="inline-flex items-center gap-1 rounded-md bg-surface px-2 py-1 text-[14px]  font-medium text-foreground">
                <FaBuilding size={14} className="text-primary" />
                {academy.primaryCourseName}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <FaMapMarkerAlt size={14} className="shrink-0" />
          <span className="line-clamp-1">{academy.cityName}</span>
        </div>

        <div className="flex items-start gap-2 my-2 text-sm text-muted-foreground">
          <FaMapMarkerAlt size={14} className="mt-0.5 shrink-0 opacity-0" aria-hidden />
          <span className="line-clamp-1">{academy.address}</span>
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-sm text-muted-foreground">
          {academy.landlinePhone && (
            <span className="flex items-center gap-1.5" dir="ltr">
              <FaPhoneAlt size={14} />
              {academy.landlinePhone}
            </span>
          )}
          {academy.mobileNumber && (
            <span className="flex items-center gap-1.5" dir="ltr">
              <FaMobileAlt size={14} />
              {academy.mobileNumber}
            </span>
          )}
        </div>

        {(academy.subcourseTags.length > 0 || academy.gender.kind !== "unknown") && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {academy.subcourseTags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-border px-2 py-0.5 text-[14px] text-muted-foreground"
              >
                {tag}
              </span>
            ))}
            {academy.gender.kind !== "unknown" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-primary-light px-2.5 py-1 text-[14px] font-medium text-primary">
                <GenderIcon size={14} />
                {academy.gender.label}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}

/** اسکلتون هم‌سایز، برای Suspense/loading.tsx */
export function AcademyListItemSkeleton() {
  return (
    <div className="flex gap-4 rounded-2xl border border-border bg-card p-3 sm:p-4">
      <div className="aspect-square w-24 shrink-0 animate-pulse rounded-xl bg-surface-2 sm:w-40 md:w-48" />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="h-4 w-2/3 animate-pulse rounded bg-surface-2" />
        <div className="flex gap-1.5">
          <div className="h-5 w-24 animate-pulse rounded bg-surface-2" />
          <div className="h-5 w-20 animate-pulse rounded bg-surface-2" />
        </div>
        <div className="h-3 w-16 animate-pulse rounded bg-surface-2" />
        <div className="h-3 w-40 animate-pulse rounded bg-surface-2" />
        <div className="mt-auto flex gap-4 pt-1">
          <div className="h-3 w-20 animate-pulse rounded bg-surface-2" />
          <div className="h-3 w-20 animate-pulse rounded bg-surface-2" />
        </div>
      </div>
    </div>
  );
}
