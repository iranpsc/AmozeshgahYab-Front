import React from "react";

type InputProps =
  React.InputHTMLAttributes<HTMLInputElement> & {
    error?: boolean;
  };

export default function Input({
  className = "",
  error = false,
  ...props
}: InputProps) {
  return (
    <input
      {...props}
      className={`
        h-12
        w-full
        rounded-xl
        border
        bg-white
        px-4
        outline-none
        transition-colors
        disabled:cursor-not-allowed
        disabled:bg-slate-100

        ${
          error
            ? `
              border-red-500
              focus:border-red-500
              focus:ring-2
              focus:ring-red-100
            `
            : `
              border-slate-300
              focus:border-blue-600
              focus:ring-2
              focus:ring-blue-100
            `
        }

        ${className}
      `}
    />
  );
}