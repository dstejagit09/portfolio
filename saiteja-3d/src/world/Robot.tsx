import { useMemo, useRef, type RefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { getInput } from '../controls/input'
import { useGameStore } from '../store/useGameStore'
import { RobotAvatar } from './RobotAvatar'

/** A soft radial-gradient blob under the robot so it reads as grounded on the
 *  landscape (there's no real floor to catch a shadow on the transparent canvas).
 *  Lives on the robot's outer group, so it slides along with it. */
function GroundShadow() {
  const texture = useMemo(() => {
    const size = 128
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = size
    const ctx = canvas.getContext('2d')!
    const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    grad.addColorStop(0, 'rgba(0,0,0,0.5)')
    grad.addColorStop(0.55, 'rgba(0,0,0,0.22)')
    grad.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, size, size)
    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    return tex
  }, [])

  return (
    <mesh rotation-x={-Math.PI / 2} position-y={0.02} renderOrder={-1}>
      <planeGeometry args={[2.8, 2.8]} />
      <meshBasicMaterial map={texture} transparent depthWrite={false} toneMapped={false} />
    </mesh>
  )
}

const MAX_RADIUS = 7 // keep the robot within the fixed camera frame over the landscape
const MAX_SPEED = 6 // units/sec
const ACCEL_LAMBDA = 6 // higher = snappier acceleration
const DECEL_LAMBDA = 8 // higher = quicker stop
const TURN_LAMBDA = 10 // higher = faster turn toward travel direction
const MOVING_EPS = 0.15 // speed below this counts as "standing still"
const ZERO_INPUT = { x: 0, z: 0 } // used to freeze movement while an overlay is open

/** Frame-rate-independent smoothing factor for an exponential approach. */
function smoothing(lambda: number, dt: number): number {
  return 1 - Math.exp(-lambda * dt)
}

/** Damp an angle toward a target along the shortest path (handles wrap-around). */
function dampAngle(current: number, target: number, lambda: number, dt: number): number {
  let delta = target - current
  while (delta > Math.PI) delta -= Math.PI * 2
  while (delta < -Math.PI) delta += Math.PI * 2
  return current + delta * smoothing(lambda, dt)
}

/**
 * Drives the robot in the XZ plane from the shared input vector: smooth
 * acceleration/deceleration, rotation toward travel direction, a subtle idle
 * bob, clamped to the floor, with its position mirrored into the zustand store.
 */
export function Robot({ groupRef }: { groupRef: RefObject<THREE.Group | null> }) {
  const visualRef = useRef<THREE.Group>(null!)
  const velocity = useRef(new THREE.Vector3())
  const setPlayerPosition = useGameStore((s) => s.setPlayerPosition)

  useFrame((state, delta) => {
    const g = groupRef.current
    if (!g) return
    const dt = Math.min(delta, 0.05) // guard against big frame gaps
    // Freeze movement while a section overlay is open (world is paused behind it).
    const input = useGameStore.getState().overlayOpen ? ZERO_INPUT : getInput()
    const hasInput = input.x !== 0 || input.z !== 0

    // Approach the target velocity: accelerate toward it, or decelerate to 0.
    const vel = velocity.current
    const k = smoothing(hasInput ? ACCEL_LAMBDA : DECEL_LAMBDA, dt)
    vel.x += (input.x * MAX_SPEED - vel.x) * k
    vel.z += (input.z * MAX_SPEED - vel.z) * k

    // Integrate, then clamp only at a large radius so it never leaves the world.
    g.position.x += vel.x * dt
    g.position.z += vel.z * dt
    const radius = Math.hypot(g.position.x, g.position.z)
    if (radius > MAX_RADIUS) {
      g.position.x *= MAX_RADIUS / radius
      g.position.z *= MAX_RADIUS / radius
    }

    const speed = Math.hypot(vel.x, vel.z)

    // Face the travel direction while moving.
    if (speed > MOVING_EPS) {
      const targetAngle = Math.atan2(vel.x, vel.z)
      g.rotation.y = dampAngle(g.rotation.y, targetAngle, TURN_LAMBDA, dt)
    }

    // Subtle idle bob when standing still; settle flat while moving. Up-only
    // (0..0.12) so the robot never dips below the floor.
    if (visualRef.current) {
      const bob = (Math.sin(state.clock.elapsedTime * 2) * 0.5 + 0.5) * 0.12
      visualRef.current.position.y = speed <= MOVING_EPS ? bob : 0
    }

    if (speed > 0.001) {
      setPlayerPosition([g.position.x, g.position.y, g.position.z])
    }
  })

  return (
    <group ref={groupRef}>
      <GroundShadow />
      <group ref={visualRef}>
        <RobotAvatar />
      </group>
    </group>
  )
}
