import type { Certification, Education, Publication } from './types'

// Pulled from the live site (saitejadasari.com) source.
export const education: Education[] = [
  {
    id: 'ms-asu',
    school: 'Arizona State University',
    degree: 'M.S. Robotics & Autonomous Systems',
    dateRange: 'Aug 2024 – May 2026',
    gpa: '3.93 / 4.0',
    location: 'Tempe, AZ',
    coursework: [
      'Systems Engineering',
      'Aerial Robotics',
      'Mechatronics',
      'Multi-Robot Systems',
      'Soft Robotics',
    ],
    accent: '#38bdf8',
  },
  {
    id: 'be-cbit',
    school: 'Chaitanya Bharathi Institute of Technology',
    degree: 'B.E. Electrical & Electronics Engineering',
    dateRange: 'Aug 2020 – 2024',
    gpa: '6.9 / 10',
    location: 'Hyderabad, India',
    coursework: [
      'Embedded Systems',
      'Digital Electronics',
      'Power Systems',
      'Power Electronics',
    ],
    accent: '#a78bfa',
  },
]

export const certifications: Certification[] = [
  {
    id: 'hf-rl',
    name: 'Deep Reinforcement Learning',
    org: 'Hugging Face',
    area: 'Reinforcement Learning',
  },
  {
    id: 'udemy-ros',
    name: 'ROS / ROS2 for Beginners',
    org: 'Udemy',
    area: 'Robotics Middleware',
  },
]

export const publications: Publication[] = [
  {
    id: 'scada-substation',
    title: 'SCADA-Based Substation Control Panel & Operations',
    org: 'Technical Report',
    year: 2024,
    link: 'https://drive.google.com/file/d/1Qwj3ca2g2XpTMZeiqUhrv-E_H1pE_LTh/view',
  },
]
