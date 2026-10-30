<script setup lang="ts">
import { reactive, ref } from 'vue'

import BaseButton from './BaseButton.vue'
import type { ContactFormValues } from '@/models'
import { profile } from '@/data/profile'
import { buildContactMailto, openMailto } from '@/composables/useMailto'

type RequiredField = 'name' | 'email' | 'message'

const values = reactive<ContactFormValues>({ name: '', email: '', subject: '', message: '' })
const errors = reactive<Partial<Record<RequiredField, string>>>({})

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(): boolean {
  errors.name = values.name.trim() ? undefined : 'Please enter your name.'
  errors.email = EMAIL_PATTERN.test(values.email.trim()) ? undefined : 'Please enter a valid email.'
  errors.message = values.message.trim() ? undefined : 'Please write a short message.'
  return !errors.name && !errors.email && !errors.message
}

// Visitors without a mail app see nothing happen, so always say what should have happened.
const handedOff = ref(false)

function onSubmit(): void {
  if (!validate()) return
  openMailto(buildContactMailto(values))
  handedOff.value = true
}

const fieldClass =
  'w-full rounded-xl border bg-zinc-800 px-4 py-3 text-sm text-white placeholder-zinc-500 transition-colors focus:border-accent focus:outline-none dark:bg-zinc-900'

function borderClass(field: RequiredField): string {
  return errors[field] ? 'border-red-400' : 'border-zinc-700'
}
</script>

<template>
  <form novalidate class="flex flex-col gap-4" @submit.prevent="onSubmit">
    <div class="grid gap-4 sm:grid-cols-2">
      <div>
        <label for="contact-name" class="mb-1.5 block text-xs font-medium text-zinc-400">
          Name <span aria-hidden="true">*</span>
        </label>
        <input
          id="contact-name"
          v-model="values.name"
          type="text"
          name="name"
          autocomplete="name"
          placeholder="Enter your name"
          required
          :class="[fieldClass, borderClass('name')]"
          :aria-invalid="errors.name ? 'true' : undefined"
          :aria-describedby="errors.name ? 'contact-name-error' : undefined"
          @input="errors.name = undefined"
        />
        <p
          v-if="errors.name"
          id="contact-name-error"
          data-test="error-name"
          class="mt-1.5 text-xs text-red-400"
        >
          {{ errors.name }}
        </p>
      </div>
      <div>
        <label for="contact-email" class="mb-1.5 block text-xs font-medium text-zinc-400">
          Email <span aria-hidden="true">*</span>
        </label>
        <input
          id="contact-email"
          v-model="values.email"
          type="email"
          name="email"
          autocomplete="email"
          placeholder="Enter your email address"
          required
          :class="[fieldClass, borderClass('email')]"
          :aria-invalid="errors.email ? 'true' : undefined"
          :aria-describedby="errors.email ? 'contact-email-error' : undefined"
          @input="errors.email = undefined"
        />
        <p
          v-if="errors.email"
          id="contact-email-error"
          data-test="error-email"
          class="mt-1.5 text-xs text-red-400"
        >
          {{ errors.email }}
        </p>
      </div>
    </div>

    <div>
      <label for="contact-subject" class="mb-1.5 block text-xs font-medium text-zinc-400"
        >Subject</label
      >
      <input
        id="contact-subject"
        v-model="values.subject"
        type="text"
        name="subject"
        placeholder="Enter a subject"
        :class="[fieldClass, 'border-zinc-700']"
      />
    </div>

    <div>
      <label for="contact-message" class="mb-1.5 block text-xs font-medium text-zinc-400">
        Message <span aria-hidden="true">*</span>
      </label>
      <textarea
        id="contact-message"
        v-model="values.message"
        name="message"
        rows="4"
        placeholder="Tell me about the role..."
        required
        :class="[fieldClass, borderClass('message'), 'resize-none']"
        :aria-invalid="errors.message ? 'true' : undefined"
        :aria-describedby="errors.message ? 'contact-message-error' : undefined"
        @input="errors.message = undefined"
      ></textarea>
      <p
        v-if="errors.message"
        id="contact-message-error"
        data-test="error-message"
        class="mt-1.5 text-xs text-red-400"
      >
        {{ errors.message }}
      </p>
    </div>

    <BaseButton type="submit" class="w-full">Send message →</BaseButton>
    <p class="text-center text-xs text-zinc-400">Opens your email app.</p>
    <p
      v-if="handedOff"
      data-test="mailto-status"
      aria-live="polite"
      class="rounded-xl border border-zinc-700 px-4 py-3 text-center text-sm text-zinc-300"
    >
      Your email app should open with the message ready. Nothing opened? Email me at
      <a :href="`mailto:${profile.email}`" class="font-medium text-white underline">{{
        profile.email
      }}</a>
    </p>
  </form>
</template>
