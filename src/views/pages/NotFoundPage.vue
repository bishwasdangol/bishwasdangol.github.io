<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
</script>

<template>
  <section class="flex min-h-[70vh] items-center pt-16">
    <div class="mx-auto max-w-6xl px-6 py-24 text-center">
      <p class="mb-3 text-xs font-medium tracking-widest text-accent uppercase">404</p>
      <h1 class="mb-4 font-display text-5xl font-bold text-zinc-900 md:text-6xl dark:text-white">
        Page not found
      </h1>
      <p class="mx-auto mb-8 max-w-md text-zinc-500 dark:text-zinc-400">
        The page you're looking for doesn't exist or has moved.
      </p>
      <BaseButton :to="{ name: 'home' }" variant="dark">Back to home</BaseButton>
    </div>
  </section>
</template>
