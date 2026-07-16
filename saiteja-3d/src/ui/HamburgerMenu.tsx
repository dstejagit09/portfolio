import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { profile } from '../data/profile'

// The four section routes, so the site is fully navigable without driving.
const SECTIONS = [
  { path: '/projects', label: 'Projects' },
  { path: '/experience', label: 'Experience' },
  { path: '/education', label: 'Education' },
  { path: '/skills', label: 'Skills' },
] as const

/** Top-left menu: sections (recruiter path) plus external links. */
export function HamburgerMenu() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const goto = (path: string) => {
    setOpen(false)
    navigate(path)
  }

  return (
    <div className="hud-menu">
      <button
        className="hud-hamburger"
        aria-label="Menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span />
        <span />
        <span />
      </button>

      {open && (
        <nav className="hud-menu-panel">
          {SECTIONS.map((s) => (
            <button key={s.path} className="hud-menu-link" onClick={() => goto(s.path)}>
              {s.label}
            </button>
          ))}
          <button className="hud-menu-link" onClick={() => goto('/contact')}>
            Contact
          </button>

          <div className="hud-menu-divider" />

          <a href={profile.links.github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
        </nav>
      )}
    </div>
  )
}
