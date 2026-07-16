import { CardStack } from '../ui/CardStack'
import { projects } from '../data/projects'

export function ProjectsSection() {
  // Project already matches the CardStack's CardItem shape.
  return (
    <CardStack
      coverTitle="Projects"
      coverSubtitle="Robotics, controls & autonomy — six selected builds."
      items={projects}
    />
  )
}
