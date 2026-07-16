import { Component, type ReactNode } from 'react'

type Props = { fallback: ReactNode; children: ReactNode }
type State = { hasError: boolean }

/**
 * Catches a failed GLB load (e.g. public/models/robot.glb missing) and renders
 * the fallback avatar instead, so movement stays testable without the model.
 */
export class ModelErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch() {
    console.warn(
      '[robot] Could not load /models/robot.glb — using a capsule placeholder. ' +
        'Drop a robot.glb into public/models/ to replace it.',
    )
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children
  }
}
