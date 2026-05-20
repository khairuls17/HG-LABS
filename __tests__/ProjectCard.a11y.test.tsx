import React from 'react'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import ProjectCard from '../features/projects/ProjectCard'

test('ProjectCard is accessible', async () => {
  const { container } = render(
    <ProjectCard
      title="Test Project"
      description="A short description"
      tags={["ui"]}
      href="#"
      thumbnail="/assets/thumbs/cards.png"
    />
  )

  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
