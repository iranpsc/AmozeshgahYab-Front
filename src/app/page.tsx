import type { Metadata } from "next";
import Link from "next/link";


const SITE_NAME = "آموزشگاه یاب";
// const SITE_URL = "https://amoozeshgahyab.ir";

export const metadata: Metadata = {
  // metadataBase: new URL(SITE_URL),

  title: {
    default: "آموزشگاه یاب | سامانه مدیریت آموزشگاه",
    template: `%s | ${SITE_NAME}`,
  },

  description:
    "سامانه آموزشگاه یاب، نرم‌افزار جامع مدیریت آموزشگاه برای مدیریت ثبت‌نام، کلاس‌ها، اساتید، هنرجویان، امور مالی و گزارش‌گیری.",

  applicationName: SITE_NAME,

  keywords: [
    "آموزشگاه",
    "آموزشگاه یاب",
    "مدیریت آموزشگاه",
    "نرم افزار آموزشگاه",
    "سیستم مدیریت آموزشگاه",
    "ثبت نام آموزشگاه",
    "مدیریت کلاس",
    "مدیریت هنرجویان",
    "مدیریت اساتید",
    "سامانه آموزشی",
    "amoozeshgahyab",
  ],

  authors: [
    {
      name: "Amoozeshgahyab",
      url: 'https://amoozeshgahyab.ir"',
    },
  ],

  creator: "Amoozeshgahyab",

  publisher: "Amoozeshgahyab",

  category: "Education",

  alternates: {
    canonical: 'https://amoozeshgahyab.ir"',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: 'https://amoozeshgahyab.ir"',
    siteName: SITE_NAME,
    title: "آموزشگاه یاب | سامانه مدیریت آموزشگاه",
    description:
      "سامانه مدیریت آموزشگاه برای مدیریت ثبت‌نام، کلاس‌ها، اساتید، هنرجویان و امور مالی.",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "آموزشگاه یاب",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "آموزشگاه یاب",
    description: "سامانه هوشمند مدیریت آموزشگاه",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",
};


export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "آموزشگاه یاب",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",

    url: "https://amoozeshgahyab.ir",

    description:
      "سامانه مدیریت آموزشگاه برای مدیریت ثبت‌نام، کلاس‌ها، اساتید، هنرجویان و امور مالی.",

    inLanguage: "fa",

    publisher: {
      "@type": "Organization",
      name: "آموزشگاه یاب",
    },

    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "IRR",
    },
  };
  return (
    <div className="flex h-[58vh] flex-col items-center justify-center">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />
      <main className="flex w-full h-full flex-col items-center  text-3xl  bg-gradient-to-tr from-[#0F172A] via-[#0e1e42] to-[#155E75]">

        <h1 className=" mt-20 text-white font-bold text-4xl  font-rokh"> آموزشگاه یاب</h1>
        <Link className="text-xl text-[#0F172A] bg-cyan-300 py-4 px-5 my-10 rounded-xl" href={`/login`}>برای ورود کیلیک کنید</Link>
      </main>

    </div>
  );
}