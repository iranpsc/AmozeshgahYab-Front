import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { getProvinces, getCities } from "@/lib/academies";
import type { HomeInstituteQuery } from "@/lib/academies";
import { SITE_URL, SITE_NAME, absoluteUrl } from "@/lib/site-config";
import AcademyFilters, {
  AcademyFiltersSkeleton,
  MobileFiltersDrawer,
} from "@/components/sections/AcademyFilters";
import AcademyResultsData, {
  AcademyResultsSkeleton,
} from "@/components/sections/AcademyResults";

type SearchParams = {
  province?: string;
  city?: string;
  courses?: string;
  subcourses?: string;
  search?: string;
  gender?: string;
  ordering?: string;
  page?: string;
};

type PageProps = {
  searchParams: Promise<SearchParams>;
};

const BASE_DESCRIPTION = "بهترین آموزشگاه‌های فعال در سراسر کشور را پیدا کنید.";

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);

  // اگه فیلتر شهر/استان فعاله، عنوان رو باهاش شخصی‌سازی می‌کنیم (برای دیتای provinces/cities
  // چون کش ۱ساعته‌ست و همون فچی‌ه که AcademyFilters هم می‌زنه، هزینه‌ی اضافه‌ای نداره)
  let locationLabel = "";
  if (params.city || params.province) {
    const [provinces, cities] = await Promise.all([getProvinces(), getCities()]);
    const cityName = params.city ? cities.find((c) => String(c.id) === params.city)?.name : null;
    const provinceName = params.province
      ? provinces.find((p) => String(p.id) === params.province)?.name
      : null;
    locationLabel = cityName || provinceName || "";
  }

  const title = locationLabel ? `آموزشگاه‌های ${locationLabel}` : "همه آموزشگاه‌ها";
  const description = locationLabel
    ? `بهترین آموزشگاه‌های فعال در ${locationLabel} را پیدا کنید.`
    : BASE_DESCRIPTION;

  // هر ترکیب فیلتری (search/course/subcourse/gender/ordering) محتوای متفاوتی از یه URL
  // می‌سازه؛ برای جلوگیری از duplicate content تو نتایج گوگل، این حالت‌ها noindex می‌شن
  // و canonical به همون صفحه‌ی پایه (بدون فیلتر) اشاره می‌کنه. فیلتر شهر/استان و page
  // چون محتوای معتبر و قابل ایندکس جدا هستن، ایندکس می‌مونن.
  const hasNonIndexableFilters = Boolean(
    params.search || params.courses || params.subcourses || params.gender || params.ordering
  );

  const canonicalPath = hasNonIndexableFilters
    ? "/academies"
    : `/academies${buildSearchString({ province: params.province, city: params.city, page: page > 1 ? params.page : undefined })}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalPath },
    robots: hasNonIndexableFilters
      ? { index: false, follow: true }
      : { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "fa_IR",
      url: absoluteUrl(canonicalPath),
      siteName: SITE_NAME,
      title,
      description,
    },
  };
}

function buildSearchString(params: Record<string, string | undefined>): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value) search.set(key, value);
  }
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}

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

  const resultsKey = JSON.stringify(query);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "صفحه اصلی", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "آموزشگاه‌ها", item: absoluteUrl("/academies") },
    ],
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <nav aria-label="مسیر" className="mb-3 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-primary">
          صفحه اصلی
        </Link>
        <span>/</span>
        <span className="text-foreground">آموزشگاه‌ها</span>
      </nav>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">همه آموزشگاه‌ها</h1>
        <p className="mt-1 text-sm text-muted-foreground">{BASE_DESCRIPTION}</p>
      </div>

      <div className="mb-4">
        <Suspense fallback={<AcademyFiltersSkeleton />}>
          <MobileFiltersDrawer>
            <AcademyFilters />
          </MobileFiltersDrawer>
        </Suspense>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-4">
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