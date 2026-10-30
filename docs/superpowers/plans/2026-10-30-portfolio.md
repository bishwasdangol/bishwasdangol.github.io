# Bishwas Dangol Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Folio template as a Vue 3 + TypeScript portfolio for Bishwas Dangol, with all content from his CV.

**Architecture:** Typed static content (`src/data`, interfaces in `src/models`) feeds Vue SFCs. One layout
(header + footer) wraps three pages: Home (anchored sections), Projects (filterable grid) and Project
detail (case-study layout). Tailwind v4 provides styling. Small composables and a `v-reveal` directive
replace Alpine.js behaviour.

**Tech Stack:** Vue 3.5, TypeScript 6, Vite 8.3, Vue Router 5.4, Pinia 4 (kept, unused), Tailwind CSS
4.3 via `@tailwindcss/vite`, Vitest 4 + jsdom + @vue/test-utils, pnpm.

**Spec:** `docs/superpowers/specs/2026-10-30-portfolio-design.md`

The project is **not a git repository**, so this plan has no commit steps. Do not run `git init`
unless Bishwas asks.

## Global Constraints

- All TypeScript interfaces/types live in `src/models`; data in `src/data` only.
- Buttons: no `shadow-*`, no `ring-*` glow, no coloured blur behind them, no shine-sweep pseudo
  element. Hover = colour change only. Focus = `focus-visible:outline-2 outline-offset-2 outline-accent`.
- Copy uses only CV facts. Allowed numbers: `4+` years, `80%` accuracy, role/degree dates.
- Never on the site: phone number, home address ("Mehepi", "Rayamajhi"), "Download CV", "Eliott",
  "lorem", "AWS Certified".
- AWS wording, verbatim: `AWS Academy Graduate – Cloud Architecting`.
- Hire-me link: `mailto:bishwasdangol1@gmail.com?subject=Job%20opportunity%20for%20Bishwas%20Dangol`.
- Accent `#ff6b2b`, accent-light `#ff8f5c`; fonts PT Sans (display) + DM Sans (body).
- Dark mode: `dark` class on `<html>`, `localStorage` key `theme` (`'dark' | 'light'`), default from
  `prefers-color-scheme`.
- Prettier style: no semicolons, single quotes, width 100. `<script setup lang="ts">` in every SFC.
- `pnpm build`, `pnpm lint`, `pnpm test:unit --run` must pass at the end of every task.

## Review Focus

1. Reloading `/projects/<slug>` directly on a static host → page loads (needs `dist/404.html` and
   `public/_redirects`). Pinned in Task 1 step 5.
2. Header link from `/projects` to `/#contact` → lands on the section below the fixed header, not
   under it. Pinned in Task 4 (`scrollBehavior` test) and `scroll-mt-20` on every section (Task 5).
3. Contact message containing `&`, `?`, `#`, newlines or Nepali text → arrives intact in the email
   app. Pinned in Task 3 (`buildMailto` test).
4. Browser with blocked storage (private mode, `localStorage` throws) → page renders, toggle still
   works for the session. Pinned in Task 3 (`useTheme` test).
5. Mobile menu open, user taps a link → menu closes and the page scrolls. Pinned in Task 4
   (`AppHeader` test).

---

### Task 1: Tooling, global styles, document shell

**Files:**
- Modify: `package.json` (dev deps), `vite.config.ts`, `index.html`, `src/main.ts`, `src/App.vue`
- Create: `src/styles/main.css`, `public/_redirects`
- Delete: `src/stores/counter.ts`

**Interfaces:**
- Produces: Tailwind utilities incl. `font-display`, `font-body`, `bg-accent`, `text-accent`,
  `bg-accent-light`, `dark:` variant; global classes `.reveal`, `.reveal.in`, `.d1`–`.d4`, `.prose-cs`.

- [ ] **Step 1:** `pnpm add -D tailwindcss@^4.3.3 @tailwindcss/vite@^4.3.3`
- [ ] **Step 2:** `vite.config.ts`: add `tailwindcss()` to plugins, plus an inline plugin
  `spaFallback` (`apply: 'build'`, `closeBundle`) that copies `dist/index.html` to `dist/404.html`
  with `node:fs` `copyFileSync` (use the resolved `outDir` from `configResolved`).
- [ ] **Step 3:** `src/styles/main.css`:
  `@import 'tailwindcss';`, `@custom-variant dark (&:where(.dark, .dark *));`, `@theme` with
  `--font-display: 'PT Sans', sans-serif; --font-body: 'DM Sans', sans-serif;
  --color-accent: #ff6b2b; --color-accent-light: #ff8f5c;`. Base layer: body `font-body`,
  headings `font-display`, background/colour transition, noise overlay `body::before` (copy the
  template's SVG data URI, opacity .4, `pointer-events: none`), accent scrollbar. Components
  layer: `.reveal` (opacity 0, translateY 24px, .6s ease) / `.reveal.in` (visible), `.d1`–`.d4`
  delays (.08s steps); `@media (prefers-reduced-motion: reduce)` makes `.reveal` visible with no
  transition. `.prose-cs` styles copied from `case-study.html` (h2, h3 accent, p, ul, li,
  blockquote, dark variants via `.dark .prose-cs …`).
- [ ] **Step 4:** `index.html`: `lang="en"`, title `Bishwas Dangol — Software Engineer`, meta
  description (from spec pitch), `og:title`, `og:description`, `og:type=website` (no `og:url`),
  Google Fonts preconnect + stylesheet link copied from the template, and an inline `<script>`
  before the app that adds `dark` to `<html>` when `localStorage.theme === 'dark'` or (no stored
  theme and `prefers-color-scheme: dark`), wrapped in try/catch (prevents a light flash).
  `public/_redirects`: `/* /index.html 200`. `src/main.ts`: import `./styles/main.css`.
  `src/App.vue`: just `<RouterView />`. Delete `src/stores/counter.ts`; delete
  `src/__tests__/App.spec.ts` (replaced in Task 4).
- [ ] **Step 5: Verify**
  Run: `pnpm build && ls dist/404.html dist/_redirects`
  Expected: build succeeds, both files listed.

---

### Task 2: Models and content data

**Files:**
- Create: `src/models/{profile,skill,project,experience,navigation,contact,icon,index}.ts`
- Create: `src/data/{profile,skills,projects,experience,navigation}.ts`
- Test: `src/__tests__/data.spec.ts`

**Interfaces (Produces — exact):**

```ts
// src/models/icon.ts
export type IconName =
  | 'arrow-right' | 'arrow-left' | 'arrow-down' | 'moon' | 'sun' | 'menu' | 'close'
  | 'mail' | 'linkedin' | 'gitlab' | 'external'
  | 'server' | 'layout' | 'database' | 'api' | 'container' | 'cloud' | 'sparkles'
  | 'map' | 'workflow' | 'bell' | 'plane' | 'chart' | 'qr' | 'chat'

// src/models/profile.ts
export interface SocialLink { label: string; display: string; url: string; icon: IconName }
export interface Language { name: string; level: string }
export interface Profile {
  name: string; firstName: string; initials: string; title: string; location: string
  email: string; pitch: string; summary: string[]; photo?: string; yearsOfExperience: string
  languages: Language[]; interests: string[]; socials: SocialLink[]
}

// src/models/skill.ts
export interface SkillGroup {
  id: string; title: string; description: string; items: string[]; icon: IconName; highlighted?: boolean
}

// src/models/project.ts
export type ProjectCategory = 'ai' | 'gis' | 'platform' | 'systems'
export interface ProjectCategoryOption { value: ProjectCategory | 'all'; label: string }
export interface ProjectSection { heading: string; paragraphs?: string[]; bullets?: string[] }
export interface Project {
  slug: string; title: string; category: ProjectCategory; summary: string; role: string
  domain: string; tags: string[]; stack: string[]; icon: IconName; featured?: boolean
  image?: string; sections: ProjectSection[]
}

// src/models/experience.ts
export interface ExperienceArea { title: string; projectSlugs?: string[]; bullets?: string[] }
export interface Experience {
  role: string; company: string; location: string; start: string; end: string; areas: ExperienceArea[]
}
export interface Education { degree: string; specialization?: string; institution: string; start: string; end: string }
export interface Certification { name: string; issuer: string; url: string }

// src/models/navigation.ts
export interface NavItem { label: string; sectionId: string }

// src/models/contact.ts
export interface ContactFormValues { name: string; email: string; subject: string; message: string }
```

`src/models/index.ts` re-exports all types (`export type * from './…'`).

Data exports: `profile: Profile` (`data/profile.ts`), `skillGroups: SkillGroup[]` (7 groups, spec
Skills list, Backend `highlighted: true`), `projects: Project[]` (9, spec Projects table, slugs
verbatim; `featured: true` on `tt-bot`, `crop-health-consultation`, `airline-api-integration`),
`projectCategories: ProjectCategoryOption[]` (`all`→`All`, `ai`→`AI & ML`, `gis`→`GIS`,
`platform`→`Web platforms`, `systems`→`Backend systems`), `experiences: Experience[]`,
`education: Education[]`, `certifications: Certification[]` (`data/experience.ts`),
`navItems: NavItem[]` = About/about, Skills/skills, Work/work, Experience/experience,
Contact/contact. Project prose: expand each CV bullet (`pdftotext "/home/pathway/Documents/Bishwas CV.pdf" -`)
into 2–4 sections ("Overview", "What I built", "How it works", "Outcome") — only CV facts; omit a
section rather than pad it. `profile.socials`: Email (`mailto:`), LinkedIn, GitLab URLs from spec.

- [ ] **Step 1: Write the failing test** `src/__tests__/data.spec.ts`:
  - `project slugs are unique` — `new Set(projects.map(p => p.slug)).size === projects.length`, and
    `projects.length === 9`.
  - `every project category has a filter option` — each `p.category` is in
    `projectCategories.map(c => c.value)`; and each non-`all` option has ≥1 project.
  - `exactly three featured projects` — slugs equal
    `['tt-bot', 'crop-health-consultation', 'airline-api-integration']` (order-insensitive).
  - `experience areas link to real projects` — every `projectSlugs` entry exists in `projects`.
  - `no forbidden content` — `JSON.stringify({ profile, skillGroups, projects, experiences,
    education, certifications })` does not match
    `/9843787528|Mehepi|Rayamajhi|Eliott|lorem|AWS Certified|Download CV/i`.
  - `AWS wording` — `certifications[0].name === 'AWS Academy Graduate – Cloud Architecting'`.
- [ ] **Step 2:** `pnpm test:unit --run src/__tests__/data.spec.ts` → FAIL (modules missing).
- [ ] **Step 3:** Write the models and data files as specified above.
- [ ] **Step 4:** Same command → PASS. Then `pnpm type-check` → no errors.

---

### Task 3: Composables and the reveal directive

**Files:**
- Create: `src/composables/{useMailto,useTheme,useScrolled,useActiveSection,useReadingProgress,useProjects,useReveal}.ts`
- Test: `src/__tests__/useMailto.spec.ts`, `src/__tests__/useTheme.spec.ts`, `src/__tests__/useProjects.spec.ts`

**Interfaces (Produces — exact):**
- `useMailto.ts`: `buildMailto(o: { to: string; subject?: string; body?: string }): string`;
  `HIRE_ME_SUBJECT = 'Job opportunity for Bishwas Dangol'`; `hireMeHref: string`
  (= `buildMailto({ to: profile.email, subject: HIRE_ME_SUBJECT })`);
  `buildContactMailto(v: ContactFormValues): string` — subject `v.subject.trim()` or
  `` `Portfolio enquiry from ${v.name.trim()}` ``; body `` `${v.message.trim()}\n\n— ${v.name.trim()} <${v.email.trim()}>` ``;
  `openMailto(url: string): void` (sets `window.location.href`).
- `useTheme.ts`: `useTheme(): { isDark: Ref<boolean>; toggle: () => void }` — module-level shared
  state, initialised once from storage/media query, applies `dark` class on `<html>`, persists on
  change. All `localStorage` and `matchMedia` access guarded (try/catch / optional call).
- `useScrolled(threshold = 20): Ref<boolean>`; `useActiveSection(ids: string[], offset = 130): Ref<string>`
  (template's `updateSection`: bottom-of-page → last id; else last section whose top ≤ scrollY + offset);
  `useReadingProgress(): Ref<number>` (0–100). All add passive scroll listeners in `onMounted`,
  remove in `onUnmounted`.
- `useProjects.ts`: `getProjectBySlug(slug: string): Project | undefined`;
  `filterProjects(category: ProjectCategory | 'all'): Project[]`;
  `getRelatedProjects(project: Project, count = 3): Project[]` (excludes `project`; same category first,
  then others in data order).
- `useReveal.ts`: `vReveal: Directive<HTMLElement, number | undefined>` — on `mounted` adds `reveal`
  (+ `d{n}` when value given); if `IntersectionObserver` is missing or reduced motion is preferred,
  adds `in` immediately; otherwise observes (threshold .1, rootMargin `0px 0px -40px 0px`), adds `in`
  once, unobserves. Disconnect in `unmounted`. Registered globally as `reveal` in `src/main.ts`.

- [ ] **Step 1: Write the failing tests**
  - `useMailto.spec.ts`:
    `buildMailto({ to: 'a@b.com' }) === 'mailto:a@b.com'`;
    `buildMailto({ to: 'a@b.com', subject: 'Hi & bye?', body: 'L1\nL2 #3' }) ===
    'mailto:a@b.com?subject=Hi%20%26%20bye%3F&body=L1%0AL2%20%233'`;
    `buildMailto({ to: 'a@b.com', body: 'नमस्ते' }) === 'mailto:a@b.com?body=' + encodeURIComponent('नमस्ते')`;
    `hireMeHref === 'mailto:bishwasdangol1@gmail.com?subject=Job%20opportunity%20for%20Bishwas%20Dangol'`;
    `buildContactMailto({ name: ' Ana ', email: 'ana@x.io', subject: '', message: 'Hello' })`
    has subject `Portfolio enquiry from Ana` and body `Hello\n\n— Ana <ana@x.io>` (assert via
    `new URLSearchParams(url.split('?')[1])`).
  - `useTheme.spec.ts` (use `vi.resetModules()` + dynamic import per test for fresh module state):
    stored `'dark'` → `isDark.value === true` and `<html>` has `dark`; `toggle()` → stored `'light'`,
    class removed; when `Storage.prototype.getItem`/`setItem` throw (`vi.spyOn`) → `useTheme()` does
    not throw and `toggle()` still flips `isDark`.
  - `useProjects.spec.ts`: `getProjectBySlug('tt-bot')?.title` defined; `getProjectBySlug('nope')`
    undefined; `filterProjects('gis').map(p => p.slug)` equals `['gis-land-inventory', 'gis-performance']`;
    `filterProjects('all').length === 9`; `getRelatedProjects(gisLandInventory)` has length 3, first
    is `gis-performance`, does not contain `gis-land-inventory`.
- [ ] **Step 2:** `pnpm test:unit --run src/__tests__/use*.spec.ts` → FAIL.
- [ ] **Step 3:** Implement the composables and directive; register `vReveal` in `main.ts`.
- [ ] **Step 4:** Same command → PASS; `pnpm type-check` → clean.

---

### Task 4: Router, layout, header/footer and base components

**Files:**
- Create: `src/router/routes.ts`; Modify: `src/router/index.ts`
- Create: `src/views/layouts/DefaultLayout.vue`, `src/views/pages/NotFoundPage.vue`,
  placeholder `HomePage.vue`, `ProjectsPage.vue`, `ProjectDetailPage.vue` (filled in Tasks 5–8)
- Create: `src/components/{AppIcon,BaseButton,ThemeToggle,TagPill,SectionHeading,AppHeader,AppFooter}.vue`
- Test: `src/__tests__/mountWithRouter.ts` (helper), `src/__tests__/router.spec.ts`,
  `src/__tests__/BaseButton.spec.ts`, `src/__tests__/AppHeader.spec.ts`, `src/__tests__/App.spec.ts`

**Interfaces:**
- `routes.ts`: `export const routes: RouteRecordRaw[]` — one parent `{ path: '/', component: DefaultLayout }`
  with children `''` name `home`, `projects` name `projects`, `projects/:slug` name `project`
  (`props: true`), `:pathMatch(.*)*` name `not-found`; `meta.title` on home/projects/not-found
  (`Bishwas Dangol — Software Engineer`, `Projects — Bishwas Dangol`, `Page not found — Bishwas Dangol`).
  Pages other than Home are lazy imports.
- `routes.ts` also exports `scrollBehavior: RouterScrollBehavior` — saved position → return it;
  `to.hash` → `{ el: to.hash, top: 80, behavior: 'smooth' }`; else `{ top: 0 }`.
- `index.ts`: `createRouter({ history: createWebHistory(import.meta.env.BASE_URL), routes, scrollBehavior })`;
  `afterEach` sets `document.title` from `to.meta.title` when present.
- `mountWithRouter(component: Component, path = '/', options?: MountingOptions): Promise<VueWrapper>` —
  memory-history router from `routes`, push + `isReady`, mounts with `global.plugins: [router]` and
  `global.directives: { reveal: vReveal }`.
- `AppIcon.vue` props `{ name: IconName }`: inline SVG, `aria-hidden="true"`, size via class
  (default `w-4 h-4`). Paths taken from the template where it has them.
- `BaseButton.vue` props `{ to?: RouteLocationRaw; href?: string; variant?: 'primary' | 'dark' | 'outline'
  (default 'primary'); size?: 'sm' | 'md' (default 'md'); type?: 'button' | 'submit' }`, default slot.
  Renders `RouterLink` when `to`, `<a>` when `href`, else `<button>`. Variant classes per the template's
  buttons minus shadow/shimmer.
- `TagPill.vue` props `{ label: string; accent?: boolean }`. `SectionHeading.vue` props
  `{ eyebrow: string; title: string; level?: 1 | 2 }` + optional `#action` slot.
- `AppHeader.vue`: wordmark `bishwas` + accent `.` (RouterLink home); desktop links from `navItems`
  as `RouterLink :to="{ name: 'home', hash: '#' + sectionId }"`, active one highlighted via
  `useActiveSection` when on home; `ThemeToggle`; `BaseButton :href="hireMeHref" size="sm"` "Hire me";
  hamburger with `aria-expanded`, mobile panel with the same links + Hire me; panel closes on link
  click and on route change. Background per `useScrolled`.
- `AppFooter.vue`: `© {year} Bishwas Dangol.`, LinkedIn + GitLab links, credit
  `Design based on Folio by Laurent Begey` (links to https://lbegey78.gumroad.com/).

- [ ] **Step 1: Write the failing tests**
  - `router.spec.ts`: `/projects/tt-bot` resolves to name `project` with `params.slug === 'tt-bot'`;
    `/does/not/exist` resolves to `not-found`; `scrollBehavior({ hash: '#contact' } as any, … , null)`
    deep-equals `{ el: '#contact', top: 80, behavior: 'smooth' }`; with saved position `{ left: 0, top: 500 }`
    returns it.
  - `BaseButton.spec.ts`: with `href: 'mailto:x@y.z'` renders `a[href="mailto:x@y.z"]`; with
    `to: '/projects'` renders an `a[href="/projects"]` (via router); without either renders `button`;
    for every variant the class string matches neither `/shadow/` nor `/ring-/`.
  - `AppHeader.spec.ts`: has `a[href^="mailto:bishwasdangol1@gmail.com"]` with text `Hire me`;
    clicking the hamburger sets `aria-expanded="true"`, clicking a mobile link sets it back to `"false"`.
  - `App.spec.ts`: mounting `App` at `/` shows text `Bishwas`; at `/nope` shows `Page not found`.
- [ ] **Step 2:** `pnpm test:unit --run` → new tests FAIL.
- [ ] **Step 3:** Implement routes, layout, components and placeholder pages.
- [ ] **Step 4:** `pnpm test:unit --run` → PASS; `pnpm type-check` clean.

---

### Task 5: Home page sections

**Files:**
- Create: `src/components/ProfilePhoto.vue`, `src/components/ProjectCover.vue`,
  `src/components/ProjectCard.vue`, `src/components/home/{HeroSection,AboutSection,SkillsSection,WorkSection,ExperienceSection,ContactSection}.vue`
- Modify: `src/views/pages/HomePage.vue`
- Test: `src/__tests__/HomePage.spec.ts`

**Interfaces:**
- `ProfilePhoto.vue` props `{ photo?: string; initials: string; alt: string }` — `<img>` when
  `photo`, else tinted panel with large `initials` in `font-display`.
- `ProjectCover.vue` props `{ project: Project }` — `<img>` when `project.image`, else tinted
  accent panel with `AppIcon :name="project.icon"`; fills its parent box.
- `ProjectCard.vue` props `{ project: Project; large?: boolean }` — cover, tags (`TagPill`, first tag
  accent), title + summary, `View project →` link to `{ name: 'project', params: { slug } }`.
- Sections: each root `<section :id>` with `scroll-mt-20`; ids `hero`, `about`, `skills`, `work`,
  `experience`, `contact`. Content exactly per spec "Home page sections"; Contact section renders
  `<ContactForm />` from Task 6 (create a stub `ContactForm.vue` with a `<form>` now if Task 6 is
  not done yet).

- [ ] **Step 1: Write the failing test** `HomePage.spec.ts` (via `mountWithRouter(HomePage)`):
  sections `#hero #about #skills #work #experience #contact` all exist; text contains
  `Hi, I'm Bishwas`; `#skills` has 7 cards (`[data-test="skill-card"]`); `#work` has 3
  `[data-test="project-card"]` and a link to `/projects`; `#experience` text contains
  `Pathway Technologies and Services`, `April 2022`, `AWS Academy Graduate – Cloud Architecting`;
  hero has an `a[href^="mailto:"]` with text `Hire me`; page text does not match `/Download CV|Certified/`;
  `#contact` has links to the LinkedIn and GitLab URLs.
- [ ] **Step 2:** `pnpm test:unit --run src/__tests__/HomePage.spec.ts` → FAIL.
- [ ] **Step 3:** Implement the components and sections.
- [ ] **Step 4:** Same command → PASS; `pnpm type-check` clean.

---

### Task 6: Contact form (opens the email app)

**Files:**
- Create/Modify: `src/components/ContactForm.vue`
- Test: `src/__tests__/ContactForm.spec.ts`

**Interfaces:**
- Consumes: `buildContactMailto`, `openMailto` (Task 3), `ContactFormValues` (Task 2).
- Fields `name`, `email`, `subject` (optional), `message`; labels as in the template; native
  `required` + `type="email"`; `novalidate` on the form with own check: name, email (contains `@`
  and `.` after it), message non-empty after trim. Errors shown under each field
  (`[data-test="error-<field>"]`), `aria-invalid` set. On valid submit → `openMailto(buildContactMailto(values))`.
  Note under the button: `Opens your email app.` Submit button: `BaseButton type="submit"` text
  `Send message →`.

- [ ] **Step 1: Write the failing test** (`vi.mock('@/composables/useMailto', async (orig) => ({ ...(await orig()), openMailto: vi.fn() }))`):
  submitting empty form → `openMailto` not called, 3 error elements shown; filling
  name `Ana`, email `ana@x.io`, message `Hello & welcome` and submitting → `openMailto` called once
  with `buildContactMailto({ name: 'Ana', email: 'ana@x.io', subject: '', message: 'Hello & welcome' })`;
  email `not-an-email` → error on email only.
- [ ] **Step 2:** run → FAIL. **Step 3:** implement. **Step 4:** run → PASS.

---

### Task 7: Projects page with filter

**Files:**
- Modify: `src/views/pages/ProjectsPage.vue`
- Create: `src/components/CtaCard.vue`
- Test: `src/__tests__/ProjectsPage.spec.ts`

**Interfaces:**
- `CtaCard.vue` props `{ eyebrow: string; title: string; text: string }` + default slot for buttons;
  template's dark CTA card (decorative blur circles stay in corners, not behind buttons).
- Page: `SectionHeading level=1` eyebrow `Portfolio`, title `All Projects`; intro line; filter buttons
  from `projectCategories` (label for `all` shows count, `All (9)`), `aria-pressed` on the active one;
  grid of `ProjectCard` from `filterProjects(filter)`; CTA card with Hire me button.

- [ ] **Step 1: Write the failing test:** initially 9 `[data-test="project-card"]`; click `GIS` → 2;
  click `AI & ML` → 3; click `All (9)` → 9; active button has `aria-pressed="true"`.
- [ ] **Step 2:** run → FAIL. **Step 3:** implement. **Step 4:** run → PASS.

---

### Task 8: Project detail page

**Files:**
- Modify: `src/views/pages/ProjectDetailPage.vue`
- Test: `src/__tests__/ProjectDetailPage.spec.ts`

**Interfaces:**
- Props `{ slug: string }`. `project = computed(() => getProjectBySlug(props.slug))`. When undefined,
  render `<NotFoundPage />`. Otherwise: reading-progress bar (`useReadingProgress`, `role="progressbar"`),
  back link `← Back to projects`, category + stack tags, `h1` title, summary, meta grid
  (Company `Pathway Technologies and Services`, Role, Domain, Stack), `ProjectCover`, sections rendered
  in `.prose-cs` (skip sections with no paragraphs and no bullets), "More projects" =
  `getRelatedProjects(project)`, `CtaCard` with Hire me + `All projects` (to `/projects`).
  `watchEffect` sets `document.title` to `` `${project.title} — Bishwas Dangol` ``.

- [ ] **Step 1: Write the failing test:** at `/projects/airline-api-integration`, `h1` text contains
  `airline` (case-insensitive) and page text contains `Sabre GDS` and `circuit breaker`; 3
  `[data-test="project-card"]` none linking to itself; `document.title` ends with `— Bishwas Dangol`;
  at `/projects/nope` text contains `Page not found`; a project whose data has an empty section
  (construct by temporarily pushing a section `{ heading: 'Empty' }` onto a project in the test and
  restoring it) does not render heading `Empty`.
- [ ] **Step 2:** run → FAIL. **Step 3:** implement. **Step 4:** run → PASS.

---

### Task 9: Final verification

- [ ] **Step 1:** `pnpm lint && pnpm test:unit --run && pnpm build` → all pass; `ls dist/404.html dist/_redirects`.
- [ ] **Step 2:** Forbidden-content sweep:
  `grep -rniE "shadow|ring-|shimmer|btn-primary::after|Eliott|lorem|Mehepi|9843787528|Download CV|AWS Certified" src index.html`
  → no hits on buttons or copy (a `shadow` hit is acceptable only on a non-button element and must be
  justified; prefer none).
- [ ] **Step 3:** `pnpm preview`, open `/`, `/projects`, `/projects/tt-bot`, `/nope` in a browser at
  1280px and 360px wide, light and dark: no horizontal scroll, header links scroll to sections below
  the header, mobile menu closes on tap, theme persists across reload, reloading a project URL works,
  Hire me opens the email app.
