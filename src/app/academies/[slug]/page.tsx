
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

import {
  getInstituteBySlug,
  mapInstituteToDetail,
  ApiError,
} from "@/lib/academies";

import { SITE_NAME, absoluteUrl } from "@/lib/site-config";

import InstituteHero from "@/components/sections/InstituteHero";
import InstituteStats from "@/components/sections/InstituteStats";
import InstituteAbout from "@/components/sections/InstituteAbout";
import InstituteCourses, {
  InstituteSubcourses,
} from "@/components/sections/InstituteCourses";
import InstituteLocation, {
  InstituteContact,
} from "@/components/sections/InstituteMap";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/* -------------------------------------------------------------------------- */
/*                                Data Loader                                 */
/* -------------------------------------------------------------------------- */

async function loadInstitute(slug: string) {
  try {
    const raw = await getInstituteBySlug(slug);

    return mapInstituteToDetail(raw);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }

    throw error;
  }
}

/* -------------------------------------------------------------------------- */
/*                               SEO Metadata                                 */
/* -------------------------------------------------------------------------- */

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const institute = await loadInstitute(slug);

  if (!institute) {
    return {
      title: "آموزشگاه پیدا نشد",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonicalPath = `/academies/${institute.slug}`;
  const canonicalUrl = absoluteUrl(canonicalPath);

  const title = `آموزشگاه ${institute.name}`;

  const description =
    institute.description?.trim() ||
    `اطلاعات آموزشگاه ${institute.name}، آدرس، شماره تماس، موقعیت مکانی و دوره‌های آموزشی در ${institute.cityName}.`;

  const imageUrl = institute.imageUrl
    ? absoluteUrl(institute.imageUrl)
    : undefined;

  return {
    title,
    description,

    alternates: {
      canonical: canonicalUrl,
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
      url: canonicalUrl,
      siteName: SITE_NAME,
      title,
      description,

      ...(imageUrl
        ? {
            images: [
              {
                url: imageUrl,
                alt: `تصویر ${institute.name}`,
              },
            ],
          }
        : {}),
    },

    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title,
      description,

      ...(imageUrl
        ? {
            images: [imageUrl],
          }
        : {}),
    },
  };
}

/* -------------------------------------------------------------------------- */
/*                                   Page                                     */
/* -------------------------------------------------------------------------- */

export default async function InstitutePage({ params }: PageProps) {
  const { slug } = await params;

  const institute = await loadInstitute(slug);

  if (!institute) {
    notFound();
  }

  const canonicalPath = `/academies/${institute.slug}`;
  const canonicalUrl = absoluteUrl(canonicalPath);

  const imageUrl = institute.imageUrl
    ? absoluteUrl(institute.imageUrl)
    : undefined;

  /* ------------------------------------------------------------------------ */
  /*                               JSON-LD                                    */
  /* ------------------------------------------------------------------------ */

  const address = {
    "@type": "PostalAddress",
    streetAddress: institute.address,
    addressLocality: institute.cityName,
    ...(institute.provinceName
      ? {
          addressRegion: institute.provinceName,
        }
      : {}),
    addressCountry: "IR",
  };

  /**
   * EducationalOrganization:
   * Describes the semantic nature of the institute.
   *
   * LocalBusiness:
   * Helps Google understand that this is a real-world physical business.
   *
   * Using both types in the same entity is valid Schema.org JSON-LD.
   */
  const instituteSchema: Record<string, unknown> = {
    "@type": ["LocalBusiness", "EducationalOrganization"],

    "@id": `${canonicalUrl}#institute`,

    name: institute.name,

    url: canonicalUrl,

    description:
      institute.description?.trim() ||
      `آموزشگاه ${institute.name} در ${institute.cityName}.`,

    address,

    ...(institute.mobileNumber || institute.landlinePhone
      ? {
          telephone:
            institute.mobileNumber || institute.landlinePhone,
        }
      : {}),

    ...(imageUrl
      ? {
          image: [imageUrl],
        }
      : {}),

    ...(typeof institute.latitude === "number" &&
    typeof institute.longitude === "number"
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: institute.latitude,
            longitude: institute.longitude,
          },
        }
      : {}),

    ...(institute.website
      ? {
          sameAs: [institute.website],
        }
      : {}),
  };

  /*
   * IMPORTANT:
   *
   * Do NOT add aggregateRating here merely because the API contains
   * rating/reviewsCount.
   *
   * If the reviews are controlled/managed by your own website,
   * Google considers these self-serving reviews and does not allow
   * the Review Rich Result for LocalBusiness/Organization.
   *
   * If later you have a valid independent review system that complies
   * with Google's guidelines, this section can be added conditionally.
   */

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",

    "@id": `${canonicalUrl}#breadcrumb`,

    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "صفحه اصلی",
        item: absoluteUrl("/"),
      },

      {
        "@type": "ListItem",
        position: 2,
        name: "آموزشگاه‌ها",
        item: absoluteUrl("/academies"),
      },

      {
        "@type": "ListItem",
        position: 3,
        name: institute.name,
        item: canonicalUrl,
      },
    ],
  };

  const webpageSchema = {
    "@type": "WebPage",

    "@id": `${canonicalUrl}#webpage`,

    url: canonicalUrl,

    name: `آموزشگاه ${institute.name}`,

    description:
      institute.description?.trim() ||
      `اطلاعات آموزشگاه ${institute.name}، آدرس، تماس، موقعیت مکانی و دوره‌های آموزشی.`,

    inLanguage: "fa-IR",

    isPartOf: {
      "@type": "WebSite",
      "@id": `${absoluteUrl("/")}#website`,
      url: absoluteUrl("/"),
      name: SITE_NAME,
      inLanguage: "fa-IR",
    },

    about: {
      "@id": `${canonicalUrl}#institute`,
    },

    mainEntity: {
      "@id": `${canonicalUrl}#institute`,
    },

    breadcrumb: {
      "@id": `${canonicalUrl}#breadcrumb`,
    },

    ...(imageUrl
      ? {
          primaryImageOfPage: {
            "@type": "ImageObject",
            url: imageUrl,
          },
        }
      : {}),
  };

  const websiteSchema = {
    "@type": "WebSite",

    "@id": `${absoluteUrl("/")}#website`,

    url: absoluteUrl("/"),

    name: SITE_NAME,

    inLanguage: "fa-IR",
  };

  const jsonLd = {
    "@context": "https://schema.org",

    "@graph": [
      websiteSchema,
      instituteSchema,
      webpageSchema,
      breadcrumbSchema,
    ],
  };

  return (
    <main className="mx-auto py-6 px-4 lg:px-8 2xl:px-20">
      {/* ------------------------------------------------------------------ */}
      {/*                              JSON-LD                               */}
      {/* ------------------------------------------------------------------ */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      {/* ------------------------------------------------------------------ */}
      {/*                            Breadcrumb                              */}
      {/* ------------------------------------------------------------------ */}

      <nav
        aria-label="مسیر"
        className="mb-3 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground"
      >
        <Link href="/" className="hover:text-primary">
          صفحه اصلی
        </Link>

        <span aria-hidden="true">/</span>

        <Link href="/academies" className="hover:text-primary">
          آموزشگاه‌ها
        </Link>

        <span aria-hidden="true">/</span>

        <span className="text-foreground">
          {institute.name}
        </span>
      </nav>

      {/* ------------------------------------------------------------------ */}
      {/*                              Content                               */}
      {/* ------------------------------------------------------------------ */}

      <div className="flex flex-col gap-4">
        <InstituteHero institute={institute} />

        <InstituteStats institute={institute} />

        <div className="gap-4 flex flex-col lg:flex-row max-w-full relative">
          <div className="flex flex-col gap-4 order-2 lg:order-1 w-full lg:w-[60%] 2xl:w-[75%]">
            <InstituteAbout institute={institute} />

            <InstituteCourses institute={institute} />

            <InstituteSubcourses institute={institute} />
          </div>

          <aside className="order-1 lg:order-2 w-full lg:w-[40%] 2xl:w-[25%]">
            <div className="lg:sticky lg:top-20 flex flex-col gap-4">
              <InstituteLocation institute={institute} />

              <InstituteContact institute={institute} />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

