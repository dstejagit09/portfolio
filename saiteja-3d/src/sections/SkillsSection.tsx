import { motion, type Variants } from 'framer-motion'
import { skillCategories } from '../data/skills'
import '../styles/skills.css'

// Stagger the categories, and stagger the pills within each category.
const groupContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}
const group: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.03 } },
}
const pill: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 500, damping: 30 } },
}

export function SkillsSection() {
  return (
    <div className="skills-section">
      <header className="skills-header">
        <div className="skills-kicker">Section</div>
        <h1 className="skills-title">Skills</h1>
        <p className="skills-sub">Tools, platforms, and methods I build with.</p>
      </header>

      <motion.div
        className="skills-groups"
        variants={groupContainer}
        initial="hidden"
        animate="show"
      >
        {skillCategories.map((cat) => (
          <motion.section
            key={cat.id}
            className="skills-group"
            variants={group}
            style={{ ['--accent' as string]: cat.accent }}
          >
            <h2 className="skills-group-label">{cat.label}</h2>
            <div className="skills-pills">
              {cat.skills.map((skill) => (
                <motion.span key={skill} className="skills-pill" variants={pill}>
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.section>
        ))}
      </motion.div>
    </div>
  )
}
