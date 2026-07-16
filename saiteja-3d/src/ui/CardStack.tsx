import { useCallback, useEffect, useState } from 'react'
import { motion, type PanInfo } from 'framer-motion'
import '../styles/cardstack.css'

/** Generic card shape so the stack is reusable across sections. */
export type CardItem = {
  id: string
  title: string
  subtitle?: string
  dateRange?: string
  /** small type/category pill shown above the title */
  badge?: string
  blurb?: string
  tags?: string[]
  metrics?: { label: string; value: string }[]
  image?: string
  accent?: string
  links?: { repo?: string; live?: string; detail?: string }
}

type Props = {
  coverTitle: string
  coverSubtitle?: string
  items: CardItem[]
}

const AUTO_ADVANCE_MS = 3000
const VISIBLE_DEPTH = 3 // how many cards peek behind the front one
const DEFAULT_ACCENT = '#38bdf8'

/**
 * Reusable advancing card stack: a fixed cover card on the left and a deck on
 * the right that advances one card at a time (auto every ~3s, plus prev/next
 * and swipe). Each card is positioned by its depth relative to the active
 * index, so advancing re-shuffles the whole deck with a smooth transition.
 */
export function CardStack({ coverTitle, coverSubtitle, items }: Props) {
  const count = items.length
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const advance = useCallback(
    (dir: number) => setIndex((i) => (i + dir + count) % count),
    [count],
  )

  // Auto-advance; the effect re-arms on every index change (so manual nav
  // resets the timer) and stops while paused/hovered.
  useEffect(() => {
    if (paused || count <= 1) return
    const t = setTimeout(() => advance(1), AUTO_ADVANCE_MS)
    return () => clearTimeout(t)
  }, [index, paused, count, advance])

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -80) advance(1)
    else if (info.offset.x > 80) advance(-1)
  }

  const active = items[index]

  return (
    <div className="cardstack">
      {/* Cover card */}
      <div className="cardstack-cover" style={{ ['--accent' as string]: active?.accent ?? DEFAULT_ACCENT }}>
        <div className="cardstack-cover-kicker">Section</div>
        <h1 className="cardstack-cover-title">{coverTitle}</h1>
        {coverSubtitle && <p className="cardstack-cover-sub">{coverSubtitle}</p>}
        <div className="cardstack-cover-count">
          <span>{String(index + 1).padStart(2, '0')}</span>
          <span className="cardstack-cover-count-total">/ {String(count).padStart(2, '0')}</span>
        </div>
      </div>

      {/* Deck */}
      <div
        className="cardstack-deck"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="cardstack-deck-frame">
          {items.map((item, i) => {
            const depth = (i - index + count) % count
            return (
              <DeckCard
                key={item.id}
                item={item}
                depth={depth}
                draggable={depth === 0}
                onDragEnd={onDragEnd}
              />
            )
          })}
        </div>

        <div className="cardstack-controls">
          <button className="cardstack-btn" aria-label="Previous" onClick={() => advance(-1)}>
            ‹
          </button>
          <div className="cardstack-dots">
            {items.map((item, i) => (
              <button
                key={item.id}
                className={`cardstack-dot${i === index ? ' is-active' : ''}`}
                aria-label={`Go to card ${i + 1}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
          <button className="cardstack-btn" aria-label="Next" onClick={() => advance(1)}>
            ›
          </button>
        </div>
      </div>
    </div>
  )
}

type DeckCardProps = {
  item: CardItem
  depth: number
  draggable: boolean
  onDragEnd: (e: unknown, info: PanInfo) => void
}

function DeckCard({ item, depth, draggable, onDragEnd }: DeckCardProps) {
  const hidden = depth >= VISIBLE_DEPTH
  const accent = item.accent ?? DEFAULT_ACCENT

  return (
    <motion.article
      className="card"
      style={{ zIndex: 100 - depth, ['--accent' as string]: accent }}
      initial={false}
      animate={{
        x: depth * 22,
        y: depth * 16,
        rotate: depth * 3.5,
        scale: 1 - depth * 0.05,
        opacity: hidden ? 0 : 1,
      }}
      transition={{ type: 'spring', stiffness: 260, damping: 30 }}
      drag={draggable ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.4}
      onDragEnd={draggable ? onDragEnd : undefined}
      aria-hidden={depth !== 0}
    >
      <CardMedia item={item} accent={accent} />

      <div className="card-body">
        {item.badge && <span className="card-badge">{item.badge}</span>}
        <div className="card-head">
          <h2 className="card-title">{item.title}</h2>
          {item.dateRange && <span className="card-date">{item.dateRange}</span>}
        </div>
        {item.subtitle && <p className="card-subtitle">{item.subtitle}</p>}

        {item.metrics && item.metrics.length > 0 && (
          <div className="card-metrics">
            {item.metrics.map((m) => (
              <div key={m.label} className="card-metric">
                <div className="card-metric-value">{m.value}</div>
                <div className="card-metric-label">{m.label}</div>
              </div>
            ))}
          </div>
        )}

        {item.blurb && <p className="card-blurb">{item.blurb}</p>}

        {item.tags && item.tags.length > 0 && (
          <div className="card-tags">
            {item.tags.map((t) => (
              <span key={t} className="card-chip">
                {t}
              </span>
            ))}
          </div>
        )}

        {item.links && (
          <div className="card-links">
            {item.links.repo && (
              <a className="card-link" href={item.links.repo} target="_blank" rel="noreferrer">
                Code ↗
              </a>
            )}
            {item.links.live && (
              <a
                className="card-link card-link-primary"
                href={item.links.live}
                target="_blank"
                rel="noreferrer"
              >
                Live Demo ↗
              </a>
            )}
            {item.links.detail && (
              <a className="card-link" href={item.links.detail} target="_blank" rel="noreferrer">
                Details ↗
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  )
}

/* Card image with a graceful gradient fallback when missing or on 404. */
function CardMedia({ item, accent }: { item: CardItem; accent: string }) {
  const [failed, setFailed] = useState(false)
  const showImage = item.image && !failed

  return (
    <div className="card-media" style={{ ['--accent' as string]: accent }}>
      {showImage ? (
        <img src={item.image} alt={item.title} onError={() => setFailed(true)} draggable={false} />
      ) : (
        <div className="card-media-fallback">
          <span className="card-media-mono">{item.id}</span>
        </div>
      )}
    </div>
  )
}
