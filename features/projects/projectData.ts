export type ProjectMeta = {
  id: string
  title: string
  description: string
  tags: string[]
  href: string
  thumbnail?: string
  details: string
}

export const projects: ProjectMeta[] = [
  {
    id: 'p1',
    title: 'Floating Lab Cards',
    description: 'Interactive project cards with stack metadata and hover float.',
    tags: ['ui', 'frontend'],
    href: '/projects/floating-lab-cards',
    thumbnail: '/assets/thumbs/cards.svg',
    details:
      'Floating Lab Cards is a responsive UI experiment focusing on depth, glow, and motion for project previews.',
  },
  {
    id: 'p2',
    title: 'Midnight Radio',
    description: 'Ambient music player designed for late-night sessions.',
    tags: ['audio', 'ui'],
    href: '/projects/midnight-radio',
    thumbnail: '/assets/thumbs/radio.svg',
    details:
      'Midnight Radio is a soft audio UI designed for low-light coding sessions, with subtle visual feedback and smooth controls.',
  },
  {
    id: 'p3',
    title: 'Focus Room',
    description: 'Pomodoro-based focused work room with session tracking.',
    tags: ['productivity', 'ui'],
    href: '/projects/focus-room',
    thumbnail: '/assets/thumbs/focus.svg',
    details:
      'Focus Room provides a minimal shell for productivity flows, combining session timers with calm visual cues and tracking.',
  },
]

export function findProjectBySlug(slug: string) {
  return projects.find((project) => project.href === `/projects/${slug}`)
}
