export default function InstituteHeroSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="lg:flex lg:flex-row-reverse">
        <div className="h-56 w-full animate-pulse bg-surface-2 sm:h-72 lg:h-80 lg:w-[45%]" />
        <div className="flex flex-1 flex-col gap-3 p-4 pt-12 sm:p-6">
          <div className="h-5 w-48 animate-pulse rounded bg-surface-2" />
          <div className="h-5 w-32 animate-pulse rounded bg-surface-2" />
          <div className="h-4 w-40 animate-pulse rounded bg-surface-2" />
          <div className="mt-2 flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-11 w-20 animate-pulse rounded-xl bg-surface-2" />
            ))}
          </div>
        </div>
        <div className="hidden shrink-0 items-center justify-center p-6 lg:flex lg:w-48">
          <div className="h-32 w-32 animate-pulse rounded-2xl bg-surface-2" />
        </div>
      </div>
    </div>
  );
}
