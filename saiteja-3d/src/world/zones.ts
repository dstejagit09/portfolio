export type ZoneId = 'projects' | 'experience' | 'education' | 'skills'

export type ZoneConfig = {
  key: ZoneId
  label: string
  /** world position [x, 0, z] */
  pos: [number, number, number]
  /** lighter front-body color */
  body: string
  /** darker tab/back color */
  tab: string
  route: string
}

/**
 * Four colored file-folder zones lined up horizontally (same z, spread along x)
 * and floated a bit above the ground — see FLOAT_Y in FolderZone.tsx.
 */
export const ZONES: ZoneConfig[] = [
  { key: 'projects', label: 'Projects', pos: [-6, 0, -3], body: '#ff5a5a', tab: '#e5384d', route: '/projects' },
  { key: 'experience', label: 'Experience', pos: [-2, 0, -3], body: '#ff9a3d', tab: '#f2740d', route: '/experience' },
  { key: 'education', label: 'Education', pos: [2, 0, -3], body: '#4c9bff', tab: '#2d6fe0', route: '/education' },
  { key: 'skills', label: 'Skills', pos: [6, 0, -3], body: '#b57bff', tab: '#8a46e0', route: '/skills' },
]

/** How close (world units) the robot must be to a folder to enter it. */
export const FOLDER_PROX = 2.6

export function zoneLabel(id: ZoneId): string {
  return ZONES.find((z) => z.key === id)?.label ?? id
}
