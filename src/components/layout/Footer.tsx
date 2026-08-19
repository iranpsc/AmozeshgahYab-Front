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

/**
 * Server Component (بدون "use client" — هیچ تعامل کلاینتی لازم نیست، همه‌چیز
 * نمایشی/غیرفعاله). دسته‌بندی‌ها و شهرها از API واقعی می‌آن، نه هاردکد.
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
    <footer className="bg-[#0F172A] text-gray-300">
      <div className="container mx-auto px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-5">
          {/* برند + شبکه‌های اجتماعی (فعلاً بدون لینک واقعی) */}
          <div className="lg:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-cyan-400/10 text-cyan-400">
                <FaGraduationCap size={18} />
              </span>
              <span className="text-lg font-bold text-white">آموزشگاه‌یاب</span>
            </div>
            <p className="text-sm leading-7 text-gray-400">
              همراه شما در مسیر یادگیری بهتر
            </p>
            <div className="mt-5 flex items-center gap-2">
              {socialLinks.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  title="به‌زودی"
                  aria-disabled="true"
                  aria-label={label}
                  className="grid h-9 w-9 cursor-not-allowed place-items-center rounded-lg bg-white/5 text-gray-500"
                >
                  <Icon size={15} />
                </span>
              ))}
            </div>
          </div>

          {/* راه‌های ارتباطی — دیتای موجود، دست‌نخورده */}
          <div>
            <h3 className="mb-6 text-base font-bold text-cyan-400">
              راه‌های ارتباطی
            </h3>
            <ul className="space-y-5 text-sm">
              <li className="flex items-center gap-3">
                <FaPhone className="text-cyan-400 text-lg shrink-0" />
                <a href="tel:02833647125" className="hover:text-white transition-colors">
                  تلفن ثابت: 02833647125
                </a>
              </li>

              <li className="flex items-center gap-3">
                <FaMobileScreenButton className="text-cyan-400 text-lg shrink-0" />
                <a href="tel:09120820120" className="hover:text-white transition-colors">
                  تلفن همراه: 09120820120
                </a>
              </li>

              <li className="flex items-center gap-3">
                <FaMailBulk className="text-cyan-400 text-lg shrink-0" />
                <a href="mailto:info@amozeshgahyab.ir" className="hover:text-white transition-colors">
                  info@amozeshgahyab.ir
                </a>
              </li>

              <li className="flex items-start gap-3">
                <FaClock className="mt-1 text-cyan-400 text-lg shrink-0" />
                <span>شنبه تا پنجشنبه ۸:۰۰ الی ۱۸:۰۰</span>
              </li>

              <li className="flex items-start gap-3">
                <FaLocationDot className="mt-1 text-cyan-400 text-lg shrink-0" />
                <span>
                  آدرس دفتر قزوین - ملاصدرا - خیابان میرداماد - نبش بن بست پویا - پلاک 45
                  شماره تماس موبایل 09127855049
                </span>
              </li>
            </ul>
          </div>

          {/* دسترسی سریع — همون لیست صفحات هدر، همون منطق غیرفعال‌سازی */}
          <div>
            <h3 className="mb-6 text-base font-bold text-cyan-400">
              دسترسی سریع
            </h3>
            <ul className="space-y-4 text-sm">
              {navItems.map((item) =>
                item.disabled ? (
                  <li key={item.href}>
                    <span
                      title="به‌زودی"
                      aria-disabled="true"
                      className="cursor-not-allowed text-gray-500"
                    >
                      {item.label}
                    </span>
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:text-white transition-colors">
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* دسته‌بندی‌های پرطرفدار — از API واقعی؛ صفحه‌ی مقصد هنوز نیست، پس غیرفعال */}
          <div>
            <h3 className="mb-6 text-base font-bold text-cyan-400">
              دسته‌بندی‌های پرطرفدار
            </h3>
            <ul className="space-y-4 text-sm">
              {popularCourses.length === 0 ? (
                <li className="text-gray-500">به‌زودی</li>
              ) : (
                popularCourses.map((course) => (
                  <li key={course.id}>
                    <span
                      title="به‌زودی"
                      aria-disabled="true"
                      className="cursor-not-allowed text-gray-500"
                    >
                      {course.title}
                    </span>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* شهرهای پرطرفدار — از API واقعی؛ صفحه‌ی مقصد هنوز نیست، پس غیرفعال */}
          <div>
            <h3 className="mb-6 text-base font-bold text-cyan-400">
              شهرهای پرطرفدار
            </h3>
            <ul className="space-y-4 text-sm">
              {popularCities.length === 0 ? (
                <li className="text-gray-500">به‌زودی</li>
              ) : (
                popularCities.map((city) => (
                  <li key={city.id}>
                    <span
                      title="به‌زودی"
                      aria-disabled="true"
                      className="cursor-not-allowed text-gray-500"
                    >
                      {city.name}
                    </span>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>

        {/* درباره سامانه + اینماد — دیتا و کد اینماد کاملاً دست‌نخورده، فقط جای مناسب */}
        <div className="mt-12 grid gap-10 border-t border-slate-700 pt-10 lg:grid-cols-2">
          <div>
            <h3 className="mb-6 text-2xl font-bold text-cyan-400">
              درباره سامانه آموزشگاه یاب
            </h3>
            <p className="leading-8 text-gray-400 mb-6">
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

      <div className="border-t border-slate-700">
        <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-6 py-5 text-sm text-gray-400 md:flex-row">
          <span>© {new Date().getFullYear()} تمامی حقوق محفوظ است.</span>

          <div className="flex items-center gap-5">
            <Link href="/" className="hover:text-white transition-colors">
              amoozeshgahyab.ir
            </Link>
            <span
              title="به‌زودی"
              aria-disabled="true"
              className="cursor-not-allowed text-gray-500"
            >
              قوانین و مقررات
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}