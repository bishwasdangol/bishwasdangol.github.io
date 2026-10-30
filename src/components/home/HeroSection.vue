<script setup lang="ts">
import AppIcon from '@/components/AppIcon.vue'
import BaseButton from '@/components/BaseButton.vue'
import ProfilePhoto from '@/components/ProfilePhoto.vue'
import { profile } from '@/data/profile'
import { projects } from '@/data/projects'
import { hireMeHref } from '@/composables/useMailto'

const stats = [
  { value: profile.yearsOfExperience, label: 'Years experience' },
  { value: String(projects.length), label: 'Projects' },
]
</script>

<template>
  <section
    id="hero"
    class="relative flex min-h-screen scroll-mt-20 items-center overflow-hidden pt-16"
  >
    <div
      data-test="hero-glow"
      class="pointer-events-none absolute top-1/4 right-0 hidden h-96 w-96 rounded-full bg-accent/10 blur-3xl md:block"
      aria-hidden="true"
    ></div>

    <div class="relative z-10 mx-auto w-full max-w-6xl px-6 py-24">
      <div class="grid items-center gap-12 md:grid-cols-2">
        <div>
          <p v-reveal class="mb-4 text-sm font-medium tracking-widest text-accent uppercase">
            {{ profile.title }}
          </p>
          <h1
            v-reveal="1"
            class="mb-6 font-display text-5xl leading-[1.05] font-bold tracking-tight text-zinc-900 md:text-6xl lg:text-7xl dark:text-white"
          >
            Hi, I'm <span class="text-accent">{{ profile.firstName }}</span>
          </h1>
          <p
            v-reveal="2"
            class="mb-10 max-w-md text-lg leading-relaxed font-light text-zinc-500 md:text-xl dark:text-zinc-400"
          >
            {{ profile.pitch }}
          </p>
          <div v-reveal="3" class="flex flex-wrap gap-4">
            <BaseButton :to="{ name: 'home', hash: '#work' }" variant="dark">
              View my work <AppIcon name="arrow-down" class="h-4 w-4" />
            </BaseButton>
            <BaseButton :href="hireMeHref" variant="outline">
              Hire me <AppIcon name="mail" class="h-4 w-4" />
            </BaseButton>
          </div>
          <dl
            v-reveal="4"
            class="mt-14 flex gap-10 border-t border-zinc-100 pt-8 dark:border-zinc-900"
          >
            <div v-for="stat in stats" :key="stat.label" class="flex flex-col-reverse">
              <dt class="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{{ stat.label }}</dt>
              <dd class="font-display text-3xl font-bold text-zinc-900 dark:text-white">
                {{ stat.value }}
              </dd>
            </div>
          </dl>
        </div>

        <div v-reveal="2" class="flex justify-center md:justify-end">
          <div class="relative h-72 w-72 md:h-80 md:w-80 lg:h-96 lg:w-96">
            <ProfilePhoto
              :photo="profile.photo"
              :initials="profile.initials"
              :alt="profile.name"
              class="h-full w-full rounded-3xl border border-zinc-200 dark:border-zinc-800"
            />
            <p
              class="absolute -bottom-4 -left-4 rounded-2xl bg-accent px-4 py-2.5 font-display text-sm font-bold text-white"
            >
              Open to opportunities
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
