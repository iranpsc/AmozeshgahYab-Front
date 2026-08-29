import { getProvinces, getCities, getCourses } from "@/lib/academies";
import AcademyFiltersPanel from "./AcademyFiltersPanel";

/**
 * Server Component: دیتای نسبتاً ثابت (استان/شهر/دوره) رو سرور می‌گیره (کش ۱ ساعته)
 * تا فیلتر بدون هیچ درخواست اضافه‌ای رندر بشه. فقط تعامل (باز/بسته، انتخاب، اعمال) کلاینته.
 */
export default async function AcademyFilters() {
  const [provinces, cities, courses] = await Promise.all([
    getProvinces(),
    getCities(),
    getCourses(),
  ]);

  return <AcademyFiltersPanel provinces={provinces} cities={cities} courses={courses} />;
}

/** اسکلتون هم‌شکل، برای Suspense */
export function AcademyFiltersSkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4">
      <div className="h-5 w-20 animate-pulse rounded bg-surface-2" />
      <div className="h-11 w-full animate-pulse rounded-xl bg-surface-2" />
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-2">
          <div className="h-3 w-16 animate-pulse rounded bg-surface-2" />
          <div className="h-11 w-full animate-pulse rounded-xl bg-surface-2" />
        </div>
      ))}
      <div className="h-11 w-full animate-pulse rounded-xl bg-surface-2" />
    </div>
  );
}
