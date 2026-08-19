import { getHomeInstitutes, mapInstituteToCard } from "@/lib/academies";
import Header from "./Header";

const MEGA_MENU_PREVIEW_COUNT = 6;

/**
 * Header خودش "use client" است (به‌خاطر منوی موبایل و سرچ)، پس نمی‌تونه
 * مستقیم یه Server Component رو import/render کنه. این wrapper سمت سرور
 * چندتا آموزشگاه واقعی (با عکس) رو برای مگامنو می‌گیره و به Header
 * به‌عنوان prop می‌ده — دقیقاً همون الگویی که برای ProvinceSelect داشتیم.
 */
export default async function HeaderServer() {
  let megaMenuAcademies: ReturnType<typeof mapInstituteToCard>[] = [];

  try {
    const { results } = await getHomeInstitutes({ page: 1 });
    megaMenuAcademies = results.slice(0, MEGA_MENU_PREVIEW_COUNT).map(mapInstituteToCard);
  } catch (error) {
    console.error("HeaderServer mega-menu fetch failed:", error);
  }

  return <Header megaMenuAcademies={megaMenuAcademies} />;
}
