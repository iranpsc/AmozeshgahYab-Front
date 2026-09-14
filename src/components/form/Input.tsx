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
        bg-card
        px-4
        text-foreground
        outline-none
        transition-colors
        placeholder:text-muted-foreground
        disabled:cursor-not-allowed
        disabled:bg-muted

        ${
          error
            ? `
              border-danger
              focus:border-danger
              focus:ring-2
              focus:ring-danger/20
            `
            : `
              border-input
              focus:border-primary
              focus:ring-2
              focus:ring-ring/30
            `
        }

        ${className}
      `}
    />
  );
}
