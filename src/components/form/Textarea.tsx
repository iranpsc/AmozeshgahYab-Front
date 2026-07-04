import React from "react";

type TextareaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    error?: boolean;
  };

export default function Textarea({
  className = "",
  error = false,
  ...props
}: TextareaProps) {
  return (
    <textarea
      {...props}
      className={`
        w-full
        rounded-xl
        border
        bg-white
        p-4
        outline-none
        transition
        resize-none
        ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100"
            : "border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
        }
        disabled:bg-slate-100
        disabled:cursor-not-allowed
        ${className}
      `}
    />
  );
}