<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import AppIcon from './AppIcon.vue'
import TagPill from './TagPill.vue'
import type { Project } from '@/models'

const props = defineProps<{ project: Project }>()

const to = computed(() => ({ name: 'project', params: { slug: props.project.slug } }))
</script>

<template>
  <article
    data-test="project-card"
    class="card-lift group flex h-full flex-col rounded-2xl border border-zinc-100 bg-white p-6 hover:border-accent dark:border-zinc-800 dark:bg-zinc-900"
  >
    <div class="mb-3 flex flex-wrap gap-2">
      <TagPill v-for="(tag, i) in project.tags" :key="tag" :label="tag" :accent="i === 0" />
    </div>
    <RouterLink :to="to">
      <h3
        class="mb-2 font-display text-lg font-bold text-zinc-900 transition-colors group-hover:text-accent dark:text-white"
      >
        {{ project.title }}
      </h3>
    </RouterLink>
    <p class="mb-5 flex-1 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
      {{ project.summary }}
    </p>
    <RouterLink
      :to="to"
      class="nav-link inline-flex items-center gap-1.5 self-start text-sm font-medium text-zinc-900 dark:text-white"
    >
      View project <AppIcon name="arrow-right" class="h-3.5 w-3.5" />
    </RouterLink>
  </article>
</template>
