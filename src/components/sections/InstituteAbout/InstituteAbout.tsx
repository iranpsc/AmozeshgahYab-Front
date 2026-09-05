import { FaInfoCircle } from "react-icons/fa";
import type { InstituteDetailData } from "@/lib/academies";

type Props = {
  institute: InstituteDetailData;
};

export default function InstituteAbout({ institute }: Props) {
  if (!institute.description) return null;

  return (
    <section className="rounded-2xl border border-border bg-card p-4 sm:p-6">
      <h2 className="mb-3 flex items-center gap-1.5 text-base font-bold text-foreground">
        <FaInfoCircle size={14} className="text-primary" />
        درباره آموزشگاه
      </h2>
      <p className="text-sm leading-7 text-muted-foreground">{institute.description}</p>
    </section>
  );
}
