import { useMemo } from 'react'
import * as THREE from 'three'
import { fbm, valueNoise } from './noise'

const INNER = 74 // meets the (smaller) grass edge — mountains brought forward
const OUTER = 120
const MAX_H = 15 // modest peaks so the whole mountain + sky above it stay in frame

const GREEN = new THREE.Color('#3f6b3a') // forested base
const ROCK = new THREE.Color('#6f6a5f') // grey-brown mid
const SNOW = new THREE.Color('#f6f9ff') // snow caps
const SKY = new THREE.Color('#bcd6e0') // haze target (matches fog/background)

/**
 * A ring (annulus) of small snowcapped hills encircling the meadow, so distant
 * hills sit on the horizon from every camera angle. Vertices displaced by layered
 * noise into many small rounded peaks; colored green→rock→snow by height with a
 * soft snow line, and hazed toward the sky with distance for aerial perspective.
 */
function makeHillRing(): THREE.BufferGeometry {
  const NA = 320 // around the ring
  const NR = 16 // inner→outer
  const positions: number[] = []
  const colors: number[] = []
  const indices: number[] = []
  const tmp = new THREE.Color()

  for (let ia = 0; ia <= NA; ia++) {
    const a = (ia / NA) * Math.PI * 2
    const ca = Math.cos(a)
    const sa = Math.sin(a)
    for (let ir = 0; ir <= NR; ir++) {
      const t = ir / NR // 0 inner → 1 outer
      const radius = INNER + t * (OUTER - INNER)
      const x = ca * radius
      const z = sa * radius

      // Peak profile: 0 at the inner edge (meets grass), rising into the ring.
      const profile = Math.pow(Math.sin(Math.min(1, t * 1.15) * Math.PI * 0.75), 0.9)
      const n =
        0.55 * fbm(x * 0.035, z * 0.035, 4) +
        0.3 * fbm(x * 0.09 + 40, z * 0.09, 3) +
        0.15 * valueNoise(x * 0.22, z * 0.22)
      const h = MAX_H * profile * THREE.MathUtils.clamp(n * 1.3, 0, 1)
      positions.push(x, h, z)

      // Height-based color with a soft, noisy snow line.
      const hNorm = h / MAX_H
      if (hNorm < 0.45) tmp.copy(GREEN).lerp(ROCK, THREE.MathUtils.clamp(hNorm / 0.45, 0, 1))
      else tmp.copy(ROCK)
      const snowLine = 0.62 + (valueNoise(x * 0.3, z * 0.3) - 0.5) * 0.14
      const snow = THREE.MathUtils.smoothstep(hNorm, snowLine, snowLine + 0.12)
      tmp.lerp(SNOW, snow)
      // aerial haze grows with distance
      const haze = THREE.MathUtils.clamp((radius - INNER) / (OUTER - INNER), 0, 1) * 0.45
      tmp.lerp(SKY, haze)

      colors.push(tmp.r, tmp.g, tmp.b)
    }
  }

  const cols = NR + 1
  for (let ia = 0; ia < NA; ia++) {
    for (let ir = 0; ir < NR; ir++) {
      const a0 = ia * cols + ir
      const a1 = a0 + 1
      const b0 = (ia + 1) * cols + ir
      const b1 = b0 + 1
      indices.push(a0, b0, b1, a0, b1, a1)
    }
  }

  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  g.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
  g.setIndex(indices)
  g.computeVertexNormals()
  return g
}

/** Snowcapped hill ring on the horizon (flat-shaded, lit by the scene sun). */
export function HorizonMountains() {
  const geometry = useMemo(makeHillRing, [])
  return (
    <mesh geometry={geometry} renderOrder={-1}>
      <meshStandardMaterial vertexColors flatShading roughness={1} metalness={0} />
    </mesh>
  )
}
