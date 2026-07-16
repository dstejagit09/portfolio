import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { terrainHeight } from './noise'
import { ZONES } from './zones'
import { useQualityStore, GRASS_COUNTS } from '../store/useQualityStore'

const AREA = 70 // smaller meadow; grass runs evenly to the (now closer) hill ring
const FADE_START = 52 // full-height within this; blades shrink gently past it
const FADE_END = 70 // shrink to nothing at the very edge (blends into the texture)

/** One tapered blade, unit height (base at y=0, tip at y=1). */
function makeBladeGeometry(): THREE.BufferGeometry {
  const g = new THREE.PlaneGeometry(1, 1, 1, 3)
  const pos = g.attributes.position as THREE.BufferAttribute
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i)
    const t = pos.getY(i) + 0.5 // 0 base → 1 tip
    const width = (1 - t) * 0.05 + 0.018
    pos.setX(i, x * width * 2)
    pos.setY(i, t)
  }
  pos.needsUpdate = true
  g.computeVertexNormals()
  return g
}

/** Keep a small clear patch of ground around each folder's base. */
function nearFolder(x: number, z: number): boolean {
  for (const z0 of ZONES) {
    if (Math.hypot(x - z0.pos[0], z - z0.pos[2]) < 1.2) return true
  }
  return false
}

/**
 * Instanced grass blades. The material is a MeshStandardMaterial patched via
 * onBeforeCompile with vertex wind sway + distance fade + a tip gradient, so it
 * still gets correct lighting/IBL/fog/tone-mapping from three (raw shaders fight
 * three's color-management chunks). Count is driven by the quality store.
 */
export function GrassField() {
  const grass = useQualityStore((s) => s.grass)
  const count = GRASS_COUNTS[grass]
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const uTime = useMemo(() => ({ value: 0 }), [])

  const geometry = useMemo(makeBladeGeometry, [])

  const material = useMemo(() => {
    const m = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#4c7a2f'), // deeper, more saturated green
      roughness: 1,
      metalness: 0,
      side: THREE.DoubleSide,
    })
    m.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = uTime
      shader.vertexShader = shader.vertexShader
        .replace(
          '#include <common>',
          `#include <common>
           attribute vec2 aRand;
           uniform float uTime;
           varying float vBladeT;
           varying float vBladeTint;`,
        )
        .replace(
          '#include <begin_vertex>',
          `#include <begin_vertex>
           vec2 gBase = vec2(instanceMatrix[3][0], instanceMatrix[3][2]);
           float gFade = smoothstep(${FADE_END.toFixed(1)}, ${FADE_START.toFixed(1)}, length(gBase));
           vBladeT = position.y;
           vBladeTint = aRand.y;
           transformed.y *= gFade;
           float gWind = sin(uTime * 1.6 + gBase.x * 0.35 + gBase.y * 0.35 + aRand.x * 6.283);
           float gBend = gWind * 0.22 * transformed.y * transformed.y;
           transformed.x += gBend;
           transformed.z += gBend * 0.35;`,
        )
      shader.fragmentShader = shader.fragmentShader
        .replace(
          '#include <common>',
          `#include <common>
           varying float vBladeT;
           varying float vBladeTint;`,
        )
        .replace(
          '#include <color_fragment>',
          `#include <color_fragment>
           diffuseColor.rgb *= 0.6 + 0.4 * vBladeT;                 // AO toward base
           diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * vec3(1.25, 1.3, 0.85), vBladeT * 0.5);
           diffuseColor.rgb *= 0.9 + 0.2 * vBladeTint;`,
        )
    }
    m.customProgramCacheKey = () => 'grass-blade-v1'
    return m
  }, [uTime])

  useEffect(() => {
    const mesh = meshRef.current
    if (!mesh || count === 0) return
    const dummy = new THREE.Object3D()
    const rand = new Float32Array(count * 2)
    let placed = 0
    let guard = 0
    while (placed < count && guard < count * 5) {
      guard++
      const x = (Math.random() * 2 - 1) * AREA
      const z = (Math.random() * 2 - 1) * AREA
      if (Math.hypot(x, z) > AREA || nearFolder(x, z)) continue
      dummy.position.set(x, terrainHeight(x, z), z)
      dummy.rotation.set(0, Math.random() * Math.PI, 0)
      dummy.scale.set(1, 0.3 + Math.random() * 0.22, 1)
      dummy.updateMatrix()
      mesh.setMatrixAt(placed, dummy.matrix)
      rand[placed * 2] = Math.random()
      rand[placed * 2 + 1] = Math.random()
      placed++
    }
    mesh.count = placed
    mesh.instanceMatrix.needsUpdate = true
    mesh.geometry.setAttribute('aRand', new THREE.InstancedBufferAttribute(rand, 2))
  }, [count, geometry])

  useFrame((state) => {
    uTime.value = state.clock.elapsedTime
  })

  if (count === 0) return null

  return <instancedMesh ref={meshRef} args={[geometry, material, count]} frustumCulled={false} />
}
