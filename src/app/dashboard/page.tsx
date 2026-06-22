"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import { logout } from "@/services/auth";
import { useRouter } from "next/navigation";

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

  const [profile, setProfile] =
    useState<InstituteProfile | null>(null);

  const [loading, setLoading] =
    useState<boolean>(true);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const res = await api.get(
        "/academy/institute/profile/"
      );

      setProfile(res.data);
    } catch (error) {
      console.error(error);
      router.replace("/login");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }

    router.replace("/login");
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="rounded-xl bg-white px-8 py-6 shadow">
          در حال بارگذاری...
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-4xl">

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
            className="rounded-lg bg-red-500 px-5 py-2 text-white transition hover:bg-red-600"
          >
            خروج
          </button>
        </div>

        {profile && (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-2 text-sm text-gray-500">
                نام موسسه
              </h2>

              <p className="text-xl font-bold">
                {profile.institute_name}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-2 text-sm text-gray-500">
                شماره موبایل
              </h2>

              <p className="text-xl font-bold">
                {profile.mobile_number}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-2 text-sm text-gray-500">
                تلفن ثابت
              </h2>

              <p className="text-xl font-bold">
                {profile.landline_phone}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-2 text-sm text-gray-500">
                کد پستی
              </h2>

              <p className="text-xl font-bold">
                {profile.postal_code}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm md:col-span-2">
              <h2 className="mb-2 text-sm text-gray-500">
                آدرس
              </h2>

              <p className="text-lg">
                {profile.address}
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}