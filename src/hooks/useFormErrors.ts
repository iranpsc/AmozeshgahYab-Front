"use client";

import { useState } from "react";
import axios from "axios";

export type FormErrors = Record<string, string>;

export default function useFormErrors() {
  const [errors, setErrors] = useState<FormErrors>({});

  function clearErrors(field?: string) {
    if (!field) {
      setErrors({});
      return;
    }

    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  function setBackendErrors(error: unknown) {
    // ارورهای Validation فرانت
    if (
      error &&
      typeof error === "object" &&
      !axios.isAxiosError(error)
    ) {
      setErrors(error as FormErrors);
      return;
    }

    // ارورهای بک‌اند
    if (axios.isAxiosError(error)) {
      const data = error.response?.data;

      if (!data) return;

      const formatted: FormErrors = {};

      Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          formatted[key] = value[0];
        } else {
          formatted[key] = String(value);
        }
      });

      setErrors(formatted);
    }
  }

  return {
    errors,
    clearErrors,
    setBackendErrors,
  };
}