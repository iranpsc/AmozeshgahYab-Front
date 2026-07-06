"use client";

import ProfileSummaryCard from "./ProfileSummaryCard";
import BrandingSummaryCard from "./BrandingSummaryCard";

import type {
  InstituteProfile,
  InstituteBranding,
} from "@/services/institute";

interface Course {
  id: number;
  title: string;
}

interface Props {
  profile: InstituteProfile;
  branding: InstituteBranding;
  courses: Course[];

  onEditProfile: () => void;
  onEditBranding: () => void;
}

export default function CompletedDashboard({
 profile,
  branding,
  courses,
  onEditProfile,
  onEditBranding,
}: Props) {
  return (
    <div className="space-y-8 p-5">

      {/* Success Banner */}

      <div className="overflow-hidden rounded-3xl border border-emerald-200 bg-gradient-to-r from-emerald-50 via-green-50 to-teal-50">

        <div className="flex items-center gap-5 p-8">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500 text-3xl text-white shadow-lg">
            ✓
          </div>

          <div>

            <h1 className="text-3xl font-black text-slate-800">
              آموزشگاه شما با موفقیت تکمیل شد
            </h1>

            <p className="mt-2 text-slate-600">
              اطلاعات پروفایل و برند آموزشگاه توسط مدیر تایید شده و اکنون
              آموزشگاه شما آماده نمایش در سامانه است.
            </p>

          </div>

        </div>

      </div>

      {/* Cards */}

      <div className="grid gap-8 xl:grid-cols-2">

<div>
          <ProfileSummaryCard profile={profile} />
  <button
    onClick={onEditProfile}
    className="rounded-xl border mt-5 w-full border-slate-300 bg-white px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-50 cursor-pointer"
  >
    ویرایش اطلاعات آموزشگاه
  </button>
</div>
<div>
          <BrandingSummaryCard
          branding={branding}
          courses={courses}
        />
  <button
    onClick={onEditBranding}
    className="rounded-xl border mt-5 w-full border-slate-300 bg-white px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-50 cursor-pointer"
  >
    ویرایش برند آموزشگاه
  </button>
</div>
      </div>

    </div>
  );
}