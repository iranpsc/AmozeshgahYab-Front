import { getHomeInstitutes, mapInstituteToListItem, DEFAULT_PAGE_SIZE } from "@/lib/academies";
import type { HomeInstituteQuery, AcademyListItemData } from "@/lib/academies";
import EmptyState from "@/components/ui/EmptyState";
import AcademyResults from "./AcademyResults";
import Pagination from "@/components/ui/Pagination";

type Props = {
  query: HomeInstituteQuery;
};

type FetchResult =
  | {
      ok: true;
      academies: AcademyListItemData[];
      apiCount: number;
      hasNext: boolean;
      hasPrevious: boolean;
      genderFiltered: boolean;
    }
  | { ok: false; message: string };

/**
 * جنسیت و ترتیب نمایش رو بک‌اند ساپورت نمی‌کنه (400 می‌ده) — پس فقط رو نتایج
 * همون صفحه‌ی گرفته‌شده اعمال می‌شن.
 */
function applyClientFilters(
  academies: AcademyListItemData[],
  query: HomeInstituteQuery
): AcademyListItemData[] {
  let list = academies;

  if (query.gender) {
    list = list.filter((a) => a.gender.kind === query.gender);
  }

  if (query.ordering === "oldest") {
    list = [...list].sort((a, b) => a.id - b.id);
  } else if (query.ordering === "name") {
    list = [...list].sort((a, b) => a.name.localeCompare(b.name, "fa"));
  }

  return list;
}

async function fetchResults(query: HomeInstituteQuery): Promise<FetchResult> {
  try {
    const { results, count, next, previous } = await getHomeInstitutes(query);
    const academies = applyClientFilters(results.map(mapInstituteToListItem), query);
    return {
      ok: true,
      academies,
      apiCount: count,
      // منبع درست بودن/نبودن صفحه‌ی بعد/قبل، فیلد next/previous خودِ API‌ـه —
      // نه یه تخمین از count/pageSize که ممکنه با pageSize واقعی بک‌اند یکی نباشه
      hasNext: Boolean(next),
      hasPrevious: Boolean(previous),
      genderFiltered: Boolean(query.gender),
    };
  } catch (error) {
    console.error("AcademyResultsData fetch failed:", error);
    return {
      ok: false,
      message: error instanceof Error ? error.message : "خطای ناشناخته",
    };
  }
}

export default async function AcademyResultsData({ query }: Props) {
  const page = query.page ?? 1;
  const result = await fetchResults(query);

  if (!result.ok) {
    return (
      <EmptyState variant="error" title="خطا در دریافت آموزشگاه‌ها" description={result.message} />
    );
  }

  const displayedCount = result.genderFiltered ? result.academies.length : result.apiCount;
  // فقط برای شماره‌های وسط pagination (تخمینیه، چون pageSize دقیق مستند نیست)
  const estimatedTotalPages = Math.max(1, Math.ceil(result.apiCount / DEFAULT_PAGE_SIZE));

  return (
    <>
      <AcademyResults
        academies={result.academies}
        totalCount={displayedCount}
        currentPage={page}
        approximateCount={result.genderFiltered}
      />
<div className="mt-5">
        <Pagination
        currentPage={page}
        totalPages={estimatedTotalPages}
        hasNext={result.hasNext}
        hasPrevious={result.hasPrevious}
      />
</div>
    </>
  );
}
