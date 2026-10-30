<script setup lang="ts">
import { profile } from '@/data/profile'

const facts = [
  { label: 'Based in', value: profile.location },
  { label: 'Experience', value: `${profile.yearsOfExperience} years` },
  {
    label: 'Languages',
    value: profile.languages.map((l) => `${l.name} (${l.level.toLowerCase()})`).join(', '),
  },
  { label: 'Interests', value: profile.interests.join(', ') },
]
</script>

<template>
  <section id="about" class="scroll-mt-20 bg-zinc-50 py-24 dark:bg-zinc-900/40">
    <div class="mx-auto max-w-6xl px-6">
      <div class="grid items-center gap-16 md:grid-cols-2">
        <div v-reveal class="order-2 md:order-1">
          <dl
            class="mx-auto max-w-sm divide-y divide-zinc-200 rounded-3xl border border-zinc-100 bg-white px-8 py-4 dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div v-for="fact in facts" :key="fact.label" class="py-4">
              <dt class="mb-1 text-xs tracking-widest text-zinc-400 uppercase">{{ fact.label }}</dt>
              <dd class="text-sm font-medium text-zinc-900 dark:text-white">{{ fact.value }}</dd>
            </div>
          </dl>
        </div>

        <div class="order-1 md:order-2">
          <p v-reveal class="mb-3 text-xs font-medium tracking-widest text-accent uppercase">
            About me
          </p>
          <h2
            v-reveal="1"
            class="mb-6 font-display text-4xl leading-tight font-bold text-zinc-900 md:text-5xl dark:text-white"
          >
            A bit about<br />who I am
          </h2>
          <p
            v-for="(paragraph, i) in profile.summary"
            :key="i"
            v-reveal="Math.min(i + 2, 4)"
            class="mb-4 leading-relaxed text-zinc-500 dark:text-zinc-400"
          >
            {{ paragraph }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
