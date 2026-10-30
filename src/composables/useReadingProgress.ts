import { onMounted, onUnmounted, ref, type Ref } from 'vue'

export function useReadingProgress(): Ref<number> {
  const progress = ref(0)
  const update = () => {
    const scrollable = document.body.scrollHeight - window.innerHeight
    progress.value =
      scrollable > 0 ? Math.min(100, Math.round((window.scrollY / scrollable) * 100)) : 0
  }
  onMounted(() => {
    update()
    window.addEventListener('scroll', update, { passive: true })
  })
  onUnmounted(() => window.removeEventListener('scroll', update))
  return progress
}
