import { describe, it, expect } from 'vitest'

import { filterProjects, getProjectBySlug, getRelatedProjects } from '@/composables/useProjects'

describe('useProjects', () => {
  it('finds a project by slug', () => {
    expect(getProjectBySlug('tt-bot')?.title).toBeDefined()
    expect(getProjectBySlug('nope')).toBeUndefined()
  })

  it('filters by category', () => {
    expect(filterProjects('gis').map((p) => p.slug)).toEqual([
      'gis-land-inventory',
      'gis-performance',
    ])
    expect(filterProjects('all')).toHaveLength(10)
  })

  it('returns related projects, same category first, excluding the current one', () => {
    const current = getProjectBySlug('gis-land-inventory')!
    const related = getRelatedProjects(current)
    expect(related).toHaveLength(3)
    expect(related[0]?.slug).toBe('gis-performance')
    expect(related.map((p) => p.slug)).not.toContain('gis-land-inventory')
  })
})
