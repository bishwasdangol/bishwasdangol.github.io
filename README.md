# Bishwas Dangol: portfolio

My portfolio site. I'm a software engineer in Kathmandu, Nepal.

This repository only holds the site. Most of what I build is client software at Pathway Technologies and Services, so that code is private. The site describes the projects instead.

## Research

| Paper | Published in | Links |
| --- | --- | --- |
| Malaria Parasite Classification in Thin Blood Smears Based on CNN with SpinalNet and GAN | Journal of Advanced College of Engineering and Management, Vol. 12, No. 01 (2026), pp. 131–149 | [Article](https://www.nepjol.info/index.php/JACEM/article/view/93926), [DOI](https://doi.org/10.3126/jacem.v12i01.93926) |

The paper comes from my MSc thesis at IOE Pulchowk Campus, Tribhuvan University, on explainable AI for malaria diagnosis.

## Selected work

| Project | What it is | Built with |
| --- | --- | --- |
| TT Bot | An AI travel assistant for the Tripturbo platform. It handles search, price comparison and activity recommendations for domestic flights and buses. | LangChain, LangGraph, PGVector |
| Real-time crop health consultation | An AI chatbot paired with expert review, with live communication over WebSockets. | Django Channels, WebSockets, Celery |
| International airline API integration | Several airline APIs behind one adapter-based layer, with a circuit breaker for fault tolerance. | Sabre GDS, adapter pattern, circuit breaker |

All ten projects are on the site's Projects page.

## Elsewhere

[LinkedIn](https://www.linkedin.com/in/bishwas-dangol-5a8871212) · [GitHub](https://github.com/bishwas76) · [GitLab](https://gitlab.com/bishwas76) · [Email](mailto:bishwasdangol1@gmail.com)

## About the site

The site is a single-page app built with Vue 3, TypeScript, Vite and Tailwind CSS. It has no backend: the contact form and the Hire me button open the visitor's email app. All the content lives in `src/data`, so updating the site usually means editing one file there.

```
src/data/          the content: profile, skills, projects, experience, research
src/models/        TypeScript interfaces for that content
src/components/    shared UI and the home page sections
src/views/         layout and pages: home, projects, project detail, 404
src/composables/   theme, email links and scroll helpers
public/            favicon, profile photo, _redirects
```

To run it locally you need Node 22.18+ and pnpm:

```sh
pnpm install
pnpm dev
```

Other commands:

- `pnpm test:unit` runs the tests.
- `pnpm lint` runs the linters.
- `pnpm build` builds the site into `dist/`. You can upload `dist/` to any static host.

Links like `/projects/tt-bot` load directly on most hosts. The build writes a `404.html` copy of the app for GitHub and GitLab Pages, and `public/_redirects` handles Netlify-style hosts.
