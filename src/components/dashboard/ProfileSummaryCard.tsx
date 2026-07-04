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
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">
        {title}
      </p>

      <p className="break-words text-base font-bold text-slate-800">
        {value || "-"}
      </p>
    </div>
  );
}

export default function ProfileSummaryCard({
  profile,
}: Props) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="border-b bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-3xl">
            🏫
          </div>

          <div>

            <h2 className="text-2xl font-black text-white">
              اطلاعات آموزشگاه
            </h2>

            <p className="mt-1 text-sm text-blue-100">
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

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">

          <div className="flex items-center justify-between">

            <span className="font-bold text-emerald-700">
              وضعیت پروفایل
            </span>

            <span className="rounded-full bg-emerald-500 px-4 py-1 text-sm font-bold text-white">
              تایید شده
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}