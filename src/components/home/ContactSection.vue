<script setup lang="ts">
import AppIcon from '@/components/AppIcon.vue'
import ContactForm from '@/components/ContactForm.vue'
import { profile } from '@/data/profile'
</script>

<template>
  <section id="contact" class="scroll-mt-20 py-24">
    <div class="mx-auto max-w-6xl px-6">
      <div class="relative overflow-hidden rounded-3xl bg-zinc-900 p-8 md:p-16 dark:bg-zinc-800">
        <div
          class="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
          aria-hidden="true"
        ></div>

        <div class="relative z-10 grid items-start gap-12 md:grid-cols-2">
          <div>
            <p v-reveal class="mb-3 text-xs font-medium tracking-widest text-accent uppercase">
              Get in touch
            </p>
            <h2
              v-reveal="1"
              class="mb-5 font-display text-4xl leading-tight font-bold text-white md:text-5xl"
            >
              Let's work<br />together
            </h2>
            <p v-reveal="2" class="mb-8 leading-relaxed text-zinc-400">
              I'm open to new software engineering roles. Tell me about the team and what you're
              building, and let's talk.
            </p>

            <ul v-reveal="3" class="flex flex-col gap-4">
              <li v-for="link in profile.socials" :key="link.url">
                <a
                  :href="link.url"
                  :target="link.url.startsWith('http') ? '_blank' : undefined"
                  :rel="link.url.startsWith('http') ? 'noopener noreferrer' : undefined"
                  class="group flex items-center gap-3 text-zinc-400 transition-colors hover:text-white"
                >
                  <span
                    class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-800 transition-colors group-hover:bg-accent/20 dark:bg-zinc-700"
                  >
                    <AppIcon :name="link.icon" class="h-4 w-4" />
                  </span>
                  <span class="text-sm break-all">{{ link.display }}</span>
                </a>
              </li>
            </ul>
          </div>

          <div v-reveal="2">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
