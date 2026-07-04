"use client";

interface LoadingScreenProps {
  title?: string;
}

export default function LoadingScreen({
  title = "در حال بارگذاری...",
}: LoadingScreenProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm">
        <div className="mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

        <h2 className="text-center text-lg font-semibold text-slate-800">
          {title}
        </h2>

        <p className="mt-2 text-center text-sm text-slate-500">
          لطفا چند لحظه صبر کنید...
        </p>
      </div>
    </main>
  );
}