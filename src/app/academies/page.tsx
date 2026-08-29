import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import type { HomeInstituteQuery } from "@/lib/academies";
import AcademyFilters, {
  AcademyFiltersSkeleton,
  MobileFiltersDrawer,
} from "@/components/sections/AcademyFilters";
import AcademyResultsData, {
  AcademyResultsSkeleton,
} from "@/components/sections/AcademyResults";

export const metadata: Metadata = {
  title: "همه آموزشگاه‌ها",
  description: "بهترین آموزشگاه‌های فعال در سراسر کشور را پیدا کنید.",
  alternates: { canonical: "/academies" },
};

type PageProps = {
  searchParams: Promise<{
    province?: string;
    city?: string;
    courses?: string;
    subcourses?: string;
    search?: string;
    gender?: string;
    ordering?: string;
    page?: string;
  }>;
};

export default async function AcademiesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);

  const query: HomeInstituteQuery = {
    province: params.province,
    city: params.city,
    courses: params.courses,
    subcourses: params.subcourses,
    search: params.search,
    gender: params.gender,
    ordering: params.ordering,
    page,
  };

  // کلید Suspense شامل همه‌ی پارامترهای فیلتر، تا با هر تغییری بلاک نتایج
  // دوباره از سرور استریم بشه (بدون از دست دادن اسکلتون لودینگ)
  const resultsKey = JSON.stringify(query);

  return (
    <main className="mx-auto px-4 py-6 lg:px-8 2xl:px-20">
      <nav aria-label="مسیر" className="mb-3 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-primary">
          صفحه اصلی
        </Link>
        <span>/</span>
        <span className="text-foreground">آموزشگاه‌ها</span>
      </nav>

      <div className="my-10">
        <h1 className="text-2xl 2xl:text-5xl font-bold font-rokh text-foreground sm:text-3xl">همه آموزشگاه‌ها</h1>
        <p className="mt-4 text-sm lg:text-base 2xl:text-xl text-muted-foreground">
          بهترین آموزشگاه‌های فعال در سراسر کشور را پیدا کنید.
        </p>
      </div>

      <div className="mb-4">
        <Suspense fallback={<AcademyFiltersSkeleton />}>
          <MobileFiltersDrawer>
            <AcademyFilters />
          </MobileFiltersDrawer>
        </Suspense>
      </div>

      {/*
        چون dir:rtl هست، اولین track تعریف‌شده تو grid-template-columns سمت راست
        قرار می‌گیره — برای این‌که دقیقاً مثل موکاپ (فیلتر راست، لیست چپ) بشه،
        اول ستون فیلتر (۳۲۰px) تعریف شده، بعد ستون لیست (1fr).
      */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-20">
            <Suspense fallback={<AcademyFiltersSkeleton />}>
              <AcademyFilters />
            </Suspense>
          </div>
        </aside>

        <section className="min-w-0" aria-label="لیست آموزشگاه‌ها">
          <Suspense key={resultsKey} fallback={<AcademyResultsSkeleton />}>
            <AcademyResultsData query={query} />
          </Suspense>
        </section>
      </div>
    </main>
  );
}
