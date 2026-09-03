import { AcademyFiltersSkeleton } from "@/components/sections/AcademyFilters";
import { AcademyResultsSkeleton } from "@/components/sections/AcademyResults";

export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
      <div className="mb-3 h-3 w-32 animate-pulse rounded bg-surface-2" />
      <div className="mb-6">
        <div className="h-8 w-56 animate-pulse rounded bg-surface-2" />
        <div className="mt-2 h-4 w-80 animate-pulse rounded bg-surface-2" />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
        <div className="hidden lg:block">
          <AcademyFiltersSkeleton />
        </div>
        <AcademyResultsSkeleton />
      </div>
    </main>
  );
}
