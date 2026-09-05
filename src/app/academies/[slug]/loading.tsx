import { InstituteHeroSkeleton } from "@/components/sections/InstituteHero";

export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
      <div className="mb-3 h-3 w-40 animate-pulse rounded bg-surface-2" />
      <div className="flex flex-col gap-4">
        <InstituteHeroSkeleton />
        <div className="h-20 animate-pulse rounded-2xl bg-surface-2" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
          <div className="flex flex-col gap-4">
            <div className="h-40 animate-pulse rounded-2xl bg-surface-2" />
            <div className="h-40 animate-pulse rounded-2xl bg-surface-2" />
          </div>
          <div className="flex flex-col gap-4">
            <div className="h-64 animate-pulse rounded-2xl bg-surface-2" />
            <div className="h-32 animate-pulse rounded-2xl bg-surface-2" />
          </div>
        </div>
      </div>
    </main>
  );
}
