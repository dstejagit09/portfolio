import { profile } from '../data/profile'

/** Persistent top-right Resume link. */
export function ResumeButton() {
  return (
    <a className="hud-resume" href={profile.links.resume} target="_blank" rel="noreferrer">
      Resume
    </a>
  )
}
