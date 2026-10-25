import { apiFetch, buildQueryString } from "./api-client";
import type {
  ApiImage,
  City,
  Course,
  HomeInstitute,
  HomeInstituteListResponse,
  HomeInstituteQuery,
  InstituteDetail,
  InstituteDetailQuery,
  PaginatedResponse,
  Province,
  RawPaginated,
  Subcourse,
} from "./api-types";

export const DEFAULT_PROVINCE_NAME = "قزوین";

/** صفحه‌بندی: سایز صفحه تو Swagger مستند نشده — فرض DRF پیش‌فرض (۱۰). اگه بک‌اند فرق داشت همینجا عوض بشه. */
export const DEFAULT_PAGE_SIZE = 10;

export type AcademyCardData = {
  // slug: any;
  id: number;
  name: string;
  href: string;
  imageUrl: string | null;
  cityName: string;
  address: string;
  gender: string;
  tags: string[];
};

export type GenderInfo = {
  /** مقدار خام برگشتی از API */
  raw: string;
  /** برچسب فارسی قابل‌نمایش */
  label: string;
  /** برای انتخاب آیکون مناسب تو UI */
  kind: "male" | "female" | "mixed" | "unknown";
};

export type AcademyListItemData = {
  id: number;
  slug: string;
  href: string;
  name: string;
  imageUrl: string | null;
  /** لوگوی مجزا از بنر — همون بج‌آیکون گرد روی تصویر تو موکاپ */
  logoUrl: string | null;
  gender: GenderInfo;
  provinceName: string;
  cityName: string;
  address: string;
  landlinePhone: string;
  mobileNumber: string;
  coursesCount: number;
  primaryCourseName: string | null;
  subcourseTags: string[];
};

/**
 * ورودی را به شکل صفحه‌بندی‌شده‌ی یکسان نرمال می‌کند. بک‌اند ممکنه آرایه‌ی ساده،
 * شکل DRF (count/next/previous) یا شکل links/total_object/total_page بده؛
 * همه‌شون بدون فرض خاصی هندل می‌شن.
 */
export function normalizePaginated<T>(
  value: T[] | RawPaginated<T> | PaginatedResponse<T> | null | undefined
): PaginatedResponse<T> {
  if (Array.isArray(value)) {
    return { count: value.length, next: null, previous: null, results: value };
  }
  if (value && Array.isArray(value.results)) {
    const raw = value as RawPaginated<T>;
    return {
      count: raw.count ?? raw.total_object ?? raw.results.length,
      next: raw.next ?? raw.links?.next ?? null,
      previous: raw.previous ?? raw.links?.previous ?? null,
      results: raw.results,
      totalPages: raw.total_page,
    };
  }
  return { count: 0, next: null, previous: null, results: [] };
}

/** سقف ایمنی برای جلوگیری از حلقه‌ی بی‌پایان اگه بک‌اند next اشتباه برگردونه */
const MAX_PAGES_TO_FETCH = 50;

/**
 * همه‌ی صفحه‌های یه endpoint صفحه‌بندی‌شده رو می‌گیره.
 * اگه بک‌اند تعداد کل صفحه‌ها (total_page) رو بده، صفحه‌های ۲ به بعد همزمان (موازی)
 * گرفته می‌شن، نه پشت‌سرهم؛ وگرنه next رو دنبال می‌کنیم.
 * فقط جاهایی استفاده بشه که واقعاً کل لیست لازمه (select فیلترها)؛ برای نمایش از *Page استفاده کنید.
 */
async function fetchAllPages<T>(
  fetchPage: (page: number) => Promise<T[] | RawPaginated<T>>
): Promise<T[]> {
  const first = normalizePaginated(await fetchPage(1));
  const all: T[] = [...first.results];
  if (!first.next) return all;

  if (first.totalPages && first.totalPages > 1) {
    const lastPage = Math.min(first.totalPages, MAX_PAGES_TO_FETCH);
    const rest = await Promise.all(
      Array.from({ length: lastPage - 1 }, (_, i) => fetchPage(i + 2))
    );
    for (const data of rest) all.push(...normalizePaginated(data).results);
    return all;
  }

  for (let page = 2; page <= MAX_PAGES_TO_FETCH; page++) {
    const data = normalizePaginated(await fetchPage(page));
    all.push(...data.results);
    if (!data.next) break;
  }
  return all;
}

/** GET /academy/cities/?page=N — شهرها به‌ندرت عوض می‌شن، کش ۱ ساعته */
export async function getCitiesPage(page?: number): Promise<PaginatedResponse<City>> {
  const qs = buildQueryString({ page });
  const data = await apiFetch<City[] | RawPaginated<City>>(`/academy/cities/${qs}`, {
    revalidateSeconds: 3600,
  });
  return normalizePaginated(data);
}

/** همه‌ی شهرها (همه‌ی صفحه‌ها) — برای select فیلترها */
export async function getCities(): Promise<City[]> {
  return fetchAllPages((page) =>
    apiFetch<City[] | RawPaginated<City>>(`/academy/cities/${buildQueryString({ page })}`, {
      revalidateSeconds: 3600,
    })
  );
}

/** GET /academy/provinces/ — استان‌ها ثابتن، کش ۱ ساعته */
export async function getProvinces(): Promise<Province[]> {
  return apiFetch<Province[]>("/academy/provinces/", { revalidateSeconds: 3600 });
}

/** GET /academy/home/ */
export async function getHomeInstitutes(
  query: HomeInstituteQuery = {},
  options: { signal?: AbortSignal } = {}
): Promise<HomeInstituteListResponse> {
  // نکته مهم: province/city/courses/subcourses/search/page طبق Swagger واقعاً
  // پارامترهای بک‌اندن. gender و ordering امتحان شدن و بک‌اند روشون 400 برمی‌گردونه
  // (یعنی برخلاف رفتار معمول DRF، پارامتر ناشناخته رو رد می‌کنه، نه نادیده)؛
  // پس اصلاً به API فرستاده نمی‌شن — فیلتر/مرتب‌سازی جنسیت و ترتیب نمایش
  // سمت کلاینت (تو AcademyResultsData) روی همون صفحه‌ی گرفته‌شده اعمال می‌شه.
  const qs = buildQueryString({
    province: query.province,
    city: query.city,
    courses: query.courses,
    subcourses: query.subcourses,
    search: query.search,
    page: query.page,
  });

  return apiFetch<HomeInstituteListResponse>(`/academy/home/${qs}`, {
    revalidateSeconds: query.search ? 0 : 300, // نتایج سرچ نباید کش بشن
    signal: options.signal,
  });
}

/**
 * GET /academy/institute/{slug}/?courses_page=N&subcourses_page=M
 * صفحه‌بندی دوره‌ها و زیردوره‌ها کاملاً مستقله؛ هر کدوم فقط وقتی تعریف شده باشه
 * به URL اضافه می‌شه (پس بدون پارامتر، همون درخواست قبلی/کش‌شده می‌ره).
 */
export async function getInstituteBySlug(
  slug: string,
  query: InstituteDetailQuery = {}
): Promise<InstituteDetail> {
  const qs = buildQueryString({
    courses_page: query.coursesPage,
    subcourses_page: query.subcoursesPage,
  });
  return apiFetch<InstituteDetail>(`/academy/institute/${encodeURIComponent(slug)}/${qs}`, {
    revalidateSeconds: 300,
  });
}

/** GET /academy/courses/?page=N — دسته‌بندی‌ها به‌ندرت عوض می‌شن، کش ۱ ساعته */
export async function getCoursesPage(page?: number): Promise<PaginatedResponse<Course>> {
  const qs = buildQueryString({ page });
  const data = await apiFetch<Course[] | RawPaginated<Course>>(`/academy/courses/${qs}`, {
    revalidateSeconds: 3600,
  });
  return normalizePaginated(data);
}

/** همه‌ی دوره‌ها (همه‌ی صفحه‌ها) — برای select فیلترها */
export async function getCourses(): Promise<Course[]> {
  return fetchAllPages((page) =>
    apiFetch<Course[] | RawPaginated<Course>>(
      `/academy/courses/${buildQueryString({ page })}`,
      { revalidateSeconds: 3600 }
    )
  );
}

/**
 * GET /academy/subcourses/?page=N[&course=<id>] — فقط یک صفحه.
 * خطا اینجا نمی‌بلعیم تا caller بتونه حالت خطای صفحه‌بندی رو نشون بده.
 */
export async function getSubcoursesPage(
  page?: number,
  courseId?: string
): Promise<PaginatedResponse<Subcourse>> {
  const qs = buildQueryString({ course: courseId, page });
  const data = await apiFetch<Subcourse[] | RawPaginated<Subcourse>>(
    `/academy/subcourses/${qs}`,
    { revalidateSeconds: 3600 }
  );
  return normalizePaginated(data);
}

/**
 * GET /academy/subcourses/?course=<id> — همه‌ی صفحه‌ها.
 * دیباگ شد: بک‌اند پارامتر ?course= رو عملاً نادیده می‌گیره و کل زیردوره‌های
 * همه‌ی دوره‌ها رو برمی‌گردونه. برای اطمینان، جواب رو خودمون هم client-side
 * بر اساس فیلد `course` فیلتر می‌کنیم تا subcourse نامرتبط با دوره‌ی انتخاب‌شده
 * هیچ‌وقت تو لیست نباشه (وگرنه ترکیب ناهم‌خوان به /academy/home/ می‌ره و 400 می‌گیره).
 * اگه endpoint خطا بده، آرایه‌ی خالی برمی‌گردونیم تا فقط فیلتر «زیردوره‌ها» مخفی بشه.
 */
export async function getSubcourses(courseId?: string): Promise<Subcourse[]> {
  try {
    const all = await fetchAllPages((page) =>
      apiFetch<Subcourse[] | RawPaginated<Subcourse>>(
        `/academy/subcourses/${buildQueryString({ course: courseId, page })}`,
        { revalidateSeconds: 3600 }
      )
    );
    if (!courseId) return all;
    return all.filter((s) => String(s.course) === courseId);
  } catch {
    return [];
  }
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

/** logo/banner ممکنه رشته باشه یا آبجکت — این تابع هر دو حالت رو هندل می‌کنه */
function resolveImageUrl(image: ApiImage): string | null {
  if (!image) return null;
  const raw = typeof image === "string" ? image : image.image ?? image.url ?? image.file;
  if (!raw) return null;
  return raw.startsWith("http") ? raw : `${API_BASE_URL}${raw}`;
}

/** برای فیلدهای URL ساده مثل Course.icon — اگه نسبی بود به base URL می‌چسبونه */
export function resolveApiUrl(path?: string | null): string | null {
  if (!path) return null;
  return path.startsWith("http") ? path : `${API_BASE_URL}${path}`;
}

/** آداپتور: API خام → دیتای UI. هیچ‌جای کامپوننت نباید اسم فیلد خام API رو ببینه. */
export function mapInstituteToCard(institute: HomeInstitute): AcademyCardData {
  return {
    id: institute.id,
    name: institute.institute_name,
    href: `/${institute.slug}`,
    imageUrl: resolveImageUrl(institute.banner) ?? resolveImageUrl(institute.logo),
    cityName: institute.city?.name || "نامشخص",
    address: institute.address,
    gender: institute.gender,
    tags: institute.courses?.map((c) => c.title).filter(Boolean) ?? [],
  };
}

/**
 * مقدار خام gender تو Swagger فقط `string` بود (بدون enum مشخص).
 * چند حالت محتمل (انگلیسی/فارسی) رو پوشش می‌دیم؛ هرچی نشناسیم همون مقدار خام نمایش داده می‌شه.
 */
function normalizeGender(raw: string): GenderInfo {
  const v = (raw || "").trim().toLowerCase();

  if (["male", "man", "مرد", "مردانه", "boys"].includes(v)) {
    return { raw, label: "مردانه", kind: "male" };
  }
  if (["female", "woman", "زن", "زنانه", "girls"].includes(v)) {
    return { raw, label: "زنانه", kind: "female" };
  }
  if (["mixed", "both", "مختلط"].includes(v)) {
    return { raw, label: "مختلط", kind: "mixed" };
  }
  return { raw, label: raw || "نامشخص", kind: "unknown" };
}

/** آداپتور برای کارت ردیفی صفحه‌ی «همه آموزشگاه‌ها» */
export function mapInstituteToListItem(institute: HomeInstitute): AcademyListItemData {
  return {
    id: institute.id,
    slug: institute.slug,
    href: `/${institute.slug}`,
    name: institute.institute_name,
    imageUrl: resolveImageUrl(institute.banner) ?? resolveImageUrl(institute.logo),
    logoUrl: resolveImageUrl(institute.logo),
    gender: normalizeGender(institute.gender),
    provinceName: institute.province?.name || "",
    cityName: institute.city?.name || "نامشخص",
    address: institute.address,
    landlinePhone: institute.landline_phone,
    mobileNumber: institute.mobile_number,
    coursesCount: institute.courses?.length ?? 0,
    primaryCourseName: institute.courses?.[0]?.title ?? null,
    subcourseTags: institute.subcourses?.map((s) => s.title).filter(Boolean) ?? [],
  };
}

export type InstituteCourseCard = {
  id: number;
  title: string;
  iconUrl: string | null;
  /**
   * تعداد زیردوره‌های همین آموزشگاه که به این دوره تعلق دارن. وقتی زیردوره‌ها
   * صفحه‌بندی می‌شن فقط صفحه‌ی جاری دست ماست و شمارش دقیق ممکن نیست؛ تو اون حالت
   * null می‌شه و UI چیزی نشون نمی‌ده (به‌جای عدد غلط).
   */
  subcoursesCount: number | null;
};

/** وضعیت صفحه‌بندی یک بخش (دوره‌ها یا زیردوره‌ها) تو صفحه‌ی آموزشگاه */
export type SectionPagination = {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
};

/**
 * pageSize بک‌اند مستند نیست؛ تا جای ممکن از خودِ پاسخ استخراجش می‌کنیم:
 * - next داریم → صفحه‌ی جاری پُره، پس pageSize = تعداد نتایج همین صفحه
 * - آخرین صفحه (page>1) → صفحه‌های قبلی همه پُرن، پس pageSize = (count - نتایج این صفحه) / (page - 1)
 * - صفحه‌ی اول و بدون next → فقط یک صفحه
 */
function estimateTotalPages(page: number, data: PaginatedResponse<unknown>): number {
  // اگه بک‌اند total_page رو بده، همون منبع درسته و تخمین لازم نیست
  if (typeof data.totalPages === "number" && data.totalPages > 0) {
    return Math.max(page, data.totalPages);
  }
  const hasNext = Boolean(data.next);
  if (page === 1 && !hasNext) return 1;

  let pageSize = DEFAULT_PAGE_SIZE;
  if (hasNext && data.results.length > 0) {
    pageSize = data.results.length;
  } else if (!hasNext && page > 1) {
    const derived = (data.count - data.results.length) / (page - 1);
    if (Number.isFinite(derived) && derived > 0) pageSize = derived;
  }
  return Math.max(page, Math.ceil(data.count / pageSize));
}

function toSectionPagination(page: number, data: PaginatedResponse<unknown>): SectionPagination {
  return {
    currentPage: page,
    totalPages: estimateTotalPages(page, data),
    hasNext: Boolean(data.next),
    hasPrevious: Boolean(data.previous) || page > 1,
  };
}

export type InstituteSubcourseCard = {
  id: number;
  title: string;
  iconUrl: string | null;
};

export type InstituteDetailData = {
  id: number;
  slug: string;
  name: string;
  imageUrl: string | null;
  logoUrl: string | null;
  gender: GenderInfo;
  provinceName: string;
  cityName: string;
  address: string;
  landlinePhone: string;
  mobileNumber: string;
  latitude: number | null;
  longitude: number | null;
  /** دوره‌های صفحه‌ی جاری (?courses_page=) */
  courses: InstituteCourseCard[];
  /** زیردوره‌های صفحه‌ی جاری (?subcourses_page=) */
  subcourses: InstituteSubcourseCard[];
  /** تعداد کل دوره‌ها/زیردوره‌ها (نه فقط صفحه‌ی جاری) */
  coursesCount: number;
  subcoursesCount: number;
  coursesPagination: SectionPagination;
  subcoursesPagination: SectionPagination;
  // فیلدهای زیر تو اسکیمای رسمی نبودن — اگه مقدار نداشته باشن (undefined)، بخش
  // مربوطه‌شون تو UI اصلاً رندر نمی‌شه
  description?: string;
  rating?: number;
  reviewsCount?: number;
  establishedYear?: string;
  website?: string;
  isVerified?: boolean;
  attendanceType?: string;
  instagram?: string;
  telegram?: string;
  whatsapp?: string;
};

/** آداپتور برای صفحه‌ی تکی آموزشگاه */
export function mapInstituteToDetail(
  institute: InstituteDetail,
  query: InstituteDetailQuery = {}
): InstituteDetailData {
  const lat = Number(institute.latitude);
  const lng = Number(institute.longitude);

  const coursesPageNo = query.coursesPage ?? 1;
  const subcoursesPageNo = query.subcoursesPage ?? 1;

  const coursesData = normalizePaginated(institute.courses);
  const subcoursesData = normalizePaginated(institute.subcourses);
  // اگه زیردوره‌ها آرایه‌ی کامل باشن (بدون صفحه‌بندی)، شمارش دقیق هر دوره ممکنه
  const subcoursesAreComplete = Array.isArray(institute.subcourses);

  return {
    id: institute.id,
    slug: institute.slug,
    name: institute.institute_name,
    imageUrl: resolveImageUrl(institute.banner) ?? resolveImageUrl(institute.logo),
    logoUrl: resolveImageUrl(institute.logo),
    gender: normalizeGender(institute.gender),
    provinceName: institute.province?.name || "",
    cityName: institute.city?.name || "نامشخص",
    address: institute.address,
    landlinePhone: institute.landline_phone,
    mobileNumber: institute.mobile_number,
    latitude: Number.isFinite(lat) ? lat : null,
    longitude: Number.isFinite(lng) ? lng : null,
    courses: coursesData.results.map((c) => ({
      id: c.id,
      title: c.title,
      iconUrl: resolveApiUrl(c.icon),
      subcoursesCount: subcoursesAreComplete
        ? subcoursesData.results.filter((s) => s.course === c.id).length
        : null,
    })),
    subcourses: subcoursesData.results.map((s) => ({
      id: s.id,
      title: s.title,
      iconUrl: resolveApiUrl(s.icon ?? null),
    })),
    coursesCount: institute.courses_count ?? coursesData.count,
    subcoursesCount: institute.subcourses_count ?? subcoursesData.count,
    coursesPagination: toSectionPagination(coursesPageNo, coursesData),
    subcoursesPagination: toSectionPagination(subcoursesPageNo, subcoursesData),
    description: institute.about?.trim() || institute.description || undefined,
    rating: institute.rating,
    reviewsCount: institute.reviews_count,
    establishedYear: institute.established_year ? String(institute.established_year) : undefined,
    website: institute.website || undefined,
    isVerified: institute.is_verified,
    attendanceType: institute.attendance_type || undefined,
    instagram: institute.instagram || undefined,
    telegram: institute.telegram || undefined,
    whatsapp: institute.whatsapp || undefined,
  };
}
