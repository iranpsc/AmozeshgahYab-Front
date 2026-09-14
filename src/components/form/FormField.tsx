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
      <label className="block text-sm font-semibold text-foreground">
        {label}

        {required && (
          <span className="mr-1 text-danger">*</span>
        )}
      </label>

      {children}

      {error && (
        <p className="text-sm font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}