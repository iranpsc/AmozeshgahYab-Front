import Image from "next/image";
import { FaInfoCircle, FaBookOpen } from "react-icons/fa";
import type { InstituteDetailData } from "@/lib/academies";
import HorizontalSlider from "@/components/ui/HorizontalSlider/HorizontalSlider";

type Props = {
  institute: InstituteDetailData;
};

export default function InstituteSubcourses({ institute }: Props) {
  if (institute.subcourses.length === 0) return null;

  return (
    <section className="rounded-2xl border border-border bg-card p-4 sm:p-6">
      <h2 className="flex items-center gap-1.5 text-base font-bold text-foreground">
        <FaInfoCircle size={14} className="text-primary" />
        زیر دوره‌های آموزشگاه
      </h2>

      <HorizontalSlider>
        {institute.subcourses.map((subcourse) => (
          <div
            key={subcourse.id}
            className="flex w-32 shrink-0 flex-col items-center gap-2 rounded-xl border border-border p-3 text-center"
            style={{ scrollSnapAlign: "start" }}
          >
            <span className="grid h-12 w-12 place-items-center overflow-hidden rounded-xl bg-primary-light text-primary">
              {subcourse.iconUrl ? (
                <Image src={subcourse.iconUrl} alt="" width={28} height={28} />
              ) : (
                <FaBookOpen size={20} />
              )}
            </span>
            <span className="line-clamp-2 text-xs font-bold text-foreground">{subcourse.title}</span>
          </div>
        ))}
      </HorizontalSlider>
    </section>
  );
}
