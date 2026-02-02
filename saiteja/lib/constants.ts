import { Project, ExpertiseArea, TechnicalSection, SocialLink, NavigationLink } from "./types";

/**
 * Site configuration - Updated from Saiteja's Resume
 */
export const SITE_CONFIG = {
  name: "Saiteja Dasari",
  fullName: "Saiteja Venkateshwa Rao Dasari",
  title: "MS Robotics & Autonomous Systems @ ASU",
  tagline: "ENGINEERING AUTONOMOUS SYSTEMS",
  email: "sdasar38@asu.edu",
  phone: "(480) 749-7265",
  location: "Tempe, Arizona",
  linkedin: "https://linkedin.com/in/saiteja-venkateshwa-rao-dasari",
  github: "https://github.com/dstejagit09",
  description: "MS Robotics & Autonomous Systems @ ASU (GPA 3.89) with experience in UAV controls, ROS/ROS2 autonomy, and OpenCV-based perception across simulation and hardware.",
  summary: "Built a multi-robot ROS2 + Gazebo TurtleBot system (Hungarian allocation + A* planning) and developing fault-tolerant Crazyflie control for single-motor failure recovery using FDI and controller reconfiguration.",
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
    description: "Developing a fault-tolerant control system for a Crazyflie quadrotor to maintain stable flight during single-motor failure using fault detection/isolation and controller reconfiguration, validated through simulation-to-hardware testing.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCACJWRwa8lIv-nkb6ekLJq_hHKpTXZQLwVo6icwpdHVvLHX8_UNoDCdNd-OOrrYnm4y2uMhx-tk3ucAEywjzzQx1_AXQZgLNA5PfYeKBmURDX9R7bsZT2U0PrOKMrM_S5mep8MaQOZkdcO5npv-r0dFuarJyVh6BO7A-_EGActEhdiqK7ZzSWBhRuRH3nVh4Omhy02EsE8GY8fxp7pwhwM-W9vOWY5XNtAeG0If0p-9DicOzQnkf2FUVCLrX-ELMaLoK6GQ1SCTs8",
    tags: ["ROS2", "Control Systems", "FDI", "Fault-Tolerant Control"],
    featured: true,
    year: 2025,
    link: SITE_CONFIG.github,
  },
  {
    id: "multi-robot-allocation",
    title: "Multi-Robot Task Allocation",
    subtitle: "ROS2 & Gazebo TurtleBot System",
    description: "Built a multi-robot ROS2 and Gazebo TurtleBot simulation with centralized task management, implementing Hungarian task allocation and A* planning and costmap inflation for collision-aware, efficient concurrent mission execution.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAeYYbykfDZ_jKwwrSpxB5dfqTwQE46XEp5NCfMDIE_4zfjCdecIpUTzqU42wKtIQfkG81fd3PFIe3JAmFp0tek8EPhlN5outhamRYLFMEg15YXX7jSat4dpb6y2XGD_8rGFYmpbqSfUcnE9butwwVU8Z2URL-MsU4UFr48KWZXQH2kotnlXHs0dnUm6CUaGOivtO9OnpnvDUE14yTgn22s512GueWC1A1BkxtZBEWXfHt0zX7vxxlbZRb0zV6sGoaZd5Pid7rlSk8",
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
    description: "Expert in ROS1/ROS2, Gazebo simulation, path planning (A*, Hungarian allocation), costmaps, occupancy grids, and motion planning. Experience with TF, URDF, and autonomous navigation systems.",
    icon: "precision_manufacturing",
  },
  {
    id: "uav-controls",
    title: "UAV & Flight Controls",
    description: "Hands-on experience with ArduPilot, Mission Planner, and PID tuning for drone platforms. Expertise in fault detection/isolation (FDI), controller reconfiguration, and flight log analysis for performance optimization.",
    icon: "flight",
  },
  {
    id: "computer-vision",
    title: "Computer Vision & Perception",
    description: "Skilled in OpenCV-based perception pipelines for object detection, tracking, and segmentation. Experience with real-time inference, vision-based control, and ML model deployment on robotic platforms.",
    icon: "psychology",
  },
  {
    id: "control-systems",
    title: "Control Systems Engineering",
    description: "Proficient in MATLAB/Simulink for control system design, digital twin simulations, PID tuning, and system modeling. Strong foundation in feedback control and state estimation techniques.",
    icon: "settings_suggest",
  },
];

/**
 * All projects from resume
 */
export const SHOWCASE_PROJECTS: Project[] = [
  {
    id: "fault-tolerant-crazyflie",
    title: "Fault-Tolerant Control of Crazyflie Quadrotor",
    description: "Developing a fault-tolerant control system for a Crazyflie quadrotor to maintain stable flight during single-motor failure using fault detection/isolation and controller reconfiguration, validated through simulation-to-hardware testing.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB1cnhTDKLJlVfidS766krsd11d1blNOXoeREPfbkcM6eEFj64ibwf3AyWxxEU7yBl2DHmfZCX1gDQY6GKWkzbqeXJpMHxtybX0ub69iFaA_5dz09_KOTIaUc-Y_pOwrIuFM3ZxxuazFMYCiaH3v2XHvxeDry2QNTfMWuHkV5-hpfOmtB_l9nRVof1IbBIKynb9JFP82xOFKYOYpXTOI3ai5YSL9xvWDMBX0eHjO2PBDqF4Z_GiVWCq0PkuaNmgLT-DeGLKt0jZ2FQ",
    tags: ["FDI", "Controller Reconfiguration", "Crazyflie", "Fault-Tolerant Control"],
    year: 2025,
    featured: true,
    link: SITE_CONFIG.github,
  },
  {
    id: "multi-robot-allocation",
    title: "Multi-Robot Task Allocation & Navigation",
    description: "Built a multi-robot ROS2 and Gazebo TurtleBot simulation with centralized task management, implementing Hungarian task allocation and A* planning and costmap inflation for collision-aware, efficient concurrent mission execution.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAdgo5elJAKo6c3MyTQfSsl4evnSnCszP9inw7kska22BEHKm_bcge4jxip9wTvR4g22wVJhgmNZo-i0s65L5IFqqMwRVG3CrVTaSHNmi6ecNJsps1uW4Qz5SPBWnJ-zdqVkkjgMK0vAU2z9Yh2FkaVrXUIRJDnlMr4Jd4nQG8yFzbYIO5emGfTKO9BPeFRhrnKJWJ8RvD_kKBI-5_TK9dkXzLPb1Smev_rz0yOa8cUkYMMQA0Oz5qYhcVTthLAaQrbLztQbZcxW0E",
    tags: ["ROS2", "Gazebo", "Hungarian Algorithm", "A* Planning", "TurtleBot"],
    year: 2025,
    link: SITE_CONFIG.github,
  },
  {
    id: "crop-weed-detection",
    title: "Crop Weed Detection using ROSMaster X3",
    description: "Deployed an ML weed-vs-crop detector on ROSMaster X3 (ROS) to support precision agriculture. Integrated real-time inference and visualization nodes to publish detections for downstream robot actions.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB1XUokhsorze_kE6sMRLamjNUAvFZlW2Ot4Wdgmt9F6fKZ_hbH_YWhuIvGicOF3nJTxQaLdDmw9iAJTRgDr8Zxh85WFHIvnDLSTUZlOaUI_b3AUbgdfFC_Ul7xSYehnyWJVHgjzlP794SMuRspDkPbMfouQ4rX2xYWUcdZyB8F8M4mvGP4XvVnbJI7H5KRA7529OCJIFvvb9cNT4mIMj3tGDZqNVd_X89kpMA2GAneYcs7e5oIADH2rwTA0P7jcqWDgoveEFTVEWs",
    tags: ["ROS", "Machine Learning", "OpenCV", "Precision Agriculture"],
    year: 2025,
    link: SITE_CONFIG.github,
  },
  {
    id: "autonomous-drone-landing",
    title: "Autonomous Drone Landing on Moving Platform",
    description: "Simulated flight dynamics in MATLAB/Simulink (digital twin) and designed control logic for landing sequences. Implemented onboard vision tracking on a Parrot Mambo to land on a moving color-tagged platform.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBW9nce2yih874_WJyOgWiZyFeAF985jAZdZYGqNbLKae1CTlM6ib-ywQ29O84dguvmTQy3wpyIriepfPor9HwshiVMjl4Dcc09XxcvOlHMDHPgkyJVlWE0eXe8U3uHLhL__MqTFuYIH9_BCF6inHOeNR0T33t-S7Vj-mGOd1BeuiDOes5s4_hCiiZF0KrMH2069kmrOkliO2XmgnIvY0fMAthuYMIvFWckmgZ4MXkE_2oGNPGo1PWMSICX1gI92kZOuuHMU9lKkFo",
    tags: ["MATLAB/Simulink", "Computer Vision", "UAV Control", "Parrot Mambo"],
    year: 2025,
    link: SITE_CONFIG.github,
  },
  {
    id: "maze-solving-cobot",
    title: "Maze Solving & Path Planning using myCobot600",
    description: "Built a vision pipeline for maze detection/segmentation and generated an occupancy-grid representation for planning. Computed paths using A* and executed waypoint trajectories through integrated myCobot600 motion control.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDB80TJOtO7hnllNY-aHeYs7TDbEbD6P58dj1rUvjrZPu49ydwTV8hCRhJGXKU-XVWX-1iIhCIBUsBPzljM3tSe3PuInx6vxu07JeLwprpFFnBUMmYoQsBs1zbAAC7WZCdagNjCWUrW85f5W6sDJwg9kwlvDkarWbspB6GxTV64yXc4jN-ZO1xEXTQsm_tM9j0TwHMbfVYUBkAMzOZc5opqiStRtRUeLll9W6nQVFrynl42yKNRbm6delt4jBxDiGj0OOjWhnNMI9Q",
    tags: ["Computer Vision", "A* Planning", "Robot Arm", "Occupancy Grid"],
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
    description: "Expert in ROS1/ROS2 ecosystems with hands-on experience building multi-robot systems using Gazebo simulation, TF transformations, and URDF modeling. Proficient in implementing path planning algorithms (A*, Hungarian allocation) with costmap-based collision avoidance and occupancy grid representations for safe autonomous navigation.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYeivgu-FiyJBU3d5NkFLKe4PRlRt8KTqZ8VBjy91147Lxq11UI6hBuECCTyE-fuQknXBMca04Uk2C50HgaZ7779fS4PIFVeDNnSkTGE40I_Y6M4VvwU3Tsjr5Q5q1Lf_W8g4XECkTnYR50dlsTaF_vDp6KHFrcyo06ax79IsUiAYDbgwwF0pPJXVhAJ98W-q1oB-cA5rY2ZLusFAfI0Eta6eTUba3snXm5R0qTcDtUB2q4uU1gFT-4IlCR9z6hebh8vBa5XC_lwI",
    capabilities: ["ROS1/ROS2", "Gazebo & RViz", "A* & Hungarian Planning", "TF & URDF"],
    link: SITE_CONFIG.github,
  },
  {
    id: "uav-controls",
    number: "02",
    title: "UAV Control Systems",
    description: "Hands-on experience with ArduPilot and Mission Planner for UAV configuration and deployment. Specialized in PID tuning and flight log analysis to optimize drone performance. Developing fault-tolerant control systems using FDI (Fault Detection & Isolation) and controller reconfiguration for resilient flight operations.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8vgVZRb84WJ1rv8XUZHMDTgZdt5Yb2ZBRw3oq2TuDCupSwe6IxEvimkSZYDzFgk_qdfcTWz-JSxrl5ByY1F-TolC9ayylNyMIcnCF6CqnM_w65CnIrKsBMyAlrXycDtu1G9Ay0ij6r94JKM4lrmwlpt116jZBYdaBrf_HNcAr-zsYtvH5olJtOyw79t_ZAnHHhO19Uunv4HXvRzmZqhf9tf8SGcRBmDG9mY9Ph6ZXe6GrJ_qsv95XpgFz2kpYIUZ7IcZZXJY72Y4",
    capabilities: ["ArduPilot & Mission Planner", "PID Tuning", "FDI Systems", "Flight Log Analysis"],
    link: SITE_CONFIG.github,
  },
  {
    id: "computer-vision",
    number: "03",
    title: "Computer Vision & Perception",
    description: "Proficient in OpenCV-based perception pipelines for object detection, tracking, and segmentation. Experience deploying ML models on embedded robotics platforms (ROSMaster X3) with real-time inference. Built vision systems for autonomous navigation, precision agriculture, and robotic manipulation tasks.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7IPfmaO6yozH75M_3Y41S5gTl2T2fw7CBXhtBBdot2zNsR_gws0zzvZ7fMLXa6-n5k0jf8HXCcLtOj8do_obMSsegTPk_wGi4aiS3j3r-E166QnPj6H2gn2EDQuxp40d7flxY8jSbGkc8Bxgj8aoZ8FP2rtJi3XNom0rtBUXSMqdcm2vfg1LjQ--GrYNOR4qGQ8hq5GIa0gb9MI1lyhpW91Mkd5cv-ZCLn359rbHzy6Xh9vW5XIAjz4WjSiDn48S4CixzV4WZjAs",
    capabilities: ["OpenCV", "Object Detection", "ML Deployment", "Real-time Tracking"],
    link: SITE_CONFIG.github,
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
  title: "BUILDING INTELLIGENT AUTONOMOUS SYSTEMS",
  description: "Currently pursuing MS in Robotics and Autonomous Systems at Arizona State University, with a focus on UAV controls, multi-robot coordination, and fault-tolerant systems.",
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
      period: "Aug. 2020 – 2024",
    },
  },
  image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5Vk0xnRiyEgdT1yzTW6WoYpEEAompfdNOPglfe9WGLih530ZaJzBHo2i3uF92XJqhos_Ux_C0_awObV4GUsgBANf8_J8kDbMaFSAs6NWCIxqY17dXFuKaDH9IZ322SInTqTAHnwmZQbXC5Jx1sRMgxyDy4YGrWLLKr5Fg8J5Oog2GMxpMtXz6YDsjFhJTVc_OBcX2ANu7Lae4dezNDf0i6nFdZ8A0CKHoVm-1XwAlmX4Jr3AND-GmIKBAboYuUjkr3DJe7sMFIaM",
};
