import { FaPhoneAlt, FaMobileAlt, FaInstagram, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import type { InstituteDetailData } from "@/lib/academies";

type Props = {
  institute: InstituteDetailData;
};

export default function InstituteContact({ institute }: Props) {
  const socials = [
    institute.instagram && { href: institute.instagram, icon: FaInstagram, label: "اینستاگرام" },
    institute.telegram && { href: institute.telegram, icon: FaTelegramPlane, label: "تلگرام" },
    institute.whatsapp && { href: institute.whatsapp, icon: FaWhatsapp, label: "واتساپ" },
  ].filter((x): x is { href: string; icon: typeof FaInstagram; label: string } => Boolean(x));

  return (
    <section className="rounded-2xl border border-border bg-card p-4">
      <h3 className="mb-5 text-base lg:text-xl font-bold text-foreground">راه‌های ارتباطی</h3>

      <div className="flex flex-col gap-2.5">
        {institute.landlinePhone && (
          <div className="flex items-center justify-between text-sm lg:text-base">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <FaPhoneAlt size={16} />
              تلفن ثابت
            </span>
            <a href={`tel:${institute.landlinePhone}`} dir="ltr" className="font-medium text-foreground hover:text-primary">
              {institute.landlinePhone}
            </a>
          </div>
        )}
        {institute.mobileNumber && (
          <div className="flex items-center justify-between text-sm lg:text-base">
            <span className="flex items-center gap-2 text-muted-foreground">
              <FaMobileAlt size={16} />
              شماره موبایل
            </span>
            <a href={`tel:${institute.mobileNumber}`} dir="ltr" className="font-medium text-foreground hover:text-primary">
              {institute.mobileNumber}
            </a>
          </div>
        )}
      </div>

      {socials.length > 0 && (
        <div className="mt-4 flex items-center gap-2 border-t border-border pt-4">
          {socials.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="grid h-9 w-9 place-items-center rounded-lg bg-surface text-muted-foreground transition-colors hover:bg-primary-light hover:text-primary"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
