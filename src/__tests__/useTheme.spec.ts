import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

async function freshUseTheme() {
  vi.resetModules()
  const mod = await import('@/composables/useTheme')
  return mod.useTheme
}

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('starts dark when dark is stored and applies the class', async () => {
    localStorage.setItem('theme', 'dark')
    const { isDark } = (await freshUseTheme())()
    expect(isDark.value).toBe(true)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('toggling persists the choice and updates the class', async () => {
    localStorage.setItem('theme', 'dark')
    const { isDark, toggle } = (await freshUseTheme())()
    toggle()
    expect(isDark.value).toBe(false)
    expect(localStorage.getItem('theme')).toBe('light')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('still works when storage is blocked', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    const useTheme = await freshUseTheme()
    const { isDark, toggle } = useTheme()
    const before = isDark.value
    expect(() => toggle()).not.toThrow()
    expect(isDark.value).toBe(!before)
  })
})
