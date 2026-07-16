import * as THREE from 'three'
import { Billboard, Text, Outlines, Html } from '@react-three/drei'
import type { ZoneConfig, ZoneId } from './zones'

const OUTLINE = '#e01e37' // red outline so folders pop against the green grass
const FLOAT_Y = 1.3 // folders float a bit above the ground

// Four distinct framed-landscape icons (generic mountain "photo" motif), one per
// section — clipped to a rounded frame so fills stay inside.
const ICONS: Record<ZoneId, string> = {
  projects: `<svg xmlns='http://www.w3.org/2000/svg' width='256' height='256' viewBox='0 0 24 24'><defs><clipPath id='c'><rect x='2.5' y='4.5' width='19' height='15' rx='2.4'/></clipPath></defs><g clip-path='url(#c)'><rect x='2' y='4' width='20' height='16' fill='#bfe9fb'/><circle cx='16.6' cy='9' r='2' fill='#ffdf3d'/><path d='M0 20 L7.5 9.5 L15 20 Z' fill='#6bbf6e'/><path d='M9 20 L15 11 L23 20 Z' fill='#54ad58'/></g><circle cx='16.6' cy='9' r='2' fill='none' stroke='#20242b' stroke-width='0.9'/><path d='M0 20 L7.5 9.5 L15 20' fill='none' stroke='#20242b' stroke-width='0.9' stroke-linejoin='round'/><path d='M9 20 L15 11 L23 20' fill='none' stroke='#20242b' stroke-width='0.9' stroke-linejoin='round'/><rect x='2.5' y='4.5' width='19' height='15' rx='2.4' fill='none' stroke='#20242b' stroke-width='1.6'/></svg>`,
  experience: `<svg xmlns='http://www.w3.org/2000/svg' width='256' height='256' viewBox='0 0 24 24'><defs><clipPath id='c'><rect x='2.5' y='4.5' width='19' height='15' rx='2.4'/></clipPath></defs><g clip-path='url(#c)'><rect x='2' y='4' width='20' height='16' fill='#c3eef2'/><circle cx='16.4' cy='9' r='1.7' fill='#ffdf3d'/><path d='M11 20 L16 11.5 L23 20 Z' fill='#3ec3cb'/><rect x='7.7' y='16.5' width='0.9' height='2.4' fill='#7b4a2b'/><path d='M8.1 10.5 L5.6 15 H10.6 Z' fill='#4fae4a'/><path d='M8.1 13 L6.2 16.8 H10 Z' fill='#57b852'/></g><circle cx='16.4' cy='9' r='1.7' fill='none' stroke='#20242b' stroke-width='0.9'/><rect x='2.5' y='4.5' width='19' height='15' rx='2.4' fill='none' stroke='#20242b' stroke-width='1.6'/></svg>`,
  education: `<svg xmlns='http://www.w3.org/2000/svg' width='256' height='256' viewBox='0 0 24 24'><defs><clipPath id='c'><rect x='2.5' y='4.5' width='19' height='15' rx='2.4'/></clipPath></defs><g clip-path='url(#c)'><rect x='2' y='4' width='20' height='16' fill='#d0f0fb'/><circle cx='16.6' cy='8.8' r='1.9' fill='#ffe04a'/><path d='M-1 20 L7 9 L15 20 Z' fill='#c6dd52'/><path d='M4.6 13.7 L7 9 L9.4 13.7 Q7 12.3 4.6 13.7 Z' fill='#ffffff'/><path d='M10 20 L15.5 12 L23 20 Z' fill='#57c9b0'/></g><rect x='2.5' y='4.5' width='19' height='15' rx='2.4' fill='none' stroke='#20242b' stroke-width='1.6'/></svg>`,
  skills: `<svg xmlns='http://www.w3.org/2000/svg' width='256' height='256' viewBox='0 0 24 24'><defs><clipPath id='c'><rect x='2.5' y='4.5' width='19' height='15' rx='2.4'/></clipPath></defs><g clip-path='url(#c)'><rect x='2' y='4' width='20' height='16' fill='#f3ecda'/><circle cx='7' cy='8.5' r='2.1' fill='#ff9a3d'/><path d='M2 20 L9 10.5 L16 20 Z' fill='#4a5568'/><path d='M11 20 L16.5 12 L23 20 Z' fill='#39424f'/><path d='M14.5 8 l0.5 1 l1 0.5 l-1 0.5 l-0.5 1 l-0.5 -1 l-1 -0.5 l1 -0.5 z' fill='#20242b'/></g><circle cx='7' cy='8.5' r='2.1' fill='none' stroke='#20242b' stroke-width='0.9'/><rect x='2.5' y='4.5' width='19' height='15' rx='2.4' fill='none' stroke='#20242b' stroke-width='1.6'/></svg>`,
}

const iconCache = new Map<ZoneId, THREE.Texture>()
function svgTexture(key: ZoneId): THREE.Texture {
  const cached = iconCache.get(key)
  if (cached) return cached
  const t = new THREE.TextureLoader().load('data:image/svg+xml;base64,' + btoa(ICONS[key]))
  t.anisotropy = 8
  t.colorSpace = THREE.SRGBColorSpace
  iconCache.set(key, t)
  return t
}

type Props = {
  zone: ZoneConfig
  active: boolean
  onEnter: () => void
}

/** A chunky two-tone, red-outlined file folder floating above the grass, with a
 *  framed-landscape icon on the front and a floating name. Lifts/opens/glows when near. */
export function FolderZone({ zone, active, onEnter }: Props) {
  const [x, , z] = zone.pos
  const icon = svgTexture(zone.key)
  const frontTilt = active ? 0.34 : 0.2

  return (
    <group
      position={[x, FLOAT_Y + (active ? 0.12 : 0), z]}
      onClick={(e) => {
        e.stopPropagation()
        onEnter()
      }}
      onPointerOver={() => (document.body.style.cursor = 'pointer')}
      onPointerOut={() => (document.body.style.cursor = 'auto')}
    >
      {/* back panel */}
      <mesh position={[0, 0.62, -0.06]} rotation={[-0.14, 0, 0]} castShadow>
        <boxGeometry args={[1.3, 1.05, 0.09]} />
        <meshStandardMaterial
          color={zone.tab}
          roughness={0.55}
          emissive={zone.tab}
          emissiveIntensity={active ? 0.35 : 0.15}
        />
        <Outlines thickness={0.05} color={OUTLINE} />
      </mesh>

      {/* front pocket panel — opens more when active — with the framed icon */}
      <mesh position={[0, 0.55, 0.1]} rotation={[frontTilt, 0, 0]} castShadow>
        <boxGeometry args={[1.3, 0.95, 0.09]} />
        <meshStandardMaterial
          color={zone.body}
          roughness={0.55}
          emissive={zone.body}
          emissiveIntensity={active ? 0.3 : 0.12}
        />
        <Outlines thickness={0.05} color={OUTLINE} />
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[0.62, 0.62]} />
          <meshBasicMaterial map={icon} transparent depthWrite={false} />
        </mesh>
      </mesh>

      {/* tab */}
      <mesh position={[-0.38, 1.16, -0.06]} rotation={[-0.14, 0, 0]} castShadow>
        <boxGeometry args={[0.5, 0.2, 0.09]} />
        <meshStandardMaterial color={zone.tab} roughness={0.55} />
        <Outlines thickness={0.05} color={OUTLINE} />
      </mesh>

      {/* tall floating name — findable from a distance while roaming */}
      <Billboard position={[0, 1.95, 0]}>
        <Text fontSize={0.34} color="#ffffff" outlineWidth={0.02} outlineColor="#20242b" anchorX="center" anchorY="middle">
          {zone.label}
        </Text>
      </Billboard>

      {active && (
        <Html center position={[0, 2.35, 0]} distanceFactor={11}>
          <div className="pond-hint">
            Press <kbd>E</kbd> to open {zone.label}
          </div>
        </Html>
      )}
    </group>
  )
}
