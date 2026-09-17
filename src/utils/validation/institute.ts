export type InstituteForm = {
  institute_name: string;
  mobile_number: string;
  landline_phone: string;
  /** optional چون EditProfileForm فعلاً این فیلدها رو نمی‌فرسته — فقط CreateProfileForm ازشون استفاده می‌کنه */
  gender?: string;
  province: number;
  city: number;
  address: string;
  postal_code: string;
  latitude?: string;
  longitude?: string;
  /** اختیاریه (طبق اسکیما) — اگه خالی بمونه بک‌اند خودش می‌سازتش */
  slug?: string;
};

export type FormErrors = Record<string, string>;

/**
 * موقع تایپ تو اینپوت اسلاگ صدا زده می‌شه: فقط حروف/عدد انگلیسی و خط تیره
 * می‌مونه، بقیه (فاصله، فارسی، کاراکترهای خاص) حذف می‌شن و فاصله جای خط تیره می‌شینه.
 */
export function sanitizeSlugInput(value: string): string {
  return value
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");
}

export function validateInstitute(
  data: InstituteForm
): FormErrors {

  const errors: FormErrors = {};

  if (!data.institute_name.trim()) {
    errors.institute_name = "نام آموزشگاه الزامی است.";
  }

  if (!/^09\d{9}$/.test(data.mobile_number)) {
    errors.mobile_number =
      "شماره موبایل معتبر نیست.";
  }

  if (!/^0\d{10}$/.test(data.landline_phone)) {
    errors.landline_phone =
      "تلفن ثابت معتبر نیست.";
  }

  if (data.gender !== undefined && !data.gender) {
    errors.gender =
      "جنسیت آموزشگاه را انتخاب کنید.";
  }

  if (!data.province) {
    errors.province =
      "استان را انتخاب کنید.";
  }

  if (!data.city) {
    errors.city =
      "شهر را انتخاب کنید.";
  }

  if (!data.address.trim()) {
    errors.address =
      "آدرس الزامی است.";
  }

  if (!/^\d{10}$/.test(data.postal_code)) {
    errors.postal_code =
      "کد پستی باید ۱۰ رقم باشد.";
  }

  if (data.latitude !== undefined && (!data.latitude.trim() || Number.isNaN(Number(data.latitude)))) {
    errors.latitude =
      "عرض جغرافیایی معتبر نیست.";
  }

  if (data.longitude !== undefined && (!data.longitude.trim() || Number.isNaN(Number(data.longitude)))) {
    errors.longitude =
      "طول جغرافیایی معتبر نیست.";
  }

  // اسلاگ اختیاریه، ولی اگه پر شده باشه باید فقط حروف/عدد انگلیسی و خط تیره باشه
  if (data.slug && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(data.slug)) {
    errors.slug =
      "اسلاگ فقط می‌تواند حروف کوچک انگلیسی، عدد و خط تیره باشد.";
  }

  return errors;
}