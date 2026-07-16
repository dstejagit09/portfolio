import { useMemo } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { terrainHeight } from './noise'
import { makeGrassTextures } from './grassTextures'

const SIZE = 300
const SEGMENTS = 160

/** Huge flat grass ground reaching well past the hill ring, so grass texture runs
 *  right up to (and under) the mountains — no bare band at the horizon. */
export function Terrain() {
  const geometry = useMemo(() => {
    const g = new THREE.PlaneGeometry(SIZE, SIZE, SEGMENTS, SEGMENTS)
    g.rotateX(-Math.PI / 2) // lie flat in XZ, normals up
    const pos = g.attributes.position as THREE.BufferAttribute
    for (let i = 0; i < pos.count; i++) {
      pos.setY(i, terrainHeight(pos.getX(i), pos.getZ(i)))
    }
    pos.needsUpdate = true
    g.computeVertexNormals()
    return g
  }, [])

  const maxAniso = useThree((s) => s.gl.capabilities.getMaxAnisotropy())
  const { map, normalMap, roughnessMap } = useMemo(
    () => makeGrassTextures(46, maxAniso),
    [maxAniso],
  )

  return (
    <mesh geometry={geometry} receiveShadow>
      <meshStandardMaterial
        map={map}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
        normalScale={new THREE.Vector2(0.8, 0.8)}
        roughness={1}
        metalness={0}
        dithering
      />
    </mesh>
  )
}
