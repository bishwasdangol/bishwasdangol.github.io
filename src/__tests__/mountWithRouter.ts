import type { Component } from 'vue'
import { flushPromises, mount, type MountingOptions, type VueWrapper } from '@vue/test-utils'
import { createMemoryHistory, createRouter, type Router } from 'vue-router'

import { routes } from '@/router/routes'
import { vReveal } from '@/composables/useReveal'

export function createTestRouter(): Router {
  return createRouter({ history: createMemoryHistory(), routes })
}

export async function mountWithRouter(
  component: Component,
  path = '/',
  options: MountingOptions<Record<string, unknown>> = {},
): Promise<VueWrapper> {
  const router = createTestRouter()
  await router.push(path)
  await router.isReady()
  const wrapper = mount(component, {
    ...options,
    global: { plugins: [router], directives: { reveal: vReveal }, ...options.global },
  })
  await flushPromises()
  return wrapper
}
