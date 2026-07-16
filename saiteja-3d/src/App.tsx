import { lazy, useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Scene } from './world/Scene'
import { HUD } from './ui/HUD'
import { SectionOverlay } from './ui/SectionOverlay'
import { useKeyboardControls } from './controls/useKeyboardControls'
import { useZoneControls } from './controls/useZoneControls'
import { useGameStore } from './store/useGameStore'

// Lazy-load section routes so the initial bundle stays lean (the 3D world loads
// first; section content is fetched on demand). Sections use named exports.
const ProjectsSection = lazy(() =>
  import('./sections/ProjectsSection').then((m) => ({ default: m.ProjectsSection })),
)
const ExperienceSection = lazy(() =>
  import('./sections/ExperienceSection').then((m) => ({ default: m.ExperienceSection })),
)
const EducationSection = lazy(() =>
  import('./sections/EducationSection').then((m) => ({ default: m.EducationSection })),
)
const SkillsSection = lazy(() =>
  import('./sections/SkillsSection').then((m) => ({ default: m.SkillsSection })),
)
const ContactSection = lazy(() =>
  import('./sections/ContactSection').then((m) => ({ default: m.ContactSection })),
)

function App() {
  // Keyboard input lives outside the Canvas (DOM concern).
  useKeyboardControls() // WASD + arrows -> movement
  useZoneControls() // E -> enter nearby zone

  const location = useLocation()
  const navigate = useNavigate()

  // Entering a zone navigates to its route.
  useEffect(() => {
    useGameStore.setState({ enterZone: (z) => navigate(`/${z}`) })
  }, [navigate])

  // Mark the world paused/dimmed whenever a section route is active.
  useEffect(() => {
    useGameStore.getState().setOverlayOpen(location.pathname !== '/')
  }, [location.pathname])

  return (
    <>
      {/* The world stays mounted under every route, so the robot keeps its
          position when a section overlay opens and closes. */}
      <Scene />
      <HUD />

      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={null} />
          <Route
            path="/projects"
            element={
              <SectionOverlay>
                <ProjectsSection />
              </SectionOverlay>
            }
          />
          <Route
            path="/experience"
            element={
              <SectionOverlay>
                <ExperienceSection />
              </SectionOverlay>
            }
          />
          <Route
            path="/education"
            element={
              <SectionOverlay>
                <EducationSection />
              </SectionOverlay>
            }
          />
          <Route
            path="/skills"
            element={
              <SectionOverlay>
                <SkillsSection />
              </SectionOverlay>
            }
          />
          <Route
            path="/contact"
            element={
              <SectionOverlay>
                <ContactSection />
              </SectionOverlay>
            }
          />
          <Route path="*" element={null} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default App
