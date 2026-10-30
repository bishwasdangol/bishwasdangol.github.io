import { describe, it, expect } from 'vitest'
import type { VueWrapper } from '@vue/test-utils'

import ProjectsPage from '@/views/pages/ProjectsPage.vue'
import { mountWithRouter } from './mountWithRouter'

function filterButton(wrapper: VueWrapper, label: string) {
  const button = wrapper.findAll('[data-test="filter"]').find((b) => b.text() === label)
  if (!button) throw new Error(`No filter labelled ${label}`)
  return button
}

describe('ProjectsPage', () => {
  it('shows all ten projects by default', async () => {
    const wrapper = await mountWithRouter(ProjectsPage, '/projects')
    expect(wrapper.findAll('[data-test="project-card"]')).toHaveLength(10)
    expect(filterButton(wrapper, 'All (10)').attributes('aria-pressed')).toBe('true')
  })

  it('filters by category', async () => {
    const wrapper = await mountWithRouter(ProjectsPage, '/projects')
    await filterButton(wrapper, 'GIS').trigger('click')
    expect(wrapper.findAll('[data-test="project-card"]')).toHaveLength(2)
    expect(filterButton(wrapper, 'GIS').attributes('aria-pressed')).toBe('true')
    expect(filterButton(wrapper, 'All (10)').attributes('aria-pressed')).toBe('false')

    await filterButton(wrapper, 'AI & ML').trigger('click')
    expect(wrapper.findAll('[data-test="project-card"]')).toHaveLength(3)

    await filterButton(wrapper, 'All (10)').trigger('click')
    expect(wrapper.findAll('[data-test="project-card"]')).toHaveLength(10)
  })

  it('offers Hire me by email', async () => {
    const wrapper = await mountWithRouter(ProjectsPage, '/projects')
    expect(wrapper.find('a[href^="mailto:bishwasdangol1@gmail.com"]').text()).toContain('Hire me')
  })
})
