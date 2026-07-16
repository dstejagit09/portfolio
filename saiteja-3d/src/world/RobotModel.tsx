import { useMemo } from 'react'
import { useLoader } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import * as THREE from 'three'

const BASE = '/models/robot'
const TARGET_HEIGHT = 1.6 // meters; keeps the robot a sensible size on the floor

/**
 * The mascot's "front" (its eyes) should point along local +z, which is the
 * direction the movement code turns the robot toward. If it drives backward
 * ("moonwalks"), flip this to Math.PI.
 */
const MODEL_FORWARD_YAW = 0

/**
 * Loads the OBJ mascot with its PBR texture set, applies a single standard
 * material, normalizes size, and plants it centered on the floor. Suspends
 * while loading and throws on failure — both handled by RobotAvatar
 * (Suspense + ModelErrorBoundary fall back to the capsule).
 */
export function RobotModel() {
  const obj = useLoader(OBJLoader, `${BASE}/base.obj`)
  const [diffuse, normal, roughness, metalness] = useLoader(THREE.TextureLoader, [
    `${BASE}/texture_diffuse.png`,
    `${BASE}/texture_normal.png`,
    `${BASE}/texture_roughness.png`,
    `${BASE}/texture_metallic.png`,
  ])

  const material = useMemo(() => {
    diffuse.colorSpace = THREE.SRGBColorSpace
    return new THREE.MeshStandardMaterial({
      map: diffuse,
      normalMap: normal,
      roughnessMap: roughness,
      metalnessMap: metalness,
      metalness: 1,
      roughness: 1,
    })
  }, [diffuse, normal, roughness, metalness])

  const model = useMemo(() => {
    const root = obj.clone(true)
    root.traverse((child) => {
      const mesh = child as THREE.Mesh
      if (mesh.isMesh) {
        mesh.material = material
        mesh.castShadow = true
        mesh.receiveShadow = true
      }
    })

    // Normalize to a consistent height, then center on X/Z and sit feet at y=0.
    const box = new THREE.Box3().setFromObject(root)
    const size = box.getSize(new THREE.Vector3())
    if (size.y > 0) root.scale.setScalar(TARGET_HEIGHT / size.y)

    const scaled = new THREE.Box3().setFromObject(root)
    root.position.x = -(scaled.min.x + scaled.max.x) / 2
    root.position.z = -(scaled.min.z + scaled.max.z) / 2
    root.position.y = -scaled.min.y
    return root
  }, [obj, material])

  return (
    <group rotation={[0, MODEL_FORWARD_YAW, 0]}>
      <primitive object={model} />
    </group>
  )
}
