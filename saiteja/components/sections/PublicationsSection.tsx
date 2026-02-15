"use client";

import { PUBLICATIONS } from "@/lib/constants";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FileText, ExternalLink } from "lucide-react";

export function PublicationsSection() {
  return (
    <section id="publications" className="bg-[#0a0a0a] py-24 px-6 md:px-12">
      <Container>
        <SectionHeader
          eyebrow="PUBLICATIONS"
          title="RESEARCH WORK"
          theme="dark"
          className="mb-16"
        />

        <div className="space-y-6">
          {PUBLICATIONS.map((pub) => (
            <a
              key={pub.id}
              href={pub.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/10 rounded-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-display font-medium text-white group-hover:text-gray-200">
                      {pub.title}
                    </h3>
                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors flex-shrink-0" />
                  </div>
                  <p className="text-sm font-mono text-gray-400 mt-2">{pub.year}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
