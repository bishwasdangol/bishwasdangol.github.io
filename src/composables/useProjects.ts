import type { Project, ProjectCategory } from '@/models'
import { projects } from '@/data/projects'

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function filterProjects(category: ProjectCategory | 'all'): Project[] {
  return category === 'all' ? projects : projects.filter((p) => p.category === category)
}

export function getRelatedProjects(project: Project, count = 3): Project[] {
  const others = projects.filter((p) => p.slug !== project.slug)
  const sameCategory = others.filter((p) => p.category === project.category)
  const rest = others.filter((p) => p.category !== project.category)
  return [...sameCategory, ...rest].slice(0, count)
}
