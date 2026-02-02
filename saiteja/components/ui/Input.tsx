"use client";

import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  error?: string;
}

export function Input({ className, label, error, ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <div className="border-b border-gray-300 dark:border-gray-800 focus-within:border-black dark:focus-within:border-white transition-colors pb-2">
        <input
          className={cn(
            "w-full bg-transparent border-none p-0 text-lg placeholder-gray-400 focus:ring-0 focus:outline-none",
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
