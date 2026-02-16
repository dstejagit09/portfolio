"use client";

import { TECHNICAL_SECTIONS } from "@/lib/constants";
import { Container } from "@/components/layout/Container";
import { ArrowUpRight } from "lucide-react";

export function TechnicalSection() {
  return (
    <section id="technical" className="bg-[#F3F3F3] relative z-10">
      {/* Hero Header */}
      <div className="px-6 md:px-12 lg:px-24 pt-24 pb-16">
        <div className="max-w-4xl">
          <span className="block text-xs md:text-sm font-display uppercase tracking-[0.2em] mb-4 text-gray-500">
            Technical Skills
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-light leading-[0.9] mb-8 text-gray-900">
            WHAT I <br />
            <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500">
              WORK WITH
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed">
            ROS2 for multi-robot systems, ArduPilot for drone control, and OpenCV for computer vision.
            From simulation to real hardware.
          </p>
        </div>
      </div>

      {/* Technical Deep Dives */}
      {TECHNICAL_SECTIONS.map((section, index) => (
        <div
          key={section.id}
          className="py-24 px-6 md:px-12 lg:px-24 border-t border-gray-300"
        >
          <Container maxWidth="full">
            <div
              className={`grid grid-cols-1 md:grid-cols-2 gap-16 items-center ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Content */}
              <div className={index % 2 === 1 ? "md:order-2" : ""}>
                <h2 className="text-2xl md:text-4xl font-display mb-6 uppercase text-gray-900">
                  {section.number}. {section.title}
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed">{section.description}</p>
                {section.capabilities && (
                  <ul className="space-y-2 font-mono text-sm text-gray-500 border-l-2 border-gray-300 pl-6 mb-8">
                    {section.capabilities.map((capability) => (
                      <li key={capability}>&gt; {capability}</li>
                    ))}
                  </ul>
                )}
                <a
                  href={section.link}
                  className="inline-flex items-center px-6 py-3 border border-gray-400 rounded-full hover:bg-gray-200 transition-all text-sm uppercase tracking-wide group"
                >
                  View Projects
                  <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Image */}
              <div className={`relative aspect-square md:aspect-[4/3] rounded-lg overflow-hidden group ${index % 2 === 1 ? "md:order-1" : ""}`}>
                <img
                  src={section.image}
                  alt={section.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>
            </div>
          </Container>
        </div>
      ))}
    </section>
  );
}
