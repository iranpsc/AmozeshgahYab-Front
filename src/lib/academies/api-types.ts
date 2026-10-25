/**
 * تایپ‌های خام، دقیقاً منطبق با پاسخ API (Swagger).
 * این‌ها هیچ‌وقت مستقیم به UI پاس داده نمی‌شن — همیشه از mappers.ts رد می‌شن.
 */

/**
 * شکل نرمال‌شده‌ی پاسخ صفحه‌بندی‌شده (خروجی normalizePaginated). UI فقط همین رو می‌بینه.
 */
export type PaginatedResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
  /** اگه بک‌اند تعداد کل صفحه‌ها رو بده (total_page)، دقیق‌ترین منبع همینه */
  totalPages?: number;
};

/**
 * شکل‌های خام پاسخ صفحه‌بندی‌شده‌ی بک‌اند. دو الگو واقعاً دیده شده:
 * - DRF استاندارد: { count, next, previous, results } (مثل /academy/home/)
 * - صفحه‌ی آموزشگاه: { links: { next, previous }, total_object, total_page, results }
 */
export type RawPaginated<T> = {
  results: T[];
  count?: number;
  next?: string | null;
  previous?: string | null;
  links?: { next?: string | null; previous?: string | null };
  total_object?: number;
  total_page?: number;
};

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
export type InstituteDetail = Omit<HomeInstitute, "courses" | "subcourses"> & {
  /**
   * courses/subcourses حالا مستقل از هم صفحه‌بندی می‌شن
   * (?courses_page= و ?subcourses_page=). بسته به نسخه‌ی بک‌اند ممکنه آرایه‌ی ساده
   * یا آبجکت صفحه‌بندی‌شده (count/next/previous/results) باشن؛ هر دو هندل می‌شه.
   */
  courses: Course[] | RawPaginated<Course>;
  subcourses: Subcourse[] | RawPaginated<Subcourse>;
  /** تعداد کل (اگه بک‌اند جدا بفرسته) — وگرنه از count پاسخ صفحه‌بندی‌شده خونده می‌شه */
  courses_count?: number;
  subcourses_count?: number;
  /** فیلد «درباره آموزشگاه» (همون about که تو branding هم اضافه شد) */
  about?: string;
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

export type HomeInstituteListResponse = PaginatedResponse<HomeInstitute>;

/** پارامترهای صفحه‌بندی مستقل صفحه‌ی تکی آموزشگاه */
export type InstituteDetailQuery = {
  coursesPage?: number;
  subcoursesPage?: number;
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