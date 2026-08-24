"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { FaMapMarkerAlt, FaChevronDown, FaSearch } from "react-icons/fa";
import type { Province } from "@/lib/academies";

type Props = {
  provinces: Province[];
  defaultProvinceId?: string;
};

/**
 * انتخاب استان با آپدیت query param ?province= روی URL (نه fetch مستقیم تو کلاینت).
 * این باعث میشه سکشن‌های Server Component (CityAcademies و...) با استان جدید
 * دوباره روی سرور fetch بشن و استریم بشن — بدون full reload.
 */
export default function ProvinceSelectDropdown({ provinces, defaultProvinceId }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  const selectedId =
    searchParams.get("province") ?? defaultProvinceId ?? String(provinces[0]?.id ?? "");
  const selectedProvince = provinces.find((p) => String(p.id) === selectedId) ?? provinces[0];

  const filteredProvinces = useMemo(() => {
    if (!query.trim()) return provinces;
    return provinces.filter((p) => p.name.includes(query.trim()));
  }, [provinces, query]);

  const handleSelect = (provinceId: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("province", String(provinceId));
    setOpen(false);
    setQuery("");
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className="relative shrink-0 lg:w-40">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-1.5 rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm font-medium text-foreground"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <FaMapMarkerAlt size={14} className="text-primary" />
        <span className="line-clamp-1">{selectedProvince?.name ?? "انتخاب استان"}</span>
        <FaChevronDown
          size={11}
          className={`mr-auto text-muted-foreground transition-transform ${open ? "rotate-180" : ""} ${isPending ? "animate-pulse" : ""}`}
        />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute z-20 mt-2 w-56 overflow-hidden rounded-xl border border-border bg-card shadow-lg">
            <div className="flex items-center gap-2 border-b border-border px-3 py-2">
              <FaSearch size={12} className="shrink-0 text-muted-foreground" />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="جستجوی استان..."
                className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>

            <ul role="listbox" className="max-h-56 overflow-y-auto p-1.5">
              {filteredProvinces.length === 0 && (
                <li className="px-3 py-2 text-center text-xs text-muted-foreground">
                  استانی پیدا نشد
                </li>
              )}
              {filteredProvinces.map((province) => (
                <li key={province.id}>
                  <button
                    type="button"
                    onClick={() => handleSelect(province.id)}
                    role="option"
                    aria-selected={province.id === selectedProvince?.id}
                    className={`w-full rounded-lg px-3 py-2 text-right text-sm transition-colors hover:bg-surface ${
                      province.id === selectedProvince?.id
                        ? "bg-primary-light font-semibold text-primary"
                        : "text-foreground"
                    }`}
                  >
                    {province.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}