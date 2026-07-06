"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import api from "@/services/api";
import { logout } from "@/services/auth";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Loading from "@/components/dashboard/LoadingScreen";
import ProfileCard from "@/components/dashboard/ProfileCard";
import CreateProfileForm from "@/components/dashboard/CreateProfileForm";
import EditProfileForm from "@/components/dashboard/EditProfileForm";
import type { InstituteBranding, InstituteProfile } from "@/services/institute";
// import Button from "@/components/form/Button";
import CreateBrandingForm from "@/components/dashboard/CreateBrandingForm";
import BrandingCard from "@/components/dashboard/BrandingCard";
import EditBrandingForm from "@/components/dashboard/EditBrandingForm";
import DashboardStepper from "@/components/dashboard/DashboardStepper";
import CompletedDashboard from "@/components/dashboard/CompletedDashboard";
interface Province {
  id: number;
  name: string;
}

interface City {
  id: number;
  name: string;
  province: number;
}
interface Course {
  id: number;
  title: string;
}


export default function Dashboard() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [profile, setProfile] =
    useState<InstituteProfile | null>(null);

  const [hasProfile, setHasProfile] =
    useState(false);

  const [isEditing, setIsEditing] =
    useState(false);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isCreatingBranding, setIsCreatingBranding] =
    useState(false);
  const [branding, setBranding] =
    useState<InstituteBranding | null>(null);

  const [hasBranding, setHasBranding] =
    useState(false);

  const [isBrandingEditing, setIsBrandingEditing] =
    useState(false);
  const completed =
    profile?.status === "approved" &&
    branding?.status === "approved";

  useEffect(() => {
    void Promise.all([
      loadProfile(),
      loadBranding(),
      loadLocationData(

      ),
    ]);
  }, []);
  async function loadLocationData() {
    const [provinceRes, cityRes, courseRes] =
      await Promise.all([
        api.get<Province[]>("/academy/provinces/"),
        api.get<City[]>("/academy/cities/"),
        api.get<Course[]>("/academy/courses/"),
      ]);


    setProvinces(provinceRes.data);
    setCities(cityRes.data);
    setCourses(courseRes.data);
  }


  async function loadProfile() {
    try {
      setLoading(true);

      const res =
        await api.get<InstituteProfile>(
          "/academy/institute/profile/"
        );

      setProfile(res.data);
      setHasProfile(true);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          router.replace("/login");
          return;
        }

        if (err.response?.status === 400) {
          setHasProfile(false);
          setProfile(null);
          return;
        }
      }

      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  async function loadBranding() {
    try {
      const res =
        await api.get<InstituteBranding>(
          "/academy/institute/branding/"
        );

      setBranding(res.data);
      setHasBranding(true);

    } catch (err) {
      if (
        axios.isAxiosError(err) &&
        err.response?.status === 400
      ) {
        setBranding(null);
        setHasBranding(false);
        return;
      }

      console.error(err);
    }
  }

  async function handleLogout() {
    await logout();
    router.replace("/login");
  }

  async function createProfile(data: {

    institute_name: string;
    mobile_number: string;
    landline_phone: string;
    province: number;
    city: number;
    address: string;
    postal_code: string;
  }) {
    try {
      const res = await api.post(
        "/academy/institute/profile/",
        data
      );

      setProfile(res.data);
      setHasProfile(true);
    } catch (err) {
      throw err;
    }
  }
  async function editProfile(data: {
    institute_name: string;
    mobile_number: string;
    landline_phone: string;
    province: number;
    city: number;
    address: string;
    postal_code: string;
  }) {
    await api.put(
      "/academy/institute/profile/",
      data
    );

    await loadProfile();

    setIsEditing(false);
  }
async function editBranding(data: {
  courses: number[];
  logo: File | null;
  banner: File | null;
}) {
  const formData = new FormData();

  data.courses.forEach((course) => {
    formData.append("courses", String(course));
  });

  if (data.logo) {
    formData.append("logo", data.logo);
  }

  if (data.banner) {
    formData.append("banner", data.banner);
  }

  await api.put(
    "/academy/institute/branding/",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  await loadBranding();

  setIsBrandingEditing(false);
}
async function createBranding(data: {
  courses: number[];
  logo: File | null;
  banner: File | null;
}) {
  try {
    const formData = new FormData();

    data.courses.forEach((course) => {
      formData.append("courses", String(course));
    });

    if (data.logo) {
      formData.append("logo", data.logo);
    }

    if (data.banner) {
      formData.append("banner", data.banner);
    }

    await api.post(
      "/academy/institute/branding/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    await loadBranding();

    setIsCreatingBranding(false);
  } catch (err) {
    throw err;
  }
}

  if (loading) {
    return <Loading />;
  }
if (completed && profile && branding) {
  if (isEditing) {
    return (
      <main className="min-h-screen bg-cyan-50">
        <DashboardHeader
          onLogout={handleLogout}
          title="آموزشگاه یاب"
        />

        <div className="mx-auto max-w-6xl p-6">
          <EditProfileForm
            profile={profile}
            provinces={provinces}
            cities={cities}
            onSubmit={editProfile}
            onCancel={() => setIsEditing(false)}
          />
        </div>
      </main>
    );
  }

  if (isBrandingEditing) {
    return (
      <main className="min-h-screen bg-cyan-50">
        <DashboardHeader
          onLogout={handleLogout}
          title="آموزشگاه یاب"
        />

        <div className="mx-auto max-w-6xl p-6">
          <EditBrandingForm
            branding={branding}
            courses={courses}
            onSubmit={editBranding}
            onCancel={() => setIsBrandingEditing(false)}
          />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cyan-50">
      <DashboardHeader
        onLogout={handleLogout}
        title="آموزشگاه یاب"
      />

      <CompletedDashboard
        profile={profile}
        branding={branding}
        courses={courses}
        onEditProfile={() => setIsEditing(true)}
        onEditBranding={() => setIsBrandingEditing(true)}
      />
    </main>
  );
}

  return (
    <main className="min-h-screen  bg-cyan-50">
      <DashboardHeader
        onLogout={handleLogout} title={"آموزشگاه یاب"} />

      <div className="mx-auto max-w-6xl p-6 space-y-5">

        <DashboardStepper
          profile={profile}
          branding={branding}
        />
        {!hasProfile && (
          <CreateProfileForm
            provinces={provinces}
            cities={cities}
            onSubmit={createProfile}
          />
        )}

        {hasProfile &&
          profile &&
          !isEditing && (
            <ProfileCard
              profile={profile}
              onEdit={() => setIsEditing(true)}
            />
          )}
        {hasProfile &&
          profile &&
          isEditing && (
            <EditProfileForm
              profile={profile}
              provinces={provinces}
              cities={cities}
              onSubmit={editProfile}
              onCancel={() => setIsEditing(false)}
            />
          )}
        {hasProfile &&
          profile &&
          !hasBranding &&
          !isCreatingBranding && (
            <CreateBrandingForm
              courses={courses}
              onSubmit={createBranding}
            />
          )}

        {hasBranding &&
          branding &&
          !isBrandingEditing && (
            <BrandingCard
              branding={branding}
              courses={courses}
              onEdit={() => setIsBrandingEditing(true)}
            />
          )}
        {hasBranding &&
          branding &&
          isBrandingEditing && (
            <EditBrandingForm
              branding={branding}
              courses={courses}
              onSubmit={editBranding}
              onCancel={() =>
                setIsBrandingEditing(false)
              }
            />
          )}


      </div>
    </main>
  );

}

