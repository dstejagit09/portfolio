import { Navbar } from "@/components/navigation/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { BioSection } from "@/components/sections/BioSection";
import { TechnicalSection } from "@/components/sections/TechnicalSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { NowSection } from "@/components/sections/NowSection";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
import { CredentialsSection } from "@/components/sections/CredentialsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ColorPalette } from "@/components/ui/ColorPalette";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="bg-surface">
        <HeroSection />
        <BioSection />
        <TechnicalSection />
        <ExperienceSection />
        <NowSection />
        <ProjectsShowcase />
        <CredentialsSection />
        <ContactSection />
      </main>

      {/* Fixed Footer */}
      <footer className="fixed bottom-0 w-full flex justify-end sm:justify-between items-center px-4 sm:px-10 py-3 z-50 bg-surface-container-lowest border-t border-outline-variant/20">
        <div className="hidden sm:block text-primary-fixed font-label text-xs uppercase tracking-widest">
          VERSION 4.0.2-STABLE | [ SYSTEM: READY ]
        </div>
        <a
          href="mailto:totobotplus@gmail.com"
          className="text-secondary hover:text-primary-fixed font-label text-xs uppercase tracking-widest transition-colors duration-150"
        >
          Currently: Open for Opportunities
        </a>
      </footer>

      {/* Color Palette Widget */}
      <ColorPalette />
    </>
  );
}
