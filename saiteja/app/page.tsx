import { Navbar } from "@/components/navigation/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { TechnicalSection } from "@/components/sections/TechnicalSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
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
        <TechnicalSection />
        <ExperienceSection />
        <ProjectsShowcase />
        <CredentialsSection />
        <ContactSection />
      </main>

      {/* Fixed Footer */}
      <footer className="fixed bottom-0 w-full flex justify-between items-center px-10 py-3 z-50 bg-surface-container-lowest border-t border-outline-variant/20">
        <div className="text-primary-fixed font-label text-[10px] uppercase tracking-widest">
          VERSION 4.0.2-STABLE | [ SYSTEM: READY ]
        </div>
        <a
          href="mailto:totobotplus@gmail.com"
          className="text-secondary hover:text-primary-fixed font-label text-[10px] uppercase tracking-widest transition-colors duration-150"
        >
          Currently: Open for Opportunities
        </a>
      </footer>

      {/* Color Palette Widget */}
      <ColorPalette />
    </>
  );
}
