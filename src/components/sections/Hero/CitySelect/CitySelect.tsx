import { getProvinces } from "@/lib/academies";
import ProvinceSelectDropdown from "./CitySelectDropdown";

type Props = {
  /** id عددی استانی که باید پیش‌فرض انتخاب‌شده نشون داده بشه (اگه ?province= تو URL نبود) */
  defaultProvinceId?: string;
};

/**
 * Server Component: لیست استان‌ها رو موقع رندر سرور می‌گیره (کش ۱ ساعته).
 * فقط دراپ‌داون (باز/بسته‌شدن، سرچ، آپدیت URL) کلاینته.
 */
export default async function ProvinceSelect({ defaultProvinceId }: Props) {
  const provinces = await getProvinces();
  return <ProvinceSelectDropdown provinces={provinces} defaultProvinceId={defaultProvinceId} />;
}