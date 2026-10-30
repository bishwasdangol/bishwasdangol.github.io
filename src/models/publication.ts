export interface Publication {
  title: string
  authors: string[]
  venue: string
  volume: string
  pages: string
  year: string
  published: string
  doi: string
  url: string
  summary: string
  keywords: string[]
  projectSlug?: string
}

export interface ResearchHighlight {
  value: string
  label: string
}
