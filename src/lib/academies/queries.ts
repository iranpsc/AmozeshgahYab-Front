import { apiFetch, buildQueryString } from "./api-client";
import type {
  ApiImage,
  City,
  Course,
  HomeInstitute,
  HomeInstituteListResponse,
  HomeInstituteQuery,
  Province,
  Subcourse,
} from "./api-types";

export const DEFAULT_PROVINCE_NAME = "قزوین";

/** صفحه‌بندی: سایز صفحه تو Swagger مستند نشده — فرض DRF پیش‌فرض (۱۰). اگه بک‌اند فرق داشت همینجا عوض بشه. */
export const DEFAULT_PAGE_SIZE = 10;

export type AcademyCardData = {
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

/** GET /academy/cities/ — شهرها به‌ندرت عوض می‌شن، کش ۱ ساعته */
export async function getCities(): Promise<City[]> {
  return apiFetch<City[]>("/academy/cities/", { revalidateSeconds: 3600 });
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

/** GET /academy/courses/ — دسته‌بندی‌ها به‌ندرت عوض می‌شن، کش ۱ ساعته */
export async function getCourses(): Promise<Course[]> {
  return apiFetch<Course[]>("/academy/courses/", { revalidateSeconds: 3600 });
}

/**
 * GET /academy/subcourses/?course=<id> — این endpoint تو Swagger ارسالی مستند نبود؛
 * فرض بر الگوی مشابه /academy/courses/ گذاشته شده. اگه بک‌اند این مسیر رو نداشته
 * باشه، خطا رو می‌بلعیم و آرایه خالی برمی‌گردونیم تا فیلتر «زیردوره‌ها» فقط
 * مخفی بشه، نه این‌که کل صفحه رو بترکونه.
 */
/**
 * GET /academy/subcourses/?course=<id> — این endpoint تو Swagger ارسالی مستند نبود.
 * دیباگ شد: بک‌اند پارامتر ?course= رو عملاً نادیده می‌گیره و همیشه کل
 * زیردوره‌های همه‌ی دوره‌ها رو برمی‌گردونه (نه فقط مال همون course). همین باعث
 * می‌شد تو فیلتر بشه یه subcourse از یه دوره‌ی دیگه انتخاب بشه و بعد ترکیب
 * courses/subcourses ناهم‌خوان به /academy/home/ بره و اونجا 400 بگیره.
 * برای اطمینان، جواب رو خودمون هم client-side بر اساس فیلد `course` فیلتر می‌کنیم
 * تا دیگه هیچ‌وقت subcourse نامرتبط با دوره‌ی انتخاب‌شده تو لیست نباشه.
 */
export async function getSubcourses(courseId?: string): Promise<Subcourse[]> {
  try {
    const qs = buildQueryString({ course: courseId });
    const all = await apiFetch<Subcourse[]>(`/academy/subcourses/${qs}`, {
      revalidateSeconds: 3600,
    });
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
    href: `/academies/${institute.slug}`,
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
    href: `/academies/${institute.slug}`,
    name: institute.institute_name,
    imageUrl: resolveImageUrl(institute.banner) ?? resolveImageUrl(institute.logo),
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