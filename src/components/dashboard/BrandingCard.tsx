"use client";

import Button from "@/components/form/Button";
import type { InstituteBranding } from "@/services/institute";

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
  onEdit: () => void;
}

const STATUS_LABELS: Record<InstituteBranding["status"], string> = {
  pending: "در انتظار بررسی",
  approved: "تأیید شده",
  rejected: "رد شده",
};

const STATUS_CLASSES: Record<InstituteBranding["status"], string> = {
  pending: "bg-warning/15 text-warning",
  approved: "bg-success/15 text-success",
  rejected: "bg-danger/15 text-danger",
};

export default function BrandingCard({
  branding,
  courses,
  subcourses,
  onEdit,
}: Props) {
  return (
    <div className="rounded-2xl border border-border bg-card p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">
            برند آموزشگاه
          </h2>

          <p className="mt-2 text-muted-foreground">
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
          <h3 className="mb-3 font-bold text-foreground">
            لوگو
          </h3>

          {branding.logo ? (
            <img
              src={branding.logo}
              alt="لوگو"
              className="h-28 w-28 rounded-xl border border-border object-cover"
            />
          ) : (
            <div className="rounded-xl border border-dashed border-border p-8 text-muted-foreground">
              لوگویی ثبت نشده است
            </div>
          )}

          {!!branding.logo_problem && (
            <p className="mt-2 text-sm text-danger">
              {branding.logo_problem}
            </p>
          )}
        </div>

        {/* بنر */}

        <div>
          <h3 className="mb-3 font-bold text-foreground">
            بنر
          </h3>

          {branding.banner ? (
            <img
              src={branding.banner}
              alt="بنر"
              className="h-48 w-full rounded-xl border border-border object-cover"
            />
          ) : (
            <div className="rounded-xl border border-dashed border-border p-10 text-muted-foreground">
              بنری ثبت نشده است
            </div>
          )}

          {!!branding.banner_problem && (
            <p className="mt-2 text-sm text-danger">
              {branding.banner_problem}
            </p>
          )}
        </div>

        {/* دوره‌ها */}

        <div>
          <h3 className="mb-3 font-bold text-foreground">
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
                  className="rounded-full bg-category-blue-bg px-3 py-1 text-sm text-category-blue"
                >
                  {course?.title ?? `دوره ${courseId}`}
                </span>
              );
            })}
          </div>
        </div>

        {/* زیر دوره‌ها */}

        <div>
          <h3 className="mb-3 font-bold text-foreground">
            زیر دوره‌های انتخاب شده
          </h3>

          <div className="flex flex-wrap gap-2">
            {branding.subcourses.length > 0 ? (
              branding.subcourses.map((subcourseId) => {
                const subcourse = subcourses.find(
                  (s) => s.id === subcourseId
                );

                return (
                  <span
                    key={subcourseId}
                    className="rounded-full bg-category-purple-bg px-3 py-1 text-sm text-category-purple"
                  >
                    {subcourse?.title ?? `زیردوره ${subcourseId}`}
                  </span>
                );
              })
            ) : (
              <span className="text-muted-foreground">
                زیردوره‌ای انتخاب نشده است.
              </span>
            )}
          </div>
        </div>

        {/* وضعیت */}

        <div>
          <h3 className="mb-2 font-bold text-foreground">
            وضعیت
          </h3>

          <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${STATUS_CLASSES[branding.status]}`}
          >
            {STATUS_LABELS[branding.status] ?? branding.status}
          </span>
        </div>

      </div>
    </div>
  );
}
