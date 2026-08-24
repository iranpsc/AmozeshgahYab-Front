import {
  FaSearch,
  FaBalanceScale,
  FaComments,
  FaHeadset,
  FaShieldAlt,
  FaBolt,
} from "react-icons/fa";
import type { IconType } from "react-icons";

type Badge = {
  icon: IconType;
  title: string;
};

const badges: Badge[] = [
  { icon: FaSearch, title: "جستجوی هوشمند" },
  { icon: FaBalanceScale, title: "مقایسه آسان" },
  { icon: FaComments, title: "نظرات واقعی کاربران" },
  { icon: FaHeadset, title: "پشتیبانی ۲۴/۷" },
  { icon: FaShieldAlt, title: "تضمین بازگشت وجه" },
  { icon: FaBolt, title: "ثبت‌نام سریع" },
];

/** سکشن کاملاً استاتیک — بدون fetch، بدون client component */
export default function TrustBadges() {
  return (
    <section className="px-4 py-5 lg:px-8">
      <div className=" w-full px-4 py-4 lg:px-8 bg-surface border border-border rounded-2xl">
      <div className="grid grid-cols-2 gap-0 divide-x  divide-border rounded-2xl   sm:grid-cols-3 lg:grid-cols-6 lg:divide-y-0  ">
        {badges.map(({ icon: Icon, title }) => (
          <div key={title} className="flex items-center gap-2.5 px-3 py-3.5">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary-light text-primary">
              <Icon size={15} />
            </span>
            <span className="text-sm font-medium leading-6 text-foreground">
              {title}
            </span>
          </div>
        ))}
      </div>
    </div>
    </section>
  );
}