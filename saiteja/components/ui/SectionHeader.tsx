import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string | ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  theme?: "dark" | "light";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  theme = "dark",
  className,
}: SectionHeaderProps) {
  const textAlign = align === "center" ? "text-center items-center" : "text-left items-start";
  const textColor =
    theme === "dark"
      ? "text-gray-400 dark:text-gray-400"
      : "text-gray-500 dark:text-gray-500";

  return (
    <div className={cn("flex flex-col", textAlign, className)}>
      {eyebrow && (
        <span
          className={cn(
            "text-xs md:text-sm font-mono uppercase tracking-[0.2em] mb-4",
            textColor
          )}
        >
          {eyebrow}
        </span>
      )}
      {typeof title === "string" ? (
        <h2 className="text-3xl md:text-5xl font-display text-gray-900 dark:text-white leading-tight">
          {title}
        </h2>
      ) : (
        title
      )}
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-sm md:text-base leading-relaxed max-w-2xl",
            textColor
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
