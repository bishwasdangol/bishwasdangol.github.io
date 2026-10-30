import { describe, it, expect } from 'vitest'
import type { RouteLocationNormalized } from 'vue-router'

import { scrollBehavior } from '@/router/routes'
import { createTestRouter } from './mountWithRouter'

describe('routes', () => {
  it('resolves a project slug to the project page', () => {
    const route = createTestRouter().resolve('/projects/tt-bot')
    expect(route.name).toBe('project')
    expect(route.params.slug).toBe('tt-bot')
  })

  it('resolves unknown paths to not-found', () => {
    expect(createTestRouter().resolve('/does/not/exist').name).toBe('not-found')
  })
})

describe('scrollBehavior', () => {
  const from = {} as RouteLocationNormalized

  it('scrolls to a hash below the fixed header', () => {
    const to = { hash: '#contact' } as RouteLocationNormalized
    expect(scrollBehavior(to, from, null)).toEqual({ el: '#contact', top: 80, behavior: 'smooth' })
  })

  it('restores a saved position on back/forward', () => {
    const to = { hash: '' } as RouteLocationNormalized
    expect(scrollBehavior(to, from, { left: 0, top: 500 })).toEqual({ left: 0, top: 500 })
  })

  it('goes to the top otherwise', () => {
    const to = { hash: '' } as RouteLocationNormalized
    expect(scrollBehavior(to, from, null)).toEqual({ top: 0 })
  })
})
