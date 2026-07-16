import { create } from 'zustand'
import type { ZoneId } from '../world/zones'

export type Vec3 = [number, number, number]

type GameState = {
  /** Current robot position in world space. Updated by the Robot each frame. */
  playerPosition: Vec3
  setPlayerPosition: (p: Vec3) => void

  /** The zone the robot is currently close enough to enter, or null. */
  nearbyZone: ZoneId | null
  setNearbyZone: (z: ZoneId | null) => void

  /** Enter a zone (via E key or clicking its pad). App overrides this with a
   *  router navigation once mounted; the default is a no-op log. */
  enterZone: (z: ZoneId) => void

  /** True while a section overlay is open (world is dimmed; movement paused). */
  overlayOpen: boolean
  setOverlayOpen: (open: boolean) => void
}

export const useGameStore = create<GameState>((set) => ({
  playerPosition: [0, 0, 0],
  setPlayerPosition: (p) => set({ playerPosition: p }),

  nearbyZone: null,
  setNearbyZone: (z) => set({ nearbyZone: z }),

  enterZone: (z) => {
    // eslint-disable-next-line no-console
    console.log('[zone] enter', z)
  },

  overlayOpen: false,
  setOverlayOpen: (open) => set({ overlayOpen: open }),
}))
