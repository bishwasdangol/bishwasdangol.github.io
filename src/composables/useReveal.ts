import type { Directive } from 'vue'

let observer: IntersectionObserver | undefined

function getObserver(): IntersectionObserver {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('in')
        observer?.unobserve(entry.target)
      }
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
  )
  return observer
}

// v-reveal fades an element in when it scrolls into view; v-reveal="2" adds a stagger delay.
export const vReveal: Directive<HTMLElement, number | undefined> = {
  mounted(el, { value }) {
    el.classList.add('reveal')
    if (value) el.classList.add(`d${value}`)
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (typeof IntersectionObserver === 'undefined' || reducedMotion) {
      el.classList.add('in')
      return
    }
    getObserver().observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}
