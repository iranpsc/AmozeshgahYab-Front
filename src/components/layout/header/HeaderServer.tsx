import { getHomeInstitutes, mapInstituteToCard } from "@/lib/academies";
import Header from "./Header";

const MEGA_MENU_PREVIEW_COUNT = 6;

export default async function HeaderServer() {
  let megaMenuAcademies: ReturnType<typeof mapInstituteToCard>[] = [];

  try {
    const { results } = await getHomeInstitutes({ page: 1 });

    megaMenuAcademies = results
      .slice(0, MEGA_MENU_PREVIEW_COUNT)
      .map(mapInstituteToCard);
  } catch {
    // API در زمان build/runtime ممکن است موقتاً در دسترس نباشد.
    // Header بدون preview آموزشگاه‌ها همچنان باید render شود.
  }

  return <Header megaMenuAcademies={megaMenuAcademies} />;
}