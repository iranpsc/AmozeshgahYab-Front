
"use client";

import { useRef, useState } from "react";
import useFormErrors from "@/hooks/useFormErrors";

import Button from "@/components/form/Button";
import FormField from "@/components/form/FormField";

import type { InstituteBranding } from "@/services/institute";
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
  branding: InstituteBranding;

  courses: Course[];
  subcourses: Subcourse[];

  onSubmit: (data: {
    courses: number[];
    subcourses: number[];
    logo: File | null;
    banner: File | null;
  }) => Promise<void>;

  onCancel: () => void;
}

export default function EditBrandingForm({
  branding,
  courses,
  subcourses,
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

  const [cropOpen, setCropOpen] =
    useState(false);

  const [cropImage, setCropImage] =
    useState<string | null>(null);

  const [cropType, setCropType] =
    useState<"logo" | "banner">("logo");

  const [selectedCourses, setSelectedCourses] =
    useState<number[]>(branding.courses);

  const [selectedSubcourses, setSelectedSubcourses] =
    useState<number[]>(branding.subcourses);

  /* =========================
     SEARCH
  ========================== */

  const [courseSearch, setCourseSearch] =
    useState("");

  const [subcourseSearch, setSubcourseSearch] =
    useState("");

  /* =========================
     COURSE TOGGLE
  ========================== */

  function toggleCourse(id: number) {
    setSelectedCourses((prev) => {
      const next = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id];

      if (!next.includes(id)) {
        const subcourseIdsOfCourse = subcourses
          .filter((s) => s.course === id)
          .map((s) => s.id);

        setSelectedSubcourses((prevSub) =>
          prevSub.filter(
            (s) =>
              !subcourseIdsOfCourse.includes(s)
          )
        );
      }

      return next;
    });
  }

  /* =========================
     SUBCOURSE TOGGLE
  ========================== */

  function toggleSubcourse(id: number) {
    setSelectedSubcourses((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  }

  /* =========================
     SEARCHED COURSES
  ========================== */

  const filteredCourses = courses.filter(
    (course) =>
      course.title
        .toLowerCase()
        .includes(
          courseSearch.trim().toLowerCase()
        )
  );

  /* =========================
     SELECTED COURSE SUBCOURSES
  ========================== */

  const selectedCourseSubcourses =
    subcourses.filter((subcourse) =>
      selectedCourses.includes(
        subcourse.course
      )
    );

  /* =========================
     SEARCHED SUBCOURSES
  ========================== */

  const filteredSubcourses =
    selectedCourseSubcourses.filter(
      (subcourse) =>
        subcourse.title
          .toLowerCase()
          .includes(
            subcourseSearch.trim().toLowerCase()
          )
    );

  /* =========================
     CROPPER
  ========================== */

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

  /* =========================
     SUBMIT
  ========================== */

  async function submit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    clearErrors();

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

  return (
    <form
      onSubmit={submit}
      className="space-y-6 rounded-2xl border border-border bg-card p-8"
    >
      <h2 className="mb-2 text-3xl font-bold">
        ویرایش برند آموزشگاه
      </h2>

      {/* =====================================================
          COURSES
      ====================================================== */}

      <FormField
        label="دوره‌های آموزشی"
        required
        error={errors.courses}
      >
        <div className="space-y-4">

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              value={courseSearch}
              onChange={(e) =>
                setCourseSearch(e.target.value)
              }
              placeholder="جستجوی دوره..."
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
            />

            {courseSearch && (
              <button
                type="button"
                onClick={() =>
                  setCourseSearch("")
                }
                className="absolute left-3 top-1/2 -translate-y-1/2 text-lg leading-none text-muted-foreground transition hover:text-foreground"
                aria-label="پاک کردن جستجو"
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
                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-border p-4 transition hover:border-primary"
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
            <div className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
              دوره‌ای با این عنوان پیدا نشد.
            </div>
          )}

          {/* Selected count */}
          {selectedCourses.length > 0 && (
            <p className="text-sm text-muted-foreground">
              {selectedCourses.length} دوره انتخاب شده
            </p>
          )}
        </div>
      </FormField>

      {/* =====================================================
          SUBCOURSES
      ====================================================== */}

      {selectedCourses.length > 0 && (
        <FormField
          label="زیر دوره‌ها"
          error={errors.subcourses}
        >
          <div className="space-y-4">

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                value={subcourseSearch}
                onChange={(e) =>
                  setSubcourseSearch(e.target.value)
                }
                placeholder="جستجوی زیر دوره..."
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
              />

              {subcourseSearch && (
                <button
                  type="button"
                  onClick={() =>
                    setSubcourseSearch("")
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-lg leading-none text-muted-foreground transition hover:text-foreground"
                  aria-label="پاک کردن جستجو"
                >
                  ×
                </button>
              )}
            </div>

            {/* Search Result */}
            {subcourseSearch.trim() ? (
              filteredSubcourses.length > 0 ? (
                <div className="space-y-4">
                  {selectedCourses.map(
                    (courseId) => {
                      const course =
                        courses.find(
                          (c) =>
                            c.id === courseId
                        );

                      const courseSubcourses =
                        filteredSubcourses.filter(
                          (s) =>
                            s.course ===
                            courseId
                        );

                      if (
                        courseSubcourses.length ===
                        0
                      ) {
                        return null;
                      }

                      return (
                        <div
                          key={courseId}
                        >
                          <p className="mb-2 text-sm font-semibold text-muted-foreground">
                            {course?.title}
                          </p>

                          <div className="grid gap-3 md:grid-cols-2">
                            {courseSubcourses.map(
                              (subcourse) => (
                                <label
                                  key={
                                    subcourse.id
                                  }
                                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-border p-4 transition hover:border-primary"
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
                                    {
                                      subcourse.title
                                    }
                                  </span>
                                </label>
                              )
                            )}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                  زیر دوره‌ای با این عنوان پیدا نشد.
                </div>
              )
            ) : (
              /* حالت عادی */
              <div className="space-y-4">
                {selectedCourses.map(
                  (courseId) => {
                    const course =
                      courses.find(
                        (c) =>
                          c.id === courseId
                      );

                    const courseSubcourses =
                      subcourses.filter(
                        (s) =>
                          s.course ===
                          courseId
                      );

                    if (
                      courseSubcourses.length ===
                      0
                    ) {
                      return null;
                    }

                    return (
                      <div
                        key={courseId}
                      >
                        <p className="mb-2 text-sm font-semibold text-muted-foreground">
                          {course?.title}
                        </p>

                        <div className="grid gap-3 md:grid-cols-2">
                          {courseSubcourses.map(
                            (subcourse) => (
                              <label
                                key={
                                  subcourse.id
                                }
                                className="flex cursor-pointer items-center gap-3 rounded-xl border border-border p-4 transition hover:border-primary"
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
                                  {
                                    subcourse.title
                                  }
                                </span>
                              </label>
                            )
                          )}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            )}

            {/* Selected count */}
            {selectedSubcourses.length > 0 && (
              <p className="text-sm text-muted-foreground">
                {selectedSubcourses.length} زیر دوره انتخاب شده
              </p>
            )}
          </div>
        </FormField>
      )}

      {/* =====================================================
          LOGO
      ====================================================== */}

      <FormField
        label="لوگو"
        error={errors.logo}
      >
        <input
          ref={logoInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file =
              e.target.files?.[0];

            if (!file) return;

            openCropper(file, "logo");
          }}
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
                className="bg-danger/10 text-danger"
                onClick={() => {
                  setLogo(null);

                  if (
                    logoInputRef.current
                  ) {
                    logoInputRef.current.value =
                      "";
                  }
                }}
              >
                حذف
              </Button>
            </div>
          </div>
        )}
      </FormField>

      {/* =====================================================
          BANNER
      ====================================================== */}

      <FormField
        label="بنر"
        error={errors.banner}
      >
        <input
          ref={bannerInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file =
              e.target.files?.[0];

            if (!file) return;

            openCropper(file, "banner");
          }}
        />

        {!banner ? (
          <div className="space-y-4">
            {branding.banner && (
              <img
                src={branding.banner}
                className="h-100 max-w-300 w-full rounded-xl border object-cover"
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
                className="bg-danger/10 text-danger"
                onClick={() => {
                  setBanner(null);

                  if (
                    bannerInputRef.current
                  ) {
                    bannerInputRef.current.value =
                      "";
                  }
                }}
              >
                حذف
              </Button>
            </div>
          </div>
        )}
      </FormField>

      {/* =====================================================
          ACTIONS
      ====================================================== */}

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
          className="border border-border bg-transparent text-foreground! hover:bg-surface"
        >
          انصراف
        </Button>
      </div>

      {/* =====================================================
          IMAGE CROPPER
      ====================================================== */}

      <ImageCropperModal
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
        outputType={
          cropType === "logo"
            ? "png"
            : "jpeg"
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
            logoInputRef.current.value =
              "";
          }

          if (bannerInputRef.current) {
            bannerInputRef.current.value =
              "";
          }
        }}
      />
    </form>
  );
}

