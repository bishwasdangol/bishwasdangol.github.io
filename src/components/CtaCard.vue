<script setup lang="ts">
defineProps<{ eyebrow: string; title: string; text: string }>()
</script>

<template>
  <div
    class="relative overflow-hidden rounded-3xl bg-zinc-900 p-10 text-center md:p-14 dark:bg-zinc-800"
  >
    <div
      class="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
      aria-hidden="true"
    ></div>
    <div class="relative z-10">
      <p class="mb-4 text-xs font-medium tracking-widest text-accent uppercase">{{ eyebrow }}</p>
      <h2 class="mb-4 font-display text-3xl font-bold text-white md:text-4xl">{{ title }}</h2>
      <p class="mx-auto mb-8 max-w-md text-zinc-400">{{ text }}</p>
      <div class="flex flex-wrap justify-center gap-4">
        <slot />
      </div>
    </div>
  </div>
</template>
