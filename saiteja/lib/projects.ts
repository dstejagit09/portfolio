export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectVideo {
  src: string;
  label: string;
}

export interface FuturePrototypes {
  demoUrl: string;
  demoLabel: string;
  videos: ProjectVideo[];
}

export interface Project {
  index: string;
  slug: string;
  title: string;
  subtitle?: string;
  period: string;
  status: string;
  tags: string[];
  metrics: ProjectMetric[];
  visual: string;
  visualAlt: string;
  codeFile: string;
  codeIcon: string;
  code: string;
  description: string;
  reversed: boolean;
  videoFile: string;
  videoLabel?: string;
  additionalVideos?: ProjectVideo[];
  futurePrototypes?: FuturePrototypes;
  github?: { url: string };
  liveDemo?: string;
}

export const PROJECTS: Project[] = [
  {
    index: "001",
    slug: "01-fault-tolerant-crazyflie",
    title: "Fault-Tolerant Quadrotor Control",
    subtitle: "Crazyflie 2.1, MuJoCo, CrazySim SITL",
    period: "Jan 2026 to Present",
    status: "ACTIVE",
    tags: ["Controls", "Allocation", "MuJoCo", "CrazySim SITL", "ROS2", "UAV"],
    metrics: [
      { label: "Max Roll Reduction",  value: "145° to 7.2°" },
      { label: "Sim Conditions",      value: "24 validated" },
      { label: "Allocation Methods",  value: "9 tested" },
    ],
    visual: "/images/projects/01_crazyflie.html",
    visualAlt: "Crazyflie fault-tolerant control diagram",
    codeFile: "allocator.py",
    codeIcon: "code",
    code: `# 3-motor allocation,
# motor 0 failed
W = clamp_thrust(
    M_3motor @ cmd_wrench
)

motor.set_pwm(
    [0.0, *W]
)`,
    description:
      "Closed-form 3-motor allocation derived and validated for all 4 single-motor failure cases. Identified motor saturation as the root cause of attitude loss; a thrust clamp reduced max roll from 145° to 7.2° on hardware. MuJoCo rigid-body sim built for gyroscopic coupling, with sim-to-real validation across PID, INDI, and gyroscopic-compensation controllers.",
    reversed: false,
    videoFile: "/videos/01-fault-tolerant-crazyflie.mp4",
    github: { url: "https://github.com/dstejagit09/CrazyFlie_Fault_Tolerant_Project" },
  },
  {
    index: "002",
    slug: "02-multi-robot-task-allocation",
    title: "Multi-Robot Task Allocation",
    subtitle: "ROS2, Gazebo, Hungarian, A*",
    period: "Dec 2025",
    status: "COMPLETE",
    tags: ["ROS2", "Planning", "Hungarian", "A*", "Gazebo", "Autonomy"],
    metrics: [
      { label: "Robots",       value: "5 TurtleBots" },
      { label: "Success Rate", value: "99%" },
      { label: "Scenarios",    value: "10 validated" },
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
    videoFile: "/videos/02-multi-robot-task-allocation.mp4",
    github: { url: "https://github.com/dstejagit09/Multi-Robot-Task-Allocation-main" },
  },
  {
    index: "003",
    slug: "03-crop-weed-detection",
    title: "Crop Weed Detection",
    subtitle: "YOLOv8, OpenCV, ROSMaster X3",
    period: "May 2025",
    status: "COMPLETE",
    tags: ["YOLOv8", "OpenCV", "ROS2", "Computer Vision", "Edge AI"],
    metrics: [
      { label: "Accuracy",    value: "97%" },
      { label: "Throughput",  value: "12 FPS" },
      { label: "Dataset",     value: "3000 samples" },
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
    videoFile: "/videos/03-crop-weed-detection.mp4",
    videoLabel: "Field Run",
    additionalVideos: [
      { src: "/videos/03-crop-weed-detection-2.mp4", label: "Detection Pipeline" },
    ],
  },
  {
    index: "004",
    slug: "04-autonomous-drone-landing",
    title: "Autonomous Drone Landing",
    subtitle: "MATLAB and Simulink, OpenCV, Parrot Mambo",
    period: "May 2025",
    status: "COMPLETE",
    tags: ["MATLAB", "Simulink", "OpenCV", "Parrot Mambo", "PID", "Vision Tracking", "Pose Estimation"],
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
      "Guidance and control logic built in MATLAB and Simulink as a digital twin across 25 trials. Onboard vision-based relative pose estimation on the Parrot Mambo, paired with closed-loop PID, achieves landing within 8 cm of a moving platform.",
    reversed: true,
    videoFile: "/videos/04-autonomous-drone-landing.mp4",
    github: { url: "https://github.com/dstejagit09/autonomous_drone_landing" },
  },
  {
    index: "005",
    slug: "05-maze-solver",
    title: "Maze Solving with myCobot600",
    subtitle: "OpenCV, ArUco, A*, 6-DOF Arm",
    period: "Dec 2024",
    status: "COMPLETE",
    tags: ["OpenCV", "A*", "Arm Robotics", "ArUco", "Path Planning"],
    metrics: [
      { label: "Grid",      value: "8×8" },
      { label: "Plan Time", value: "60 s" },
      { label: "Arm",       value: "6-DOF myCobot600" },
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
      "OpenCV pipeline for maze detection using 2 ArUco markers on an 8×8 occupancy grid. A* path computed and executed via myCobot600 6-DOF motion control; 60 s planning time. Applicable to industrial pick-and-place workflows.",
    reversed: false,
    videoFile: "/videos/05-maze-solver.mp4",
    github: { url: "https://github.com/dstejagit09/Maze-Solving-using-MyCobot600" },
  },
  {
    index: "006",
    slug: "06-skyspeak-ai",
    title: "SkySpeak AI",
    subtitle: "Honeywell Anthem, LLM Agents, Voice Analytics",
    period: "Aug 2025 to Present",
    status: "ACTIVE",
    tags: [
      "LLM Agents", "Voice Analytics", "LiveKit", "Deepgram",
      "ElevenLabs", "Python", "React", "CBTA",
    ],
    metrics: [
      { label: "Voice Pipeline",        value: "300 ms latency" },
      { label: "Stakeholder Reviews",   value: "20+" },
      { label: "Team Size",             value: "3 engineers" },
    ],
    visual: "/images/projects/06_skyspeak.html",
    visualAlt: "SkySpeak AI voice pipeline diagram",
    codeFile: "voice_analytics.py",
    codeIcon: "mic",
    code: `frame = audio.next()
pitch = yin(frame)
score = z_score(
    pitch, baseline
)
if abstention(score) < 0.6:
    grade = cbta(transcript)
    dashboard.push(grade)`,
    description:
      "AI-powered ATC-pilot simulator for Honeywell Aerospace's Anthem ecosystem. Real-time voice pipeline at 300 ms (LiveKit, Deepgram, ElevenLabs) paired with Python voice analytics: YIN pitch, VAD, z-score calibration, and abstention scoring under 0.60. CBTA dashboard surfaces cognitive load and communication competency to instructors.",
    reversed: true,
    videoFile: "/videos/06-skyspeak-ai.mp4",
    videoLabel: "Main Demo",
    futurePrototypes: {
      demoUrl: "https://skyspeakai.vercel.app/",
      demoLabel: "Future Prototypes Demo",
      videos: [
        { src: "/videos/06-skyspeak-future-adaptive-ai.mp4",          label: "Adaptive AI" },
        { src: "/videos/06-skyspeak-future-pilot-predict.mp4",        label: "Pilot Predict" },
        { src: "/videos/06-skyspeak-future-scenario-builder.mp4",     label: "Scenario Builder" },
        { src: "/videos/06-skyspeak-future-layout-customisation.mp4", label: "Layout Customisation" },
      ],
    },
    github: { url: "https://github.com/dstejagit09/HoneywellAnthem_PilotTraining_Dash" },
    liveDemo: "https://honeywell-anthem-pilot-training-sol.vercel.app/",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
