import { useRef, type RefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { ZONES, FOLDER_PROX, type ZoneId } from './zones'
import { FolderZone } from './FolderZone'
import { useGameStore } from '../store/useGameStore'

/**
 * Renders the four folder zones and, each frame, figures out which one (if any)
 * the robot is close enough to enter, writing that into the store on change.
 */
export function ZoneField({ robotRef }: { robotRef: RefObject<THREE.Group | null> }) {
  const nearbyZone = useGameStore((s) => s.nearbyZone)
  const setNearbyZone = useGameStore((s) => s.setNearbyZone)
  const enterZone = useGameStore((s) => s.enterZone)
  const lastNearby = useRef<ZoneId | null>(null)

  useFrame(() => {
    const r = robotRef.current
    if (!r) return

    let found: ZoneId | null = null
    let best = FOLDER_PROX
    for (const zone of ZONES) {
      const d = Math.hypot(r.position.x - zone.pos[0], r.position.z - zone.pos[2])
      if (d < best) {
        best = d
        found = zone.key
      }
    }

    if (found !== lastNearby.current) {
      lastNearby.current = found
      setNearbyZone(found)
    }
  })

  return (
    <>
      {ZONES.map((zone) => (
        <FolderZone
          key={zone.key}
          zone={zone}
          active={nearbyZone === zone.key}
          onEnter={() => enterZone(zone.key)}
        />
      ))}
    </>
  )
}
