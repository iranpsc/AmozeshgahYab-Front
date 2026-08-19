import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

type Props = {
  city: string;
  href: string;
};

export default function ViewAllCityCard({ city, href }: Props) {
  return (
    <Link
      href={href}
      className="flex w-64 shrink-0 snap-start flex-col items-center justify-center gap-3 rounded-2xl bg-primary p-6 text-center text-primary-foreground sm:w-72"
    >
      <span className="text-sm font-bold leading-6">
        همه آموزشگاه‌های {city}
      </span>
      <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/15 px-3 py-1.5 text-xs font-medium">
        مشاهده لیست کامل
        <FaArrowLeft size={11} />
      </span>
    </Link>
  );
}
