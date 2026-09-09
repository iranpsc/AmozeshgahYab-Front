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
        <FaInfoCircle size={20} className="text-primary text-xl" />
        دوره‌های اصلی آموزشگاه
      </h2>

      <HorizontalSlider>
        {institute.courses.map((course) => (
          <div
            key={course.id}
            className="flex w-40 lg:w-52 shrink-0 flex-col items-center gap-2 rounded-xl border border-border p-3 lg:p-5 text-center mt-5"
            style={{ scrollSnapAlign: "start" }}
          >
            <span className="grid h-16 w-16 place-items-center overflow-hidden rounded-xl bg-primary-light text-primary">
              {course.iconUrl ? (
                <Image src={course.iconUrl} alt="cosr logo" width={32} height={32} />
              ) : (
                <FaGraduationCap size={32} />
              )}
            </span>
            <span className="line-clamp-2 text-sm lg:text-base font-bold text-foreground mt-4">{course.title}</span>
            <span className="text-xs lg:text-sm text-muted-foreground mt-1">
              {course.subcoursesCount} زیردوره
            </span>
          </div>
        ))}
      </HorizontalSlider>
    </section>
  );
}
