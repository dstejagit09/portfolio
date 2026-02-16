"use client";

import { EXPERIENCE } from "@/lib/constants";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function ExperienceSection() {
  return (
    <section id="experience" className="bg-[#0a0a0a] py-24 px-6 md:px-12">
      <Container>
        <SectionHeader
          eyebrow="WORK EXPERIENCE"
          title="WHERE I'VE WORKED"
          theme="dark"
          className="mb-16"
        />

        <div className="space-y-12">
          {EXPERIENCE.map((exp) => (
            <div
              key={exp.id}
              className="border-l-2 border-white/20 pl-8 pb-12 last:pb-0"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div>
                  <h3 className="text-2xl md:text-3xl font-display font-medium text-white mb-2">
                    {exp.role}
                  </h3>
                  <p className="text-lg text-gray-300 mb-1">{exp.company}</p>
                  <p className="text-sm text-gray-400">{exp.location}</p>
                </div>
                <span className="text-sm font-mono text-gray-400 mt-2 md:mt-0">
                  {exp.period}
                </span>
              </div>

              <p className="text-gray-300 mb-4 leading-relaxed">{exp.description}</p>

              <ul className="space-y-2">
                {exp.achievements.map((achievement, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-400 text-sm">
                    <span className="text-gray-500 mt-1">▸</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
