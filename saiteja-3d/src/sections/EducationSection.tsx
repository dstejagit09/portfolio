import { CardStack, type CardItem } from '../ui/CardStack'
import { education, certifications, publications } from '../data/education'
import '../styles/education.css'

export function EducationSection() {
  const items: CardItem[] = education.map((e) => ({
    id: e.id,
    title: e.school,
    subtitle: e.degree,
    dateRange: e.dateRange,
    metrics: [
      ...(e.gpa ? [{ label: 'GPA', value: e.gpa }] : []),
      ...(e.location ? [{ label: 'Location', value: e.location }] : []),
    ],
    tags: e.coursework,
    accent: e.accent,
  }))

  return (
    <div className="edu-section">
      <CardStack
        coverTitle="Education"
        coverSubtitle="Degrees, coursework, and credentials."
        items={items}
      />

      <div className="edu-extras">
        <section className="edu-group">
          <h3 className="edu-group-title">Certifications</h3>
          <ul className="edu-list">
            {certifications.map((c) => (
              <li key={c.id} className="edu-cert">
                <span className="edu-cert-name">{c.name}</span>
                <span className="edu-cert-meta">
                  {c.org} · {c.area}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="edu-group">
          <h3 className="edu-group-title">Publications</h3>
          <ul className="edu-list">
            {publications.map((p) => (
              <li key={p.id} className="edu-pub">
                <a href={p.link} target="_blank" rel="noreferrer" className="edu-pub-link">
                  {p.title} ↗
                </a>
                <span className="edu-pub-meta">
                  {[p.org, p.year].filter(Boolean).join(' · ')}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
