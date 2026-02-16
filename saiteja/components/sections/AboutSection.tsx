"use client";

import { ABOUT_CONTENT, SITE_CONFIG } from "@/lib/constants";
import { ArrowUpRight } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="h-[60vh] md:h-[80vh] w-full relative group overflow-hidden bg-[#F3F3F3]">
      <img
        src={ABOUT_CONTENT.image}
        alt="Autonomous Systems Engineering"
        className="absolute inset-0 w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-1000"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#F3F3F3] to-transparent opacity-90" />
      <div className="absolute bottom-12 md:bottom-24 left-6 md:left-24 max-w-2xl z-10">
        <h3 className="text-3xl md:text-5xl font-display uppercase mb-4 text-gray-900">
          {ABOUT_CONTENT.title.split(" ").slice(0, 3).join(" ")}
          <br />
          {ABOUT_CONTENT.title.split(" ").slice(3).join(" ")}
        </h3>
        <p className="text-gray-700 mb-4">{ABOUT_CONTENT.description}</p>
        <div className="mb-8 text-sm text-gray-600">
          <p className="font-semibold">{ABOUT_CONTENT.education.masters.degree}</p>
          <p>{ABOUT_CONTENT.education.masters.school} • GPA: {ABOUT_CONTENT.education.masters.gpa}</p>
        </div>
        <a
          href={SITE_CONFIG.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-8 py-4 border border-gray-900 rounded-full hover:bg-gray-900 hover:text-white transition-all text-sm uppercase tracking-wide"
        >
          View GitHub Projects
          <ArrowUpRight className="ml-2 w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
