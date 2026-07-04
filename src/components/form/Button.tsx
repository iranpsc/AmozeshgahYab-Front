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
        bg-blue-600
        px-6
        font-semibold
        text-white
        transition
        hover:bg-blue-700
        disabled:cursor-not-allowed
        disabled:opacity-60
        ${className}
      `}
    >
      {children}
    </button>
  );
}