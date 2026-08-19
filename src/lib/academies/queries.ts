import { apiFetch, buildQueryString } from "./api-client";
import type {
  ApiImage,
  City,
  Course,
  HomeInstitute,
  HomeInstituteListResponse,
  HomeInstituteQuery,
  Province,
} from "./api-types";

export const DEFAULT_PROVINCE_NAME = "قزوین";

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