<script setup lang="ts">
import { RouterLink } from 'vue-router'

import ProjectCard from '@/components/ProjectCard.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import { projects } from '@/data/projects'

const featured = projects.filter((p) => p.featured)
</script>

<template>
  <section id="work" class="scroll-mt-20 bg-zinc-50 py-24 dark:bg-zinc-900/40">
    <div class="mx-auto max-w-6xl px-6">
      <SectionHeading eyebrow="Portfolio" title="Selected work">
        <template #action>
          <RouterLink
            v-reveal="1"
            :to="{ name: 'projects' }"
            class="nav-link self-start text-sm font-medium text-zinc-500 transition-colors hover:text-accent sm:self-auto dark:text-zinc-400"
          >
            All projects →
          </RouterLink>
        </template>
      </SectionHeading>
      <div class="grid gap-6 md:grid-cols-3">
        <div v-for="(project, i) in featured" :key="project.slug" v-reveal="i + 1">
          <ProjectCard :project="project" />
        </div>
      </div>
    </div>
  </section>
</template>
