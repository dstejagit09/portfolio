import { useState } from 'react'
import { profile } from '../data/profile'
import '../styles/contact.css'

export function ContactSection() {
  const [message, setMessage] = useState('')

  const sendMail = () => {
    const subject = encodeURIComponent('Hello from your portfolio')
    const body = encodeURIComponent(message)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  return (
    <div className="contact-section">
      <div className="contact-kicker">Get in touch</div>
      <h1 className="contact-title">Contact</h1>
      <p className="contact-lead">
        {profile.name} · {profile.location}
      </p>

      <div className="contact-links">
        <a className="contact-btn contact-btn-primary" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <a className="contact-btn" href={profile.links.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a className="contact-btn" href={profile.links.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        {profile.links.calendly && (
          <a className="contact-btn" href={profile.links.calendly} target="_blank" rel="noreferrer">
            Schedule a call
          </a>
        )}
      </div>

      <div className="contact-form">
        <label className="contact-label" htmlFor="contact-message">
          Send a quick message
        </label>
        <textarea
          id="contact-message"
          className="contact-textarea"
          rows={4}
          placeholder="Hi Saiteja, I'd love to talk about…"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="contact-send" onClick={sendMail} disabled={!message.trim()}>
          Open in email ↗
        </button>
        <p className="contact-note">This opens your email app with the message prefilled.</p>
      </div>
    </div>
  )
}
