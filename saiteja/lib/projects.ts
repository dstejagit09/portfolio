export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectSection {
  heading: string;
  body: string;
}

export interface Project {
  index: string;
  slug: string;
  title: string;
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
  overview: string;
  sections: ProjectSection[];
  tools: string[];
  outcomes: string[];
  videoFile: string; // e.g. "/videos/01-fault-tolerant-crazyflie.mp4"
}

export const PROJECTS: Project[] = [
  {
    index: "001",
    slug: "01-fault-tolerant-crazyflie",
    title: "Fault-Tolerant Crazyflie",
    period: "Jan 2026 — Present",
    status: "ACTIVE",
    tags: ["Controls", "ROS2", "FDI", "UAV", "Hardware"],
    metrics: [
      { label: "FDI Recovery",  value: "<50ms" },
      { label: "Platform",      value: "Crazyflie 2.1" },
      { label: "Validation",    value: "ROS2 Sim & Hardware" },
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
    overview:
      "This project builds a complete fault-tolerant flight control stack for the Crazyflie 2.1 nano-quadrotor. The goal is to detect motor failures in real time and reconfigure the controller within 50 ms to maintain stable flight — enabling safe recovery from single-motor failures without human intervention.",
    sections: [
      {
        heading: "Problem Statement",
        body: "Small UAVs like the Crazyflie 2.1 are highly susceptible to motor failures due to their thin winding and lightweight design. A single motor dropout causes immediate yaw divergence and altitude loss. Standard PID controllers have no mechanism to adapt — the craft simply crashes. This project addresses that gap by adding a Fault Detection and Isolation (FDI) layer and a reconfigurable controller that adjusts control allocation on the fly.",
      },
      {
        heading: "System Architecture",
        body: "The stack runs as a ROS2 node graph. A dedicated FDI node subscribes to motor telemetry (PWM commands vs. estimated thrust) and runs a residual-based detector. When a fault is confirmed, it publishes a FaultEvent message containing the failed motor ID and severity estimate. The controller node consumes this and switches to a pre-computed reconfigured control allocation matrix that distributes wrench commands across the three remaining motors while maintaining attitude control authority.",
      },
      {
        heading: "Fault Detection & Isolation",
        body: "The FDI module uses a model-based residual approach. An analytical model of each motor's thrust-to-PWM curve is maintained. The residual — the difference between expected and measured thrust — is passed through a CUSUM detector tuned for a 50 ms detection latency. Once the residual crosses the threshold for two consecutive samples, a fault is declared. This approach avoids false positives due to transient electrical noise while meeting the tight latency requirement.",
      },
      {
        heading: "Controller Reconfiguration",
        body: "On fault detection, the allocation matrix switches from the nominal 4×4 mapping to a 3×4 reduced mapping derived offline via constrained optimization. The reconfigured matrix is preloaded at startup so the switch is instantaneous. Post-reconfiguration, the controller operates in a yaw-degraded mode — yaw authority is reduced but roll and pitch remain fully controllable, enabling safe descent and landing.",
      },
      {
        heading: "ROS2 Test Harness",
        body: "A custom ROS2 test harness was built to validate the stack without risking hardware. It replays log files from previous flight sessions and injects synthetic faults at configurable timestamps. Automated flight scenarios (hover hold, yaw sweep, fault injection at t=5s) run through a CI-style pipeline that checks stability bounds against recorded ground truth. This enables regression testing every time the FDI parameters are tuned.",
      },
    ],
    tools: [
      "ROS2 (Humble)", "Python 3.11", "Crazyflie 2.1", "cflib",
      "MATLAB/Simulink", "Gazebo", "TF2", "NumPy", "SciPy",
    ],
    outcomes: [
      "FDI detection latency under 50 ms on hardware",
      "Stable hover maintained post-reconfiguration in all 12 hardware trials",
      "Automated ROS2 test harness covering 4 flight scenarios",
      "Zero false-positive fault detections in 30 minutes of nominal flight logs",
    ],
    videoFile: "/videos/01-fault-tolerant-crazyflie.mp4",
  },
  {
    index: "002",
    slug: "02-multi-robot-task-allocation",
    title: "Multi-Robot Task Allocation",
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
    overview:
      "A centralized multi-robot coordination system for 5 TurtleBot3 Burgers operating in a shared Gazebo environment. The system assigns inspection tasks optimally using the Hungarian algorithm and navigates each robot to its target using A* on a shared occupancy costmap, achieving 99% mission completion across 10 diverse scenarios.",
    sections: [
      {
        heading: "Problem Statement",
        body: "Multi-robot systems face two fundamental challenges: who goes where (task allocation) and how to get there without collisions (motion planning). Naive round-robin assignment wastes travel time, while decentralized planners often deadlock. This project implements a centralized coordinator that solves both problems globally — minimizing total travel distance while ensuring collision-free navigation.",
      },
      {
        heading: "Task Allocation — Hungarian Algorithm",
        body: "Given N robots and M tasks, the system builds an N×M cost matrix where each entry is the Euclidean distance from robot i to task j. The Hungarian algorithm solves the linear assignment problem in O(N³) time, yielding the globally optimal assignment that minimizes total travel. When tasks arrive dynamically mid-mission, the allocator re-runs with remaining robots and unstarted tasks only.",
      },
      {
        heading: "Motion Planning — A* on Costmap",
        body: "Each assigned robot plans a path using A* on a 0.05 m/cell occupancy costmap. The costmap inflates obstacle boundaries by the robot radius plus a safety margin, ensuring paths are inherently collision-safe with static obstacles. Paths are published as Nav2 goal sequences, with the TurtleBot's built-in DWB controller handling local trajectory following.",
      },
      {
        heading: "Collision Avoidance Between Robots",
        body: "Dynamic collision avoidance between robots is handled by a priority-based reservation scheme. When two robots' planned paths share a cell within a 2 s time window, the lower-priority robot replans with the other's trajectory added as a dynamic obstacle. This avoids deadlocks without requiring full multi-agent path planning.",
      },
      {
        heading: "Validation",
        body: "Ten scenarios were designed with increasing complexity: single-row tasks, scattered tasks, narrow corridors, dynamic arrivals, and simultaneous starts. Each scenario ran 5 times. Mission success (all tasks completed, no collisions) was achieved in 99 of 100 runs. The single failure was a localization drift event unrelated to the planner.",
      },
    ],
    tools: [
      "ROS2 (Humble)", "Python 3.11", "TurtleBot3", "Gazebo",
      "Nav2", "A*", "Hungarian Algorithm", "costmap_2d", "TF2",
    ],
    outcomes: [
      "99% mission success rate across 10 scenarios and 100 total runs",
      "Optimal task assignment in under 3 ms for 5 robots and 8 tasks",
      "Zero deadlocks across all validated scenarios",
      "Supports dynamic task arrivals mid-mission without replanning full fleet",
    ],
    videoFile: "/videos/02-multi-robot-task-allocation.mp4",
  },
  {
    index: "003",
    slug: "03-crop-weed-detection",
    title: "Crop Weed Detection",
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
    overview:
      "A real-time precision agriculture system that detects crop weeds from onboard camera feed using a fine-tuned YOLOv8 model. Deployed on the ROSMaster X3 ground robot, it runs inference at 12 FPS with 97% accuracy and publishes detection events as ROS2 topics for downstream actuation.",
    sections: [
      {
        heading: "Problem Statement",
        body: "Manual weed identification and removal is labor-intensive and imprecise. Herbicide over-application damages crops and the environment. This project targets autonomous weed detection aboard a ground robot navigating crop rows — enabling precise, per-plant interventions. The key constraint is edge deployment: the model must run at acceptable frame rates on an embedded ARM processor without a dedicated GPU.",
      },
      {
        heading: "Dataset & Training",
        body: "A custom dataset of 3000 labeled images was assembled from the CropWeed Field Image Dataset and augmented with brightness jitter, random crop, and horizontal flip to improve robustness to lighting and field conditions. YOLOv8-nano was chosen for edge deployment. Fine-tuning ran for 100 epochs on an NVIDIA GPU, reaching 97% mAP@0.5 on the held-out test split.",
      },
      {
        heading: "ROS2 Integration",
        body: "The inference pipeline was wrapped as a ROS2 lifecycle node subscribing to the robot's camera topic (/camera/rgb/image_raw). Each frame is preprocessed (resize to 640×640, normalize) and passed to the ONNX-exported model. Detections are published as a custom DetectionArray message containing bounding boxes, class IDs, and confidence scores. A second visualization node overlays detections onto the raw feed for operator monitoring.",
      },
      {
        heading: "Edge Deployment on ROSMaster X3",
        body: "The ROSMaster X3 runs a Rockchip RK3588S SoC. The YOLOv8-nano ONNX model was quantized to INT8 and executed via the RKNN SDK, achieving 12 FPS — sufficient for row-speed robot navigation. CPU and memory usage stay within 60% headroom, leaving resources for navigation and communication stacks.",
      },
      {
        heading: "Downstream Actuation",
        body: "Detection events trigger a ROS2 action server that logs GPS coordinates (via GNSS fusion) of each weed position. In the full system concept, this feeds a sprayer controller for targeted herbicide application. The current implementation outputs a CSV weed map for post-mission analysis, with the actuation interface stubbed for hardware integration.",
      },
    ],
    tools: [
      "YOLOv8", "Python 3.11", "OpenCV", "ROS2 (Humble)",
      "ROSMaster X3", "ONNX", "RKNN SDK", "PyTorch", "NumPy",
    ],
    outcomes: [
      "97% mAP@0.5 on held-out test set of 600 images",
      "12 FPS real-time inference on ROSMaster X3 ARM processor",
      "Full ROS2 pipeline from camera feed to weed map output",
      "INT8 quantization reducing model size by 4× vs float32",
    ],
    videoFile: "/videos/03-crop-weed-detection.mp4",
  },
  {
    index: "004",
    slug: "04-autonomous-drone-landing",
    title: "Autonomous Drone Landing",
    period: "May 2025",
    status: "COMPLETE",
    tags: ["Controls", "MATLAB", "Vision", "PID", "Parrot Mambo", "Simulink"],
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
    overview:
      "A vision-based autonomous landing system for the Parrot Mambo mini-drone. A downward-facing camera detects an ArUco marker on the landing platform. A PID guidance law closes the loop on the marker's image-plane position error, commanding velocity inputs to the drone until touchdown within 8 cm circular error probable (CEP).",
    sections: [
      {
        heading: "Problem Statement",
        body: "Precision landing on designated pads is critical for drone logistics and autonomous recharging. GPS provides meter-level accuracy — insufficient for small landing pads. Vision-based landing using onboard cameras can reach centimeter-level precision. The challenge is designing a guidance law that is robust to marker partial occlusion, varying altitude, and aerodynamic disturbances near ground effect.",
      },
      {
        heading: "Digital Twin in MATLAB/Simulink",
        body: "The complete system — drone dynamics, camera model, image processing pipeline, and PID controller — was implemented as a Simulink model. The drone is modeled as a rigid body with aerodynamic drag and rotor thrust. Ground effect is approximated with an altitude-dependent thrust boost factor. 25 Monte Carlo trials with randomized wind disturbances and marker offsets validated the guidance law before hardware deployment.",
      },
      {
        heading: "Vision Pipeline — ArUco Detection",
        body: "The Parrot Mambo's downward camera streams frames at 30 FPS. OpenCV's ArUco detector locates the 6×6 marker and estimates its pose relative to the camera using solvePnP. The image-plane centroid error (pixels from frame center) and altitude estimate from the onboard barometer are fused to compute a 3D position error in the drone body frame.",
      },
      {
        heading: "PID Guidance Law",
        body: "Three independent PID loops control x, y (horizontal position) and z (altitude) separately. The horizontal PIDs act on image-plane error scaled by altitude — as the drone descends, the same pixel error corresponds to smaller physical displacement, so the gain is altitude-adaptive. The altitude PID commands descent rate, decelerating as the drone approaches the pad to ensure gentle contact.",
      },
      {
        heading: "Hardware Results",
        body: "On the Parrot Mambo, the system achieves an 8 cm CEP across 10 hardware landing trials from 1.5 m starting altitude. The controller handles marker partial occlusion up to 40% without loss of lock. Ground effect is compensated within 0.3 m altitude, preventing hover instability during final approach.",
      },
    ],
    tools: [
      "MATLAB R2024a", "Simulink", "Python 3.11", "OpenCV",
      "Parrot Mambo", "ArUco", "PID Control", "solvePnP",
    ],
    outcomes: [
      "8 cm CEP on hardware across 10 landing trials",
      "25 successful Simulink simulation trials with wind disturbances",
      "Altitude-adaptive PID gain scheduling for robust descent",
      "Marker tracking maintained through 40% occlusion",
    ],
    videoFile: "/videos/04-autonomous-drone-landing.mp4",
  },
  {
    index: "005",
    slug: "05-maze-solver",
    title: "Maze Solving with myCobot600",
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
    overview:
      "An end-to-end robotic maze-solving system using the myCobot600 6-DOF collaborative arm. A camera-based perception pipeline converts a physical maze into an 8×8 occupancy grid using ArUco markers for homography correction. A* finds the optimal path, and inverse kinematics translates each grid waypoint to joint angles executed by the arm.",
    sections: [
      {
        heading: "Problem Statement",
        body: "Robotic manipulation in structured environments (such as pick-and-place in factory layouts) requires accurate workspace mapping and collision-free path planning. This project treats a physical maze as an abstraction of such environments — the robot must autonomously perceive the layout, plan a route, and execute it without collision with walls, all in a single uninterrupted run.",
      },
      {
        heading: "Perception — Maze to Occupancy Grid",
        body: "Two ArUco markers (IDs 0 and 1) are placed at the top-left and top-right corners of the maze. OpenCV's ArUco detector localizes them in the camera frame. A homography transform is computed to warp the maze image to a top-down orthographic view. Adaptive thresholding then binarizes the warped image, and the 8×8 cell grid is overlaid to classify each cell as free or occupied.",
      },
      {
        heading: "Path Planning — A* Search",
        body: "A* with Manhattan distance heuristic searches the 8×8 grid from start cell to goal cell. The algorithm finds the optimal path in under 5 ms for all 64-cell configurations tested. The path is represented as a sequence of (row, col) waypoints, which are then mapped to physical coordinates in the maze frame using the inverse homography.",
      },
      {
        heading: "Inverse Kinematics & Arm Execution",
        body: "Each physical waypoint is transformed to the robot's base frame. The myCobot600 Python SDK's built-in IK solver computes the joint angles for each waypoint. The arm moves sequentially through the path, pausing at each waypoint to confirm position before advancing. The end effector traces a horizontal plane approximately 2 cm above the maze surface throughout the trajectory.",
      },
      {
        heading: "Results & Applicability",
        body: "The system solves the maze from perception to execution in approximately 60 s total (5 s perception, <1 s planning, ~54 s arm motion). The solution is 100% correct for all maze configurations tested. The perception-to-plan-to-execute pipeline generalizes directly to structured pick-and-place tasks where item layout can be represented on a grid.",
      },
    ],
    tools: [
      "Python 3.11", "OpenCV", "ArUco", "myCobot600",
      "A* Search", "NumPy", "Homography", "Inverse Kinematics",
    ],
    outcomes: [
      "100% correct maze solutions across all tested configurations",
      "Full pipeline from camera frame to arm execution in 60 s",
      "Robust homography correction using 2 ArUco reference markers",
      "Generalizable to structured pick-and-place manufacturing tasks",
    ],
    videoFile: "/videos/05-maze-solver.mp4",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
