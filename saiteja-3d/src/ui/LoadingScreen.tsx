import { useEffect, useState } from 'react'
import { useProgress } from '@react-three/drei'

/**
 * Full-screen loading bar driven by drei's asset loader. Shows from the start
 * and latches hidden once loading has finished, so it never flickers back.
 */
export function LoadingScreen() {
  const { active, progress } = useProgress()
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!active && progress >= 100) {
      const t = setTimeout(() => setDone(true), 300) // let the bar visually fill
      return () => clearTimeout(t)
    }
  }, [active, progress])

  if (done) return null

  return (
    <div className="hud-loading">
      <div className="hud-loading-inner">
        <div className="hud-loading-label">Loading… {Math.round(progress)}%</div>
        <div className="hud-loading-bar">
          <div className="hud-loading-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  )
}
