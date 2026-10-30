import { describe, it, expect } from 'vitest'

import App from '@/App.vue'
import { projects } from '@/data/projects'
import { mountWithRouter } from './mountWithRouter'

describe('ProjectDetailPage', () => {
  it('renders the project from the URL', async () => {
    const wrapper = await mountWithRouter(App, '/projects/airline-api-integration')
    expect(wrapper.find('h1').text().toLowerCase()).toContain('airline')
    expect(wrapper.text()).toContain('Sabre GDS')
    expect(wrapper.text()).toContain('circuit breaker')
    expect(wrapper.text()).toContain('Pathway Technologies and Services')
  })

  it('suggests three other projects', async () => {
    const wrapper = await mountWithRouter(App, '/projects/airline-api-integration')
    const cards = wrapper.findAll('[data-test="project-card"]')
    expect(cards).toHaveLength(3)
    for (const card of cards) {
      expect(card.find('a[href="/projects/airline-api-integration"]').exists()).toBe(false)
    }
  })

  it('titles the browser tab after the project', async () => {
    await mountWithRouter(App, '/projects/tt-bot')
    expect(document.title).toBe('TT Bot — AI travel assistant — Bishwas Dangol')
  })

  it('shows not-found for an unknown slug', async () => {
    const wrapper = await mountWithRouter(App, '/projects/nope')
    expect(wrapper.text()).toContain('Page not found')
  })

  it('skips sections with nothing to say', async () => {
    const project = projects.find((p) => p.slug === 'tt-bot')!
    project.sections.push({ heading: 'Empty section' })
    try {
      const wrapper = await mountWithRouter(App, '/projects/tt-bot')
      expect(wrapper.text()).not.toContain('Empty section')
    } finally {
      project.sections.pop()
    }
  })

  it('offers Hire me by email', async () => {
    const wrapper = await mountWithRouter(App, '/projects/tt-bot')
    const links = wrapper.findAll('main a[href^="mailto:bishwasdangol1@gmail.com"]')
    expect(links.some((a) => a.text().includes('Hire me'))).toBe(true)
  })
})
