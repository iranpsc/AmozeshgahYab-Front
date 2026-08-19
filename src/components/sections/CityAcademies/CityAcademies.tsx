import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { getHomeInstitutes, mapInstituteToCard } from "@/lib/academies";
import AcademyCard, { AcademyCardSkeleton } from "@/components/ui/AcademyCard";
import ViewAllCityCard from "@/components/ui/AcademyCard/ViewAllCityCard";
import HorizontalSlider from "@/components/ui/HorizontalSlider";
import EmptyState from "@/components/ui/EmptyState";

const MAX_ITEMS = 10;

type Props = {
  provinceSlug: string;
  provinceLabel: string;
};

/** Server Component: دیتا رو موقع رندر سرور می‌گیره؛ فقط اسلایدر کلاینته. */
export default async function CityAcademies({ provinceSlug, provinceLabel }: Props) {
  let academies: ReturnType<typeof mapInstituteToCard>[] = [];
  let errorMessage: string | null = null;

  try {
    const { results } = await getHomeInstitutes({ province: provinceSlug, page: 1 });
    academies = results.slice(0, MAX_ITEMS).map(mapInstituteToCard);
  } catch (error) {
    console.error("CityAcademies fetch failed:", error);
    errorMessage = error instanceof Error ? error.message : "خطای ناشناخته";
  }

  return (
    <section className="mx-auto px-4 py-8 lg:px-8">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground sm:text-xl">
          آموزشگاه‌های استان {provinceLabel}
        </h2>
        {academies.length > 0 && (
          <Link
            href={`/academies?province=${provinceSlug}`}
            className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-hover"
          >
            مشاهده همه
            <FaArrowLeft size={12} />
          </Link>
        )}
      </div>

      {errorMessage && (
        <EmptyState variant="error" title="خطا در دریافت آموزشگاه‌ها" description={errorMessage} />
      )}

      {!errorMessage && academies.length === 0 && (
        <EmptyState
          title={`توی استان ${provinceLabel} آموزشگاهی ثبت نشده`}
          description="می‌تونید استان دیگه‌ای رو از بالای صفحه انتخاب کنید."
        />
      )}

      {academies.length > 0 && (
        <HorizontalSlider>
          <ViewAllCityCard city={provinceLabel} href={`/academies?province=${provinceSlug}`} />
          {academies.map((academy, index) => (
            <AcademyCard key={academy.id} academy={academy} priority={index === 0} />
          ))}
        </HorizontalSlider>
      )}
    </section>
  );
}

/** اسکلتون کنار خودِ سکشن */
export function CityAcademiesSkeleton() {
  return (
    <section className="w-full px-4 py-8 lg:px-8">
      <div className="mb-5 flex items-center justify-between">
        <div className="h-6 w-40 animate-pulse rounded bg-surface-2" />
        <div className="h-5 w-20 animate-pulse rounded bg-surface-2" />
      </div>
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 4 }).map((_, i) => (
          <AcademyCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}