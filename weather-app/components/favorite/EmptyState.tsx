import { Button } from "@/components/ui/button";
import * as TablerIcons from "@tabler/icons-react";

interface EmptyStateProps {
  icon: keyof typeof TablerIcons;
  label: string;
  title: string;
  description: string;
  action?: {
    label: string;
    variant?: "outline" | "default" | "secondary";
    onClick: () => void;
  };
}

export function EmptyState({
  icon,
  label,
  title,
  description,
  action,
}: EmptyStateProps) {
  const IconComponent = TablerIcons[icon] as React.ElementType;

  return (
    <div className="col-span-full my-12 mx-auto w-full max-w-md flex flex-col items-center justify-center text-center p-10 border-2 border-dashed border-gray-200 dark:border-zinc-800 rounded-3xl bg-gray-50/50 dark:bg-zinc-900/20 backdrop-blur-sm transition-all hover:border-gray-300 dark:hover:border-zinc-700">
      <div className="w-16 h-16 rounded-full bg-white dark:bg-zinc-800 shadow-sm border border-gray-100 dark:border-zinc-700 flex items-center justify-center mb-6">
        {IconComponent && (
          <IconComponent
            className="w-8 h-8 text-indigo-500 dark:text-indigo-400"
            stroke={1.5}
            aria-hidden="true"
          />
        )}
      </div>

      <div className="space-y-2 mb-8">
        <p className="text-xs font-semibold text-indigo-500 dark:text-indigo-400 uppercase tracking-widest">
          {label}
        </p>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[280px] mx-auto leading-relaxed">
          {description}
        </p>
      </div>

      {action && (
        <Button
          variant={action.variant || "default"}
          onClick={action.onClick}
          className="cursor-pointer shadow-sm hover:shadow-md transition-shadow rounded-full px-8"
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}
