"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { FaSearch, FaFilter, FaTimes } from "react-icons/fa";
import type { City, Course, Province, Subcourse } from "@/lib/academies";
import { getSubcourses } from "@/lib/academies";

type Props = {
  provinces: Province[];
  cities: City[];
  courses: Course[];
};

const GENDER_OPTIONS: { value: string; label: string }[] = [
  { value: "", label: "همه" },
  { value: "mixed", label: "مختلط" },
  { value: "male", label: "مردانه" },
  { value: "female", label: "زنانه" },
];

const SORT_OPTIONS: { value: string; label: string }[] = [
  { value: "", label: "جدیدترین" },
  { value: "oldest", label: "قدیمی‌ترین" },
  { value: "name", label: "نام (الفبا)" },
];

const selectClass =
  "h-11 w-full appearance-none rounded-xl border border-border bg-surface px-3.5 text-sm text-foreground outline-none transition-colors focus:border-primary";

export default function AcademyFiltersPanel({ provinces, cities, courses }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // استیت محلی: تا زدن «اعمال فیلترها» چیزی به URL نوشته نمی‌شه — کمترین تعداد درخواست
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [province, setProvince] = useState(searchParams.get("province") ?? "");
  const [city, setCity] = useState(searchParams.get("city") ?? "");
  const [course, setCourse] = useState(searchParams.get("courses") ?? "");
  const [subcourse, setSubcourse] = useState(searchParams.get("subcourses") ?? "");
  const [gender, setGender] = useState(searchParams.get("gender") ?? "");
  const [ordering, setOrdering] = useState(searchParams.get("ordering") ?? "");

  const [subcourses, setSubcourses] = useState<Subcourse[]>([]);
  // شناسه‌ی دوره‌ای که subcourses بالا مال اونه — اگه با course فعلی فرق داشت یعنی
  // هنوز در حال گرفتنه (به‌جای یه state جدا برای loading، که باعث setState همزمان تو effect می‌شه)
  const [subcoursesLoadedFor, setSubcoursesLoadedFor] = useState<string | null>(null);
  const loadingSubcourses = course !== "" && subcoursesLoadedFor !== course;

  const filteredCities = useMemo(
    () => (province ? cities.filter((c) => String(c.province) === province) : cities),
    [cities, province]
  );

  // با تغییر دوره، زیردوره‌های مرتبط رو می‌گیریم؛ اگه endpoint نبود، فقط بخش زیردوره مخفی می‌مونه.
  // ریست‌کردن state موقع خالی‌شدن course تو خودِ onChange انجام می‌شه (نه اینجا)
  // چون setState مستقیم داخل بدنه‌ی effect (بدون callback خارجی) خطای lint می‌ده.
  useEffect(() => {
    if (!course) return;

    let cancelled = false;
    getSubcourses(course).then((list) => {
      if (!cancelled) {
        setSubcourses(list);
        setSubcoursesLoadedFor(course);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [course]);

  const hasActiveFilters =
    search || province || city || course || subcourse || gender || ordering;

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (province) params.set("province", province);
    if (city) params.set("city", city);
    if (course) params.set("courses", course);
    if (subcourse) params.set("subcourses", subcourse);
    if (gender) params.set("gender", gender);
    if (ordering) params.set("ordering", ordering);
    // فیلتر جدید یعنی صفحه‌بندی از اول شروع بشه
    startTransition(() => {
      router.push(`${pathname}${params.toString() ? `?${params}` : ""}`, { scroll: false });
    });
  };

  const clearFilters = () => {
    setSearch("");
    setProvince("");
    setCity("");
    setCourse("");
    setSubcourse("");
    setGender("");
    setOrdering("");
    startTransition(() => {
      router.push(pathname, { scroll: false });
    });
  };

  return (
    <div
      className={`flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 transition-opacity ${
        isPending ? "opacity-70" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-1.5 text-sm font-bold text-foreground">
          <FaFilter size={13} className="text-primary" />
          فیلترها
        </h2>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-danger"
          >
            <FaTimes size={11} />
            پاک کردن همه
          </button>
        )}
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
          جستجوی آموزشگاه
        </label>
        <div className="relative">
          <FaSearch
            size={13}
            className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applyFilters()}
            placeholder="جستجو در نام آموزشگاه..."
            className={`${selectClass} pr-9`}
          />
        </div>
      </div>

      <FilterField label="استان">
        <select
          value={province}
          onChange={(e) => {
            setProvince(e.target.value);
            setCity("");
          }}
          className={selectClass}
        >
          <option value="">همه استان‌ها</option>
          {provinces.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </FilterField>

      <FilterField label="شهر">
        <select value={city} onChange={(e) => setCity(e.target.value)} className={selectClass}>
          <option value="">همه شهرها</option>
          {filteredCities.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </FilterField>

      <FilterField label="دوره‌ها">
        <select
          value={course}
          onChange={(e) => {
            const value = e.target.value;
            setCourse(value);
            if (!value) {
              setSubcourses([]);
              setSubcourse("");
              setSubcoursesLoadedFor(null);
            }
          }}
          className={selectClass}
        >
          <option value="">همه دوره‌ها</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>
      </FilterField>

      {course && (
        <FilterField label="زیردوره‌ها">
          <select
            value={subcourse}
            onChange={(e) => setSubcourse(e.target.value)}
            disabled={loadingSubcourses || subcourses.length === 0}
            className={`${selectClass} disabled:cursor-not-allowed disabled:opacity-60`}
          >
            <option value="">همه زیردوره‌ها</option>
            {subcourses.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
        </FilterField>
      )}

      <FilterField label="جنسیت آموزشگاه">
        <div className="flex flex-col gap-2">
          {GENDER_OPTIONS.map((opt) => (
            <label
              key={opt.value || "all"}
              className="flex cursor-pointer items-center gap-2 text-sm text-foreground"
            >
              <input
                type="radio"
                name="gender"
                checked={gender === opt.value}
                onChange={() => setGender(opt.value)}
                className="h-4 w-4 accent-primary"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </FilterField>

      <FilterField label="ترتیب نمایش">
        <select
          value={ordering}
          onChange={(e) => setOrdering(e.target.value)}
          className={selectClass}
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value || "newest"} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </FilterField>

      <button
        type="button"
        onClick={applyFilters}
        disabled={isPending}
        className="flex h-11 items-center justify-center gap-1.5 rounded-xl bg-primary text-sm font-bold text-primary-foreground transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        <FaFilter size={12} />
        اعمال فیلترها
      </button>
    </div>
  );
}

function FilterField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</label>
      {children}
    </div>
  );
}
