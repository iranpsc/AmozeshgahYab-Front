import Link from "next/link";
import { FaMailBulk } from "react-icons/fa";
import {
    FaLocationDot,
    FaPhone,
    FaClock,
    FaMobileScreenButton,
    FaAddressBook,
    FaAddressCard,
    FaMessage,
    FaMailchimp,
} from "react-icons/fa6";

export default function Footer() {
    return (
        <footer className="bg-[#0F172A] text-gray-300">
            <div className="container mx-auto px-6 py-14">
                <div className="grid gap-10 lg:grid-cols-2">

                    {/* Contact */}
                    <div>
                        <h3 className="mb-6 text-2xl font-bold text-cyan-400">
                            اطلاعات ارتباط و پشتیبانی
                        </h3>

                        <ul className="space-y-5">
                            {/* <li className="flex items-start gap-3">
                                <FaLocationDot className="mt-1 text-cyan-400 text-lg shrink-0" />
                                <span>تهران، میدان آزادی، خیابان نمونه، پلاک ۵۶</span>
                            </li> */}

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
                                <span>
                                    شنبه تا پنجشنبه
                                    
                                    ۸:۰۰ الی ۱۸:۰۰
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <FaLocationDot className="mt-1 text-cyan-400 text-lg shrink-0" />
                                آدرس دفتر قزوین - ملاصدرا - خیابان میرداماد - نبش بن بست پویا - پلاک 45
                                شماره تماس موبایل 09127855049
                            </li>
                        </ul>
                    </div>

                    {/* About */}
                    <div className="flex flex-col">
                        <h3 className="mb-6 text-2xl font-bold text-cyan-400">
                            درباره سامانه آموزشگاه یاب
                        </h3>

                        <p className="leading-8 text-gray-400 mb-6">
                            سامانه آموزشگاه یک سیستم مدیریت آموزشی مدرن است که برای
                            مدیریت ثبت‌نام، کلاس‌ها، اساتید و هنرجویان طراحی شده و
                            امکانات کاملی برای مدیریت فرآیندهای آموزشی فراهم می‌کند.
                        </p>
                        <div className="flex items-center justify-center ">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `<a referrerpolicy='origin' target='_blank' href='https://trustseal.enamad.ir/?id=754796&Code=7TnLHQ7fELIsmQDvWjxzsPjzf4rCXYXj'><img referrerpolicy='origin' src='https://trustseal.enamad.ir/logo.aspx?id=754796&Code=7TnLHQ7fELIsmQDvWjxzsPjzf4rCXYXj' alt='' style='cursor:pointer' code='7TnLHQ7fELIsmQDvWjxzsPjzf4rCXYXj'></a>`,
                    }}
                  />
                </div>
                    </div>

                </div>
            </div>

            <div className="border-t border-slate-700">
                <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-6 py-5 text-sm text-gray-400 md:flex-row">

                    <span>
                        © {new Date().getFullYear()} تمامی حقوق محفوظ است.
                    </span>

                    <Link
                        href="/"
                        className="hover:text-white transition-colors"
                    >
                        amoozeshgahyab.ir
                    </Link>

                </div>
            </div>
        </footer>
    );
}