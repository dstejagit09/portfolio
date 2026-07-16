import { useRef, type RefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Smooth follow: keep the downward tilt + a sky band while tracking the robot so
// it can roam to the screen edges and stay in view.
const POS_OFFSET = new THREE.Vector3(0, 11, 18)
const LOOK_OFFSET = new THREE.Vector3(0, 4.5, -2) // raised so a sky band shows above the hills
const LAMBDA = 4 // higher = tighter follow

export function CameraRig({ targetRef }: { targetRef: RefObject<THREE.Group | null> }) {
  const desired = useRef(new THREE.Vector3())
  const lookTarget = useRef(new THREE.Vector3())
  const smoothedLook = useRef(new THREE.Vector3(0, 1.5, -2))

  useFrame((state, delta) => {
    const t = targetRef.current
    if (!t) return
    const dt = Math.min(delta, 0.05)
    const k = 1 - Math.exp(-LAMBDA * dt)

    desired.current.copy(t.position).add(POS_OFFSET)
    state.camera.position.lerp(desired.current, k)

    lookTarget.current.copy(t.position).add(LOOK_OFFSET)
    smoothedLook.current.lerp(lookTarget.current, k)
    state.camera.lookAt(smoothedLook.current)
  })

  return null
}
