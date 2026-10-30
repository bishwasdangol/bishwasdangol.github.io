export type ProjectCategory = 'ai' | 'gis' | 'platform' | 'systems' | 'research'

export interface ProjectCategoryOption {
  value: ProjectCategory | 'all'
  label: string
}

export interface ProjectLink {
  label: string
  url: string
}

export interface ProjectSection {
  heading: string
  paragraphs?: string[]
  bullets?: string[]
}

export interface Project {
  slug: string
  title: string
  category: ProjectCategory
  summary: string
  organization: string
  role: string
  domain: string
  tags: string[]
  stack: string[]
  featured?: boolean
  links?: ProjectLink[]
  sections: ProjectSection[]
}
