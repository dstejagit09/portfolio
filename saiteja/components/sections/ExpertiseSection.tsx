"use client";

import { EXPERTISE_AREAS } from "@/lib/constants";
import { ExpertiseCard } from "@/components/ui/ExpertiseCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Container } from "@/components/layout/Container";

export function ExpertiseSection() {
  return (
    <section id="expertise" className="bg-[#0a0a0a] py-24 px-6 md:px-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Section Header */}
          <div className="md:col-span-4">
            <SectionHeader
              eyebrow="EXPERTISE"
              title={
                <>
                  AREAS I
                  <br />
                  SPECIALIZE IN
                </>
              }
              theme="dark"
            />
          </div>

          {/* Expertise Cards Grid */}
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
            {EXPERTISE_AREAS.map((expertise, index) => (
              <div
                key={expertise.id}
                style={{
                  animation: `fadeInUp 0.8s ease-out ${(index + 1) * 0.1}s forwards`,
                  opacity: 0,
                }}
              >
                <ExpertiseCard expertise={expertise} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
