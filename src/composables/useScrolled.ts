import { onMounted, onUnmounted, ref, type Ref } from 'vue'

export function useScrolled(threshold = 20): Ref<boolean> {
  const scrolled = ref(false)
  const update = () => {
    scrolled.value = window.scrollY > threshold
  }
  onMounted(() => {
    update()
    window.addEventListener('scroll', update, { passive: true })
  })
  onUnmounted(() => window.removeEventListener('scroll', update))
  return scrolled
}
