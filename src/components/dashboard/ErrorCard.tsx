"use client";

interface ErrorCardProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  onLogout?: () => void;
}

export default function ErrorCard({
  title = "خطا",
  message,
  onRetry,
  onLogout,
}: ErrorCardProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-8">

        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-danger/15 text-3xl">
          ⚠️
        </div>

        <h1 className="mb-3 text-2xl font-bold text-danger">
          {title}
        </h1>

        <p className="leading-8 text-muted-foreground">
          {message}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">

          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:bg-primary-hover active:scale-95"
            >
              تلاش مجدد
            </button>
          )}

          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              className="rounded-xl bg-danger px-5 py-3 font-medium text-danger-foreground transition hover:bg-danger/90 active:scale-95"
            >
              خروج
            </button>
          )}

        </div>
      </div>
    </main>
  );
}