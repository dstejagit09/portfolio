import { Project, ExpertiseArea, TechnicalSection, SocialLink, NavigationLink } from "./types";

/**
 * Site configuration - Updated from Saiteja's Resume
 */
export const SITE_CONFIG = {
  name: "Saiteja Dasari",
  fullName: "Saiteja Venkateshwa Rao Dasari",
  title: "MS @ Arizona State University",
  tagline: "ROBOTICS ENGINEER",
  email: "totobotplus@gmail.com",
  phone: "(480) 749-7265",
  location: "Tempe, Arizona",
  linkedin: "https://linkedin.com/in/saiteja-venkateshwa-rao-dasari",
  github: "https://github.com/dstejagit09",
  description: "I build autonomous robots using ROS2, design drone control systems, and deploy computer vision on real hardware.",
  summary: "Built multi-robot systems with ROS2 and Gazebo. Currently developing fault-tolerant drone control for motor failure recovery.",
};

/**
 * Navigation links
 */
export const NAV_LINKS: NavigationLink[] = [
  { id: "home", label: "Home", href: "#home" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "contact", label: "Contact", href: "#contact" },
];

/**
 * Featured projects from resume
 */
export const FEATURED_PROJECTS: Project[] = [
  {
    id: "fault-tolerant-crazyflie",
    title: "Fault-Tolerant Control",
    subtitle: "Crazyflie Quadrotor",
    description: "Building a control system that keeps a Crazyflie drone flying even when one motor fails. Uses fault detection to identify failures and reconfigures controllers to compensate.",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80",
    tags: ["ROS2", "Control Systems", "FDI", "Crazyflie"],
    featured: true,
    year: 2025,
    link: SITE_CONFIG.github,
  },
  {
    id: "multi-robot-allocation",
    title: "Multi-Robot Task Allocation",
    subtitle: "ROS2 & Gazebo TurtleBot System",
    description: "Built a system where multiple TurtleBots coordinate tasks in Gazebo. Uses Hungarian algorithm to assign tasks and A* for path planning with collision avoidance.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
    tags: ["ROS2", "Gazebo", "Hungarian Algorithm", "A* Planning"],
    featured: true,
    year: 2025,
    link: SITE_CONFIG.github,
  },
];

/**
 * Expertise areas from resume skills
 */
export const EXPERTISE_AREAS: ExpertiseArea[] = [
  {
    id: "robotics-autonomy",
    title: "Robotics & Autonomy",
    description: "ROS1/ROS2 development, Gazebo simulation, and path planning with A* and Hungarian algorithms. Built multi-robot coordination systems with collision avoidance.",
    icon: "precision_manufacturing",
  },
  {
    id: "uav-controls",
    title: "UAV & Flight Controls",
    description: "ArduPilot configuration, PID tuning, and flight log analysis. Improved drone flight performance by 5% through tuning at Marut Drones.",
    icon: "flight",
  },
  {
    id: "computer-vision",
    title: "Computer Vision",
    description: "OpenCV-based detection and tracking. Deployed ML models on ROSMaster X3 for real-time weed detection in agriculture.",
    icon: "psychology",
  },
  {
    id: "control-systems",
    title: "Control Systems",
    description: "MATLAB/Simulink modeling and simulation. Designed control logic for autonomous drone landing on moving platforms.",
    icon: "settings_suggest",
  },
];

/**
 * All projects from resume
 */
export const SHOWCASE_PROJECTS: Project[] = [
  {
    id: "fault-tolerant-crazyflie",
    title: "Fault-Tolerant Crazyflie Control",
    description: "Building a control system that keeps a Crazyflie drone flying even when one motor fails. Uses fault detection to identify failures and reconfigures controllers to compensate.",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80",
    tags: ["FDI", "Controller Reconfiguration", "Crazyflie"],
    year: 2025,
    featured: true,
    link: SITE_CONFIG.github,
  },
  {
    id: "multi-robot-allocation",
    title: "Multi-Robot Task Allocation",
    description: "Built a system where multiple TurtleBots coordinate tasks in Gazebo. Uses Hungarian algorithm to assign tasks and A* for path planning with collision avoidance.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
    tags: ["ROS2", "Gazebo", "Hungarian Algorithm", "A* Planning"],
    year: 2025,
    link: SITE_CONFIG.github,
  },
  {
    id: "crop-weed-detection",
    title: "Crop Weed Detection",
    description: "Deployed an ML model on ROSMaster X3 that detects weeds vs crops in real-time. The robot can identify which plants to remove for precision farming.",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80",
    tags: ["ROS", "Machine Learning", "OpenCV", "Agriculture"],
    year: 2025,
    link: SITE_CONFIG.github,
  },
  {
    id: "autonomous-drone-landing",
    title: "Autonomous Landing on Moving Platform",
    description: "Built a drone that lands on a moving target. Used MATLAB/Simulink for simulation and a Parrot Mambo with onboard camera to track and land on a color-tagged platform.",
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&q=80",
    tags: ["MATLAB/Simulink", "Computer Vision", "UAV Control"],
    year: 2025,
    link: SITE_CONFIG.github,
  },
  {
    id: "maze-solving-cobot",
    title: "Maze Solving with Robot Arm",
    description: "Used a camera to detect a maze, built a map from it, found the path with A*, and had a myCobot600 robot arm trace the solution.",
    image: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=800&q=80",
    tags: ["Computer Vision", "A* Planning", "Robot Arm"],
    year: 2024,
    link: SITE_CONFIG.github,
  },
];

/**
 * Experience from resume
 */
export const EXPERIENCE = [
  {
    id: "honeywell",
    role: "Honeywell Extern",
    company: "Arizona State University Collaborative Research Project",
    location: "Tempe, AZ",
    period: "Aug. 2025 – Present",
    description: "Built an AI-driven Air Traffic Controller training dashboard with Honeywell Aerospace, integrating LLM-based pilot simulations, communication analytics, and performance visualizations.",
    achievements: [
      "Integrated LLM-based pilot simulations",
      "Built communication analytics dashboard",
      "Developed performance visualization tools",
    ],
  },
  {
    id: "teaching-assistant",
    role: "Teaching Assistant / Instructional Aide",
    company: "Arizona State University",
    location: "Tempe, AZ",
    period: "Jan. 2025 – Present",
    description: "Conducted weekly office hours for MATLAB programming and controls labs; assisted grading and delivered review lectures to reinforce core concepts.",
    achievements: [
      "Conducted weekly MATLAB office hours",
      "Supported controls and systems lab",
      "Delivered review lectures",
    ],
  },
  {
    id: "marut-drones",
    role: "Production Engineering Intern",
    company: "Marut Drones (IIIT-Hyderabad)",
    location: "Hyderabad, Telangana",
    period: "Oct. 2023 – Mar. 2024",
    description: "Assembled and validated electronic/mechanical subsystems across multiple drone platforms; led quality checks and bench testing for reliable builds.",
    achievements: [
      "Increased production efficiency by 2%",
      "Configured ArduPilot/Mission Planner for P80 heavy-payload drone",
      "Improved flight performance by 5% via PID tuning",
    ],
  },
];

/**
 * Technical sections
 */
export const TECHNICAL_SECTIONS: TechnicalSection[] = [
  {
    id: "robotics-autonomy",
    number: "01",
    title: "Robotics & Autonomous Systems",
    description: "Built multi-robot systems in ROS2 with Gazebo simulation. Implemented A* path planning and Hungarian task allocation for coordinated robot navigation with collision avoidance.",
    image: "https://images.unsplash.com/photo-1518314916381-77a37c2a49ae?w=800&q=80",
    capabilities: ["ROS1/ROS2", "Gazebo & RViz", "A* & Hungarian Planning", "TF & URDF"],
    link: SITE_CONFIG.github,
  },
  {
    id: "uav-controls",
    number: "02",
    title: "UAV Control Systems",
    description: "Configured drones with ArduPilot and Mission Planner. Tuned PID controllers to improve flight performance by 5%. Currently developing fault-tolerant control for motor failure recovery.",
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&q=80",
    capabilities: ["ArduPilot & Mission Planner", "PID Tuning", "FDI Systems", "Flight Log Analysis"],
    link: SITE_CONFIG.github,
  },
  {
    id: "computer-vision",
    number: "03",
    title: "Computer Vision",
    description: "Built OpenCV detection and tracking systems. Deployed ML models on ROSMaster X3 for real-time crop/weed classification in agricultural robotics.",
    image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&q=80",
    capabilities: ["OpenCV", "Object Detection", "ML Deployment", "Real-time Tracking"],
    link: SITE_CONFIG.github,
  },
];

/**
 * Publications
 */
export const PUBLICATIONS = [
  {
    id: "scada-substation",
    title: "SCADA-Based Substation Control Panel & Operations",
    year: 2024,
    link: "https://drive.google.com/file/d/1Qwj3ca2g2XpTMZeiqUhrv-E_H1pE_LTh/view",
  },
];

/**
 * Social links
 */
export const SOCIAL_LINKS: SocialLink[] = [
  { id: "linkedin", name: "LinkedIn", url: SITE_CONFIG.linkedin, icon: "linkedin" },
  { id: "github", name: "GitHub", url: SITE_CONFIG.github, icon: "github" },
  { id: "email", name: "Email", url: `mailto:${SITE_CONFIG.email}`, icon: "email" },
];

/**
 * Skills from resume
 */
export const SKILLS = {
  programming: ["C", "Python", "MATLAB"],
  robotics: ["ROS1/ROS2", "Gazebo", "RViz", "TF", "URDF", "Linux", "Git", "ArduPilot", "Mission Planner"],
  autonomy: ["A*", "Hungarian Allocation", "Costmaps", "Occupancy Grid", "Motion Planning", "OpenCV", "Detection/Tracking"],
  controls: ["PID Tuning", "MATLAB/Simulink", "FDI", "Controller Reconfiguration", "Flight Log Analysis"],
  certifications: ["Hugging Face RL", "Udemy ROS/ROS2"],
};

/**
 * About section content
 */
export const ABOUT_CONTENT = {
  title: "MS ROBOTICS AT ASU",
  description: "Studying Robotics at Arizona State University. Working on drone controls, multi-robot coordination, and computer vision.",
  education: {
    masters: {
      degree: "M.S. Robotics and Autonomous Systems",
      school: "Arizona State University",
      gpa: "3.89",
      period: "Aug. 2024 – 2026",
      coursework: ["Systems Engineering", "Aerial Robotics", "Mechatronics", "Multi-Robot Systems", "Soft Robotics"],
    },
    bachelors: {
      degree: "B.E. Electrical and Electronics Engineering",
      school: "Chaitanya Bharathi Institute of Technology",
      gpa: "6.9",
      period: "Aug. 2020 – 2024",
      coursework: ["Embedded Systems", "Digital Electronics", "Power Systems", "Power Electronics"],
    },
  },
  image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
};
