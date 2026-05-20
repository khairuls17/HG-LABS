import React from 'react'
import ProjectCard from '../features/projects/ProjectCard'

export default {
  title: 'Components/ProjectCard',
  component: ProjectCard,
}

export const Default = () => (
  <div style={{ maxWidth: 420 }}>
    <ProjectCard
      title="Floating Lab Cards"
      description="Interactive project cards with stack metadata and hover float."
      tags={["ui", "frontend"]}
      thumbnail="/assets/thumbs/cards.png"
      href="#"
    />
  </div>
)

export const NoThumbnail = () => (
  <div style={{ maxWidth: 420 }}>
    <ProjectCard title="Focus Room" description="Pomodoro room UI" tags={["productivity"]} href="#" />
  </div>
)
