import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { terrainHeight } from './noise'
import { ZONES } from './zones'
import { useQualityStore } from '../store/useQualityStore'

const AREA = 52

/** Keep meadow props clear of each folder's base. */
function nearFolder(x: number, z: number, pad: number): boolean {
  for (const z0 of ZONES) {
    if (Math.hypot(x - z0.pos[0], z - z0.pos[2]) < pad) return true
  }
  return false
}

const FLOWER_COLORS = ['#ffffff', '#ffd94a', '#ff8fb3', '#b58cff', '#ff7a59'].map((c) =>
  new THREE.Color(c),
)

/** Instanced wildflowers, rocks, and reeds/cattails around the pond banks. */
export function Scatter() {
  const grass = useQualityStore((s) => s.grass)
  const flowerCount = grass === 'off' ? 0 : grass === 'low' ? 320 : grass === 'medium' ? 620 : 980

  const flowersRef = useRef<THREE.InstancedMesh>(null)
  const rocksRef = useRef<THREE.InstancedMesh>(null)

  const rockCount = 120

  const flowerGeo = useMemo(() => new THREE.SphereGeometry(0.05, 6, 5), [])
  const rockGeo = useMemo(() => new THREE.DodecahedronGeometry(0.13, 0), [])

  // Wildflowers scattered across the meadow (heads nestled in the grass).
  useEffect(() => {
    const mesh = flowersRef.current
    if (!mesh || flowerCount === 0) return
    const d = new THREE.Object3D()
    let placed = 0
    let guard = 0
    while (placed < flowerCount && guard < flowerCount * 5) {
      guard++
      const x = (Math.random() * 2 - 1) * AREA
      const z = (Math.random() * 2 - 1) * AREA
      if (Math.hypot(x, z) > AREA || nearFolder(x, z, 1.4)) continue
      d.position.set(x, terrainHeight(x, z) + 0.22 + Math.random() * 0.1, z)
      d.scale.setScalar(0.7 + Math.random() * 0.7)
      d.updateMatrix()
      mesh.setMatrixAt(placed, d.matrix)
      mesh.setColorAt(placed, FLOWER_COLORS[(Math.random() * FLOWER_COLORS.length) | 0])
      placed++
    }
    mesh.count = placed
    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  }, [flowerCount])

  // Rocks — sparse, sunk slightly into the ground.
  useEffect(() => {
    const mesh = rocksRef.current
    if (!mesh) return
    const d = new THREE.Object3D()
    let placed = 0
    let guard = 0
    while (placed < rockCount && guard < rockCount * 6) {
      guard++
      const x = (Math.random() * 2 - 1) * AREA
      const z = (Math.random() * 2 - 1) * AREA
      if (Math.hypot(x, z) > AREA || nearFolder(x, z, 1.4)) continue
      d.position.set(x, terrainHeight(x, z) + 0.02, z)
      d.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3)
      d.scale.set(0.5 + Math.random() * 1.3, 0.4 + Math.random(), 0.5 + Math.random() * 1.3)
      d.updateMatrix()
      mesh.setMatrixAt(placed, d.matrix)
      placed++
    }
    mesh.count = placed
    mesh.instanceMatrix.needsUpdate = true
  }, [rockCount])

  return (
    <group>
      {flowerCount > 0 && (
        <instancedMesh ref={flowersRef} args={[flowerGeo, undefined, flowerCount]} castShadow>
          <meshStandardMaterial roughness={0.7} />
        </instancedMesh>
      )}
      <instancedMesh ref={rocksRef} args={[rockGeo, undefined, rockCount]} castShadow receiveShadow>
        <meshStandardMaterial color="#8d8b86" roughness={1} />
      </instancedMesh>
    </group>
  )
}
