import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";


export const metadata: Metadata = {
  title: "آموزشگاه یاب | سامانه مدیریت آموزشگاه",
  description:
    "سامانه آموزشگاه یاب برای مدیریت و توسعه آموزشگاه‌ها",
  keywords: [
    "آموزشگاه یاب",
    "مدیریت آموزشگاه",
    "سامانه آموزشگاه",
    "amozeshgahyab"
  ],
  authors: [
    {
      name: "amozeshgahyab.ir"
    }
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "آموزشگاه یاب",
    description:
      "سامانه هوشمند مدیریت آموزشگاه",
    type: "website",
    locale: "fa_IR",
  },
};


export default function Home() {
  return (
    <div className="flex h-[55vh] flex-col items-center justify-center">

      <main className="flex w-full h-full flex-col items-center  text-3xl  bg-gradient-to-tr from-[#0F172A] via-[#0e1e42] to-[#155E75]">

       <h1 className=" mt-20 text-white font-bold text-4xl  font-rokh"> آموزشگاه یاب</h1>
        <Link className="text-xl bg-[#0F172A] text-cyan-300 py-4 px-5 my-10 rounded-xl" href={`/login`}>برای ورود کیلیک کنید</Link>
      </main>

    </div>
  );
}