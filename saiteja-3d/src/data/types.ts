// PLACEHOLDER shapes for the app. Extend/replace with your own data types.

export type ProfileLinks = {
  github: string
  linkedin: string
  /** mailto: or contact page URL */
  contact: string
  /** path/URL to the resume PDF */
  resume: string
  /** scheduling link (Calendly / cal.com); optional */
  calendly?: string
}

export type Profile = {
  name: string
  title: string
  email: string
  location: string
  links: ProfileLinks
}

export type ProjectMetric = {
  label: string
  value: string
}

export type ProjectLinks = {
  /** source repo */
  repo?: string
  /** live/deployed demo */
  live?: string
  /** deeper write-up / detail page */
  detail?: string
}

export type Project = {
  id: string
  title: string
  subtitle?: string
  /** e.g. "Jan 2026 – May 2026" */
  dateRange: string
  /** short paragraph shown on the card */
  blurb: string
  tags: string[]
  metrics: ProjectMetric[]
  /** optional image; the card shows a gradient fallback when missing/404 */
  image?: string
  /** accent color used for the gradient fallback + chrome */
  accent?: string
  links?: ProjectLinks
}

export type Experience = {
  id: string
  role: string
  org: string
  /** e.g. "Aug 2025 – Present" */
  dateRange: string
  /** short badge, e.g. "Externship" / "Teaching" / "Internship" */
  type: string
  blurb: string
  tags: string[]
  location?: string
  /** optional live/demo link */
  live?: string
  accent?: string
}

export type Education = {
  id: string
  school: string
  degree: string
  dateRange: string
  gpa?: string
  location?: string
  coursework: string[]
  accent?: string
}

export type SkillCategory = {
  id: string
  label: string
  /** accent color for this category's pills */
  accent: string
  skills: string[]
}

export type Certification = {
  id: string
  name: string
  org: string
  area: string
}

export type Publication = {
  id: string
  title: string
  /** venue/publisher, shown as small print */
  org?: string
  year?: number
  link: string
}
