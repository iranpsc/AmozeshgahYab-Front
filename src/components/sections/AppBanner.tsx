import { FaApple, FaGooglePlay, FaDownload } from "react-icons/fa";

/**
 * سکشن کاملاً استاتیک و ظاهری — بدون لینک، بدون منطق نصب واقعی PWA.
 * صرفاً بصریه، طبق UI رفرنس.
 */
export default function AppBanner() {
  return (
    <section className="w-full px-4 py-8 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-8 sm:px-10 sm:py-10 lg:px-14">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-between">
          {/* متن + دکمه‌های نمایشی */}
          <div className="text-center lg:text-right space-y-10">
            <h2 className="text-xl font-rokh font-bold text-primary-foreground sm:text-2xl lg:text-5xl">
              اپلیکیشن آموزشگاه‌یاب
            </h2>
            <p className="mt-2 text-sm leading-7 text-primary-foreground/85 sm:text-base lg:text-xl">
              همه آموزشگاه‌ها در جیب شما!
              <br />
              جستجو، مقایسه و ثبت‌نام در دوره‌ها، همیشه و همه‌جا
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 lg:justify-start">
              <div className="flex items-center gap-2 rounded-xl bg-white/15 px-4 py-2.5 text-primary-foreground">
                <FaApple size={17} />
                <span className="text-xs font-medium sm:text-sm">دانلود از App Store</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-white/15 px-4 py-2.5 text-primary-foreground">
                <FaGooglePlay size={15} />
                <span className="text-xs font-medium sm:text-sm">دانلود از Google Play</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-primary">
                <FaDownload size={15} />
                <span className="text-xs font-medium sm:text-sm">دانلود مستقیم</span>
              </div>
            </div>
          </div>

          {/* موکاپ گوشی‌ها */}
          <div className="relative h-40 w-full max-w-xs shrink-0 sm:h-48 lg:h-52 lg:w-64 me-20">
            <div className="absolute right-1/2 top-0 h-full w-28 lg:w-40 translate-x-10 rotate-6 rounded-3xl border-4 border-white/20 bg-white/10 shadow-lg sm:w-32" />
            <div className="absolute right-1/2 top-2 h-full w-28 lg:w-40 -translate-x-6 -rotate-6 rounded-3xl border-4 border-white/30 bg-white/15 shadow-xl sm:w-32" />
          </div>
        </div>
      </div>
    </section>
  );
}
