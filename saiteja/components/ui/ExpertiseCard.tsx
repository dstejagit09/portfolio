"use client";

import { ExpertiseArea } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ExpertiseCardProps {
  expertise: ExpertiseArea;
  className?: string;
}

export function ExpertiseCard({ expertise, className }: ExpertiseCardProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="w-10 h-10 rounded-full bg-white dark:bg-white/5 flex items-center justify-center mb-2">
        <span className="material-icons-outlined text-gray-900 dark:text-white text-lg">
          {expertise.icon}
        </span>
      </div>
      <h4 className="text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wide">
        {expertise.title}
      </h4>
      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
        {expertise.description}
      </p>
    </div>
  );
}
