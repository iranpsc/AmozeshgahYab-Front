import { FaUserFriends, FaLayerGroup, FaSitemap, FaBuilding, FaCalendarAlt } from "react-icons/fa";
import type { InstituteDetailData } from "@/lib/academies";

type Props = {
  institute: InstituteDetailData;
};

export default function InstituteStats({ institute }: Props) {
  const items = [
    { label: "جنسیت", value: institute.gender.label, icon: FaUserFriends },
    { label: "تعداد دوره‌ها", value: `${institute.coursesCount} دوره`, icon: FaLayerGroup },
    { label: "زیر دوره‌ها", value: `${institute.subcoursesCount} زیردوره`, icon: FaSitemap },
    institute.attendanceType
      ? { label: "نوع دوره‌ها", value: institute.attendanceType, icon: FaBuilding }
      : null,
    institute.establishedYear
      ? { label: "تاسیس", value: institute.establishedYear, icon: FaCalendarAlt }
      : null,
  ].filter((x): x is NonNullable<typeof x> => Boolean(x));

  return (
    <div className="grid grid-cols-2 gap-3 rounded-2xl border border-border bg-card p-4 sm:grid-cols-3 lg:flex lg:flex-wrap lg:items-center lg:justify-between lg:gap-0 lg:divide-x lg:divide-x-reverse lg:divide-border">
      {items.map(({ label, value, icon: Icon }) => (
        <div key={label} className="flex items-center gap-2 px-3 first:pr-0 last:pl-0">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary-light text-primary">
            <Icon size={14} />
          </span>
          <div className="flex flex-col">
            <span className="text-[11px] text-muted-foreground">{label}</span>
            <span className="text-sm font-bold text-foreground">{value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
