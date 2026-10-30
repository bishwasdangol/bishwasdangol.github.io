import { describe, it, expect } from 'vitest'

import HomePage from '@/views/pages/HomePage.vue'
import { mountWithRouter } from './mountWithRouter'

describe('HomePage', () => {
  it('renders every section the header links to', async () => {
    const wrapper = await mountWithRouter(HomePage)
    for (const id of ['hero', 'about', 'skills', 'work', 'experience', 'contact']) {
      expect(wrapper.find(`section#${id}`).exists()).toBe(true)
    }
  })

  it('introduces Bishwas with a Hire me email link', async () => {
    const wrapper = await mountWithRouter(HomePage)
    const hero = wrapper.find('#hero')
    expect(hero.text()).toContain("Hi, I'm Bishwas")
    const hire = hero.find('a[href^="mailto:"]')
    expect(hire.text()).toContain('Hire me')
  })

  it('shows seven skill cards and three featured projects', async () => {
    const wrapper = await mountWithRouter(HomePage)
    expect(wrapper.findAll('#skills [data-test="skill-card"]')).toHaveLength(7)
    expect(wrapper.findAll('#work [data-test="project-card"]')).toHaveLength(3)
    expect(wrapper.find('#work a[href="/projects"]').exists()).toBe(true)
  })

  it('lists experience, education and the AWS badge', async () => {
    const text = (await mountWithRouter(HomePage)).find('#experience').text()
    expect(text).toContain('Pathway Technologies and Services')
    expect(text).toContain('April 2022')
    expect(text).toContain('AWS Academy Graduate – Cloud Architecting')
    expect(text).toContain('Pulchowk Campus')
  })

  it('links to LinkedIn and GitLab from contact', async () => {
    const contact = (await mountWithRouter(HomePage)).find('#contact')
    expect(
      contact.find('a[href="https://www.linkedin.com/in/bishwas-dangol-5a8871212"]').exists(),
    ).toBe(true)
    expect(contact.find('a[href="https://gitlab.com/bishwas76"]').exists()).toBe(true)
  })

  it('never offers a CV download or claims a certification', async () => {
    const text = (await mountWithRouter(HomePage)).text()
    expect(text).not.toMatch(/Download CV|Certified/)
  })
})

describe('HomePage photo', () => {
  it('shows Bishwas’s photo in the hero', async () => {
    const img = (await mountWithRouter(HomePage)).find('#hero img')
    expect(img.attributes('src')).toBe('/images/profile.jpg')
    expect(img.attributes('alt')).toBe('Bishwas Dangol')
  })
})

describe('HomePage GitHub', () => {
  it('links to GitHub from contact', async () => {
    const contact = (await mountWithRouter(HomePage)).find('#contact')
    expect(contact.find('a[href="https://github.com/bishwas76"]').exists()).toBe(true)
  })
})
