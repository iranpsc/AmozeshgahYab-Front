"use client";

import type {
  InstituteBranding,
} from "@/services/institute";

interface Course {
  id: number;
  title: string;
}

interface Props {
  branding: InstituteBranding;
  courses: Course[];
}

export default function BrandingSummaryCard({
  branding,
  courses,
}: Props) {
  const selectedCourses = courses.filter((course) =>
    branding.courses.includes(course.id)
  );

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="border-b bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-6">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-3xl">
            🎨
          </div>

          <div>

            <h2 className="text-2xl font-black text-white">
              برند آموزشگاه
            </h2>

            <p className="mt-1 text-sm text-violet-100">
              اطلاعات برند تایید شده
            </p>

          </div>

        </div>

      </div>

      {/* Body */}

      <div className="space-y-8 p-8">

        {/* Logo */}

        <div>

          <h3 className="mb-3 font-bold text-slate-700">
            لوگو
          </h3>

          {branding.logo ? (
            <img
              src={branding.logo}
              alt="Logo"
              className="h-28 w-28 rounded-2xl border object-cover shadow"
            />
          ) : (
            <div className="flex h-28 w-28 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-slate-400">
              بدون لوگو
            </div>
          )}

        </div>

        {/* Banner */}

        <div>

          <h3 className="mb-3 font-bold text-slate-700">
            بنر
          </h3>

          {branding.banner ? (
            <img
              src={branding.banner}
              alt="Banner"
              className="h-56 w-full rounded-2xl border object-cover shadow"
            />
          ) : (
            <div className="flex h-56 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-slate-400">
              بدون بنر
            </div>
          )}

        </div>

        {/* Courses */}

        <div>

          <h3 className="mb-4 font-bold text-slate-700">
            دوره‌های آموزشی
          </h3>

          <div className="flex flex-wrap gap-3">

            {selectedCourses.length > 0 ? (
              selectedCourses.map((course) => (
                <span
                  key={course.id}
                  className="rounded-full bg-violet-100 px-4 py-2 text-sm font-bold text-violet-700"
                >
                  {course.title}
                </span>
              ))
            ) : (
              <span className="text-slate-400">
                دوره‌ای انتخاب نشده است.
              </span>
            )}

          </div>

        </div>

        {/* Status */}

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">

          <div className="flex items-center justify-between">

            <span className="font-bold text-emerald-700">
              وضعیت برند
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