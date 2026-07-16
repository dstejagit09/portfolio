import { Sky, Clouds, Cloud, Billboard } from '@react-three/drei'
import * as THREE from 'three'
import { EnvironmentIBL } from './EnvironmentIBL'
import { useQualityStore } from '../store/useQualityStore'

// Low warm sun on the RIGHT of the view, near the horizon where the hills meet the
// sky. The Sky, directional light, and the visible sun disc all share this direction.
const SUN = new THREE.Vector3(85, 18, -35)
const SUN_DISC = SUN.clone().normalize().multiplyScalar(300)

/** Daytime sky, HDRI image-based lighting, soft clouds, a sun disc, and warm light. */
export function Atmosphere() {
  const environment = useQualityStore((s) => s.environment)

  return (
    <>
      <Sky
        sunPosition={SUN}
        turbidity={5}
        rayleigh={1.2}
        mieCoefficient={0.006}
        mieDirectionalG={0.86}
      />

      {/* crisp warm sun disc in the corner (bloom makes it glow) */}
      <Billboard position={SUN_DISC}>
        <mesh>
          <circleGeometry args={[30, 44]} />
          <meshBasicMaterial color="#ffdd84" toneMapped={false} />
        </mesh>
        <mesh position={[0, 0, -0.5]}>
          <circleGeometry args={[46, 44]} />
          <meshBasicMaterial color="#ffe9a8" transparent opacity={0.35} toneMapped={false} />
        </mesh>
      </Billboard>

      {environment && <EnvironmentIBL />}

      {/* Gentle fill on top of the IBL: a touch of blue sky + green bounce. */}
      <hemisphereLight args={['#cfe8ff', '#587f3c', 0.35]} />
      <ambientLight intensity={0.12} />

      {/* Warm sun with a soft (PCF, blurred) shadow, framed over the folder area. */}
      <directionalLight
        position={SUN}
        intensity={2.3}
        color="#ffe1bd"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.5}
        shadow-camera-far={70}
        shadow-camera-left={-22}
        shadow-camera-right={22}
        shadow-camera-top={22}
        shadow-camera-bottom={-22}
        shadow-bias={-0.0004}
        shadow-radius={4}
      />

      {/* Clear, sunny sky: just a few light, high clouds. */}
      <Clouds material={THREE.MeshBasicMaterial} limit={80}>
        <Cloud seed={1} segments={22} bounds={[6, 1.2, 1.8]} volume={3} color="#ffffff" opacity={0.7} fade={60} speed={0.06} position={[-34, 24, -40]} />
        <Cloud seed={2} segments={18} bounds={[5, 1, 1.5]} volume={2.4} color="#f7fbff" opacity={0.62} fade={60} speed={0.05} position={[22, 27, -46]} />
        <Cloud seed={3} segments={18} bounds={[4.5, 1, 1.5]} volume={2.2} color="#ffffff" opacity={0.6} fade={60} speed={0.05} position={[-6, 29, -54]} />
      </Clouds>
    </>
  )
}
