"use client";

import type { InstituteProfile } from "@/services/institute";

interface Props {
  profile: InstituteProfile;
}

function Item({
  title,
  value,
}: {
  title: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
        {title}
      </p>

      <p className="break-words text-base font-bold text-foreground">
        {value || "-"}
      </p>
    </div>
  );
}

export default function ProfileSummaryCard({
  profile,
}: Props) {
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card">

      {/* Header */}

      <div className="border-b border-border bg-gradient-to-r from-primary to-primary-hover px-8 py-6">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-foreground/20 text-3xl">
            🏫
          </div>

          <div>

            <h2 className="text-2xl font-black text-primary-foreground">
              اطلاعات آموزشگاه
            </h2>

            <p className="mt-1 text-sm text-primary-foreground/80">
              مشخصات ثبت شده آموزشگاه
            </p>

          </div>

        </div>

      </div>

      {/* Content */}

      <div className="grid gap-5 p-8">

        <Item
          title="نام آموزشگاه"
          value={profile.institute_name}
        />

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