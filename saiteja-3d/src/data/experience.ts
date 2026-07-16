import type { Experience } from './types'

// Pulled from the live site (saitejadasari.com) source.
export const experience: Experience[] = [
  {
    id: 'honeywell',
    role: 'Honeywell Extern',
    org: 'ASU × Honeywell Aerospace — Collaborative Research',
    dateRange: 'Aug 2025 – Present',
    type: 'Externship',
    blurb:
      'Built an AI-driven Air Traffic Controller training dashboard with Honeywell Aerospace, integrating LLM-based pilot simulations, real-time communication analytics, and performance visualizations.',
    tags: ['LLM Agents', 'Voice Analytics', 'Dashboard', 'Honeywell Anthem'],
    location: 'Tempe, AZ',
    live: 'https://honeywell-anthem-pilot-training-sol.vercel.app/',
    accent: '#60a5fa',
  },
  {
    id: 'teaching-assistant',
    role: 'Teaching Assistant / Instructional Aide',
    org: 'Arizona State University',
    dateRange: 'Jan 2025 – Present',
    type: 'Teaching',
    blurb:
      'Ran weekly office hours for MATLAB programming and controls labs, supported grading, and delivered review lectures to reinforce core systems and controls concepts.',
    tags: ['MATLAB', 'Controls', 'Lab Support', 'Review Lectures'],
    location: 'Tempe, AZ',
    accent: '#34d399',
  },
  {
    id: 'marut-drones',
    role: 'Production Engineering Intern',
    org: 'Marut Drones (IIIT-Hyderabad)',
    dateRange: 'Oct 2023 – Mar 2024',
    type: 'Internship',
    blurb:
      'Assembled and validated electronic/mechanical subsystems across multiple drone platforms; led quality checks and bench testing. Configured ArduPilot/Mission Planner for the P80 heavy-payload drone and improved flight performance ~5% via PID tuning.',
    tags: ['ArduPilot', 'Mission Planner', 'PID Tuning', 'Bench Testing'],
    location: 'Hyderabad, India',
    accent: '#f59e0b',
  },
]
