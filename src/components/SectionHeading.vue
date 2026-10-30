<script setup lang="ts">
withDefaults(defineProps<{ eyebrow: string; title: string; level?: 1 | 2 }>(), { level: 2 })
</script>

<template>
  <div class="mb-14 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
    <div>
      <p v-reveal class="mb-3 text-xs font-medium tracking-widest text-accent uppercase">
        {{ eyebrow }}
      </p>
      <component
        :is="level === 1 ? 'h1' : 'h2'"
        v-reveal="1"
        class="font-display font-bold text-zinc-900 dark:text-white"
        :class="level === 1 ? 'text-5xl leading-tight md:text-6xl' : 'text-4xl md:text-5xl'"
      >
        {{ title }}
      </component>
    </div>
    <slot name="action" />
  </div>
</template>
