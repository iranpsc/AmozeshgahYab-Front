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

/** شکل واقعی از لاگ بک‌اند تأیید شد: id, course, title, description, slug, icon */
export type Subcourse = {
  id: number;
  course: number;
  title: string;
  description?: string;
  slug?: string;
  icon?: string | null;
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

/**
 * پاسخ GET /academy/institute/{slug}/ — تو Swagger فرستاده‌شده courses/subcourses
 * به‌اشتباه `string` تایپ شده بودن (به‌احتمال زیاد یه محدودیت خودکارِ مستندسازی
 * سمت بک‌اند)، ولی چون همون Course[]/Subcourse[] لیست خونه‌ای هستن، از همون تایپ
 * استفاده شده. فیلدهای rating/description/established_year/website/شبکه‌های
 * اجتماعی/is_verified/attendance_type اصلاً تو اسکیمای دادهشده نبودن — این‌ها
 * optional تعریف شدن تا اگه بک‌اند واقعی داشتشون خودکار نمایش داده بشن، وگرنه
 * بخش مربوطه تو UI ساکت مخفی می‌مونه (بدون کرش و بدون دیتای ساختگی).
 */
export type InstituteDetail = HomeInstitute & {
  description?: string;
  rating?: number;
  reviews_count?: number;
  established_year?: string | number;
  website?: string;
  is_verified?: boolean;
  /** نوع برگزاری دوره‌ها، مثلاً «حضوری»/«آنلاین» — اسم فیلد واقعی تو بک‌اند مشخص نبود */
  attendance_type?: string;
  instagram?: string;
  telegram?: string;
  whatsapp?: string;
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
  /**
   * فیلتر جنسیت — تست شد و بک‌اند رو /academy/home/ ساپورتش نمی‌کنه (400 می‌ده).
   * این مقدار به API فرستاده نمی‌شه؛ فقط سمت کلاینت (روی نتایج همون صفحه) اعمال می‌شه.
   */
  gender?: string;
  /**
   * ترتیب نمایش — این هم تست شد، بک‌اند 400 می‌ده. فقط سمت کلاینت اعمال می‌شه.
   */
  ordering?: string;
};