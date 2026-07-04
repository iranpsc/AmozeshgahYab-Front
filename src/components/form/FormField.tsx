import React from "react";

type FormFieldProps = {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
};

export default function FormField({
  label,
  required = false,
  error,
  children,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-slate-700">
        {label}

        {required && (
          <span className="mr-1 text-red-500">*</span>
        )}
      </label>

      {children}

      {error && (
        <p className="text-sm font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}