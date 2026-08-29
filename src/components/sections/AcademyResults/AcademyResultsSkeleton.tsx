import { AcademyListItemSkeleton } from "@/components/ui/AcademyListItem";

export default function AcademyResultsSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <div className="h-4 w-28 animate-pulse rounded bg-surface-2" />
        <div className="h-10 w-20 animate-pulse rounded-lg bg-surface-2" />
      </div>
      <div className="flex flex-col gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <AcademyListItemSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
