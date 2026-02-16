"use client";

import { TECHNICAL_SECTIONS } from "@/lib/constants";
import { Container } from "@/components/layout/Container";
import { ArrowUpRight } from "lucide-react";

export function TechnicalSection() {
  return (
    <section id="technical" className="bg-[#F3F3F3] relative z-10">
      {/* Hero Header */}
      <div className="relative min-h-[60vh] flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-20 overflow-hidden">
        <div className="absolute right-0 top-0 h-full w-full md:w-2/3 lg:w-1/2 opacity-20 pointer-events-none z-0">
          <img
            src="https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&q=80"
            alt="Technical background"
            className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-30"
          />
        </div>

        <div className="relative z-10 max-w-4xl">
          <span className="block text-xs md:text-sm font-display uppercase tracking-[0.2em] mb-4 text-gray-500">
            Technical Skills
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-light leading-[0.9] mb-8">
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
                <h2 className="text-2xl md:text-4xl font-display mb-6 uppercase">
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
              <div className={`relative aspect-square md:aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden group ${index % 2 === 1 ? "md:order-1" : ""}`}>
                <img
                  src={section.image}
                  alt={section.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-4 right-4 text-xs font-mono text-white/70">
                  FIG {section.number}.01
                </span>
              </div>
            </div>
          </Container>
        </div>
      ))}
    </section>
  );
}
