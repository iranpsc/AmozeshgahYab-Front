import { FaBuilding, FaMapMarkerAlt, FaGraduationCap, FaUsers, FaStar } from "react-icons/fa";
import ProvinceSelect from "./CitySelect";
import HeroSearchTrigger from "./HeroSearchTrigger";
import HeroIllustration from "./HeroIllustration";

type Props = {
  /** id عددی استان پیش‌فرض دراپ‌داون، از page.tsx می‌آد */
  provinceSlug?: string;
};

// ۳ تای اول همیشه (موبایل+دسکتاپ)، ۲ تای آخر فقط دسکتاپ (طبق UI رفرنس)
const stats = [
  { icon: FaBuilding, value: "+۱۲,۰۰۰", label: "آموزشگاه فعال" },
  { icon: FaMapMarkerAlt, value: "+۲۸۰", label: "شهر پوشش" },
  { icon: FaGraduationCap, value: "+۲۵۰,۰۰۰", label: "دوره آموزشی" },
  { icon: FaUsers, value: "+۱۰۰,۰۰۰", label: "کاربر فعال ماهانه", desktopOnly: true },
  { icon: FaStar, value: "+۵۰,۰۰۰", label: "نظرات و امتیازها", desktopOnly: true },
];

export default function Hero({ provinceSlug }: Props) {
  return (
    <section className="relative  bg-background">
      <div className="mx-auto w-full px-4 py-10 lg:px-8 lg:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-6">
          <div className="relative z-10">
            <h1 className="text-3xl font-rokh 2xl:text-6xl font-bold leading-[1.4] text-foreground sm:text-4xl lg:text-[2.75rem]">
              بهترین آموزشگاه‌ها
              <br />
              در <span className="text-primary">شهر خود</span> را پیدا کنید
            </h1>

            <p className="mt-8 max-w-md 2xl:text-xl text-sm leading-7 text-muted-foreground sm:text-base">
              جستجو و مقایسه، انتخاب آسان بهترین آموزشگاه بر اساس نیاز، موقعیت و
              نظرات کاربران
            </p>

            {/* سرچ‌بار */}
            <div className="mt-10 2xl:mt-14 rounded-2xl border border-border bg-card p-3 shadow-md sm:p-4">
              <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center">
                <ProvinceSelect defaultProvinceId={provinceSlug} />
                <div className="hidden h-8 w-px bg-border lg:block" />
                <HeroSearchTrigger />
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center lg:justify-end">
            <HeroIllustration />
          </div>
        </div>

        {/* آمار — عرض کامل، زیر هر دو ستون (طبق UI دسکتاپ) */}
        <div className="mt-8 grid grid-cols-3 gap-2.5 sm:gap-3 lg:grid-cols-5 ">
          {stats.map(({ icon: Icon, value, label, desktopOnly }) => (
            <div
              key={label}
              className={`flex flex-col items-center gap-1.5 rounded-xl border border-border bg-surface px-2 py-3 text-center sm:flex-row sm:justify-center sm:gap-2 sm:px-3 ${
                desktopOnly ? "hidden lg:flex" : ""
              }`}
            >
              <span className="grid h-8 w-8 lg:w-12 lg:h-12 shrink-0 place-items-center rounded-lg bg-primary-light text-primary">
                <Icon size={14} />
              </span>
              <div className="flex flex-col items-center sm:items-start">
                <span className="text-sm lg:text-base font-bold text-foreground">{value}</span>
                <span className="text-[12px] lg:text-sm text-muted-foreground">{label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}