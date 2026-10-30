import { describe, it, expect } from 'vitest'

import AppHeader from '@/components/AppHeader.vue'
import { mountWithRouter } from './mountWithRouter'

describe('AppHeader', () => {
  it('has a Hire me link that emails Bishwas', async () => {
    const wrapper = await mountWithRouter(AppHeader)
    const hire = wrapper.find('a[href^="mailto:bishwasdangol1@gmail.com"]')
    expect(hire.exists()).toBe(true)
    expect(hire.text()).toContain('Hire me')
  })

  it('hides the desktop Hire me on phones without fighting its own display class', async () => {
    const wrapper = await mountWithRouter(AppHeader)
    const conflicting = wrapper
      .findAll('*')
      .filter((el) => el.classes().includes('hidden') && el.classes().includes('inline-flex'))
    expect(conflicting).toHaveLength(0)
  })

  it('closes the mobile menu when a link is tapped', async () => {
    const wrapper = await mountWithRouter(AppHeader)
    const toggle = wrapper.find('[data-test="menu-toggle"]')
    await toggle.trigger('click')
    expect(toggle.attributes('aria-expanded')).toBe('true')
    await wrapper.find('[data-test="mobile-link"]').trigger('click')
    expect(toggle.attributes('aria-expanded')).toBe('false')
  })
})
