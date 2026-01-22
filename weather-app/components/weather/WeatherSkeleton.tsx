export default function WeatherSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800 animate-pulse">
      {/* Header Skeleton */}
      <div className="bg-gray-300 dark:bg-gray-700 p-6 h-48">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="h-8 bg-gray-400 dark:bg-gray-600 rounded w-48 mb-2"></div>
            <div className="h-4 bg-gray-400 dark:bg-gray-600 rounded w-32"></div>
          </div>
          <div className="w-20 h-20 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
        </div>
        <div className="h-16 bg-gray-400 dark:bg-gray-600 rounded w-32"></div>
      </div>

      {/* Details Skeleton */}
      <div className="p-6 space-y-4">
        <div className="h-20 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-24 bg-gray-200 dark:bg-gray-800 rounded-lg"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
