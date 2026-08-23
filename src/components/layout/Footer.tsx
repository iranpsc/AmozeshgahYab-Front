import Link from "next/link";
import {
  FaLocationDot,
  FaPhone,
  FaClock,
  FaMobileScreenButton,
} from "react-icons/fa6";
import {
  FaMailBulk,
  FaTelegram,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaGraduationCap,
} from "react-icons/fa";
import { getCourses, getCities } from "@/lib/academies";
import { navItems } from "./header/nav-items";

const socialLinks = [
  { icon: FaTelegram, label: "تلگرام" },
  { icon: FaInstagram, label: "اینستاگرام" },
  { icon: FaLinkedin, label: "لینکدین" },
  { icon: FaTwitter, label: "توییتر" },
];

const POPULAR_COUNT = 6;

const headingClass = "mb-5 text-sm font-bold text-primary sm:text-base";
const linkClass = "text-sm leading-7 text-secondary-foreground/65 transition-colors hover:text-secondary-foreground";
const disabledClass = "cursor-not-allowed text-sm leading-7 text-secondary-foreground/30";

/**
 * Server Component (بدون "use client" — هیچ تعامل کلاینتی لازم نیست، همه‌چیز
 * نمایشی/غیرفعاله). دسته‌بندی‌ها و شهرها از API واقعی می‌آن، نه هاردکد.
 * رنگ‌ها از سیستم دیزاین (--secondary, --primary) می‌آن، نه هاردکد.
 */
export default async function Footer() {
  let popularCourses: Awaited<ReturnType<typeof getCourses>> = [];
  let popularCities: Awaited<ReturnType<typeof getCities>> = [];

  try {
    popularCourses = (await getCourses()).slice(0, POPULAR_COUNT);
  } catch (error) {
    console.error("Footer courses fetch failed:", error);
  }

  try {
    popularCities = (await getCities()).slice(0, POPULAR_COUNT);
  } catch (error) {
    console.error("Footer cities fetch failed:", error);
  }

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="mx-auto  px-4 py-14 lg:px-8 2xl:px-20">
        <div className="grid gap-10 lg:grid-cols-5">
          {/* برند + شبکه‌های اجتماعی (فعلاً بدون لینک واقعی) */}
          <div className="lg:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary">
                <FaGraduationCap size={19} />
              </span>
              <span className="text-lg font-bold text-secondary-foreground">
                آموزشگاه‌یاب
              </span>
            </div>
            <p className="text-sm leading-7 text-secondary-foreground/65">
              همراه شما در مسیر یادگیری بهتر
            </p>
            <div className="mt-5 flex items-center gap-2">
              {socialLinks.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  title={label}
                  
                  className="grid h-10 w-10 cursor-not-allowed place-items-center rounded-lg bg-white/5 text-secondary-foreground/30"
                >
                  <Icon size={16} />
                </span>
              ))}
            </div>
          </div>

          {/* راه‌های ارتباطی — دیتای موجود، دست‌نخورده */}
          <div>
            <h3 className={headingClass}>راه‌های ارتباطی</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <FaPhone size={17} className="shrink-0 text-primary" />
                <a href="tel:02833647125" className={linkClass}>
                  تلفن ثابت: 02833647125
                </a>
              </li>

              <li className="flex items-center gap-3">
                <FaMobileScreenButton size={17} className="shrink-0 text-primary" />
                <a href="tel:09120820120" className={linkClass}>
                  تلفن همراه: 09120820120
                </a>
              </li>

              <li className="flex items-center gap-3">
                <FaMailBulk size={17} className="shrink-0 text-primary" />
                <a href="mailto:info@amozeshgahyab.ir" className={linkClass}>
                  info@amozeshgahyab.ir
                </a>
              </li>

              <li className="flex items-start gap-3">
                <FaClock size={17} className="mt-0.5 shrink-0 text-primary" />
                <span className="text-sm leading-7 text-secondary-foreground/65">
                  شنبه تا پنجشنبه ۸:۰۰ الی ۱۸:۰۰
                </span>
              </li>

              <li className="flex items-start gap-3">
                <FaLocationDot size={17} className="mt-0.5 shrink-0 text-primary" />
                <span className="text-sm leading-7 text-secondary-foreground/65">
                  آدرس دفتر قزوین - ملاصدرا - خیابان میرداماد - نبش بن بست پویا - پلاک 45
                  شماره تماس موبایل 09127855049
                </span>
              </li>
            </ul>
          </div>

          {/* دسترسی سریع — همون لیست صفحات هدر، همون منطق غیرفعال‌سازی */}
          <div>
            <h3 className={headingClass}>دسترسی سریع</h3>
            <ul className="space-y-4">
              {navItems.map((item) =>
                item.disabled ? (
                  <li key={item.href}>
                    <span title="به‌زودی" aria-disabled="true" className={disabledClass}>
                      {item.label}
                    </span>
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* دسته‌بندی‌های پرطرفدار — از API واقعی؛ صفحه‌ی مقصد هنوز نیست، پس غیرفعال */}
          <div>
            <h3 className={headingClass}>دسته‌بندی‌های پرطرفدار</h3>
            <ul className="space-y-4">
              {popularCourses.length === 0 ? (
                <li className={disabledClass}>به‌زودی</li>
              ) : (
                popularCourses.map((course) => (
                  <li key={course.id}>
                    <span title="به‌زودی" aria-disabled="true" className={disabledClass}>
                      {course.title}
                    </span>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* شهرهای پرطرفدار — از API واقعی؛ صفحه‌ی مقصد هنوز نیست، پس غیرفعال */}
          <div>
            <h3 className={headingClass}>شهرهای پرطرفدار</h3>
            <ul className="space-y-4">
              {popularCities.length === 0 ? (
                <li className={disabledClass}>به‌زودی</li>
              ) : (
                popularCities.map((city) => (
                  <li key={city.id}>
                    <span title="به‌زودی" aria-disabled="true" className={disabledClass}>
                      {city.name}
                    </span>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>

        {/* درباره سامانه + اینماد — دیتا و کد اینماد کاملاً دست‌نخورده، فقط جای مناسب */}
        <div className="mt-12 grid gap-10 border-t border-white/10 pt-10 lg:grid-cols-2">
          <div>
            <h3 className="mb-5 text-lg font-bold text-primary sm:text-xl">
              درباره سامانه آموزشگاه یاب
            </h3>
            <p className="text-sm leading-8 text-secondary-foreground/65">
              سامانه آموزشگاه یک سیستم مدیریت آموزشی مدرن است که برای
              مدیریت ثبت‌نام، کلاس‌ها، اساتید و هنرجویان طراحی شده و
              امکانات کاملی برای مدیریت فرآیندهای آموزشی فراهم می‌کند.
            </p>
          </div>

          <div className="flex items-center justify-center lg:justify-start">
            <div
              dangerouslySetInnerHTML={{
                __html: `<a referrerpolicy='origin' target='_blank' href='https://trustseal.enamad.ir/?id=754796&Code=7TnLHQ7fELIsmQDvWjxzsPjzf4rCXYXj'><img referrerpolicy='origin' src='https://trustseal.enamad.ir/logo.aspx?id=754796&Code=7TnLHQ7fELIsmQDvWjxzsPjzf4rCXYXj' alt='' style='cursor:pointer' code='7TnLHQ7fELIsmQDvWjxzsPjzf4rCXYXj'></a>`,
              }}
            />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-sm text-secondary-foreground/50 md:flex-row lg:px-8">
          <span>© {new Date().getFullYear()} تمامی حقوق محفوظ است.</span>

          <div className="flex items-center gap-5">
            <Link href="/" className="transition-colors hover:text-secondary-foreground">
              amoozeshgahyab.ir
            </Link>
            <span title="به‌زودی" aria-disabled="true" className="cursor-not-allowed text-secondary-foreground/30">
              قوانین و مقررات
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}