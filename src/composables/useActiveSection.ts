import { onMounted, onUnmounted, ref, type Ref } from 'vue'

// Tracks which home-page section is in view, for highlighting the header link.
export function useActiveSection(ids: string[], offset = 130): Ref<string> {
  const active = ref(ids[0] ?? '')

  const update = () => {
    const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 60
    if (atBottom) {
      active.value = ids[ids.length - 1] ?? ''
      return
    }
    let current = ''
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el && window.scrollY >= el.offsetTop - offset) current = id
    }
    active.value = current
  }

  onMounted(() => {
    update()
    window.addEventListener('scroll', update, { passive: true })
  })
  onUnmounted(() => window.removeEventListener('scroll', update))
  return active
}
