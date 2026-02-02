import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full";
}

const maxWidthClasses = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-7xl",
  xl: "max-w-[1400px]",
  full: "max-w-full",
};

export function Container({ children, className, maxWidth = "xl" }: ContainerProps) {
  return (
    <div className={cn("mx-auto px-6 md:px-12", maxWidthClasses[maxWidth], className)}>
      {children}
    </div>
  );
}
