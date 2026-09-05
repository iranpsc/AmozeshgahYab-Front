import { getHomeInstitutes, mapInstituteToListItem, DEFAULT_PAGE_SIZE, ApiError } from "@/lib/academies";
import type { HomeInstituteQuery, AcademyListItemData } from "@/lib/academies";
import { absoluteUrl } from "@/lib/site-config";
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

const EMPTY_RESULT: FetchResult = {
  ok: true,
  academies: [],
  apiCount: 0,
  hasNext: false,
  hasPrevious: false,
  genderFiltered: false,
};

async function fetchResults(query: HomeInstituteQuery): Promise<FetchResult> {
  try {
    const { results, count, next, previous } = await getHomeInstitutes(query);
    const academies = applyClientFilters(results.map(mapInstituteToListItem), query);
    return {
      ok: true,
      academies,
      apiCount: count,
      hasNext: Boolean(next),
      hasPrevious: Boolean(previous),
      genderFiltered: Boolean(query.gender),
    };
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return EMPTY_RESULT;
    }
    console.error("AcademyResultsData fetch failed:", error);
    return {
      ok: false,
      message: error instanceof Error ? error.message : "خطای ناشناخته",
    };
  }
}

/**
 * ItemList معتبر schema.org برای همین لیستِ واقعاً رندرشده (نه دیتای فرضی) —
 * فیلدهایی که دیتا نداریم (تلفن/تصویر) اصلاً تو خروجی نمی‌ذاریم، چون مقدار
 * خالی/جعلی تو Rich Results Test ارور می‌گیره.
 */
function buildItemListSchema(academies: AcademyListItemData[], page: number) {
  const pageOffset = (page - 1) * DEFAULT_PAGE_SIZE;

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "همه آموزشگاه‌ها",
    url: absoluteUrl("/academies"),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: academies.map((academy, index) => {
        const item: Record<string, unknown> = {
          "@type": "EducationalOrganization",
          name: academy.name,
          url: absoluteUrl(academy.href),
          address: {
            "@type": "PostalAddress",
            streetAddress: academy.address,
            addressLocality: academy.cityName,
            addressRegion: academy.provinceName || undefined,
            addressCountry: "IR",
          },
        };
        const phone = academy.mobileNumber || academy.landlinePhone;
        if (phone) item.telephone = phone;
        if (academy.imageUrl) item.image = absoluteUrl(academy.imageUrl);

        return {
          "@type": "ListItem",
          position: pageOffset + index + 1,
          item,
        };
      }),
    },
  };
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
  const estimatedTotalPages = Math.max(1, Math.ceil(result.apiCount / DEFAULT_PAGE_SIZE));

  return (
    <>
      {result.academies.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildItemListSchema(result.academies, page)),
          }}
        />
      )}

      <AcademyResults
        academies={result.academies}
        totalCount={displayedCount}
        currentPage={page}
        approximateCount={result.genderFiltered}
      />
      <Pagination
        currentPage={page}
        totalPages={estimatedTotalPages}
        hasNext={result.hasNext}
        hasPrevious={result.hasPrevious}
      />
    </>
  );
}