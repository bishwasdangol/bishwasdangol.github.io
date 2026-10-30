import { describe, it, expect } from 'vitest'

import App from '@/App.vue'
import HomePage from '@/views/pages/HomePage.vue'
import ProjectsPage from '@/views/pages/ProjectsPage.vue'
import { publications } from '@/data/publications'
import { education } from '@/data/experience'
import { projects } from '@/data/projects'
import { mountWithRouter } from './mountWithRouter'

const PAPER_URL = 'https://www.nepjol.info/index.php/JACEM/article/view/93926'

describe('research data', () => {
  it('records the published JACEM paper', () => {
    expect(publications).toHaveLength(1)
    const paper = publications[0]!
    expect(paper.title).toBe(
      'Malaria Parasite Classification in Thin Blood Smears Based on CNN with SpinalNet and GAN',
    )
    expect(paper.authors).toEqual(['Bishwas Dangol', 'Sanjeeb Prasad Panday'])
    expect(paper.doi).toBe('10.3126/jacem.v12i01.93926')
    expect(paper.url).toBe(PAPER_URL)
    expect(paper.pages).toBe('131–149')
    expect(paper.published).toBe('2026-05-12')
  })

  it('adds the thesis as a research project from IOE Pulchowk', () => {
    const thesis = projects.find((p) => p.slug === 'malaria-xai-thesis')!
    expect(thesis.category).toBe('research')
    expect(thesis.organization).toMatch(/Pulchowk Campus/)
    expect(thesis.links?.[0]?.url).toBe(PAPER_URL)
    for (const p of projects.filter((p) => p.category !== 'research')) {
      expect(p.organization).toBe('Pathway Technologies and Services')
    }
  })

  it('links the MSc entry to the thesis', () => {
    expect(education.find((e) => e.degree.startsWith('Master'))?.thesisSlug).toBe(
      'malaria-xai-thesis',
    )
  })
})

describe('research on the site', () => {
  it('has a research section on the home page with the paper and thesis links', async () => {
    const research = (await mountWithRouter(HomePage)).find('section#research')
    expect(research.exists()).toBe(true)
    expect(research.text()).toContain('Journal of Advanced College of Engineering and Management')
    expect(research.find(`a[href="${PAPER_URL}"]`).text()).toContain('Read the paper')
    expect(research.find('a[href="/projects/malaria-xai-thesis"]').exists()).toBe(true)
  })

  it('links the MSc in the experience timeline to the thesis', async () => {
    const experience = (await mountWithRouter(HomePage)).find('#experience')
    expect(experience.find('a[href="/projects/malaria-xai-thesis"]').exists()).toBe(true)
  })

  it('filters to the research project', async () => {
    const page = await mountWithRouter(ProjectsPage, '/projects')
    const button = page.findAll('[data-test="filter"]').find((b) => b.text() === 'Research')!
    await button.trigger('click')
    expect(page.findAll('[data-test="project-card"]')).toHaveLength(1)
  })

  it('shows the thesis organisation and paper link on its detail page', async () => {
    const wrapper = await mountWithRouter(App, '/projects/malaria-xai-thesis')
    const main = wrapper.find('main')
    expect(main.text()).toContain('IOE Pulchowk Campus')
    expect(main.text()).not.toContain('Pathway Technologies and Services')
    expect(main.find(`a[href="${PAPER_URL}"]`).exists()).toBe(true)
  })
})
