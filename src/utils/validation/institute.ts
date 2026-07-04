export type InstituteForm = {
  institute_name: string;
  mobile_number: string;
  landline_phone: string;
  province: number;
  city: number;
  address: string;
  postal_code: string;
};

export type FormErrors = Record<string, string>;

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

  return errors;
}