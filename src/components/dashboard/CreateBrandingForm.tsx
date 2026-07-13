"use client";

import { useRef, useState } from "react";

import FormField from "@/components/form/FormField";
import Button from "@/components/form/Button";
import useFormErrors from "@/hooks/useFormErrors";
import ImageCropperModal from "@/components/ImageCropper/ImageCropperModal";

interface Course {
  id: number;
  title: string;
}

interface Props {
  courses: Course[];

  onSubmit?: (data: {
    courses: number[];
    logo: File | null;
    banner: File | null;
  }) => Promise<void>;
  
}

export default function CreateBrandingForm({
  courses,
  onSubmit,
}: Props) {
  const {
  errors,
  clearErrors,
  setBackendErrors,
} = useFormErrors();
  const [step, setStep] = useState(1);

  const [selectedCourses, setSelectedCourses] =
    useState<number[]>([]);

  const [logo, setLogo] =
    useState<File | null>(null);

  const [banner, setBanner] =
    useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [cropOpen, setCropOpen] =
  useState(false);

const [cropImage, setCropImage] =
  useState<string | null>(null);

const [cropType, setCropType] =
  useState<"logo" | "banner">("logo");
const logoInputRef =
  useRef<HTMLInputElement>(null);

const bannerInputRef =
  useRef<HTMLInputElement>(null);
  function toggleCourse(id: number) {
    setSelectedCourses((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  }
function openCropper(
  file: File,
  type: "logo" | "banner"
) {
  setCropType(type);

  setCropImage(
    URL.createObjectURL(file)
  );

  setCropOpen(true);
}
  async function submit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    clearErrors();

    if (selectedCourses.length === 0) {
      return;
    }

    if (!onSubmit) return;

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
      className="rounded-2xl bg-white p-8 shadow space-y-6"
    >
      <h2 className="mb-2 text-3xl font-bold">
        ثبت برند آموزشگاه
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
              className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 hover:bg-slate-50"
            >
              <input
                type="checkbox"
                checked={selectedCourses.includes(course.id)}
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
  label="لوگو آموزشگاه"
  required
  error={errors.logo}
>

  <input
    ref={logoInputRef}
    type="file"
    accept="image/*"
    className="hidden"
onChange={(e) => {
  const file = e.target.files?.[0];

  if (!file) return;

  openCropper(file, "logo");
}}
  />

  {!logo && (
    <Button
      type="button"
      onClick={() =>
        logoInputRef.current?.click()
      }
    >
      انتخاب لوگو
    </Button>
  )}

  {logo && (
    <div className="space-y-4">

      <img
        src={URL.createObjectURL(logo)}
        alt=""
        className="h-32 w-32 rounded-xl border object-cover"
      />

      <div className="flex gap-3">

        <Button
          type="button"
          onClick={() =>
            logoInputRef.current?.click()
          }
        >
          تغییر لوگو
        </Button>

        <Button
          type="button"
          className="bg-red-100 text-red-600 hover:bg-red-200"
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
  label="بنر آموزشگاه"
  required
  error={errors.banner}
>

  <input
    ref={bannerInputRef}
    type="file"
    accept="image/*"
    className="hidden"
    onChange={(e) => {
  const file = e.target.files?.[0];

  if (!file) return;

  openCropper(file, "banner");
}}
  />

  {!banner && (
    <Button
      type="button"
      onClick={() =>
        bannerInputRef.current?.click()
      }
    >
      انتخاب بنر
    </Button>
  )}

  {banner && (
    <div className="space-y-4">

      <img
        src={URL.createObjectURL(banner)}
        alt=""
        className="h-52 w-full rounded-xl border object-cover"
      />

      <div className="flex gap-3">

        <Button
          type="button"
          onClick={() =>
            bannerInputRef.current?.click()
          }
        >
          تغییر بنر
        </Button>

        <Button
          type="button"
          className="bg-red-100 text-red-600 hover:bg-red-200"
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
      <div className="mt-8">
        <Button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "در حال ثبت..."
            : "ثبت برند"}
        </Button>
      </div>
      <ImageCropperModal
      outputType={
    cropType === "logo"
      ? "png"
      : "jpeg"
  }
  open={cropOpen}
  image={cropImage}
  title={
    cropType === "logo"
      ? "برش لوگو"
      : "برش بنر"
  }
  cropShape={
    cropType === "logo"
      ? "round"
      : "rect"
  }
  aspect={
    cropType === "logo"
      ? 1
      : 3
  }
  width={
    cropType === "logo"
      ? 512
      : 1200
  }
  height={
    cropType === "logo"
      ? 512
      : 400
  }
  onClose={() => {
    setCropOpen(false);
    setCropImage(null);
  }}
  onComplete={(file) => {
    if (cropType === "logo") {
      setLogo(file);
    } else {
      setBanner(file);
    }

    setCropOpen(false);
    setCropImage(null);

    if (logoInputRef.current) {
      logoInputRef.current.value = "";
    }

    if (bannerInputRef.current) {
      bannerInputRef.current.value = "";
    }
  }}
/>
    </form>
  );
}