import { Suspense, useEffect, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import '../styles/overlay.css'

/**
 * Full-screen section overlay rendered above a dimmed/blurred world. Closes
 * (back to the world at "/") via the close button or the Esc key. The world
 * canvas stays mounted underneath, so the robot keeps its position.
 */
export function SectionOverlay({ children }: { children: ReactNode }) {
  const navigate = useNavigate()

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') navigate('/')
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [navigate])

  return (
    <motion.div
      className="overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.24 }}
    >
      <button className="overlay-close" aria-label="Close" onClick={() => navigate('/')}>
        ✕
      </button>
      <motion.div
        className="overlay-panel"
        initial={{ opacity: 0, y: 26, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 26, scale: 0.98 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <Suspense fallback={<div className="overlay-loading">Loading…</div>}>{children}</Suspense>
      </motion.div>
    </motion.div>
  )
}
