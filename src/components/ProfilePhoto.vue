<script setup lang="ts">
defineProps<{ photo?: string; initials: string; alt: string }>()
</script>

<template>
  <div class="overflow-hidden bg-zinc-200 dark:bg-zinc-800">
    <img v-if="photo" :src="photo" :alt="alt" class="block h-full w-full object-cover" />
    <div
      v-else
      role="img"
      :aria-label="alt"
      class="cover-dots flex h-full w-full items-center justify-center bg-indigo-50 dark:bg-zinc-900"
    >
      <span class="font-display text-7xl font-bold tracking-tight text-accent md:text-8xl">{{
        initials
      }}</span>
    </div>
  </div>
</template>
