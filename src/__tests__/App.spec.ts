import { describe, it, expect } from 'vitest'

import App from '@/App.vue'
import { mountWithRouter } from './mountWithRouter'

describe('App', () => {
  it('renders the home page', async () => {
    const wrapper = await mountWithRouter(App, '/')
    expect(wrapper.text()).toContain('Bishwas')
  })

  it('renders not-found for unknown paths', async () => {
    const wrapper = await mountWithRouter(App, '/nope')
    expect(wrapper.text()).toContain('Page not found')
  })
})

describe('footer', () => {
  it('shows only Bishwas’s own copyright, no template credit', async () => {
    const footer = (await mountWithRouter(App, '/')).find('footer')
    expect(footer.text()).toContain('Bishwas Dangol')
    expect(footer.text()).not.toContain('Design based on')
  })
})

describe('footer GitHub', () => {
  it('links to GitHub', async () => {
    const footer = (await mountWithRouter(App, '/')).find('footer')
    expect(footer.find('a[href="https://github.com/bishwasdangol"]').attributes('aria-label')).toBe(
      'GitHub',
    )
  })
})
