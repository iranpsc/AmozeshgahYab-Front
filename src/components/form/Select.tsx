import React from "react";

type SelectProps =
  React.SelectHTMLAttributes<HTMLSelectElement> & {
    error?: boolean;
  };

export default function Select({
  className = "",
  error = false,
  children,
  ...props
}: SelectProps) {
  return (
    <select
      {...props}
      className={`
        h-12
        w-full
        rounded-xl
        border
        bg-white
        px-4
        outline-none
        transition
        ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100"
            : "border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
        }
        disabled:bg-slate-100
        disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </select>
  );
}