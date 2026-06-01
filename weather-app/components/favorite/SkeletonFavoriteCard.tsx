"use client";

import { Skeleton } from "../ui/skeleton";

export default function SkeletonFavoriteCard() {
  return (
    <div className="mt-12 px-4 md:px-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="flex flex-col space-y-4 rounded-lg p-8 shadow-sm bg-white/50 dark:bg-card-dark-mode"
        >
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <Skeleton className="h-6 w-32 bg-gray-200 dark:bg-zinc-400/10" />
              <Skeleton className="h-3 w-20 bg-gray-200 dark:bg-zinc-400/10" />
            </div>
            {/* Action buttons area */}
            <Skeleton className="h-8 w-8 rounded-full bg-gray-200 dark:bg-zinc-400/10" />
          </div>

          <div className="flex items-center justify-between pt-4 pb-2">
            <Skeleton className="h-12 w-20 bg-gray-200 dark:bg-zinc-400/10" />
            <Skeleton className="h-12 w-12 rounded-full bg-gray-200 dark:bg-zinc-400/10" />
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-gray-100 dark:border-zinc-400/10">
            <Skeleton className="h-4 w-12 bg-gray-200 dark:bg-zinc-400/10" />
            <Skeleton className="h-4 w-12 bg-gray-200 dark:bg-zinc-400/10" />
          </div>
        </div>
      ))}
    </div>
  );
}
