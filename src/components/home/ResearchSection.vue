<script setup lang="ts">
import AppIcon from '@/components/AppIcon.vue'
import BaseButton from '@/components/BaseButton.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import TagPill from '@/components/TagPill.vue'
import { publications, researchHighlights } from '@/data/publications'
</script>

<template>
  <section id="research" class="scroll-mt-20 py-24">
    <div class="mx-auto max-w-6xl px-6">
      <SectionHeading eyebrow="Research" title="Published research" />

      <div class="grid gap-6 lg:grid-cols-5">
        <article
          v-for="paper in publications"
          :key="paper.doi"
          v-reveal="1"
          class="rounded-2xl border border-zinc-100 bg-zinc-50 p-8 lg:col-span-3 dark:border-zinc-800 dark:bg-zinc-900"
        >
          <p class="mb-3 text-xs font-medium tracking-widest text-accent uppercase">
            {{ paper.venue }} · {{ paper.volume }} ({{ paper.year }})
          </p>
          <h3
            class="mb-3 font-display text-2xl leading-snug font-bold text-zinc-900 dark:text-white"
          >
            {{ paper.title }}
          </h3>
          <p class="mb-4 text-sm text-zinc-600 dark:text-zinc-300">
            {{ paper.authors.join(', ') }}
          </p>
          <p class="mb-6 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            {{ paper.summary }}
          </p>
          <div class="mb-8 flex flex-wrap gap-2">
            <TagPill v-for="keyword in paper.keywords" :key="keyword" :label="keyword" />
          </div>
          <div class="flex flex-wrap items-center gap-3">
            <BaseButton :href="paper.url" size="sm">
              Read the paper <AppIcon name="external" class="h-3.5 w-3.5" />
            </BaseButton>
            <BaseButton
              v-if="paper.projectSlug"
              :to="{ name: 'project', params: { slug: paper.projectSlug } }"
              size="sm"
              variant="outline"
            >
              Thesis details
            </BaseButton>
          </div>
          <p class="mt-5 text-xs text-zinc-500 dark:text-zinc-400">
            DOI:
            <a
              :href="`https://doi.org/${paper.doi}`"
              target="_blank"
              rel="noopener noreferrer"
              class="underline-offset-2 hover:text-accent hover:underline"
              >{{ paper.doi }}</a
            >
            · pp. {{ paper.pages }}
          </p>
        </article>

        <dl class="grid grid-cols-2 gap-4 lg:col-span-2">
          <div
            v-for="(item, i) in researchHighlights"
            :key="item.label"
            v-reveal="(i % 2) + 2"
            class="flex flex-col-reverse justify-center rounded-2xl border-l-4 border-accent bg-zinc-50 p-5 dark:bg-zinc-900"
          >
            <dt class="mt-2 text-xs leading-snug text-zinc-500 dark:text-zinc-400">
              {{ item.label }}
            </dt>
            <dd class="font-display text-3xl font-bold text-zinc-900 dark:text-white">
              {{ item.value }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>
