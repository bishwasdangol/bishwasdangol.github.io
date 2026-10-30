<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import AppIcon from './AppIcon.vue'
import BaseButton from './BaseButton.vue'
import ThemeToggle from './ThemeToggle.vue'
import { navItems } from '@/data/navigation'
import { hireMeHref } from '@/composables/useMailto'
import { useActiveSection } from '@/composables/useActiveSection'
import { useScrolled } from '@/composables/useScrolled'

const route = useRoute()
const scrolled = useScrolled()
const menuOpen = ref(false)
const activeSection = useActiveSection(['hero', ...navItems.map((item) => item.sectionId)])

const isHome = computed(() => route.name === 'home')
const isProjectRoute = computed(() => route.name === 'projects' || route.name === 'project')

function isActive(sectionId: string): boolean {
  if (isHome.value) return activeSection.value === sectionId
  return sectionId === 'work' && isProjectRoute.value
}

// The router ignores a click on the hash it is already on, so scroll by hand in that case.
function onNavClick(sectionId: string): void {
  menuOpen.value = false
  if (isHome.value && route.hash === `#${sectionId}`) {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }
}

function onLogoClick(): void {
  menuOpen.value = false
  if (isHome.value && !route.hash) window.scrollTo({ top: 0, behavior: 'smooth' })
}

watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false
  },
)
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300"
    :class="
      scrolled || menuOpen
        ? 'border-zinc-100 bg-white/90 backdrop-blur-md dark:border-zinc-900 dark:bg-zinc-950/90'
        : 'border-transparent'
    "
  >
    <nav
      class="mx-auto flex h-16 max-w-6xl items-center justify-between px-6"
      aria-label="Main navigation"
    >
      <RouterLink
        :to="{ name: 'home' }"
        class="font-display text-xl font-bold tracking-tight"
        aria-label="Bishwas Dangol — home"
        @click="onLogoClick"
      >
        <span class="text-zinc-900 dark:text-white">bishwas</span><span class="text-accent">.</span>
      </RouterLink>

      <ul class="hidden items-center gap-8 text-sm md:flex">
        <li v-for="item in navItems" :key="item.sectionId">
          <RouterLink
            :to="{ name: 'home', hash: `#${item.sectionId}` }"
            class="nav-link transition-colors hover:text-zinc-900 dark:hover:text-white"
            :class="
              isActive(item.sectionId)
                ? 'is-active font-medium text-zinc-900 dark:text-white'
                : 'text-zinc-500 dark:text-zinc-400'
            "
            :aria-current="isActive(item.sectionId) ? 'true' : undefined"
            @click="onNavClick(item.sectionId)"
            >{{ item.label }}</RouterLink
          >
        </li>
      </ul>

      <div class="flex items-center gap-3">
        <ThemeToggle />
        <div class="hidden md:block">
          <BaseButton :href="hireMeHref" size="sm">
            Hire me <AppIcon name="arrow-right" class="h-3.5 w-3.5" />
          </BaseButton>
        </div>
        <button
          type="button"
          data-test="menu-toggle"
          class="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:hidden dark:border-zinc-800"
          :aria-expanded="menuOpen ? 'true' : 'false'"
          aria-controls="mobile-menu"
          :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
          @click="menuOpen = !menuOpen"
        >
          <AppIcon :name="menuOpen ? 'close' : 'menu'" class="h-4 w-4" />
        </button>
      </div>
    </nav>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-show="menuOpen"
        id="mobile-menu"
        class="border-t border-zinc-100 bg-white md:hidden dark:border-zinc-900 dark:bg-zinc-950"
      >
        <ul class="flex flex-col gap-4 px-6 py-5 text-sm font-medium">
          <li v-for="item in navItems" :key="item.sectionId">
            <RouterLink
              :to="{ name: 'home', hash: `#${item.sectionId}` }"
              data-test="mobile-link"
              class="block transition-colors hover:text-accent"
              :class="isActive(item.sectionId) ? 'text-accent' : 'text-zinc-700 dark:text-zinc-300'"
              @click="onNavClick(item.sectionId)"
              >{{ item.label }}</RouterLink
            >
          </li>
          <li class="border-t border-zinc-100 pt-3 dark:border-zinc-900">
            <BaseButton :href="hireMeHref" size="sm" @click="menuOpen = false"
              >Hire me →</BaseButton
            >
          </li>
        </ul>
      </div>
    </Transition>
  </header>
</template>
