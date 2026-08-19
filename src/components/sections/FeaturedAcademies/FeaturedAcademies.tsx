import { getHomeInstitutes, mapInstituteToCard } from "@/lib/academies";
import AcademyCard, { AcademyCardSkeleton } from "@/components/ui/AcademyCard";
import HorizontalSlider from "@/components/ui/HorizontalSlider";
import EmptyState from "@/components/ui/EmptyState";

const MAX_ITEMS = 10;

/**
 * async Server Component — همیشه داخل <Suspense> صدا زده بشه.
 * عمداً هیچ پارامتر شهری نمی‌گیره: مستقل از سلکشن شهر کاربره.
 */
export default async function FeaturedAcademies() {
  let academies: ReturnType<typeof mapInstituteToCard>[] = [];
  let errorMessage: string | null = null;

  try {
    const { results } = await getHomeInstitutes({ page: 1 });
    academies = results.slice(0, MAX_ITEMS).map(mapInstituteToCard);
  } catch (error) {
    console.error("FeaturedAcademies fetch failed:", error);
    errorMessage = error instanceof Error ? error.message : "خطای ناشناخته";
  }

  return (
    <div className="w-full px-4 py-8 lg:px-8">
      <h2 className="mb-5 text-lg font-bold text-foreground sm:text-xl">
        برترین آموزشگاه‌ها
      </h2>

      {errorMessage && (
        <EmptyState variant="error" title="خطا در دریافت آموزشگاه‌ها" description={errorMessage} />
      )}

      {!errorMessage && academies.length === 0 && (
        <EmptyState
          title="فعلاً آموزشگاهی ثبت نشده"
          description="به‌زودی آموزشگاه‌های برتر اینجا نمایش داده می‌شن."
        />
      )}

      {academies.length > 0 && (
        <HorizontalSlider>
          {academies.map((academy, index) => (
            <AcademyCard key={academy.id} academy={academy} priority={index === 0} badge="برتر" />
          ))}
        </HorizontalSlider>
      )}
    </div>
  );
}

/** اسکلتون کنار خودِ سکشن (فقط همینجا استفاده میشه) */
export function FeaturedAcademiesSkeleton() {
  return (
    <div className="w-full px-4 py-8 lg:px-8">
      <div className="mb-5 h-6 w-40 animate-pulse rounded bg-surface-2" />
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 4 }).map((_, i) => (
          <AcademyCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}