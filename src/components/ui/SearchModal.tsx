"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaTimes, FaSearch, FaSpinner } from "react-icons/fa";
import { getHomeInstitutes, mapInstituteToCard, type AcademyCardData } from "@/lib/academies";

type Props = {
  open: boolean;
  onClose: () => void;
};

const DEBOUNCE_MS = 350;

export default function SearchModal({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<AcademyCardData[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // فوکوس روی اینپوت لحظه‌ی باز شدن مودال
  useEffect(() => {
    if (open) inputRef.current?.focus();
    else {
      setQuery("");
      setResults([]);
      setErrorMessage(null);
    }
  }, [open]);

  // بستن با Escape
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  // قفل اسکرول پس‌زمینه بدون پرش: به‌جای overflow:hidden (که با حذف
  // اسکرول‌بار عرض صفحه رو عوض می‌کنه و باعث پرش محتوا می‌شه)، body رو
  // fixed می‌کنیم و موقعیت اسکرول فعلی رو با top منفی حفظ می‌کنیم؛ موقع
  // بسته‌شدن دقیقاً به همون نقطه برمی‌گردونیم.
  useEffect(() => {
    if (!open) return;
    const scrollY = window.scrollY;
    const { body } = document;
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    return () => {
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  // جستجوی زنده با debounce + لغو درخواست قدیمی
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      setErrorMessage(null);
      return;
    }

    const controller = new AbortController();
    setLoading(true);

    const timer = setTimeout(async () => {
      try {
        const { results: raw } = await getHomeInstitutes(
          { search: query.trim(), page: 1 },
          { signal: controller.signal }
        );
        setResults(raw.map(mapInstituteToCard));
        setErrorMessage(null);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
        setErrorMessage(error instanceof Error ? error.message : "خطای ناشناخته");
      } finally {
        setLoading(false);
      }
    }, DEBOUNCE_MS);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center bg-black/50 h-svh w-screen p-4 pt-16 sm:items-center sm:pt-4">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden
      />

      <div className="relative flex w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
        {/* هدر مودال: اینپوت + دکمه بستن */}
        <div className="flex items-center gap-2 border-b border-border p-3">
          <FaSearch size={16} className="shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="نام آموزشگاه یا دوره را جستجو کنید..."
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          {loading && <FaSpinner size={15} className="shrink-0 animate-spin text-muted-foreground" />}
          <button
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-muted-foreground hover:bg-surface hover:text-foreground"
            aria-label="بستن جستجو"
          >
            <FaTimes size={16} />
          </button>
        </div>

        {/* نتایج */}
        <div className="max-h-[60vh] overflow-y-auto sm:max-h-96">
          {!query.trim() && (
            <p className="px-4 py-10 text-center text-sm text-muted-foreground">
              برای جستجو، نام آموزشگاه یا دوره رو تایپ کنید
            </p>
          )}

          {query.trim() && errorMessage && (
            <p className="px-4 py-10 text-center text-sm text-danger">
              خطا در جستجو: {errorMessage}
            </p>
          )}

          {query.trim() && !errorMessage && !loading && results.length === 0 && (
            <p className="px-4 py-10 text-center text-sm text-muted-foreground">
              نتیجه‌ای برای «{query}» پیدا نشد
            </p>
          )}

          {results.length > 0 && (
            <ul>
              {results.map((academy) => (
                <li key={academy.id}>
                  <Link
                    href={academy.href}
                    onClick={onClose}
                    className="flex items-center gap-3 px-3 py-2.5 transition-colors hover:bg-surface"
                  >
                    <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-surface">
                      {academy.imageUrl ? (
                        <Image
                          src={academy.imageUrl}
                          alt={academy.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      ) : (
                        <span className="grid h-full w-full place-items-center text-muted-foreground">
                          <FaSearch size={14} />
                        </span>
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="line-clamp-1 block text-sm font-bold text-foreground">
                        {academy.name}
                      </span>
                      <span className="line-clamp-1 block text-xs text-muted-foreground">
                        {academy.cityName}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}