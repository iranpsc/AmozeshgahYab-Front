/**
 * تایپ‌های خام، دقیقاً منطبق با پاسخ API (Swagger).
 * این‌ها هیچ‌وقت مستقیم به UI پاس داده نمی‌شن — همیشه از mappers.ts رد می‌شن.
 */

export type City = {
  id: number;
  name: string;
  province: number;
};

export type Province = {
  id: number;
  name: string;
};

/** مدل واقعی از GET /academy/courses/ */
export type Course = {
  id: number;
  title: string;
  description?: string;
  slug: string;
  /** URL آیکون؛ ممکنه null باشه (nullable تو Swagger) */
  icon: string | null;
};

/** شکل دقیق Subcourse تو Swagger مستند نبود؛ فرض بر همون الگوی Course گذاشته شده */
export type Subcourse = {
  id: number;
  title: string;
  description?: string;
};

/**
 * شکل دقیق logo/banner تو Swagger مشخص نبود (ممکنه رشته URL باشه یا آبجکت فایل).
 * هر دو حالت رو پشتیبانی می‌کنیم.
 */
export type ApiImage = string | { image?: string; url?: string; file?: string } | null;

export type HomeInstitute = {
  id: number;
  slug: string;
  institute_name: string;
  gender: string;
  province: Province;
  city: City;
  address: string;
  landline_phone: string;
  mobile_number: string;
  latitude: string;
  longitude: string;
  courses: Course[];
  subcourses: Subcourse[];
  logo: ApiImage;
  banner: ApiImage;
};

export type HomeInstituteListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: HomeInstitute[];
};

export type HomeInstituteQuery = {
  province?: string;
  city?: string;
  courses?: string;
  subcourses?: string;
  search?: string;
  page?: number;
};