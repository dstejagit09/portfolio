export function HeroSection() {
  return (
    <section
      id="archive"
      className="min-h-screen pt-32 pb-24 px-6 md:px-10 relative overflow-hidden"
    >
      {/* Dot-grid overlay */}
      <div className="absolute inset-0 mosaic-bg pointer-events-none" />

      {/* Status Bar */}
      <div className="mb-16 flex flex-wrap items-center gap-3">
        <div className="px-3 py-1 bg-surface-container-high border border-outline-variant/20 flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-primary-fixed shadow-[0_0_8px_var(--color-primary-fixed)]" />
          <span className="font-label text-xs uppercase tracking-[0.2em] text-on-surface-variant">
            [ SYSTEM: READY ]
          </span>
        </div>
        <div className="px-3 py-1 border border-primary-fixed/40 font-label text-xs uppercase tracking-[0.2em] text-primary-fixed">
          [ GRAD: MAY 2026 ]
        </div>
        <div className="px-3 py-1 border border-outline-variant/20 font-label text-xs uppercase tracking-[0.2em] text-on-surface-variant">
          [ CORE: V4.0.2-STABLE ]
        </div>
        <div className="px-3 py-1 border border-outline-variant/20 font-label text-xs uppercase tracking-[0.2em] text-on-surface-variant">
          [ LATENCY: 12ms ]
        </div>
      </div>

      {/* Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Headline Column */}
        <div className="lg:col-span-7">
          <h2 className="font-label text-primary-fixed text-sm tracking-[0.4em] mb-6 uppercase">
            MS Robotics &amp; Autonomous Systems · ASU
          </h2>

          {/* Primary role headline */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-headline italic font-black leading-[0.95] text-primary-fixed mb-4">
            Robotics
            <br />
            Engineer
          </h1>

          {/* Name signature */}
          <div className="mb-8">
            <p className="font-headline italic text-3xl sm:text-4xl md:text-6xl text-on-surface leading-none">
              Saiteja Dasari
            </p>
          </div>

          <p className="max-w-xl text-secondary text-base md:text-lg leading-relaxed text-justify hyphens-auto border-l border-primary-fixed/30 pl-5 md:pl-8 py-2">
            M.S. Robotics candidate with 6+ projects across autonomy, controls,
            perception, and UAV systems. Experience deploying real-time
            robotic stacks from MATLAB and Simulink digital twins to ROS2
            hardware, including multi-robot coordination, fault-tolerant
            flight, and vision-based landing. Strong in Python, C/C++,
            MATLAB/Simulink, and Linux.
          </p>

          <div className="mt-8 md:mt-12 border border-outline-variant/30 bg-surface-container-low p-5">
            <p className="font-label text-[10px] text-outline uppercase tracking-widest mb-4">
              Target Roles
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Robotics Engineer",
                "Controls Engineer",
                "UAV Systems",
                "Systems Engineer",
                "Robotics Software Engineer",
                "Autonomy Engineer",
                "Test & Validation Engineer",
              ].map((role) => (
                <span
                  key={role}
                  className="font-label text-xs uppercase tracking-widest px-3 py-1.5 border border-primary-fixed/30 text-primary-fixed bg-primary-fixed/5"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Terminal Column */}
        <div className="lg:col-span-5 w-full">
          <div className="bg-surface-container-lowest border border-outline-variant/30 shadow-2xl relative">
            {/* Terminal Header */}
            <div className="bg-surface-container-high px-4 py-2 flex items-center justify-between border-b border-outline-variant/30">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-error/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-primary-fixed/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-secondary/40" />
              </div>
              <div className="font-label text-[10px] tracking-widest text-on-surface-variant/60 uppercase">
                bash : 80x24
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-4 md:p-6 font-label text-xs md:text-sm leading-relaxed overflow-x-auto">
              {[
                { n: "01", prompt: true, cmd: "ros2 launch autonomy bringup.launch.py" },
                { n: "02", out: "[INFO] [launch]: Starting /fdi_controller" },
                { n: "03", out: "[INFO] [launch]: Starting /path_planner_node" },
                { n: "04", prompt: true, cmd: "ros2 topic echo /system_status" },
                { n: "05", json: "{" },
                { n: "06", json: '  "identity": "Saiteja Dasari",' },
                { n: "07", json: '  "gpa": "3.89 / 4.0",' },
                { n: "08", json: '  "focus": ["Controls", "Vision", "Autonomy"],' },
                { n: "09", json: '  "status": "NOMINAL"' },
                { n: "10", json: "}" },
              ].map(({ n, prompt, cmd, out, json }) => (
                <div key={n} className="flex gap-2 md:gap-4 mb-2 min-w-0">
                  <span className="text-primary-fixed/50 shrink-0">{n}</span>
                  {prompt && (
                    <>
                      <span className="text-primary-fixed shrink-0">
                        saiteja@asu:~$
                      </span>
                      <span className="text-on-surface break-all">{cmd}</span>
                    </>
                  )}
                  {out && (
                    <span className="text-secondary-fixed-dim break-all">{out}</span>
                  )}
                  {json && (
                    <span className="text-on-surface-variant">{json}</span>
                  )}
                </div>
              ))}
              {/* Cursor line */}
              <div className="flex gap-2 md:gap-4">
                <span className="text-primary-fixed/50">11</span>
                <span className="text-primary-fixed">saiteja@asu:~$</span>
                <span className="w-2 h-4 md:h-5 bg-primary-fixed animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
