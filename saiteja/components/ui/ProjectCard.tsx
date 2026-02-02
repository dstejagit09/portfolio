"use client";

import Image from "next/image";
import { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  variant?: "featured" | "showcase";
  className?: string;
}

export function ProjectCard({ project, variant = "featured", className }: ProjectCardProps) {
  if (variant === "featured") {
    return (
      <div
        className={cn(
          "group relative aspect-[4/3] bg-gray-200 dark:bg-[#0f0f0f] rounded-lg overflow-hidden cursor-pointer",
          className
        )}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
        <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full">
          <div className="flex justify-between items-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <div>
              <h4 className="text-xl md:text-2xl text-white font-display mb-1">{project.title}</h4>
              <p className="text-sm text-gray-300 font-mono">{project.subtitle}</p>
            </div>
            <span className="material-icons-outlined text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
              arrow_forward
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Showcase variant
  return (
    <article
      className={cn(
        "project-item group relative border-t border-gray-300 dark:border-gray-800 py-12 md:py-20 flex flex-col md:flex-row gap-8 md:gap-20 transition-all duration-500 hover:bg-gray-200 dark:hover:bg-white/5 px-2 -mx-2 rounded-lg",
        className
      )}
    >
      <div className="w-full md:w-1/4 flex flex-col justify-between h-auto">
        <span className="font-mono text-xs text-gray-500 dark:text-gray-400 mb-2">
          {project.year ? project.year.toString().slice(-2) : "01"}
        </span>
        <div>
          <h2 className="text-3xl md:text-4xl font-display font-medium mb-4 group-hover:pl-2 transition-all">
            {project.title}
          </h2>
          <div className="h-[1px] bg-gray-300 dark:bg-white w-0 group-hover:w-full transition-all duration-400" />
        </div>
        <div className="hidden md:block mt-auto pt-8">
          <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1 font-mono uppercase">
            {project.tags.slice(0, 3).map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="w-full md:w-3/4 overflow-hidden rounded-lg bg-gray-200 dark:bg-[#121212] relative aspect-[16/9] md:aspect-[21/9]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 ease-out filter grayscale hover:grayscale-0"
        />
        {project.featured && (
          <div className="absolute top-4 left-4">
            <span className="bg-white dark:bg-gray-100 text-black text-[10px] font-bold px-2 py-1 uppercase tracking-wider rounded-sm">
              Featured
            </span>
          </div>
        )}
        <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
          <span className="text-xs font-mono text-white">View Case Study</span>
          <span className="text-sm text-white rotate-45">↑</span>
        </div>
      </div>
      <div className="md:hidden">
        <ul className="flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400 font-mono uppercase">
          {project.tags.slice(0, 2).map((tag) => (
            <li key={tag} className="border border-gray-300 dark:border-gray-800 px-2 py-1 rounded">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
