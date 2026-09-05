import Image from "next/image";
import { FaInfoCircle, FaGraduationCap } from "react-icons/fa";
import type { InstituteDetailData } from "@/lib/academies";
import HorizontalSlider from "@/components/ui/HorizontalSlider/HorizontalSlider";

type Props = {
  institute: InstituteDetailData;
};

export default function InstituteCourses({ institute }: Props) {
  if (institute.courses.length === 0) return null;

  return (
    <section className="rounded-2xl border border-border bg-card p-4 sm:p-6">
      <h2 className="flex items-center gap-1.5 text-base font-bold text-foreground">
        <FaInfoCircle size={14} className="text-primary" />
        دوره‌های اصلی آموزشگاه
      </h2>

      <HorizontalSlider>
        {institute.courses.map((course) => (
          <div
            key={course.id}
            className="flex w-32 shrink-0 flex-col items-center gap-2 rounded-xl border border-border p-3 text-center"
            style={{ scrollSnapAlign: "start" }}
          >
            <span className="grid h-12 w-12 place-items-center overflow-hidden rounded-xl bg-primary-light text-primary">
              {course.iconUrl ? (
                <Image src={course.iconUrl} alt="" width={28} height={28} />
              ) : (
                <FaGraduationCap size={20} />
              )}
            </span>
            <span className="line-clamp-2 text-xs font-bold text-foreground">{course.title}</span>
            <span className="text-[11px] text-muted-foreground">
              {course.subcoursesCount} زیردوره
            </span>
          </div>
        ))}
      </HorizontalSlider>
    </section>
  );
}
