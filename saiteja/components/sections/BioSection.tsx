export function BioSection() {
  return (
    <section
      id="bio"
      className="px-6 md:px-10 pt-20 md:pt-28 pb-16 md:pb-32 max-w-7xl mx-auto"
    >
      {/* Status Bar */}
      <div className="mb-10 flex flex-wrap items-center gap-3 md:gap-4 text-[10px] font-label text-secondary tracking-[0.2em]">
        <span className="text-primary-fixed">[ SYSTEM: READY ]</span>
        <span>[ MODE: BIO ]</span>
        <div className="hidden md:block h-[1px] flex-grow bg-outline-variant/20" />
        <span>ORIGIN_LOG</span>
      </div>

      {/* Section Title */}
      <div className="mb-12 md:mb-20">
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-headline font-light leading-tight italic">
          Origin{" "}
          <span className="text-primary-fixed italic font-black">Log</span>
        </h1>
      </div>

      {/* Bio Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-outline-variant/15 border border-outline-variant/20">
        {/* Sidebar marker */}
        <div className="lg:col-span-3 bg-surface p-6 md:p-8 flex flex-col justify-between gap-8">
          <div>
            <span className="font-label text-[10px] text-outline uppercase tracking-widest mb-2 block">
              Operator
            </span>
            <p className="font-headline italic text-2xl text-on-surface leading-tight">
              Saiteja
              <br />
              Dasari
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <span className="font-label text-[9px] text-outline uppercase tracking-widest block mb-1">
                Base of Operations
              </span>
              <span className="font-label text-xs text-secondary">
                Tempe, AZ
              </span>
            </div>
            <div>
              <span className="font-label text-[9px] text-outline uppercase tracking-widest block mb-1">
                Status
              </span>
              <span className="font-label text-xs text-primary-fixed">
                Active
              </span>
            </div>
          </div>
        </div>

        {/* Main bio body */}
        <div className="lg:col-span-9 bg-surface-container-lowest p-6 md:p-12">
          <p className="font-label text-[10px] text-outline uppercase tracking-widest mb-6">
            Bio
          </p>
          <div className="space-y-6 max-w-3xl font-body text-base md:text-lg text-on-surface-variant leading-relaxed text-justify hyphens-auto">
            <p>
              M.S. Robotics &amp; Autonomous Systems candidate at Arizona
              State, graduating May 2026, with work spanning autonomy,
              controls, perception, fault-tolerant flight, and UAV systems
              engineering. I build robotic systems that move from digital
              twin to flight hardware, and I am targeting full-time robotics,
              controls, autonomy, and UAV roles.
            </p>
            <p>
              Recent work includes deriving and hardware-validating
              fault-tolerant control for the Crazyflie 2.1 (max roll cut from
              145° to 7.2°), centralized multi-robot task allocation across 5
              TurtleBots in ROS2, vision-based autonomous landing on a moving
              platform at 8 cm accuracy, real-time YOLOv8 crop and weed
              detection at 12 FPS on ROSMaster X3, and the voice-analytics
              pipeline for an LLM-agent ATC simulator at Honeywell Aerospace.
            </p>
            <p>
              I work across MATLAB and Simulink, Python, C and C++, ROS1 and
              ROS2, Gazebo, MuJoCo, CrazySim SITL, ArduPilot, and Linux. I
              care about clean abstractions, repeatable tests, and control
              loops that hold up when sensors lie.
            </p>
          </div>

          {/* Focus chips */}
          <div className="mt-10 pt-8 border-t border-outline-variant/15">
            <p className="font-label text-[10px] text-outline uppercase tracking-widest mb-4">
              Primary Focus
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Robot Autonomy",
                "Controls",
                "Multi-Robot Coordination",
                "Fault-Tolerant Flight",
                "Real-Time Perception",
                "Sim-to-Real Validation",
              ].map((focus) => (
                <span
                  key={focus}
                  className="font-label text-xs uppercase tracking-widest px-3.5 py-2 border border-primary-fixed/30 text-primary-fixed bg-primary-fixed/5"
                >
                  {focus}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
