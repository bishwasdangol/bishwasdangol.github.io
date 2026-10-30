import type { RouteRecordRaw, RouterScrollBehavior } from 'vue-router'

import DefaultLayout from '@/views/layouts/DefaultLayout.vue'
import HomePage from '@/views/pages/HomePage.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: HomePage,
        meta: { title: 'Bishwas Dangol — Software Engineer' },
      },
      {
        path: 'projects',
        name: 'projects',
        component: () => import('@/views/pages/ProjectsPage.vue'),
        meta: { title: 'Projects — Bishwas Dangol' },
      },
      {
        // The detail page sets its own title from the project.
        path: 'projects/:slug',
        name: 'project',
        component: () => import('@/views/pages/ProjectDetailPage.vue'),
        props: true,
      },
      {
        path: ':pathMatch(.*)*',
        name: 'not-found',
        component: () => import('@/views/pages/NotFoundPage.vue'),
        meta: { title: 'Page not found — Bishwas Dangol' },
      },
    ],
  },
]

// Hash links land below the fixed 64px header; page changes jump straight to the top.
export const scrollBehavior: RouterScrollBehavior = (to, _from, savedPosition) => {
  if (savedPosition) return savedPosition
  if (to.hash) {
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    return { el: to.hash, top: 80, behavior: reducedMotion ? 'auto' : 'smooth' }
  }
  return { top: 0 }
}
