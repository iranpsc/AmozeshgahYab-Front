
"use client";

import { useRef, useState } from "react";
import useFormErrors from "@/hooks/useFormErrors";

import Button from "@/components/form/Button";
import FormField from "@/components/form/FormField";

import type { InstituteBranding } from "@/services/institute";

interface Course {
  id: number;
  title: string;
}

interface Props {
  branding: InstituteBranding;

  courses: Course[];

onSubmit: (data: {
  courses: number[];
  logo: File | null;
  banner: File | null;
}) => Promise<void>;
  onCancel: () => void;
}

export default function EditBrandingForm({
  branding,
  courses,
  onSubmit,
  onCancel,
}: Props) {
  const [loading, setLoading] = useState(false);
const {
  errors,
  clearErrors,
  setBackendErrors,
} = useFormErrors();

const logoInputRef =
  useRef<HTMLInputElement>(null);

const bannerInputRef =
  useRef<HTMLInputElement>(null);

const [logo, setLogo] =
  useState<File | null>(null);

const [banner, setBanner] =
  useState<File | null>(null);
  const [selectedCourses, setSelectedCourses] =
    useState<number[]>(branding.courses);

  function toggleCourse(id: number) {
    setSelectedCourses((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  }

async function submit(
  e: React.FormEvent<HTMLFormElement>
) {
  e.preventDefault();

  clearErrors();

  try {
    setLoading(true);

    await onSubmit({
      courses: selectedCourses,
      logo,
      banner,
    });

  } catch (err) {
    setBackendErrors(err);
  } finally {
    setLoading(false);
  }
}

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl bg-white p-8 space-y-6 shadow"
    >
      <h2 className="mb-2 text-3xl font-bold">
        ویرایش برند آموزشگاه
      </h2>

      <FormField
        label="دوره‌های آموزشی"
        required
        error={errors.courses}
      >
        <div className="grid gap-3 md:grid-cols-2">
          {courses.map((course) => (
            <label
              key={course.id}
              className="flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition hover:border-blue-500"
            >
              <input
                type="checkbox"
                checked={selectedCourses.includes(
                  course.id
                )}
                onChange={() =>
                  toggleCourse(course.id)
                }
              />

              <span>{course.title}</span>
            </label>
          ))}
        </div>
      </FormField>
      <FormField
  label="لوگو"
  error={errors.logo}
>

  <input
    ref={logoInputRef}
    type="file"
    accept="image/*"
    className="hidden"
    onChange={(e) =>
      setLogo(e.target.files?.[0] ?? null)
    }
  />

  {!logo ? (

    <div className="space-y-4">

      {branding.logo && (
        <img
          src={branding.logo}
          className="h-32 w-32 rounded-xl border object-cover"
          alt=""
        />
      )}

      <Button
        type="button"
        onClick={() =>
          logoInputRef.current?.click()
        }
      >
        {branding.logo
          ? "تغییر لوگو"
          : "انتخاب لوگو"}
      </Button>

    </div>

  ) : (

    <div className="space-y-4">

      <img
        src={URL.createObjectURL(logo)}
        className="h-32 w-32 rounded-xl border object-cover"
        alt=""
      />

      <div className="flex gap-3">

        <Button
          type="button"
          onClick={() =>
            logoInputRef.current?.click()
          }
        >
          تغییر
        </Button>

        <Button
          type="button"
          className="bg-red-100 text-red-600"
          onClick={() => {
            setLogo(null);

            if (logoInputRef.current) {
              logoInputRef.current.value = "";
            }
          }}
        >
          حذف
        </Button>

      </div>

    </div>

  )}

</FormField>
<FormField
  label="بنر"
  error={errors.banner}
>

  <input
    ref={bannerInputRef}
    type="file"
    accept="image/*"
    className="hidden"
    onChange={(e) =>
      setBanner(e.target.files?.[0] ?? null)
    }
  />

  {!banner ? (

    <div className="space-y-4">

      {branding.banner && (
        <img
          src={branding.banner}
          className="h-56 w-full rounded-xl border object-cover"
          alt=""
        />
      )}

      <Button
        type="button"
        onClick={() =>
          bannerInputRef.current?.click()
        }
      >
        {branding.banner
          ? "تغییر بنر"
          : "انتخاب بنر"}
      </Button>

    </div>

  ) : (

    <div className="space-y-4">

      <img
        src={URL.createObjectURL(banner)}
        className="h-56 w-full rounded-xl border object-cover"
        alt=""
      />

      <div className="flex gap-3">

        <Button
          type="button"
          onClick={() =>
            bannerInputRef.current?.click()
          }
        >
          تغییر
        </Button>

        <Button
          type="button"
          className="bg-red-100 text-red-600"
          onClick={() => {
            setBanner(null);

            if (bannerInputRef.current) {
              bannerInputRef.current.value = "";
            }
          }}
        >
          حذف
        </Button>

      </div>

    </div>

  )}

</FormField>

      <div className="mt-8 flex gap-3">
        <Button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "در حال ذخیره..."
            : "ذخیره تغییرات"}
        </Button>

        <Button
          type="button"
          onClick={onCancel}
          className="bg-slate-200 text-slate-700 hover:bg-slate-300"
        >
          انصراف
        </Button>
      </div>
    </form>
  );
}

