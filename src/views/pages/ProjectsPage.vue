<script setup lang="ts">
import { computed, ref } from 'vue'

import AppIcon from '@/components/AppIcon.vue'
import BaseButton from '@/components/BaseButton.vue'
import CtaCard from '@/components/CtaCard.vue'
import ProjectCard from '@/components/ProjectCard.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import type { ProjectCategoryOption } from '@/models'
import { projectCategories, projects } from '@/data/projects'
import { filterProjects } from '@/composables/useProjects'
import { hireMeHref } from '@/composables/useMailto'

const filter = ref<ProjectCategoryOption['value']>('all')
const visibleProjects = computed(() => filterProjects(filter.value))

function optionLabel(option: ProjectCategoryOption): string {
  return option.value === 'all' ? `${option.label} (${projects.length})` : option.label
}
</script>

<template>
  <section class="relative overflow-hidden pt-36 pb-12">
    <div
      class="pointer-events-none absolute top-0 right-0 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
      aria-hidden="true"
    ></div>
    <div class="relative z-10 mx-auto max-w-6xl px-6">
      <SectionHeading eyebrow="Portfolio" title="All Projects" :level="1" />
      <p
        v-reveal="2"
        class="-mt-10 mb-8 max-w-xl text-lg leading-relaxed text-zinc-500 dark:text-zinc-400"
      >
        Systems I've designed and built at Pathway Technologies and Services, plus my MSc research,
        from AI assistants and real-time platforms to GIS, integrations and medical imaging.
      </p>
      <div v-reveal="3" class="flex flex-wrap gap-2" role="group" aria-label="Filter projects">
        <button
          v-for="option in projectCategories"
          :key="option.value"
          type="button"
          data-test="filter"
          class="rounded-full border px-4 py-1.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          :class="
            filter === option.value
              ? 'border-accent bg-accent text-white'
              : 'border-zinc-200 bg-white text-zinc-600 hover:border-accent dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400'
          "
          :aria-pressed="filter === option.value ? 'true' : 'false'"
          @click="filter = option.value"
        >
          {{ optionLabel(option) }}
        </button>
      </div>
    </div>
  </section>

  <section class="pb-24">
    <div class="mx-auto max-w-6xl px-6">
      <TransitionGroup
        tag="div"
        class="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-2"
      >
        <ProjectCard v-for="project in visibleProjects" :key="project.slug" :project="project" />
      </TransitionGroup>
    </div>
  </section>

  <section class="pb-24">
    <div class="mx-auto max-w-6xl px-6">
      <CtaCard
        eyebrow="Hiring?"
        title="Let's build something together"
        text="I'm open to new software engineering roles. Send me an email and tell me about the team."
      >
        <BaseButton :href="hireMeHref"
          >Hire me <AppIcon name="arrow-right" class="h-4 w-4"
        /></BaseButton>
      </CtaCard>
    </div>
  </section>
</template>
