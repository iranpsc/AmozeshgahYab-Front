import Link from "next/link";
import { FaBookOpen, FaCalendarAlt, FaArrowLeft } from "react-icons/fa";

type Article = {
  title: string;
  date: string;
};

// فقط ۳ تا مقاله + یه کارت تبلیغاتی «مجله» (طبق UI، نه ۴ تا کارت یکسان)
const articles: Article[] = [
  {
    title: "چطور بهترین آموزشگاه رو برای خودتون پیدا کنید؟",
    date: "۱۴۰۳/۰۷/۱۵",
  },
  {
    title: "نکات کلیدی قبل از ثبت‌نام در هر دوره‌ی آموزشی",
    date: "۱۴۰۳/۰۶/۰۲",
  },
  {
    title: "دوره‌ی حضوری یا آنلاین؟ کدوم برای شما بهتره",
    date: "۱۴۰۳/۰۵/۲۰",
  },
    {
    title: "دوره‌ی حضوری و مجازي ",
    date: "۱۴۰۳/۰۵/۲۰",
  },
];

/**
 * سکشن کاملاً استاتیک — بدون fetch. کارت‌های مقاله (per UI) بدون لینک؛
 * فقط کارت «مجله» که یه CTA مجزاست لینک داره (به /magazine).
 */
export default function Articles() {
  return (
    <section className="w-full px-4 py-8 lg:px-8">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground sm:text-xl">
          مقالات و راهنماها
        </h2>
        <Link
          href="/magazine"
          className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-hover"
        >
          مشاهده همه
          <FaArrowLeft size={12} />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {articles.map((article) => (
          <div
            key={article.title}
            className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card"
          >
            <div className="flex aspect-[4/3] items-center justify-center bg-primary-light text-primary">
              <FaBookOpen size={26} />
            </div>
            <div className="flex flex-1 flex-col gap-2 p-3.5">
              <h3 className="line-clamp-2 text-sm font-bold leading-6 text-foreground">
                {article.title}
              </h3>
              <span className="mt-auto flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <FaCalendarAlt size={10} />
                {article.date}
              </span>
            </div>
          </div>
        ))}

        {/* کارت تبلیغاتی «مجله» — تیل‌رنگ، برخلاف بقیه لینک داره */}
        <Link
          href="/magazine"
          className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-primary p-5 text-center text-primary-foreground"
        >
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/15">
            <FaBookOpen size={22} />
          </span>
          <div className="space-y-1">
            <p className="text-sm font-bold">مجله آموزشگاه‌یاب</p>
            <p className="text-xs text-primary-foreground/80">
              جدیدترین مقالات و راهنماهای آموزشی
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/15 px-3 py-1.5 text-xs font-medium">
            مشاهده مجله
            <FaArrowLeft size={11} />
          </span>
        </Link>
      </div>
    </section>
  );
}