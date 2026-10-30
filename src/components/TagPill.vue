<script setup lang="ts">
defineProps<{ label: string; accent?: boolean }>()
</script>

<template>
  <span
    class="rounded-full px-2.5 py-1 text-xs"
    :class="
      accent
        ? 'border border-indigo-200 bg-indigo-50 text-accent dark:border-zinc-700 dark:bg-zinc-800'
        : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
    "
    >{{ label }}</span
  >
</template>
