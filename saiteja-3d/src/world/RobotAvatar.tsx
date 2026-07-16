import { Suspense } from 'react'
import { ModelErrorBoundary } from './ModelErrorBoundary'
import { RobotModel } from './RobotModel'
import { CapsuleAvatar } from './CapsuleAvatar'

/**
 * Renders the robot's visual: the OBJ mascot if it loads, otherwise a capsule
 * placeholder (both while loading and if the model/textures are missing/broken).
 */
export function RobotAvatar() {
  return (
    <ModelErrorBoundary fallback={<CapsuleAvatar />}>
      <Suspense fallback={<CapsuleAvatar />}>
        <RobotModel />
      </Suspense>
    </ModelErrorBoundary>
  )
}
