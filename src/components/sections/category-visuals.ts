import type { IconType } from "react-icons";
import {
  FaGlobe,
  FaLaptopCode,
  FaMusic,
  FaPalette,
  FaDumbbell,
  FaUtensils,
  FaCogs,
  FaBriefcase,
  FaEllipsisH,
} from "react-icons/fa";

type CategoryVisual = {
  icon: IconType;
  colorVar: string; // متناظر با --category-* تو globals.css
};

const CATEGORY_RULES: { keywords: string[]; visual: CategoryVisual }[] = [
  { keywords: ["زبان"], visual: { icon: FaGlobe, colorVar: "blue" } },
  { keywords: ["کامپیوتر", "برنامه‌نویسی", "برنامه نویسی"], visual: { icon: FaLaptopCode, colorVar: "teal" } },
  { keywords: ["موسیقی"], visual: { icon: FaMusic, colorVar: "purple" } },
  { keywords: ["هنر", "نقاشی", "طراحی"], visual: { icon: FaPalette, colorVar: "orange" } },
  { keywords: ["ورزش", "بدنسازی"], visual: { icon: FaDumbbell, colorVar: "green" } },
  { keywords: ["آشپزی", "شیرینی", "قنادی"], visual: { icon: FaUtensils, colorVar: "red" } },
  { keywords: ["فنی", "حرفه", "مهارت"], visual: { icon: FaCogs, colorVar: "slate" } },
  { keywords: ["مدیریت", "کسب", "کار"], visual: { icon: FaBriefcase, colorVar: "indigo" } },
];

const FALLBACK_VISUAL: CategoryVisual = { icon: FaEllipsisH, colorVar: "slate" };

/** چون API فقط عنوان دوره رو می‌ده، آیکون/رنگ رو با تطبیق کلیدواژه تو عنوان پیدا می‌کنیم */
export function getCategoryVisual(title: string): CategoryVisual {
  const rule = CATEGORY_RULES.find((r) => r.keywords.some((k) => title.includes(k)));
  return rule?.visual ?? FALLBACK_VISUAL;
}
