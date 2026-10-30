<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { RouterLink } from 'vue-router'

import AppIcon from '@/components/AppIcon.vue'
import BaseButton from '@/components/BaseButton.vue'
import CtaCard from '@/components/CtaCard.vue'
import ProjectCard from '@/components/ProjectCard.vue'
import TagPill from '@/components/TagPill.vue'
import NotFoundPage from './NotFoundPage.vue'
import { projectCategories } from '@/data/projects'
import { getProjectBySlug, getRelatedProjects } from '@/composables/useProjects'
import { hireMeHref } from '@/composables/useMailto'
import { useReadingProgress } from '@/composables/useReadingProgress'

const props = defineProps<{ slug: string }>()

const project = computed(() => getProjectBySlug(props.slug))
const progress = useReadingProgress()

const categoryLabel = computed(
  () => projectCategories.find((c) => c.value === project.value?.category)?.label ?? '',
)
const sections = computed(
  () => project.value?.sections.filter((s) => s.paragraphs?.length || s.bullets?.length) ?? [],
)
const related = computed(() => (project.value ? getRelatedProjects(project.value) : []))
const meta = computed(() =>
  project.value
    ? [
        { label: 'Organisation', value: project.value.organization },
        { label: 'Role', value: project.value.role },
        { label: 'Domain', value: project.value.domain },
        { label: 'Stack', value: project.value.stack.join(', ') },
      ]
    : [],
)

watchEffect(() => {
  document.title = project.value
    ? `${project.value.title} — Bishwas Dangol`
    : 'Page not found — Bishwas Dangol'
})
</script>

<template>
  <NotFoundPage v-if="!project" />

  <template v-else>
    <div
      class="fixed top-0 left-0 z-[60] h-[3px] bg-accent transition-[width] duration-100"
      :style="{ width: `${progress}%` }"
      role="progressbar"
      aria-label="Reading progress"
      aria-valuemin="0"
      aria-valuemax="100"
      :aria-valuenow="progress"
    ></div>

    <article>
      <header class="mx-auto max-w-4xl px-6 pt-32 pb-10">
        <RouterLink
          :to="{ name: 'projects' }"
          class="mb-8 inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-accent dark:text-zinc-400"
        >
          <AppIcon name="arrow-left" class="h-4 w-4" /> Back to projects
        </RouterLink>

        <div class="mb-6 flex flex-wrap items-center gap-2">
          <TagPill :label="categoryLabel" accent />
          <TagPill v-for="tech in project.stack" :key="tech" :label="tech" />
        </div>

        <h1
          v-reveal
          class="mb-6 font-display text-4xl leading-tight font-bold text-zinc-900 md:text-5xl lg:text-6xl dark:text-white"
        >
          {{ project.title }}
        </h1>
        <p
          v-reveal="1"
          class="mb-10 max-w-2xl text-xl leading-relaxed text-zinc-500 dark:text-zinc-400"
        >
          {{ project.summary }}
        </p>

        <div v-if="project.links?.length" v-reveal="2" class="-mt-4 mb-10 flex flex-wrap gap-3">
          <BaseButton
            v-for="(link, i) in project.links"
            :key="link.url"
            :href="link.url"
            size="sm"
            :variant="i === 0 ? 'primary' : 'outline'"
          >
            {{ link.label }} <AppIcon name="external" class="h-3.5 w-3.5" />
          </BaseButton>
        </div>

        <dl
          v-reveal="2"
          class="grid grid-cols-2 gap-4 border-y border-zinc-100 py-8 md:grid-cols-4 dark:border-zinc-900"
        >
          <div v-for="item in meta" :key="item.label">
            <dt class="mb-1 text-xs tracking-widest text-zinc-400 uppercase">{{ item.label }}</dt>
            <dd class="text-sm font-medium text-zinc-900 dark:text-white">{{ item.value }}</dd>
          </div>
        </dl>
      </header>

      <div class="mx-auto max-w-4xl px-6 pt-4 pb-16">
        <div class="prose-cs max-w-3xl">
          <section v-for="section in sections" :key="section.heading">
            <h2 class="text-zinc-900 dark:text-white">{{ section.heading }}</h2>
            <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
            <ul v-if="section.bullets?.length">
              <li v-for="bullet in section.bullets" :key="bullet">{{ bullet }}</li>
            </ul>
          </section>
        </div>
      </div>
    </article>

    <section class="bg-zinc-50 py-16 dark:bg-zinc-900/50">
      <div class="mx-auto max-w-6xl px-6">
        <div class="mb-8 flex items-center justify-between">
          <h2 class="font-display text-2xl font-bold text-zinc-900 dark:text-white">
            More projects
          </h2>
          <RouterLink :to="{ name: 'projects' }" class="nav-link text-sm font-medium text-accent">
            View all →
          </RouterLink>
        </div>
        <div class="grid gap-6 md:grid-cols-3">
          <ProjectCard v-for="other in related" :key="other.slug" :project="other" />
        </div>
      </div>
    </section>

    <section class="py-24">
      <div class="mx-auto max-w-6xl px-6">
        <CtaCard
          eyebrow="Hiring?"
          title="Interested in working together?"
          text="I'm open to new software engineering roles. Send me an email and tell me about the team."
        >
          <BaseButton :href="hireMeHref"
            >Hire me <AppIcon name="arrow-right" class="h-4 w-4"
          /></BaseButton>
          <RouterLink
            :to="{ name: 'projects' }"
            class="inline-flex items-center px-4 py-3.5 text-sm font-medium text-zinc-300 transition-colors hover:text-white"
          >
            All projects →
          </RouterLink>
        </CtaCard>
      </div>
    </section>
  </template>
</template>
