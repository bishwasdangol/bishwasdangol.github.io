# Bishwas Dangol — Portfolio Site Design

Date: 2026-10-30
Status: draft, awaiting approval

## Intent

A personal portfolio for **Bishwas Dangol, Software Engineer**, used when applying for jobs.
The people landing on it are recruiters, hiring managers and tech leads. Within a minute they
should understand that Bishwas is a backend-leaning full-stack engineer (Python / Django / DRF
plus Vue.js) with 4+ years of shipped production systems, and they should be able to reach him
without friction.

The look comes from the **Folio** HTML template (Tailwind + Alpine.js, by Laurent Begey, MIT).
The content comes only from his CV. The site is rebuilt as a Vue 3 + TypeScript app inside this
existing project.

## Sources

- CV: `/home/pathway/Documents/Bishwas CV.pdf` (text extractable with `pdftotext`).
- Template: `/home/pathway/Downloads/folio-tailwind-v1.0.0/` (`index.html`, `projects.html`,
  `case-study.html`, `blog.html`, `blog-article.html`).
- Links found inside the CV PDF:
  - LinkedIn: https://www.linkedin.com/in/bishwas-dangol-5a8871212
  - GitLab: https://gitlab.com/bishwas76
  - AWS Academy Graduate – Cloud Architecting – Training Badge (Credly):
    https://www.credly.com/badges/6f2ecda6-a6e5-4459-9782-a301c89f662d/linked_in_profile
    (a training badge, not an AWS Certification — see wording rule below)
- Email: bishwasdangol1@gmail.com

## Goals

1. Recreate the Folio look in Vue: layout, PT Sans (display) + DM Sans (body), accent `#FF6B2B`
   / `#FF8F5C`, zinc greys, subtle noise overlay, reveal-on-scroll, fixed header that gains a
   blurred background on scroll, light/dark toggle persisted in `localStorage` (`theme` key) and
   defaulting to `prefers-color-scheme`.
2. Fill it entirely with Bishwas's CV content.
3. **"Hire me" opens the visitor's email app** (a `mailto:` link) addressed to
   bishwasdangol1@gmail.com with a subject already filled in. No email-sending service.
4. **Buttons are flat:** no `box-shadow`, no glow (no coloured shadows, no blurred halos), and
   the template's hover "shine sweep" (`.btn-primary::after` / `.shimmer::after`) is removed.
   Hover feedback is a colour change only.
5. Follow the project's existing structure, with **all TypeScript interfaces / types living in
   `src/models`**.
6. Responsive down to phone width, keyboard accessible, readable in both themes.

## Non-goals

- Blog and blog article pages (no posts exist yet).
- Testimonials section.
- Any backend, CMS, analytics, i18n or server-side email sending.
- **CV download.** No "Download CV" button anywhere, and the CV PDF is not copied into the site.
- Deployment setup (CI pipeline, hosting account). Hosting is not decided yet.

## Anti-goals (failure even if it "works")

- **Invented facts.** No metrics, dates, clients, tools or outcomes that are not in the CV. The
  template is full of fake numbers ("+27% conversion", "21+ happy clients", "34+ projects") —
  none of that survives. The only numbers allowed are ones the CV states (4+ years, 80%
  prediction accuracy, dates of roles/degrees).
- Leftovers from the template: "Eliott", Paris, lorem ipsum, Unsplash photos of strangers
  presented as Bishwas, Unsplash "screenshots" presented as his projects.
- Phone number or home address appearing on the site.
- Calling the AWS badge an "AWS Certification" or "AWS Certified". Wording everywhere is
  "AWS Academy Graduate – Cloud Architecting".
- Shadowed or glowing buttons.

## Constraints

- Existing stack (keep): Vue 3.5, TypeScript 6, Vite 8, Vue Router 5, Pinia 4, Vitest + jsdom,
  ESLint + oxlint, Prettier (no semicolons, single quotes, print width 100), pnpm.
- Existing folders (use them): `src/components`, `src/composables`, `src/models`, `src/styles`,
  `src/views/layouts`, `src/views/pages`, `src/router`, `src/stores`.
- Alpine.js is **not** used; Vue replaces all of its behaviour.

## Decided by Bishwas

- Audience: job hunting ("for jobs and all").
- Keep the template's look; buttons flat, no shadow, not glowy.
- Interfaces live in `src/models`.
- "Hire me" stays, and opens the visitor's own email app.
- He accepted (by not objecting) the page set (Home, Projects, Project detail) and this
  "left out" list: blog, testimonials, the template's fake stats, his phone number and home
  address, and a real photo for now (placeholder until he provides one).
- No CV download on the site.

## Changes requested by Bishwas after the build (2026-10-30)

- Accent colour is indigo (`#4f46e5`; `#6366f1` in dark mode), not the template's orange.
- No cover images or panels on project cards or project detail pages.
- Own browser-tab icon: a white "b." on an indigo square (`public/favicon.svg`, plus `.ico` and Apple touch icon).
- HD profile photo from `~/Downloads/pp.jpg`, square-cropped and upscaled to 800px.
- New **Research** home section (between Work and Experience, in the nav) showing the JACEM paper
  (Vol. 12, No. 01, 2026, pp. 131–149, DOI 10.3126/jacem.v12i01.93926) and headline thesis results;
  the MSc thesis is a tenth project (`malaria-xai-thesis`, category Research) with its own detail
  page, and the MSc entry links to it. Projects now carry an `organization` field.

## Decided by Claude (Bishwas can veto any of these)

- **Tailwind CSS v4 installed as a dependency** via `@tailwindcss/vite` (not the CDN script).
  Theme tokens in CSS (`@theme`): `--font-display`, `--font-body`, `--color-accent`,
  `--color-accent-light`. Class-based dark mode via
  `@custom-variant dark (&:where(.dark, .dark *));` with the `dark` class on `<html>`.
  If `@tailwindcss/vite` does not yet support Vite 8, fall back to `@tailwindcss/postcss`.
- **Static content lives in a new `src/data/` folder** (typed against `src/models`), not in
  Pinia — it never changes at runtime. The scaffold's `src/stores/counter.ts` is deleted;
  `src/stores` stays (empty, or holding nothing unless a real need appears).
- **Wordmark:** `bishwas` in zinc followed by an accent-coloured `.` (template had `eli`+`ott`).
- **Photo:** Bishwas supplied one (2026-10-30): `public/images/profile.jpg`, set as `photo` in
  `src/data/profile.ts`. If `photo` is removed, the hero frame falls back to a large "BD" monogram
  on a tinted panel. To change it, replace the file.
- **Project covers:** no stock images. Each project card / detail hero shows a designed cover:
  tinted panel + a category icon (inline SVG). Projects have an optional `image` field so real
  screenshots can be added later.
- **Contact form stays, but sends via the email app:** on submit it validates required fields,
  then builds a `mailto:` URL (subject = the subject field or a default; body = message plus
  "— Name <email>") and navigates to it. A short note under the button says "Opens your email
  app." The email address is also shown as a plain `mailto:` link.
- **"Hire me" mailto subject:** `Job opportunity for Bishwas Dangol`.
- **AWS wording:** "AWS Academy Graduate – Cloud Architecting", linked to the Credly badge. It
  is not in the hero stats row.
- **Hosting-neutral build:** site runs from the domain root (Vite `base: '/'`), history-mode
  routes. Add SPA fallbacks so reloading `/projects/:slug` works on common static hosts: copy
  `dist/index.html` to `dist/404.html` after build (GitHub / GitLab Pages) and ship
  `public/_redirects` with `/* /index.html 200` (Netlify). No `og:url` or share image until a
  domain exists.
- **Footer credit:** removed at Bishwas's request (2026-10-30); the footer shows only his own copyright.
- **Motion:** reveal-on-scroll respects `prefers-reduced-motion` (content simply shows).
- **Tests:** replace the scaffold's `App.spec.ts`.

## Site map and routes

| Route              | Page                    | Notes                                                |
| ------------------ | ----------------------- | ---------------------------------------------------- |
| `/`                | `HomePage.vue`          | Single scrolling page with anchored sections         |
| `/projects`        | `ProjectsPage.vue`      | All 9 projects, category filter (from `projects.html`) |
| `/projects/:slug`  | `ProjectDetailPage.vue` | Case-study layout (from `case-study.html`)           |
| `/:pathMatch(.*)*` | `NotFoundPage.vue`      | Simple "page not found" with a link home             |

- Unknown project slug → render the not-found page.
- Router `scrollBehavior`: scroll to `to.hash` with a top offset for the fixed header (~80px),
  smooth; otherwise top of page (or saved position on back/forward).
- Header links from non-home pages point to `/#section`.
- Each route sets `document.title` (e.g. `Projects — Bishwas Dangol`). `index.html` gets
  `lang="en"`, title `Bishwas Dangol — Software Engineer`, meta description and OG tags.

## Layout (`src/views/layouts/DefaultLayout.vue`)

Header + `<RouterView>` + footer, used by all routes.

**Header** (template nav): wordmark → home; links **About, Skills, Work, Experience, Contact**;
theme toggle; **Hire me** button (mailto). On the home page the link for the section in view is
highlighted (template's `updateSection` behaviour). Mobile: hamburger menu with the same links
plus Hire me, closes on navigation.

**Footer:** `© {current year} Bishwas Dangol.` · LinkedIn · GitLab.

## Home page sections (in order)

1. **Hero** (`#hero`) — eyebrow "Open to opportunities"; `Hi, I'm Bishwas`; one-line pitch
   drawn from the CV summary (Software Engineer building scalable backends, real-time systems
   and AI-powered features with Python, Django and Vue.js). Buttons: **View my work** (→ `#work`)
   and **Hire me** (mailto). Stats row, CV-true only: `4+` Years experience · `9` Featured
   projects. Photo frame (monogram fallback) with badge "Open to opportunities" (no shadow).
2. **About** (`#about`) — template's about block. Professional summary from the CV (lightly
   rewritten in first person, no new claims). Small facts: based in Kathmandu, Nepal; languages
   English (fluent), Nepali (native), Newari (native); interests: movies, sports, gaming, music.
3. **Skills** (`#skills`, replaces Services) — one card per CV skill group, each with a heading,
   one-sentence description and tag pills:
   - Backend Development: Python, Django, Django Rest Framework, Celery, Django Channels
   - Frontend: TypeScript / JavaScript, Vue.js, HTML / CSS
   - Databases: PostgreSQL, PGVector
   - APIs & Architecture: RESTful API design, WebSockets, real-time systems
   - DevOps & Tools: Docker, Docker Compose, Git, GitLab, CI/CD
   - Cloud: AWS Academy Graduate – Cloud Architecting; familiar with EC2, S3, RDS deployment
     concepts
   - AI/ML Integration: LangChain, LangGraph
   Backend card gets the template's dark "highlight" card treatment.
4. **Selected work** (`#work`) — 3 featured projects (TT Bot, crop health consultation system,
   airline API integration) in the template's work grid, plus "All projects →" to `/projects`.
5. **Experience & education** (`#experience`) — a vertical timeline built from the template's
   case-study "step" cards:
   - Software Engineer (Python Backend Developer), Pathway Technologies and Services,
     Thapathali, Kathmandu — April 2022 – Present. Shows the five CV areas (API Development &
     System Design; Data-Driven Applications; Performance Optimization & Scalability;
     E-Commerce & AI Integration; Collaboration & Code Quality) as short headings, each listing
     the related project titles as links to their detail pages; Collaboration & Code Quality
     shows its two CV bullets as text.
   - MSc Computer Engineering (Data Science and Analytics), Tribhuvan University, IOE Pulchowk
     Campus — April 2024 – May 2026.
   - BE Computer Engineering, Sagarmatha Engineering College (TU affiliated) — 2018 – 2022.
   - AWS Academy Graduate – Cloud Architecting — training badge, links to the Credly page.
6. **Contact** (`#contact`) — template's dark contact card. Heading "Let's work together";
   short line about being open to roles. Left: email, LinkedIn, GitLab links. Right: contact
   form (name, email, subject, message) that opens the email app as described above.

## Projects

All nine come from the CV's Professional Experience section; all were built at Pathway
Technologies and Services. Detail pages expand the CV bullet into readable prose (overview,
what was built, how, outcome) **without adding facts**; any section with nothing CV-backed to
say is omitted (the page hides empty sections). No years are shown — the CV gives none per
project. Tech tags list only technology the CV names for that project; otherwise domain tags
(e.g. "Payments", "QR", "Workflow").

| Slug                         | Title                                         | Category | CV basis                                                                                                                                                           |
| ---------------------------- | --------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `tt-bot`                     | TT Bot — AI travel assistant (Tripturbo)       | ai       | LangChain, LangGraph, PGVector; AI-powered search, price comparison, activity recommendations for domestic flights and bus services                                 |
| `crop-health-consultation`   | Real-time crop health consultation             | ai       | AI chatbot + expert review workflows; Django Channels (WebSockets) for live communication; Celery for async tasks; "architected and developed"                       |
| `price-prediction`           | Agricultural price prediction                  | ai       | ML models, 80% prediction accuracy, Django backend; real-time and forecasted market prices for farmers across Koshi Province                                        |
| `gis-land-inventory`         | GIS land inventory & socio-economic survey     | gis      | Co-led from scratch; geospatial data collection and analysis for hilly regions of Nepal                                                                             |
| `gis-performance`            | GIS map performance optimisation               | gis      | Tablet-based Android app with slow map rendering from large farmer-location data; reduced load times via DB query optimisation and caching                          |
| `seed-import-permit`         | Seed import permit system                      | platform | Online application with payment integration; replaced paper-based process; reduced processing time                                                                  |
| `seed-certification-qr`      | QR-based seed certification tracking           | platform | Tracks the certification lifecycle from field inspection to farmer delivery                                                                                         |
| `airline-api-integration`    | International airline API integration          | systems  | Indigo, Air India, Jazeera, Fly Dubai, Sabre GDS; adapter-based orchestration; circuit breaker for fault tolerance                                                  |
| `crop-notification-system`   | Crop-aware group notification system           | systems  | Scheduled alerts to large farmer groups; intelligent batching and filtering; less redundancy, better engagement                                                     |

Filter categories (projects page): **All**, **AI & ML** (`ai`), **GIS** (`gis`),
**Web platforms** (`platform`), **Backend systems** (`systems`). Counts shown on "All".

**Detail page** (from `case-study.html`): reading-progress bar; back link to `/projects`;
category + tech tags; title; one-paragraph summary; meta grid (Company: Pathway Technologies
and Services · Role: the CV verb, e.g. "Architect & developer", "Co-lead" · Domain · Stack);
cover; prose sections; "More projects" (3 others, same category first); bottom CTA card with
**Hire me** and **All projects**.

## Data model (`src/models`)

Interfaces only — no data, no logic. Suggested files (builder may merge/split):

- `profile.ts` — `Profile` (name, title, location, email, summary, photo?, languages,
  interests, socials: `SocialLink[]`), `SocialLink` (label, url, icon key).
- `skill.ts` — `SkillGroup` (id, title, description, items: string[], highlighted?).
- `project.ts` — `ProjectCategory` union (`'ai' | 'gis' | 'platform' | 'systems'`),
  `ProjectCategoryOption` (value incl. `'all'`, label), `Project` (slug, title, category,
  summary, role, domain, tags, stack, featured?, image?, sections: `ProjectSection[]`),
  `ProjectSection` (heading, paragraphs?, bullets?).
- `experience.ts` — `Experience` (role, company, location, start, end | 'Present',
  areas: `ExperienceArea[]`), `ExperienceArea` (title, projectSlugs?, bullets?),
  `Education` (degree, specialization?, institution, start, end), `Certification`
  (name, issuer, url).
- `navigation.ts` — `NavItem` (label, sectionId).

Data files in `src/data/` export typed constants built from these interfaces.

## Components and composables

Suggested (builder decides final split):

- `src/components/` — `AppHeader`, `AppFooter`, `ThemeToggle`, `BaseButton` (variants: primary
  accent, dark/inverted, outline; renders `RouterLink`, `<a>` or `<button>`; never has a shadow),
  `TagPill`, `SectionHeading` (eyebrow + title), `ProjectCard`, `ProjectCover`,
  `ContactForm`, `CtaCard`, and a `home/` subfolder for the home sections
  (`HeroSection`, `AboutSection`, `SkillsSection`, `WorkSection`, `ExperienceSection`,
  `ContactSection`).
- `src/composables/` — `useTheme` (dark flag, toggle, persistence, sets class on
  `<html>`), `useScrolled`, `useActiveSection`, `useReveal` (or a `v-reveal` directive),
  `useReadingProgress`, `useMailto` (pure `buildMailto({ to, subject, body })` with proper
  encoding, plus the hire-me URL).
- `src/styles/main.css` — Tailwind import, `@theme` tokens, dark variant, base typography,
  noise overlay, scrollbar, reveal classes, prose styles for detail pages.

## Testing

Vitest, focused on logic and data integrity rather than markup:

- `buildMailto` encodes subject/body correctly (spaces, newlines, `&`, `?`).
- Every project has a unique slug and a category present in the filter options; every
  `projectSlugs` reference in experience data points to a real project.
- Router: `/projects/:slug` renders the right project; an unknown slug renders not-found.
- Projects page filter shows the right cards per category.
- `useTheme` reads/writes `localStorage` and toggles the `dark` class.

`pnpm build`, `pnpm lint` and `pnpm test:unit` must pass.

## Left to the builder

Exact component split, file names inside the suggested folders, spacing/sizing details within
the template's look, icon choice per category and skill card, prose wording for project detail
pages (within the no-new-facts rule), and test file layout.
