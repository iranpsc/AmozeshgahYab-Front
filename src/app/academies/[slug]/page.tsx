import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getInstituteBySlug, mapInstituteToDetail, ApiError } from "@/lib/academies";
import { SITE_NAME, absoluteUrl } from "@/lib/site-config";
import InstituteHero from "@/components/sections/InstituteHero";
import InstituteStats from "@/components/sections/InstituteStats";
import InstituteAbout from "@/components/sections/InstituteAbout";
import InstituteCourses, { InstituteSubcourses } from "@/components/sections/InstituteCourses";
import InstituteLocation, { InstituteContact } from "@/components/sections/InstituteMap";

type PageProps = {
  params: Promise<{ slug: string }>;
};

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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const institute = await loadInstitute(slug);

  if (!institute) {
    return { title: "آموزشگاه پیدا نشد" };
  }

  const title = `آموزشگاه ${institute.name}`;
  const description =
    institute.description ||
    `اطلاعات تماس، آدرس و دوره‌های ${institute.name} در ${institute.cityName}.`;
  const canonicalPath = `/academies/${institute.slug}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      type: "website",
      locale: "fa_IR",
      url: absoluteUrl(canonicalPath),
      siteName: SITE_NAME,
      title,
      description,
      images: institute.imageUrl ? [{ url: absoluteUrl(institute.imageUrl) }] : undefined,
    },
  };
}

export default async function InstitutePage({ params }: PageProps) {
  const { slug } = await params;
  const institute = await loadInstitute(slug);

  if (!institute) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: institute.name,
    url: absoluteUrl(`/academies/${institute.slug}`),
    address: {
      "@type": "PostalAddress",
      streetAddress: institute.address,
      addressLocality: institute.cityName,
      addressRegion: institute.provinceName || undefined,
      addressCountry: "IR",
    },
    ...(institute.mobileNumber || institute.landlinePhone
      ? { telephone: institute.mobileNumber || institute.landlinePhone }
      : {}),
    ...(institute.imageUrl ? { image: absoluteUrl(institute.imageUrl) } : {}),
    ...(institute.website ? { sameAs: [institute.website] } : {}),
    ...(institute.latitude && institute.longitude
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: institute.latitude,
            longitude: institute.longitude,
          },
        }
      : {}),
    ...(typeof institute.rating === "number" && typeof institute.reviewsCount === "number"
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: institute.rating,
            reviewCount: institute.reviewsCount,
          },
        }
      : {}),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "صفحه اصلی", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "آموزشگاه‌ها", item: absoluteUrl("/academies") },
      {
        "@type": "ListItem",
        position: 3,
        name: institute.name,
        item: absoluteUrl(`/academies/${institute.slug}`),
      },
    ],
  };

  return (
    <main className="mx-auto  py-6 lg:px-8 2xl:px-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <nav aria-label="مسیر" className="mb-3 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-primary">
          صفحه اصلی
        </Link>
        <span>/</span>
        <Link href="/academies" className="hover:text-primary">
          آموزشگاه‌ها
        </Link>
        <span>/</span>
        <span className="text-foreground">{institute.name}</span>
      </nav>

      <div className="flex flex-col gap-4">
        <InstituteHero institute={institute} />
        <InstituteStats institute={institute} />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
          <div className="flex flex-col gap-4">
            <InstituteAbout institute={institute} />
            <InstituteCourses institute={institute} />
            <InstituteSubcourses institute={institute} />
          </div>

          <div className="flex flex-col gap-4">
            <InstituteLocation institute={institute} />
            <InstituteContact institute={institute} />
          </div>
        </div>
      </div>
    </main>
  );
}
