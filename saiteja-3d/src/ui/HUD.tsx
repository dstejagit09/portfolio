import '../styles/hud.css'
import { HamburgerMenu } from './HamburgerMenu'
import { ResumeButton } from './ResumeButton'
import { LoadingScreen } from './LoadingScreen'
import { QualityPanel } from './QualityPanel'

/** All DOM overlays that sit above the 3D canvas. The proximity hint now lives
 *  on the 3D signpost (see world/Signpost.tsx), not here. */
export function HUD() {
  return (
    <div className="hud">
      <HamburgerMenu />
      <ResumeButton />
      <QualityPanel />
      <LoadingScreen />
    </div>
  )
}
