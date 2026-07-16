import { useEffect } from 'react'
import { setInput } from './input'

/** code -> [x, z] contribution. -z is forward (into the screen). */
const KEY_MAP: Record<string, [number, number]> = {
  KeyW: [0, -1],
  ArrowUp: [0, -1],
  KeyS: [0, 1],
  ArrowDown: [0, 1],
  KeyA: [-1, 0],
  ArrowLeft: [-1, 0],
  KeyD: [1, 0],
  ArrowRight: [1, 0],
}

/**
 * Wires WASD + arrow keys into the shared input vector (see controls/input.ts).
 * This is the only place keyboard state lives; the world stays input-agnostic.
 */
export function useKeyboardControls(): void {
  useEffect(() => {
    const pressed = new Set<string>()

    const apply = () => {
      let x = 0
      let z = 0
      pressed.forEach((code) => {
        const v = KEY_MAP[code]
        if (v) {
          x += v[0]
          z += v[1]
        }
      })
      // Normalize so diagonals aren't faster than cardinals.
      const len = Math.hypot(x, z)
      if (len > 1) {
        x /= len
        z /= len
      }
      setInput(x, z)
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (!(e.code in KEY_MAP)) return
      e.preventDefault() // stop arrow keys from scrolling the page
      pressed.add(e.code)
      apply()
    }
    const onKeyUp = (e: KeyboardEvent) => {
      if (!(e.code in KEY_MAP)) return
      pressed.delete(e.code)
      apply()
    }
    const onBlur = () => {
      pressed.clear()
      setInput(0, 0)
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('blur', onBlur)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('blur', onBlur)
      setInput(0, 0)
    }
  }, [])
}
