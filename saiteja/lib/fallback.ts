/* Canned responses keyed by topic */
const RESPONSES: Record<string, string> = {
  "best projects for robotics roles":
    "His three strongest projects for robotics roles are: **Fault-Tolerant Crazyflie** (motor allocation, 145° to 7.2° max roll reduction), **Multi-Robot Task Allocation** (5 TurtleBots, Hungarian and A*, 99% success), and **Autonomous Drone Landing** (8cm CEP on moving platform). [View projects](/#deployments)",

  "what makes him different":
    "Three things stand out: **(1)** He goes from simulation to hardware on every project. MATLAB and Gazebo first, then real robots. **(2)** He covers the full stack: controls, perception, planning, and firmware. **(3)** His Honeywell SkySpeak externship shows aerospace-grade AI work alongside his academic research. [View experience](/#experience)",

  "uav & drone experience":
    "Hands-on across three platforms: **Crazyflie 2.1** (fault-tolerant control allocation), **Parrot Mambo** (autonomous vision-guided landing within 8cm), and **P80 heavy-payload multirotor** (ArduPilot PID tuning at Marut Drones, 10% stability gain across 3 variants). Tools: ArduPilot, Mission Planner, direct PWM control. [View projects](/#deployments)",

  "controls expertise":
    "Controls is his core area: **PID** for UAV stabilization, **control allocation** with controller reconfiguration for degraded actuators, **LQR** in simulation, and MATLAB and Simulink for digital twin validation. He also teaches PID and systems analysis to 90+ students as ASU TA. [View specs](/#telemetry)",

  "work at honeywell":
    "At Honeywell Aerospace (Aug 2025 to Apr 2026), he built **SkySpeak AI**, a pilot training platform for the Anthem avionics ecosystem. He integrated voice analytics with CBTA competency grading to measure ATC cognitive load, and built a React instructor dashboard with real-time communication analytics. [View experience](/#experience)",

  "ros2 projects":
    "ROS2 is central to his work: **Multi-Robot coordination** for 5 TurtleBots in Gazebo with a from-scratch A* planner, Hungarian assignment, and AMCL localization (only Nav2's map server off-the-shelf), **YOLOv8 inference nodes** on ROSMaster X3 at 12 FPS, and a **ROS2 test harness** for automated Crazyflie flight scenarios with log replay. Comfortable with TF2, costmaps, launch files, and URDF/xacro. [View projects](/#deployments)",

  "crazyflie":
    "**Fault-Tolerant Quadrotor Control** (Jan 2026 to May 2026): Closed-form 3-motor allocation derived for all 4 single-motor failure cases. Identified motor saturation as the root cause of attitude loss; a thrust clamp reduced max roll from 145° to 7.2° on Crazyflie 2.1 hardware. Validated in MuJoCo across 24 conditions. [View projects](/#deployments)",

  "multi-robot":
    "**Multi-Robot Task Allocation** (Dec 2025): A from-scratch ROS2 warehouse pipeline for 5 TurtleBot3 robots — hand-written A* planner, inflation costmap, Hungarian assignment, and PD trajectory control, with only Nav2's map server and AMCL off-the-shelf. A dynamic, time-stepped loop re-solves the Hungarian assignment as robots free up, and a path cache keyed on (start, task) makes each robot drive exactly the scored route. ~99% mission success across 5 robots and 8 tasks. [View projects](/#deployments)",

  "crop weed":
    "**Crop Weed Detection** (May 2025): YOLOv8n trained on 3000 labelled samples, deployed on ROSMaster X3 via ONNX Runtime. Achieves 97% detection accuracy at 12 FPS. ROS inference and visualization nodes enable real-time robotic decision-making for precision agriculture. Tech: ROS, Python, OpenCV, YOLOv8. [View projects](/#deployments)",

  "drone landing":
    "**Autonomous Drone Landing on a Moving Platform** (May 2025): Landing control logic designed in MATLAB and Simulink (25 validated trials). Onboard vision tracking and PID control on Parrot Mambo achieve closed-loop touchdown within **8 cm CEP** of a moving platform. [View projects](/#deployments)",

  "maze":
    "**Maze Solving with myCobot Pro 600** (Dec 2024): An OpenCV pipeline (camera calibration, binary thresholding, perspective crop) builds a 34×34 occupancy grid with dilated walls. A* finds the path, and inverse kinematics (MATLAB RigidBodyTree) maps each waypoint to six joint angles streamed over TCP/IP to a physical 6-DOF myCobot Pro 600 arm. Planning-to-execution about 60 s. [View projects](/#deployments)",

  "aatram":
    "**Aatram, Co-Founder** (Feb 2026 to Apr 2026): Emotion-first anti-procrastination app for students. He architected the adaptive nudge engine (JITAI-based, leveraging Apple Intelligence), built the Momentum Board with Bounce-Back Score and Monthly Chapters, and integrated focus techniques like WOOP and implementation intentions as Pomodoro alternatives. [View experience](/#experience)",

  "honeywell":
    "**Honeywell Externship** (Aug 2025 to Apr 2026): Architected SkySpeak AI, a pilot training platform for Honeywell Aerospace's Anthem ecosystem. Includes voice analytics, CBTA competency grading, and a React instructor dashboard. Enabled 20+ stakeholder review sessions targeting ATC trainee attrition reduction. [View experience](/#experience)",

  "teaching assistant":
    "**ASU Teaching Assistant** (Jan 2025 to May 2026): Supported 90+ students across 5 lab sections for Intro to MATLAB Programming and Controls and Systems Lab at ASU's Fulton Schools of Engineering. Responsibilities: review sessions, office hours, and grading labs covering PID control and systems analysis. [View experience](/#experience)",

  "marut":
    "**Marut Drones, Production Engineering Intern** (Aug 2023 to May 2024): Integrated electronic and mechanical subsystems across multi-rotor agricultural UAV platforms. Configured ArduPilot and Mission Planner for a P80 heavy-payload drone. Results: production efficiency +15%, flight stability +10% through PID tuning across 3 UAV variants. [View experience](/#experience)",

  "ros":
    "He uses ROS1 and ROS2 across all major projects: multi-robot coordination stacks, inference nodes, test harnesses, TF2, URDF/xacro, and Gazebo simulation. His strongest ROS2 work is the 5-robot TurtleBot coordination stack and the Crazyflie fault-tolerant control harness. [View specs](/#telemetry)",

  "python":
    "Python is his primary language: ROS2 nodes, computer vision pipelines (OpenCV, YOLOv8), path planning (A*, Hungarian), and data analysis. He also works in C for firmware-level control and MATLAB for control design. [View specs](/#telemetry)",

  "matlab":
    "MATLAB and Simulink are used for control system design and digital twin simulation, notably for the Autonomous Drone Landing project (25 validated trials) and PID and LQR controller design. He also teaches MATLAB to 90+ students as ASU TA. [View specs](/#telemetry)",

  "ardupilot":
    "Hands-on ArduPilot experience from Marut Drones, configuring Mission Planner and tuning PID parameters for a P80 heavy-payload multirotor across 3 UAV variants and improving flight stability by 10%. Familiar with flight log analysis and parameter tuning workflows. [View specs](/#telemetry)",

  "opencv":
    "OpenCV is used across multiple projects: camera calibration and thresholding for the maze solver, vision tracking for drone landing, YOLOv8 integration for crop weed detection, and occupancy grid generation. Deployed on both desktop Python and embedded ROS nodes. [View specs](/#telemetry)",

  "yolo":
    "He trained and deployed YOLOv8n for Crop Weed Detection: 3000 samples, 97% accuracy, 12 FPS on ROSMaster X3 via ONNX Runtime. The inference runs as a ROS node that publishes detection results for downstream robotic decision-making. [View projects](/#deployments)",

  "gazebo":
    "Gazebo is his primary simulation environment, used for the 5-robot TurtleBot coordination stack with AMCL localization and a custom inflation costmap. He builds custom worlds, configures robot models with URDF/xacro, and validates autonomy stacks before hardware deployment. [View specs](/#telemetry)",

  "asu":
    "**Arizona State University** (Aug 2024 to May 2026): MS Robotics and Autonomous Systems (Systems Engineering Track), GPA **3.93/4.0**. Coursework: Aerial Robotics, Mechatronics, Multi-Robot Systems, Controls and Systems. Also serving as Teaching Assistant for MATLAB and Controls labs. [View specs](/#telemetry)",

  "education":
    "**MS Robotics**, Arizona State University (2024 to 2026), GPA 3.93/4.0. **BE Electrical and Electronics Engineering**, Chaitanya Bharathi Institute of Technology, Hyderabad (2020 to 2024). [View specs](/#telemetry)",

  "gpa":
    "Saiteja holds a **3.93/4.0 GPA** in his MS Robotics and Autonomous Systems program at Arizona State University (graduated May 2026).",

  "certification":
    "Certifications: **Universal Robots e-Series** (Core and Pro), **MathWorks AI** (ML and DL), **Hugging Face RL**, and **Udemy ROS and ROS2**. Publication: *SCADA-Based Substation Control Panel and Operations*. [View manifest](/#manifest)",

  "publication":
    "Published: **SCADA-Based Substation Control Panel and Operations**. View the paper in the Manifest section. [View manifest](/#manifest)",

  "contact":
    "Reach Saiteja at **totobotplus@gmail.com** or use the contact form on this site. LinkedIn: [linkedin.com/in/sdasar38](https://www.linkedin.com/in/sdasar38/) | GitHub: [github.com/dstejagit09](https://github.com/dstejagit09). [Go to contact](/#contact)",

  "email":
    "Email: **totobotplus@gmail.com**, or use the contact form on this site. [Go to contact](/#contact)",

  "hire":
    "Saiteja is **open to full-time roles, internships, research positions, and collaboration**. Target roles: Robotics Engineer, Controls Engineer, UAV Systems, Systems Engineer, Robotics Software Engineer, Autonomy Engineer, Test and Validation Engineer. Based in Tempe, AZ; graduated May 2026. [Get in touch](/#contact)",

  "resume":
    "Download Saiteja's resume via the **Download CV** button in the Contact section. [Go to contact](/#contact)",

  "hello":
    "Hey there! I'm Saiteja's portfolio assistant. Ask me about his **projects**, **experience**, **skills**, or **how to get in touch**.",

  "who":
    "**Saiteja Venkateshwa Rao Dasari**, MS Robotics graduate from ASU (GPA 3.93, May 2026), specializing in autonomous systems, control theory, and computer vision. Hands-on across ROS2 multi-robot stacks, UAV platforms, YOLOv8 perception, and MATLAB and Simulink. [Learn more](/#archive)",
};

/* Keyword to topic map (order matters; specific first) */
const KEYWORD_MAP: Array<[string, string]> = [
  ["crazyflie",           "crazyflie"],
  ["fault tolerant",      "crazyflie"],
  ["fault-tolerant",      "crazyflie"],
  ["fdi",                 "controls expertise"],
  ["multi-robot",         "multi-robot"],
  ["turtlebot",           "multi-robot"],
  ["hungarian",           "multi-robot"],
  ["task alloc",          "multi-robot"],
  ["crop",                "crop weed"],
  ["weed",                "crop weed"],
  ["yolov8",              "yolo"],
  ["yolo",                "yolo"],
  ["drone landing",       "drone landing"],
  ["parrot",              "drone landing"],
  ["mambo",               "drone landing"],
  ["maze",                "maze"],
  ["mycobot",             "maze"],
  ["cobot",               "maze"],
  ["aatram",              "aatram"],
  ["sky speak",           "honeywell"],
  ["skyspeak",            "honeywell"],
  ["honeywell",           "honeywell"],
  ["teaching",            "teaching assistant"],
  ["instructor",          "teaching assistant"],
  ["marut",               "marut"],
  ["ardupilot",           "ardupilot"],
  ["mission planner",     "ardupilot"],
  ["p80",                 "ardupilot"],
  ["ros2",                "ros"],
  ["ros ",                "ros"],
  ["python",              "python"],
  ["simulink",            "matlab"],
  ["matlab",              "matlab"],
  ["opencv",              "opencv"],
  ["gazebo",              "gazebo"],
  ["asu",                 "asu"],
  ["arizona state",       "asu"],
  ["gpa",                 "gpa"],
  ["education",           "education"],
  ["degree",              "education"],
  ["university",          "education"],
  ["certif",              "certification"],
  ["publication",         "publication"],
  ["scada",               "publication"],
  ["paper",               "publication"],
  ["email",               "email"],
  ["contact",             "contact"],
  ["linkedin",            "contact"],
  ["github",              "contact"],
  ["hire",                "hire"],
  ["hiring",              "hire"],
  ["available",           "hire"],
  ["internship",          "hire"],
  ["full time",           "hire"],
  ["full-time",           "hire"],
  ["opportunity",         "hire"],
  ["uav",                 "uav & drone experience"],
  ["drone",               "uav & drone experience"],
  ["flight",              "uav & drone experience"],
  ["controls",            "controls expertise"],
  ["pid",                 "controls expertise"],
  ["lqr",                 "controls expertise"],
  ["resume",              "resume"],
  ["cv",                  "resume"],
  ["different",           "what makes him different"],
  ["stand out",           "what makes him different"],
  ["unique",              "what makes him different"],
  ["special",             "what makes him different"],
  ["best project",        "best projects for robotics roles"],
  ["strongest",           "best projects for robotics roles"],
  ["project",             "best projects for robotics roles"],
  ["hello",               "hello"],
  ["hi",                  "hello"],
  ["hey",                 "hello"],
  ["who is",              "who"],
  ["who are",             "who"],
  ["about saiteja",       "who"],
  ["about him",           "who"],
];

export function getResponse(message: string): string {
  const lower = message.toLowerCase().trim();

  // Exact match
  if (RESPONSES[lower]) return RESPONSES[lower];

  // Keyword match
  for (const [keyword, key] of KEYWORD_MAP) {
    if (lower.includes(keyword) && RESPONSES[key]) {
      return RESPONSES[key];
    }
  }

  return "I can answer questions about Saiteja's **projects**, **experience**, **skills**, **education**, or **how to reach him**. Try asking about a specific project like the Crazyflie, multi-robot system, or crop weed detection!";
}
