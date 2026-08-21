import { Suspense } from "react";

import Hero from "@/components/sections/Hero/Hero";
import Categories, { CategoriesSkeleton } from "@/components/sections/Categories";
import FeaturedAcademies, {
  FeaturedAcademiesSkeleton,
} from "@/components/sections/FeaturedAcademies";
import CityAcademies, {
  CityAcademiesSkeleton,
} from "@/components/sections/CityAcademies";
import TrustBadges from "@/components/sections/TrustBadges";
import { getProvinces, DEFAULT_PROVINCE_NAME } from "@/lib/academies";
import Articles from "@/components/sections/Articles";
import AppBanner from "@/components/sections/AppBanner";
import { Metadata } from "next";
type PageProps = {
  searchParams: Promise<{ province?: string }>;
};
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

  // manifest: "/site.webmanifest",
};
export default async function HomePage({ searchParams }: PageProps) {
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
  const { province } = await searchParams;

  // چون API فقط id عددی استان رو قبول می‌کنه (نه اسم)، همینجا مقدار خام
  // URL رو به یک Province واقعی تبدیل می‌کنیم.
  const provinces = await getProvinces();
  const selectedProvince =
    provinces.find((p) => String(p.id) === province) ??
    provinces.find((p) => p.name === DEFAULT_PROVINCE_NAME) ??
    provinces[0];
  const provinceSlug = selectedProvince ? String(selectedProvince.id) : undefined;

  return (
    <>

      <main className="2xl:px-10">
              <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />
        <Hero provinceSlug={provinceSlug} />


        {selectedProvince && (
          <Suspense key={`province-${provinceSlug}`} fallback={<CityAcademiesSkeleton />}>
            <CityAcademies
              provinceSlug={provinceSlug!}
              provinceLabel={selectedProvince.name}
            />
          </Suspense>
        )}
        <Suspense fallback={<CategoriesSkeleton />}>
          <Categories />
        </Suspense>

        <Suspense fallback={<FeaturedAcademiesSkeleton />}>
          <FeaturedAcademies />
        </Suspense>

        <TrustBadges />
        <Articles />
        <AppBanner />
      </main>
    </>
  );
}