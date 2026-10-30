import { describe, it, expect, vi, afterEach } from 'vitest'

// GitHub Pages serves a project repo under /<repo>/, so the photo must follow the build's base.
describe('profile photo under a sub-path', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
    vi.resetModules()
  })

  it('prefixes the photo with the site base path', async () => {
    vi.stubEnv('BASE_URL', '/bishwas-portfolio/')
    vi.resetModules()
    const { profile } = await import('@/data/profile')
    expect(profile.photo).toBe('/bishwas-portfolio/images/profile.jpg')
  })
})
