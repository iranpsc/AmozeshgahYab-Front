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
        bg-card
        px-4
        text-foreground
        outline-none
        transition-colors
        ${
          error
            ? "border-danger focus:border-danger focus:ring-2 focus:ring-danger/20"
            : "border-input focus:border-primary focus:ring-2 focus:ring-ring/30"
        }
        disabled:bg-muted
        disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </select>
  );
}
