import { Suspense } from "react";

import Hero from "@/components/sections/Hero/Hero";
import Categories, { CategoriesSkeleton } from "@/components/sections/Categories";
import FeaturedAcademies, {
  FeaturedAcademiesSkeleton,
} from "@/components/sections/FeaturedAcademies";
import CityAcademies, {
  CityAcademiesSkeleton,
} from "@/components/sections/CityAcademies";
import TrustBadges from "@/components/sections/TrustBadges";
import { getProvinces, DEFAULT_PROVINCE_NAME } from "@/lib/academies";
import Articles from "@/components/sections/Articles";
import AppBanner from "@/components/sections/AppBanner";
type PageProps = {
  searchParams: Promise<{ province?: string }>;
};

export default async function HomePage({ searchParams }: PageProps) {
  const { province } = await searchParams;

  // چون API فقط id عددی استان رو قبول می‌کنه (نه اسم)، همینجا مقدار خام
  // URL رو به یک Province واقعی تبدیل می‌کنیم.
  const provinces = await getProvinces();
  const selectedProvince =
    provinces.find((p) => String(p.id) === province) ??
    provinces.find((p) => p.name === DEFAULT_PROVINCE_NAME) ??
    provinces[0];
  const provinceSlug = selectedProvince ? String(selectedProvince.id) : undefined;

  return (
    <>

      <main className="2xl:px-10">
        <Hero provinceSlug={provinceSlug} />


        {selectedProvince && (
          <Suspense key={`province-${provinceSlug}`} fallback={<CityAcademiesSkeleton />}>
            <CityAcademies
              provinceSlug={provinceSlug!}
              provinceLabel={selectedProvince.name}
            />
          </Suspense>
        )}
        <Suspense fallback={<CategoriesSkeleton />}>
          <Categories />
        </Suspense>

        <Suspense fallback={<FeaturedAcademiesSkeleton />}>
          <FeaturedAcademies />
        </Suspense>

        <TrustBadges />
        <Articles />
        <AppBanner />
      </main>
    </>
  );
}