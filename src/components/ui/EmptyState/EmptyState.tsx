import { FaSchool, FaExclamationTriangle } from "react-icons/fa";

type Props = {
  title: string;
  description?: string;
  variant?: "empty" | "error";
};

export default function EmptyState({ title, description, variant = "empty" }: Props) {
  const isError = variant === "error";

  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface px-6 py-10 text-center">
      <span
        className={`grid h-12 w-12 place-items-center rounded-full ${
          isError ? "bg-danger/10 text-danger" : "bg-primary-light text-primary"
        }`}
      >
        {isError ? <FaExclamationTriangle size={20} /> : <FaSchool size={20} />}
      </span>
      <div className="space-y-1">
        <p className="text-sm font-bold text-foreground">{title}</p>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
}
