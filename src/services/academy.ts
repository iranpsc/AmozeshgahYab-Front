import api from "./api";

/** ساختار صفحه‌بندی بک‌اند (DRF). اگه endpoint آرایه‌ی ساده بده هم هندل می‌شه. */
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
  totalPages?: number;
}

/** شکل خام: DRF استاندارد یا links/total_object/total_page */
interface RawPaginated<T> {
  results: T[];
  count?: number;
  next?: string | null;
  previous?: string | null;
  links?: { next?: string | null; previous?: string | null };
  total_object?: number;
  total_page?: number;
}

/** سقف ایمنی برای جلوگیری از حلقه‌ی بی‌پایان اگه بک‌اند next اشتباه برگردونه */
const MAX_PAGES_TO_FETCH = 50;

function normalize<T>(data: T[] | RawPaginated<T>): PaginatedResponse<T> {
  if (Array.isArray(data)) {
    return { count: data.length, next: null, previous: null, results: data };
  }
  const results = data?.results ?? [];
  return {
    count: data?.count ?? data?.total_object ?? results.length,
    next: data?.next ?? data?.links?.next ?? null,
    previous: data?.previous ?? data?.links?.previous ?? null,
    results,
    totalPages: data?.total_page,
  };
}

/** یک صفحه از یه endpoint صفحه‌بندی‌شده: GET {path}?page=N */
export async function getPage<T>(
  path: string,
  page?: number
): Promise<PaginatedResponse<T>> {
  const res = await api.get<T[] | RawPaginated<T>>(path, {
    params: page ? { page } : undefined,
  });
  return normalize(res.data);
}

/**
 * همه‌ی صفحه‌های یه endpoint رو می‌گیره و تو یک آرایه برمی‌گردونه. اگه بک‌اند
 * total_page بده، صفحه‌های ۲ به بعد موازی گرفته می‌شن؛ وگرنه next دنبال می‌شه.
 * برای فرم‌های داشبورد لازمه، چون چک‌باکس‌ها و برچسب‌ها کل لیست رو لازم دارن.
 */
export async function getAllPages<T>(path: string): Promise<T[]> {
  const first = await getPage<T>(path, 1);
  const all: T[] = [...first.results];
  if (!first.next) return all;

  if (first.totalPages && first.totalPages > 1) {
    const lastPage = Math.min(first.totalPages, MAX_PAGES_TO_FETCH);
    const rest = await Promise.all(
      Array.from({ length: lastPage - 1 }, (_, i) => getPage<T>(path, i + 2))
    );
    for (const data of rest) all.push(...data.results);
    return all;
  }

  for (let page = 2; page <= MAX_PAGES_TO_FETCH; page++) {
    const data = await getPage<T>(path, page);
    all.push(...data.results);
    if (!data.next) break;
  }
  return all;
}
