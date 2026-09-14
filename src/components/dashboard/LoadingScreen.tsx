"use client";

interface LoadingScreenProps {
  title?: string;
}

export default function LoadingScreen({
  title = "در حال بارگذاری...",
}: LoadingScreenProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8">
        <div className="mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-4 border-border border-t-primary" />

        <h2 className="text-center text-lg font-semibold text-foreground">
          {title}
        </h2>

        <p className="mt-2 text-center text-sm text-muted-foreground">
          لطفا چند لحظه صبر کنید...
        </p>
      </div>
    </main>
  );
}