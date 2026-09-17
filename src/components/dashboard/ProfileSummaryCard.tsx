"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import type { InstituteProfile } from "@/services/institute";

const LocationPickerMap = dynamic(
  () => import("@/components/dashboard/LocationPickerMap"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-56 w-full items-center justify-center rounded-xl border border-input bg-surface text-sm text-muted-foreground">
        در حال بارگذاری نقشه...
      </div>
    ),
  }
);

interface Props {
  profile: InstituteProfile;
  /** لوگوی برند (اگه ثبت شده باشه) — برای نمایش تو هدر به‌جای آیکون پیش‌فرض */
  logoUrl?: string | null;
}

function Item({
  title,
  value,
  dir = "rtl",
}: {
  title: string;
  value: React.ReactNode;
  dir?: "rtl" | "ltr";
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
        {title}
      </p>

      <p className="break-words text-base font-bold text-foreground" dir={dir}>
        {value || "-"}
      </p>
    </div>
  );
}

export default function ProfileSummaryCard({
  profile,
  logoUrl,
}: Props) {
  const publicUrl = profile.slug
    ? `/${profile.slug}`
    : null;

  const latitude = profile.latitude ? Number(profile.latitude) : null;
  const longitude = profile.longitude ? Number(profile.longitude) : null;
  const hasLocation = latitude !== null && longitude !== null;

  const header = (
    <div className="flex items-center gap-4">
      <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-primary-foreground/20 text-3xl">
        {logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logoUrl}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          "🏫"
        )}
      </div>

      <div>
        <h2 className="text-2xl font-black text-primary-foreground">
          اطلاعات آموزشگاه
        </h2>

        <p className="mt-1 text-sm text-primary-foreground/80">
          {publicUrl
            ? "مشخصات ثبت شده — برای مشاهده‌ی صفحه‌ی عمومی کلیک کنید"
            : "مشخصات ثبت شده آموزشگاه"}
        </p>
      </div>
    </div>
  );

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card">

      {/* Header */}

      <div className="border-b border-border bg-gradient-to-r from-primary to-primary-hover px-8 py-6">
        {publicUrl ? (
          <Link
            href={publicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block transition-opacity hover:opacity-90"
          >
            {header}
          </Link>
        ) : (
          header
        )}
      </div>

      {/* Content */}

      <div className="grid gap-5 p-8">

        <Item
          title="نام آموزشگاه"
          value={profile.institute_name}
        />
        <Link href={publicUrl || "/academies"}
          target="_blank"
          rel="noopener noreferrer">
          <Item
            title="اسلاگ (آدرس صفحه)"
            value={profile.slug}
            dir="ltr"
          />
        </Link>


        <div className="grid gap-5 md:grid-cols-2">

          <Item
            title="شماره موبایل"
            value={profile.mobile_number}
          />

          <Item
            title="تلفن ثابت"
            value={profile.landline_phone}
          />

        </div>

        <Item
          title="کد پستی"
          value={profile.postal_code}
        />

        <Item
          title="آدرس"
          value={profile.address}
        />

        {hasLocation && (
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
              موقعیت مکانی
            </p>

            <LocationPickerMap
              latitude={latitude}
              longitude={longitude}
              readOnly
            />
          </div>
        )}

        <div className="rounded-2xl border border-success/30 bg-success/10 p-5">

          <div className="flex items-center justify-between">

            <span className="font-bold text-success">
              وضعیت پروفایل
            </span>

            <span className="rounded-full bg-success px-4 py-1 text-sm font-bold text-success-foreground">
              تایید شده
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}
