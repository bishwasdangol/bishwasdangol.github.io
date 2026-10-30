<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, type RouteLocationRaw } from 'vue-router'

const props = withDefaults(
  defineProps<{
    to?: RouteLocationRaw
    href?: string
    variant?: 'primary' | 'dark' | 'outline'
    size?: 'sm' | 'md'
    type?: 'button' | 'submit'
  }>(),
  { to: undefined, href: undefined, variant: 'primary', size: 'md', type: 'button' },
)

// Flat by design: colour change on hover only, no shadow, glow or shine effect.
const variants = {
  primary: 'bg-accent text-white hover:bg-accent-light',
  dark: 'bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200',
  outline:
    'border border-zinc-300 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900',
}

const sizes = {
  sm: 'px-5 py-2 text-sm',
  md: 'px-7 py-3.5 text-sm',
}

const classes = computed(() => [
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
  variants[props.variant],
  sizes[props.size],
])

const isExternal = computed(() => props.href?.startsWith('http') ?? false)
</script>

<template>
  <RouterLink v-if="to" :to="to" :class="classes"><slot /></RouterLink>
  <a
    v-else-if="href"
    :href="href"
    :class="classes"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
    ><slot
  /></a>
  <button v-else :type="type" :class="classes"><slot /></button>
</template>
