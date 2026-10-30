<script setup lang="ts">
import AppIcon from './AppIcon.vue'
import { useTheme } from '@/composables/useTheme'

const { isDark, toggle } = useTheme()
</script>

<template>
  <button
    type="button"
    class="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 transition-colors hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:border-zinc-800 dark:hover:bg-zinc-800"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="toggle"
  >
    <AppIcon :name="isDark ? 'sun' : 'moon'" class="h-4 w-4" />
  </button>
</template>
