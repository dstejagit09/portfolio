"use client";

import { SHOWCASE_PROJECTS } from "@/lib/constants";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Container } from "@/components/layout/Container";

export function WorksSection() {
  return (
    <section id="projects" className="bg-[#F0F2F5] min-h-screen pt-32 pb-20 px-4 md:px-12">
      <Container maxWidth="xl">
        {/* Header */}
        <header className="mb-24">
          <h1 className="text-6xl md:text-8xl font-display font-medium tracking-tight leading-none mb-6">
            SELECTED <br />
            <span className="text-gray-500">WORKS</span>
          </h1>
          <div className="flex justify-end border-t border-gray-300 pt-6">
            <div className="text-xs font-mono tracking-widest text-gray-500 uppercase">
              2024 — 2026
            </div>
          </div>
        </header>

        {/* Project Cards */}
        <section className="space-y-0">
          {SHOWCASE_PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} variant="showcase" />
          ))}
        </section>

        {/* Collaboration CTA */}
        <section className="mt-32 mb-20">
          <div className="bg-white rounded-xl p-8 md:p-16 flex flex-col md:flex-row justify-between items-start md:items-center relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-2xl md:text-4xl font-display font-medium mb-4">
                Interested in collaboration?
              </h3>
              <p className="text-gray-600 mb-8 max-w-lg">
                Open to discussing new opportunities in robotics engineering and research.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-3 px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-medium hover:scale-105 transition-transform"
              >
                Get in Touch
                <span className="material-icons-outlined text-sm">east</span>
              </a>
            </div>
            <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-gray-300 to-transparent opacity-20 transform skew-x-12" />
            <div className="absolute right-20 top-0 h-full w-1/4 bg-gradient-to-l from-gray-300 to-transparent opacity-10 transform -skew-x-12" />
          </div>
        </section>
      </Container>
    </section>
  );
}
