const SKILL_BLOCKS = [
  {
    id: "01",
    icon: "settings_input_component",
    title: "Control Systems",
    tools: ["MATLAB", "Simulink", "ROS2", "ArduPilot", "PID", "FDI"],
    metric: { label: "FDI Recovery", value: "<50ms" },
    description:
      "PID, FDI, and controller reconfiguration for fault-tolerant UAV systems. Validated from MATLAB/Simulink digital twin through Crazyflie hardware.",
  },
  {
    id: "02",
    icon: "visibility",
    title: "Computer Vision",
    tools: ["YOLOv8", "OpenCV", "Python", "ROSMaster X3"],
    metric: { label: "Detection", value: "97% @ 12 FPS" },
    description:
      "YOLOv8 and OpenCV pipelines for weed detection on ROSMaster X3. ArUco-based maze detection for 6-DOF robotic arm control.",
  },
  {
    id: "03",
    icon: "auto_videocam",
    title: "Robot Autonomy",
    tools: ["ROS2", "Gazebo", "A*", "Hungarian", "Python"],
    metric: { label: "Mission Success", value: "99%" },
    description:
      "Centralized autonomy stack for 5 TurtleBots. Hungarian task allocation and A* motion planning validated across 10 scenarios.",
  },
  {
    id: "04",
    icon: "flight",
    title: "Flight Platforms",
    tools: ["Crazyflie 2.1", "Parrot Mambo", "P80 Multirotor", "ArduPilot", "Mission Planner"],
    metric: { label: "Landing Accuracy", value: "8 cm CEP" },
    description:
      "Hands-on experience with Crazyflie 2.1 (fault-tolerant control), Parrot Mambo (autonomous vision landing), and P80 heavy-payload multirotor (ArduPilot PID tuning).",
  },
  {
    id: "05",
    icon: "memory",
    title: "Embedded & Software",
    tools: ["C", "Python", "MATLAB", "Git", "Linux"],
    metric: { label: "GPA", value: "3.89 / 4.0" },
    description:
      "ROS2 stacks, OpenCV pipelines, and sensor fusion nodes. Embedded C for low-level motor control and hardware interfacing.",
  },
  {
    id: "06",
    icon: "engineering",
    title: "Simulation",
    tools: ["Gazebo", "Simulink", "Digital Twin", "RViz"],
    metric: { label: "Sim Trials", value: "25+" },
    description:
      "Digital twin development in Simulink for autonomous drone landing. Multi-robot Gazebo environments with full collision avoidance.",
  },
];

const META_ROWS = [
  { param: "FDI Recovery Time",      value: "< 50ms — Crazyflie 2.1 motor fault injection",   dev: "± 2ms",    status: "ACTIVE" },
  { param: "CV Detection Accuracy",  value: "97% @ 12 FPS — YOLOv8n on ROSMaster X3",         dev: "± 0.5%",   status: "PEAK" },
  { param: "Navigation Success Rate",value: "99% — 5 TurtleBots, 10 Gazebo scenarios",         dev: "0.01%",    status: "OPTIMIZED" },
  { param: "Autonomous Landing CEP", value: "8 cm radius — Parrot Mambo on moving platform",   dev: "± 1.2 cm", status: "VALIDATED" },
  { param: "Maze Plan & Execution",  value: "60 s total — myCobot600 8x8 ArUco grid (A*)",     dev: "± 3 s",    status: "NOMINAL" },
  { param: "UAV Stability Gain",     value: "+5% — ArduPilot PID tuning on P80 multirotor",   dev: "± 1%",     status: "NOMINAL" },
];

export function TechnicalSection() {
  return (
    <section
      id="telemetry"
      className="px-6 md:px-10 pt-28 pb-32 bg-surface max-w-7xl mx-auto"
    >
      {/* Status Bar */}
      <div className="mb-10 flex items-center gap-4 text-[10px] font-label text-secondary tracking-[0.2em]">
        <span className="text-primary-fixed">[ SYSTEM: READY ]</span>
        <span>[ LATENCY: 12ms ]</span>
        <span className="text-primary-fixed">[ MODE: SPECS ]</span>
        <div className="h-[1px] flex-grow bg-outline-variant/20" />
        <span>v4.0.2_CORE</span>
      </div>

      {/* Section Title */}
      <div className="mb-20">
        <h1 className="text-6xl md:text-8xl font-headline font-light leading-tight italic">
          Technical{" "}
          <span className="text-primary-fixed italic font-black">
            Specification
          </span>
        </h1>
      </div>

      {/* Skill Blocks — 3-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-outline-variant/20 border border-outline-variant/20 mb-24">
        {SKILL_BLOCKS.map(({ id, icon, title, tools, metric, description }) => (
          <div
            key={id}
            className="bg-surface p-8 flex flex-col gap-6 group hover:bg-surface-container-low transition-colors"
          >
            {/* Header */}
            <div className="flex justify-between items-start">
              <span className="font-label text-[10px] text-primary-fixed tracking-widest uppercase">
                {id}
              </span>
              <span className="material-symbols-outlined text-outline group-hover:text-primary-fixed transition-colors text-xl">
                {icon}
              </span>
            </div>

            {/* Title */}
            <div>
              <h2 className="font-headline text-2xl italic text-on-surface mb-3">
                {title}
              </h2>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                {description}
              </p>
            </div>

            {/* Metric */}
            <div className="pt-4 border-t border-outline-variant/15">
              <span className="block font-label text-[9px] text-outline uppercase tracking-widest mb-1">
                {metric.label}
              </span>
              <span className="font-label text-xl text-primary-fixed">
                {metric.value}
              </span>
            </div>

            {/* Tool tags */}
            <div className="flex flex-wrap gap-1.5 mt-auto">
              {tools.map((tool) => (
                <span
                  key={tool}
                  className="font-label text-[9px] uppercase tracking-widest px-2 py-0.5 border border-outline-variant/30 text-on-surface-variant"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Engineering Meta Data */}
      <section className="border-t-2 border-primary-fixed pt-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
          <h3 className="text-3xl font-headline italic">Engineering Meta Data</h3>
          <div className="px-4 py-2 ghost-border">
            <span className="text-[10px] font-label text-primary-fixed uppercase tracking-[0.3em]">
              Revision: STABLE-4.0
            </span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-label text-sm">
            <thead className="text-outline uppercase tracking-widest text-[10px]">
              <tr className="border-b border-outline-variant/10">
                <th className="py-6 px-4">Parameter</th>
                <th className="py-6 px-4">Value</th>
                <th className="py-6 px-4">Variance</th>
                <th className="py-6 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="text-secondary">
              {META_ROWS.map(({ param, value, dev, status }) => (
                <tr
                  key={param}
                  className="border-b border-outline-variant/5 hover:bg-surface-container-low transition-colors"
                >
                  <td className="py-8 px-4 text-on-surface font-medium">{param}</td>
                  <td className="py-8 px-4 uppercase">{value}</td>
                  <td className="py-8 px-4">{dev}</td>
                  <td className="py-8 px-4 text-right text-primary-fixed">[ {status} ]</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}
