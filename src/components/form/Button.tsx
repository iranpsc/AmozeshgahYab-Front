import React from "react";

type ButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`
        inline-flex
        h-12
        items-center
        justify-center
        rounded-xl
        bg-primary
        px-6
        font-semibold
        text-primary-foreground
        transition-colors
        hover:bg-primary-hover
        disabled:cursor-not-allowed
        disabled:opacity-60
        ${className}
      `}
    >
      {children}
    </button>
  );
}
