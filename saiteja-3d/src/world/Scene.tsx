import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { Robot } from './Robot'
import { EnvironmentIBL } from './EnvironmentIBL'

/**
 * The robot lives on its own TRANSPARENT canvas that floats over the animated
 * landscape background (served as a full-screen iframe from
 * `public/landscape-portfolio-background.html`). The old sky/grass/mountains/
 * folders/post-FX environment is intentionally gone — the landscape iframe is
 * the environment now; this canvas renders only the robot (its arrow/WASD
 * driving is unchanged) plus lighting, and clears to full transparency so the
 * landscape shows through everywhere the robot isn't.
 */
export function Scene() {
  const robotRef = useRef<THREE.Group>(null)

  return (
    <Canvas
      className="scene-layer"
      dpr={[1, 2]}
      camera={{ position: [0, 5.5, 11], fov: 42, near: 0.1, far: 100 }}
      gl={{
        alpha: true, // transparent framebuffer — landscape iframe shows through
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.0,
        outputColorSpace: THREE.SRGBColorSpace,
      }}
      onCreated={({ gl, camera }) => {
        gl.setClearColor(0x000000, 0) // clear alpha = 0 (fully see-through)
        camera.lookAt(0, 1, 0) // fixed framing on the robot at the origin
      }}
    >
      {/* Lighting for the robot only (the old sun/sky rig is gone). */}
      <hemisphereLight args={['#eaf3ff', '#5f6b7a', 0.9]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[6, 10, 6]} intensity={1.6} color="#fff3e0" />
      <directionalLight position={[-6, 4, -4]} intensity={0.5} color="#cfe0ff" />

      {/* HDRI image-based lighting so the robot's metal/roughness read well.
          IBL only (no background prop) — the canvas stays transparent. */}
      <EnvironmentIBL />

      <Robot groupRef={robotRef} />
    </Canvas>
  )
}
