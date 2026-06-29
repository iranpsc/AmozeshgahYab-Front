"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import api from "@/services/api";
import { logout } from "@/services/auth";

interface InstituteProfile {
  id: number;
  institute_name: string;
  mobile_number: string;
  landline_phone: string;
  address: string;
  postal_code: string;
  status: string;
}

export default function Dashboard() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [profile, setProfile] =
    useState<InstituteProfile | null>(null);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    void loadProfile();
  }, []);

  async function loadProfile() {
    try {
      setLoading(true);
      setError(null);

      const res = await api.get<InstituteProfile>(
        "/academy/institute/profile/"
      );

      setProfile(res.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          router.replace("/login");
          return;
        }

        if (err.response?.status === 400) {
          setError("پروفایل آموزشگاه هنوز ایجاد نشده است.");
          return;
        }

        setError("خطا در دریافت اطلاعات.");
      } else {
        setError("خطای غیرمنتظره‌ای رخ داده است.");
      }

      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    try {
      await logout();
    } catch (err) {
      console.error(err);
    } finally {
      router.replace("/login");
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="rounded-2xl bg-white px-8 py-6 shadow">
          در حال بارگذاری...
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
        <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow">
          <h1 className="mb-4 text-2xl font-bold text-red-600">
            خطا
          </h1>

          <p className="mb-6 text-gray-600">
            {error}
          </p>

          <div className="flex gap-5">
            <button
              onClick={() => void loadProfile()}
              className="rounded-lg bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
            >
              تلاش مجدد
            </button>
            <button
              onClick={handleLogout}
              className="rounded-lg bg-red-500 px-5 py-2 text-white transition cursor-pointer hover:bg-red-600"
            >
              خروج
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="rounded-2xl bg-white px-8 py-6 shadow">
          اطلاعاتی برای نمایش وجود ندارد.
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-5xl">

        <div className="mb-6 flex items-center justify-between rounded-2xl bg-white p-6 shadow-sm">
          <div>
            <h1 className="text-3xl font-bold">
              داشبورد
            </h1>

            <p className="mt-2 text-gray-500">
              خوش آمدید
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-500 px-5 py-2 text-white transition cursor-pointer hover:bg-red-600"
          >
            خروج
          </button>
        </div>

        <div className="grid gap-5 md:grid-cols-2">

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="mb-2 text-sm text-gray-500">
              نام آموزشگاه
            </p>

            <p className="text-xl font-bold">
              {profile.institute_name}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="mb-2 text-sm text-gray-500">
              شماره موبایل
            </p>

            <p className="text-xl font-bold">
              {profile.mobile_number}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="mb-2 text-sm text-gray-500">
              تلفن ثابت
            </p>

            <p className="text-xl font-bold">
              {profile.landline_phone}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="mb-2 text-sm text-gray-500">
              کد پستی
            </p>

            <p className="text-xl font-bold">
              {profile.postal_code}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="mb-2 text-sm text-gray-500">
              وضعیت
            </p>

            <p className="text-xl font-bold">
              {profile.status}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm md:col-span-2">
            <p className="mb-2 text-sm text-gray-500">
              آدرس
            </p>

            <p className="text-lg leading-8">
              {profile.address}
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}