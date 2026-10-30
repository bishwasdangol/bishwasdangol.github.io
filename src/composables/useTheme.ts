import { ref, type Ref } from 'vue'

const STORAGE_KEY = 'theme'

function readStoredTheme(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

function prefersDark(): boolean {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
}

function applyClass(dark: boolean): void {
  document.documentElement.classList.toggle('dark', dark)
}

// Shared across every component so the toggle and the page always agree.
const stored = readStoredTheme()
const isDark = ref(stored ? stored === 'dark' : prefersDark())
applyClass(isDark.value)

function toggle(): void {
  isDark.value = !isDark.value
  applyClass(isDark.value)
  try {
    localStorage.setItem(STORAGE_KEY, isDark.value ? 'dark' : 'light')
  } catch {
    // Storage blocked (e.g. private mode): the choice lasts for this visit only.
  }
}

export function useTheme(): { isDark: Ref<boolean>; toggle: () => void } {
  return { isDark, toggle }
}
