export type NavItem = {
  label: string;
  href: string;
  /** فعلاً فقط صفحه اصلی فعاله؛ بقیه غیرفعال (به‌زودی) */
  disabled?: boolean;
};

export const navItems: NavItem[] = [
  { label: "صفحه اصلی", href: "/" },
  { label: "آموزشگاه‌ها", href: "/academies", disabled: true },
  { label: "دسته‌بندی‌ها", href: "/categories", disabled: true },
  { label: "مجله", href: "/magazine", disabled: true },
  { label: "درباره ما", href: "/about", disabled: true },
  { label: "تماس با ما", href: "/contact", disabled: true },
];