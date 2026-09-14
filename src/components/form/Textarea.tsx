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
        bg-card
        p-4
        text-foreground
        outline-none
        transition-colors
        resize-none
        placeholder:text-muted-foreground
        ${
          error
            ? "border-danger focus:border-danger focus:ring-2 focus:ring-danger/20"
            : "border-input focus:border-primary focus:ring-2 focus:ring-ring/30"
        }
        disabled:bg-muted
        disabled:cursor-not-allowed
        ${className}
      `}
    />
  );
}
