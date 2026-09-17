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

interface Subcourse {
  id: number;
  course: number;
  title: string;
}

interface Props {
  profile: InstituteProfile;
  branding: InstituteBranding;
  courses: Course[];
  subcourses: Subcourse[];

  onEditProfile: () => void;
  onEditBranding: () => void;
}

export default function CompletedDashboard({
 profile,
  branding,
  courses,
  subcourses,
  onEditProfile,
  onEditBranding,
}: Props) {
  return (
    <div className="space-y-8 p-5">

      {/* Success Banner */}

      <div className="overflow-hidden rounded-3xl border border-success/30 bg-success/10">

        <div className="flex items-center gap-5 p-8">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-success text-3xl text-success-foreground shadow-lg">
            ✓
          </div>

          <div>

            <h1 className="text-3xl font-black text-foreground">
              آموزشگاه شما با موفقیت تکمیل شد
            </h1>

            <p className="mt-2 text-muted-foreground">
              اطلاعات پروفایل و برند آموزشگاه توسط مدیر تایید شده و اکنون
              آموزشگاه شما آماده نمایش در سامانه است.
            </p>

          </div>

        </div>

      </div>

      {/* Cards */}

      <div className="grid gap-8 xl:grid-cols-2">

<div>
          <ProfileSummaryCard profile={profile} logoUrl={branding.logo} />
  <button
    onClick={onEditProfile}
    className="rounded-xl border mt-5 w-full border-border bg-transparent px-5 py-3 font-medium text-foreground transition hover:bg-surface cursor-pointer"
  >
    ویرایش اطلاعات آموزشگاه
  </button>
</div>
<div>
          <BrandingSummaryCard
          branding={branding}
          courses={courses}
          subcourses={subcourses}
        />
  <button
    onClick={onEditBranding}
    className="rounded-xl border mt-5 w-full border-border bg-transparent px-5 py-3 font-medium text-foreground transition hover:bg-surface cursor-pointer"
  >
    ویرایش برند آموزشگاه
  </button>
</div>
      </div>

    </div>
  );
}