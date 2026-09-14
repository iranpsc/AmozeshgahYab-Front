"use client";

import type {
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
  branding: InstituteBranding;
  courses: Course[];
  subcourses: Subcourse[];
}

export default function BrandingSummaryCard({
  branding,
  courses,
  subcourses,
}: Props) {
  const selectedCourses = courses.filter((course) =>
    branding.courses.includes(course.id)
  );

  const selectedSubcourses = subcourses.filter((subcourse) =>
    branding.subcourses.includes(subcourse.id)
  );

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card">

      {/* Header */}

      <div className="border-b border-border bg-gradient-to-r from-primary to-primary-hover px-8 py-6">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-foreground/20 text-3xl">
            🎨
          </div>

          <div>

            <h2 className="text-2xl font-black text-primary-foreground">
              برند آموزشگاه
            </h2>

            <p className="mt-1 text-sm text-primary-foreground/80">
              اطلاعات برند تایید شده
            </p>

          </div>

        </div>

      </div>

      {/* Body */}

      <div className="space-y-8 p-8">

        {/* Logo */}

        <div>

          <h3 className="mb-3 font-bold text-foreground">
            لوگو
          </h3>

          {branding.logo ? (
            <img
              src={branding.logo}
              alt="Logo"
              className="h-28 w-28 rounded-2xl border border-border object-cover"
            />
          ) : (
            <div className="flex h-28 w-28 items-center justify-center rounded-2xl border border-dashed border-border bg-muted text-muted-foreground">
              بدون لوگو
            </div>
          )}

        </div>

        {/* Banner */}

        <div>

          <h3 className="mb-3 font-bold text-foreground">
            بنر
          </h3>

          {branding.banner ? (
            <img
              src={branding.banner}
              alt="Banner"
              className="h-56 w-full rounded-2xl border border-border object-cover"
            />
          ) : (
            <div className="flex h-56 items-center justify-center rounded-2xl border border-dashed border-border bg-muted text-muted-foreground">
              بدون بنر
            </div>
          )}

        </div>

        {/* Courses */}

        <div>

          <h3 className="mb-4 font-bold text-foreground">
            دوره‌های آموزشی
          </h3>

          <div className="flex flex-wrap gap-3">

            {selectedCourses.length > 0 ? (
              selectedCourses.map((course) => (
                <span
                  key={course.id}
                  className="rounded-full bg-category-blue-bg px-4 py-2 text-sm font-bold text-category-blue"
                >
                  {course.title}
                </span>
              ))
            ) : (
              <span className="text-muted-foreground">
                دوره‌ای انتخاب نشده است.
              </span>
            )}

          </div>

        </div>

        {/* Subcourses */}

        <div>

          <h3 className="mb-4 font-bold text-foreground">
            زیر دوره‌های آموزشی
          </h3>

          <div className="flex flex-wrap gap-3">

            {selectedSubcourses.length > 0 ? (
              selectedSubcourses.map((subcourse) => (
                <span
                  key={subcourse.id}
                  className="rounded-full bg-category-purple-bg px-4 py-2 text-sm font-bold text-category-purple"
                >
                  {subcourse.title}
                </span>
              ))
            ) : (
              <span className="text-muted-foreground">
                زیردوره‌ای انتخاب نشده است.
              </span>
            )}

          </div>

        </div>

        {/* Status */}

        <div className="rounded-2xl border border-success/30 bg-success/10 p-5">

          <div className="flex items-center justify-between">

            <span className="font-bold text-success">
              وضعیت برند
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
