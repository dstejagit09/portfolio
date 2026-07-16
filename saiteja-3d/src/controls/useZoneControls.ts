import { useEffect } from 'react'
import { useGameStore } from '../store/useGameStore'

/**
 * Pressing E enters the zone the robot is currently near (if any). Reads the
 * store imperatively so it doesn't need to re-subscribe on every proximity
 * change.
 */
export function useZoneControls(): void {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code !== 'KeyE') return
      const { nearbyZone, enterZone } = useGameStore.getState()
      if (nearbyZone) enterZone(nearbyZone)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])
}
