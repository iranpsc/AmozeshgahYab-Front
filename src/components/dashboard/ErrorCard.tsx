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
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-sm">

        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl">
          ⚠️
        </div>

        <h1 className="mb-3 text-2xl font-bold text-red-600">
          {title}
        </h1>

        <p className="leading-8 text-slate-600">
          {message}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">

          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700 active:scale-95"
            >
              تلاش مجدد
            </button>
          )}

          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              className="rounded-xl bg-red-500 px-5 py-3 font-medium text-white transition hover:bg-red-600 active:scale-95"
            >
              خروج
            </button>
          )}

        </div>
      </div>
    </main>
  );
}