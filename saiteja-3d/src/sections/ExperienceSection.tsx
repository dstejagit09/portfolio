import { CardStack, type CardItem } from '../ui/CardStack'
import { experience } from '../data/experience'

export function ExperienceSection() {
  const items: CardItem[] = experience.map((e) => ({
    id: e.id,
    title: e.role,
    subtitle: e.org,
    dateRange: e.dateRange,
    badge: e.type,
    blurb: e.blurb,
    tags: e.tags,
    accent: e.accent,
    links: e.live ? { live: e.live } : undefined,
  }))

  return (
    <CardStack
      coverTitle="Experience"
      coverSubtitle="Where I've built, taught, and shipped."
      items={items}
    />
  )
}
