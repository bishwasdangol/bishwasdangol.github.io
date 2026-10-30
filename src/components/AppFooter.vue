<script setup lang="ts">
import AppIcon from './AppIcon.vue'
import { profile } from '@/data/profile'

const year = new Date().getFullYear()
const links = profile.socials.filter((s) => s.icon !== 'mail')
</script>

<template>
  <footer class="border-t border-zinc-100 dark:border-zinc-900">
    <div
      class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-center sm:flex-row sm:text-left"
    >
      <p class="text-sm text-zinc-500 dark:text-zinc-400">© {{ year }} {{ profile.name }}.</p>
      <ul class="flex items-center gap-3">
        <li v-for="link in links" :key="link.url">
          <a
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition-colors hover:border-accent hover:text-accent dark:border-zinc-800"
            :aria-label="link.label"
          >
            <AppIcon :name="link.icon" class="h-4 w-4" />
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>
