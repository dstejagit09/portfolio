"use client";

import Image from "next/image";
import { TECHNICAL_SECTIONS } from "@/lib/constants";
import { Container } from "@/components/layout/Container";
import { ArrowUpRight } from "lucide-react";

export function TechnicalSection() {
  return (
    <section id="technical" className="bg-[#F3F3F3] relative z-10">
      {/* Hero Header */}
      <div className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-20 overflow-hidden">
        <div className="absolute right-0 top-0 h-full w-full md:w-2/3 lg:w-1/2 opacity-20 pointer-events-none z-0">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7IPfmaO6yozH75M_3Y41S5gTl2T2fw7CBXhtBBdot2zNsR_gws0zzvZ7fMLXa6-n5k0jf8HXCcLtOj8do_obMSsegTPk_wGi4aiS3j3r-E166QnPj6H2gn2EDQuxp40d7flxY8jSbGkc8Bxgj8aoZ8FP2rtJi3XNom0rtBUXSMqdcm2vfg1LjQ--GrYNOR4qGQ8hq5GIa0gb9MI1lyhpW91Mkd5cv-ZCLn359rbHzy6Xh9vW5XIAjz4WjSiDn48S4CixzV4WZjAs"
            alt="Abstract metallic mechanical joint"
            fill
            className="object-cover mix-blend-luminosity opacity-30"
          />
        </div>

        <div className="relative z-10 max-w-4xl">
          <span className="block text-xs md:text-sm font-display uppercase tracking-[0.2em] mb-4 text-gray-500">
            Technical Expertise
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-display font-light leading-[0.9] mb-8">
            ENGINEERING <br />
            <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500">
              AUTONOMY.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed">
            Bridging the gap between cognitive AI and kinetic reality. My work focuses on the
            integration of advanced control systems with bio-inspired hardware architecture.
          </p>
        </div>

        <div className="absolute bottom-12 left-6 md:left-24 animate-pulse">
          <span className="material-icons-outlined text-3xl opacity-50">keyboard_arrow_down</span>
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
                  {index === 0 && "Read Whitepaper"}
                  {index === 1 && "Explore Codebase"}
                  {index === 2 && "View CAD Models"}
                  <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Image */}
              <div className={`relative aspect-square md:aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden group ${index % 2 === 1 ? "md:order-1" : ""}`}>
                <Image
                  src={section.image}
                  alt={section.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 mix-blend-overlay"
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
