import { Navbar } from "@/components/navigation/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
import { ExpertiseSection } from "@/components/sections/ExpertiseSection";
import { TechnicalSection } from "@/components/sections/TechnicalSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { WorksSection } from "@/components/sections/WorksSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ProjectsShowcase />
      <ExpertiseSection />
      <TechnicalSection />
      <ExperienceSection />
      <AboutSection />
      <WorksSection />
      <ContactSection />
    </>
  );
}
