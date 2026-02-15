import { Navbar } from "@/components/navigation/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { PublicationsSection } from "@/components/sections/PublicationsSection";
import { ExpertiseSection } from "@/components/sections/ExpertiseSection";
import { TechnicalSection } from "@/components/sections/TechnicalSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { WorksSection } from "@/components/sections/WorksSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <EducationSection />
      <PublicationsSection />
      <ExpertiseSection />
      <TechnicalSection />
      <ExperienceSection />
      <WorksSection />
      <ContactSection />
    </>
  );
}
