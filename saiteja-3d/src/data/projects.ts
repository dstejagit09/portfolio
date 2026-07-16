import type { Project } from './types'

// Pulled from the live site (saitejadasari.com) source. Images intentionally
// omitted — the CardStack renders an accent gradient fallback for each.
export const projects: Project[] = [
  {
    id: '01-fault-tolerant-crazyflie',
    title: 'Fault-Tolerant Quadrotor Control',
    subtitle: 'Crazyflie 2.1 · MuJoCo · CrazySim SITL',
    dateRange: 'Jan 2026 – May 2026',
    blurb:
      'Closed-form 3-motor allocation derived and validated for all four single-motor failure cases. Identified motor saturation as the root cause of attitude loss; a thrust clamp reduced max roll from 145° to 7.2° on hardware. MuJoCo rigid-body sim built for gyroscopic coupling, with sim-to-real validation across PID, INDI, and gyroscopic-compensation controllers.',
    tags: ['Controls', 'Allocation', 'MuJoCo', 'CrazySim SITL', 'ROS2', 'UAV'],
    metrics: [
      { label: 'Max Roll Reduction', value: '145° → 7.2°' },
      { label: 'Sim Conditions', value: '24 validated' },
      { label: 'Allocation Methods', value: '9 tested' },
    ],
    accent: '#38bdf8',
    links: { repo: 'https://github.com/dstejagit09/CrazyFlie_Fault_Tolerant_Project' },
  },
  {
    id: '02-multi-robot-task-allocation',
    title: 'Multi-Robot Task Allocation',
    subtitle: 'ROS2 · Gazebo · AMCL · Hungarian · A*',
    dateRange: 'Dec 2025',
    blurb:
      "A from-scratch ROS2 warehouse stack for 5 TurtleBot3 robots: hand-written A* planner, inflation costmap, Hungarian assignment, and PD trajectory control, with only Nav2's map server and AMCL off-the-shelf. A dynamic, time-stepped loop re-solves the Hungarian assignment as robots free up, and a path cache keyed on (start, task) makes each robot drive exactly the scored route. ~99% mission success across 5 robots and 8 tasks in Gazebo.",
    tags: ['ROS2', 'Hungarian', 'A*', 'AMCL', 'Costmap', 'Gazebo', 'Autonomy'],
    metrics: [
      { label: 'Robots', value: '5 TurtleBot3' },
      { label: 'Success Rate', value: '99%' },
      { label: 'Tasks', value: '8 dynamic' },
    ],
    accent: '#a78bfa',
    links: { repo: 'https://github.com/dstejagit09/Multi-Robot-Task-Allocation-main' },
  },
  {
    id: '03-crop-weed-detection',
    title: 'Crop Weed Detection',
    subtitle: 'YOLOv8 · OpenCV · ROSMaster X3',
    dateRange: 'May 2025',
    blurb:
      'YOLOv8 model trained on 3000 samples, deployed on ROSMaster X3 at 97% accuracy and 12 FPS. Integrated ROS inference and visualization nodes for real-time robotic decision-making in precision agriculture.',
    tags: ['YOLOv8', 'OpenCV', 'ROS2', 'Computer Vision', 'Edge AI'],
    metrics: [
      { label: 'Accuracy', value: '97%' },
      { label: 'Throughput', value: '12 FPS' },
      { label: 'Dataset', value: '3000 samples' },
    ],
    accent: '#34d399',
  },
  {
    id: '04-autonomous-drone-landing',
    title: 'Autonomous Drone Landing',
    subtitle: 'MATLAB/Simulink · OpenCV · Parrot Mambo',
    dateRange: 'May 2025',
    blurb:
      "Guidance and control logic built in MATLAB and Simulink as a digital twin and validated across 25+ trials. An onboard downward-camera vision-tracking pipeline estimates the landing platform's position relative to the Parrot Mambo, and a closed-loop PID controller lands the drone within 8 cm of a moving platform.",
    tags: ['MATLAB', 'Simulink', 'OpenCV', 'Parrot Mambo', 'PID', 'Vision Tracking'],
    metrics: [
      { label: 'Landing Accuracy', value: '8 cm CEP' },
      { label: 'Sim Trials', value: '25 validated' },
      { label: 'Platform', value: 'Parrot Mambo' },
    ],
    accent: '#fb7185',
    links: { repo: 'https://github.com/dstejagit09/autonomous_drone_landing' },
  },
  {
    id: '05-maze-solver',
    title: 'Maze Solving with myCobot Pro 600',
    subtitle: 'OpenCV · A* · Inverse Kinematics · 6-DOF Arm',
    dateRange: 'Dec 2024',
    blurb:
      'An OpenCV vision pipeline (camera calibration, binary thresholding, perspective crop) converts a maze image into a 34×34 occupancy grid, with walls dilated to enforce a safety margin. A from-scratch A* planner (4-connected, Manhattan heuristic) finds the path, and inverse kinematics solved with a MATLAB RigidBodyTree maps each waypoint to six joint angles, streamed over TCP/IP to drive a physical 6-DOF myCobot Pro 600 arm. Planning-to-execution runs in about 60 s.',
    tags: ['OpenCV', 'A*', 'Inverse Kinematics', 'Arm Robotics', 'Path Planning'],
    metrics: [
      { label: 'Grid', value: '34×34' },
      { label: 'Plan Time', value: '60 s' },
      { label: 'Arm', value: '6-DOF Pro 600' },
    ],
    accent: '#f59e0b',
    links: { repo: 'https://github.com/dstejagit09/Maze-Solving-using-MyCobot600' },
  },
  {
    id: '06-skyspeak-ai',
    title: 'SkySpeak AI',
    subtitle: 'Honeywell Anthem · LLM Agents · Voice Analytics',
    dateRange: 'Aug 2025 – Apr 2026',
    blurb:
      "AI-powered ATC-pilot simulator for Honeywell Aerospace's Anthem ecosystem. Real-time voice pipeline at 300 ms (LiveKit, Deepgram, ElevenLabs) paired with Python voice analytics: YIN pitch, VAD, z-score calibration, and abstention scoring under 0.60. CBTA dashboard surfaces cognitive load and communication competency to instructors.",
    tags: ['LLM Agents', 'Voice Analytics', 'LiveKit', 'Deepgram', 'ElevenLabs', 'React', 'CBTA'],
    metrics: [
      { label: 'Voice Pipeline', value: '300 ms latency' },
      { label: 'Stakeholder Reviews', value: '20+' },
      { label: 'Team Size', value: '3 engineers' },
    ],
    accent: '#60a5fa',
    links: {
      repo: 'https://github.com/dstejagit09/HoneywellAnthem_PilotTraining_Dash',
      live: 'https://honeywell-anthem-pilot-training-sol.vercel.app/',
      detail: 'https://skyspeakai.vercel.app/',
    },
  },
]
