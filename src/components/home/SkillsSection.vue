<script setup lang="ts">
import AppIcon from '@/components/AppIcon.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import { skillGroups } from '@/data/skills'

// Spans keep the 7 cards a complete grid: 2+2+2+2 on md, 3+3+3 on lg.
function spanClass(index: number, highlighted?: boolean): string {
  if (highlighted) return 'md:col-span-2'
  return index === skillGroups.length - 1 ? 'lg:col-span-2' : ''
}
</script>

<template>
  <section id="skills" class="scroll-mt-20 py-24">
    <div class="mx-auto max-w-6xl px-6">
      <SectionHeading eyebrow="What I work with" title="Skills" />
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="(group, i) in skillGroups"
          :key="group.id"
          v-reveal="(i % 3) + 1"
          data-test="skill-card"
          class="card-lift group rounded-2xl border p-8 hover:border-accent"
          :class="[
            spanClass(i, group.highlighted),
            group.highlighted
              ? 'border-zinc-800 bg-zinc-900 dark:bg-zinc-800'
              : 'border-zinc-100 bg-white dark:border-zinc-800 dark:bg-zinc-900',
          ]"
        >
          <div
            class="mb-6 flex h-12 w-12 items-center justify-center rounded-xl transition-colors"
            :class="
              group.highlighted
                ? 'bg-zinc-800 group-hover:bg-accent/20 dark:bg-zinc-700'
                : 'bg-indigo-50 group-hover:bg-accent/10 dark:bg-zinc-800'
            "
          >
            <AppIcon :name="group.icon" class="h-6 w-6 text-accent" />
          </div>
          <h3
            class="mb-3 font-display text-xl font-bold"
            :class="group.highlighted ? 'text-white' : 'text-zinc-900 dark:text-white'"
          >
            {{ group.title }}
          </h3>
          <p
            class="mb-5 text-sm leading-relaxed"
            :class="group.highlighted ? 'text-zinc-400' : 'text-zinc-500 dark:text-zinc-400'"
          >
            {{ group.description }}
          </p>
          <ul class="flex flex-wrap gap-2">
            <li
              v-for="item in group.items"
              :key="item"
              class="rounded-full px-3 py-1 text-xs"
              :class="
                group.highlighted
                  ? 'bg-zinc-800 text-zinc-300 dark:bg-zinc-700'
                  : 'border border-zinc-200 text-zinc-600 dark:border-zinc-700 dark:text-zinc-400'
              "
            >
              {{ item }}
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>
