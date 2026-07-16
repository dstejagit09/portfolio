import { Component, Suspense, type ReactNode } from 'react'
import { Environment } from '@react-three/drei'

/** If the HDRI fails to load (offline/CDN), continue without IBL rather than crash. */
class EnvBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch() {
    console.warn('[env] HDRI environment failed to load — continuing without IBL.')
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

/**
 * Image-based lighting from an outdoor HDRI (drei "sunset" preset) — warm,
 * moody light and what the water/metal reflect (so ponds aren't black). Sets
 * scene.environment only (Sky stays the visible background). Fetched from the
 * pmndrs assets CDN at runtime.
 */
export function EnvironmentIBL() {
  return (
    <EnvBoundary>
      <Suspense fallback={null}>
        <Environment preset="park" />
      </Suspense>
    </EnvBoundary>
  )
}
