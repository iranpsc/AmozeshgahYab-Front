import Image from "next/image";
import {
  FaCheckCircle,
  FaMapMarkerAlt,
  FaStar,
  FaPhoneAlt,
  FaDirections,
  FaGlobe,
} from "react-icons/fa";
import type { InstituteDetailData } from "@/lib/academies";
import BookmarkButton from "@/components/ui/AcademyListItem/BookmarkButton";

type Props = {
  institute: InstituteDetailData;
};

export default function InstituteHero({ institute }: Props) {
  const bannerSrc = institute.imageUrl || "/default.png";
  const logoSrc = institute.logoUrl || "/images/logo.png";
  const mapsHref =
    institute.latitude && institute.longitude
      ? `https://www.google.com/maps/dir/?api=1&destination=${institute.latitude},${institute.longitude}`
      : null;
  const callHref = institute.mobileNumber
    ? `tel:${institute.mobileNumber}`
    : institute.landlinePhone
      ? `tel:${institute.landlinePhone}`
      : null;

  return (
    <section>
      <div className="lg:overflow-hidden rounded-2xl border border-border bg-card">
        {/*
        موبایل: بنر بالا (ارتفاع ثابت)، لوگو آواتار روی لبه‌ی پایینش، بعد اطلاعات زیرش.
        دسکتاپ (lg+): یه ردیف — بنر (سمت چپِ بصری) | اطلاعات | لوگو (سمت راستِ بصری).
        DOM order [بنر، اطلاعات، لوگو] + flex-row-reverse تو RTL یعنی اولین فرزند
        (بنر) میره سمت چپ و آخرین (لوگو) میره سمت راست — دقیقاً مطابق موکاپ.
      */}
        <div className="lg:flex lg:flex-row-reverse lg:items-stretch lg:relative">
          {/* بنر */}
          <div className="relative h-72 w-full shrink-0  rounded-2xl  lg:h-100 lg:w-full lg:rounded-e-2xl flex flex-col ">
            <Image
              src={bannerSrc}
              alt={institute.name}
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover rounded-2xl lg:rounded-none"
            />

            {/* فید به رنگِ دقیقِ bg-card خودِ کارت — عکس تدریجی تو پس‌زمینه محو می‌شه
              تا ستون اطلاعات کنارش خونا بمونه؛ فقط دسکتاپ (تو موبایل بنر زیرِ
              متن نیست، جدا از همه). رنگ از var(--card) میاد، پس با تم روشن/تیره
              خودکار هماهنگه. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 hidden lg:block"
              style={{
                backgroundImage:
                  "linear-gradient(to right, transparent 0%, transparent 28%, var(--card) 79%)",
              }}
            />

            {/* لوگو فقط تو موبایل، به‌صورت آواتار روی لبه‌ی پایین بنر */}
           
              <span className="absolute -bottom-8 right-1/2 grid h-28 w-28 translate-x-1/2 place-items-center overflow-hidden rounded-2xl border-4 border-card bg-white shadow-lg lg:hidden">
                <Image
                  src={logoSrc}
                  alt="logo"
                  width={56}
                  height={56}
                  className="h-full w-full object-contain p-1.5"
                />
              </span>
           

          </div>
          <div className="w-full lg:absolute inset-0 right-10 flex gap-5 items-center ">
            <div className="hidden lg:block h-32 w-32 lg:w-44 lg:h-44 2xl:w-60 2xl:h-60   rounded-2xl  p-3 items-center justify-center bg-surface-2  border border-border">
              <div className="relative w-full h-full overflow-hidden rounded-2xl bg-white shadow-md">
                <Image src={logoSrc} alt="logo" fill sizes="128px" className="object-contain p-3" />
              </div>
            </div>
            {/* اطلاعات */}
            <div className="flex flex-1 flex-col gap-4 lg:gap-8 p-4 pt-12 sm:p-6 sm:pt-12 items-center lg:items-start lg:justify-center lg:pt-6 ">

              <div className="flex items-center gap-1.5">
                <h1 className="text-xl font-bold text-foreground lg:text-2xl 2xl:text-5xl">{institute.name}</h1>
                {institute.isVerified && (
                  <FaCheckCircle size={20} className="shrink-0 text-primary" aria-label="تأییدشده" />
                )}
              </div>

              <span className="w-fit rounded-lg bg-surface px-2.5 py-1.5 text-xs lg:text-base font-medium text-muted-foreground">
                آموزشگاه {institute.gender.label}
              </span>

              <div className="flex items-center gap-1 text-sm lg:text-base text-muted-foreground">
                <FaMapMarkerAlt size={16} />
                {institute.provinceName ? `${institute.provinceName}، ${institute.cityName}` : institute.cityName}
              </div>

              {typeof institute.rating === "number" && (
                <div className="flex items-center gap-1.5 text-sm">
                  <span className="flex items-center gap-0.5 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar key={i} size={13} className={i < Math.round(institute.rating!) ? "" : "opacity-25"} />
                    ))}
                  </span>
                  <span className="font-bold text-foreground">{institute.rating.toFixed(1)}</span>
                  {typeof institute.reviewsCount === "number" && (
                    <span className="text-muted-foreground">({institute.reviewsCount} نظر)</span>
                  )}
                </div>
              )}

              <div className="mt-1 grid grid-cols-3 gap-2 sm:flex sm:flex-wrap justify-center items-center">
                {callHref ? (
                  <a
                    href={callHref}
                    className="flex flex-col items-center justify-center gap-1 rounded-md bg-primary px-4 lg:px-10 py-2.5 text-primary-foreground transition-colors hover:bg-primary-hover sm:flex-row sm:gap-2"
                  >
                    <FaPhoneAlt size={16} />
                    <span className="text-[11px] font-bold sm:text-sm">تماس</span>
                  </a>
                ) : (
                  <span />
                )}

                {mapsHref && (
                  <a
                    href={mapsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center
                     gap-1 rounded-md border border-border px-4 lg:px-10  py-2.5 bg-surface text-foreground transition-colors hover:bg-primary sm:flex-row sm:gap-2"
                  >
                    <FaDirections size={16} />
                    <span className="text-[11px] font-bold sm:text-sm">مسیر یابی</span>
                  </a>
                )}

                {institute.website && (
                  <a
                    href={institute.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center gap-1 rounded-md border border-border px-4 lg:px-10 py-2.5 text-foreground transition-colors hover:bg-surface sm:flex-row sm:gap-2"
                  >
                    <FaGlobe size={16} />
                    <span className="text-[11px] font-bold sm:text-sm">وب‌سایت</span>
                  </a>
                )}

                <div className="flex flex-col items-center justify-center gap-1 rounded-md border border-border bg-surface px-4 lg:px-10 py-2.5 text-foreground sm:flex-row sm:gap-2">
                  <BookmarkButton academyId={institute.id} />
                  <span className="text-[11px] font-bold sm:text-sm">ذخیره</span>
                </div>
              </div>
            </div>
          </div>






        </div>
      </div>
    </section>
  );
}
