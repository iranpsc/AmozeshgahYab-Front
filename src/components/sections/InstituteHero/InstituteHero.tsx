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
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      {/*
        موبایل: بنر بالا، لوگو به‌صورت آواتار روی لبه‌ی پایین بنر، بعد اطلاعات زیرش (استک ساده).
        دسکتاپ (lg+): یه ردیف با flex-row-reverse — چون DOM order همون ترتیب موبایله
        (بنر → اطلاعات → لوگو) و row-reverse تو RTL باعث می‌شه بنر سمت چپ، لوگو سمت راست بیفته
        (دقیقاً مطابق موکاپ)، بدون این‌که مجبور بشیم مارک‌آپ رو برای هر breakpoint تکرار کنیم.
      */}
      <div className="lg:flex lg:flex-row-reverse lg:items-stretch">
        {/* بنر — گردی گوشه‌ها رو خودِ همین div کنترل می‌کنه (نه فقط container بیرونی)
            تا تو مرورگرهایی که overflow-hidden+radius رو رو flex item درست کلیپ نمی‌کنن
            (بعضی نسخه‌های سافاری) هم دقیق بمونه: موبایل فقط بالا گرد، دسکتاپ فقط
            سمت end (چپِ بصری، چون rtl) گرد. */}
        <div className="relative h-56 w-full shrink-0 overflow-hidden rounded-t-2xl sm:h-72 lg:h-auto lg:w-[45%] lg:rounded-t-none lg:rounded-e-2xl">
          <Image
            src={bannerSrc}
            alt={institute.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover"
          />
          {/* لوگو فقط تو موبایل، به‌صورت آواتار روی لبه‌ی پایین بنر */}
          {institute.logoUrl && (
            <span className="absolute -bottom-8 right-1/2 grid h-16 w-16 translate-x-1/2 place-items-center overflow-hidden rounded-2xl border-4 border-card bg-white shadow-lg lg:hidden">
              <Image src={institute.logoUrl} alt="" width={56} height={56} className="h-full w-full object-contain p-1.5" />
            </span>
          )}
        </div>

        {/* اطلاعات */}
        <div className="flex flex-1 flex-col gap-3 p-4 pt-12 sm:p-6 sm:pt-12 lg:justify-center lg:pt-6">
          <div className="flex items-center gap-1.5">
            <h1 className="text-lg font-bold text-foreground sm:text-xl">{institute.name}</h1>
            {institute.isVerified && (
              <FaCheckCircle size={16} className="shrink-0 text-primary" aria-label="تأییدشده" />
            )}
          </div>

          <span className="w-fit rounded-lg bg-surface px-2.5 py-1 text-xs font-medium text-muted-foreground">
            آموزشگاه {institute.gender.label}
          </span>

          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <FaMapMarkerAlt size={13} />
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

          <div className="mt-1 grid grid-cols-4 gap-2 sm:flex sm:flex-wrap">
            {callHref ? (
              <a
                href={callHref}
                className="flex flex-col items-center gap-1 rounded-xl bg-primary px-3 py-2.5 text-primary-foreground transition-colors hover:bg-primary-hover sm:flex-row sm:gap-2"
              >
                <FaPhoneAlt size={14} />
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
                className="flex flex-col items-center gap-1 rounded-xl border border-border px-3 py-2.5 text-foreground transition-colors hover:bg-surface sm:flex-row sm:gap-2"
              >
                <FaDirections size={14} />
                <span className="text-[11px] font-bold sm:text-sm">مسیر یابی</span>
              </a>
            )}

            {institute.website && (
              <a
                href={institute.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 rounded-xl border border-border px-3 py-2.5 text-foreground transition-colors hover:bg-surface sm:flex-row sm:gap-2"
              >
                <FaGlobe size={14} />
                <span className="text-[11px] font-bold sm:text-sm">وب‌سایت</span>
              </a>
            )}

            <div className="flex flex-col items-center gap-1 rounded-xl border border-border px-3 py-2.5 text-foreground sm:flex-row sm:gap-2">
              <BookmarkButton academyId={institute.id} />
              <span className="text-[11px] font-bold sm:text-sm">ذخیره</span>
            </div>
          </div>
        </div>

        {/* لوگو — فقط دسکتاپ، ستون سوم که با flex-row-reverse سمت راست می‌افته.
            جعبه‌ی لوگو همیشه سفیده (صرف‌نظر از تم تیره/روشن سایت)، چون خودِ
            لوگوهای آموزشگاه‌ها معمولاً پس‌زمینه‌ی سفید/شفاف دارن و رو پس‌زمینه‌ی
            تیره محو می‌شن — دقیقاً مطابق موکاپ. */}
        {institute.logoUrl && (
          <div className="hidden shrink-0 items-center justify-center bg-card p-6 lg:flex lg:w-48">
            <div className="relative h-32 w-32 overflow-hidden rounded-2xl bg-white shadow-md">
              <Image src={institute.logoUrl} alt="" fill sizes="128px" className="object-contain p-3" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
