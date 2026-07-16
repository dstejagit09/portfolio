/**
 * The single source of movement intent for the player.
 *
 * Any input source (keyboard now, on-screen joystick later) writes into this
 * one vector via setInput(); the world reads it via getInput(). Keeping every
 * input funneling through here means swapping/adding an input source never
 * touches the robot, camera, or movement code.
 *
 * World-space convention: +x is screen-right, -z is "forward" (into the screen,
 * away from the camera). Magnitude is expected to be 0..1.
 */
export type InputVector = { x: number; z: number }

const input: InputVector = { x: 0, z: 0 }

/** Read the current movement intent (do not mutate the returned object). */
export function getInput(): InputVector {
  return input
}

/** Overwrite the movement intent. Called by whichever input source is active. */
export function setInput(x: number, z: number): void {
  input.x = x
  input.z = z
}
