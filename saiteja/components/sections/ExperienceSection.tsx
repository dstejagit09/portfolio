const EXPERIENCES = [
  {
    index: "01",
    role: "Research Externship / Technical Lead, SkySpeak AI",
    org: "Honeywell Aerospace, Arizona State University Collaborative Research",
    period: "Aug 2025 to Present",
    type: "Externship",
    description:
      "Directing a 3-engineer team in partnership with Honeywell and ASU stakeholders to deliver an ATC-pilot simulator built on LLM agents, structured guardrails, and a 300 ms LiveKit, Deepgram, and ElevenLabs voice pipeline. Engineered the Python voice analytics stack with YIN pitch detection, voice activity detection, z-score calibration, and abstention scoring under 0.60. Launched a CBTA dashboard used in 20+ stakeholder reviews and seed-grant evaluations.",
    tags: ["LLM Agents", "LiveKit", "Deepgram", "ElevenLabs", "YIN", "VAD", "CBTA", "Python", "React"],
    status: "ACTIVE",
    link: { href: "https://honeywell-anthem-pilot-training-sol.vercel.app/", label: "VISIT LIVE PRODUCT" } as { href: string; label: string } | undefined,
  },
  {
    index: "02",
    role: "Graduate Teaching Assistant",
    org: "Arizona State University, MATLAB Programming and Instrumentation & Controls Lab",
    period: "Jan 2025 to Present",
    type: "Academic",
    description:
      "Mentoring 90+ students across MATLAB, instrumentation, and controls labs at ASU's Fulton Schools of Engineering. Troubleshooting code and hardware setups, leading review sessions, and reinforcing PID and control-system concepts during weekly office hours.",
    tags: ["MATLAB", "Instrumentation", "Controls", "PID", "Lab Instruction"],
    status: "ACTIVE",
    link: undefined as { href: string; label: string } | undefined,
  },
  {
    index: "03",
    role: "Production Engineering Intern, UAV Systems Integration",
    org: "Marut Drones (IIIT-Hyderabad)",
    period: "Oct 2023 to Mar 2024",
    type: "Industry",
    description:
      "Assembled and verified UAV subsystems including ESCs, flight controllers, GPS, avionics, and propulsion hardware across multirotor platforms, raising production efficiency by 15%. Tuned ArduPilot and Mission Planner PID parameters from flight logs across 3 UAV variants, root-caused stability issues, and increased flight stability by approximately 10%.",
    tags: ["ArduPilot", "Mission Planner", "PID", "UAV Assembly", "Flight Logs", "3 Variants"],
    status: "COMPLETED",
    link: undefined as { href: string; label: string } | undefined,
  },
  {
    index: "04",
    role: "Co-Founder",
    org: "Aatram",
    period: "Feb 2026 to Present",
    type: "Startup",
    description:
      "Co-founded an emotion-first anti-procrastination app for students and young professionals. Designed an adaptive nudge engine leveraging Apple Intelligence for context-aware notifications. Built a Momentum Board with streak alternatives (Bounce-Back Score, Monthly Chapters, momentum tracking), replacing punitive streak systems with psychologically grounded progress mechanics. Integrated evidence-based focus techniques: implementation intentions, WOOP, affect labeling, and temptation bundling.",
    tags: ["Product Architecture", "JITAI", "Behavioral Design", "Cloudflare Workers"],
    status: "ACTIVE",
    link: { href: "https://www.aatram.com/", label: "VISIT LIVE PRODUCT" } as { href: string; label: string } | undefined,
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="px-6 md:px-10 pt-20 md:pt-28 pb-16 md:pb-32 max-w-7xl mx-auto">
      {/* Section Header */}
      <header className="mb-12 md:mb-24">
        <div className="flex items-center space-x-4 mb-4">
          <span className="w-3 h-3 bg-primary-fixed" />
          <span className="font-label text-sm uppercase tracking-[0.3em] text-outline">
            [ SYSTEM: READY ] [ MODE: BUILD_LOG ]
          </span>
        </div>
        <h1 className="font-headline text-5xl sm:text-7xl md:text-8xl italic leading-tight text-on-surface">
          Build Log
        </h1>
        <p className="font-label text-secondary mt-4 tracking-wider uppercase">
          Experience Record: 2023 to Present
        </p>
      </header>

      {/* Timeline */}
      <div className="relative">
        <div className="hidden md:block absolute left-[11.5rem] top-0 bottom-0 w-px bg-outline-variant/20" />

        <div className="space-y-0">
          {EXPERIENCES.map(({ index, role, org, period, type, description, tags, status, link }, i) => (
            <div
              key={index}
              className={`grid grid-cols-1 md:grid-cols-[12rem_1fr] gap-0 ${
                i < EXPERIENCES.length - 1 ? "border-b border-outline-variant/10" : ""
              }`}
            >
              {/* Left: date column */}
              <div className="md:pr-12 py-8 md:py-12 flex flex-wrap md:flex-col md:items-end gap-3 md:gap-2">
                <span className="font-label text-primary-fixed text-xs tracking-widest">
                  {index}
                </span>
                <span className="font-label text-[10px] text-outline uppercase tracking-widest leading-relaxed md:text-right">
                  {period}
                </span>
                <span
                  className={`font-label text-[9px] uppercase tracking-widest px-2 py-0.5 border ${
                    status === "ACTIVE"
                      ? "border-primary-fixed/40 text-primary-fixed"
                      : "border-outline-variant/30 text-outline"
                  }`}
                >
                  {status}
                </span>
              </div>

              {/* Right: content */}
              <div className="md:pl-12 py-8 md:py-12 relative">
                <div className="hidden md:block absolute -left-[1px] top-[3.75rem] w-3 h-3 bg-surface border border-primary-fixed/40 translate-x-[-50%]" />
                <div className="mb-2">
                  <span className="font-label text-[10px] text-outline uppercase tracking-widest">
                    {type}
                  </span>
                </div>
                <h2 className="font-headline text-2xl md:text-3xl italic text-on-surface mb-1">
                  {role}
                </h2>
                <p className="font-label text-base text-primary-fixed tracking-wider mb-6 uppercase">
                  {org}
                </p>
                <p className="font-body text-base text-on-surface-variant leading-relaxed text-justify hyphens-auto max-w-2xl mb-8">
                  {description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-label text-xs uppercase tracking-widest px-3.5 py-1.5 border border-outline-variant/30 text-on-surface-variant"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {link && (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex items-center gap-2 font-label text-xs uppercase tracking-widest text-primary-fixed hover:opacity-70 transition-opacity px-3 py-2.5 border border-primary-fixed/30 hover:bg-primary-fixed/5"
                  >
                    <span>{link.label}</span>
                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
