"use client";

import { useState } from "react";

import FormField from "@/components/form/FormField";
import Button from "@/components/form/Button";

interface Course {
  id: number;
  title: string;
}

interface Props {
  courses: Course[];

  onSubmit?: (data: {
    courses: number[];
  }) => Promise<void>;
}

export default function CreateBrandingForm({
  courses,
  onSubmit,
}: Props) {
  const [selectedCourses, setSelectedCourses] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  function toggleCourse(id: number) {
    setSelectedCourses((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  }

  async function submit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
if (selectedCourses.length === 0) {
  return;
}
    if (!onSubmit) return;

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
        ثبت برند آموزشگاه
      </h2>

      <FormField
        label="دوره‌های آموزشی"
        required
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
    </form>
  );
}