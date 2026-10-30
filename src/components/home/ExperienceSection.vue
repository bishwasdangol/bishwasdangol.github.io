<script setup lang="ts">
import { RouterLink } from 'vue-router'

import AppIcon from '@/components/AppIcon.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import { certifications, education, experiences } from '@/data/experience'
import { getProjectBySlug } from '@/composables/useProjects'

function projectTitle(slug: string): string {
  return getProjectBySlug(slug)?.title ?? slug
}
</script>

<template>
  <section id="experience" class="scroll-mt-20 bg-zinc-50 py-24 dark:bg-zinc-900/40">
    <div class="mx-auto max-w-6xl px-6">
      <SectionHeading eyebrow="Experience" title="Work & education" />

      <div class="grid gap-6 lg:grid-cols-5">
        <article
          v-for="job in experiences"
          :key="job.company"
          v-reveal="1"
          class="rounded-2xl border border-zinc-100 bg-white p-7 lg:col-span-3 dark:border-zinc-800 dark:bg-zinc-900"
        >
          <div class="mb-8 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 class="font-display text-xl font-bold text-zinc-900 dark:text-white">
                {{ job.role }}
              </h3>
              <p class="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                {{ job.company }} · {{ job.location }}
              </p>
            </div>
            <span
              class="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs text-accent dark:border-zinc-700 dark:bg-zinc-800"
              >{{ job.start }} – {{ job.end }}</span
            >
          </div>

          <ol class="space-y-6">
            <li v-for="(area, i) in job.areas" :key="area.title" class="flex gap-4">
              <span
                class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent font-display text-sm font-bold text-white"
                >{{ i + 1 }}</span
              >
              <div class="pt-1">
                <p class="font-display font-bold text-zinc-900 dark:text-white">{{ area.title }}</p>
                <ul v-if="area.bullets" class="mt-2 space-y-1.5">
                  <li
                    v-for="bullet in area.bullets"
                    :key="bullet"
                    class="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400"
                  >
                    {{ bullet }}
                  </li>
                </ul>
                <ul v-if="area.projectSlugs" class="mt-3 flex flex-wrap gap-2">
                  <li v-for="slug in area.projectSlugs" :key="slug">
                    <RouterLink
                      :to="{ name: 'project', params: { slug } }"
                      class="inline-block rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-600 transition-colors hover:border-accent hover:text-accent dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400"
                      >{{ projectTitle(slug) }}</RouterLink
                    >
                  </li>
                </ul>
              </div>
            </li>
          </ol>
        </article>

        <div class="flex flex-col gap-6 lg:col-span-2">
          <article
            v-for="(degree, i) in education"
            :key="degree.degree"
            v-reveal="i + 2"
            class="rounded-2xl border border-zinc-100 bg-white p-7 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <p class="mb-2 text-xs tracking-widest text-zinc-400 uppercase">
              {{ degree.start }} – {{ degree.end }}
            </p>
            <h3 class="font-display text-lg font-bold text-zinc-900 dark:text-white">
              {{ degree.degree }}
            </h3>
            <p v-if="degree.specialization" class="mt-1 text-sm text-accent">
              {{ degree.specialization }}
            </p>
            <p class="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{{ degree.institution }}</p>
            <RouterLink
              v-if="degree.thesisSlug"
              :to="{ name: 'project', params: { slug: degree.thesisSlug } }"
              class="mt-3 inline-block text-sm font-medium text-accent hover:underline"
            >
              Thesis: {{ projectTitle(degree.thesisSlug) }} →
            </RouterLink>
          </article>

          <a
            v-for="cert in certifications"
            :key="cert.name"
            v-reveal="4"
            :href="cert.url"
            target="_blank"
            rel="noopener noreferrer"
            class="group rounded-2xl border border-zinc-100 bg-white p-7 transition-colors hover:border-accent dark:border-zinc-800 dark:bg-zinc-900"
          >
            <p class="mb-2 text-xs tracking-widest text-zinc-400 uppercase">{{ cert.issuer }}</p>
            <h3
              class="flex items-start justify-between gap-3 font-display text-lg font-bold text-zinc-900 transition-colors group-hover:text-accent dark:text-white"
            >
              {{ cert.name }}
              <AppIcon name="external" class="mt-1 h-4 w-4" />
            </h3>
            <p class="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Training badge · view on Credly
            </p>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
