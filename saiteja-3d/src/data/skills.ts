import type { SkillCategory } from './types'

// Grouped from the resume/live-site skills.
export const skillCategories: SkillCategory[] = [
  {
    id: 'programming',
    label: 'Programming & Tools',
    accent: '#38bdf8',
    skills: ['Python', 'C', 'MATLAB', 'Git', 'Linux', 'Bash'],
  },
  {
    id: 'robotics',
    label: 'Robotics & Simulation',
    accent: '#a78bfa',
    skills: ['ROS1 / ROS2', 'Gazebo', 'RViz', 'MuJoCo', 'CrazySim SITL', 'TF', 'URDF'],
  },
  {
    id: 'controls',
    label: 'Controls / GNC & Test',
    accent: '#34d399',
    skills: [
      'PID',
      'LQR',
      'INDI',
      'MATLAB / Simulink',
      'FDI',
      'Controller Reconfiguration',
      'Flight Log Analysis',
    ],
  },
  {
    id: 'autonomy',
    label: 'Autonomy & Perception',
    accent: '#fb7185',
    skills: [
      'A*',
      'Hungarian Allocation',
      'Costmaps',
      'Occupancy Grid',
      'Motion Planning',
      'OpenCV',
      'YOLOv8',
      'AMCL',
    ],
  },
  {
    id: 'platforms',
    label: 'Flight Platforms',
    accent: '#f59e0b',
    skills: [
      'ArduPilot',
      'Mission Planner',
      'Crazyflie 2.1',
      'Parrot Mambo',
      'TurtleBot3',
      'ROSMaster X3',
      'myCobot Pro 600',
    ],
  },
  {
    id: 'sim2hw',
    label: 'Sim-to-Hardware',
    accent: '#22d3ee',
    skills: ['Sim-to-Real Validation', 'Digital Twin', 'SITL', 'Hardware Bench Testing', 'Edge Deployment'],
  },
]
