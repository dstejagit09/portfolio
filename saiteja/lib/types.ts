/**
 * TypeScript type definitions for the portfolio
 */

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  featured?: boolean;
  year?: number;
}

export interface ExpertiseArea {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface TechnicalSection {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  capabilities?: string[];
  link?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message?: string;
}

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string;
}

export interface NavigationLink {
  id: string;
  label: string;
  href: string;
}

export type ThemeMode = "dark" | "light";

export interface SectionProps {
  id?: string;
  className?: string;
  theme?: ThemeMode;
}
