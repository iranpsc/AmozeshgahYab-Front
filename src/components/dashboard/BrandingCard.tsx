"use client";

import Button from "@/components/form/Button";
import type { InstituteBranding } from "@/services/institute";

interface Course {
  id: number;
  title: string;
}

interface Props {
  branding: InstituteBranding;
  courses: Course[];
  onEdit: () => void;
}

export default function BrandingCard({
  branding,
  courses,
  onEdit,
}: Props) {
  return (
    <div className="rounded-2xl bg-white p-8 shadow">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">
            برند آموزشگاه
          </h2>

          <p className="mt-2 text-slate-500">
            اطلاعات برند ثبت شده
          </p>
        </div>

        <Button onClick={onEdit}>
          ویرایش برند
        </Button>
      </div>

      <div className="grid gap-8">

        {/* لوگو */}

        <div>
          <h3 className="mb-3 font-bold">
            لوگو
          </h3>

          {branding.logo ? (
            <img
              src={branding.logo}
              alt="لوگو"
              className="h-28 w-28 rounded-xl border object-cover"
            />
          ) : (
            <div className="rounded-xl border border-dashed p-8 text-slate-400">
              لوگویی ثبت نشده است
            </div>
          )}

          {!!branding.logo_problem && (
            <p className="mt-2 text-sm text-red-600">
              {branding.logo_problem}
            </p>
          )}
        </div>

        {/* بنر */}

        <div>
          <h3 className="mb-3 font-bold">
            بنر
          </h3>

          {branding.banner ? (
            <img
              src={branding.banner}
              alt="بنر"
              className="h-48 w-full rounded-xl border object-cover"
            />
          ) : (
            <div className="rounded-xl border border-dashed p-10 text-slate-400">
              بنری ثبت نشده است
            </div>
          )}

          {!!branding.banner_problem && (
            <p className="mt-2 text-sm text-red-600">
              {branding.banner_problem}
            </p>
          )}
        </div>

        {/* دوره‌ها */}

        <div>
          <h3 className="mb-3 font-bold">
            دوره‌های انتخاب شده
          </h3>

          <div className="flex flex-wrap gap-2">
            {branding.courses.map((courseId) => {
              const course = courses.find(
                (c) => c.id === courseId
              );

              return (
                <span
                  key={courseId}
                  className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700"
                >
                  {course?.title ?? `دوره ${courseId}`}
                </span>
              );
            })}
          </div>
        </div>

        {/* وضعیت */}

        <div>
          <h3 className="mb-2 font-bold">
            وضعیت
          </h3>

          <span className="rounded-full bg-amber-100 px-3 py-1 text-sm text-amber-700">
            {branding.status}
          </span>
        </div>

      </div>
    </div>
  );
}