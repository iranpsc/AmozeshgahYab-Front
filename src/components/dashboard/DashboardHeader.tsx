"use client";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  onLogout: () => void;
}

export default function DashboardHeader({
  title,
  subtitle,
  onLogout,
}: DashboardHeaderProps) {
  return (
    <header className="mb-6 rounded-2xl bg-secondary p-6 mx-2 mt-2">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-2 text-sm text-foreground/70">
              {subtitle}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={onLogout}
          className="
            rounded-xl
            bg-danger
            px-5
            py-2.5
            font-medium
            text-danger-foreground
            transition
            hover:bg-danger/90
            active:scale-95
          "
        >
          خروج از حساب
        </button>
      </div>
    </header>
  );
}