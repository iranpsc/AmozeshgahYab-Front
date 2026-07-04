
"use client";

import { useState } from "react";

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

    try {
      setLoading(true);

      await onSubmit({
        courses: selectedCourses,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl bg-white p-8 shadow"
    >
      <h2 className="mb-8 text-3xl font-bold">
        ویرایش برند آموزشگاه
      </h2>

      <FormField
        label="دوره‌های آموزشی"
        required
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

