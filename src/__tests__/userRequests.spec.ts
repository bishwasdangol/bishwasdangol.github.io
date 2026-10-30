import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { describe, it, expect } from 'vitest'

import HomePage from '@/views/pages/HomePage.vue'
import ProjectsPage from '@/views/pages/ProjectsPage.vue'
import { mountWithRouter } from './mountWithRouter'

const root = resolve(__dirname, '../..')

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) return name === '__tests__' ? [] : sourceFiles(path)
    return /\.(vue|ts|css)$/.test(name) ? [path] : []
  })
}

describe('accent colour', () => {
  it('uses no orange anywhere', () => {
    const offenders = [...sourceFiles(join(root, 'src')), join(root, 'index.html')].filter((file) =>
      /orange-|ff6b2b|ff8f5c|255 107 43/i.test(readFileSync(file, 'utf8')),
    )
    expect(offenders).toEqual([])
  })

  it('defines indigo as the accent', () => {
    const css = readFileSync(join(root, 'src/styles/main.css'), 'utf8')
    expect(css).toMatch(/--color-accent:\s*#4f46e5/i)
  })
})

describe('project cards', () => {
  it('show no cover panel in selected work', async () => {
    const work = (await mountWithRouter(HomePage)).find('#work')
    expect(work.findAll('[data-test="project-card"]').length).toBeGreaterThan(0)
    expect(work.find('[data-test="project-cover"]').exists()).toBe(false)
  })

  it('show no cover panel on the projects page', async () => {
    const page = await mountWithRouter(ProjectsPage, '/projects')
    expect(page.find('[data-test="project-cover"]').exists()).toBe(false)
  })
})

describe('browser tab icon', () => {
  it('uses the site’s own SVG icon instead of the Vue logo', () => {
    const html = readFileSync(join(root, 'index.html'), 'utf8')
    expect(html).toContain('href="/favicon.svg"')
    expect(existsSync(join(root, 'public/favicon.svg'))).toBe(true)
  })
})

describe('project detail page', () => {
  it('shows no cover panel', async () => {
    const { default: App } = await import('@/App.vue')
    const page = await mountWithRouter(App, '/projects/tt-bot')
    expect(page.find('h1').exists()).toBe(true)
    expect(page.find('[data-test="project-cover"]').exists()).toBe(false)
  })
})
