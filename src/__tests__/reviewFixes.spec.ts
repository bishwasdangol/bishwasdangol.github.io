import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, it, expect, afterEach, vi } from 'vitest'
import type { RouteLocationNormalized } from 'vue-router'

import HeroSection from '@/components/home/HeroSection.vue'
import { skillGroups } from '@/data/skills'
import { scrollBehavior } from '@/router/routes'
import { mountWithRouter } from './mountWithRouter'

describe('review fixes', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('keeps the hero glow off phones, where it sits behind the buttons', async () => {
    const glow = (await mountWithRouter(HeroSection)).find('[data-test="hero-glow"]')
    expect(glow.classes()).toContain('hidden')
    expect(glow.classes()).toContain('md:block')
  })

  it('does not force smooth scrolling on every route change', () => {
    const css = readFileSync(resolve(__dirname, '../styles/main.css'), 'utf8')
    expect(css).not.toMatch(/scroll-behavior:\s*smooth/)
  })

  it('jumps instead of animating hash scrolls when reduced motion is preferred', () => {
    vi.stubGlobal('matchMedia', (query: string) => ({ matches: query.includes('reduce') }))
    const to = { hash: '#contact' } as RouteLocationNormalized
    expect(scrollBehavior(to, {} as RouteLocationNormalized, null)).toEqual({
      el: '#contact',
      top: 80,
      behavior: 'auto',
    })
  })

  it('labels cloud services as concepts, as the CV does', () => {
    const cloud = skillGroups.find((g) => g.id === 'cloud')!
    expect(cloud.items.join(' ')).toMatch(/concepts/i)
  })
})
