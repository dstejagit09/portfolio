/**
 * Placeholder robot used until public/models/robot.glb exists. A capsule body
 * with a small "face" box on its +z side so you can see which way it faces
 * (the robot's local +z is forward). Sits on the floor (y = 0 at its feet).
 */
export function CapsuleAvatar() {
  return (
    <group>
      <mesh position={[0, 0.8, 0]} castShadow>
        <capsuleGeometry args={[0.4, 0.8, 8, 16]} />
        <meshStandardMaterial color="#5b8def" />
      </mesh>
      {/* face marker on the forward (+z) side */}
      <mesh position={[0, 0.95, 0.4]} castShadow>
        <boxGeometry args={[0.28, 0.12, 0.08]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
    </group>
  )
}
