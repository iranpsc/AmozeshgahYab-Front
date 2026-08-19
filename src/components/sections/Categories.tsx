import Link from "next/link";
import Image from "next/image";
import { FaGraduationCap } from "react-icons/fa";
import { getCourses, resolveApiUrl } from "@/lib/academies";
import EmptyState from "@/components/ui/EmptyState";

const MAX_VISIBLE = 8;

/** async Server Component — همیشه داخل <Suspense> صدا زده بشه. */
export default async function Categories() {
  let courses: Awaited<ReturnType<typeof getCourses>> = [];
  let errorMessage: string | null = null;

  try {
    courses = await getCourses();
  } catch (error) {
    console.error("Categories fetch failed:", error);
    errorMessage = error instanceof Error ? error.message : "خطای ناشناخته";
  }

  const visible = courses.slice(0, MAX_VISIBLE);
  const hasMore = courses.length > MAX_VISIBLE;

  return (
    <section className="w-full px-4 py-8 lg:px-8">
      <h2 className="mb-5 text-lg font-bold text-foreground sm:text-xl">
        دوره‌های محبوب
      </h2>

      {errorMessage && (
        <EmptyState variant="error" title="خطا در دریافت دسته‌بندی‌ها" description={errorMessage} />
      )}

      {!errorMessage && courses.length === 0 && (
        <EmptyState title="فعلاً دسته‌بندی‌ای ثبت نشده" />
      )}

      {courses.length > 0 && (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-9">
          {visible.map((course) => {
            const iconUrl = resolveApiUrl(course.icon);
            return (
              <Link
                key={course.id}
                href={`/categories/${course.slug}`}
                className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-3 text-center transition-shadow hover:shadow-md"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary-light text-primary">
                  {iconUrl ? (
                    <Image src={iconUrl} alt="" width={24} height={24} className="h-6 w-6 object-contain" />
                  ) : (
                    <FaGraduationCap size={20} />
                  )}
                </span>
                <span className="line-clamp-1 text-xs font-medium text-foreground">
                  {course.title}
                </span>
              </Link>
            );
          })}

          {hasMore && (
            <Link
              href="/categories"
              className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-3 text-center transition-shadow hover:shadow-md"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-category-slate-bg text-category-slate">
                <span className="text-lg font-bold">…</span>
              </span>
              <span className="text-xs font-medium text-foreground">سایر</span>
            </Link>
          )}
        </div>
      )}
    </section>
  );
}

/** اسکلتون کنار خودِ سکشن */
export function CategoriesSkeleton() {
  return (
    <section className="mx-auto w-full px-4 py-8 lg:px-8">
      <div className="mb-5 h-6 w-40 animate-pulse rounded bg-surface-2" />
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-9">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-3"
          >
            <div className="h-12 w-12 animate-pulse rounded-xl bg-surface-2" />
            <div className="h-3 w-10 animate-pulse rounded bg-surface-2" />
          </div>
        ))}
      </div>
    </section>
  );
}