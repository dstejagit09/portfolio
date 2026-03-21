"use client";

import { useRef, useEffect, useState } from "react";

function ProjectVisual({ src, alt }: { src: string; alt: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const update = () => {
      if (wrapRef.current) {
        setScale(wrapRef.current.offsetWidth / 1080);
      }
    };
    update();
    const ro = new ResizeObserver(update);
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  const scaledHeight = Math.round(760 * scale);

  return (
    <div
      ref={wrapRef}
      className="w-full overflow-hidden bg-[#0a0a0a]"
      style={{ height: `${scaledHeight}px` }}
      aria-label={alt}
    >
      <iframe
        src={src}
        title={alt}
        style={{
          width: "1080px",
          height: "760px",
          border: "none",
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

const PROJECTS = [
  {
    index: "001",
    title: "Fault-Tolerant Crazyflie",
    period: "Jan 2026 to Present",
    metrics: [
      { label: "FDI Recovery",    value: "<50ms" },
      { label: "Platform",        value: "Crazyflie 2.1" },
      { label: "Validation",      value: "ROS2 Sim & Hardware" },
    ],
    visual: "/images/projects/01_crazyflie.html",
    visualAlt: "Crazyflie fault-tolerant control diagram",
    codeFile: "fdi_controller.py",
    codeIcon: "code",
    code: `fault = fdi.check(
    motor_states,
    tf2.TimePointZero
)

if fault.detected:
    ctrl.reconfigure(
        fault.failed_id,
        cmd_wrench
    )`,
    description:
      "Fault-tolerant flight control stack with FDI and controller reconfiguration. ROS2 test harness for log replay, automated flight scenarios, and stability bounds tracking on Crazyflie 2.1 hardware.",
    reversed: false,
  },
  {
    index: "002",
    title: "Multi-Robot Task Allocation",
    period: "Dec 2025",
    metrics: [
      { label: "Robots",         value: "5 TurtleBots" },
      { label: "Success Rate",   value: "99%" },
      { label: "Scenarios",      value: "10 validated" },
    ],
    visual: "/images/projects/02_multi_robot.html",
    visualAlt: "Multi-robot task allocation diagram",
    codeFile: "task_allocator.py",
    codeIcon: "schema",
    code: `def allocate(robots, tasks):
    C = build_cost_matrix(
        robots, tasks
    )
    assign = hungarian(C)

    for r, t in assign:
        plan_path(r, t, costmap)`,
    description:
      "Centralized ROS2 autonomy stack in Gazebo for 5 TurtleBots. Hungarian task assignment and A* motion planning with costmap-based collision avoidance. Validated across 10 scenarios with 99% mission success.",
    reversed: true,
  },
  {
    index: "003",
    title: "Crop Weed Detection",
    period: "May 2025",
    metrics: [
      { label: "Accuracy",       value: "97%" },
      { label: "Throughput",     value: "12 FPS" },
      { label: "Dataset",        value: "3000 samples" },
    ],
    visual: "/images/projects/03_weed_detection.html",
    visualAlt: "YOLOv8 weed detection diagram",
    codeFile: "weed_detector.py",
    codeIcon: "fingerprint",
    code: `def detect(self, frame):
    results = model.predict(
        frame, conf=0.5
    )
    for box in results.boxes:
        cls = box.cls.item()
        if cls == WEED_ID:
            self.flag(box.xyxy)`,
    description:
      "YOLOv8 model trained on 3000 samples, deployed on ROSMaster X3 at 97% accuracy and 12 FPS. Integrated ROS inference and visualization nodes for real-time robotic decision-making in precision agriculture.",
    reversed: false,
  },
  {
    index: "004",
    title: "Autonomous Drone Landing",
    period: "May 2025",
    metrics: [
      { label: "Landing Accuracy", value: "8 cm CEP" },
      { label: "Sim Trials",       value: "25 validated" },
      { label: "Platform",         value: "Parrot Mambo" },
    ],
    visual: "/images/projects/04_drone_landing.html",
    visualAlt: "Autonomous drone landing diagram",
    codeFile: "landing_controller.py",
    codeIcon: "flight",
    code: `def track_target(self, frame):
    target = self.detect_marker(frame)
    error = target.pos - self.uav.pos

    cmd = self.pid.compute(error)
    self.publish_velocity(cmd)`,
    description:
      "Guidance and control logic built in MATLAB/Simulink (digital twin, 25 trials). Onboard vision tracking on Parrot Mambo achieves closed-loop landing within 8 cm of a moving platform.",
    reversed: true,
  },
  {
    index: "005",
    title: "Maze Solving with myCobot600",
    period: "Dec 2024",
    metrics: [
      { label: "Grid",          value: "8x8" },
      { label: "Plan Time",     value: "60 s" },
      { label: "Arm",          value: "6-DOF myCobot600" },
    ],
    visual: "/images/projects/05_maze_solver.html",
    visualAlt: "6-DOF robot arm maze solving diagram",
    codeFile: "maze_solver.py",
    codeIcon: "route",
    code: `grid = occupancy_grid(
    frame, aruco_markers
)
path = astar(grid, start, goal)

for waypoint in path:
    arm.move_to_waypoint(waypoint)`,
    description:
      "OpenCV pipeline for maze detection using 2 ArUco markers on an 8x8 occupancy grid. A* path computed and executed via myCobot600 6-DOF motion control; 60 s planning time. Applicable to industrial pick-and-place workflows.",
    reversed: false,
  },
];

export function ProjectsShowcase() {
  return (
    <section id="bio" className="px-6 md:px-10 pt-28 pb-32 max-w-7xl mx-auto">
      {/* Section Header */}
      <header className="mb-24">
        <div className="flex items-center space-x-4 mb-4">
          <span className="w-3 h-3 bg-primary-fixed" />
          <span className="font-label text-sm uppercase tracking-[0.3em] text-outline">
            [ SYSTEM: READY ] [ MODE: DEPLOYMENTS ]
          </span>
        </div>
        <h1 className="font-headline text-7xl md:text-8xl italic leading-tight text-on-surface">
          Deployments
        </h1>
        <p className="font-label text-secondary mt-4 tracking-wider uppercase">
          Project Archive: 2024 to 2026
        </p>
      </header>

      {/* Projects — 3/12 | 6/12 | 3/12 layout */}
      <div className="space-y-24">
        {PROJECTS.map(({ index, title, period, metrics, visual, visualAlt, codeFile, codeIcon, code, description, reversed }) => (
          <article
            key={index}
            className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-outline-variant/15 border border-outline-variant/20"
          >
            {/* Metrics column — 3 cols */}
            <div className={`lg:col-span-3 bg-surface p-8 flex flex-col ${reversed ? "order-1 lg:order-3" : "order-1"}`}>
              <div className="space-y-1 mb-8">
                <span className="font-label text-primary-fixed text-xs tracking-widest uppercase">
                  {index}
                </span>
                <h2 className="font-headline text-2xl italic text-on-surface leading-tight">
                  {title}
                </h2>
                <p className="font-label text-[10px] text-outline uppercase tracking-widest">
                  {period}
                </p>
              </div>

              <div className="border-l-2 border-primary-fixed/30 pl-6 space-y-6 flex-1">
                {metrics.map(({ label, value }) => (
                  <div key={label}>
                    <p className="font-label text-[9px] text-outline uppercase tracking-widest mb-1">
                      {label}
                    </p>
                    <p className="font-label text-xl text-primary-fixed leading-none">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual column — 6 cols (center) */}
            <div className="lg:col-span-6 bg-surface-container-low overflow-hidden order-2">
              <ProjectVisual src={visual} alt={visualAlt} />
            </div>

            {/* Code column — 3 cols */}
            <div className={`lg:col-span-3 bg-surface-container-lowest p-8 flex flex-col ${reversed ? "order-3 lg:order-1 border-r border-outline-variant/10" : "order-3 border-l border-outline-variant/10"}`}>
              <div className="flex justify-between items-center mb-5">
                <span className="font-label text-[9px] text-outline uppercase tracking-widest truncate pr-2">{codeFile}</span>
                <span className="material-symbols-outlined text-outline text-sm shrink-0">{codeIcon}</span>
              </div>
              <pre className="text-[10px] leading-relaxed text-secondary-fixed-dim whitespace-pre-wrap font-label flex-1" style={{ letterSpacing: "-0.01em" }}>
                {code}
              </pre>
              <div className="mt-6 pt-6 border-t border-outline-variant/15">
                <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
