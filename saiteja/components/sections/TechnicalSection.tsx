const SKILL_BLOCKS = [
  {
    id: "01",
    icon: "code",
    title: "Programming & Tools",
    tools: ["Python", "C/C++", "MATLAB/Simulink", "Bash", "Linux", "Git", "SolidWorks"],
    metric: { label: "Languages", value: "Python, C/C++" },
    description:
      "Day-to-day stack for robotics software, simulation, and analysis. Python and C/C++ across embedded, ROS2 nodes, and tooling. MATLAB/Simulink for control design and digital twins.",
  },
  {
    id: "02",
    icon: "auto_videocam",
    title: "Robotics & Simulation",
    tools: [
      "ROS1/ROS2", "Gazebo", "MuJoCo", "CrazySim SITL", "RViz",
      "tf2", "URDF/xacro", "ArduPilot", "Mission Planner", "cflib",
    ],
    metric: { label: "Sim Stack", value: "Gazebo + MuJoCo" },
    description:
      "Centralized ROS2 autonomy and Gazebo multi-robot environments. MuJoCo and CrazySim SITL for higher-fidelity quadrotor dynamics, with ArduPilot and Mission Planner on production UAVs.",
  },
  {
    id: "03",
    icon: "settings_input_component",
    title: "Controls, GNC & Test",
    tools: [
      "PID", "Closed-Loop Control", "State Estimation", "Sensor Fusion",
      "FDI", "Control Allocation", "Controller Reconfiguration", "SITL",
      "Log Replay", "Flight-Log Analysis",
    ],
    metric: { label: "Roll Reduction", value: "145° → 7.2°" },
    description:
      "Fault detection and isolation, control allocation, and controller reconfiguration on Crazyflie 2.1. SITL workflows, log replay, and flight-log analysis on hardware.",
  },
  {
    id: "04",
    icon: "visibility",
    title: "Autonomy & Perception",
    tools: [
      "A*", "Hungarian Algorithm", "Path Planning", "Costmaps",
      "Occupancy Grids", "Collision Avoidance", "OpenCV", "YOLOv8",
      "ArUco", "Pose Estimation",
    ],
    metric: { label: "Detection", value: "97% @ 12 FPS" },
    description:
      "Hungarian task assignment and A* planning over costmaps for multi-robot fleets. YOLOv8 and OpenCV pipelines for weed detection; ArUco-based pose estimation for the maze solver arm task.",
  },
  {
    id: "05",
    icon: "flight",
    title: "Flight Platforms",
    tools: ["Crazyflie 2.1", "Parrot Mambo", "P80 Multirotor", "ArduPilot", "Mission Planner"],
    metric: { label: "Landing CEP", value: "8 cm" },
    description:
      "Hands-on with Crazyflie 2.1 (fault-tolerant control), Parrot Mambo (vision-based landing), and P80 heavy-payload multirotor (ArduPilot PID tuning across 3 variants).",
  },
  {
    id: "06",
    icon: "engineering",
    title: "Sim-to-Hardware",
    tools: ["Digital Twin", "MuJoCo", "CrazySim SITL", "Simulink", "Gazebo"],
    metric: { label: "Sim Conditions", value: "24 validated" },
    description:
      "Digital twin in Simulink for autonomous landing. MuJoCo rigid-body sim for gyroscopic coupling on Crazyflie, with CrazySim SITL bridging to firmware-in-the-loop testing.",
  },
];

const META_ROWS = [
  { param: "Max Roll Reduction",       value: "145° → 7.2° via thrust clamp on Crazyflie 2.1",    dev: "± 0.5°",   status: "VALIDATED" },
  { param: "Allocation Methods Tested",value: "9 methods across 4 single-motor failure cases",     dev: "n/a",      status: "ACTIVE" },
  { param: "Sim Attitude Error",       value: "0° across 24 test conditions in MuJoCo",            dev: "n/a",      status: "NOMINAL" },
  { param: "CV Detection Accuracy",    value: "97% @ 12 FPS, YOLOv8n on ROSMaster X3",             dev: "± 0.5%",   status: "PEAK" },
  { param: "Multi-Robot Success Rate", value: "99% across 5 TurtleBots, 10 Gazebo scenarios",      dev: "0.01%",    status: "OPTIMIZED" },
  { param: "Autonomous Landing CEP",   value: "8 cm radius, Parrot Mambo, moving platform",        dev: "± 1.2 cm", status: "VALIDATED" },
  { param: "UAV Stability Gain",       value: "10% improvement, ArduPilot PID, 3 UAV variants",    dev: "± 1%",     status: "NOMINAL" },
];

export function TechnicalSection() {
  return (
    <section
      id="telemetry"
      className="px-6 md:px-10 pt-20 md:pt-28 pb-16 md:pb-32 bg-surface max-w-7xl mx-auto"
    >
      {/* Status Bar */}
      <div className="mb-10 flex flex-wrap items-center gap-3 md:gap-4 text-[10px] font-label text-secondary tracking-[0.2em]">
        <span className="text-primary-fixed">[ SYSTEM: READY ]</span>
        <span>[ LATENCY: 12ms ]</span>
        <span className="text-primary-fixed">[ MODE: SPECS ]</span>
        <div className="hidden md:block h-[1px] flex-grow bg-outline-variant/20" />
        <span>v4.0.2_CORE</span>
      </div>

      {/* Section Title */}
      <div className="mb-10 md:mb-20">
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-headline font-light leading-tight italic">
          Technical{" "}
          <span className="text-primary-fixed italic font-black">
            Specification
          </span>
        </h1>
      </div>

      {/* Skill Blocks — 3-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-outline-variant/20 border border-outline-variant/20 mb-12 md:mb-24">
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
              <p className="font-body text-base text-on-surface-variant leading-relaxed text-justify hyphens-auto">
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
                  className="font-label text-xs uppercase tracking-widest px-2.5 py-1 border border-outline-variant/30 text-on-surface-variant"
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
        <div className="overflow-x-auto -mx-6 md:mx-0 px-6 md:px-0">
          <table className="w-full min-w-[640px] text-left font-label text-base">
            <thead className="text-outline uppercase tracking-widest text-[10px]">
              <tr className="border-b border-outline-variant/10">
                <th className="py-4 md:py-6 px-3 md:px-4">Parameter</th>
                <th className="py-4 md:py-6 px-3 md:px-4">Value</th>
                <th className="py-4 md:py-6 px-3 md:px-4">Variance</th>
                <th className="py-4 md:py-6 px-3 md:px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="text-secondary">
              {META_ROWS.map(({ param, value, dev, status }) => (
                <tr
                  key={param}
                  className="border-b border-outline-variant/5 hover:bg-surface-container-low transition-colors"
                >
                  <td className="py-5 md:py-8 px-3 md:px-4 text-on-surface font-medium">{param}</td>
                  <td className="py-5 md:py-8 px-3 md:px-4 uppercase">{value}</td>
                  <td className="py-5 md:py-8 px-3 md:px-4">{dev}</td>
                  <td className="py-5 md:py-8 px-3 md:px-4 text-right text-primary-fixed">[ {status} ]</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}
