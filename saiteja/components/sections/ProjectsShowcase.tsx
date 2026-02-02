"use client";

import { FEATURED_PROJECTS } from "@/lib/constants";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Container } from "@/components/layout/Container";

export function ProjectsShowcase() {
  return (
    <section
      id="projects"
      className="bg-[#050505] py-24 px-6 md:px-12 border-t border-white/5"
    >
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <SectionHeader
            eyebrow="01 / SELECTED WORK"
            title={
              <>
                INTELLIGENCE <br /> IN MOTION
              </>
            }
            theme="dark"
          />
          <button className="mt-6 md:mt-0 text-sm uppercase tracking-widest border-b border-gray-700 pb-1 hover:border-white transition-colors text-gray-400 hover:text-white">
            View All Case Studies
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {FEATURED_PROJECTS.map((project, index) => (
            <div
              key={project.id}
              className={index === 1 ? "md:mt-12" : ""}
              style={{
                animation: `fadeInUp 0.8s ease-out ${index * 0.2}s forwards`,
                opacity: 0,
              }}
            >
              <ProjectCard project={project} variant="featured" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
