
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

interface Subcourse {
  id: number;
  course: number;
  title: string;
}

interface Props {
  courses: Course[];
  subcourses: Subcourse[];

  onSubmit?: (data: {
    courses: number[];
    subcourses: number[];
    logo: File | null;
    banner: File | null;
  }) => Promise<void>;
}

export default function CreateBrandingForm({
  courses,
  subcourses,
  onSubmit,
}: Props) {
  const {
    errors,
    clearErrors,
    setBackendErrors,
  } = useFormErrors();

  const [selectedCourses, setSelectedCourses] =
    useState<number[]>([]);

  const [selectedSubcourses, setSelectedSubcourses] =
    useState<number[]>([]);

  const [courseSearch, setCourseSearch] =
    useState("");

  const [subcourseSearch, setSubcourseSearch] =
    useState("");

  const [logo, setLogo] =
    useState<File | null>(null);

  const [banner, setBanner] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

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
    setSelectedCourses((prev) => {
      const next = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];

      // اگر دوره حذف شد، زیر دوره‌های مربوط به آن هم حذف شوند
      if (!next.includes(id)) {
        const subcourseIdsOfCourse = subcourses
          .filter((s) => s.course === id)
          .map((s) => s.id);

        setSelectedSubcourses((prevSub) =>
          prevSub.filter(
            (s) => !subcourseIdsOfCourse.includes(s)
          )
        );
      }

      return next;
    });
  }

  function toggleSubcourse(id: number) {
    setSelectedSubcourses((prev) =>
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
        subcourses: selectedSubcourses,
        logo,
        banner,
      });
    } catch (err) {
      setBackendErrors(err);
    } finally {
      setLoading(false);
    }
  }

  /*
   * جستجوی دوره‌ها
   */
  const filteredCourses = courses.filter((course) =>
    course.title
      .toLowerCase()
      .includes(courseSearch.trim().toLowerCase())
  );

  /*
   * فقط زیر دوره‌های مربوط به دوره‌های انتخاب شده
   */
  const selectedCourseSubcourses =
    subcourses.filter((subcourse) =>
      selectedCourses.includes(subcourse.course)
    );

  /*
   * جستجوی زیر دوره‌ها
   */
  const filteredSubcourses =
    selectedCourseSubcourses.filter((subcourse) =>
      subcourse.title
        .toLowerCase()
        .includes(subcourseSearch.trim().toLowerCase())
    );

  return (
    <form
      onSubmit={submit}
      className="space-y-6 rounded-2xl border border-border bg-card p-8"
    >
      <h2 className="mb-2 text-3xl font-bold">
        ثبت برند آموزشگاه
      </h2>

      {/* =========================
          COURSES
      ========================== */}

      <FormField
        label="دوره‌های آموزشی"
        required
        error={errors.courses}
      >
        <div className="space-y-4">

          {/* Search Courses */}
          <div className="relative">
            <input
              type="text"
              value={courseSearch}
              onChange={(e) =>
                setCourseSearch(e.target.value)
              }
              placeholder="جستجوی دوره..."
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
            />

            {courseSearch && (
              <button
                type="button"
                onClick={() => setCourseSearch("")}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground hover:text-foreground"
              >
                ×
              </button>
            )}
          </div>

          {/* Course List */}
          {filteredCourses.length > 0 ? (
            <div className="grid gap-3 md:grid-cols-2">
              {filteredCourses.map((course) => (
                <label
                  key={course.id}
                  className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 transition hover:bg-surface"
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

                  <span>
                    {course.title}
                  </span>
                </label>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
              دوره‌ای با این عنوان پیدا نشد.
            </div>
          )}

          {/* Selected Courses Count */}
          {selectedCourses.length > 0 && (
            <div className="text-sm text-muted-foreground">
              {selectedCourses.length} دوره انتخاب شده
            </div>
          )}
        </div>
      </FormField>

      {/* =========================
          SUBCOURSES
      ========================== */}

      {selectedCourses.length > 0 && (
        <FormField
          label="زیر دوره‌ها"
          error={errors.subcourses}
        >
          <div className="space-y-4">

            {/* Search Subcourses */}
            <div className="relative">
              <input
                type="text"
                value={subcourseSearch}
                onChange={(e) =>
                  setSubcourseSearch(e.target.value)
                }
                placeholder="جستجوی زیر دوره..."
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
              />

              {subcourseSearch && (
                <button
                  type="button"
                  onClick={() =>
                    setSubcourseSearch("")
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground hover:text-foreground"
                >
                  ×
                </button>
              )}
            </div>

            {/* اگر سرچ فعال است، همه نتایج را بر اساس دوره نمایش بده */}
            {subcourseSearch.trim() ? (
              filteredSubcourses.length > 0 ? (
                <div className="space-y-4">
                  {selectedCourses.map((courseId) => {
                    const course =
                      courses.find(
                        (c) => c.id === courseId
                      );

                    const courseSubcourses =
                      filteredSubcourses.filter(
                        (s) => s.course === courseId
                      );

                    if (
                      courseSubcourses.length === 0
                    ) {
                      return null;
                    }

                    return (
                      <div key={courseId}>
                        <p className="mb-2 text-sm font-semibold text-muted-foreground">
                          {course?.title}
                        </p>

                        <div className="grid gap-3 md:grid-cols-2">
                          {courseSubcourses.map(
                            (subcourse) => (
                              <label
                                key={subcourse.id}
                                className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 transition hover:bg-surface"
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedSubcourses.includes(
                                    subcourse.id
                                  )}
                                  onChange={() =>
                                    toggleSubcourse(
                                      subcourse.id
                                    )
                                  }
                                />

                                <span>
                                  {subcourse.title}
                                </span>
                              </label>
                            )
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                  زیر دوره‌ای با این عنوان پیدا نشد.
                </div>
              )
            ) : (
              /* حالت عادی بدون سرچ */
              <div className="space-y-4">
                {selectedCourses.map((courseId) => {
                  const course =
                    courses.find(
                      (c) => c.id === courseId
                    );

                  const courseSubcourses =
                    subcourses.filter(
                      (s) => s.course === courseId
                    );

                  if (
                    courseSubcourses.length === 0
                  ) {
                    return null;
                  }

                  return (
                    <div key={courseId}>
                      <p className="mb-2 text-sm font-semibold text-muted-foreground">
                        {course?.title}
                      </p>

                      <div className="grid gap-3 md:grid-cols-2">
                        {courseSubcourses.map(
                          (subcourse) => (
                            <label
                              key={subcourse.id}
                              className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 transition hover:bg-surface"
                            >
                              <input
                                type="checkbox"
                                checked={selectedSubcourses.includes(
                                  subcourse.id
                                )}
                                onChange={() =>
                                  toggleSubcourse(
                                    subcourse.id
                                  )
                                }
                              />

                              <span>
                                {subcourse.title}
                              </span>
                            </label>
                          )
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Selected Subcourses Count */}
            {selectedSubcourses.length > 0 && (
              <div className="text-sm text-muted-foreground">
                {selectedSubcourses.length} زیر دوره انتخاب شده
              </div>
            )}
          </div>
        </FormField>
      )}

      {/* =========================
          LOGO
      ========================== */}

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
                className="bg-danger/10 text-danger hover:bg-danger/20"
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

      {/* =========================
          BANNER
      ========================== */}

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
                className="bg-danger/10 text-danger hover:bg-danger/20"
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

      {/* =========================
          SUBMIT
      ========================== */}

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

      {/* =========================
          CROPPER
      ========================== */}

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

