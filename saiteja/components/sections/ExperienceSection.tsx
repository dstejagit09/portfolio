const EXPERIENCES = [
  {
    index: "01",
    role: "Co-Founder",
    org: "Aatram",
    period: "2024 to Present",
    type: "Startup",
    description:
      "Co-founded an emotion-first anti-procrastination app for students and young professionals. Designed an adaptive nudge engine leveraging Apple Intelligence for context-aware notifications. Built a Momentum Board with streak alternatives — Bounce-Back Score, Monthly Chapters, and momentum tracking — replacing punitive streak systems with psychologically grounded progress mechanics. Integrated evidence-based focus techniques including implementation intentions, WOOP, affect labeling, and temptation bundling as Pomodoro alternatives.",
    tags: ["Product Architecture", "JITAI", "Behavioral Design", "Cloudflare Workers"],
    status: "ACTIVE",
  },
  {
    index: "02",
    role: "Honeywell Extern",
    org: "Honeywell — Arizona State University Collaborative Research",
    period: "Aug 2025 to Present",
    type: "Externship",
    description:
      "Architecting Sky Speak, an AI-powered pilot training platform for Honeywell Aerospace's Anthem ecosystem. Integrating voice stress analysis with CBTA competency grading to assess pilot cognitive load during ATC communications. Built a React instructor dashboard with real-time communication analytics and performance visualization.",
    tags: ["AI Simulation", "Voice Stress Analysis", "CBTA", "React", "ATC Training"],
    status: "ACTIVE",
  },
  {
    index: "03",
    role: "Teaching Assistant & Instructional Aide",
    org: "Arizona State University — Intro to MATLAB Programming; Controls & Systems Lab",
    period: "Jan 2025 to Present",
    type: "Academic",
    description:
      "Supporting 90+ students across 5 lab sections for MATLAB Programming and Controls & Systems courses at ASU's Fulton Schools of Engineering. Leading review sessions, running office hours, and grading labs covering PID control and systems analysis.",
    tags: ["MATLAB", "Controls", "PID", "Teaching", "Lab Instruction"],
    status: "ACTIVE",
  },
  {
    index: "04",
    role: "Production Engineering Intern",
    org: "Marut Drones (IIIT-Hyderabad)",
    period: "Oct 2023 to Mar 2024",
    type: "Industry",
    description:
      "Integrated electronic and mechanical subsystems across multi-rotor platforms at one of India's leading agricultural UAV companies. Configured ArduPilot and Mission Planner for a P80 heavy-payload drone, improving production efficiency by 15% and flight stability by 5% through PID tuning.",
    tags: ["ArduPilot", "Mission Planner", "PID", "UAV Assembly", "Flight Logs"],
    status: "COMPLETED",
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="px-6 md:px-10 pt-28 pb-32 max-w-7xl mx-auto">
      {/* Section Header */}
      <header className="mb-24">
        <div className="flex items-center space-x-4 mb-4">
          <span className="w-3 h-3 bg-primary-fixed" />
          <span className="font-label text-sm uppercase tracking-[0.3em] text-outline">
            [ SYSTEM: READY ] [ MODE: BUILD_LOG ]
          </span>
        </div>
        <h1 className="font-headline text-7xl md:text-8xl italic leading-tight text-on-surface">
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
          {EXPERIENCES.map(({ index, role, org, period, type, description, tags, status }, i) => (
            <div
              key={index}
              className={`grid grid-cols-1 md:grid-cols-[12rem_1fr] gap-0 ${
                i < EXPERIENCES.length - 1 ? "border-b border-outline-variant/10" : ""
              }`}
            >
              {/* Left: date column */}
              <div className="md:pr-12 py-12 flex md:flex-col md:items-end gap-4 md:gap-2">
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
              <div className="md:pl-12 py-12 relative">
                <div className="hidden md:block absolute -left-[1px] top-[3.75rem] w-3 h-3 bg-surface border border-primary-fixed/40 translate-x-[-50%]" />
                <div className="mb-2">
                  <span className="font-label text-[10px] text-outline uppercase tracking-widest">
                    {type}
                  </span>
                </div>
                <h2 className="font-headline text-3xl italic text-on-surface mb-1">
                  {role}
                </h2>
                <p className="font-label text-sm text-primary-fixed tracking-wider mb-6 uppercase">
                  {org}
                </p>
                <p className="font-body text-sm text-on-surface-variant leading-relaxed max-w-2xl mb-8">
                  {description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-label text-[10px] uppercase tracking-widest px-3 py-1 border border-outline-variant/30 text-on-surface-variant"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
