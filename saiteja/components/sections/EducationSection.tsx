"use client";

import { ABOUT_CONTENT, SITE_CONFIG } from "@/lib/constants";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GraduationCap, MapPin } from "lucide-react";

export function EducationSection() {
  return (
    <section id="education" className="bg-[#F3F3F3] py-24 px-6 md:px-12">
      <Container>
        <SectionHeader
          eyebrow="EDUCATION"
          title="WHERE I STUDIED"
          theme="light"
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Masters */}
          <div className="bg-white rounded-xl p-8 border border-gray-200">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-gray-100 rounded-lg">
                <GraduationCap className="w-6 h-6 text-gray-700" />
              </div>
              <div>
                <h3 className="text-xl font-display font-medium text-gray-900">
                  {ABOUT_CONTENT.education.masters.degree}
                </h3>
                <p className="text-gray-600">{ABOUT_CONTENT.education.masters.school}</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{SITE_CONFIG.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-mono text-gray-500">{ABOUT_CONTENT.education.masters.period}</span>
                <span className="px-3 py-1 bg-gray-900 text-white text-sm rounded-full">
                  GPA: {ABOUT_CONTENT.education.masters.gpa}
                </span>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-2">Relevant Coursework</p>
              <div className="flex flex-wrap gap-2">
                {ABOUT_CONTENT.education.masters.coursework.map((course) => (
                  <span
                    key={course}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bachelors */}
          <div className="bg-white rounded-xl p-8 border border-gray-200">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-gray-100 rounded-lg">
                <GraduationCap className="w-6 h-6 text-gray-700" />
              </div>
              <div>
                <h3 className="text-xl font-display font-medium text-gray-900">
                  {ABOUT_CONTENT.education.bachelors.degree}
                </h3>
                <p className="text-gray-600">{ABOUT_CONTENT.education.bachelors.school}</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>Hyderabad, India</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-mono text-gray-500">{ABOUT_CONTENT.education.bachelors.period}</span>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-2">Relevant Coursework</p>
              <div className="flex flex-wrap gap-2">
                {ABOUT_CONTENT.education.bachelors.coursework?.map((course) => (
                  <span
                    key={course}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
